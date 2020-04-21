<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css">
<script src="js/jquery.min.js"></script>
<script src="dhtmlxmsg/codebase/message.js"></script> 
<script src="js/epcontroller.js"></script>
<title>Permission</title>
</head>
<body>
	<div>${premission}</div>
</body>
<script type="text/javascript">
dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+'${premission}');
setTimeout(function(){            			
	window.location.href='./url?operation=Main Menu&id=1';   
}, 1500);
</script>
</html>