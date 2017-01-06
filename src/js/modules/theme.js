// ------------------------------------
//
// Theme
//
// ------------------------------------

(function($) {

	if (typeof window.Theme == 'undefined') window.Theme = {};

	Theme = {

		settings: {},

		// ------------------------------------
		// Theme Init
		// ------------------------------------

		init: function() {

			let i = 'test';


			this.nav();

		},
		nav: function() {

			let $nav = $('.header-nav');

			$nav.find('.menu-hamburger').on('click', function() {
				$nav.toggleClass('open');

				$nav.find('.menu-wrapper').stop().slideToggle();
			});


			let $parentItem = $nav.find('.menu-primary >li');

			$parentItem.click(function(e) {

				if (!$(this).hasClass('open')) {
					e.preventDefault();
				}

				$parentItem.not(this).removeClass('open');
				$parentItem.not(this).children('ul').slideUp();

				$(this).toggleClass('open');
				$(this).children('ul').slideToggle();
			})
		},

		filterByLocation: function(){

			var locationSearch = LocationSearch.inputs['js-locationsearch'];
			console.log(locationSearch);

			// Read the page for data attributes
			var data = [];
			$('[data-lat]').each(function(index){

				var park = {};
				park.element = $(this);
				park.lat = $(this).data('lat');
				park.lng = $(this).data('lng');
				data[index] = park;

			});

			// Search By Radius
			LocationSearch.radiusSearch('js-locationsearch',50,data,function(item,inside){

				if(inside){
					item.element.slideDown();
				} else {
					item.element.slideUp();
				}


			});

		}
	};

	module.exports = Theme;

})(jQuery);