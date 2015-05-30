var gulp = require("gulp"),
	wiredep = require("wiredep").stream,
	browserSync = require('browser-sync'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css');

// запуск локального сервера
gulp.task('server', function () { 
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	}); 
});

// слежка за изменениями
gulp.task('watch', function () {
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'watch']);

// прописывает bower зависимости
gulp.task('wiredep', function () { 
	gulp.src('app/*.html')
		.pipe(wiredep())
		.pipe(gulp.dest('app'));
});

// автоматизация сборки
gulp.task('dist', function () {
	var assets = useref.assets();

	return gulp.src('app/*.html')
	.pipe(assets)
	.pipe(gulpif('*.js', uglify()))
	.pipe(gulpif('*.css', minifyCss()))
	.pipe(assets.restore())
	.pipe(useref())
	.pipe(gulp.dest('dist'));
});