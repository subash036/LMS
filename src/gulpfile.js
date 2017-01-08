//var gulp = require('gulp')
//    , connect = require('gulp-connect');
//var paths = {
//    app: '../LMS_client/'
//    , src: ['./LMS_client/']
//};
//gulp.task('connect', function () {
//    connect.server({
//        root: paths.app
//        , livereload: true
//        , port: 2772
//    });
//});
var gulp = require('gulp');
var webserver = require('gulp-webserver');
gulp.task('webserver', function () {
    gulp.src('../LMS_client/').pipe(webserver({
        livereload: true
        , directoryListing: false
        , open: true
    }));
});
//gulp.task('html', function () {
//	gulp.src(paths.src).pipe(connect.reload());
//});
//gulp.task('watch', function () {
//	gulp.watch([paths.src], ['html']);
//});
//server start above code
var elixir = require('laravel-elixir')
elixir(function (mix) {
    mix.sass("./assets/sass/*.scss", "../LMS_client/assets/css/app.css");
    mix.webpack("./app/app.js", "../LMS_client/app/app.min.js");
    mix.scripts("./node_modules/bootstrap/dist/js/bootstrap.js", "../LMS_client/libs/bootstrap/js/bootstrap.js");
    mix.scripts("./node_modules/angular/angular.js", "../LMS_client/libs/angular/angular.js");
    mix.scripts("./node_modules/angular-route/angular-route.js", "../LMS_client/libs/angular-route/angular-route.js");
    mix.scripts("./node_modules/jquery/dist/jquery.js", "../LMS_client/libs/jquery/dist/jquery.js");
    mix.sass("./node_modules/bootstrap/dist/css/bootstrap.css", "../LMS_client/libs/bootstrap/css/bootstrap.css");
    mix.copy('./node_modules/bootstrap/dist/fonts/', '../LMS_client/libs/bootstrap/fonts/');
    mix.copy('./assets/fonts/', '../LMS_client/assets/fonts/');
    mix.copy('./assets/images/', '../LMS_client/images/');
    // mix.version(['./web-dev/assets/css/main.css', './web-dev/assets/js/main.js']);
    mix.copy("./app/**/*.html", "../LMS_client/app");
    mix.copy("./index.html", "../LMS_client/index.html");
});
gulp.task('start', ['connect']);