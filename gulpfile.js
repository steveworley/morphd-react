var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');

var paths = {
  src: { js: 'lib' },
  dist: { js: 'web/js' }
}

gulp.task('js', function() {
  gulp
    .src([paths.src.js + '/client.js'])
    .pipe(browserify({transform: ['reactify']}))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.js + '/**/*js', ['js']);
});

gulp.task('default', ['watch']);
