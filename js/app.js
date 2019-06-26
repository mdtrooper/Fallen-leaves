const { ipcRenderer } = require('electron');
const fs = require('fs');
const mime = require('mime-types');
const Store = require('electron-store');

var remote = require('electron').remote,
      argv = remote.getGlobal('argv');

const store = new Store();

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
    list_images = [];
    list_images = [];
    let path = arg[0];
    fs.readdir(path, (err, dir) => {
        for (let file of dir) {
            let filepath = `${arg[0]}/${file}`;
            let mimetype = mime.lookup(filepath);
            if (mimetype === false) continue;
            if (mimetype.split('/')[0] == 'image') {
                list_images.push(filepath);
            }
        }
        
        if (store.get('random', RANDOM)) {
            list_images = shuffle(list_images);
        }
        else {
            // Sort
            list_images.sort(function(a, b) {
                switch (store.get('sort', SORT)) {
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
            if (store.get('reverse', REVERSE)) {
                list_images = list_images.reverse();
            }
        }
        
        fallen_leaves.path = path;
        
        fallen_leaves.fetchData();
    });
});

var fallen_leaves = {
    imageIndex: 0,
    maxZIndex: 1,
    tumblrData: null,
    path: null,
    
    init: function () {
        
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
        
        clearTimeout (fallen_leaves.interval);
        fallen_leaves.interval = setInterval ( "fallen_leaves.addImage()", 4000 );
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
