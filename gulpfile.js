var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

gulp.task('scss', function() {
  gulp.src('./src/style/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
  browserSync.reload();
});

gulp.task("server", function(){
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch("src/**/*.scss", ['scss']);
  gulp.watch("**/*.html").on('change', browserSync.reload);
  gulp.watch("**/*.js").on('change', browserSync.reload);
})

gulp.task("default", ['server', 'scss']);
