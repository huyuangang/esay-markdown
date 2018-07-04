
var gulp = require('gulp')
var concat = require('gulp-concat')

gulp.task('default', function() {
  gulp.src(['src/index.js', 'src/inline.js', 'src/block.js'])
  .pipe(concat('easymarkdown.js'))
  .pipe(gulp.dest('dist/'))
})