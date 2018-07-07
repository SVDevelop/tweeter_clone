var gulp = require('gulp');			
var browserSync = require('browser-sync');			
var less = require('gulp-less');			
var notify = require('gulp-notify');			
var plumber = require('gulp-plumber');

gulp.task('server', ['less'], function () {
	browserSync.init({
		server: { baseDir: './app/'}
	});
});
gulp.watch('app/**/*.html').on('change', browserSync.reload);	
gulp.watch('app/less/*.less', ['less']);

gulp.task('less', function() {
	return gul.src('.app/less/main.less')
	.pipe(plumber({
		errorHandler: notify.onError(function(err) {
			return {
				title: 'less',
				suund: false,
				message: err.message
			}
		})
	}))
})
.pipe(less())
.pipe(gulp.dest('./app/css'))
.pipe(browserSync.stream());

gulp.task('defaul', ['server']);		