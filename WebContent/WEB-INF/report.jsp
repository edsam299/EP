<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../header.jsp" %>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script  src="js/report.js?${sessionScope.key}"></script>
<script  src="js/exportword.js?${sessionScope.key}"></script>
<title>Report</title>
</head>
<body>
	<table border="1" width="100%">
		<tr>
			<td width="30%"><div id="gseries" style="width:auto; height:450px;background-color:white;"></div></td>
			<td width="30%"><div id="gbase_text" style="width:auto; height:450px;background-color:white;"></div></td>
			<td width="30%" valign="top">
				<div id="rpt_edit" style="width:auto; height:150px;background-color:white;"></div>
				<div id="rpt_progress" style="width:auto; height:150px;background-color:white;"></div>
			</td>
		</tr>
	</table>
</body>
</html>