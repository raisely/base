/*
*
* USAGE:
* $(window).baseScoll();
*
*/

(function($){

	$.fn.baseScroll = function(options) {

		var defaults = {
			link: 'a',
			sectionLinks: '.nav a',
			speed: 1500,
			offset: 100,
		};
		var options = $.extend(defaults, options);

		return this.each(function() {

			// smooth scrolling for specified anchor links
			$(options.link).click( function() {
				var anchor = $(this).attr('href').replace('/','');
				if (anchor.indexOf('#') < 0) return true; // halt if not anchor

				var position = $(anchor).offset();
				var top = position.top;

				$('html, body').animate({
					scrollTop: top - options.offset,
				}, options.speed);

				return false;
			});

			var index = [];

			// get the offset of each linked element
			$sectionLinks = $(options.sectionLinks);
			$sectionLinks.each( function() {
				
				var anchor = $(this).attr('href');

				if (anchor.indexOf('#') >= 0) {

					anchor = anchor.replace('/','');
					
					var position = $(anchor).offset();

					if (!position == undefined)
						var top = position.top - options.offset;

					anchor = anchor.replace('#','');
					index[anchor] = top;

				}

			});

			var offsets = [];
			for (var anchor in index) offsets.push([anchor, index[anchor]]);

			offsets.sort(function(a, b) {
			    a = a[1];
			    b = b[1];
			    return a < b ? -1 : (a > b ? 1 : 0);
			});

			function navChange(anchor) {
				$(options.sectionLinks).parent().removeClass("active");
				$(options.sectionLinks+'[href*=#'+anchor+']').parent().addClass("active");
			}

			$(window).scroll( function() {
				var scroll = $(this).scrollTop();
				
				for (var i = 0; i < offsets.length; i++) {
					var n = (i < (offsets.length-1) ? (i+1) : false);

					if (n && scroll > offsets[i][1] && scroll < offsets[n][1]) {
						navChange(offsets[i][0]);
					}
					if (!n && scroll > offsets[i][1]) {
				   		navChange(offsets[i][0]);
					}
				}

				if (scroll < offsets[0][1]) {
					$(options.sectionLinks).parent().removeClass("active");
				}
			});

		});
	};

})(jQuery);