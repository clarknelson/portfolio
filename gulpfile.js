var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload();
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var imageminSvgo = require('imagemin-svgo');
var imageminJpegtran = require('imagemin-jpegtran');

gulp.task('scss', function() {
  gulp.src('src/style/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
  			browsers: ['last 2 versions'],
  			cascade: false
  		}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function(){});

gulp.task('imgs', function(){
  return gulp.src('src/imgs/**/*')
        .pipe(imagemin({
          optimizationLevel: 5,
          progressive: true,
          use: [pngquant(), imageminSvgo(), imageminJpegtran()]
        }))
        .pipe(gulp.dest('dist/imgs'))
        .pipe(reload({ stream:true }));
});

gulp.task("server", function(){
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch("src/**/*.scss", ['scss']);
  gulp.watch("src/**/*.js", ['js']);
  gulp.watch("src/imgs/*", ['imgs']);
  gulp.watch("**/*.html").on('change', browserSync.reload);
  //gulp.watch("**/*.js").on('change', browserSync.reload);
})

gulp.task("default", ['server']);
