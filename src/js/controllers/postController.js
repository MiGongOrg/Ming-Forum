define([
		'jquery',
		'underscore',
		'backbone',
		'models/postModel',
		'collections/postCollection',
		'views/postView'
	],function($, _, Backbone, PostModel, PostCollection, PostView) {
		return Ming.controllers.post = function() {
			var oPost = Ming.collections['post'] = new PostCollection();
			var oView = new PostView();

			oPost.fetch({
				reset: true,
				dataFilter: function(data) {
					return data;
				},
				success: function(data) {
					console.log('获取 post 数据成功');
				},
				error: function() {
					console.log('获取 post 数据失败');
				}
			});
		};
});