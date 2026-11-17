
// Import electron functions
const { app, BrowserWindow, ipcMain, Menu } = require("electron");

// Import header Functions
const { importZip, importIndividual, flush } = require("./functions/import.cjs");
const { generateGCode, flushGcodes } = require("./functions/gerberToGcode.cjs");


function createWindow() {
  // Creating a Window with default dimentions and min dimentions
  // Using preload.cjs to talk to frontend
  const win = new BrowserWindow({
    width: 1900,
    height: 1000,

    minWidth: 1900,
    minHeight: 1000,

    webPreferences: {
      preload: __dirname + "/preload.cjs",
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Remove Header Bar
  Menu.setApplicationMenu(null);

  // 
  /// Making UI header buttons usable
  //

  // Import zip
  ipcMain.on("header:importZIP", async () => {
    await importZip();
    win.webContents.send("notify", {
      title: "Import",
      msg: "Usable files loaded!",
      color: 'green'
    });
  });

  // Import individual files
  ipcMain.on("header:importIndividual", async () => {
    await importIndividual();
    win.webContents.send("notify", {
      title: "Import",
      msg: "Usable files loaded!",
      color: 'green'
    });
  });

  // Flush import folder
  ipcMain.on("header:flush", () => {
    flush();
    win.webContents.send("notify", {
      title: "Import",
      msg: "Stored files deleted!",
      color: 'green'
    });
  });

  // 
  /// Programmer buttons
  //

  //
  ipcMain.on("programmer:createGCode", (event, data) => {
    generateGCode(data)
  });


  // win.webContents.openDevTools();

  win.loadURL("http://localhost:5173");
  flush();
  flushGcodes();
}

app.whenReady().then(createWindow,);