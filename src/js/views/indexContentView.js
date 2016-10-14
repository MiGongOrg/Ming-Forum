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
				'click .pager .previous': 'eventPrev',
				'click .pager .next': 'eventNext'
			},
			initialize: function() {
				this.oPosts = Ming.collections['posts'];
				this.oPosts.bind('reset', this.render, this);

				// 分页
				this.ref = new Wilddog('https://migong.wilddogio.com/posts/postContent');
				this.firstKey = '';
				this.lastKey  = '';

			},
			render: function() {
				// 数据处理
				var 
				arry = this.oPosts.toJSON(),
				obj  = arry[0].postContent;
				function transform(obj){
			    var arr = [];
			    for(var item in obj){
			    	obj[item].id = item;
		        arr.push(obj[item]);
			    }
			    return arr;
				}

				dataList = transform(obj);
				// 按照发布时间进行倒序排序
				data = _.sortBy(dataList, function(a){ return -a.postTime });

				this.$el.html(this.template.indexContent({
					data: data
				}));
			},
			// 上一页
			eventPrev: function(callback) {
				var $v = this;
				this.ref.orderByKey().endAt(this.firstKey).limitToLast(this.lastKey ? 6 : 5).on('value', function(snapshot) {
					var toDropKey = $v.firstKey;
					$v.firstKey = '';
					$v.lastKey  = '';
					var arr = new Array();
					snapshot.forEach(function(snap) {
						if (toDropKey != '') {
							if (snap.key() === toDropKey) {
								return;
							}
						}
						if ($v.firstKey == '') {
							$v.firstKey = snap.key();
						}
						$v.lastKey = snap.key();
						console.log(snap.val());
						arr.push(snap.val());
					});
					$v.loaded(arr);
				});
				console.log('点击了上一页');
			},
			// 下一页
			eventNext: function(callback) {
				var $v = this;
				this.ref.orderByKey().startAt(this.lastKey).limitToFirst(this.lastKey ? 6 : 5).on('value', function(snapshot) {
					var toDropKey = $v.lastKey;
					$v.firstKey = '';
					$v.lastKey  = '';
					var arr = new Array();
					console.info(snapshot);
					snapshot.forEach(function(snap) {
						if (toDropKey != '') {
							if (snap.key() === toDropKey) {
								return;
							}
						}
						if ($v.firstKey == '') {
							$v.firstKey = snap.key();
						}
						$v.lastKey = snap.key();
						console.log(snap.val());
						arr.push(snap.val());
					});
					$v.loaded(arr);
				});
				console.log('点击了下一页');
			},
			loaded: function(arr) {
				var msgArr = new Array();
				for (var i in arr) {
					var msg = arr[i].title;
					msgArr.push(msg);
				}
				console.log(msgArr);
			}
		});
});