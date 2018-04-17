var gulp = require('gulp');
const imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');
var plumber = require('gulp-plumber');
var plumberNotifier = require('gulp-plumber-notifier');
const autoprefixer = require('gulp-autoprefixer');
gulp.task('images-copy',() =>{
    gulp.src('./dev/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./app/images/'));
});


gulp.task('views', () =>{
    return gulp.src('./dev/*.pug')
        .pipe(plumber())
        .pipe(plumberNotifier())
        .pipe(pug({
            // Your options in here.
            pretty:true
        }))
        .pipe(gulp.dest('./app/'));
});

gulp.task('sass', () =>{
    return gulp.src(['./dev/sass/*.scss','./dev/sass/*.css'])
        .pipe(plumber())
        .pipe(plumberNotifier())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("./app/css/"));
});

gulp.task('watcher',() => {
    gulp.watch('./dev/*.pug',['views']);
    gulp.watch('./dev/include/*.pug',['views']);
    gulp.watch('./dev/sass/*.scss',['sass']);
    gulp.watch('./dev/js/*.js',['copyJS']);
});

gulp.task('copyJS',() =>{
    gulp.src('./dev/js/*')
    .pipe(gulp.dest('./app/js/'));
});

gulp.task('webserver', function() {
    gulp.src('./app/')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('default',['images-copy','copyJS','views','sass','watcher','webserver']);