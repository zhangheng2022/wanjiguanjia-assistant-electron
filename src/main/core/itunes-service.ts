import { exec } from "child_process";

export class ItunesService {
  constructor(private readonly serviceName: string) {
    if (!serviceName) {
      throw new Error("服务名称不能为空");
    }
  }

  /**
   * 检查服务是否正在运行
   */
  async isRunning(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      exec(`sc query "${this.serviceName}"`, (error, stdout) => {
        if (error) {
          return reject(error);
        }
        resolve(stdout.includes("RUNNING"));
      });
    });
  }

  /**
   * 启动服务
   */
  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(`net start "${this.serviceName}"`, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }

  /**
   * 确保服务正在运行
   */
  async checkRunning(): Promise<void> {
    const running = await this.isRunning();
    if (running) {
      console.log(`[${this.serviceName}] 服务已在运行`);
      return;
    }
    console.log(`[${this.serviceName}] 服务未运行，尝试启动...`);
    try {
      await this.start();
      console.log(`[${this.serviceName}] 服务启动成功`);
    } catch (err) {
      console.error(`[${this.serviceName}] 服务启动失败`, err);
      throw new Error(`无法启动服务 ${this.serviceName}`);
    }
  }

  /**
   * （可选）停止服务
   */
  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(`net stop "${this.serviceName}"`, (error) => {
        if (error) return reject(error);
        resolve();
      });
    });
  }

  /**
   * （可选）重启服务
   */
  async restart(): Promise<void> {
    await this.stop().catch(() => {});
    await this.start();
  }
}
