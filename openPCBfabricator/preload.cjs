const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronWindow", {
  send: (channel, data) => ipcRenderer.send(channel, data),

  on: (channel, callback) => {
    const listener = (event, data) => callback(data);

    ipcRenderer.on(channel, listener);

    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  }
});