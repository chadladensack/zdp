var ZendCookie = {
     // must all be empty - this is used to clear all related cookies
    defaultValues : {
        _bm : '',
        ZendDebuggerCookie : '',
        debug_line_bp : '',
        debug_file_bp : '',
        start_debug : '',
        start_profile : '',
        debug_port : '',
        debug_host : '',
        send_debug_header : '',
        debug_stop : '',
        debug_coverage : '',
        send_sess_end : '',
        debug_jit : '',
        debug_start_session : '',
        debug_new_session : '',
        original_url : '',
        use_ssl : '',
        debug_fastfile : '',
        debug_protocol : '',
        debug_session_id : '',
        no_remote : '',
        use_remote : '',
        use_tunneling : ''
    },
    
    getValues : function() {
        // apply defaults
        var values = $.extend({}, this.getDefault(), {
            ZendDebuggerCookie : 'php',
            send_debug_header : '1',
            send_sess_end : '1',
            start_debug : '1',
            debug_jit : '1'
        });
        
        // apply application settings
        var appSettings = AppSettings.getValues();
        values.debug_host = appSettings.studio.manual.debug_host;
        values.debug_port = appSettings.studio.manual.debug_port;
        values.debug_fastfile = (appSettings.session.use_fast_files == true) ? '1' : '0';
        values.debug_stop = (appSettings.session.break_on_first_line == true) ? '1' : '0';
        
        // odd switch between two vars - Zend Debugger wants it this way
        if (appSettings.session.debug_local_copy == true) {
            values.use_remote = '1';
        } else if (appSettings.session.debug_local_copy == false) {
            values.no_remote = '1';
        };
        
        // this is renewed each time we need to make a request
        values.debug_session_id = (Math.floor(Math.random() * 147483648) + 2000);
        
        return values;
    },
    
    getDefault : function() {
        return this.defaultValues;
    }
};
