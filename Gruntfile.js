module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    //读取配置项
    pkg:grunt.file.readJSON("package.json"),
    //执行的具体任务
    browserSync: {
      bsFiles: {
        src: ['./*.html','src/css/*.css','src/js/*.js']
      },
      options: {
        server: {
          baseDir: './'
        }
      }
    },
    //压缩文件
    uglify:{
      // 加注释
      options:{
        banner:"/* <%= pkg.name %> <%= pkg.version %>*/ \n"
      },
      login:{
        //被压缩文件的路径
        src: "src/js/login.js",
        //被压缩后的文件路径
        dest: "dist/js/login.min.js"
      },
      index:{
        files:{
          //将 config.js 压缩成 config.min.js
          'dist/js/index.min.js' : 'src/js/index.js'
        }
      },
      buildAll:{
        //将某个文件夹下的所有JS文件按结构压缩到指定的文件夹下
        files:[{
          expand: true,
          cwd:'src/js',   //JS目录下
          src:'**/*.js',  //所有JS文件
          dest:'dist/js'  //压缩到指定目录
        }]
      }
    },
    // 提取文件 bower 在 bower.json 文件中配置 exportsOverride
    bower:{
      install:{
        options:{
          targetDir: './assets',  // 运行 grunt x-bower 时，会将项目文件提取出来放到设定的目录下
          layout: 'byComponent'   // 设置 byType 或 byComponent 会改变目录结构
        }
      }
    },
    cssmin:{
      minAll:{
        files:[{
          expand: true,
          cwd:'src/css',  //CSS目录下
          src:'**/*.css', //所有CSS文件
          dest:'dist/css' //压缩到指定目录
        }]
      }/*,
      combine:{
        files:{
          'dist/css/combine.min.css' : ['src/css/main.css','src/css/index.css'] //需要注意先后顺序
        }
      }*/
    },
    // 添加 css 私有前缀
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9'] // 浏览器兼容
      },
      css: {
        src:[
        // 将哪个CSS文件添加浏览器私有前缀
        'src/css/login.css',
        'src/css/index.css'
        ]
      }
    },
    requirejs: {
      jsAll: {
        options: {
          baseUrl: 'src/js',
          mainConfigFile: 'src/js/config.js', //requirejs 配置文件
          name: 'config',
          out: 'dist/js/config.min.js'  //根据依赖关系压缩后输出的文件
        }
      }
    }
  });
  // 通过 load-grunt-tasks 加载任务（设定指定范围）
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // time grunt 任务运行所耗时间
  require('time-grunt')(grunt);
  
  // 执行任务

  // 免F5 刷新，文件监听
  grunt.registerTask('x-sync', ['browserSync']);
  // bower install 的文件提取到相应目录下
  grunt.registerTask('x-bower', ['bower:install']);
  // login.css 和 index.css 添加浏览器私有属性前缀
  grunt.registerTask('x-autoprefixer',['autoprefixer:css']);
  // 压缩某个目录下的所有 Css 文件到指定目录
  grunt.registerTask('x-css', ['x-autoprefixer', 'cssmin:minAll']);
  // login.js 和 index.js 压缩某个目录下的所有 JS 文件到指定目录
  grunt.registerTask('x-js', ['uglify:login', 'uglify:index']);
  // 将某两个CSS文件合并成一个文件   
  // grunt.registerTask('combineCss', ['cssmin:combine']);
  
  //执行 requirejs
  grunt.registerTask('requireJs',['requirejs:jsAll']);

  //默认执行任务(数组中依次执行默认任务)
  grunt.registerTask('default', ['x-css', 'x-js', 'requireJs']);
};