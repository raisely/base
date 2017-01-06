
// Default Base Theme
var Theme = require('./modules/theme');

// Location Search Component
var LocationSearch = require('./modules/location-search');

// Sticky Component
var Sticky = require('./modules/sticky');

// Modal
var Modal = require('./modules/modal');

// Toggle
var Toggle = require('./modules/toggle');

jQuery(document).ready(function($) {

	// All Theme Functionaltiy
	Theme.init();

	// Location Search
	LocationSearch.init('js-locationsearch', Theme.filterByLocation);

	// Sticky
	Sticky.init();

	// Modal
	Modal.init();

	// Toggle
	Toggle.init();



});