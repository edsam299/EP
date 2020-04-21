<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../headerpopup.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="bootstrap/css/simple-sidebar.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/table.css" />	
<style type="text/css">
.synlabel{
		font-size:16px;
	font-family:Open Sans;
	font-weight: 1;
}
label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: normal;
    white-space:pre
}
</style>
<title>Synoptic</title> 
</head>
<body>
		<div id="page-content-wrapper" style="overflow: auto;">
			<div class="container-fluid">		
			<table border="0" width="100%">
				<tr>
					<td width="800px;"><div id="h1toh4" style="display:inline;"></div></td>
					<td><div id="divunit"></div></td>
					<td align="right"></td>
					<td align="right"><font size="3">Line</font></td>
					<td  align="center"><label id="previous" title="previous"></label><label id="lineno"><font size="10"></font></label><label id="next" title="next"></label></td>
					<td align="left"></td>
				</tr>
			</table>
			<table align="center" border="0" width="auto">
				<tr>
					<td valign="top"><div id="display_synoptic" class="border-line"></div></td>
				</tr>
			</table>	
			<div id="view" align="center" class="viewtable"></div>
			<table align="center" border="0" width="100%">
				<tr>
					<td width="50%"><div id="gunit"  style="width:100%; height:200px;background-color:white;"></div></td>
					<td width="50%"><div id="gdesc"  style="width:100%;height:200px;background-color:white; display: none"></div></td>
				</tr>			
			</table>	
			</div>
		</div>
</body>

<script src="bootstrap/js/bootstrap.min.js"></script>
<script  src="js/epcontroller.js?${sessionScope.key}"></script>
<script  src="js/synoptic_e2.js?${sessionScope.key}"></script>
<script type="text/javascript">
// $("#menu-toggle").click(function(e) {
//     e.preventDefault();
//     $("#wrapper").toggleClass("toggled");
// });
	var baseUrl = "${pageContext.request.contextPath}";
	var _iduser='${sessionScope.iduser}';
// 	document.getElementById('menu-toggle').click();
</script>
</html>
