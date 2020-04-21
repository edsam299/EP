<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Rearrange</title>
<style>
  #word { margin-bottom: 10px; padding: 10px; outline: 2px dashed #CCC; width: 95%; height: 250px;
  outline: 2px dashed #0090D2; }
  fieldset
{
    border:2px solid #ADD9EF;
    -moz-border-radius:8px;
    -webkit-border-radius:8px;	
    border-radius:8px;	
    font-size: 18px;
}
/*   [contenteditable="true"] { padding: 10px; outline: 2px dashed #CCC; width: 95%; height: auto;} */
/*   [contenteditable="true"]:hover { outline: 2px dashed #0090D2; } */
</style>

<!-- <link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/dhtmlxgrid.css"> -->
<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_terrace.css">
<!-- <link rel="stylesheet" type="text/css" href="dhtmlxTree/codebase/dhtmlxtree.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="css/themes/gray/easyui.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="css/themes/icon.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="css/border/border.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="css/jquery.loadmask.css"/> -->
<link rel="stylesheet" type="text/css" href="css/rearrange.css"/>
<style type="text/css">
.highlight {
	background-color: yellow;
}

.highlightSearch {
	background-color: orange;	
}

</style>
<!-- <script type="text/javascript" src="js/jquery.min.js"></script> -->
<script type="text/javascript" src="js/highlight.js"></script> 
<!-- <script type="text/javascript" src="js/jquery.loadmask.min.js"></script> -->
<!-- <script type="text/javascript" src="js/jquery.easyui.min.js"></script> -->
<!-- <script type="text/javascript" src="dhtmlxmsg/codebase/message.js"></script>  -->
<script type="text/javascript" src="js/common.js?${sessionScope.key}"></script>

<!-- <script  src="dhtmlxGrid/codebase/dhtmlxcommon.js"></script> -->
<!-- <script  src="dhtmlxGrid/codebase/dhtmlxgrid.js"></script> -->
<!-- <script  src="dhtmlxGrid/codebase/dhtmlxgridcell.js"></script>   -->
<!-- <script  src="dhtmlxTree/codebase/dhtmlxtree.js"></script> -->
<!-- <script  src="dhtmlxTree/codebase/ext/dhtmlxtree_json.js"></script> -->
<script  src="js/epcontroller.js?${sessionScope.key}"></script>
<script  src="js/history.js?${sessionScope.key}"></script>
<script  src="js/rearrange.js?r=${sessionScope.key}"></script>
<script  src="js/find.js?${sessionScope.key}"></script>
</head>
<body>
<div id="content">
	<div class="easyui-layout" style="width:97vw;height:95vh;">
		<div region="west" split="true" title="<b>Choose a Text</b>" style="width:220px;">
			<div id="treeboxbox" style="width:auto; height:auto;background-color:#f5f5f5;border :1px solid Silver;; overflow:auto;"></div>
		</div>
		<div id="content" region="center" title="" style="padding:5px;">
			<div id="display">	
				<table align="center" border="0" width="100%">
					<tr>
						<td width="40%"><div id="gsection"  style="width:100%;height:200px;background-color:white;"></div></td>
						<td width="60%"><div id="gunit"  style="width:100%; height:200px;background-color:white;"></div></td>					
					</tr>			
				</table>	
			</div>			
			<table border="0" width="100%">
				<tr>
					<td width="10%"><div id="hide_unhide"></div></td>
					<td width="700px;"><div id="h1toh4" align="left" style="display:inline;"></div></td>
					<td align="right"><div id="unit"></div></td>
					<td width="30px;"><label id="previous" title="previous"></label></td>
					<td width="50px;" align="center"><div id="divunit"></div></td>
					<td width="30px;"><label id="next" title="next"></label></td>
				</tr>
			</table>
			<table border="0" width="100%">
				<tr>
					<td rowspan="24" width="80%" valign="top">
						<div id="word" contenteditable="true" spellcheck="false"  style="overflow: scroll; margin-top: 0;"></div>						
						<div>
							<table border="0" align="left" width="98%">
								<tr>
									<td width="45%">
										<div id="breakunit" class="left"></div>
										<div id="breakparagraph" class="left"></div>
										<div id="fontBig" class="left"></div>
										<div id="fontSmall" class="left"></div>
										<div id="save" class="left"></div>
									</td>
<!-- 									<td colspan="3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td> -->
									<td width="38%">
										<div id="submit" class="left"></div>
										<div id="tool" class="left"></div>
										<div id="unlocked" class="left"></div>	
										<div id="unithistory" class="left"></div>																																																			
									</td>
									<td align="right"><div id="editby" class="right"></div></td>										
								</tr>							
							</table>
						</div>
					</td>					
				</tr>
				<tr>
					<td colspan="5">
						<div>
							<table>
								<tr>
									<td><fieldset><legend>Search</legend>
										<table><tr><td><input type="text" id="find"></td><td><div id="search"></div></td></tr></table>
										</fieldset>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<div>
							<table>
								<tr>
									<td><fieldset><legend>Replace with</legend>
										<table>
											<tr><td><input type="text" id="findreplace"></td><td><div id="replace"></div></td></tr>
											<tr><td><td><div id="replaceall"></div></td></tr>											
										</table>
										</fieldset>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
<!-- 				<tr> -->
<!-- 					<td colspan="5"> -->
<!-- 						<div> -->
<!-- 							<table align="left"> -->
<!-- 								<tr> -->
<!-- 									<td> -->
<!-- 										<div id="submit" class="left"></div> -->
<!-- 										<div id="tool" class="left"></div> -->
<!-- 										<div id="unlocked" class="left"></div>																																					 -->
<!-- 									</td> -->
<!-- 								</tr> -->
<!-- 							</table> -->
<!-- 						</div> -->
<!-- 					</td> -->
<!-- 				</tr> -->
				<tr>
<!-- 					<td colspan="3"><div id="editby"></div></td> -->
<!-- 					<td align="right"><div id="unithistory"></div></td> -->
				</tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>	
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td><td></td></tr>										
			</table>
			<div id="view" align="center" class="viewtable" style="overflow: x=auto;"></div>
			<div id="divconfirm" class="right"></div><div id="divmanual" class="right"></div>
		</div>
	</div>	
</div>
		<div id="viewunithistory" style="display:none">
			<div id="gunithis" style="width:1000px;height:350px;background-color:white;"></div>
			<div id="viewunitdetail" style="width:auto; height:auto;"></div>
		</div>	
</body>
<script type="text/javascript">
	var baseUrl = "${pageContext.request.contextPath}";
	var _iduser='${sessionScope.iduser}';
	loadButton('${sessionScope.idrole}', 3);
</script>
</html>
