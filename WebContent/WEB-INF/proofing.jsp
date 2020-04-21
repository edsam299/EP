<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../header.jsp" %>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Proofing</title>
<head>
<script src="js/proofing.js?${sessionScope.key}"></script>
<script src="js/epcontroller.js?${sessionScope.key}"></script>
<style scoped>
  #ebt_dtp { margin-bottom: 10px; padding: 10px; outline: 2px dashed #CCC; width: auto; height: 130px;
  outline: 2px dashed #0090D2; overflow: scroll; }
  
  #dtpcontent { margin-bottom: 10px; padding: 10px; outline: 2px dashed #CCC; width: auto; height: 220px;
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
				</tr>			
			</table>
			<div id="display">	
				<table align="left" border="0" width="80%" style="border-collapse:collapse;">
					<tr>
						<td valign="top" rowspan="4"><div id="gunit" style="width:auto;height:150px;background-color:white;"></div></td>	
						<td valign="bottom">
						<table border="0">
							<tr>
								<td width="5%" align="right" valign="top"><label id="previous" title="previous"></label></td>
								<td width="5%" align="center" valign="top"><div id="divunit" align="center"></div></td>	
								<td width="5%" align="left" valign="top"><label id="next" title="next"></label></td>	
										
							</tr>							
							<tr>
								<td style="width: auto;" valign="top">File</td>
								<td style="width: auto;" valign="top"><select id="filename"></select></td>						
							</tr>		
							<tr>
								<td style="width: auto;" valign="top"><input type="button" id="preview" value="Preview"></td>	
								<td style="width: auto;" valign="top"><input type="button" id="export" value="Export"></td>									
							</tr>				
						</table>
						</td>					
				</table>
			</div>
			<div id="display_ebt_dtp" style="display: none">
				<table width="100%"><tr><td><div id="ebt_dtp" align="center" class="viewtable" style="overflow:scroll;"></div></td></tr></table>
			</div>									
			<table border="0" width="100%">
				<tr>
					<td width="60%" valign="top"><div id="dtpcontent" align="left" style="overflow:scroll;"></div></td>
					<td width="40%" valign="top" rowspan="2">
						<table border="0" align="right" width="100%">
							<tr>
								<td valign="top" style="width: 100%">
									<div id="gfootnote" style="width:100%;height:400px;background-color:white;"></div>	
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table border="0">
							<tr>
								<td width="40%">
									<fieldset>
										<legend><input type="checkbox">Edit</legend>
										<table width="100%" border="0">
											<tr>
												<td><label>DTP:</label></td><td><input type="text" id="dtp" style="width: 100%"></td>
											</tr>
											<tr><td colspan="2"><input type="text" style="width: 100%"></td></tr>
										</table>
										<table width="100%" border="0">
											<tr>
																																		
												<td valign="top">
													<input type="button" id="reviseproof" value="Change Variants">
													<input type="button" id="hide_unhide" value="EBT?">
													
												</td>
												<td align="right" valign="top">
													<input type="button" id="save" value="Save">
													<input type="button" id="submit" value="Submit">
												</td>
											</tr>
										</table>
									</fieldset>										
								</td>
								<td width="60%" valign="top">
									<table>
										<tr>
											<td  width="100%" valign="top">
													
															<input type="button" class="fixbutton" id="setfontbig" value="A+"/>
															<input type="button" class="fixbutton" id="setfontsmall" value="A-"/>
															<input type="button" class="fixbutton" id="tools" value="Tools"/>
															
																
												</td>	
										</tr>
									</table>
									<fieldset>
										<legend><input type="checkbox" id="showfootnote">Show inthe printed edition</legend>
											<table border="0" width="100%">	
												<tr><td colspan="6"><div id="divfootnote" contenteditable="true" spellcheck="false"></div></td></tr>		
												<tr><td colspan="3"><input type="button" class="fixbutton" id="history" value="History"/><input type="button" class="fixbutton" id="comment" value="Comment"/></td>
													<td align="right"><input type="button" class="fixbutton" id="savehistory" value="Save"/></td></tr>							
											</table>
									</fieldset>
								</td>
							</tr>
						</table>
			
					</td>
				</tr>
			</table>
			
			<div id="divcomment"></div>		
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
	loadButton(role, 5);
// 	setInterval(getSession(),500);
</script>
</html>
