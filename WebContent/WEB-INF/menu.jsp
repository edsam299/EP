<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/menu.css" />
<link rel="stylesheet" type="text/css" href="css/jquery.loadmask.css"/>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<title>Main menu</title>
<style type="text/css">
div#menu {
    height: 75vh;
}
</style>
<script type="text/javascript">window.history.forward();function noBack(){window.history.forward();}</script>
</head>
<body  onload="noBack();" onpageshow="if (event.persisted) noBack();" onunload="">
	<div id="content"><div id="menu"></div></div>
</body>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="dhtmlxmsg/codebase/message.js"></script> 
<script src="js/epcontroller.js?${sessionScope.key}"></script>
<script type="text/javascript">
	var baseUrl = "${pageContext.request.contextPath}";
	loadMenu('${sessionScope.idrole}');
	$('#editing').click(function(){
		$("#content").mask("Waiting...");
	});
</script>
</html>