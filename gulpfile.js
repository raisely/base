'use strict';

const $           = require('gulp-load-plugins')();
const gulp        = require('gulp');
const browserSync = require('browser-sync').create();

let debug = true;
let proxy = 'base-components.dev';
let staticSrc = 'src/**/*.{webm,svg,eot,ttf,woff,woff2,otf,mp4,json,pdf,ico}';

/*
 * Clean
 */
gulp.task('clean', () => {

	return gulp.src('dist', {read: false})
		.pipe($.clean());
});

/*
 * Copy static files
 */
gulp.task('copy', () => {

	return gulp.src(staticSrc)
	.pipe(gulp.dest('dist/'))
})

/*
 * SASS
 */
gulp.task("sass", () => {

	let out = gulp.src('src/scss/base.scss')
		.pipe( $.cssGlobbing({
			extensions: ['.scss']
		}));

	// Create Sourmaps for develop
	if (debug) {

		return out.pipe($.sourcemaps.init())
			.pipe($.sass({ style: 'compressed', sourcemap: true}))
			.on('error', $.sass.logError)
			.on('error', (err) => {
				$.notify().write(err);
			})
			.pipe( $.autoprefixer({
				browsers: ['last 2 versions','ie >= 9'],
				cascade: false
			}))
			.pipe($.rename('site.css'))
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest('./dist/css'))
			.pipe(browserSync.stream({match: '**/*.css'}));

		}

	// Remove sourcemaps and minify for production
	else {
		return out.pipe($.sass({ style: 'compressed'}))
			.on('error', $.sass.logError)
			.on('error', (err) => {
				return $.notify().write(err);
				this.emit('end');
			})
			.pipe( $.autoprefixer({
				browsers: ['last 2 versions','ie >= 9'],
				cascade: false
			}))
			.pipe($.rename('site.css'))
			.pipe(gulp.dest('./dist/css'));
	}

});

/*
 * Javascript
 */
gulp.task('js', () => {

	// Development
	if (debug) {
		return gulp.src('src/js/site.js')
			.pipe($.sourcemaps.init())
			.pipe($.browserify({
				insertGlobals : true,
				debug : debug
			}))
			.pipe($.babel({
				presets: ['es2015']
			}))
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest('dist/js'))
	}
	// Production
	else {
		return gulp.src('src/js/site.js')
			.pipe($.browserify({
				insertGlobals : true,
				debug : debug
			}))
			.pipe($.babel({
				presets: ['es2015']
			}))
			.pipe(gulp.dest('dist/js'))
	}

});

/*
 * Javascript watch
 */
gulp.task('js-watch', ['js'], (done) => {

	browserSync.reload();
	done();
});

/*
 * Image optimisation
 */
gulp.task('images', () => {

	return gulp.src('./src/img/*')
		.pipe($.image())
		.pipe(gulp.dest('./dist/img/'));
});

/*
 * Serve and watch for changes
 */
gulp.task( "dev", ['images', 'copy', 'sass', 'js'], () => {

	// Serve
	browserSync.init({
		proxy: proxy,
		ghostMode: false
	});

	// Watch
	gulp.watch('src/img/**/*', ['images']);
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['js-watch']);
	gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
	gulp.watch(staticSrc, ['copy']);

	gulp.watch([
		'dist/**/*.js',
		'dist/**/*.css'
	]);
});

/*
 * Set debug mode to false
 */
gulp.task('production', () => {

	debug = false;
	console.log(`Set debug to: ${debug}`);
})

gulp.task('build', ['production', 'images', 'copy', 'sass', 'js']);

