const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const electron = require('electron')
const dialog = electron.dialog

var win;

function createWindow () {
    win = new BrowserWindow({
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
                {label: 'Open Dir', click() {dialogDirectory()}, accelerator: 'CmdOrCtrl+O'},
                {type:'separator'},
                {label: 'Exit', click() {app.exit(0)}, accelerator: 'CmdOrCtrl+Q'}
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {label: 'Preferences', enabled: false, click() {app.exit(0)}, accelerator: 'CmdOrCtrl+Alt+P'}
            ]
        },
        {
            label: 'Help',
            submenu: [
                {label: 'About', click() {aboutWindow();}, accelerator: 'CmdOrCtrl+Shift+A' }
            ]
        }
    ])
    Menu.setApplicationMenu(menu);

    //~ win.webContents.openDevTools();
    win.loadFile('index.html');
}

function dialogDirectory() {
    dialog.showOpenDialog(win, {
        properties: ['openDirectory']},
        (filePaths) => { win.webContents.send('open_directory', filePaths); });
}

function aboutWindow() {
    child = new BrowserWindow({
        width: 300,
        height: 100,
        parent: win,
        modal: true,
        show: false,
        title: "About Slideshow"});
    child.setMenuBarVisibility(false);
    
    content = `
        <html>
            <head></head>
            <body>
                <p>
                    <b>Slideshow</b><br/>
                    <b>GPL 2019</b><br/>
                    Original Proyect: <a target="_blank" href="javascript: openBrowser('https://github.com/scottgarner/Thumblr');">Scott Garner</a>
                </p>
            </body>
            <script type="text/javascript">
                function openBrowser(link) {
                    require("electron").shell.openExternal(link);
                }
            </script>
        </html>`;
    
    let file = 'data:text/html,' + encodeURIComponent(content);
    child.loadURL(file);
    child.show();
}

app.on('ready', createWindow);