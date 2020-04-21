<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
	 		<table width="100%" style="padding: 0; margin: 0;border-collapse: collapse;background: red;">
	 			<tr style="padding: 0; margin: 0;background: red;">
	 				<td style="padding: 0; margin: 0;background: red; width: 36px"><img src="logo/logo.jpg" height="21" width="42"></td>
	 				<td style="padding: 0; margin: 0;background: red;"><div align="left" style="background-color: red"><b><font color="white">&nbsp;Dhammachai Tipitaka Project.</font></b></div></td>
	 				<td style="padding: 0; margin: 0;background: red; width: 200px">
	 					<div id="username" align="right" style="background-color: red"><font color="white"></font></div>
	 				</td>
	 				<td align="right" style="width: 160px; ">
	 					<form action="Logout" method="post">
	 						<input type="button" value="Main Menu" onclick="mainMenu()">
	 						<input type="submit" value="Logout">
	 					</form>
	 				</td>
	 			</tr>
	 		</table>	
</body>
<!-- <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"> -->
<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/dhtmlxgrid.css">
<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_skyblue.css">
<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/dhtmlxcombo.css">
<link rel="stylesheet" type="text/css" href="dhtmlxTree/codebase/dhtmlxtree.css">
<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/gridmanual.css">
<link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css">
<link rel="stylesheet" type="text/css" href="css/splitter.css">
<link rel="stylesheet" type="text/css" href="css/themes/gray/easyui.css">
<link rel="stylesheet" type="text/css" href="css/themes/icon.css">
<link rel="stylesheet" type="text/css" href="css/progressbar.css" />
<link rel="stylesheet" type="text/css" href="css/modal.css"/>
<!-- approvelinking -->
<link rel="stylesheet" type="text/css" href="css/border/border.css" />
<link rel="stylesheet" type="text/css" href="css/rearrange.css"/>
<link rel="stylesheet" type="text/css" href="css/basic.css"/>
<!-- end approvelinking -->

<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="js/splitter.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="dhtmlxmsg/codebase/message.js"></script> 
<script type="text/javascript" src="js/common.js?${sessionScope.key}"></script>

<script  src="dhtmlxGrid/codebase/dhtmlxcommon.js"></script>
<script  src="dhtmlxGrid/codebase/dhtmlxgrid.js"></script>
<script  src="dhtmlxGrid/codebase/dhtmlxgridcell.js"></script>  
<script  src="dhtmlxTree/codebase/dhtmlxtree.js"></script>
<script  src="dhtmlxTree/codebase/ext/dhtmlxtree_json.js"></script>
<script  src="dhtmlxGrid/codebase/ext/dhtmlxgrid_filter.js"></script>  
<script  src="dhtmlxGrid/codebase/dhtmlxcombo.js"></script>
<script type="text/javascript" src="js/progressbar_mini.js"></script>
<script src="js/epcontroller.js?${sessionScope.key}"></script>
<script type="text/javascript">
	document.getElementById('username').innerHTML='Username:  ${sessionScope.user}';
	document.getElementById("username").style.color = "white";
	var baseUrl = "${pageContext.request.contextPath}";
	var _messageUI=null;
	var _ukitUtil = new UkitUtil();
	function mainMenu(){window.location.href='./url?operation=Main Menu&id=1';}
		
	_ukitUtil.getMessageUI(function(msg){_messageUI=msg;});
</script>
</html>