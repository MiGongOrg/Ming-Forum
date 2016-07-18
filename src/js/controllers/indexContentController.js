define([
		'jquery',
		'underscore',
		'backbone',
		'models/indexContentModel',
		'collections/indexContentCollection',
		'views/indexContentView'
	], function($, _, Backbone, IndexContentModel, IndexContentCollection, IndexContentView) {
		return Ming.controllers.posts = function() {
			var 
			oPosts = Ming.collections['posts'] = new IndexContentCollection(),
			oView = new IndexContentView();

			oPosts.fetch({
				reset: true,
				dataFilter: function(data) {
					return data;
				},
				success: function(data) {
					console.log('获取 Post 数据成功');
				},
				error: function() {
					console.log('获取 Post 数据失败');
				}
			});

		};
});