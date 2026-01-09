export interface DeviceInfo {
  deviceID: number;
  serialNumber: string;
  data: Record<string, string>;
  status: number; // 1: 连接中, 2: 已连接, 3: 等待信任, 4: 信任失败, 5: 已配对
}
