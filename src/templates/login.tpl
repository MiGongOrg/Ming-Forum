<div class="page-header">
	<h2>注册/登录</h2>
</div>
<div class="form-group">
	<label for="username">Email</label>
	<input type="text" class="form-control" id="username" placeholder="输入邮箱">
</div>
<div class="form-group">
	<label for="password">Password</label>
	<input type="password" class="form-control" id="password" placeholder="输入密码">
</div>
<div class="form-group clearfix">
	<div class="col-xs-6 clearPaddingL">
		<button class="btn btn-default btn-block" id="registerBtn">注册</button>
	</div>
	<div class="col-xs-6 clearPaddingR">
		<button class="btn btn-default btn-block" id="loginBtn">登录</button>
	</div>
</div>
<div class="form-group">
	<p class="text-right"><a href="javascript:;" id="forgetPasswordBtn">忘记密码？</a></p>
</div>

<!-- 信息提示 -->
<div class="alert alert-danger" id="error" role="alert">
	<span class="glyphicon" aria-hidden="true"></span>
	<span class="errorContent"></span>
</div>

<!-- 重置密码 -->
<div class="resetPasswordBox">
	<div class="form-group">
		<label for="resetPassword">重置密码</label>
		<input type="text" class="form-control" id="resetPassword" placeholder="输入邮箱">
	</div>
	<div class="form-group">
		<button class="btn btn-default btn-block" id="resetPasswordBtn">重置密码</button>
	</div>
</div>

<!-- 第三方注册/登录 -->
<div class="col-xs-12 clearPaddingLR">
	<div class="page-header">
		<h2>其它</h2>
	</div>
</div>
<div class="form-group clearfix">
	<div class="col-xs-4 clearPaddingL"><button class="btn btn-default btn-block">QQ</button></div>
	<div class="col-xs-4"><button class="btn btn-default btn-block">微博</button></div>
	<div class="col-xs-4 clearPaddingR"><button class="btn btn-default btn-block">微信</button></div>	
</div>