(function(window, $){

  /*
    to figure out:
      - how to call functions in this (buttons would be next() / prev())
      - pause
      - dot nav thing
  */

  var Carousel = function (elem, options){
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  Carousel.prototype = {
    
    defaults: {
      transition: 'fade',
      speed: 3000,
      pauseOnHover: true,
      slide: 'img',
    },

    init: function () {
      this.config = $.extend({}, this.defaults, this.options);

      this.create();
      this.run();

      return this;
    },

    // add the basic css classes
    create: function () {

      // basic css structure
      this.$elem.addClass('transition-' + this.config.transition); // transition class
      this.$elem.find(this.config.slide).addClass('slide'); // slide class

      // set first slide
      var that = this;
      that.slide(1, true);

    },

    // take slider to a specific slide number
    slide: function (e,d) {

      var i = this.$elem.find(this.config.slide + '.active').index; // get current position    
      var $new = this.$elem.find(this.config.slide + ':nth-child(' + e + ')');

      // get prev slide
      if ($new.prev('.slide').length == 0) var $prev = this.$elem.find('.slide:last');
      else var $prev = $new.prev('.slide');

      // get next slide
      if ($new.next('.slide').length == 0) var $next = this.$elem.find('.slide:first');
      else var $next = $new.next('.slide');

      if (d == null) var d = (i < $new.index()); // get direction

      // remove classes
      this.$elem.find('.slide').removeClass('left active right');

      // add classes
      $new.addClass('active');

      if (d) {
        $prev.addClass('left');
        $next.addClass('right');
      } else {
        $prev.addClass('right');
        $next.addClass('left');
      }

    },

    // call next slide from current slide
    next: function () {
      
      var next = this.$elem.find('.active').next('.slide').length;
      var e = (next == 0) ? 0 : this.$elem.find('.active').index() + 1;

      var that = this;

      that.slide((e + 1), true);

    },

    // call previous slide from current slide
    prev: function () {

      var prev = this.$elem.find('.active').prev('.slide').length;
      var e = (prev == 0) ? this.$elem.find('.slide:last').index() + 1 : this.$elem.find('.active').index();

      var that = this;

      that.slide(e, false);

    },

    run: function () {

      var that = this;

      // run carousel
      setInterval(function(){
        that.next();
      }, this.config.speed);

    },

    pause: function () {

    }

  };

  Carousel.defaults = Carousel.prototype.defaults;

  $.fn.carousel = function (options) {
    return this.each( function () {

      var carousel = new Carousel(this, options);

      if (!options == null || typeof options == 'object')
        carousel.init();
      else if (typeof options == 'number')
        carousel.slide(2);
      else if (typeof options == 'string' && typeof carousel[options] === 'function')
        carousel[options]();
      
    });
  };

  window.Carousel = Carousel;

})(window, jQuery);