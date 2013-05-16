/**
 * Debugging interface and runtime information
 */
var ZendDebug = {

    tabId : null,
    tabUri : {},
    
    cookie : {},
    reload : false,
    
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
    
    executeBuild : function(cookieData, reload) {
        this.reload = reload;
        
        if (typeof cookieData == 'object') {
            this.cookie = $.extend({}, ZendCookie.getValues(), cookieData);
            
            if (AppSettings.studio.enabled == 'auto_detect') {
                this.getClient();
            }
        }
        
        this.executeFinish(this.cookie, this.tabUri, this.reload);
    },
    
    executeFinish : function(cookies, tabUri, reload) {
        AppCookie.update(cookies, tabUri);
        
        if (reload === true) {
            chrome.tabs.reload(this.tabId);
            window.close();
        }
        
        ZendDebug.updateRadios();
    },
    
    debugCurrent : function() {
        this.executeBuild({
            original_url : ZendDebug.tabUri.href(),
            debug_new_session : '1'
        }, true);
    },

    debugNext : function() {
        this.executeBuild({
            original_url : ZendDebug.tabUri.href(),
            debug_new_session : '1'
        }, false);
    },

    debugPost : function() {
        this.executeBuild({
            original_url : ZendDebug.tabUri.href(),
            debug_start_session : 'POST'
        }, false);
    },

    debugStart : function() {
        this.executeBuild({
            original_url : ZendDebug.tabUri.href(),
            debug_start_session : '1'
        }, false);
    },
    
    profileCurrent : function() {
        this.executeBuild({
            original_url : ZendDebug.tabUri.href(),
            debug_new_session : '1',
            start_profile : '1'
        }, true);
    },

    profileNext : function() {
        this.executeBuild({
            original_url : ZendDebug.tabUri.href(),
            debug_new_session : '1',
            start_profile : '1'
        }, false);
    },

    stopAll : function() {
        this.cookie = ZendDebugDefault;
        
        this.executeBuild(false, false);
    },

    getClient : function() {
        var req = new XMLHttpRequest();
        req.open('get', 'http://localhost:' + AppSettings.studio.auto_detect.port, true);
        req.addEventListener('load', function (e) {
            var uri = new URI('?' + e.target.responseText.trim());
            var data = uri.search(true);
            
            ZendDebug.cookie = $.extend({}, ZendDebug.cookie, data);
            ZendDebug.executeFinish(ZendDebug.cookie, ZendDebug.tabUri, ZendDebug.reload);
        }, false);
        
        req.send(null);
    }
};

// initalize the application. Executed every time the "toolbar" window is opened.
$(function() {
    ZendDebug.init();
});