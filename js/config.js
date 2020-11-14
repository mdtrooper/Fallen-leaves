const remote = require('electron').remote;
const Store = require('electron-store');

const store = new Store();

const TYPE = 'fallen_leaves';
const DELAY = 4;
const MAX_PHOTOS = 1000; // TO DO: Implement a method to delete old images.
const SORT = 'alphabetic';
const RANDOM = true;
const REVERSE = true;

var command_line = remote.getGlobal('command_line');

function get_config(config_name, config_value) {
    if (typeof(config_value) == 'undefined') {
        switch (config_name) {
            case 'type':
                config_value = TYPE;
                break;
            case 'delay':
                config_value = DELAY;
                break;
            case 'max_photos':
                config_value = MAX_PHOTOS;
                break;
            case 'sort':
                config_value = SORT;
                break;
            case 'random':
                config_value = RANDOM;
                break;
            case 'reverse':
                config_value = REVERSE;
                break;
        }
    }
    
    if (config_name in command_line) {
        return command_line[config_name];
    }
    return store.get(config_name, config_value)
}