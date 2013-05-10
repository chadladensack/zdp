AppCookie = {
    /**
     * @param {object} URI url
     * @param {string[]} array Cookie names as an array
     * @param {function} fn Callback function
     */
    get : function(url, names, fn) {
        chrome.cookies.getAll({
            domain : url.hostname()
        }, function(cookies) {
            var _cookies = {
                length : 0
            };
            for ( var i = 0; i < cookies.length; ++i) {
                if ($.inArray(cookies[i].name, names) > -1) {
                    _cookies[cookies[i].name] = cookies[i];
                    _cookies.length++;
                };
                // If our list of cookies is equal to the list of provided
                // names, we are done, break out the loop.
                if (cookies.length == names.length) {
                    break;
                };
            };
            fn(_cookies);
        });
    },

    /**
     * @param {object} data
     * @param {object} URI url
     */
    update : function(data, url) {
        for ( var n in data) {
            if (data[n] != '') {
                // If the property has a value set a cookie
                chrome.cookies.set({
                    name : n,
                    value : data[n].toString(),
                    url : url.protocol() + '://' + url.host()
                });
            } else {
                // If the property is empty, remove the cookie
                chrome.cookies.remove({
                    name : n,
                    url : url.protocol() + '://' + url.host()
                });
            };
        };
    }
};