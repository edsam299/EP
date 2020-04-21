<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="headerpopup.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- <meta http-equiv="X-UA-Compatible" content="chrome1" /> -->
<title>E2</title>
<head>
	<script  src="js/footnote.js?${sessionScope.key}"></script>  
	<script  src="js/history.js?${sessionScope.key}"></script>	
	<script  src="js/e2.js?${sessionScope.key}"></script>
	<script  src="js/groupungroup.js?${sessionScope.key}"></script>  

	<script src="ckeditor/lib/js/ckeditor.js"></script>
	<script src="ckeditor/lib/js/sample.js"></script>
<!-- 	<link rel="stylesheet" href="ckeditor/lib/css/samples.css"> -->
	<link rel="stylesheet" href="ckeditor/lib/toolbarconfigurator/lib/codemirror/neo.css">
		  
	<style>
		.highlight{background-color:#4CC552}
		#content,#up_div{width: 100%; height: 100%;}
		#up_div{ position: absolute; z-index:999; display:none; z-index:999; }
	</style>   
</head>
<body>
<!-- 		<div align="left" style="background-color: red"><b><font color="white">Username : Test S.</font></b></div> -->
		

<div id="content">
<!--	<div class="easyui-layout" style="width:1000px;height:700px;">-->
	<div class="easyui-layout" style="width:97vw;height:95vh;">
		<div region="west" split="true" title="<b>Choose a Unit</b>" style="width:310px;">
		<table border="0">
				<tr valign="bottom">
					<td><div id=basetexname></div></td>
				</tr>
			
			</table>
			<table align="center">
				<tr>
					<td align="left"><label id="previous" title="previous"></label></td>
					<td><div id=unitno><font size="10"></font></div></td>
					<td align="right"><label id="next" title="next"></label></td>
				</tr>
			</table>
			<table>
				<!-- header -->
				<tr>
					<td><div id="gunit" style="width:300px;height:300px;background-color:white;"></div>	</td>
				</tr>
			</table>
			<fieldset>
				<legend> History</legend>
				<div align="center">
					<table>
						<tr>
							<td><div id="hunit"></div></td>
							<td><div id="hcomment"></div></td>
							<td><div id="hfootnote"></div></td>
							<td><div id="hemendation"></div></td>						
						</tr>
					</table>
				</div>
				<div id="my_progress_bar_1" style="position: relative; top: 45%; margin: 0px auto; width: 50px;"></div>	
			</fieldset>	 			
		</div>
		
		<div id="content" region="center" style="padding:2px;">
		<div id="up_div"></div>
			<table border="0">
				<tr>
					<td width="80%"><div id="word" style="overflow: scroll; width:auto; height: 250px;" class="border-line"></div></td>
					<td>
						<div class="border-line">
							<div id="gpicture" style="width:250px; height:250px;background-color:white;"></div>
							<div id="geds" style="width:240px;height:250px;background-color:white; display: none;"></div>
						</div>		
					</td>
				</tr>
			</table>		
		<table border="0" width="auto">
			<tr>
				<td style="width: auto;">
					<div id="saveDiv" class="left"></div>
					<div id="fontBigDiv" class="left"></div>
					<div id="fontSmallDiv" class="left"></div>			
					<div id="addtolistDiv" class="left"></div>
				</td>		
				<td style="width: auto;">
					<fieldset>
					<legend><input type="checkbox" id="chkgroup">Group/Ungroup</legend>
						<table border="0">
							<tr>
								<td><label id="lblgroup" style="width:auto;  display: inline-flex;"></label></td>
								<td><div id="ungroup" class="right"></div><div id="group" class="right"></div></td>
							</tr>
						</table>
					</fieldset>
				</td>										
				<td style="width: auto;">
					<input type="text" id="txtsearch" style="width: 70px;" class="left">
					<div id="searchdiv" class="left"></div>										
					<div id="tools" class="left"></div>
					<div id="unlocktoresearch" class="left"></div>
					<div id="submitunit" class="left"></div>
				</td>	
			</tr>
		</table>
<!-- 		<table border="1"> -->
<!-- 			<tr><td width="90%" colspan="6"><div id="gvariant"  style="width:auto; height:250px;background-color:white;"></div></td></tr> -->
<!-- 		</table> -->
	<div id="gvariant"  style="width:auto; height:250px;background-color:white;"></div>
		<table border="0" width="100%">
			<tr>
				<td width="90%">
					<fieldset style="width: 95%">
						<legend><input type="checkbox" id="viewfootnote">Footnotes in the Printed Edition</legend>
						<table><tr><td valign="top"><div id="edit_footnote"></div></td>
							<td valign="middle"><div id="divfootnote"></div></td>							
						</tr></table>
					</fieldset>
				</td>
			</tr>
		</table>
		<div id="divcomment"></div>
		<div id="divcty" style="display: none"></div>
		<div id="choicereason" style="display: none"></div>			
		<table width="100%">
			<tr>
				<td width="10%" valign="top" align="right">
					<div id="reasonDiv"></div>
					<div id="commentdetail"></div>
				</td>			
				<td width="90%" valign="top"><iframe id="comments" src="comment.jsp" width="100%" height="150%" frameborder="0" scrolling="no" align="top"></iframe></td>				
			</tr>
		</table>
		<div id="viewfootnotehistory" style="display:none">
			<div id="gfootnote" style="width:1000px;height:350px;background-color:white;"></div>
			<div id="viewfootnotedetail" style="width:auto; height:auto;"></div>
		</div>
		<div id="viewcommenthistory" style="display:none">
			<div id="gcomment" style="width:1000px;height:350px;background-color:white;"></div>
			<div id="viewcommentdetail" style="width:auto; height:auto;"></div>
		</div>
		<div id="viewemendationhistory" style="display:none">
			<div id="gemendation" style="width:1000px;height:350px;background-color:white;"></div>
			<div id="viewemendationdetail" style="width:auto; height:auto;"></div>
		</div>		
		<div id="viewunithistory" style="display:none">
			<div id="gunithis" style="width:1000px;height:350px;background-color:white;"></div>
			<div id="viewunitdetail" style="width:auto; height:auto;"></div>
		</div>	
		<div id="viewfootnoteedit" style="display:none">
			<div class="adjoined-bottom">
				<div class="grid-container">
					<div class="grid-width-100">
						<div id="editor"></div>
					</div>
				</div>
			</div>
		</div>						
		<div id="viewdiference" style="display:none">
			<table border="0" width="100%">
				<tr><td colspan="2"><div id="desc"></div></td></tr>
				<tr><td width="50%"><b>ITAP</b></td><td width="50%"><b>Editing</b></td></tr>				
				<tr>
					<td><div id="divitap" class="border-line" style="overflow:scroll; width:100%;height:330px;background-color:white; font-size: 18px; font-family: 'Open Sans';"></div>
					</td><td><div id="divedit" class="border-line" style="overflow:scroll; width:100%;height:330px;background-color:white; font-size: 18px; font-family: 'Open Sans';"></div></td>
				</tr>
				<tr><td><div id="submititap"></div></td><td><div id="submitediting"></div></td></tr>
				<tr><td><div id="changeby"></div></td><td></td></tr>
			</table>			
		</div>		
	</div>	
	</div>
	</div>	
	<div style="display:none;">
	<form action="Logout" method="post">
		<input type="submit" id="submit">
	</form>
	</div>
</body>
<script type="text/javascript">
	var _iduser='${sessionScope.iduser}';
	var roleId='${sessionScope.idrole}';
	loadButton(roleId, 2);
</script>
</html>
