import { libimobiledevicePath } from "@main/config/static-path";
import { execFile } from "child_process";

export class DeviceId {
  async connectedDevices(args?: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      execFile(`${libimobiledevicePath()}/idevice_id`, args, (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }
        const deviceIds = stdout
          .trim()
          .split("\n")
          .filter((id) => id.length > 0);
        resolve(deviceIds);
      });
    });
  }
}
