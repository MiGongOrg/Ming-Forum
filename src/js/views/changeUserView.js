define([
		'jquery',
		'underscore',
		'backbone',
		'doT',
		'text!../../templates/changeUser.tpl',
		'text!../../templates/headerUser.tpl',
		'text!../../templates/sidebarUser.tpl'
	], function($, _, Backbone, doT, TplChangeUser, TplHeaderUser, TplSidebarUser) {
		return Backbone.View.extend({
			el: '#leftContent',
			template: {
				changeUser: doT.template(TplChangeUser),
				headerUser: doT.template(TplHeaderUser),
				sidebarUser: doT.template(TplSidebarUser)
			},
			events: {
				'click .changeUserBtn' : 'changeUser',
				'click #saveUserBtn' : 'saveUser'
			},
			initialize: function() {

				this.oChangeUser = Ming.collections['user'];

				// user 数据 reset 后 renderHeaderUser
				this.oChangeUser.bind('reset', this.renderHeaderUser, this);
				this.oChangeUser.bind('reset', this.renderChangeUser, this);
				
			},
			changeUser: function() {
				console.log('点击了修改按钮');
			},
			saveUser: function() {
				var 
				uid           = Ming.userId,
				oUser         = Ming.ref.child('users'),
				oUserNickname = $('#userNickname').val(),
				oUserWebsite  = $('#userWebsite').val(),
				oUserAbout    = $('#userAbout').val();

				//设置用户信息
				oUser.child(uid).update({
					nickname: oUserNickname,
					website: oUserWebsite,
					about: oUserAbout
				},
				function(err){
					if (err === null) {
						oError = $('#error', this.$el);
						Ming.showError(oError, 'glyphicon-ok', 'alert-success', '用户信息修改成功');
					} else {
						Ming.showError(oError, 'glyphicon-ok', 'alert-danger', '用户信息修改失败' + err );
						console.error(err);
					}
				});
			},
			//header User
			renderHeaderUser: function() {
				var oHeaderUser = $('.navbar-right');
				oHeaderUser.html(this.template.headerUser({
					data: this.oChangeUser.toJSON()
				}));
			},
			//Change User
			renderChangeUser: function() {
				this.$el.html(this.template.changeUser({
					data: this.oChangeUser.toJSON()
				}));
			},
		});
});