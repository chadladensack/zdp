var AppOptions = {
    idForm : '#settings',
    idSaveMessage : '#savemessage',
    idClientType : 'select[name="studio\\[enabled\\]"]',
    
    init : function() {
        this.loadValues(AppSettings.getValues());
        
        $(this.idForm).on('submit', AppOptions.submit);
        
        $(this.idClientType).change(AppOptions.clientDetection);
        $(this.idClientType).trigger('change');
    },
    
    loadValues : function(values) {
        var settings = decodeURIComponent($.param(values)).split('&');
        for (var i in settings) {
            setting = settings[i].split('=');
            
            name = setting[0].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            value = setting[1];
            
            $(this.idForm).find(':input[name="' + name + '"]').val(value);
        };
    },
    
    clientDetection : function() {
        $('.client').hide();
        $('.client.' + $(this).val()).show();
    },
    
    submit : function() {
        var input = $(this).serializeArray();
        
        for (var i=0; i<input.length; ++i) {
            localStorage[input[i].name] = input[i].value;
        };
        
        $(AppOptions.idSaveMessage).show();
        
        window.setTimeout(function() {
            $(AppOptions.idSaveMessage).fadeOut('fast');
        }, 2500);
        
        return false;
    }
};

// initalize the options display
$(function() {
    AppOptions.init();
});