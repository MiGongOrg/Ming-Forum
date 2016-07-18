define([
		'jquery',
		'underscore',
		'backbone',
		'doT',
		'text!../../templates/sidebarUser.tpl'
	], function($, _, Backbone, doT, TplSidebarUser) {
		return Backbone.View.extend({
			el: '.sidebarUser',
			template: {
				sidebarUser: doT.template(TplSidebarUser)
			},
			events: {
				'click .logoutBtn': 'userLogoutBtn'
			},
			initialize: function() {
				this.sidebarUser = Ming.collections['user'];
				// user 数据 reset 后 renderSidebarUser
				this.sidebarUser.bind('reset', this.render, this);
			},
			render: function() {
				this.$el.html(this.template.sidebarUser({
					data: this.sidebarUser.toJSON()
				}));
			},
			userLogoutBtn: function() {
				//用户登出
				Ming.ref.unauth();
				//登出后刷新页面
				window.location.href = '';
			}
		});
});