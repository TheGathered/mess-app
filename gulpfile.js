var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var autoprefixer = require('autoprefixer');
var assets = require('postcss-assets');
var browserSync = require('browser-sync');
var del = require('del');
var sprites = require('postcss-sprites').default;
var spritesUpdateRule = require('postcss-sprites').updateRule;
var postcss = require('postcss');
var cssnano = require('cssnano');
var pxtorem = require('postcss-pxtorem');
var selectorMatches = require('postcss-selector-matches');
var historyFallback = require('connect-history-api-fallback');

var $ = gulpLoadPlugins();
var reload = browserSync.reload;
// =============================================================================================

var jqueryInside = false;

var APP = {
  tmp: {
    path: '.tmp',
    fonts: '.tmp/fonts',
    images: '.tmp/images',
    styles: '.tmp/css',
    scripts: '.tmp/js'
  },
  src: {
    path: 'src',
    fonts: 'src/fonts',
    images: 'src/images',
    samples: 'src/samples',
    scripts: 'src/scripts',
    styles: 'src/styles',
    views: 'src/views',
    components: 'src/components'
  },
  dst: {
    path: 'build',
    fonts: 'build/fonts',
    images: 'build/images',
    samples: 'build/samples',
    scripts: 'build/js',
    styles: 'build/css'
  }
};
// =============================================================================================

gulp.task('views:render', () => {
  return gulp.src(APP.src.views +'/*.html')
    .pipe(
      // $.cache(
        $.nunjucksRender({
          path: [APP.src.views, APP.src.components]
        }))
    // .pipe(
    //   // $.cache(
    //     $.typograf({
    //       lang: 'ru'
    //     }))
    .pipe(
      gulp.dest(APP.tmp.path));
});

gulp.task('views', ['views:render'], () => {
  browserSync.reload();
});

gulp.task('styles', () => {
  return gulp.src([APP.src.styles +'/*.scss', APP.src.components +'/**/*.scss'])
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>")
      }))
    .pipe(
      $.sourcemaps.init())
    .pipe(
      $.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.'],
    }).on('error', $.sass.logError))
    .pipe(
      $.postcss([
        assets({
          basepPath: APP.src.path +'/',
          cachebuster: true,
          loadPaths: [APP.src.images +'/'],
        }),
        sprites({
          stylesheetPath: './'+ APP.tmp.styles,
          spritePath: './'+ APP.tmp.images,
          filterBy(image) {
            // Allow only png files
            if (!/\/?sprites\/.*\.png$/.test(image.url)) {
              return Promise.reject();
            }
            return Promise.resolve();
          },
          hooks: {
            onUpdateRule(rule, token, image) {
              // Use built-in logic for background-image & background-position
              spritesUpdateRule(rule, token, image);
              ['width', 'height'].forEach((prop) => {
                rule.insertAfter(rule.last, postcss.decl({
                  prop,
                  value: image.coords[prop] + 'px',
                }));
              });
            }
          }
        }),
        selectorMatches(),
        pxtorem({
          propWhiteList: [
            'font', 'font-size', 'line-height',
            'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
            'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
            'left', 'right', 'top', 'bottom',
            'width', 'height', 'min-width', 'max-width', 'max-height', 'min-height',
            'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
            'border-width', 'border-left-width', 'border-right-width', 'border-top-width', 'border-bottom-width', 'border',
            'transform'
          ],
        }),
        autoprefixer({
          browsers: ['> 5%', 'last 5 versions', 'Firefox ESR']
        }),
      ]))
    .pipe(
      $.sourcemaps.write())
    .pipe(
      gulp.dest(APP.tmp.styles))
    .pipe(
      reload({
        stream: true
      }));
});

gulp.task('copy:jquery', () => {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(
      $.if(!jqueryInside,gulp.dest(APP.tmp.scripts)))
    .pipe(
      $.if(!jqueryInside,gulp.dest(APP.dst.scripts)))
    .pipe(
      $.if(!jqueryInside,reload({
        stream: true
      })));
});

gulp.task('copy:sprite', () => {
  return gulp.src(APP.tmp.images + '/*.*')
    .pipe(
      gulp.dest(APP.dst.images));
});

gulp.task('scripts', () => {
  return gulp.src(APP.src.scripts +'/*.js')
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>")
      }))
    .pipe(
      $.sourcemaps.init())
    .pipe(
      $.sourcemaps.write('.'))
    .pipe(
      gulp.dest(APP.tmp.scripts))
    .pipe(
      reload({
        stream: true
      }));
});

gulp.task('html', ['views', 'styles', 'scripts'], () => {
  return gulp.src(APP.tmp.path +'/*.html')
    .pipe(
      $.prettify({
        indent_size: 2,
        eol: '\r\n'
      }))
    .pipe(
      $.useref({
        searchPath: [APP.tmp.path, APP.src.path, '.'],
        noAssets: false
      }))
    .pipe(
      gulp.dest(APP.dst.path));
});

gulp.task('images', () => {
  return gulp.src(APP.src.images +'/*.*')
    // .pipe(
    //   $.cache(
    //     $.imagemin()))
    .pipe(
      gulp.dest(APP.dst.images));
});

gulp.task('samples', () => {
  return gulp.src(APP.src.samples +'/*.*')
    // .pipe(
    //   $.cache(
    //     $.imagemin()))
    .pipe(
      gulp.dest(APP.dst.samples));
});

gulp.task('copy:favicon', () => {
  return gulp.src(APP.src.images +'/favicon/*.*')
    .pipe(
      gulp.dest(APP.dst.images + '/favicon'));
});

gulp.task('fonts', () => {
  return gulp.src(APP.src.fonts +'/*.*')
    .pipe(
      gulp.dest(APP.dst.fonts));
});

gulp.task('extras', () => {
  return gulp.src([
    APP.src.path +'/*.*',
    '!'+ APP.src.path +'/*.html',
  ], {
    dot: true
  })
  .pipe(
    gulp.dest(APP.dst.path));
});
// **********************************************************************

gulp.task('clean', del.bind(null, [APP.tmp.path, APP.dst.path]));

gulp.task('default', ['views', 'styles', 'scripts', 'copy:jquery'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: [APP.tmp.path, APP.src.path],
      middleware: [
        historyFallback()
      ],
      routes: {
        '/bower_components': 'bower_components',
        '/node_modules': 'node_modules'
      }
    }
  });

  gulp.watch([APP.src.components +'/**/*.scss', APP.src.styles +'/**/*.scss'], ['styles']);
  gulp.watch([APP.src.components +'/**/*.js', APP.src.scripts +'/*.js'], ['scripts']);
  gulp.watch(APP.src.fonts +'/*.*', ['fonts']);
  gulp.watch([APP.src.views +'/*.html', APP.src.views +'/layouts/*.html', APP.src.components +'/**/*.html'], ['views']);

  gulp.watch([
    APP.src.scripts +'/*.js',
    APP.src.images +'/*.*',
    APP.src.samples +'/*.*',
    APP.src.fonts +'/*.*'
  ]).on('change', reload);
});

gulp.task('minify:css', () => {
  return gulp.src(APP.dst.styles +'/*.css')
    .pipe(
      $.cache(
        $.postcss([
          cssnano({
            autoprefixer: false
          })])))
    .pipe(
      gulp.dest(APP.dst.styles));
});

gulp.task('minify:js', () => {
  return gulp.src(APP.dst.scripts +'/interface.min.js')
    .pipe(
      $.cache(
        $.uglify()))
    .pipe(
      gulp.dest(APP.dst.scripts));
});

gulp.task('build:process', ['html', 'images', 'samples', 'extras', 'fonts', 'copy:jquery', 'copy:favicon'], () => {
  gulp.start('minify:css');
  gulp.start('minify:js');
  gulp.start('copy:sprite');
});

gulp.task('build', ['clean'], () => {
  gulp.start('build:process');
});