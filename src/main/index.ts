import { app } from "electron";
import { useMenus } from "@main/system/menus";
import WindowManage from "@main/system/window-manage";
import { optimizer } from "@electron-toolkit/utils";
import { useMainDefaultIpc } from "@main/system/ipc-main";
// import icon from '../../resources/icon.png?asset'
function onAppReady(): void {
  new WindowManage().createWindow();
  const { createMenu, createTray } = useMenus();
  const { defaultIpc } = useMainDefaultIpc();
  createMenu();
  createTray();
  defaultIpc();
}

//禁止程序多开，此处需要单例锁的同学打开注释即可
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

app.isReady() ? onAppReady() : app.on("ready", onAppReady);

app.on("window-all-closed", () => {
  // 所有平台均为所有窗口关闭就退出软件
  app.quit();
});
app.on("browser-window-created", (_event, window) => {
  optimizer.watchWindowShortcuts(window);
});
