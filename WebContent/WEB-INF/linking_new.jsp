<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../header.jsp" %>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet"> -->
<title>Linking</title>
</head>
<body>
<iframe id="lp" style="width:100%; height:700px" scrolling="yes"></iframe>
<!-- 	<div id="content"> -->
<!-- 		<div class="easyui-layout" style="width:97vw;height:92vh;"> -->
<%-- 			<div region="west" split="true" title="<b>Choose a Text</b>" style="width:200px;"> --%>
<!-- 				<div id="treeboxbox" style="width:auto; height:590px;background-color:#f5f5f5;border :1px solid Silver;; overflow:auto;"></div> -->
<!-- 			</div> -->
<!-- 			<div id="content" region="center" title="" style="padding:5px;"> -->
<!-- 				<iframe id="linking" name="iframe_target" frameborder="0" scrolling="no" style="width: 100%; height: 100%;"></iframe> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 	</div> -->
</body>
<script type="text/javascript">
	var baseUrl = "${pageContext.request.contextPath}";
	var _iduser='${sessionScope.iduser}';
	var role='${sessionScope.idrole}';
	document.getElementById("lp").src="http://10.190.0.57:8080/LP/index.jsp?iduser="+_iduser;
// 	loadButton(role, 17);
</script>
<%-- <script src="js/linking_new.js?${sessionScope.key}"></script> --%>
<%-- <script src="js/epcontroller.js?${sessionScope.key}"></script> --%>
</html>