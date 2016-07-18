define([
		'jquery',
		'underscore',
		'backbone',
		'doT',
		'text!../../templates/indexContent.tpl'
	], function($, _, Backbone, doT, TplIndexContent) {
		return Backbone.View.extend({
			el: '#leftContent',
			template: {
				indexContent: doT.template(TplIndexContent)
			},
			events: {

			},
			initialize: function() {

				this.oPosts = Ming.collections['posts'];
				this.oPosts.bind('reset',this.render, this);

			},
			render: function() {
				//进行数据处理
				var 
				arry = this.oPosts.toJSON(),
				obj = arry[0];
				// console.log(obj[0]);
				function transform(obj){
			    var arr = [];
			    for(var item in obj){
			    	obj[item].id = item;
		        arr.push(obj[item]);
			    }
			    return arr;
				}

				data = transform(obj);

				this.$el.html(this.template.indexContent({
					data: data
				}));
			}
		});
});