define([
		'jquery',
		'underscore',
		'backbone',
		'doT',
		'text!../../templates/newPost.tpl'
	], function($, _, Backbone, doT, TplNewPost) {
		return Backbone.View.extend({
			el: '#leftContent',
			template: {
				newPost: doT.template(TplNewPost)
			},
			events: {
				'click #newPostBtn' : 'newPost'
			},
			initialize: function() {

			},
			render: function() {
				this.$el.html(this.template.newPost());
			},
			newPost: function() {
				var 
				oNewPostTitle   = $('#newPostTitle').val(),
				oNewPostContent = $('#newPostContent').val(),
				oNewPostBtn     = $('#newPostBtn'),
				oNewPost        = Ming.ref.child('posts'),
				oTimeNow        = parseInt(new Date().getTime() / 1000);
				// 禁用按钮
				oNewPostBtn.prop('disabled', true);
				
				// 添加自增长ID，统计 post 数量
				oNewPost.child('postSize').transaction(function(sizeVal) {
					var newVal = (sizeVal || 0) + 1;
					return newVal;
				}, function(err, committed, ss) {
					if (err) {
						console.log(err);
					} else if(committed) {
						// 获取自增长id
						var id = ss.val();
						// push 数据
						oNewPost.child('postContent').push({
							id: id,
							user_id: Ming.uid,
							postTime: oTimeNow,
							title: oNewPostTitle,
							content: oNewPostContent
						}, function(err) {
							var oError = $('#error');
							if(err === null){
								Ming.showError(oError, 'glyphicon-ok', 'alert-success', '发布成功');
								setTimeout(function() {
									oNewPostBtn.prop('disabled', false);
									window.location.href = '';
								}, 500);
							} else {
								if (err === 'PERMISSION_DENIED') {}
								Ming.showError(oError, 'glyphicon-exclamation-sign', 'alert-danger', err);
								oNewPostBtn.prop('disabled', false);
							}
						});
					}
				});
			}
		});
});