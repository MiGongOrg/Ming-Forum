define([
		'jquery',
		'underscore',
		'backbone',
		'doT',
		'models/postModel',
		'collections/postCollection',
		'text!../../templates/post.tpl'
	],function($, _, Backbone, doT, PostModel, PostCollection, TplPost) {
		return Backbone.View.extend({
			el: '#leftContent',
			template: {
				post: doT.template(TplPost)
			},
			initialize: function() {

				/*var 
				oPosts = Ming.ref.child('posts'),
				oPostVal = oPosts.child(Ming.postUrl);
				oPostVal.on('value', function(postValue) {
					data = postValue.val();
					console.log(data);
				});

				console.info(data);*/

				this.oPost = Ming.collections['post'];
				console.log(this.oPost);
				this.oPost.bind('reset', this.render, this);
			},
			events:{

			},
			render: function() {
				var data = this.oPost.toJSON()
				this.$el.html(this.template.post({
					data: data[0][Ming.postUrl]
				}));
			}
		});
});