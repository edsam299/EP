<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../header.jsp" %>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="bootstrap/css/simple-sidebar.css" rel="stylesheet">	   
<title>E1</title>
<head>
<script src="js/e1.js?${sessionScope.key}"></script>
</head>
<!-- <body oncontextmenu="return false;"> -->
<div id="overlay" style="display: none"><span>Please wait...</span></div>  
<div style="font-family:Open Sans;background:rgba(230, 228, 229, 0.79);color: #1f1d1d">
	<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true" id="menu-toggle"></span>
</div>
<div id="wrapper">
		<div id="sidebar-wrapper">
			<div style="font-family:Open Sans;background:#f5f5f5;color:#675c5c">
				<b>Choose a Text</b>
			</div>
			<div id="treeboxbox" style="width:auto; height:595px;background-color:#f5f5f5;border :1px solid Silver;; overflow:auto;"></div>			
		</div>
		<div style="font-family:Open Sans;background:#f5f5f5;color:#675c5c">
			<b>Choose a Section</b>
		</div>		
		<div id="page-content-wrapper">
			<div class="container-fluid">
				<table border="0" width="auto">
					<tr>
						<td valign="top">
							<div id="gridbox" style="width:auto;height:300px;background-color:white;"></div>
							<table border="0">
								<tr>
									<td valign="top" align="left"  width="40x;"><div id="editDiv"></div></td>
									<td valign="top" align="left"><input type="button" id="export" value="Export"></td>									
								</tr>
								<tr>
									<td valign="top" colspan="2">
										<div id="my_progress_bar_1" style="position: relative; top: 45%; margin: 0px auto; width: 50px;"></div>
									</td><td></td>
								</tr>
							</table>
						</td>
						<td style="width: auto;" valign="top"><div id="detail" style="width: auto; height: 500px; overflow: auto;"></div></td>
					</tr>
				</table>	
	
			</div>
		</div>
	</div>
	<form action="Logout" method="post">
		<input type="submit" id="submit" style="display: none">
	</form>	
</body>
    <!-- Bootstrap Core JavaScript -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
	var baseUrl = "${pageContext.request.contextPath}";
	var _iduser='${sessionScope.iduser}';
	var role='${sessionScope.idrole}';
	loadButton(role, 1);
	document.getElementById('menu-toggle').click();
</script>
</html>
