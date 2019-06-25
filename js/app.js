const { ipcRenderer } = require('electron');
const fs = require('fs');
const mime = require('mime-types');
const Store = require('electron-store');

const store = new Store();

var list_sizes = [];
var list_images = [];

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
