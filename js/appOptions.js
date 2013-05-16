var AppOptions = {
    idForm : '#settings',
    idSaveMessage : '#savemessage',
    idClientType : 'select[name="studio\\[enabled\\]"]',
    
    init : function() {
        AppOptions.loadValues(AppSettings.getValues());
        
        $(AppOptions.idForm).on('submit', AppOptions.submit);
        
        $(AppOptions.idClientType).change(AppOptions.clientDetection);
        $(AppOptions.idClientType).trigger('change');
    },
    
    loadValues : function(values) {
        var settings = decodeURIComponent($.param(values)).split('&');
        for (var i in settings) {
            setting = settings[i].split('=');
            
            name = setting[0].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            value = setting[1];
            
            $(AppOptions.idForm).find(':input[name="' + name + '"]').val(value);
        };
    },
    
    clientDetection : function() {
        $('.client').hide();
        $('.client.' + $(this).val()).show();
    },
    
    submit : function() {
        var input = $(this).serializeObject();
        console.log(input);
        chrome.storage.sync.set(input, function() {
            $(AppOptions.idSaveMessage).show();
            
            window.setTimeout(function() {
                $(AppOptions.idSaveMessage).fadeOut('fast');
            }, 2500);
        });
        
        return false;
    }
};

// initalize the options display
$(function() {
    AppSettings.init(AppOptions.init);
});