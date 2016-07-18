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
				//禁用按钮
				oNewPostBtn.prop('disabled', true);

				//push 数据
				oNewPost.push({
					user_id: Ming.uid,
					postTime: oTimeNow,
					title: oNewPostTitle,
					content: oNewPostContent
				},function(err) {
					var oError = $('#error');
					if(err === null){
						Ming.showError(oError, 'glyphicon-ok', 'alert-success', '发布成功');
						oNewPostBtn.prop('disabled', false);
						setTimeout(function() {
							window.location.href = '';
						},1000);

					} else {
						if (err === 'PERMISSION_DENIED') {}
						Ming.showError(oError, 'glyphicon-exclamation-sign', 'alert-danger', err);
						oNewPostBtn.prop('disabled', false);
					}
				});
				
			}
		});
});