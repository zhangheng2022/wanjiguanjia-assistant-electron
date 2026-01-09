import { contextBridge, ipcRenderer, shell } from "electron";
// import { platform, release, arch } from "os";
import { IpcChannelMainClass, IpcChannelRendererClass } from "@main/ipc/channel";

type IpcChannelListener = {
  invoke?: (...args: unknown[]) => Promise<unknown>;
  on?: (listener: (...args: unknown[]) => void) => void;
  once?: (listener: (...args: unknown[]) => void) => void;
  removeAllListeners?: () => void;
};

function getIpcRenderer(): Record<string, IpcChannelListener> {
  console.log("getIpcRenderer");

  const IpcRenderer: Record<string, IpcChannelListener> = {};
  Object.keys(new IpcChannelMainClass()).forEach((channel) => {
    IpcRenderer[channel] = {
      invoke: async (...args: unknown[]) => ipcRenderer.invoke(channel, ...args),
    };
  });
  Object.keys(new IpcChannelRendererClass()).forEach((channel) => {
    console.log("channel", channel);

    const existing = IpcRenderer[channel] ?? {};
    IpcRenderer[channel] = {
      ...existing,
      on: (listener: (...args: unknown[]) => void) => {
        ipcRenderer.removeListener(channel, listener as (...args: unknown[]) => void);
        ipcRenderer.on(channel, listener as (...args: unknown[]) => void);
      },
      once: (listener: (...args: unknown[]) => void) => {
        ipcRenderer.removeListener(channel, listener as (...args: unknown[]) => void);
        ipcRenderer.once(channel, listener as (...args: unknown[]) => void);
      },
      removeAllListeners: () => ipcRenderer.removeAllListeners(channel),
    };
  });
  return IpcRenderer;
}

contextBridge.exposeInMainWorld("ipcRendererChannel", getIpcRenderer());

// contextBridge.exposeInMainWorld("systemInfo", {
//   platform: platform(),
//   release: release(),
//   arch: arch(),
// });

contextBridge.exposeInMainWorld("shell", shell);

contextBridge.exposeInMainWorld("crash", {
  start: () => {
    process.crash();
  },
});
