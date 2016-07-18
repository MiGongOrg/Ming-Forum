{{~ it.data:obj:i }}
{{console.log(it.data);}}
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title"><a href="/#posts/{{= obj['id']}}" title="{{= obj['title']}}">{{= obj['title']}}</a></h3>
  </div>
  <div class="panel-body">
    {{= obj['content']}}
  </div>
  <div class="panel-footer clearfix">
  	<div class="col-md-4 col-sm-4 col-xs-6">
  		<span class="glyphicon glyphicon-user" aria-hidden="true"></span> <span class="">{{= obj['userName']}}</span>
  	</div>
  	<div class="col-md-4 col-sm-4 hidden-xs text-center">
  		<span class="glyphicon glyphicon-time" aria-hidden="true"></span> <span class="">{{= Ming.newDate(obj['postTime'])}}</span>
  	</div>
  	<div class="col-md-4 col-sm-4 col-xs-6 text-right">
  		<span class="glyphicon glyphicon-comment" aria-hidden="true"></span> <span class="badge">{{= obj['comment'] ? obj['comment'] : '0'}}</span>
  	</div>
  </div>
</div>
{{~}}