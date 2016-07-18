define([
		'jquery',
		'underscore',
		'backbone',
		'doT',
		'text!../../templates/headerUser.tpl'
	], function($, _, Backbone, doT, TplHeaderUser) {
		return Backbone.View.extend({
			el: '.navbar-right',
			template:{
				headerUser: doT.template(TplHeaderUser)
			},
			events:{
				'click .logoutBtn': 'userLogoutBtn'
			},
			initialize: function() {
				this.oHeaderUser =  Ming.collections['user'];
				if (this.oHeaderUser) {
					this.oHeaderUser.bind('reset', this.render, this);
				}
				
			},
			render: function() {
				this.$el.html(this.template.headerUser({
					data: this.oHeaderUser.toJSON()
				}));
			},
			notLoginRender: function() {
				this.$el.html(this.template.headerUser({
					data: [{
						user_id: ''
					}]
				}));
			},
			userLogoutBtn: function() {
				console.log('用户登出');
				//用户登出
				Ming.ref.unauth();
				//登出后刷新页面
				window.location.href = '';
			}
		});
});