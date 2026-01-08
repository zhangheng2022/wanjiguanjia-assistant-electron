import type { ProgressInfo } from "electron-updater";
import type { DeviceInfo } from "@main/core/protocol/device-info";

export interface IpcMainEventListener<Send = void, Receive = void> {
  ipcMainHandle: Send extends void
    ? (event: Electron.IpcMainInvokeEvent) => Receive | Promise<Receive>
    : (event: Electron.IpcMainInvokeEvent, args: Send) => Receive | Promise<Receive>;
  ipcRendererInvoke: Send extends void ? () => Promise<Receive> : (args: Send) => Promise<Receive>;
}

export interface IpcRendererEventListener<Send = void> {
  ipcRendererOn: Send extends void
    ? (event: Electron.IpcRendererEvent) => void
    : (event: Electron.IpcRendererEvent, args: Send) => void;
  webContentSend: Send extends void
    ? (webContents: Electron.WebContents) => void
    : (webContents: Electron.WebContents, args: Send) => void;
}

export class IpcChannelMainClass {
  IsUseSysTitle: IpcMainEventListener<void, boolean> | null = null;
  /**
   * 退出应用
   */
  AppClose: IpcMainEventListener<void> | null = null;
  CheckUpdate: IpcMainEventListener | null = null;
  ConfirmUpdate: IpcMainEventListener | null = null;
  OpenMessagebox: IpcMainEventListener<
    Electron.MessageBoxOptions,
    Electron.MessageBoxReturnValue
  > | null = null;
  StartDownload: IpcMainEventListener<string> | null = null;
  OpenErrorbox: IpcMainEventListener<{ title: string; message: string }> | null = null;
  StartServer: IpcMainEventListener<void, string> | null = null;
  StopServer: IpcMainEventListener<void, string> | null = null;
  HotUpdate: IpcMainEventListener | null = null;
  /**
   * 窗口准备就绪
   */
  WinReady: IpcMainEventListener | null = null;
  /**
   *
   * 打开窗口
   */
  OpenWin: IpcMainEventListener<{
    /**
     * 新的窗口地址
     *
     * @type {string}
     */
    url: string;

    /**
     * 是否是支付页
     *
     * @type {boolean}
     */
    IsPay?: boolean;

    /**
     * 支付参数
     *
     * @type {string}
     */
    PayUrl?: string;

    /**
     * 发送的新页面数据
     *
     * @type {unknown}
     */
    sendData?: unknown;
  }> | null = null;
  DiviceStart: IpcMainEventListener | null = null;
}
export class IpcChannelRendererClass {
  // ipcRenderer
  DownloadProgress: IpcRendererEventListener<number> | null = null;
  DownloadError: IpcRendererEventListener<unknown> | null = null;
  DownloadPaused: IpcRendererEventListener<boolean> | null = null;
  DownloadDone: IpcRendererEventListener<{
    /**
     * 下载的文件路径
     *
     * @type {string}
     */
    filePath: string;
  }> | null = null;
  updateMsg: IpcRendererEventListener<{
    state: number;
    msg: string | ProgressInfo;
  }> | null = null;
  UpdateProcessStatus: IpcRendererEventListener<{
    status: "init" | "downloading" | "moving" | "finished" | "failed" | "download";
    message: string;
  }> | null = null;

  SendDataTest: IpcRendererEventListener<unknown> | null = null;
  BrowserViewTabDataUpdate: IpcRendererEventListener<{
    bvWebContentsId: number;
    title: string;
    url: string;
    status: 1 | -1; // 1 添加/更新 -1 删除
  }> | null = null;
  BrowserViewTabPositionXUpdate: IpcRendererEventListener<{
    dragTabOffsetX: number;
    positionX: number;
    bvWebContentsId: number;
  }> | null = null;
  BrowserTabMouseup: IpcRendererEventListener | null = null;
  HotUpdateStatus: IpcRendererEventListener<{
    status: string;
    message: string;
  }> | null = null;

  DiviceChange: IpcRendererEventListener<DeviceInfo> | null = null;
}
