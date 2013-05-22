(function($){
  $.fn.fullscreen = function() {

    return this.each(function() {
        
        //variables
        var $element = $(this);
        var $container = $("<div>");
        var $image = $("<img>");
        var image_path = $element.css("background-image").replace('url(','').replace(')','');
        
        //$element.css({ "background-size":"cover" });
        $element.css({ "background-image":"none" });

        $image.attr("src",image_path).load(function(data) {
            
            $element.prepend($container.prepend($image));
            image_ratio = $image.width() / $image.height();
            $container.hide();
            
            window_ratio = $(window).width() / $(window).height();
            
            $container.css({
                "z-index": "-1",
                "position": "fixed",
                "height":"100%",
                "width":"100%"
            });
            
            if(window_ratio > image_ratio){
                $image.css({"width": "100%"});
            }else{
               $image.css({"height": "100%"});
            }

            $container.fadeIn();
            

        });

    });
  };

})(jQuery);