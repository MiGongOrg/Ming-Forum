define([
		'jquery',
		'underscore',
		'backbone'
	], function($, _, Backbone) {
	return Backbone.Model.extend({
		urlRoot: Ming.path.migong + 'posts.json'
	});
});