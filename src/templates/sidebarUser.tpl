<div class="well about clearfix">
	<fieldset disabled="">
		<div class="col-xs-12">
			<div class="input-group userId">
			  <span class="input-group-addon"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></span>
			  <input type="text" class="form-control" value="{{= it.data[0].user_id}}">
			</div>
		</div>
		<div class="col-xs-6">
			<div class="input-group userMoney">
			  <span class="input-group-addon"><span class="glyphicon glyphicon-usd" aria-hidden="true"></span></span>
			  <input type="text" class="form-control" value="{{= it.data[0].money}}">
			</div>
		</div>
		<div class="col-xs-6">
			<div class="input-group">
			  <span class="input-group-addon"><span class="glyphicon glyphicon-usd" aria-hidden="true"></span></span>
			  <input type="text" class="form-control" value="{{= it.data[0].money}}">
			</div>
		</div>
	</fieldset>
	<div class="col-xs-12">
		<a class="btn btn-default btn-block everydayBtn" href="#new">新建主题</a>
	</div>
	<div class="col-xs-6">
		<a class="btn btn-default btn-block changeUserBtn" href="#user">修改</a>
	</div>
	<div class="col-xs-6">
		<button class="btn btn-default btn-block logoutBtn">登出</button>
	</div>
</div>