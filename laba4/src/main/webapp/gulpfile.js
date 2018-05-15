const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const gutil = require('gulp-util');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css');
const rename = require('gulp-rename');

const argv = require('yargs').argv;

gulp.task('styles', function () {
    return gulp.src('./assets/**/css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log("before: " + details.name + ': ' + details.stats.originalSize);
            console.log("after : " + details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(concatCss("main.min.css"))
        .pipe(gulp.dest('./target'));
});


gulp.task('browserify', () => {
        return browserify({ entries: `./assets/main.js`, debug: true })
            .transform(babelify, { presets: ["react", "es2015"] }).bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(rename({ suffix: ".min" }))
            .pipe(gulp.dest(`./target`));
});

gulp.task('copyHTML', () => {
    return gulp.src('./assets/index.html')
        .pipe(gulp.dest('./target'));
});

gulp.task('copyImage', () => {
    return gulp.src('./assets/**/img/*')
        .pipe(gulp.dest('./target/img'))
});

gulp.task('watch', ['styles', 'browserify', 'copyHTML', 'copyImage'], () => {
    gutil.log(`watch task!`);
    gulp.watch('./assets/**/css/*.scss', ['styles']);
    gulp.watch('./assets/**/js/**/*.js', ['browserify'])
    gulp.watch('./assets/**/index.html', ['copyHTML']);
    gulp.watch('./assets/**/img/*', ['copyImage']);
});
 gulp.task('just-build', ['styles', 'browserify', 'copyHTML', 'copyImage'], () => {
     gutil.log(`just build task!`);
 });

gulp.task('default', argv.watch !== undefined ? ['watch'] : ['just-build']);
