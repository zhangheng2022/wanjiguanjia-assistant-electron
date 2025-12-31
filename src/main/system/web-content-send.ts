import { IWebContentSend } from '../ipc'

export const webContentSend: IWebContentSend = new Proxy(
  {},
  {
    get(_, channel: keyof IWebContentSend) {
      return (webContents: Electron.WebContents, args: unknown) => {
        webContents.send(channel, args)
      }
    },
  },
) as IWebContentSend
