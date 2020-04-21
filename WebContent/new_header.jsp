<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
	 		<table width="100%" style="padding: 0; margin: 0;border-collapse: collapse;background: red;">
	 			<tr style="padding: 0; margin: 0;background: red;">
	 				<td style="padding: 0; margin: 0;background: red; width: 36px"><img src="logo/logo.jpg" height="21" width="42"></td>
	 				<td style="padding: 0; margin: 0;background: red;"><div align="left" style="background-color: red"><b><font color="white">&nbsp;Dhammachai Tipitaka Project.</font></b></div></td>
	 				<td style="padding: 0; margin: 0;background: red; width: 200px">
	 					<div id="username" align="right" style="background-color: red"><font color="white"></font></div>
	 				</td>
	 				<td align="right" style="width: 160px; ">
	 					<form action="Logout" method="post">
	 						<input type="button" value="Main Menu" onclick="mainMenu()">
	 						<input type="submit" value="Logout">
	 					</form>
	 				</td>
	 			</tr>
	 		</table>	
</body>
<style>
	td:hover{
		cursor:pointer;
	}
</style>
<link href="css/maintable.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css">
<link rel="stylesheet" type="text/css" href="css/modal.css"/>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/common.js?${sessionScope.key}"></script>
<script type="text/javascript" src="dhtmlxmsg/codebase/message.js"></script> 
<script type="text/javascript">
	document.getElementById('username').innerHTML='Username:  ${sessionScope.user}';
	document.getElementById("username").style.color = "white";
	var baseUrl = "${pageContext.request.contextPath}";
	var _messageUI=null;
	var _ukitUtil = new UkitUtil();
	function mainMenu(){window.location.href='./url?operation=Main Menu&id=1';}
		
	_ukitUtil.getMessageUI(function(msg){_messageUI=msg;});
	function highlight_row(idtable) {
	    var table = document.getElementById(idtable);
	    var cells = table.getElementsByTagName('td');

	    for (var i = 0; i < cells.length; i++) {
	        // Take each cell
	        var cell = cells[i];
	        // do something on onclick event for cell
	        cell.onclick = function () {
	            // Get the row id where the cell exists
	            var rowId = this.parentNode.rowIndex;

	            var rowsNotSelected = table.getElementsByTagName('tr');
	            for (var row = 0; row < rowsNotSelected.length; row++) {
	                rowsNotSelected[row].style.backgroundColor = "";
	                rowsNotSelected[row].classList.remove('selected');
	            }
	            var rowSelected = table.getElementsByTagName('tr')[rowId];
	            rowSelected.style.backgroundColor = "#BCD4EC";
	            rowSelected.className += " selected";

//	            msg = 'The ID of the company is: ' + rowSelected.cells[0].innerHTML;
//	            msg += '\nThe cell value is: ' + this.innerHTML;
//	            alert(msg);
	        };
	    }

	} //end of function
</script>
</html>