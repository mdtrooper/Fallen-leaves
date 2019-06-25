const Store = require('electron-store');

const store = new Store();

var preferences = {
    a: 1,
    
    init: function () {
        $("#seconds").val(store.get('seconds', SECONDS_DEFAULT));
        $("#max_photos").val(store.get('max_photos', MAX_PHOTOS));
        $("#sort").val(store.get('sort', store.get('sort', SORT)));
        $("#random").prop('checked', store.get('random', RANDOM));
        $("#reverse").prop('checked', store.get('reverse', REVERSE));
        
        $("#seconds").on('change', function() {
            store.set('seconds', $(this).val());
        });
        $("#max_photos").on('change', function() {
            store.set('max_photos', $(this).val());
        });
        $("#sort").on('change', function() {
            store.set('sort', $(this).val());
        });
        $("#random").on('change', function() {
            store.set('random', $(this).prop('checked'));
        });
        $("#reverse").on('change', function() {
            store.set('reverse', $(this).prop('checked'));
        });
    }
};
