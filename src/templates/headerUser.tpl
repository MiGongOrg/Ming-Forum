{{? !it.data[0].user_id}}
<li><a href="#login">注册 / 登录</a></li>
{{??}}
<li class="dropdown">
  <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{= it.data[0].email}}<span class="caret"></span></a>
  <ul class="dropdown-menu">
    <li><a href="#user">个人信息</a></li>
    <li role="separator" class="divider"></li>
    <li><a href="javascript:;" class="logoutBtn">登出</a></li>
  </ul>
</li>
{{?}}