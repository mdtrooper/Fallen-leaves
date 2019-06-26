const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const electron = require('electron')
const dialog = electron.dialog

var win;

// Command line
if (process.argv.length > 1) {
    let app_filename = process.argv[0];
    if (process.argv.findIndex(element => (element == '-h' || element == '--help')) != -1) {
        console.log('Fallen leaves is a simple slideshow viewer, the photos shows as falling leaves in the autumn.');
        console.log(`${app_filename} <directory_images> <options>`);
        console.log('');
        console.log('Options:');
        console.log('   -d | --delay <number> : seconds delay between showing images');
        console.log('   -m | --max <number> : max photos in stage');
        console.log('   -s | --sort (alphabetic|date|size) : sort images');
        console.log('   -r | --reverse : flag to sort reverse images');
        console.log('   -z | --random : flag to sort random images');
        app.exit(0);
    }
}

global.argv = process.argv;

function createWindow () {
    win = new BrowserWindow({
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
                {label: 'Preferences', click() {preferencesWindow();}, accelerator: 'CmdOrCtrl+Alt+P'}
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

    win.webContents.openDevTools();
    win.loadFile('index.html');
}

function dialogDirectory() {
    dialog.showOpenDialog(win, {
        properties: ['openDirectory']},
        (filePaths) => { win.webContents.send('open_directory', filePaths); });
}

function preferencesWindow() {
    child = new BrowserWindow({
        width: 600,
        height: 300,
        parent: win,
        modal: true,
        show: false,
        title: "Preferences"});
    child.setMenuBarVisibility(false);
    
    //~ child.webContents.openDevTools();
    child.loadFile('preferences.html');
    child.show();
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
                    <b>Fallen leaves</b><br/>
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
