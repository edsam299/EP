<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../header.jsp" %>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Linking</title>
<head>
<script src="js/linking.js?${sessionScope.key}"></script>
<script src="js/epcontroller.js?${sessionScope.key}"></script>
<style type="text/css">
</style>
</head>
<body>
<div id="content">
	<div class="easyui-layout" style="width:97vw;height:92vh;">
		<div region="west" split="true" title="<b>Choose a Text</b>" style="width:200px;">
			<div id="treeboxbox" style="width:auto; height:590px;background-color:#f5f5f5;border :1px solid Silver;; overflow:auto;"></div>
		</div>
		<div id="content" region="center" title="" style="padding:5px;">
			<div id="divtext" class="left"></div>
			<div id="divtotal"></div>
			<div id="divrearranged" class="left"></div>
			<div id="divoth"></div>
			<div id="divlink" class="left"></div>
			<div id="divshowdetail" class="left"></div>
			<table align="left" border="0" width="80%" style="border-collapse:collapse;">
				<tr>
					<td valign="top" rowspan="4"><div id="gridbox" style="width:auto;height:480px;background-color:white;"></div></td>	
					<td style="width: auto;" valign="top"><div id="h1toh4" style="width: 700px; height: auto; overflow: auto;"></div></td>			
				</tr>
				<tr><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr>
				<tr>
					<td style="width: auto;" valign="top"><div id="detail" style="width: auto; height: 450px; overflow: auto;"></div></td>					
				</tr>
			</table>
		</div>
	</div>
</div>
</body>
<script type="text/javascript">
	var baseUrl = "${pageContext.request.contextPath}";
	var _iduser='${sessionScope.iduser}';
	var role='${sessionScope.idrole}';
	loadButton(role, 17);
</script>
</html>
