/**
 * Gulp build process (with Webpack v4 for js bundling)
 */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const webpackStream = require('webpack-stream');
const sequence = require('run-sequence');

// gulp plugins
const imagemin = require('gulp-imagemin');
const pipeIf = require('gulp-if');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const cssPrefixer = require('gulp-autoprefixer');
const rn = require('gulp-rename');
const notify = require('gulp-notify');

// generate static src path for static extensions
const staticSrc = `src/**/*.{${
	/**
	 * File extensions that are statically copied over during the copy task
	 * @type {Array}
	 */
	['webm', 'svg', 'eot', 'ttf', 'woff', 'woff2', 'otf', 'mp4', 'json', 'pdf', 'ico'].join(',')
}}`;

// generate statuc src path for image extensions
const staticImgSrc = `src/img/**/*.{${[
	/**
	 * File extensions for images that are optimized and copied during build phase
	 * @type {Array}
	 */
	'jpeg', 'jpg', 'png',
]}}`;

/**
 * Stream error handler
 * @param  {Error} e Gulp Stream Error
 */
function handleError(e) {
	notify.onError(e.message);
	console.error(e);
	// close stream
	this.emit('end');
}

/**
 * Environment setting functions
 */
gulp.task('set:prod', () => {
	process.env.NODE_ENV = 'production';
});

gulp.task('set:dev', () => {
	process.env.NODE_ENV = 'development';
});

/**
 * Copy static files
 */
gulp.task('copy', () => gulp.src(staticSrc)
	.pipe(gulp.dest('dist/')));

/**
 * Sass to CSS build task
 */
gulp.task('sass', () => {
	// get mode for conditional piping
	const isDev = process.env.NODE_ENV === 'development';

	return gulp.src('src/scss/base.scss')
		.pipe(sassGlob())
		.pipe(sass({ style: 'compressed' }))
		.on('error', handleError)
		.pipe(cssPrefixer({
			/**
			 * Configuration for CSS autoprefixer (via gulp-autoprefixer)
			 * @type {Object}
			 */
			browsers: ['last 2 versions','ie >= 9'],
			cascade: false,
		}))
		.pipe(rn('site.min.css'))
		.pipe(gulp.dest('./dist/css'))
		// conditionally stream compiled css to browserSync
		.pipe(pipeIf(isDev, browserSync
				.stream({ match: '**/*.css' }))
		);
});

/**
 * Bundle site js and modules
 */
gulp.task('js', () => {
	// get mode for webpack configuration file
	const mode = process.env.NODE_ENV;

	return gulp.src('src/js/site.js')
		.pipe(webpackStream({
			/**
			 * The webpack configuration used when stream the main entry file 'site.js'
			 * @type {Function} returns config with mode (based on process.env.NODE_ENV)
			 */
			mode,
			module: {
				rules: [
					{
						test: /\.js$/,
						use: {
							loader: 'babel-loader',
							options: {
								/**
								 * Babel presets for transpiling JavaScript code
								 *   to various versions
								 * @type {Array}
								 */
								presets: ['es2015', 'react'],
							}
						}
					},
				],
			},
			/**
			 * Export file path
			 * @type {Object}
			 */
			output: {
				filename: 'site.min.js',
			},
			/**
			 * (external) Global dependency mapping, useful for loading external js code
			 *    without breaking modules
			 * @type {Object}
			 */
			externals: {
				// require module name: window[moduleName]
				'jquery': 'jQuery',
			},
		}))
		.on('error', handleError)
		.pipe(gulp.dest('dist/js'));
});

/**
 * Image optimisation task
 */
gulp.task('images', () => gulp.src(staticImgSrc)

	.pipe(imagemin({
		/**
		 * Image optimization library configuration (empty by default)
		 * @type {Object}
		 */
	}))
	.on('error', handleError)
	.pipe(gulp.dest('./dist/img/')));

/**
 * browserSync implementation
 */
gulp.task('browsersync:init', () =>
	browserSync.init({
		/**
		 * BrowserSync configuration for development (npm run dev)
		 * @type {Object}
		 */
		 server: {
			 baseDir: './',
		 },
	}));

gulp.task('browsersync:reload', () => browserSync.reload());

/**
 * Development build task (and watchers)
 */
gulp.task('dev', ['set:dev', 'images', 'copy', 'sass', 'js'], () => {
	// start browserSync
	gulp.start('browsersync:init');

	// run watcher tasks
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch(staticImgSrc, ['images']);
	gulp.watch('src/js/**/*.js', () => sequence('js', 'browsersync:reload'));
	gulp.watch('dist/**/*.html', ['browsersync:reload']);
	gulp.watch(staticSrc, ['copy']);
});

/**
 * Production build task
 */
gulp.task('build', ['set:prod', 'copy', 'images', 'sass', 'js']);
