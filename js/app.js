const { ipcRenderer } = require('electron');
const { Menu } = remote;
const fs = require('fs');
const mime = require('mime-types');

var context_menu = Menu.buildFromTemplate([
  { label: 'Toggle FullScreen', click() {ipcRenderer.send('toggleFullScreen', null);}, accelerator: 'F11'}
]);

var list_sizes = [];
var list_images = [];

function shuffle(array) {      
    var l = array.length, temp, index;  
    while (l > 0) {  
       index = Math.floor(Math.random() * l);  
       l--;  
       temp = array[l];          
       array[l] = array[index];          
       array[index] = temp;      
    }    
    return array;    
}

ipcRenderer.on('open_directory', (event, arg) => {
    let path = arg[0];
    fallen_leaves.loadDirectory(path);
});

var fallen_leaves = {
    imageIndex: 0,
    maxZIndex: 1,
    tumblrData: null,
    path: null,
    
    init: function () {
        if ('directory_images' in command_line) {
            fallen_leaves.loadDirectory(command_line['directory_images']);
        }
        
        $("body").on('contextmenu', (event, params) => {
          event.preventDefault();
          context_menu.popup();
        });
    },
    
    loadDirectory: function(path) {
        list_images = [];
        list_images = [];
        
        fs.readdir(path, (err, dir) => {
            for (let file of dir) {
                let filepath = `${path}/${file}`;
                let mimetype = mime.lookup(filepath);
                if (mimetype === false) continue;
                if (mimetype.split('/')[0] == 'image') {
                    list_images.push(filepath);
                }
            }
            
            if (get_config('random')) {
                list_images = shuffle(list_images);
            }
            else {
                // Sort
                list_images.sort(function(a, b) {
                    switch (get_config('sort')) {
                        case 'alphabetic':
                            let name_a = a.split('/').pop().split('.')[0]
                            let name_b = b.split('/').pop().split('.')[0]
                            return name_a.localeCompare(name_b);
                            break;
                        case 'date':
                            return fs.statSync(a).mtime.getTime() - 
                                fs.statSync(b).mtime.getTime();
                            break;
                        case 'size':
                            return fs.statSync(a).size - fs.statSync(b).size;
                            break;
                    }
                });
                if (get_config('reverse')) {
                    list_images = list_images.reverse();
                }
            }
            
            fallen_leaves.path = path;
            
            fallen_leaves.fetchData();
        });
    },
    
    reloadTitle: function() {
        $("title").text(`Fallen leaves: ${this.imageIndex}/${list_images.length} '${this.path}'`);
    },
    
    fetchData: function() {
        $('#stage').fadeOut('slow', function() {
            $('.photo').remove();
            $('#stage').show();
            fallen_leaves.addImage();
        });
        
        fallen_leaves.maxZIndex = 0;
        fallen_leaves.imageIndex = 0;
        
        fallen_leaves.preloadImage();
        
        clearTimeout(fallen_leaves.interval);
        fallen_leaves.interval = setInterval ( "fallen_leaves.addImage()", 1000 * get_config('delay'));
    },
    
    preloadImage: function() {
        if (fallen_leaves.imageIndex >= list_images.length) {
            return -1;
        }
        
        var curImage = list_images[fallen_leaves.imageIndex];
        var tempImage = new Image();
        tempImage.onload = function () { list_sizes[fallen_leaves.imageIndex] = [this.width, this.height]; }
        tempImage.src = curImage;
        
        fallen_leaves.reloadTitle();
    },
    
    addImage: function() {
        if (fallen_leaves.imageIndex >= list_images.length) {
            clearTimeout (fallen_leaves.interval);
            fallen_leaves.fetchData();
            return -1;
        }
        
        var curImage = list_images[fallen_leaves.imageIndex];
        var curWidth = list_sizes[fallen_leaves.imageIndex][0];
        var curHeight = list_sizes[fallen_leaves.imageIndex][1];
        
        curHeight = (curHeight / curWidth) * 500 * .75;
        curWidth = 500 * .75;
        
        photo = $('<img>', { 
            src : curImage, 
            width : curWidth, 
            height : curHeight, 
            alt : curImage, 
            title : curImage,
            class: "photo animated"
        });
        
        $(photo).css('left', (Math.random() * window.innerWidth) - (curWidth / 2));
        $(photo).css('top', (Math.random() * window.innerHeight) - (curHeight / 2));
        $(photo).css('zIndex', fallen_leaves.maxZIndex);
        $(photo).toggleClass("appear");
        
        $(photo).mousedown(function () {
            $(this).css('zIndex', ++fallen_leaves.maxZIndex);
        });
        
        $('#stage').append(photo);
        $(photo).draggable();
        
        fallen_leaves.imageIndex++;
        fallen_leaves.preloadImage();
    }
};
