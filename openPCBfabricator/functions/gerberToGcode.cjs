const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { app, dialog, BrowserWindow } = require("electron");

function getOperatingSystem() {
    switch (process.platform) {
        case "win32":
            return "windows";

        case "darwin":
            return "mac";

        default:
            return "linux";
    }
}

function getPcb2GcodePath() {
    const os = getOperatingSystem();

    if (os === "windows") {
        return path.join(__dirname, "..", "bin", "win", "pcb2gcode.exe");
    }

    if (os === "linux") {
        return path.join(__dirname, "..", "bin", "linux", "pcb2gcode");
    }

    return path.join(__dirname, "..", "bin", "mac", "pcb2gcode");
}

function getFileType(filePath) {
    const lower = path.basename(filePath).toLowerCase();

    if (lower.endsWith(".gtl")) return "front";
    if (lower.endsWith(".gbl")) return "back";
    if (lower.endsWith(".gm1") || lower.includes("edge_cuts")) return "outline";
    if (lower.endsWith(".drl")) return "drill";

    throw new Error("Unsupported file type: " + filePath);
}

function pcbToGcode(filePath, settings) {
    return new Promise((resolve, reject) => {
        const type = getFileType(filePath);

        const outputFolder = path.join(app.getPath("userData"), "tempGcode");
        fs.mkdirSync(outputFolder, { recursive: true });

        const baseName = path.basename(filePath, path.extname(filePath));

        const args = [
            "--metric",
            "--metricoutput",

            `--${type}`,
            filePath,

            "--output-dir",
            outputFolder,

            "--basename",
            baseName,

            // Isolation Routing

            "--mill-diameters",
            Array.from(
                { length: settings.millPaths },
                (_, i) =>
                    (
                        settings.millDiameter +
                        i * settings.pathSpacing
                    ).toFixed(3)
            ).join(","),

            "--offset",
            String(settings.offset),

            "--optimise",

            // Heights

            "--zsafe",
            String(settings.safeHeight),

            "--zchange",
            "10",

            "--zwork",
            String(settings.millDepth),

            "--zcut",
            String(settings.cutDepth),

            "--zdrill",
            String(settings.drillDepth),

            // Feedrates

            "--mill-feed",
            String(settings.millFeedrate),

            "--drill-feed",
            String(settings.drillFeedrate),

            "--cut-feed",
            String(settings.cutFeedrate),

            "--cut-infeed",
            String(settings.cutInfeed),

            // Spindle

            "--mill-speed",
            String(settings.millSpindleSpeed),

            "--drill-speed",
            String(settings.drillSpindleSpeed),

            "--cut-speed",
            String(settings.cutSpindleSpeed),

            // Outline

            "--cutter-diameter",
            "1.0",

            // Optional

            "--nog64",
            "--onedrill"
        ];

        execFile(
            getPcb2GcodePath(),
            args,
            { cwd: outputFolder },
            (error, stdout, stderr) => {
                const files = fs.existsSync(outputFolder)
                    ? fs.readdirSync(outputFolder)
                    : [];

                if (error) {
                    reject({
                        error,
                        stdout,
                        stderr,
                        files
                    });
                    return;
                }

                const outputFile = files.find(file =>
                    file.startsWith(baseName) &&
                    file.endsWith(".ngc")
                );

                resolve({
                    type,
                    input: filePath,
                    output: outputFile
                        ? path.join(outputFolder, outputFile)
                        : null,
                    stdout,
                    stderr,
                    files
                });
            }
        );
    });
}

// Delete all files from temp folder
function flushGcodes() {
    const folderPath = path.join(app.getPath("userData"), "tempGcode");
    if (!fs.existsSync(folderPath)) return;

    for (const file of fs.readdirSync(folderPath)) {
        const fullPath = path.join(folderPath, file);

        fs.rmSync(fullPath, {
            recursive: true,
            force: true
        });
    }
}

// Create a relative folder
function createLocalFolder() {
    const folderPath = path.join(app.getPath("userData"), "tempGcode");
    fs.mkdirSync(folderPath, { recursive: true });
    return folderPath;
}

// Removes all files except gcode and 3 svgs
function cleanFolder() {
    const folderPath = path.join(app.getPath("userData"), "tempGcode");
    const files = fs.readdirSync(folderPath);

    const keepFiles = [
        "original_drill.svg",
        "traced_back_final_0.svg",
        "traced_front_final_0.svg",
        "traced_back_final.svg",
        "traced_front_final.svg"
    ];


    for (const file of files) {
        const filePath = path.join(folderPath, file);

        const isNgc = file.toLowerCase().endsWith(".ngc");
        const isKeepFile = keepFiles.includes(file);

        if (isNgc || isKeepFile) {
            continue;
        }

        try {
            fs.unlinkSync(filePath);
        } catch (err) {
            console.error(`Failed to delete ${file}:`, err);
        }
    }
}

// Checks if there are gerber files avaiable
function checkForFiles() {
    const folderPath = path.join(app.getPath("userData"), "tempGerber");
    const files = fs.readdirSync(folderPath);

    return files.some(file => {
        const ext = path.extname(file).toLowerCase();

        return [
            ".gtl",
            ".gbl",
            ".drl",
            ".gm1"
        ].includes(ext);
    });
}

// Sends GCode SVGs to frontend
function sendSvg() {
    const win = BrowserWindow.getFocusedWindow();
    const folderPath = path.join(app.getPath("userData"), "tempGcode");

    function readSvg(...names) {
        for (const name of names) {
            const filePath = path.join(folderPath, name);

            if (fs.existsSync(filePath)) {
                return fs.readFileSync(filePath, "utf8");
            }
        }

        return null;
    }

    const frontSvg = readSvg(
        "traced_front_final_0.svg",
        "traced_front_final.svg"
    );

    const backSvg = readSvg(
        "traced_back_final_0.svg",
        "traced_back_final.svg"
    );

    const drillSvg = readSvg(
        "original_drill.svg"
    );

    console.log("send");
    win.webContents.send("gcode", {
        layers: {
            front: frontSvg,
            back: backSvg,
            drill: drillSvg
        }
    });
}

// Creates and flushes folder then generates GCode
async function generateGCode(settings){
    const win = BrowserWindow.getFocusedWindow();
    createLocalFolder()
    flushGcodes()

    if (!checkForFiles()) {
        return  win.webContents.send("notify", {
            title: "No gerbers",
            msg: "You need to import gerber files before creating gcode!",
            color: 'red'
        });
    }

    const folderPath = path.join(app.getPath("userData"), "tempGerber");
    const files = fs.readdirSync(folderPath);

    const validExtensions = [".gtl", ".gbl", ".drl", ".gm1"];

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!validExtensions.includes(ext)) continue;

        const filePath = path.join(folderPath, file);
        await pcbToGcode(filePath, settings);
    }

    cleanFolder();

    win.webContents.send("notify", {
        title: "GCode created",
        msg: "All gerber files have been parsed into gcode!",
        color: 'green'
    });

    win.webContents.send("notify", {
        title: "Visualizer",
        msg: "Gcode preview is now avaiable!",
        color: 'green'
    });

    sendSvg();
}

module.exports = {
    getOperatingSystem,
    pcbToGcode,
    generateGCode,
    flushGcodes
};