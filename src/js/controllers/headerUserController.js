define([
		'jquery',
		'underscore',
		'backbone',
		'models/changeUserModel',
		'collections/changeUserCollection',
		'views/headerUserView'
	], function($, _, Backbone, UserModel, ChangeUserCollection, HeaderUserView) {
		return Ming.controllers.user = function() {
			
			var 
			oUser = Ming.collections['user'] = new ChangeUserCollection(),
			oView = new HeaderUserView();

			oUser.fetch({
				reset: true,
				dataFilter: function(data) {
					return data;
				},
				success: function(data) {
					console.log('获取 User 数据成功');
				},
				error: function() {
					console.log('获取 User 数据失败');
				}
			});

		};
});