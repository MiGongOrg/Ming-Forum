define([
		'jquery',
		'underscore',
		'backbone',
		'models/indexContentModel'
	], function($, _, Backbone, IndexContentModel) {
	return Backbone.Collection.extend({
		model: IndexContentModel,
		url: Ming.path.migong + 'posts.json',
		parse: function(data) {
			return data;
		}
	});
});