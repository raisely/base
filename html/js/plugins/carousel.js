// Base Carousel
// A basic carousel script

// TODO
// arrows
// dots
// test

(function($) {

    "use strict";

    $.carousel = function (element, options) {

        var defaults = {
            transition: 'fade',
            speed: 3000,
            pauseOnHover: true,
            slide: 'img',
            transitionSpeed: 1000
        },
            plugin = this,
            $element = $(element),
            interval;

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

            var i = $element.find(plugin.settings.slide + '.active').index(),
                $to = $element.find(plugin.settings.slide + ':nth-child(' + e + ')'),
                $prev = ($to.prev('.slide').length === 0) ? $element.find('.slide:last') : $to.prev('.slide'),
                $next = ($to.next('.slide').length === 0) ? $element.find('.slide:first') : $to.next('.slide');

            $(plugin.settings.slide).each( function (index) {
                var position = (index + 1 - e);
                console.log(e);
                $(this).css('left', position * 100 + '%');
                // $(this).animate({
                //     'left': position * 100 + '%'
                // }, plugin.settings.animationSpeed );
            });

            $element.find('.slide').removeClass('left active right');
            $to.addClass('active');

            if (d) {
                $prev.addClass('left');
                $next.addClass('right');
            } else {
                $prev.addClass('right');
                $next.addClass('left');
            }

            plugin.settings.onSlide(d); // callback

        };

        // call next slide from current slide
        plugin.next = function () {

            var next = $element.find('.active').next('.slide').length,
                e = (next === 0) ? 0 : $element.find('.active').index() + 1;

            plugin.slide((e + 1), true);

        };

        // call previous slide from current slide
        plugin.prev = function () {

            var prev = $element.find('.active').prev('.slide').length,
                e = (prev === 0) ? $element.find('.slide:last').index() + 1 : $element.find('.active').index();

            plugin.slide(e, false);

        };

        plugin.run = function () {

            // run carousel
            interval = setInterval(function () {
                plugin.next();
            }, plugin.settings.speed);

        };

        plugin.pause = function () {

            clearInterval(interval);

        };

        var pauseOnHover = function() {

            if (!plugin.settings.pauseOnHover) { return false; }

            $element.hover(function () {
                plugin.pause();
            }, function() {
                plugin.run();
            });

        };

        // javascript animation fallbacks

        var slideAnimation = function () {
            
            $element.find('.active').css('height','auto').animate({
                left: '0%'

            }, plugin.settings.transitionSpeed);

            $element.find('.left').css('height','auto').animate({
                left: '-100%'

            }, plugin.settings.transitionSpeed, function () {
                $(this).css('height','0');
            });

            $element.find('.right').css('height','auto').animate({
                left: '100%'

            }, plugin.settings.transitionSpeed, function () {
                $(this).css('height','0');
            });

        };

        defaults.onSlide = function () {
            
            if (!Modernizr.cssanimations && plugin.settings.transition === 'slide') {
                slideAnimation();
            }
        
        };

        // external access: element.data('carousel').settings.propertyName
        plugin.settings = {};

        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);

            plugin.create();

            // private methods
            pauseOnHover();

        };
        plugin.init();

    };

    // add to the jQuery object
    $.fn.carousel = function (options) {

        return this.each(function () {

            if (undefined === $(this).data('carousel')) {

                var plugin = new $.carousel(this, options);

                // element.data('carousel').publicMethod(arg1, arg2, ... argn)
                // element.data('carousel').settings.propertyName
                $(this).data('carousel', plugin);

            }

        });

    };

})(jQuery);