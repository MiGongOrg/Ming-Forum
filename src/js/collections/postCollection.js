define([
		'jquery',
		'underscore',
		'backbone',
		'models/postModel'
	],function($, _, Backbone, Model) {
		return Backbone.Collection.extend({
			model: Model,
			url: Ming.path.migong + 'posts.json',
			parse: function(data) {
				return data;
			}
		});
});