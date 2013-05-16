var AppOptions = {
    formId : '#settings',
    saveMessageId : '#savemessage',
    
    init : function() {
        this.loadValues(AppSettings);
        
        $(this.formId).on('submit', AppOptions.submit);
    },
    
    loadValues : function(values) {
        var settings = decodeURIComponent($.param(values)).split('&');
        for (var i in settings) {
            setting = settings[i].split('=');
            
            name = setting[0].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            value = setting[1];
            
            $(this.formId).find(':input[name="' + name + '"]').val(value);
        };
    },
    
    submit : function() {
        var input = $(this).serializeArray();
        
        for (var i=0; i<input.length; ++i) {
            localStorage[input[i].name] = input[i].value;
        };
        
        $(AppOptions.saveMessageId).show();
        
        window.setTimeout(function() {
            $(AppOptions.saveMessageId).fadeOut('fast');
        }, 2500);
        
        return false;
    }
};

// initalize the options display
$(function() {
    AppOptions.init();
});