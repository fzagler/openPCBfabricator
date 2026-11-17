
// Import electron functions
const { app, dialog, BrowserWindow } = require("electron");

// Importing functions to read folders and turn gerber into svgs
const pcbStackup = require("pcb-stackup");
const fs = require("fs");
const path = require("path");

async function gerberToSvg(gerberPath) {
    const win = BrowserWindow.getFocusedWindow();

    const files = fs
        .readdirSync(gerberPath)
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return [".gm1", ".gtl", ".gbl", ".drl"].includes(ext);
        })
        .map(file => ({
            filename: file,
            gerber: fs.createReadStream(path.join(gerberPath, file)),
        }));

    const stackup = await pcbStackup(files);

    win.webContents.send("svg", {
        layers: {
            front: stackup.top.svg,
            back: stackup.bottom.svg,
        }
    });
}

module.exports = {
    gerberToSvg
};