
// ----------------------------------
//
// Modal Component
//
// ----------------------------------

(function($) {

    if (typeof window.Modal == 'undefined') window.Modal = {};

    Modal = {

        active_modal: null,

        active_modal_iframe_src: null,


        init: function() {

            console.log("Modal::init");
            this.set_events();

        },

        set_events:function(){

            $('*[data-modal-target]').on('keypress click', function(event) {

                event.preventDefault();

                // on enter or click
                if ( event.which === 13 || event.type === 'click' ) {

                    var target = $(this).data('modalTarget');
                    Modal.open(target);
                    Modal.active_modal = target;

                }

            });

            $('.modal-back-button, .modal-close').on('keypress click', function(event) {

                event.preventDefault();

                // on enter or esc or click
                if ( event.which === 13 || event.which === 27 || event.type === 'click' ) {

                    Modal.close(Modal.active_modal);

                }


            });

            $(document).keyup(function(event) {

                if (event.keyCode === 27) {

                    Modal.close(Modal.active_modal);

                }

            });

            $('.modal').click(function(event) {

                if (event.target === this) {

                    Modal.close(Modal.active_modal);

                }

            });

        },

        open: function(target) {
            
            var $modal = $('*[data-modal="'+target+'"]');
            $modal.addClass('open');
            Modal.active_modal = target;

            //Modal.center();
        },

        close: function(target) {
            if(!target){
                target = Modal.active_modal;
            }
            var $modal = $('*[data-modal="'+target+'"]');
            $modal.addClass('closing');

            var $iframes = $modal.find('iframe');
            if($iframes.length > 0){

                var $iframe = $($iframes[0])
                var src = $iframe.attr('src');

                $iframe.attr('src','');
                $iframe.attr('src',src);


            }

            setTimeout(function(){ $modal.removeClass('open'); $modal.removeClass('closing');  }, 200);

        },

        center: function(){
            var $m = $(Modal.active_modal).find('.modal-content-wrap');

        }

    }

    module.exports = Modal;

})(jQuery);