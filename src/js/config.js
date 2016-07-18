require.config({
	//paths 模块声明（不需要添加.js后缀）
	paths: {
		// 'mian': 'main',
		'router' : 'router',  //router 是与 config.js 同级目录下的 router.js 文件
		'jquery': '../../assets/jquery/js/jquery.min',
		'collapse': '../../assets/bootstrap/js/collapse',	//bootstrap 导航条依赖插件（在可视窗口改变时）collapse.js
		'dropdown': '../../assets/bootstrap/js/dropdown',	//bootstrap 导航条依赖插件（点击下拉菜单） dropdown.js
		'underscore': '../../assets/underscore/js/underscore-min',
		'backbone': '../../assets/backbone/js/backbone-min',
		'doT': '../../assets/doT/js/doT.min',
		'text': '../../assets/text/js/text'
	},
	shim: {
		//处理一些没有遵守 AMD 规范的 js 库
		'underscore':{
			exports: '_'  //exports值（输出的变量名），表明这个模块外部调用时的名称
		},
		'backbone': {
			deps: ['underscore', 'jquery'], //deps数组，表明该模块的依赖性
			exports: 'backbone'
		},
		'collapse': {
			deps: ['jquery']
		},
		'dropdown': {
			deps: ['jquery']
		}
	}
});

//加载相应 JS 文件
require(['collapse','dropdown','router'],function(Collapse, Dropdown, Router) {
	//实例化路由
	Ming.router = new Router();
	//开始监听 hashchange 事件并分配路由
	Backbone.history.start();

	//无需用户手动点击A标签，实例化路由后，URL会自动变更为 #go
	//添加 trigger:true 会触发 eventGo 函数，如果不添加，则不会触发，但刷新会触发。
	// ECP.router.navigate('go', {trigger:true});
});