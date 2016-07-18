window.Ming = {
	//保存实例
	controllers: {},
	collections: {},
	views: {},
	//路径
	path:{
		migong: 'https://migong.wilddogio.com/'
	},
	ref: new Wilddog('https://migong.wilddogio.com'),
	userId: '',
	uid: '',
	postUrl: '',
	showError: function(target, icon, style, message) {
		//添加提示图标
		target.find('.glyphicon').addClass(icon);
		//添加 style 
		target.addClass(style);
		// 添加提示文字
		target.fadeIn().find('.errorContent').text(message);
		setTimeout(function() {
			//移除提示图标
			target.find('.glyphicon').removeClass(icon);
			//移除 style 
			target.removeClass(style);
			target.fadeOut();
		},5000);
	},
	newDate: function getLocalTime(nS) {
  	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
	}
};