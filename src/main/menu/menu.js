import { Menu } from 'electron'

const templateMenu = [
  {
    label: 'File',
    submenu: [
      process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    label: 'Add Icon',
    submenu: [
      {
        label: 'red',
        click (item, focusedWindow) {
          focusedWindow.webContents.send('add_merker', [35.6825 + Math.random() * 0.01, 139.752778, 'red'])
        }
      },
      {
        label: 'green',
        click (item, focusedWindow) {
          focusedWindow.webContents.send('add_merker', [35.6825 + Math.random() * 0.01, 139.752778, 'green'])
        }
      }
    ]
  }
]

export const menu = Menu.buildFromTemplate(templateMenu)
