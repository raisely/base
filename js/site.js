//
// Base.gs Primary JS File
// --------------------------------------------------

$(document).ready(function() {


	// Tabs
	// -------------------

	$('.tabbed-content > div').hide();
	$('.tabbed-content > div.active').show();
	$('.tabs a').click( function() {
		var target = $(this).attr('href');
		$('.tabbed-content > div').hide().removeClass('active');
		$(target).show().addClass('active');
		$('.tabs a').removeClass('active');
		$(this).addClass('active');
		return false;
	});

	// only add less reliant code below (non-async ajax delay)

	// Live LESS
	// -------------------

	// cache original .less files
	var files = {
			'base': {url:'less/base.less'},
			'desktop': {url:'less/desktop.less'},
			'tablet': {url:'less/tablet.less'},
			'mobile': {url:'less/mobile.less'},
			'_layout': {url:'less/_layout.less'},
			'_mixins': {url:'less/_mixins.less'}
		};

	for (var filename in files) {

		$.ajax({
			url: files[filename].url,
			success: function(data) {
				files[filename].data = data;
			},
			async: false
		});
	}

	// Setup ACE
	// -------------------

	var layout_editor = ace.edit('_layout');
	initAce(layout_editor, '_layout');

	var desktop_editor = ace.edit('desktop');
	initAce(desktop_editor, 'desktop');

	var base_editor = ace.edit('base');
	initAce(base_editor, 'base');

	var tablet_editor = ace.edit('tablet');
	initAce(tablet_editor, 'tablet');

	var mobile_editor = ace.edit('mobile');
	initAce(mobile_editor, 'mobile');

	function initAce(instance, id) {
		instance.setTheme("ace/theme/tomorrow_night");
		instance.getSession().setMode("ace/mode/less");
		instance.renderer.setShowGutter(false);

		// code updating (1s pause delay)
		instance.getSession().on('change', function(e) {

			if (!$('#'+id).hasClass('ace_focus')) return false;

			window.clearTimeout(delay);
			var delay = window.setTimeout( function() {
				
				var input = new Object;

				input._mixins = files._mixins.data;
				input._layout = layout_editor.getValue();
				input.desktop = desktop_editor.getValue();
				input.base = base_editor.getValue();
				input.tablet = tablet_editor.getValue();
				input.mobile = mobile_editor.getValue();

				updateLess(files, input);
				window.clearTimeout(delay);
			}, 1000);

		});
	}


	// fill editors

	layout_editor.setValue(files._layout.data, 1);
	desktop_editor.setValue(files.desktop.data, 1);
	base_editor.setValue(files.base.data, 1);
	tablet_editor.setValue(files.tablet.data, 1);
	mobile_editor.setValue(files.mobile.data, 1);

});

function updateLess(files, input) {

	var parser = new less.Parser;

	for (var filename in files) {

		if (filename.indexOf('_') < 0) {

			if (typeof input[filename] !== 'undefined') {
				var contents = input[filename];
			} else {
				var contents = files[filename].data;
			}

			contents = contents.replace(/@import "_/g, '@import "less/_');

			for (var key in input) {
				var reg = new RegExp('@import "less/' + key + '.less";','g');
				contents = contents.replace(reg, input[key]);
			}

			parser.parse(contents, function (e, tree) {
			    var css = tree.toCSS();
			    $('style[id="less:less-'+filename+'"]').html(css);
			});
		}

	}

}
