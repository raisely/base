(function ($) {

  $.fn.carousel = function (options) {  

    var defaults = {
      transition: 'fade',
      speed: 3000,
      pauseOnHover: true,
      slide: 'img',
    };

    var methods = {

    	init: function () {
			methods.create();
			methods.run();

			return this;
	    },

	    // add the basic css classes
	    create: function () {

			// basic css structure
			console.log(this);
			this.$elem.addClass('transition-' + defaults.transition); // transition class
			this.$elem.find(options.slide).addClass('slide'); // slide class

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

    return this.each(function (option) {        

		if (option) {
			$.extend(defaults, option);
		}

		// Method calling logic
		if ( methods[option] )
			return methods[option].apply( this, Array.prototype.slice.call( arguments, 1 ));
		else if ( typeof option === 'object' || ! option )
			return methods.init.apply( this, arguments );
		else
			$.error( 'Method ' +  option + ' does not exist on jQuery.tooltip' );
		

    });

  };

})(jQuery);