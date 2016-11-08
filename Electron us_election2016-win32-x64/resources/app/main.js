const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let wallWindow
let floorWindow

function createWindow () {
  // Create the browser window.
  //floorWindow = new BrowserWindow({width: 800, height: 600})
  //wallWindow = new BrowserWindow({width: 800, height: 600})

  var electronScreen = electron.screen;
  var displays = electronScreen.getAllDisplays();
  var externalDisplay = null;
  for (var i in displays) {
    if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
      externalDisplay = displays[i];
      break;
    }
  }

  if (externalDisplay) {
    floorWindow = new BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
      fullscreen: false,
      frame: true
    });

    floorWindow.loadURL(`file://${__dirname}/us_map.html`)
    floorWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      floorWindow = null
    })
    wallWindow = new BrowserWindow({fullscreen: false, frame: true, x:0, y:0});
  }

  else {
    floorWindow = new BrowserWindow({
      fullscreen: false,
      frame: true
    });

    floorWindow.loadURL(`file://${__dirname}/us_map.html`)
    floorWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      floorWindow = null
    })
    wallWindow = new BrowserWindow({fullscreen: false, frame: true, x:0, y:0});
  }

  //wallWindow = new BrowserWindow({fullscreen: true, frame: false, x:0, y:0});

  //load wall of tweets
  wallWindow.loadURL(`file://${__dirname}/us_tweet.html`)

  // Open the DevTools.
  //wallWindow.webContents.openDevTools()
  //floorWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  wallWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    wallWindow = null
  })


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow)
app.on('ready', function () {

  createWindow();

  globalShortcut.register('Escape', function () {
    app.quit()
  })



})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (wallWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
