/**
 * Toggle
 * Toggles a single class
 */

(function($) {

    if (typeof window.Toggle == 'undefined') window.Toggle = {};

    Toggle = {

        init: function() {

            $('*[data-toggle]').on('keypress click', function(event) {

                event.preventDefault();

                // on enter or click
                if ( event.which === 13 || event.type === 'click' ) {

                    var $item = $(this);
                    $item.toggleClass('active');

                    console.log($(this).data('toggle'));
                    $($item.data('toggle')).toggleClass('active');

                    if( $item.data('toggleText')) {
                        var text = $item.text();
                        $item.text($item.data('toggleText'));
                        $item.data('toggleText',text);
                    }

                }

            });

        },

    }

    module.exports = Toggle;

})(jQuery);