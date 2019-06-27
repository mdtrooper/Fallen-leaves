var preferences = {
    init: function () {
        $("#delay").val(get_config('delay'));
        $("#max_photos").val(get_config('max_photos'));
        $("#sort").val(get_config('sort'));
        $("#random").prop('checked', get_config('random'));
        $("#reverse").prop('checked', get_config('reverse'));
        
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
