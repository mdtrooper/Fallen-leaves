const { app, BrowserWindow, Menu } = require('electron');

function createWindow () {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    
    var menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {label: 'Adjust Notification Value'},
                {label: 'CoinMarketCap'},
                {label: 'Exit'}
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {label: 'Preferences'}
            ]
        },
        {
            label: 'Help',
            submenu: [
                {label: 'About'}
            ]
        }
    ])
    Menu.setApplicationMenu(menu); 
    
    win.loadFile('index.html');
}

app.on('ready', createWindow);