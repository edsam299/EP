<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../header.jsp" %>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Approve Linking</title>
<head>
<!-- <link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/dhtmlxgrid.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_skyblue.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="dhtmlxTree/codebase/dhtmlxtree.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="css/themes/gray/easyui.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="css/themes/icon.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="css/jquery.loadmask.css"/> -->
<!-- <link rel="stylesheet" type="text/css" href="css/border/border.css" /> -->
<!-- <link rel="stylesheet" type="text/css" href="css/rearrange.css"/> -->
<!-- <link rel="stylesheet" type="text/css" href="css/basic.css"/> -->

<!-- <script type="text/javascript" src="js/jquery.min.js"></script> -->
<!-- <script type="text/javascript" src="js/jquery.loadmask.min.js"></script> -->
<!-- <script type="text/javascript" src="js/jquery.easyui.min.js"></script> -->
<!-- <script type="text/javascript" src="dhtmlxmsg/codebase/message.js"></script>  -->
<%-- <script type="text/javascript" src="js/common.js?${sessionScope.key}"></script> --%>
<!-- <script  src="dhtmlxGrid/codebase/dhtmlxcommon.js"></script> -->
<!-- <script  src="dhtmlxGrid/codebase/dhtmlxgrid.js"></script> -->
<!-- <script  src="dhtmlxGrid/codebase/dhtmlxgridcell.js"></script> -->
<!-- <script  src="dhtmlxGrid/codebase/ext/dhtmlxgrid_filter.js"></script>   -->
<!-- <script  src="dhtmlxTree/codebase/dhtmlxtree.js"></script> -->
<!-- <script  src="dhtmlxTree/codebase/ext/dhtmlxtree_json.js"></script> -->
<!-- <script  src="dhtmlxGrid/codebase/dhtmlxcombo.js"></script> -->
<script src="js/approvelinking.js?${sessionScope.key}"></script>
<script src="js/epcontroller.js?${sessionScope.key}"></script>
<style scoped>
  #viewdtp { margin-bottom: 10px; padding: 10px; outline: 2px dashed #CCC; width: auto; height: 390px;
  outline: 2px dashed #0090D2; overflow: scroll; }
  
  #viewebt { margin-bottom: 10px; padding: 10px; outline: 2px dashed #CCC; width: auto; height: 390px;
  outline: 2px dashed #0090D2; overflow: scroll; }
/*   [contenteditable="true"] { padding: 10px; outline: 2px dashed #CCC; width: 95%; height: auto;} */
/*   [contenteditable="true"]:hover { outline: 2px dashed #0090D2; } */
</style>
</head>
<body>
<div id="content">
	<div class="easyui-layout" style="width:97vw;height:92vh;">
		<div region="west" split="true" title="<b>Choose a Text</b>" style="width:250px;">
			<div id="treeboxbox" style="width:auto; height:590px;background-color:#f5f5f5;border :1px solid Silver;; overflow:auto;"></div>
		</div>
		<div id="content" region="center" title="" style="padding:5px;">
			<table width="100%">
				<tr>
					<td width="85%"><div id="divh1toh4" class="left"></div></td>
					<td width="5%" align="right"><label id="previous" title="previous"></label></td>
					<td width="5%" align="center"><div id="divunit" align="center"></div></td>	
					<td width="5%" align="left"><label id="next" title="next"></label></td>
				</tr>			
			</table>
			<div id="display">	
				<table align="left" border="0" width="80%" style="border-collapse:collapse;">
					<tr>
						<td valign="top" rowspan="4"><div id="gsection" style="width:auto;height:150px;background-color:white;"></div></td>	
						<td style="width: auto;" valign="top"><div id="gunit" style="width:auto;height:150px;background-color:white;"></div></td>			
					</tr>
				</table>
			</div>
			<table>
				<tr>
					<td><div id="divapprove" class="left"></div></td>
					<td><div id="divmanualmode" class="left"></div></td>				
					<td><div id="divhide_unhide" class="left"></div></td>				
					<td><div id='basic-modal'></div></td>
				</tr>
			</table>							
			<div id="view" align="center" class="viewtable" style="overflow:scroll; height: 370px;"></div>				
			<div id="basic-modal-content">
				<table border="0">
					<tr>
						<td></td>
						<td rowspan="6"><div id="gebt" style="width:680px;height:150px;background-color:white;"></div></td>
					</tr>
					<tr>
						<td rowspan="1"><div id="dtp"></div></td>
					</tr>
					<tr>
						<td rowspan="1"><div id="rearranged"></div></td>
					</tr>			
					<tr>
						<td><div id="fontbig" class="left"></div><div id="fontsmall"></div></td>
					</tr><tr><td></td></tr><tr><td></td></tr>	
				</table>	
				<table width="80%">
					<tr><td width="40%"><div id="viewdtp"></div></td><td></td><td width="40%"><div id="viewebt"></div></td></tr>
				</table>
			</div>	
		</div>
	</div>
</div>
<script type='text/javascript' src='js/jquery.simplemodal.js'></script>
<script type='text/javascript' src='js/basic.js'></script>
</body>
<script type="text/javascript">
	var baseUrl = "${pageContext.request.contextPath}";
	var _iduser='${sessionScope.iduser}';
	var role='${sessionScope.idrole}';
	loadButton(role, 4);
</script>
</html>
