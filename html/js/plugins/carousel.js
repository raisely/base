// Base Carousel
// A basic carousel script

/*
Todo:
pause on hover + function
arrows
dots
test
*/

(function($) {

    "use strict";

    $.carousel = function (element, options) {

        var defaults = {
            transition: 'fade',
            speed: 3000,
            pauseOnHover: true,
            slide: 'img',
        },
            plugin = this,
            $element = $(element),
            interval;

        // external access: element.data('carousel').settings.propertyName
        plugin.settings = {};

        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);

            plugin.create();

            // private methods
            pauseOnHover();

        };

        // add the basic css classes
        plugin.create = function () {

            // basic css structure
            $element.addClass('transition-' + plugin.settings.transition); // transition class
            $element.find(plugin.settings.slide).addClass('slide'); // slide class

            // set first slide
            plugin.slide(1, true);
            plugin.run();

        };

        // take slider to a specific slide number
        plugin.slide = function (e, d) {

            var i = $element.find(plugin.settings.slide + '.active').index, // get current position    
                $new = $element.find(plugin.settings.slide + ':nth-child(' + e + ')');

            // get prev slide
            if ($new.prev('.slide').length === 0)
                var $prev = $element.find('.slide:last');
            else
                var $prev = $new.prev('.slide');

            // get next slide
            if ($new.next('.slide').length === 0)
                var $next = $element.find('.slide:first');
            else
                var $next = $new.next('.slide');

            if (d == null) var d = (i < $new.index()); // get direction

            // change classes
            $element.find('.slide').removeClass('left active right');
            $new.addClass('active');

            if (d) {
                $prev.addClass('left');
                $next.addClass('right');
            } else {
                $prev.addClass('right');
                $next.addClass('left');
            }

        };

        // call next slide from current slide
        plugin.next = function () {
          
            var next = $element.find('.active').next('.slide').length,
                e = (next == 0) ? 0 : $element.find('.active').index() + 1;

            plugin.slide((e + 1), true);

        };

        // call previous slide from current slide
        plugin.prev = function () {

            var prev = $element.find('.active').prev('.slide').length,
                e = (prev == 0) ? $element.find('.slide:last').index() + 1 : $element.find('.active').index();

            plugin.slide(e, false);

        };

        plugin.run = function () {

            // run carousel
            interval = setInterval( function () {
                plugin.next();
            }, plugin.settings.speed);

        };

        plugin.pause = function () {

            clearInterval(interval);

        };

        var pauseOnHover = function() {

            if (!plugin.settings.pauseOnHover) return

            $element.hover( function () {
                plugin.pause();
            }, function() {
                plugin.run();
            });
        
        };

        plugin.init();

    }

    // add to the jQuery object
    $.fn.carousel = function (options) {

        return this.each(function () {

            if (undefined == $(this).data('carousel')) {

                var plugin = new $.carousel(this, options);

                // element.data('carousel').publicMethod(arg1, arg2, ... argn)
                // element.data('carousel').settings.propertyName
                $(this).data('carousel', plugin);

            }

        });

    }

})(jQuery);