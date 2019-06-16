var test_list_images = [ "https://66.media.tumblr.com/27777e63aaeed6a9312eb9456991e412/tumblr_pbnj0bgEfs1uauc9ho1_1280.png" , "https://66.media.tumblr.com/905b2912052bcd51e569336654676cdb/tumblr_pbnix8uwDy1uauc9ho1_1280.png" , "https://66.media.tumblr.com/fa885b76dc366cd5b6ac59dc892032b3/tumblr_pbniup9RA51uauc9ho1_500.png" , "https://66.media.tumblr.com/22912576239361ad25e08d8b705cd743/tumblr_pah48rjquC1uauc9ho1_640.png" , "https://66.media.tumblr.com/259848d4271fb33de5f1f0f4f906b477/tumblr_p9fdjmib0X1uauc9ho1_1280.png" , "https://66.media.tumblr.com/9be57575a427059692d5adfc86e978bf/tumblr_p41fq0hAk01uauc9ho1_1280.png" , "https://66.media.tumblr.com/ebd57a645144b0a33e2d15218237e9f8/tumblr_p37h3vt35A1uauc9ho1_1280.png" , "https://66.media.tumblr.com/d96ff363d9328f4fa1bdb50ce474952e/tumblr_p2iywveghE1uauc9ho1_1280.png" , "https://66.media.tumblr.com/e29485628f581f3eb4ab02eb6436a2c8/tumblr_p1x8v5DeTk1uauc9ho1_1280.png" , "https://66.media.tumblr.com/cdbc669dc63a42ce95f516a42457735f/tumblr_ozb846Hfhi1uauc9ho1_540.png" , "https://66.media.tumblr.com/53b37326ff27ca0a571900d8c0668449/tumblr_oxgdm5lx8d1uauc9ho1_1280.png" , "https://66.media.tumblr.com/04098bb3d478dda1a1001f2bf3c53b89/tumblr_owatp4n2Xx1uauc9ho1_1280.png" , "https://66.media.tumblr.com/55289af4029aef7f9b7003db30ae4395/tumblr_outw5z2KSp1uauc9ho1_1280.png" , "https://66.media.tumblr.com/ec44107f63c3ec317a1c42fd041543d8/tumblr_ou56yk9nHk1uauc9ho1_1280.png" , "https://66.media.tumblr.com/cc9706dc7cf2f52b04b5020af9291d8c/tumblr_ou052mKnQU1uauc9ho1_1280.png" , "https://66.media.tumblr.com/816c65d2aec2c4e66cb531924d7b400d/tumblr_otc6tgmMV11uauc9ho1_1280.png" , "https://66.media.tumblr.com/825611906e897ff11a7bda180b952d8e/tumblr_ot0ff77scj1uauc9ho1_1280.png" , "https://66.media.tumblr.com/534a87c3d4d452cb6393b79ad27f61f4/tumblr_ot0feg3csM1uauc9ho1_1280.png" , "https://66.media.tumblr.com/b03a0d98df937c82d9d26a07039bd67d/tumblr_ot0fd5Y60I1uauc9ho2_1280.png" , "https://66.media.tumblr.com/de407d275e8bc281fdf95bd88d54a9a1/tumblr_opfl8ymTBS1uauc9ho1_1280.png" , "https://66.media.tumblr.com/7d2d9e723cc6dc137b8f7568d3291223/tumblr_ons8rvcmzp1uauc9ho1_1280.png" , "https://66.media.tumblr.com/e767072b5365bae1fbd830f69c86afeb/tumblr_omnlgiifbk1uauc9ho1_r2_1280.png" , "https://66.media.tumblr.com/2db05e09142ed8a9d38283d829a4b358/tumblr_olmuytdag21uauc9ho1_1280.png" , "https://66.media.tumblr.com/b8017cc6130dfb105bfb4506089cbcba/tumblr_olksuqgPBk1uauc9ho1_1280.png" , "https://66.media.tumblr.com/e8fe42f86cc3273dc078749aac3f4d25/tumblr_okrx2mgSc61uauc9ho1_1280.jpg" , "https://66.media.tumblr.com/ce8bbf518ec0fde3503f74f135bb37c4/tumblr_ojrx2lKU2Y1uauc9ho1_1280.png" , "https://66.media.tumblr.com/dda0df397c667b8968483906652d2efe/tumblr_ohteirIDT81uauc9ho1_1280.png" , "https://66.media.tumblr.com/329e6a53021cfd7c09f4fb676ecd4870/tumblr_ofgh43BSkC1uauc9ho1_1280.png" , "https://66.media.tumblr.com/36bbb2ae541c1c95f40e22f7e54b9d07/tumblr_odld117AEt1uauc9ho1_1280.png" , "https://66.media.tumblr.com/c20c1f24ae5f7bf22adfe4a93d82b8d3/tumblr_od4n19y2vn1uauc9ho1_1280.png" , "https://66.media.tumblr.com/d73d9603be180d191a468edd5043f42e/tumblr_obr0blLC1B1uauc9ho1_1280.png" , "https://66.media.tumblr.com/bd8aba78a88317199365967b5abcc65f/tumblr_oboj3xMyXY1uauc9ho1_1280.png" , "https://66.media.tumblr.com/cc72af071ce5ddde79807e083c14b91d/tumblr_o9sss78CMQ1uauc9ho2_1280.png" , "https://66.media.tumblr.com/db90019bfcb7b5d8c4122e88ce07799c/tumblr_o9f38xbQkS1uauc9ho1_1280.png" , "https://66.media.tumblr.com/d6d9ae8093b8db256c8bce8dacd8f147/tumblr_o6eg6eRkFW1uauc9ho1_1280.png" , "https://66.media.tumblr.com/2aaaaf13732dda39684b060bef49ef85/tumblr_o5kb2bKWGc1uauc9ho1_1280.png" , "https://66.media.tumblr.com/9f904b2c2bb2556f250318eeaff7961c/tumblr_o1ybh2ZBdJ1uauc9ho1_1280.png" , "https://66.media.tumblr.com/0b2c6c16b39ea45559ba67443f5ff16a/tumblr_o171f6z8QB1uauc9ho1_1280.png" , "https://66.media.tumblr.com/648c7a07605002f82f79218f8d519c16/tumblr_o1717rBbYV1uauc9ho1_1280.jpg" , "https://66.media.tumblr.com/7edb8f225d75fcbd9e54aae2bc62dc09/tumblr_nx05g8rUCl1uauc9ho1_1280.png" , "https://66.media.tumblr.com/b2d9ebf0e4bf3616118fceacef7b4435/tumblr_nuzg80BXrG1uauc9ho1_1280.png" , "https://66.media.tumblr.com/fffb29e6552ce2a2dd6429242f1aaf3d/tumblr_ntzw04BqhD1uauc9ho1_1280.png" , "https://66.media.tumblr.com/edb7ce61d5f5299482e1b3603142e6a3/tumblr_ntwd0zdHMx1uauc9ho1_1280.png" , "https://66.media.tumblr.com/2f20eaf53de6c8f239698dbd22fbb0a4/tumblr_ntn8z3QCfE1uauc9ho1_1280.png" , "https://66.media.tumblr.com/2aef2660a205021b12ef8e6a2202d8b8/tumblr_ntevshLciC1uauc9ho1_1280.png" , "https://66.media.tumblr.com/8939c4f4b8cd2f22986bcf67dadb370d/tumblr_nta7p8lOzW1uauc9ho1_1280.png" , "https://66.media.tumblr.com/60ba38e6e5357ed5e4e098dd2302f452/tumblr_nt7ltoqXHq1uauc9ho1_1280.png" , "https://66.media.tumblr.com/9203ac852fffba91950067ed7b06d145/tumblr_nr3yh79Cao1uauc9ho1_1280.png" , "https://66.media.tumblr.com/5a1631ae26957fdf674a735925f33cb6/tumblr_nr3y9y9yHD1uauc9ho1_640.jpg" , "https://66.media.tumblr.com/1617b4c0918441ba38dec20d7305bcb1/tumblr_nr3y9gAW3E1uauc9ho1_640.png" ];
var test_list_sizes = [];

const { ipcRenderer } = require('electron');

ipcRenderer.on('open_directory', (event, arg) => {
    alert(arg);
});

var thumblr = {
    imageIndex: 0,
    maxZIndex: 1,
    tumblrData: null,
    
    init: function () {
        thumblr.fetchData(thumblr.username);
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
        if (thumblr.imageIndex >= test_list_images.length) {
            return -1;
        }
        
        var curImage = test_list_images[thumblr.imageIndex];
        var tempImage = new Image();
        tempImage.onload = function () { test_list_sizes[thumblr.imageIndex] = [this.width, this.height]; }
        tempImage.src = curImage;
    },
    
    addImage: function() {
        if (thumblr.imageIndex >= test_list_images.length) {
            clearTimeout (thumblr.interval);
            thumblr.fetchData();
            return -1;
        }
        
        var curUrl = test_list_images[thumblr.imageIndex];
        var curImage = test_list_images[thumblr.imageIndex];
        var curWidth = test_list_sizes[thumblr.imageIndex][0];
        var curHeight = test_list_sizes[thumblr.imageIndex][1];
        var curSlug =  test_list_images[thumblr.imageIndex];
        
        curHeight = (curHeight / curWidth) * 500 * .75;
        curWidth = 500 * .75;
        
        photo = $('<img>', { 
            src : curImage, 
            width : curWidth, 
            height : curHeight, 
            alt : curSlug, 
            title : curSlug,
            class: "photo animated",
            'data-url': curUrl
        });
        
        $(photo).css('left', (Math.random() * window.innerWidth) - (curWidth / 2));
        $(photo).css('top', (Math.random() * window.innerHeight) - (curHeight / 2));
        $(photo).css('zIndex', thumblr.maxZIndex);
        $(photo).toggleClass("appear");
        
        $(photo).mousedown(function () {
            $(this).css('zIndex', ++thumblr.maxZIndex);
        });
        
        $(photo).dblclick(function () {
            window.open($(this).attr('data-url'));
        });
        
        $('#stage').append(photo);
        $(photo).draggable();
        
        thumblr.imageIndex++;
        thumblr.preloadImage();
    }
};