/* TheCover wap版构建工具*/

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var del = require('del');
var fs = require('fs');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');
var gulpSequence = require('gulp-sequence');

var config = {
    path: {
        src: {
            css: 'src/css/',
            img: 'src/img/',
            fonts: 'src/fonts/',
            js: 'src/js/'
        },
        dist: {
            css: 'dist/css/',
            img: 'dist/img/',
            fonts: 'dist/fonts/',
            js: 'dist/js/',
            pack: 'dist/pack/'
        }
    },
    jsFile: ['sea.js', 'jquery_with_md5.js', 'juicer.js', 'nprogress.js', 'basic.js'],
    cssFile: ['normalize.css', 'basic.css', 'nprogress.css'],
    uglifyConfig: {
        mangle: {
            except: ['define', 'require', 'module', 'exports', 'Swipe', 'COVER', 'COVERAPP', 'COVERAPP_CallBack']
        },
        compress: false
    }
};

gulp.task('clean', function(){
    console.log('删除旧程序...');
    del(['dist/']);
});

gulp.task('html', function () {
    console.log('清除HTML注释，压缩HTML，压缩页面JS，压缩页面CSS...');
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function () {
    console.log('压缩合并CSS...');
    var srcFile = [],
        distFile = [],
        cssPath = config.path.src.css,
        cssDist = config.path.dist.css;
    for (var i = 0; i < config.cssFile.length; i++) {
        srcFile[i] = cssPath + config.cssFile[i];
    }

    for (var i = 0; i < config.cssFile.length; i++) {
        distFile[i] = cssDist + config.cssFile[i];
    }

    gulp.src(srcFile)
        .pipe(autoprefixer())
        .pipe(concat('common.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(cssDist));

    gulp.src(cssPath + '*.css')
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest(cssDist))
        .on('end', function () {
            for (var i = 0; i < distFile.length; i++) {
                fs.unlink(__dirname + '/' + distFile[i]);
            }
        });

});

gulp.task('js', function () {
    console.log('压缩合并JS...');
    var srcFile = [],
        distFile = [],
        jsPath = config.path.src.js,
        jsDist = config.path.dist.js;
    for (var i = 0; i < config.jsFile.length; i++) {
        srcFile[i] = jsPath + config.jsFile[i];
    }

    for (var i = 0; i < config.jsFile.length; i++) {
        distFile[i] = jsDist + config.jsFile[i];
    }

    gulp.src(jsPath + '*.js')
        .pipe(uglify(config.uglifyConfig))
        .pipe(gulp.dest(jsDist))
        .on('end', function () {
            for (var i = 0; i < distFile.length; i++) {
                fs.unlink(__dirname + '/' + distFile[i]);
            }
        });

    /*gulp.src(srcFile)
        .pipe(concat('common.js'))
        .pipe(uglify(config.uglifyConfig))
        .pipe(gulp.dest(jsDist));*/
});

gulp.task('jsConcat', function () {
    console.log('合并JS...');
    var srcFile = [],
        distFile = [],
        jsPath = config.path.src.js,
        jsDist = config.path.dist.js;
    for (var i = 0; i < config.jsFile.length; i++) {
        srcFile[i] = jsPath + config.jsFile[i];
    }

    for (var i = 0; i < config.jsFile.length; i++) {
        distFile[i] = jsDist + config.jsFile[i];
    }

    gulp.src(srcFile)
        .pipe(concat('common.js'))
        .pipe(uglify(config.uglifyConfig))
        .pipe(gulp.dest(jsDist));
});

gulp.task('img', function () {
    console.log('压缩图片...');
    gulp.src(config.path.src.img + '*')
        .pipe(imagemin())
        .pipe(gulp.dest(config.path.dist.img));
});

/*gulp.task('fonts', function () {
    console.log('构建字体图标...');
    gulp.src(config.path.src.fonts + '*')
        .pipe(gulp.dest(config.path.dist.fonts));
});*/

gulp.task('pack', ['clean', 'css', 'js', 'jsConcat', 'img', 'html']);

gulp.task('rev', function () {

    console.log('生成MD5戳文件名...');

    gulp.src([config.path.dist.css + '*.css'])
        .pipe(rev())
        .pipe(gulp.dest(config.path.dist.pack + 'css/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/css'));

    gulp.src([config.path.dist.js + '*.js'])
        .pipe(rev())
        .pipe(gulp.dest(config.path.dist.pack + 'js/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'));

    /*gulp.src([config.path.dist.img + '*.*'])
        .pipe(rev())
        .pipe(gulp.dest(config.path.dist.pack + 'img/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/img'));*/

});

gulp.task('deploy', function () {
    console.log('构建文件地图...');

    gulp.src(config.path.dist.pack + 'js/*.js')
        .pipe(gulp.dest(config.path.dist.js));

    gulp.src(config.path.dist.pack + 'css/*.css')
        .pipe(gulp.dest(config.path.dist.css));

    gulp.src(['dist/rev/css/*.json', 'dist/*.html', 'dist/rev/js/*.json', 'dist/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist/'))
        .on('end', function () {
            del(['dist/rev']);
            del(['dist/pack']);
        });

});

gulp.task('replace', function () {

    var wapcdn = 'wapcdn.thecover.cn';
    var testcdn = '7xso7d.com1.z0.glb.clouddn.com';

    gulp.src('dist/*.html')
        .pipe(replace(wapcdn, testcdn))
        .pipe(gulp.dest('dist/'));

    gulp.src('dist/css/*.css')
        .pipe(replace(wapcdn, testcdn))
        .pipe(gulp.dest('dist/css/'));

    gulp.src('dist/js/*.js')
        .pipe(replace(wapcdn, testcdn))
        .pipe(gulp.dest('dist/js/'));

});

gulp.task('default', ['pack', 'rev', 'deploy']);