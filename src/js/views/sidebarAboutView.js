define([
		'jquery',
		'underscore',
		'backbone',
		'doT',
		'text!../../templates/sidebarAbout.tpl'
	],function($, _, Backbone, doT, TplSidebarAbout) {
		return Backbone.View.extend({
			el: '.sidebarAbout',
			template: {
				sidebarAbout: doT.template(TplSidebarAbout)
			},
			events: {

			},
			initialize: function() {

			},
			render: function() {
				this.$el.html(this.template.sidebarAbout({}));
			}
		});
});