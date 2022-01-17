const gulp = require('gulp');
const { src, dest } = require('gulp');
const gulpif = require('gulp-if');
const argv = require('yargs').argv;
const browsersync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rollup = require('gulp-rollup');

const path = {
  src: {
    html: './src/**/*.html',
    css: './src/sass/**/*.sass',
    img: './src/img/**/*.{jpg,png,svg,ico,webp,gif}',
    js: './src/js/**/*.js',
  },
  build: {
    html: './build/',
    css: './build/css',
    img: './build/img',
    js: './build/js',
    clean: ['./build/**/*'],
  },
  watch: {
    html: './src/**/*.html',
    css: './src/sass/**/*.sass',
    img: './src/img/**/*.{jpg,png,svg,ico,webp,gif}',
    js: './src/js/**/*.js',
  },
};

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './build',
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html).pipe(dest(path.build.html)).pipe(browsersync.stream());
}

function styles() {
  return src('./src/sass/**/style.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(gulpif(argv.prod, cleanCss({ level: 2 })))
    .pipe(dest(path.build.css))

    .pipe(src('./src/sass/normalize.min.css'))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img).pipe(dest(path.build.img)).pipe(browsersync.stream());
}

function scripts() {
  return src(path.src.js)
    .pipe(rollup({
      input: './src/js/script.js',
      format: 'cjs',
    }))
    .pipe(gulpif(argv.prod, babel({ presets:['@babel/env'] })))
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function clean() {
  return del(path.build.clean, { force: true });
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], styles);
  gulp.watch([path.watch.js], scripts);
  gulp.watch([path.watch.img], images);
}

const build = gulp.series(clean, gulp.parallel(html, images, styles, scripts));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.clean = clean;
exports.watch = watch;
exports.default = build;
