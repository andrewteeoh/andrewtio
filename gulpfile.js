var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var browserify = require('browserify');

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/stylesheets'));
});

// gulp.task('javascript', function () {
//   var browserified = function(filename){
//     var b = browserify(filename);
//     return b.bundle();
//   };
//   return gulp.src('./javascripts/**/*.js')
//     .pipe(browserified)
//     .pipe(gulp.dest('./public/js'));
// });

gulp.task('watch', function() {
  gulp.watch('./less/**/*.less', ['less']);
});

gulp.task('default', ['watch']);