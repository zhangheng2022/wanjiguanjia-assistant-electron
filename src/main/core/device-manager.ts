import { EventEmitter } from "events";
import { BrowserWindow } from "electron";
import type { DeviceInfo } from "./protocol/device-info";
import type { UsbmuxdMessage } from "./protocol/usbmux-protocol";
import { UsbMuxClient } from "./usbmuxd";
// import { DeviceId } from "./libimobiledevice/device-id";
import { webContentSend } from "@main/system/web-content-send";

export class DeviceManager extends EventEmitter {
  public mainWindow: BrowserWindow | null = null;
  private usbMuxClient: UsbMuxClient = new UsbMuxClient();
  private devices = new Map<string, DeviceInfo>();
  // private deviceId: DeviceId = new DeviceId();

  constructor(mainWindow: BrowserWindow | null = null) {
    super();
    this.mainWindow = mainWindow;
  }

  async start(): Promise<void> {
    // 启动 USB Mux 客户端
    await this.usbMuxClient.start();
    this.bindUsbMuxEvents();
  }

  stop(): void {
    this.usbMuxClient.stop();
  }

  private bindUsbMuxEvents(): void {
    this.usbMuxClient.on("device:add", (msg: UsbmuxdMessage) => {
      this.handleDeviceAdd(msg);
    });

    this.usbMuxClient.on("device:remove", (msg: UsbmuxdMessage) => {
      this.handleDeviceRemove(msg);
    });

    this.usbMuxClient.on("error", (err) => {
      this.emit("error", err);
    });
  }

  private async handleDeviceAdd(msg: UsbmuxdMessage): Promise<void> {
    const {
      DeviceID,
      Properties: { SerialNumber },
    } = msg;
    if (!SerialNumber) return;
    console.log("📱 设备接入:", msg);
    const diviceData = {
      deviceID: DeviceID,
      serialNumber: SerialNumber,
      data: {},
      status: 1,
    };
    this.devices.set(SerialNumber, diviceData);
    webContentSend.DiviceChange(this.mainWindow!.webContents, diviceData);
    // const connectedIds = await this.deviceId.connectedDevices(["-l"]);
    // console.log("====》已连接设备：", connectedIds, this.devices);
  }

  private handleDeviceRemove(msg: UsbmuxdMessage): void {
    if (!msg.DeviceID) return;
  }
}
