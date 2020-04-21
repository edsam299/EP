<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Manage Menu For Admin</title>
<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/dhtmlxgrid.css">
<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_skyblue.css">
<link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css">
<link rel="stylesheet" type="text/css" href="css/table.css" />
<link rel="stylesheet" type="text/css" href="css/jquery.loadmask.css"/>

<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="dhtmlxmsg/codebase/message.js"></script> 
<script  src="dhtmlxGrid/codebase/dhtmlxcommon.js"></script>
<script  src="dhtmlxGrid/codebase/dhtmlxgrid.js"></script>
<script  src="dhtmlxGrid/codebase/dhtmlxgridcell.js"></script>  
<script type="text/javascript" src="js/common.js?${sessionScope.key}"></script>
<script  src="js/managemenu.js?${sessionScope.key}"></script>
</head>
<body>
	<table width="100%" border="0" align="center" style="width: auto; padding: 0;">
		<tr>
			<td><div id="role"  style="height:400px;background-color:white;"></div></td>
			<td><div id="menuname"  style="height:400px;background-color:white;"></div></td>
			<td><div id="page"  style="height:400px;background-color:white;"></div></td>
			<td><div id="buttonname"  style="height:400px;background-color:white;"></div></td>
		</tr>
		<tr>
			<td></td>
			<td align="right"><input type="button" id="savemenu" value="Save Menu"></td>
			<td align="right"><input type="button" id="savepage" value="Save Page"></td>
			<td align="right"><input type="button" id="savebutton" value="Save Button"></td>
		</tr>
	</table>
</body>
<script type="text/javascript">
	var baseUrl = "${pageContext.request.contextPath}";
	var _iduser='${sessionScope.iduser}';
</script>
</html>