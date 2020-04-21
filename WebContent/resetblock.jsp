<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="headerpopup.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script  src="js/resetunit.js?${sessionScope.key}"></script>
<title>Reset Block</title>
</head>
<body>
<div id="content">
<div style="overflow: scroll;">
<table border="0" width="100%" align="center">
		<tr>
			<td width="20%"><div id="h1toh4andunit"></div></td>
			<td width="40%"><div id="h1toh4"></div></td>
			<td width="20%"><b>Basetext Content:</b></td>
			<td width="20%"><div id="contentbasetext" align="left"></div></td>
		</tr>
	    <tr>
	        <td colspan="2" valign="top"><div id="basetext" style="overflow: scroll; width:auto; height: 395px;" class="border-line"></div></td>
	        <td colspan="2"  valign="top"><div id="basetextcontent" style="width:auto;height:395px;background-color:white;"></div></td>
	    </tr>
	    <tr>
	      <td colspan="2" valign="top"><b>Variant:</b><div id="variant"></div></td>
	      <td colspan="2" rowspan="8">
	        <fieldset style="width: 95%">
	          <legend>New Variants</legend>
                <table><tr><td valign="top"><div id="newvariant" style="overflow: scroll; margin-top: 0; width:500px; height:100px;"></div></td>						
                </tr></table>
                <input type="button" value="Update" id="update"/><input type="button" value="Update All" id="updateall">
	        </fieldset></td>
  		</tr>
	    <tr>
	      <td colspan="2" valign="top"><b>Emendation:</b><div id="emendation"></div></td>
  		</tr>
	    <tr>
	      <td colspan="2" valign="top"><b>Footnote:</b><div id="footnote"></div></td>
  		</tr>
	    <tr>
	      <td colspan="2" valign="top">&nbsp;</td>
  		</tr>
	    <tr>
	        <td colspan="2" valign="top"><div id="emendation"></div></td>
    	</tr>
	    <tr>
	        <td colspan="2"><div id="footnote"></div></td>
	    </tr>	  
	     <tr>
	       <td colspan="2">&nbsp;</td>
  </tr>  
	</table>
</div>	
</div>	
</body>
<script type="text/javascript">
	var _iduser='${sessionScope.iduser}';
// 	var roleId='${sessionScope.idrole}';
// 	loadButton(roleId, 2);
</script>
</html>