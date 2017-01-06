/**
 * Sticky
 * ------------------------------
 *
 */

(function($) {

    if (typeof window.Sticky == 'undefined') window.Sticky = {};

    Sticky = {

        init: function() {

            if (Modernizr.touch) { return; }

            if($('[data-sticky]').length <= 0) return;

            $('[data-sticky]').each(function(index){
                Sticky.setup($(this));

            });
        },

        setup: function($element){

            var $window = $(window);
            var originalTop = $element.offset().top;
            var $container  = $('.'+$element.data('sticky'));
            $container.css('position','relative');


            // Form To Long
            var formTooLong = false;
            if($element.height() > $window.height()){ formTooLong = true; return; }

            // Body To Short
            if($element.height() > $container.height()) return;

            // Scroll Events
            $window.scroll(function(){

                // Check Form Isn't too Long
                if($element.height() > $window.height()){

                    // $element.css('width','auto');
                    $element.removeClass('fixed');
                    $element.css('top','0px');
                    $element.removeClass('stay');

                    return;

                }


                var max = (($container.offset().top + $container.height()) - $element.height());

                $element.css('right', $container.offset().left);

                if((originalTop <= $window.scrollTop()) && ($window.scrollTop() > originalTop)){// && ($window.scrollTop() < max)) {

                    console.log($element.width());
                    // if(!$element.hasClass('fixed')) $element.css('width',$element.width());
                    // Add Fixed Classs
                    $element.addClass('fixed');
                    // $element.css('width',$element.width());


                    // Bottom
                    if($window.scrollTop() > max){


                        // Stay
                        if(!$element.hasClass('stay')){

                            var top = $container.height() - $element.height(); //max - $actionWrap.height();
                            $element.css('top',top);
                            $element.addClass('stay');
                        }


                    } else {

                        // Stay
                        if($element.hasClass('stay')){
                            $element.css('top','0px');
                            $element.removeClass('stay');
                      
                        }


                    }

                } else {

                    $element.removeClass('fixed');
                    $element.css('top','0px');
                    $element.removeClass('stay');

                }


            });

        }

    }

    module.exports = Sticky;

})(jQuery);