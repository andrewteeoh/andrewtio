var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var browserify = require('browserify');

gulp.task('less', function () {
  return gulp.src(['./less/**/main.less', './less/moving-tiles.less'])
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/fonts'))
})

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