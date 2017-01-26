var gulp = require('gulp');
var $    = require('gulp-load-plugins')();


gulp.task('sass', function() {
  return gulp.src('sass/main.scss')
    .pipe($.sass({
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe($.rename('styles.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['sass/**/*.scss'], ['sass']);
});
