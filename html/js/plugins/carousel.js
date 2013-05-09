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

    return this.each(function() {

        //basic dom setup
        element.find(options.slide).addClass('slide');

    });
  };

})(jQuery);