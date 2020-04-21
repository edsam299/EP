<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%@ include file="headerpopup.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script  src="js/exportword.js?${sessionScope.key}"></script>
<title>Export Word</title>
</head>
<body>
	<div id="content">
		<table align="center" border="0">
			<tr>
				<td width="20%"><div id="gseries" style="width:auto; height:450px;background-color:white;"></div></td>
				<td width="20%"><div id="gbasetext" style="width:auto;height:450px;background-color:white;"></div></td>
				<td width="20%"><div id="gsutta" style="width:auto;height:450px;background-color:white;"></div></td>
				<td width="20%"><div id="gsection" style="width:auto;height:450px;background-color:white;"></div></td>
				<td width="20%"><div id="gunit" style="width:auto;height:450px;background-color:white;"></div></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td align="right"><div id="divsutta"></div></td>
				<td align="center"><input type="checkbox" id="excluding" value="0">Excluding comments</td>
				<td><div id="divunit"></div></td>
			</tr>
		</table>
	</div>	
</body>
</html>