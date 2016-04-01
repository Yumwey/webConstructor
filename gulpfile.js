
//引入gulp
var gulp = require('gulp'),

    compass = require('gulp-compass'),

    minifycss  = require('gulp-minify-css'), //压缩css

    //reload = browserSync.reload;
    notify = require('gulp-notify'),           // 更新通知

    amdOptimize = require('amd-optimize'),  //压缩require文件

    clean = require("gulp-clean"),//清理文件

    concat = require('gulp-concat'),          //合并

    uglify = require('gulp-uglify'),          //压缩

    amdOptimize = require("amd-optimize"), //require优化

    rename = require('gulp-rename'),   //重命名

    eventStream = require('event-stream'), //多编译任务，多个push的回调

    rev = require('gulp-rev'),//版本控制

    revCollector = require('gulp-rev-collector')//版本控制匹配


//配置开发和生产路径
   path={
       dev:{
           css:'css',
           tool:'js/tool',
           rev:'rev'
       },
       dist:{
           d_css:'dist/css',
           d_js:'dist/js'
       }
   };
    /*path={
        dev:{
            css:'css/*.css',
            tool:'js/**//*.js',
        },
        dist:{
            d_css:'dist/css',
            d_js:'dist/js'
        }
    };*/

   //压缩css
  gulp.task('miniCss',function(){
    gulp.src(path.dev.css + '/*.css')
        .pipe(minifycss())
        .pipe(rename({suffix:'.min'}))
        .pipe(rev())
        .pipe(gulp.dest(path.dist.d_css))
        .pipe(rev.manifest())      //生成版本号对应的json格式的文件
        .pipe(gulp.dest(path.dev.rev))
        .pipe(notify({ message:'Css压缩完成！'}));
  });

 // 替换引用
 gulp.task('replaceView',function(){
     gulp.src([path.dev.rev + '/*.json','*.html'])
         .pipe(revCollector({
             replaceReved:true,
             dirReplacements:{
                  'css':'dist/css'
             }
         }))
         .pipe(notify({message:'视图页修改引用完成！'}))
 })

 //压缩require 入口文件js

    gulp.task('miniJs',function(){
        gulp.src(path.dev.tool +'/*.js')
            .pipe(uglify())
            .pipe(concat('main.js'))
            .pipe(rename({suffix:'.min'}))
            .pipe(rev())
            .pipe(gulp.dest(path.dist.d_js))
            .pipe(notify({message:'Js压缩完成！'}));
    });

//清理文件：每次执行前进行一次清理--> css .js

  gulp.task('clean',function(){
      var pipes = [];
      pipes.push(
           gulp.src([path.dist.d_css + '/*.css'],{read: false})
               .pipe(clean())
               .pipe(notify({ message:'清理完成!'}))
      );
      pipes.push(
          gulp.src([path.dist.d_js + '/*.js'],{read:false})
              .pipe(clean())
              .pipe(notify({message:'js清理完成'}))
      );
      eventStream.merge(pipes)
          .on('end',function(){
               notify({message:"成功！"})
          });
  });

//单独清理



//使用说明
gulp.task('help',function () {

    console.log('	gulp miniCSS			css压缩');

    console.log('	gulp miniJS			js压缩');

    console.log('	gulp clean			清理文件');

    console.log('	gulp replaceView		替换引用');

    console.log('	gulp -m <module>		部分模块打包（默认全部打包）');

});
