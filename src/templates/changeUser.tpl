<div class="page-header">
	<h2>个人信息<small>{{= it.data[0].nickname ? it.data[0].nickname : it.data[0].user_id}}</small></h2>
</div>
<fieldset disabled="">
	<div class="col-sm-6 col-sx-12">
		<div class="form-group">
			<label for="userId">UID</label>
			<input type="text" class="form-control" id="userId" value="{{= it.data[0].user_id}}">
		</div>
	</div>
	<div class="col-sm-6 col-sx-12">
		<div class="form-group">
			<label for="userTime">Time</label>
			<input type="text" class="form-control" id="userTime" value="{{= Ming.newDate(it.data[0].time)}}">
		</div>
	</div>
	<div class="col-sm-6 col-sx-12">
		<div class="form-group">
			<label for="userEmail">Email</label>
			<input type="text" class="form-control" id="userEmail" value="{{= it.data[0].email}}">
		</div>
	</div>
	<div class="col-sm-6 col-sx-12">
		<div class="form-group">
			<label for="userMoney">Money</label>
			<input type="text" class="form-control" id="userMoney" value="{{= it.data[0].money}}">
		</div>
	</div>
</fieldset>
<div class="col-sm-6 col-sx-12">
	<div class="form-group">
		<label for="userNickname">昵称</label>
		<input type="text" class="form-control" id="userNickname" value="{{= it.data[0].nickname ? it.data[0].nickname : ''}}">
	</div>
</div>
<div class="col-sm-6 col-sx-12">
	<div class="form-group">
		<label for="userWebsite">网址</label>
		<input type="text" class="form-control" id="userWebsite" value="{{= it.data[0].website ? it.data[0].website : ''}}">
	</div>
</div>
<div class="col-sm-12 col-sx-12">
	<div class="form-group">
		<label for="userMessage">个人简介</label>
		<textarea class="form-control" id="userAbout" rows="2">
			{{= it.data[0].about ? it.data[0].about : ''}}
		</textarea>
	</div>
</div>
<div class="col-sm-12 col-sx-12">
	<div class="form-group">
		<button class="btn btn-default btn-block" id="saveUserBtn">保存</button>
	</div>
	<!-- 信息提示 -->
	<div class="alert" id="error" role="alert">
		<span class="glyphicon" aria-hidden="true"></span>
		<span class="errorContent"></span>
	</div>
</div>