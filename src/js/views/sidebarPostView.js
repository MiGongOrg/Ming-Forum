define([
		'jquery',
		'underscore',
		'backbone',
		'doT',
		'text!../../templates/sidebarPost.tpl'
	],function($, _, Backbone, doT, TplSidebarPost) {
		return Backbone.View.extend({
			el: '.sidebarPost',
			template: {
				sidebarPost: doT.template(TplSidebarPost)
			},
			events: {

			},
			initialize: function() {

			},
			render: function() {
				this.$el.html(this.template.sidebarPost({}));
			}
		});
});