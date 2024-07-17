// variaveis para fazer as requisicoes das dependencias 
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require('gulp-imagemin');
const obfuscate = require('gulp-obfuscate');

// Tarefa para compilar SCSS em CSS
function styles() {
    return gulp.src("./src/styles/main.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }).on('error', sass.logError))
        .pipe(gulp.dest("./dist/styles"));
}

// Tarefa pra compressar as imagens
function images() {
    return gulp.src("./src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/images"));
}

function javaScript() {
    return gulp.src("./src/js/*.js")
    .pipe(obfuscate())
    .pipe(gulp.dest('./dist/js'))
}

// Funcao para executar o gulp watch
function watch() {
    gulp.watch('./src/styles/*.scss', { ignoreInitial: false }, styles);
    gulp.watch('./src/images/**/*', { ignoreInitial: false }, images);
    gulp.watch('./src/js/**/*.js', { ignoreInitial: false }, javaScript);
}

const build = gulp.series(styles, images, javaScript);

// comandos para executar ou o watch ou a build 
exports.default = build;
exports.watch = watch;