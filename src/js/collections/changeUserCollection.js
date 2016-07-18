define([
		'jquery',
		'underscore',
		'backbone',
		'models/changeUserModel'
	], function($, _, Backbone, ChangeUserModel) {
		
	if (Ming.ref.getAuth()) {
		Ming.userId = Ming.ref.getAuth().uid;
	}
		
	return Backbone.Collection.extend({
		model: ChangeUserModel,
		url: Ming.path.migong + 'users/' + Ming.userId +'.json',
		parse: function(data) {
			return data;
		}
	});
});