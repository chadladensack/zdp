/**
 * Default application options
 * 
 * @param object
 */
var AppSettings = {
    types : {
        callClient : 'auto_detect',
        options : [
            'auto_detect',
            'manual'
        ],
        display : {
            auto_detect : {
                label : 'Auto Detect'
            },
            manual : {
                label : 'Manual'
            }
        }
    },
    
    defaultValues : {
        general : {
            // @todo maybe add a search toolbar to the popup window?
            enable_search_toolbar : true
        },
        session : {
            use_fast_files : true,
            debug_local_copy : true,
            break_on_first_line : true
        },
        studio : {
            enabled : 'auto_detect',
            auto_detect : {
                port: '20080'
            },
            manual : {
                debug_host : 'localhost',
                debug_port : '10137'
            }
        }
    },
    
    values : {},
    
    init : function(callback) {
        chrome.storage.local.get(null, function(items) {
            AppSettings.setOptions(items, callback);
        });
    },
    
    setOptions : function(items, callback) {
        AppSettings.values = $.extend({}, AppSettings.getDefault(), items);
        
        callback();
    },
    
    getValues : function() {
        return AppSettings.values;
    },
    
    getDefault : function() {
        return this.defaultValues;
    }
};