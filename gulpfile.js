var gulp           = require('gulp'),
    plumber        = require('gulp-plumber'),
    pug            = require('gulp-pug'),
    sass           = require('gulp-sass'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglifyjs'),
    cache          = require('gulp-cache'),
    autoprefixer   = require('gulp-autoprefixer'),
    gcmq           = require('gulp-group-css-media-queries'),
    smartgrid      = require('smart-grid'),
    del            = require('del'),
    browserSync    = require('browser-sync'),
    imagemin       = require('gulp-imagemin'),
    pngquant       = require('imagemin-pngquant')
    ;

var smartgridSettings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: "30px", /* gutter width px || % */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            'width': '1100px', /* -> @media (max-width: 1100px) */
            'fields': '30px' /* side fields */
        },
        md: {
            'width': '960px',
            'fields': '15px'
        },
        sm: {
            'width': '780px',
            'fields': '15px'
        },
        xs: {
            'width': '560px',
            'fields': '15px'
        }
        /*
        We can create any quantity of break points.
        some_name: {
            some_width: 'Npx',
            some_offset: 'N(px|%)'
        }
        */
    }
};

gulp.task('default', ['serve']);

gulp.task('smartgrid', function() {
    smartgrid('app/sass', smartgridSettings);
});

gulp.task('pug', function() {
  return gulp.src(['app/pug/**/*.pug', '!app/pug/**/_*.pug'])
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', ['smartgrid'], function() {
  return gulp.src(['app/sass/**/*.scss'])
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gcmq())
    .pipe(gulp.dest('./app/css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
    return gulp.src([
            'app/libs/jquery/dist/jquery.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('serve', ['sass', 'scripts', 'pug'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        notify: false
    });

    gulp.watch("app/pug/**/*.pug", ['pug']);
    gulp.watch("app/sass/**/*.scss", ['sass']);
    gulp.watch("app/js/**/*.js").on('change', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts', 'pug'], function() {
    gulp.src(['app/css/style.css'])
        .pipe(gulp.dest('dist/css'));

    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});
