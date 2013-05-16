(function($){
  $.fn.fullscreen = function() {

    return this.each(function() {
        
        //variables
        var $element = $(this);
        var image = $element.css("background-image");

        $element.css({
            "background-size":"cover"
        });


    });
  };

})(jQuery);