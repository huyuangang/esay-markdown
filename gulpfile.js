
var gulp = require('gulp')
var concat = require('gulp-concat')

gulp.task('default', function() {
  gulp.src('src/*.js')
  .pipe(concat('parse.js'))
  .pipe(gulp.dest('dist/'))
})