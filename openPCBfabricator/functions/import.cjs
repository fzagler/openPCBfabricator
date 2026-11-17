
// Import electron functions and gerber2svg functions
const { app, dialog, BrowserWindow } = require("electron");
const { gerberToSvg } = require("./toSvg.cjs");

// Importing functions to read folders and unpack zip
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

// Importing zip files
async function importZip() {
    const win = BrowserWindow.getFocusedWindow();
    const folderPath = createLocalFolder();
    flush();
    
    // Dialog to select zip
    const result = await dialog.showOpenDialog(win, {
        title: "Choose production ZIP",
        properties: ["openFile"],
        filters: [
            { name: "ZIP Files", extensions: ["zip"] }
        ]
    });

    if (result.canceled) {
        return null;
    }

    // Unpack Zip
    const zipPath = result.filePaths[0];
    const zip = new AdmZip(zipPath);

    // Copy to folder, clean files, gerber2svg
    zip.extractAllTo(folderPath, true);
    cleanGerber(folderPath);
    await gerberToSvg(folderPath);
}

// Importing individual files
async function importIndividual() {
    const win = BrowserWindow.getFocusedWindow();
    const folderPath = createLocalFolder();
    flush();

    // Dialog to select gbl gtl drl gm1
    const result = await dialog.showOpenDialog(win, {
        title: "Choose Gerber files",
        properties: ["openFile", "multiSelections"],
        filters: [
            { name: "Gerber / Drill Files", extensions: ["gbl", "gtl", "drl", "gm1"] },
        ]
    });

    if (result.canceled) {
        return null;
    }

    // Copy to folder
    for (const filePath of result.filePaths) {
        const fileName = path.basename(filePath);
        const targetPath = path.join(folderPath, fileName);

        fs.copyFileSync(filePath, targetPath);
    }

    // Clean files, gerber2svg
    cleanGerber(folderPath);
    await gerberToSvg(folderPath);
}

// Delete all files from temp folder
function flush() {
    const folderPath = path.join(app.getPath("userData"), "tempGerber");
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
    const folderPath = path.join(app.getPath("userData"), "tempGerber");
    fs.mkdirSync(folderPath, { recursive: true });
    return folderPath;
}

// remove all files except usable gerber files
function cleanGerber(folderPath) {
    const allowed = [
        /-NPTH\.drl$/i,
        /-PTH\.drl$/i,
        /-B_Cu\.gbl$/i,
        /-F_Cu\.gtl$/i,
        /-Edge_Cuts\.gm1$/i
    ];

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const keep = allowed.some(regex => regex.test(file));

        if (!keep) {
            fs.unlinkSync(path.join(folderPath, file));
        }
    }
}


module.exports = {
    importZip,
    importIndividual,
    flush
};