/**
 * Default application options
 * 
 * @param object
 */
var AppSettings = {
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
                label : 'Auto Detect',
                port: '20080'
            },
            manual : {
                label : 'Manual',
                debug_host : 'localhost',
                debug_port : '10137'
            }
        }
    },
    
    getValues : function() {
        return $.extend(this.getDefault(), localStorage);
    },
    
    getDefault : function() {
        return this.defaultValues;
    }
};