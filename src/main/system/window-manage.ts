import { shell, BrowserWindow } from "electron";
import { join } from "path";
import { is } from "@electron-toolkit/utils";

export class WindowManage {
  public mainWindow: BrowserWindow | null;

  constructor() {
    this.mainWindow = null;
  }

  createWindow(): void {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      show: false,
      autoHideMenuBar: false,
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
      },
    });

    this.mainWindow.on("ready-to-show", () => {
      this.mainWindow?.show();
    });

    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: "deny" };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      this.mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    } else {
      this.mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }
  }
}
