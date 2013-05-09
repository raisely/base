(function($){

  $.fn.carousel = function(options) {

    //variables
    var element = $(this);
    var defaults = {
        slide: 'img',
        transition: 'fade',
        speed: 5000
    };
    var options = $.extend(defaults, options);

    //styles
    var active = {
        position: 'relative',
        'z-index': 1,
        opacity:1
    }
    var inactive = {
        position: 'absolute',
        'z-index': 0,
        opacity:0,
        top:0
    }

    
    return this.each(function() {

        //basic dom setup + styling
        element.css({
            position: 'relative',
        });
        element.find(options.slide).addClass('slide').css(inactive);

        //get the first slide
        element.find(options.slide+':first').addClass('active first').css(active);

        //swap slides
        var swap = function() {
            var next = element.find('.active').next(options.slide);
            
            //loop through slides
            if (!next.length > 0)
                next = element.find('.first');

            element.find('.active').removeClass('active').css(inactive);
            next.addClass('active').css(active);
        }

        //run swap function
        run = setInterval(function(){
            swap();
        }, options.speed);

        //pause on hover
        element.hover(function(){
            clearInterval(run);
        }, function() {
            run = setInterval(function(){
                swap();
            }, options.speed);
        });


    });

  };

})(jQuery);