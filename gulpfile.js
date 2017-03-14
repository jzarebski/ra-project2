var gulp = require("gulp");
var uglifycss = require("gulp-uglifycss")
var rename = require("gulp-rename")
var sass = require ("gulp-sass")

gulp.task("hello",function(){
	//console.log("hello world");
});

gulp.task('sass', function(){
   gulp.src('./src/scss/app.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(uglifycss())
    //.pipe(rename("app.css"))//
    .pipe(gulp.dest('./dist/css/'));

})
gulp.task('watch', function() {
	gulp.watch('./src/scss/*.scss',['sass']);
})

//"maxLineLen": 80,//
   // "uglyComments": true//