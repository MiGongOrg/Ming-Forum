<!-- 文章内容 -->
<article>
	<div class="page-header">
		<h3>{{= it.data['title']}}</h3>
	</div>

	<div class="panel panel-default">
	  <div class="panel-body">
	    <p>{{= it.data['content']}}</p>
	  </div>
	  <div class="panel-footer clearfix">
	  	<div class="col-md-4 col-sm-4 col-xs-6">
	  		<span class="glyphicon glyphicon-user" aria-hidden="true"></span> <span class="">{{= it.data['userName']}}</span>
	  	</div>
	  	<div class="col-md-4 col-sm-4 hidden-xs text-center">
	  		<span class="glyphicon glyphicon-time" aria-hidden="true"></span> <span class="">{{= Ming.newDate(it.data['postTime'])}}</span>
	  	</div>
	  	<div class="col-md-4 col-sm-4 col-xs-6 text-right">
	  		<span class="glyphicon glyphicon-star" aria-hidden="true"></span> <span class="">{{= it.data['star'] ? it.data['star'] : '0'}}</span>
	  	</div>
	  </div>
  </div>
</article>

<hr>

<!-- comments -->
<div class="panel panel-default">
  <div class="panel-body">
    这里是评论内容
  </div>
  <div class="panel-footer clearfix">
  	<div class="col-md-4 col-sm-4 col-xs-6">
  		<span class="glyphicon glyphicon-user" aria-hidden="true"></span> <span class="">用户名</span>
  	</div>
  	<div class="col-md-4 col-sm-4 hidden-xs text-center">
  		<span class="glyphicon glyphicon-time" aria-hidden="true"></span> <span class="">2016年5月6日</span>
  	</div>
  	<div class="col-md-4 col-sm-4 col-xs-6 text-right">
  		<span class="glyphicon glyphicon-heart" aria-hidden="true"></span> <span class="">0</span>
  	</div>
  </div>
</div>

<div class="form-group">
	<textarea class="form-control" rows="3"></textarea>
</div>
<button class="btn btn-default btn-block" id="">发布</button>