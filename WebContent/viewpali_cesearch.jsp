<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
<style type="text/css">
	p:hover {
	 cursor:pointer;
	}
</style>
<title>View Pali</title>
</head>
<body>
<div class="container">
	<div><h3><span class = "label label-warning"><label id="lblkeyword"></label></span></h3></div>
	<table class="table table-condensed table table-bordered">
		<tr>
			<td width="50%"><div id="col1"></div></td>
			<td width="50%"><div id="col2"></div></td>
		</tr>
	</table>
</div>
</body>
<script src="js/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script  src="js/epcontroller.js?${sessionScope.key}"></script>
<script  src="js/viewpali_cesearch.js?${sessionScope.key}"></script>
</html>