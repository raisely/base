(function($){

  $.fn.carousel = function(options) {

    //variables
    var element = $(this);
    var defaults = {
        slide: 'img',
        transition: 'fade',
        speed: 5000,
        active: 'active',
        first: 'first',
        last: 'last-active'
    };
    var options = $.extend(defaults, options);
    
    return this.each(function() {

        //basic dom setup + styling
        element.find(options.slide).addClass('slide');

        //get the first slide
        element.find(options.slide+':first').addClass(options.active + ' ' + options.first);

        //swap slides
        var swap = function() {
            var next = element.find('.'+options.active).next(options.slide);
            
            //loop through slides
            if (!next.length > 0)
                next = element.find('.'+options.first);

            //add active class
            element.find('.'+options.last).removeClass(options.last);
            element.find('.'+options.active).removeClass(options.active).addClass(options.last);
            next.addClass(options.active);

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