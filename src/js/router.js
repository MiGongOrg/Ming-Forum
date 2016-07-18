define([
	'jquery',
	'underscore',
	'backbone',
	'controllers/changeUserController',
	'controllers/headerUserController',
	'controllers/indexContentController',
	'views/headerUserView',
	'views/loginView',
	'views/sidebarUserView',
	'views/sidebarAboutView',
	'views/sidebarPostView',
	'views/newPost',
	'controllers/postController'
	], function($, _, Backbone, ChangeUserController, HeaderUserController, IndexContentController, HeaderUserView, LoginView, SidebarUserView, SidebarAboutView, SidebarPostView, NewPost, PostController) {
	return Backbone.Router.extend({
		routes: {
			'': 'indexContent',
			'login': 'loginContent',
			'user': 'changeUserContent',
			'about': 'aboutContent',
			'new': 'newPost'
		},
		initialize: function() {

			//监听 post
			this.route('posts/:url', function(url) {
				Ming.postUrl = url;
				var oPostController = new PostController();
				console.log(url);
			});

			//获取用户登录状态
			if (Ming.ref.getAuth()) {
				// console.log(oAuthData.uid);
				// Ming.userId = oAuthData.uid;
				//渲染 HeaderUserController 控制器 
				var oHeaderUserController = new HeaderUserController();

				//渲染侧边栏 view
				var oSidebarUserView = new SidebarUserView();

			} else {
				console.log('用户没有登录');
				Ming.userId = '';
				//渲染 HeaderUserView 
				var oHeaderUserView = new HeaderUserView();
				oHeaderUserView.notLoginRender();

				//渲染 SidebarAboutView
				var oSidebarAboutView = new SidebarAboutView();
				oSidebarAboutView.render();

				//渲染 SidebarPostView
				var oSidebarPostView = new SidebarPostView();
				oSidebarPostView.render();
			}

			//监听用户登录状态
			function authDataCallback(authData) {
				if (authData) {
					var oUid =  Ming.uid = authData.uid.split(':')[1];
					console.log('用户已登录')
					// console.log(' Uid: ' + oUid + ' 以某种方式登录: ' + authData.provider + ' Token: ' + authData.token);
				} else {
					console.log('用户已登出');
				}
			}
			Ming.ref.onAuth(authDataCallback);

		},
		indexContent: function() {
			//实例化 indexContentController
			var oIndexContentController = new IndexContentController();
		},
		login: function() {

		},
		loginContent: function() {
			//实例化 view 并渲染
			var oLogin = new LoginView();
			oLogin.render();
		},
		changeUserContent: function() {
			//实例化 User 控制器
			var oChangeUserController = new ChangeUserController();
		},
		aboutContent: function() {
			console.log('点击了About');
		},
		newPost: function() {
			var oNewPost = new NewPost();
			oNewPost.render();
		}
	});
});