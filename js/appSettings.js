/**
 * Default application options
 * 
 * @param object
 */
var AppSettings = $.extend({
    general : {
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
}, localStorage);