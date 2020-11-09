const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain, nativeImage } = require('electron');
const electron = require('electron');
const dialog = electron.dialog;

// BUG: it takes all time the local icon instead from the system (deb)
var icon_path = path.join(app.getAppPath(), './images/icon.png');
var icon = nativeImage.createFromPath(icon_path);
var win;

// Command line
global.command_line = null;

let command_line = {};
if (process.argv.length > 1) {
    let app_filename = process.argv[0];
    process.argv.splice(0, 1);
    if (process.argv.indexOf('main.js') !== -1) {
        process.argv.splice(0, 1); // When it launch as npm start
    }
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
        console.log('   -b | --debug : enable debug mode (only devs)');
        app.exit(0);
    }
    let index_delay = process.argv.findIndex(element => (element == '-d' || element == '--delay'));
    if (index_delay != -1) {
        command_line['delay'] = process.argv[index_delay + 1];
        process.argv.splice(index_delay, 1);
        process.argv.splice(index_delay + 1, 1);
    }
    let index_max = process.argv.findIndex(element => (element == '-m' || element == '--max'));
    if (index_max != -1) {
        command_line['max_photos'] = process.argv[index_max + 1];
        process.argv.splice(index_max, 1);
        process.argv.splice(index_max + 1, 1);
    }
    
    let index_sort = process.argv.findIndex(element => (element == '-s' || element == '--sort'));
    if (index_sort != -1) {
        command_line['sort'] = process.argv[index_sort + 1];
        process.argv.splice(index_sort, 1);
        process.argv.splice(index_sort + 1, 1);
    }
    
    let index_reverse = process.argv.findIndex(element => (element == '-r' || element == '--reverse'));
    if (index_reverse != -1) {
        command_line['reverse'] = true;
        process.argv.splice(index_reverse, 1);
    }
    
    let index_random = process.argv.findIndex(element => (element == '-z' || element == '--random'));
    if (index_random != -1) {
        command_line['random'] = true;
        process.argv.splice(index_random, 1);
    }
    
    let indexdebug = process.argv.findIndex(element => (element == '-b' || element == '--debug'));
    if (indexdebug != -1) {
        command_line['debug'] = true;
        process.argv.splice(indexdebug, 1);
    }
    
    while (process.argv.length > 0) {
        try {
            var path_dir = process.argv[0];
            process.argv.splice(0, 1);
            var fullpath_dir = fs.realpathSync(process.argv[0]);
            command_line['directory_images'] = fullpath_dir;
        }
        catch (error) {
            // Do none
        }
    }
}
global.command_line = command_line;

function toggleFullScreen() {
    win.setFullScreen(!win.isFullScreen());
}
ipcMain.on('toggleFullScreen', (event, arg) => {toggleFullScreen();})

function createWindow () {
    win = new BrowserWindow({
        icon: icon,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });
    if (global.command_line['debug']) {
        global.win = win;
    }
    
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
            label: 'View',
            submenu: [
                {label: 'Toggle FullScreen', click() {toggleFullScreen();}, accelerator: 'F11'},
                {label: 'Reset', click() {win.webContents.send('reset');}, accelerator: 'CmdOrCtrl+R'}
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
    
    if (global.command_line['debug']) {
        win.webContents.openDevTools();
    }
    win.loadFile('index.html');
}

function dialogDirectory() {
    dialog.showOpenDialog(win, {properties: ['openDirectory']})
        .then(result => {
            if (!result.canceled) {
                win.webContents.send('open_directory', result.filePaths);
            }
        })
        .catch(err => {console.log(err)});
}

function preferencesWindow() {
    child = new BrowserWindow({
        width: 600,
        height: 300,
        parent: win,
        alwaysOnTop: true,
        resizable: false,
        show: false,
        title: "Preferences",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }});
    child.setMenuBarVisibility(false);
    
    if (global.command_line['debug']) {
        child.webContents.openDevTools();
    }
    child.loadFile('preferences.html');
    child.show();
}

function aboutWindow() {
    child = new BrowserWindow({
        width: 450,
        height: 200,
        parent: win,
        resizable: false,
        alwaysOnTop: true,
        show: false,
        title: "About Slideshow",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }});
    child.setMenuBarVisibility(false);
    if (global.command_line['debug']) {
        child.webContents.openDevTools();
    }
    child.loadFile('about.html');
    child.show();
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    app.quit();
});