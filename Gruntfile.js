module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    //读取配置项
    pkg:grunt.file.readJSON("package.json"),
    //执行的具体任务

    //压缩文件
    uglify:{
      // 加注释
      options:{
        banner:"/* <%= pkg.name %> <%= pkg.version %>*/ \n"
      },
      buildOne:{
        //被压缩文件的路径
        src: "src/js/jquery/jquery.js",
        //被压缩后的文件路径
        dest: "dest/jquery.min.js"
      },
      buildTwo:{
        files:{
          //将 config.js 压缩成 config.min.js
          'dest/js/config.min.js' : 'src/js/config.js'
        }
      },
      buildAll:{
        //将某个文件夹下的所有JS文件按结构压缩到指定的文件夹下
        files:[{
          expand: true,
          cwd:'src/js',   //JS目录下
          src:'**/*.js',  //所有JS文件
          dest:'dest/js'  //压缩到指定目录
        }]
      }
    },
    //bower 在 bower.json 文件中配置 exportsOverride
    bower:{
      install:{
        options:{
          targetDir: './assets',  //cmder 运行 grunt bower 时，会将项目文件提取出来放到设定的目录下
          layout: 'byComponent'   //设置 byType 或 byComponent 会改变目录结构
        }
      }
    },
    cssmin:{
      minAll:{
        files:[{
          expand: true,
          cwd:'src/css',  //CSS目录下
          src:'**/*.css', //所有CSS文件
          dest:'dest/css' //压缩到指定目录
        }]
      }/*,
      combine:{
        files:{
          'dest/css/combine.min.css' : ['src/css/main.css','src/css/index.css'] //需要注意先后顺序
        }
      }*/
    },
    autoprefixer: {//添加 css 私有前缀
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9'] //浏览器兼容
      },
      css: {
        src:[
        'src/css/login.css' //将哪个CSS文件添加浏览器私有前缀
        ]
      }
    },
    requirejs: {
      jsAll: {
        options: {
          baseUrl: 'src/js',
          mainConfigFile: 'src/js/config.js', //requirejs 配置文件
          name: 'config',
          out: 'dest/js/config.min.js'  //根据依赖关系压缩后输出的文件
        }
      }
    }
  });
  //通过 load-grunt-tasks 加载任务（设定指定范围）
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  //加载任务（使用 load-grunt-tasks 后，以下这些可以省略）
  //grunt.loadNpmTasks('grunt-bower-task');         //bower 文件提取插件
  //grunt.loadNpmTasks('grunt-contrib-uglify');     //JS文件压缩插件
  //grunt.loadNpmTasks('grunt-contrib-cssmin');     //css文件压缩插件
  //grunt.loadNpmTasks('grunt-contrib-less');       //LESS 文件编译CSS
  //grunt.loadNpmTasks('grunt-autoprefixer');       //添加CSS私有前缀
  //grunt.loadNpmTasks('grunt-contrib-requirejs');  //加载 requirejs
  
  //执行任务
  grunt.registerTask('buAll', ['uglify:buildAll']);           //压缩所有JS文件
  grunt.registerTask('cssMinAll', ['cssmin:minAll']);         //合并某个目录下的所有CSS文件
  //grunt.registerTask('combineCss', ['cssmin:combine']);       //将某两个CSS文件合并成一个文件
  grunt.registerTask('pageLess', ['less:page']);              //将LESS文件编译成 css文件
  grunt.registerTask('autoprefixerCss',['autoprefixer:css']); //添加属性私有前缀
  grunt.registerTask('requireJs',['requirejs:jsAll']);        //执行 requirejs

  //默认执行任务(数组中依次执行默认任务)
  grunt.registerTask('default', ['bower:install','autoprefixerCss']); //默认任务
};