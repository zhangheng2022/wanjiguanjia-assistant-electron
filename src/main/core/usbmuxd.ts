import net from "net";
import bplistCreator from "bplist-creator";
import plist from "plist";
import { EventEmitter } from "events";
import { ItunesService } from "./itunes-service";

/* ================== Types ================== */

export type UsbmuxdMessage = {
  MessageType: string;
  DeviceID?: number;
  Properties?: {
    ConnectionType: "USB" | "Network";
    DeviceID: number;
    LocationID: number;
    ProductID: number;
    SerialNumber: string;
  };
};

export class UsbMuxClient extends EventEmitter {
  private socket?: net.Socket;
  private buffer = Buffer.alloc(0);
  private tag = 1;
  private started = false;

  async start(): Promise<void> {
    if (this.started) return;
    this.started = true;
    const { platform } = process;
    if (platform === "win32") {
      const deviceService = new ItunesService("Apple Mobile Device Service");
      await deviceService.checkRunning();
    }
    this.socket =
      platform === "darwin"
        ? net.connect({ path: "/var/run/usbmuxd" })
        : net.connect(27015, "127.0.0.1");

    this.bindSocket();
  }

  stop(): void {
    this.started = false;
    this.socket?.destroy();
    this.socket = undefined;
  }

  private bindSocket(): void {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      this.emit("connect");
      this.sendPlist();
    });

    this.socket.on("data", (chunk: Buffer) => {
      this.buffer = Buffer.concat([this.buffer, chunk]);
      const payload = chunk.subarray(16);
      const payloadStr = payload.toString("utf8");
      try {
        const parsed = plist.parse(payloadStr);
        console.log("✅ 解析成功:", parsed);
        this.dispatch(parsed as UsbmuxdMessage);
      } catch (err) {
        console.error("❌ XML plist 解析失败:", err);
        this.emit("error", err);
      }
    });
    this.socket.on("error", (err) => this.emit("error", err));
    this.socket.on("close", () => this.emit("close"));
  }

  private dispatch(msg: UsbmuxdMessage): void {
    this.emit("message", msg);

    switch (msg.MessageType) {
      case "DeviceAdd":
        this.emit("device:add", msg);
        break;
      case "DeviceRemove":
        this.emit("device:remove", msg);
        break;
      case "Result":
        this.emit("result", msg);
        break;
      default:
        this.emit("unknown", msg);
    }
  }

  private sendPlist(): void {
    if (!this.socket) return;

    const HEADER_SIZE = 16;
    const PLIST_MESSAGE = 8;

    const plist = {
      MessageType: "Listen",
      ClientVersionString: "ElectronApp",
      ProgName: "MyElectronApp",
      kLibUSBMuxVersion: 3,
    };
    const body = bplistCreator(plist);
    const header = Buffer.alloc(HEADER_SIZE);

    header.writeUInt32LE(HEADER_SIZE + body.length, 0);
    header.writeUInt32LE(1, 4);
    header.writeUInt32LE(PLIST_MESSAGE, 8);
    header.writeUInt32LE(this.tag++, 12);

    this.socket.write(Buffer.concat([header, body]));
  }
}
