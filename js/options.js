$(function() {
    // save the settings
    $('#settings').on('submit', function(){
        var input = $(this).serializeArray();
        
        for (var i=0; i<input.length; ++i) {
            localStorage[input[i].name] = input[i].value;
        };
        
        $('#savemessage').show();
        
        window.setTimeout(function() {
            $('#savemessage').fadeOut('fast');
        }, 2500);
        
        return false;
    });
    
    // load the settings
    var settings = decodeURIComponent($.param(AppSettings)).split('&');
    for (var i in settings) {
        setting = settings[i].split('=');
        
        name = setting[0].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        value = setting[1];
        
        $('#settings').find(':input[name="' + name + '"]').val(value);
    };
});