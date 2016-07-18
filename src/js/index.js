var ref = new Wilddog('https://migong.wilddogio.com'),
//获取用户登录状态
oAuthData = ref.getAuth();
var refUser = new Wilddog('https://migong.wilddogio.com/users');
console.log(refUser);
if (oAuthData) {
	var 
	oSimpleLogin = oAuthData.uid,
	oUid     = oSimpleLogin.split(':')[1],
	oUser    = ref.child('users'),
	oPosts   = ref.child('posts');

	console.log('用户已登录：' + oUid);

	var 
	oBtn     = $('#btn'),
	oPostBtn = $('#postBtn');

	oBtn.on('click', function() {
		var 
		oName = $('#name').val(),
		oSex  = $('#sex').val(),
		oAge  = $('#age').val(),
		oWeb  = $('#website').val();

		//设置用户信息
		oUser.child(oSimpleLogin).update({
			name: oName,
			sex: oSex,
			age: oAge,
			web: oWeb
		},
		function(err){
			if (err === null) {
				console.log('保存成功');
			} else {
				console.log(err);
			}
		});
	});

	//发布内容
	oPostBtn.on('click', function() {
		var 
		oUid         = oAuthData.uid.split(':')[1],
		oPostTitle   = $('#postTitle').val(),
		oPostContent = $('#postContent').val();

		//push 数据
		oPosts.push({
			user_id: oUid,
			time: oDate(),
			title: oPostTitle,
			content: oPostContent
		},function(err) {
			if(err === null){
				console.log('发布成功');
			} else {
				if (err === 'PERMISSION_DENIED') {}
				console.log(err);
			}
		});
	});
} else {
	console.log('未登录');
}

//时间函数
var oDate = function() {
	var oD = new Date(),
	Y = oD.getFullYear(),
	M = oD.getMonth() + 1,
	D = oD.getDate();
	return Y + '年' + M + '月' + D + '日';
};