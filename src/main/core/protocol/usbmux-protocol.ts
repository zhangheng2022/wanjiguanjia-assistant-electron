export type UsbmuxdMessage = {
  MessageType: "Attached" | "Detached" | "Result" | string;
  DeviceID: number;
  Properties: {
    ConnectionType: "USB" | "Network";
    DeviceID: number;
    SerialNumber: string;
  };
};
