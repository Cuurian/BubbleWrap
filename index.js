/** custom configuration: */
const file = "index.html";
const config = {
    height: 600,
    width: 720,
    icon: "images/icon.ico",
    fullscreen: false
}
const debug = false;

/** electron implementation: */
const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
if (require('electron-squirrel-startup')) app.quit();

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [{
        label: app.name,
        submenu: [
          { role: 'quit' }
        ]
      }]
    : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'togglefullscreen' }
    ]
  }
]

//const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(null)

let mainWindow;
const createWindow = () => {
    app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            additionalArguments: ["volume"]
        },
        ... config
    })
    mainWindow.on('show', () => { 
        mainWindow.focus(); 
    });
    mainWindow.loadFile(file);
    mainWindow.loadFile(file);
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setFullScreen(true);
    // debugging html page:
    if (debug) {
      mainWindow.webContents.openDevTools();
    }
};

app.whenReady().then(() => {
    createWindow();
})
app.on('ready', function() {
    const ret = electron.globalShortcut.register('F11', function() {
        if (mainWindow.isFullScreen()) {
            mainWindow.setFullScreen(false);
        }else{
          mainWindow.setFullScreen(true);
        }
    });
})
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('toggleFullscreen', (event) => {
	
	if (process.platform == 'darwin'){
		if(mainWindow.isMaximized()){
			mainWindow.unmaximize();
		}else{
			mainWindow.maximize()
		}
  var res = mainWindow.isMaximized;
	}
	else{
		if(mainWindow.fullScreen == true){
			mainWindow.fullScreen = false;
		}
		else{
			mainWindow.fullScreen = true;
		}
		  var res = mainWindow.fullScreen;
	}
	


  
  //console.log("zaza");
  event.returnValue = res;
})

ipcMain.on('exitGame', (event) => {
  mainWindow.close();
})
