// Load plugins
var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    coffee = require('gulp-coffee')

// Styles
gulp.task('styles', function() {
  return gulp.src('less/default.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('css/dist/'))
    .pipe(notify({ message: 'Styly jsou hotové!' }));
});

// CoffeeScripts
gulp.task('coffees', function() {
  return gulp.src('coffee/standard.coffee')
  	.pipe(coffee())
  	.pipe(gulp.dest('js'))
    .pipe(notify({ message: 'Kafé je hotové!' }));
});

// JavaScripts
gulp.task('javas', function() {
  return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('js/tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('js/dist'))
    .pipe(notify({ message: 'Skripty je hotové!' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('img/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img/dist'))
    .pipe(notify({ message: 'Obrázky jsou hotové!' }));
});

// Default task
gulp.task('default', function() {
    gulp.run('styles', 'coffees', 'javas', 'images');
    
    // Watch .less files
    gulp.watch('less/*.less', function() {
    	gulp.run('styles');
    });

    // Watch .coffee files
    gulp.watch('coffee/*.coffee', function() {
    	gulp.run('coffees');
    });

    // Watch .js files
    gulp.watch('js/*.js', function() {
    	gulp.run('javas');
    });

    // Watch image files
    gulp.watch('img/*.*', function() {
    	gulp.run('images');
    });
});

