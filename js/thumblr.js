var list_sizes = [];
var list_images = [];

const { ipcRenderer } = require('electron');
const fs = require('fs');
const mime = require('mime-types');

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
        
        thumblr.path = path;
        
        thumblr.fetchData();
    });
});

var thumblr = {
    imageIndex: 0,
    maxZIndex: 1,
    tumblrData: null,
    path: null,
    
    init: function () {
        
    },
    
    reloadTitle: function() {
        $("title").text(`Slideshow: ${this.imageIndex}/${list_images.length} '${this.path}'`);
    },
    
    fetchData: function() {
        $('#stage').fadeOut('slow', function() {
            $('.photo').remove();
            $('#stage').show();
            thumblr.addImage();
        });
        
        thumblr.maxZIndex = 0;
        thumblr.imageIndex = 0;
        
        thumblr.preloadImage();
        
        clearTimeout (thumblr.interval);
        thumblr.interval = setInterval ( "thumblr.addImage()", 4000 );
    },
    
    preloadImage: function() {
        if (thumblr.imageIndex >= list_images.length) {
            return -1;
        }
        
        var curImage = list_images[thumblr.imageIndex];
        var tempImage = new Image();
        tempImage.onload = function () { list_sizes[thumblr.imageIndex] = [this.width, this.height]; }
        tempImage.src = curImage;
        
        thumblr.reloadTitle();
    },
    
    addImage: function() {
        if (thumblr.imageIndex >= list_images.length) {
            clearTimeout (thumblr.interval);
            thumblr.fetchData();
            return -1;
        }
        
        var curImage = list_images[thumblr.imageIndex];
        var curWidth = list_sizes[thumblr.imageIndex][0];
        var curHeight = list_sizes[thumblr.imageIndex][1];
        
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
        $(photo).css('zIndex', thumblr.maxZIndex);
        $(photo).toggleClass("appear");
        
        $(photo).mousedown(function () {
            $(this).css('zIndex', ++thumblr.maxZIndex);
        });
        
        $('#stage').append(photo);
        $(photo).draggable();
        
        thumblr.imageIndex++;
        thumblr.preloadImage();
    }
};