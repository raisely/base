(function($){
  $.fn.placeholder = function() {

    return this.each(function() {
        
        //variables
        var element = $(this);
        var placeholder = element.attr("placeholder");
        
        //set default placeholder
        element.val(placeholder).addClass("placeholder");
        
        //remove any labels provided for non-js users
        if(element.attr("id").length > 0){
            $("label[for="+element.attr("id")+"]").remove();
        }

        //show/hide placeholder on blur/focus
        element.focus(function(){
            if(element.val()==placeholder) 
                element.val("").removeClass("placeholder");
        }).blur(function(){
            if(element.val()=="") 
                element.val(placeholder).addClass("placeholder");         
        });

        //remove the placeholder on form submit
        element.parent("form").submit(function(){
            if(element.val()==placeholder) element.val("");
            return true;
        });

    });
  };

})(jQuery);