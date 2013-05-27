(function ($) {

    $.fn.carousel = function(options) {

        //variables
        var $element = $(this);
        var defaults = {
            transition: 'fade',
            speed: 5000,
            pauseOnHover: true,
            slide: 'img',
            slideClass: 'slide',            
            activeClass: 'active',
            lastClass: 'last',
            nextClass: 'next'

        };
        var options = $.extend(defaults, options);

        var actions = {


        }
        
        return this.each( function() {


            //css config
            $element.addClass('transition-' + options.transition);
            $element.find(options.slide).addClass(options.slideClass);
            
            //get the first slide
            var $firstSlide = $element.find(options.slide + ':first');
            $firstSlide.addClass(options.activeClass);

            //set the board
            $element.find(options.slide + ':last').addClass(options.lastClass);
            $firstSlide.next(options.slide).addClass(options.nextClass);

            //swap slides
            var step = 0;
            var swap = function() {
                step = step + 1;

                var $next = $element.find('.' + options.activeClass).next(options.slide);                

                //loop through slides
                if ($next.length == 0) {
                    $next = $firstSlide;
                    step = 0;
                }

                //add active class
                $element.find('.' + options.lastClass).removeClass(options.lastClass);
                $element.find('.' + options.nextClass).removeClass(options.nextClass);
                $element.find('.' + options.activeClass).removeClass(options.activeClass).addClass(options.lastClass);
                $next.addClass(options.activeClass);
                
                if ($next.next().length == 0) {
                     $firstSlide.addClass(options.nextClass);
                } else {
                    $next.next().addClass(options.nextClass); 
                }

            }

            //run swap function
            run = setInterval(function(){
                swap();
            }, options.speed);

            //pause on hover
            if (options.pauseOnHover) {
                $element.hover(function(){
                    clearInterval(run);
                }, function() {
                    run = setInterval(function(){
                        swap();
                    }, options.speed);
                });
            }

        });

    };

})(jQuery);