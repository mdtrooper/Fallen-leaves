const Store = require('electron-store');

const store = new Store();

var preferences = {
    a: 1,
    
    init: function () {
        $("#seconds").val(store.get('seconds', SECONDS_DEFAULT));
        $("#max_photos").val(store.get('max_photos', MAX_PHOTOS));
    }
};
