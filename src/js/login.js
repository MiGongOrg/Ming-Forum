var 
ref          = new Wilddog('https://migong.wilddogio.com'),
oUn          = $('#username'),
oPw          = $('#password'),
oRegisterBtn = $('#registerBtn'),
oLoginBtn    = $('#loginBtn'),
oforgetPwBtn = $('#forgetPasswordBtn'),
oResetPwBtn  = $('#resetPasswordBtn'),
oError       = $('.error'),
oEmail       = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
//错误提示
showError = function(target, message) {
	target.find('p').fadeIn().text(message);
	setTimeout(function() {
		target.find('p').fadeOut();
	},5000);
},
//表单验证
verify = function(event) {
	console.log(event);
	var 
	oUnVal = oUn.val(),
	oPwVal = oPw.val();

	//表单验证
	if (oUnVal.length === 0) {
		showError(oError, '邮箱不能为空');
		return false;
	} else if(!oEmail.test(oUnVal)){
		showError(oError, '邮箱格式不正确');
		return false;
	} else if(oPwVal.length === 0){
		showError(oError, '密码不能为空');
		return false;
	}
	//注册或登录
	if (event == 'registerBtn') {
		//禁用按钮
		oRegisterBtn.prop('disabled', true);
		//注册新用户
		ref.createUser({
			email: oUnVal,
			password: oPwVal
		},
		//是否注册成功
		function(err, data) {
			if (err !== null) {
				showError(oError, err);
			} else {
				var oUid = data.uid.split(':');
				showError(oError, '注册成功：' + oUid[1]);
				//解除禁用按钮
				oRegisterBtn.prop('disabled', false);
			}
		});
	} else if(event == 'loginBtn'){
		//禁用按钮
		oLoginBtn.prop('disabled', true);
		ref.authWithPassword({
			email: oUnVal,
			password: oPwVal
		}, authHandler);
	}
};

//邮箱注册
oRegisterBtn.on('click', function() {
	var oId = $(this).prop('id');
	//表单验证，并执行注册/登录
	verify(oId);
	
});

//邮箱登录
oLoginBtn.on('click', function() {
	var oId = $(this).prop('id');
	//表单验证，并执行注册/登录
	verify(oId);
});

//忘记密码
oforgetPwBtn.on('click', function() {
	var oResetPwBox = $('.resetPasswordBox');
	oResetPwBox.toggle();
});

//重置密码
oResetPwBtn.on('click', function() {
	var
	oResetPw = $('#resetPassword').val().trim();
	
	if (oResetPw.length === 0) {
		showError(oError, '邮箱不能为空');
		return false;
	} else if (!oEmail.test(oResetPw)){
		showError(oError, '邮箱格式不正确');
		return false;
	}
	//禁用按钮
	oResetPwBtn.prop('disabled', true);
	//重置密码API
	ref.resetPassword({
		email: oResetPw
	},
	function(err) {
		if (err === null) {
			showError(oError, '重置密码成功');
			//解除禁用按钮
			oResetPwBtn.prop('disabled', false);
		} else {
			//解除禁用按钮
			oResetPwBtn.prop('disabled', false);
			showError(oError, err);
		}
	});
});

// 创建一个回调来处理终端用户认证的结果
function authHandler(error, authData) {
  if (error) {
  	showError(oError, '邮箱或密码错误');
  	console.log(authData);
  } else {
  	var 
		oUnVal       = oUn.val(),
		oSimpleLogin = authData.uid,
		oUid         = oSimpleLogin.split(':')[1],
		oUser        = ref.child('users'),
		oUserKey     = null,
		addUser      = function() {
			if (oUserKey) {
				console.log('用户 UID 已存在');
				//解除按钮禁用
				oLoginBtn.prop('disabled', false);
			} else {
				//写入当前登陆用户的相关信息
				oUser.child(oSimpleLogin).update({
					user_id: oUid,
					email: oUnVal,
					time: oDateNow,
					money: oRMony
				});
				console.log('写入用户相关信息');
				//解除按钮禁用
				oLoginBtn.prop('disabled', false);
			}
			showError(oError, '登录成功');
			//window.location.href = 'index.html';
		};

		console.log('用户已登录：' + oUid);

		//查询判断用户是否已写入数据
		oUser.orderByChild('user_id').equalTo(oUid).on('child_added', function(data) {
			oUserKey = data.key();
		});

		//第一次登陆，写入用户 uid
		setTimeout(addUser, 1500);
  }
}

$('#logOut').click(function(){
	ref.unauth();
});

//监听用户登录状态
function authDataCallback(authData) {
	if (authData) {
		console.log(' Uid: ' + authData.uid + ' 以某种方式登录: ' + authData.provider + ' Token: ' + authData.token);
	} else {
		console.log('用户已登出');
	}
}
ref.onAuth(authDataCallback);