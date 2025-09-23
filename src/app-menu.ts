import { app, Menu, BrowserWindow } from "electron";

export function createAppMenu() {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: "File",
      submenu: [
        {
          label: "New Chat",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            // Send IPC message to renderer to start new chat
            const mainWindow = BrowserWindow.getFocusedWindow();
            if (mainWindow) {
              mainWindow.webContents.send("menu-new-chat");
            }
          },
        },
        {
          type: "separator",
        },
        {
          label: "Quit",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Settings",
      submenu: [
        {
          label: "Open Settings",
          accelerator: "CmdOrCtrl+,",
          click: () => {
            // Send IPC message to renderer to open settings
            const mainWindow = BrowserWindow.getFocusedWindow();
            if (mainWindow) {
              mainWindow.webContents.send("menu-open-settings");
            }
          },
        },
      ],
    },
    {
      label: "Window",
      submenu: [{ role: "minimize" }, { role: "close" }],
    },
  ];

  // macOS specific menu adjustments
  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    });

    // Window menu
    template[5].submenu = [
      { role: "close" },
      { role: "minimize" },
      { role: "zoom" },
      { type: "separator" },
      { role: "front" },
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Export function to set up menu-related IPC handlers
export function setupMenuHandlers() {
  // These handlers can be used if needed for additional menu functionality
  // Currently, we're using webContents.send() directly in the menu click handlers
}
