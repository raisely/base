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

			var index = [];

			$sectionLinks = $(options.sectionLinks);

			$sectionLinks.each( function() {
				
				var anchor = $(this).attr('href').replace('/','');
				if (anchor.indexOf('#') >= 0) {
					
					var offset = 0;
					if ($(anchor).data('offset'))
						offset = $(anchor).data('offset');

					var position = $(anchor).offset();
					var top = position.top + offset;

					anchor = anchor.replace('#','');
					index[anchor] = top;

				}

			});

			$(options.link).click( function() {
				var anchor = $(this).attr('href').replace('/','');
				if (anchor.indexOf('#') < 0) return true; // halt if not anchor
				
				var offset = 0;
				if ($(anchor).data('offset'))
					offset = $(anchor).data('offset');

				var position = $(anchor).offset();
				var top = position.top + offset;

				$('html, body').animate({
					scrollTop: top - options.offset,
				}, options.speed);

				return false;
			});

			function getFirst(index) {
			  for (var first in index)
			    return first;
			}

			$(window).scroll( function() {
				var scroll = $(this).scrollTop();


				for(var anchor in index) {

				   rscroll = $(document).height() - scroll + index[getFirst(index)];
				   
				   if (rscroll > $(document).height() - index[anchor] && scroll > index[getFirst(index)]){

					   $(options.sectionLinks).parent().removeClass("active");
					   $(options.sectionLinks+'[href=#'+anchor+']').parent().addClass("active");
					   break;

				   }
				}
			});

		});
	};

})(jQuery);