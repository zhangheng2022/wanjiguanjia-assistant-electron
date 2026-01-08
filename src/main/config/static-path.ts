import { join } from "path";

export const libimobiledevicePath = (): string => {
  const { platform } = process;
  let path = "";
  if (platform === "win32") {
    path = "../../resources/libimobiledevice/win64";
  }
  return join(__dirname, path).replace("app.asar", "app.asar.unpacked");
};
