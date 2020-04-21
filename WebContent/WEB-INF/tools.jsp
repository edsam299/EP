<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/menu.css" />
<title>Tools</title>
</head>

<body>
<div id="content">
<table style="margin-top: 10%;" align="center">
	<tr>
		<td>
			<div class="navigation" align="center">			
				<table>
					<tr>
						<td><div id="tool_search"></div></td>
<!-- 						<td><div id="tool_index"></div></td> -->
						<td><div id="synoptic_view"></div></td>					
					</tr>
				</table>									
			</div>	
		</td>
	</tr>
</table>
<div>${test}</div>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="dhtmlxmsg/codebase/message.js"></script> 
<script src="js/epcontroller.js?Math.random()"></script>
<script type="text/javascript">
	var baseUrl = "${pageContext.request.contextPath}";
	loadButton('${sessionScope.idrole}', 9);
</script>
</div>
</body>
</html>