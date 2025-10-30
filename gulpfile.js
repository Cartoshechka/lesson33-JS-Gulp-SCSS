const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer').default || require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const prettier = require('gulp-prettier').default || require('gulp-prettier');
const rename = require('gulp-rename');

// Шляхи
const paths = {
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  html: {
    src: '*.html'
  }
};

// Компіляція SCSS з автопрефіксами та sourcemaps (для розробки)
function styles() {
  return gulp
    .src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
      overrideBrowserslist: ['last 2 versions', '> 1%', 'IE 11']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// Компіляція SCSS з мінімізацією (для продакшену)
function stylesProduction() {

  return gulp
    .src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
      overrideBrowserslist: ['last 2 versions', '> 1%', 'IE 11']
    }))
    .pipe(cleanCSS({
      level: 2,
      compatibility: 'ie11'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.scss.dest));
}

// Форматування SCSS файлів
function formatScss() {
  return gulp
    .src(paths.scss.src)
    .pipe(prettier({
      singleQuote: true,
      tabWidth: 2
    }))
    .pipe(gulp.dest('src/scss'));
}

// Запуск сервера з live reload
function serve() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'demo.html'  // Використовувати demo.html як головну сторінку
    },
    startPath: '/demo.html',  // Відкрити demo.html при запуску
    port: 3000,
    notify: false,
    open: true  // Автоматично відкрити браузер
  });

  // Відстеження змін у файлах
  gulp.watch(paths.scss.src, styles);
  gulp.watch(paths.html.src).on('change', browserSync.reload);
  gulp.watch('*.js').on('change', browserSync.reload);
}

// Експорт задач
exports.styles = styles;
exports.stylesProduction = stylesProduction;
exports.format = formatScss;
exports.serve = serve;

// Задача за замовчуванням
exports.default = gulp.series(styles, serve);

// Задача для збірки продакшену
exports.build = gulp.series(formatScss, stylesProduction);

