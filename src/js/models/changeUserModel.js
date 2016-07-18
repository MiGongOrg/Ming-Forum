define([
		'jquery',
		'underscore',
		'backbone'
	], function($, _, Backbone) {
		return Backbone.Model.extend({
			urlRoot: Ming.path.migong + 'users/' + Ming.userId +'.json'
		});
});