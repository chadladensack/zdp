/**
 * Debugging interface and runtime information
 */
var ZendDebug = {
    
    tabId : null,
    tabUri : {},
    
    init : function() {
        // tab change events
        chrome.windows.getCurrent(function(w) {
            chrome.tabs.getSelected(w.id, function(tab) {
                ZendDebug.tabUri = new URI(tab.url);
                ZendDebug.tabId = tab.id;
                
                ZendDebug.updateRadios();
            });
        });
        
        // popup client events
        $('.control').click(function() {
            var action = $(this).data('action');
            
            if ($(this).find('.checkbox').eq(0).hasClass('on')) {
                action = 'stopAll';
            }
            
            if (action) {
                ZendDebug[action]();
            }
        });
        
        // "setting" icon client event
        $('#settings').on('click', function(){
            chrome.tabs.create({url: 'options.html'});
            return false;
        });
        
        ZendDebug.updateInfo();
    },
    
    updateInfo : function() {
        var cookie = ZendCookie.getValues();
        var appSettings = AppSettings.getValues();
        
        if (appSettings.studio.enabled == 'auto_detect') {
            this.getClient(cookie, false, ZendDebug.updateInfoEnd);
        } else {
            ZendDebug.updateInfoEnd(cookie, false);
        }
    },
    
    updateInfoEnd : function(cookie, reload) {
        var appSettings = AppSettings.getValues();
        var type = appSettings.studio[appSettings.studio.enabled].label;
        var port = cookie.debug_port;
        var host = cookie.debug_host;
        
        host = (host.length > 15) ? host.substring(0, 15) + '...' : host;
        
        $('.info .type div').attr('title', type).text(type);
        $('.info .ip div').attr('title', cookie.debug_host).text(host);
        $('.info .port div').attr('title', port).text(port);
    },
    
    updateRadios : function() {
        $('.control').attr('disabled', 'disabled');
        
        // reset all the radio options
        $('.control .checkbox').removeClass('on');
        
        // now turn on the correct radio option
        AppCookie.get(ZendDebug.tabUri, ['ZDEDebuggerPresent', 'debug_start_session', 'debug_new_session', 'start_debug', 'start_profile'], function (cookies) {
            var prefix = 'debug';
            if (typeof cookies['start_profile'] == 'object' && cookies.start_profile.value == '1') {
                prefix = 'profile';
            }
            
            // Find the Zend Debug cookie
            if (typeof cookies['ZDEDebuggerPresent'] == 'undefined') {
                return console.error('ZDE debugger not present');
            };
            
            $('.control').removeAttr('disabled');
            
            // Set the state of the debug using cookies during load up
            if (typeof cookies['debug_start_session'] == 'object') {
                if (cookies.debug_start_session.value === '1') {
                    $('#' + prefix + 'Start').addClass('on');
                };
                
                if (cookies.debug_start_session.value === 'POST') {
                    $('#' + prefix + 'Post').addClass('on');
                };
            } else if (typeof cookies['debug_new_session'] == 'object' && (
                    typeof cookies['start_debug'] == 'object' || typeof cookies['start_profile'] == 'object')) {
                if (cookies.debug_new_session.value == '1' && (cookies.start_debug.value == '1' || cookies.start_profile.value == '1')) {
                    $('#' + prefix + 'Next').addClass('on');
                };
            };
            
            return true;
        });
    },
    
    executeStart : function(cookie, reload) {
        var appSettings = AppSettings.getValues();
        cookie = $.extend({}, ZendCookie.getValues(), cookie);
        
        if (appSettings.studio.enabled == 'auto_detect') {
            this.getClient(cookie, reload, ZendDebug.executeEnd);
        } else {
            this.executeEnd(cookie, reload);
        }
    },
    
    executeEnd : function(cookies, reload) {
        AppCookie.update(cookies, this.tabUri);
        
        if (reload === true) {
            chrome.tabs.reload(this.tabId);
            window.close();
        }
        
        ZendDebug.updateRadios();
    },
    
    debugCurrent : function() {
        this.executeStart({
            original_url : ZendDebug.tabUri.href(),
            debug_new_session : '1'
        }, true);
    },

    debugNext : function() {
        this.executeStart({
            original_url : ZendDebug.tabUri.href(),
            debug_new_session : '1'
        }, false);
    },

    debugPost : function() {
        this.executeStart({
            original_url : ZendDebug.tabUri.href(),
            debug_start_session : 'POST'
        }, false);
    },

    debugStart : function() {
        this.executeStart({
            original_url : ZendDebug.tabUri.href(),
            debug_start_session : '1'
        }, false);
    },
    
    profileCurrent : function() {
        this.executeStart({
            original_url : ZendDebug.tabUri.href(),
            debug_new_session : '1',
            start_profile : '1'
        }, true);
    },

    profileNext : function() {
        this.executeStart({
            original_url : ZendDebug.tabUri.href(),
            debug_new_session : '1',
            start_profile : '1'
        }, false);
    },

    stopAll : function() {
        AppCookie.update(ZendCookie.getDefault(), this.tabUri);
    },

    getClient : function(cookie, reload, callback) {
        var req = new XMLHttpRequest();
        var appSettings = AppSettings.getValues();
        
        req.open('get', 'http://localhost:' + appSettings.studio.auto_detect.port, true);
        req.addEventListener('load', function (e) {
            var uri = new URI('?' + e.target.responseText.trim());
            var data = uri.search(true);
            
            callback($.extend({}, cookie, data), reload);
        }, false);
        
        req.send(null);
    }
};

// initalize the application. Executed every time the "toolbar" window is opened.
$(function() {
    ZendDebug.init();
});