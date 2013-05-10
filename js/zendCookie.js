// MUST all be empty - this is used to clear all related cookies
var ZendDebugDefault = {
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
};

// Defaults - some are configured, some static
var ZendDebugCookie = $.extend({}, ZendDebugDefault, {
    ZendDebuggerCookie : 'php',
    debug_host : AppSettings.studio.manual.debug_host,
    debug_port : AppSettings.studio.manual.debug_port,
    debug_fastfile : (AppSettings.session.use_fast_files == true) ? '1' : '0',

    // Defaults
    send_debug_header : '1',
    send_sess_end : '1',
    start_debug : '1',
    debug_jit : '1',
    debug_stop : (AppSettings.session.break_on_first_line == true) ? '1' : '0',

    // Note: This is renewed each time the popup is opened
    debug_session_id : (Math.floor(Math.random() * 147483648) + 2000)
});

// Odd switch between two vars - ZendDebugger wants it this way
if (AppSettings.session.debug_local_copy == true) {
    ZendDebugCookie.use_remote = '1';
} else if (AppSettings.session.debug_local_copy == false) {
    ZendDebugCookie.no_remote = '1';
};