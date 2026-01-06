import { IWebContentSend } from "../ipc";

export const webContentSend: IWebContentSend = new Proxy(
  {},
  {
    get(_, channel: keyof IWebContentSend) {
      return (webContents: Electron.WebContents, args: unknown) => {
        console.log(channel);

        webContents.send(channel, args);
      };
    },
  },
) as IWebContentSend;
