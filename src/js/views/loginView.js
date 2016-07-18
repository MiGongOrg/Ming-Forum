define([
		'jquery',
		'underscore',
		'backbone',
		'doT',
		'text!../../templates/login.tpl'
	], function($, _, Backbone, doT, TplLogin) {
		return Backbone.View.extend({
			el: '#leftContent',
			template: {
				login: doT.template(TplLogin)
			},
			events: {
				'click #registerBtn': 'register',
				'click #loginBtn': 'login',
				'click #forgetPasswordBtn': 'forgetPassword',
				'click #resetPasswordBtn': 'resetPassword'
			},
			initialize: function() {

			},
			render: function() {
				this.$el.html(this.template.login({
					
				}));
			},
			verify: function(event) {
				//表单验证
				var 
				oUn          = $('#username'),
				oPw          = $('#password'),
				oRegisterBtn = $('#registerBtn'),
				oLoginBtn    = $('#loginBtn'),
				oforgetPwBtn = $('#forgetPasswordBtn'),
				oResetPwBtn  = $('#resetPasswordBtn'),
				oUnVal       = oUn.val(),
				oPwVal       = oPw.val(),
				oError       = $('#error'),
				oEmail       = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

				//表单验证
				if (oUnVal.length === 0) {
					Ming.showError(oError, 'glyphicon-exclamation-sign', 'alert-danger', '邮箱不能为空');
					return false;
				} else if(!oEmail.test(oUnVal)){
					Ming.showError(oError, 'glyphicon-exclamation-sign', 'alert-danger', '邮箱格式不正确');
					return false;
				} else if(oPwVal.length === 0){
					Ming.showError(oError, 'glyphicon-exclamation-sign', 'alert-danger', '密码不能为空');
					return false;
				}
				console.log(event);
				//注册或登录
				if (event == 'registerBtn') {
					//禁用按钮
					oRegisterBtn.prop('disabled', true);
					//注册新用户
					Ming.ref.createUser({
						email: oUnVal,
						password: oPwVal
					},
					//是否注册成功
					function(err, data) {
						if (err !== null) {
							Ming.showError(oError, 'glyphicon-exclamation-sign', 'alert-danger', err);
						} else {
							var oUid = data.uid.split(':');
							Ming.showError(oError, 'glyphicon-ok', 'alert-success', '注册成功：' + oUid[1]);
							//解除禁用按钮
							oRegisterBtn.prop('disabled', false);
							//注册成功，自动点击登录按钮
							oLoginBtn.click();
						}
					});
				} else if(event == 'loginBtn'){
					//禁用按钮
					oLoginBtn.prop('disabled', true);
					Ming.ref.authWithPassword({
						email: oUnVal,
						password: oPwVal
					}, this.authHandler);
				}

			},
			register: function() {
				//邮箱注册
				var oId = $('#registerBtn').prop('id');
				//表单验证，并执行注册/登录
				this.verify(oId);
			},
			login: function() {
				//邮箱登录
				var oId = $('#loginBtn').prop('id');
				//表单验证，并执行注册/登录
				this.verify(oId);
			},
			forgetPassword: function() {
				//忘记密码
				var oResetPwBox = $('.resetPasswordBox');
				oResetPwBox.toggle();
			},
			resetPassword: function() {
				var 
				oError = $('#error'),
				oEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

				//重置密码
				var
				oResetPw = $('#resetPassword').val().trim();
				
				if (oResetPw.length === 0) {
					Ming.showError(oError, 'glyphicon-exclamation-sign', 'alert-danger', '邮箱不能为空');
					return false;
				} else if (!oEmail.test(oResetPw)){
					Ming.showError(oError, 'glyphicon-exclamation-sign', 'alert-danger', '邮箱格式不正确');
					return false;
				}
				//禁用按钮
				oResetPwBtn.prop('disabled', true);
				//重置密码API
				Ming.ref.resetPassword({
					email: oResetPw
				},
				function(err) {
					if (err === null) {
						Ming.showError(oError, 'glyphicon-ok', 'alert-success', '重置密码成功');
						//解除禁用按钮
						oResetPwBtn.prop('disabled', false);
					} else {
						//解除禁用按钮
						oResetPwBtn.prop('disabled', false);
						Ming.showError(oError, 'glyphicon-exclamation-sign', 'alert-danger', err);
					}
				});

			},
			authHandler: function(error, authData) {
				var 
				oLoginBtn = $('#loginBtn'),
				oError    = $('#error');
				if (error) {
			  	Ming.showError(oError, 'glyphicon-exclamation-sign', 'alert-danger', '邮箱或密码错误');
			  	oLoginBtn.prop('disabled', false);
			  	console.log(authData);
			  } else {
			  	var 
			  	oUn          = $('#username'),
					oUnVal       = oUn.val(),
					oSimpleLogin = authData.uid,
					oUid         = Ming.uid,
					oUser        = Ming.ref.child('users'),
					oUserKey     = null,
					addUser      = function() {
						if (oUserKey) {
							console.log('用户 UID 已存在');
							//解除按钮禁用
							oLoginBtn.prop('disabled', false);
						} else {
							var 
							oDateNow = parseInt(new Date().getTime() / 1000),
							oRMony   = Math.floor(Math.random() * 50 + 50);
							//写入当前登陆用户的 uid 和 email
							oUser.child(oSimpleLogin).update({
								user_id: oUid,
								email: oUnVal,
								time: oDateNow,
								money: oRMony
							});
							console.log('写入用户 UID 和 Email');
							//解除按钮禁用
							oLoginBtn.prop('disabled', false);
						}
						Ming.showError(oError, 'glyphicon-ok', 'alert-success', '登录成功');
						window.location.href = '';
					};

					console.log('用户已登录：' + oUid);

					//查询判断用户是否已写入数据
					oUser.orderByChild('user_id').equalTo(oUid).on('child_added', function(data) {
						oUserKey = data.key();
					});

					//第一次登陆，写入用户 uid
					setTimeout(addUser, 1500);
			  }

			}
		});
});