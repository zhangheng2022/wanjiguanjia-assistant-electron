// import { execFile } from "child_process";
// import EventEmitter from "events";
// import { join } from "path";

// interface MobileDevicesInfo {
//   id: string;
//   info: Record<string, string>;
//   status: number; // 1: 连接中, 2: 已连接, 3: 等待信任, 4: 信任失败, 5: 已配对
// }

// class LibImobileDevice extends EventEmitter {
//   libPath: string;
//   mobileDevices: MobileDevicesInfo[];

//   constructor() {
//     super();
//     this.mobileDevices = [];
//     this.libPath = this.getLibPath();
//   }

//   getLibPath(): string {
//     const { platform, arch } = process;
//     console.log("===process", platform, arch);
//     let path = "";
//     if (platform === "win32") {
//       path = "../../resources/libimobiledevice/win64";
//     }
//     return join(__dirname, path).replace("app.asar", "app.asar.unpacked");
//   }

//   async plistutil(): Promise<string[]> {
//     return new Promise((resolve, reject) => {
//       const execName = process.platform === "win32" ? "plistutil.exe" : "plistutil";
//       const execPath = join(this.libPath, execName);
//       execFile(execPath, ["-l"], (error, stdout) => {
//         if (error) {
//           reject(error);
//           return;
//         }
//         const out = (stdout || "").toString();
//         const deviceIds = out
//           .trim()
//           .split("\n")
//           .map((s) => s.trim())
//           .filter((id) => id.length > 0);
//         resolve(deviceIds);
//       });
//     });
//   }
// }
