import { dialog, Menu, Tray, nativeImage, BrowserWindow } from 'electron'
import type { MenuItemConstructorOptions, MenuItem } from 'electron'
import { type, arch, release } from 'os'
import { is } from '@electron-toolkit/utils'
import { version } from '../../../package.json'

const menu: Array<MenuItemConstructorOptions | MenuItem> = [
  {
    label: '设置',
    submenu: [
      {
        label: '快速重启1',
        accelerator: 'F5',
        role: 'reload',
      },
      {
        label: '退出',
        accelerator: 'CmdOrCtrl+F4',
        role: 'close',
      },
    ],
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '关于',
        click: function () {
          dialog.showMessageBox({
            title: '关于',
            type: 'info',
            message: 'electron-Vue框架',
            detail: `版本信息：${version}\n引擎版本：${process.versions.v8
              }\n当前系统：${type()} ${arch()} ${release()}`,
            noLink: true,
            buttons: ['查看github', '确定'],
          })
        },
      },
    ],
  },
]


// 16x16 红色圆形 data URL
const icon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACTSURBVHgBpZKBCYAgEEV/TeAIjuIIbdQIuUGt0CS1gW1iZ2jIVaTnhw+Cvs8/OYDJA4Y8kR3ZR2/kmazxJbpUEfQ/Dm/UG7wVwHkjlQdMFfDdJMFaACebnjJGyDWgcnZu1/lrCrl6NCoEHJBrDwEr5NrT6ko/UV8xdLAC2N49mlc5CylpYh8wCwqrvbBGLoKGvz8Bfq0QPWEUo/EAAAAASUVORK5CYII=')


export const useMenus = () => {
  const createMenu = () => {
    if (is.dev) {
      menu.push({
        label: '开发者设置',
        submenu: [
          {
            label: '切换到开发者模式',
            accelerator: 'CmdOrCtrl+I',
            role: 'toggleDevTools',
          },
        ],
      })
    }
    // 赋予模板
    const menuTemplate = Menu.buildFromTemplate(menu)
    // 加载模板
    Menu.setApplicationMenu(menuTemplate)
  }
  const createTray = () => {
    const tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate(menu)
    tray.setContextMenu(contextMenu)
  }
  return {
    createMenu,
    createTray
  }
}
