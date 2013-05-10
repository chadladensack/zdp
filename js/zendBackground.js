var checkZendDebugger = function(tabId) {
    chrome.tabs.get(tabId, function(tab) {
        if (typeof tab == 'object' && tab['url']) {
            
            var uri = new URI(tab.url);
            AppCookie.get(uri, ['ZDEDebuggerPresent'], function(cookies) {
                // see if the Zend Debug cookie is set by the server
                if (typeof cookies['ZDEDebuggerPresent'] == 'undefined') {
                    chrome.browserAction.setIcon({
                        path : '/img/ico-off.png'
                    });
                    
                    return true;
                };
                
                chrome.browserAction.setIcon({
                    path : '/img/ico-on.png'
                });
                
                return true;
            });
            
        };
    });
};

chrome.tabs.onUpdated.addListener(checkZendDebugger);
chrome.tabs.onActiveChanged.addListener(checkZendDebugger);