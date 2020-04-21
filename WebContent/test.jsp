<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Test</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/dhtmlxgrid.css">
	<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_skyblue.css">
	<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_terrace.css">
	<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_web.css">
		<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_blue.css">
	<link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css">
	
      <script type="text/javascript" src="js/common.js?${sessionScope.key}"></script>
    <script  src="dhtmlxGrid/codebase/dhtmlxcommon.js"></script>
	<script  src="dhtmlxGrid/codebase/dhtmlxgrid.js"></script>
	<script  src="dhtmlxGrid/codebase/dhtmlxgridcell.js"></script> 	
</head>
<body>
<input type="button" value="getData" id="group">
<div id="gridbox" style="width:500px;height:300px;background-color:white;"></div>
<p>Maintaining <a aria-describedby="footnote-label" href="#footnotes" id="footnotes-ref">footnotes</a> 
manually can be a pain. By using <a aria-describedby="footnote-label" href="#css" id="css-ref">CSS</a> 
<a aria-describedby="footnote-label" href="#css-counters" id="css-counters-ref">counters</a> 
to add the numbered references in the text and an ordered list to display the actual 
footnotes in the footer, it becomes extremely easy.</p>
<ol>
  <li id="footnotes">Footnotes are notes placed at the bottom of a page. 
  They cite references or comment on a designated part of the text above it. 
  <a href="#footnotes-ref" aria-label="Back to content">↩</a></li>
  <li id="css">Cascading Style Sheets 
  <a href="#css-ref" aria-label="Back to content">↩</a></li>
  <li id="css-counters">CSS counters are, in essence, variables maintained 
  by CSS whose values may be incremented by CSS rules to track how many 
  times they're used. <a href="#css-counters-ref" aria-label="Back to content">↩</a></li>
</ol>
</body>
<script type="text/javascript">
var str = "               ";
// alert(str.trim()=="");
var baseUrl = "${pageContext.request.contextPath}";
$(document).ready(function(){
	var _ukitUtil = new UkitUtil();
	grid=_ukitUtil.createDhtmlxGrid('gridbox');
	grid.setImagePath("dhtmlxGrid/codebase/imgs/");
	grid.setHeader("<div align='center'>1</div>,<div align='center'>2</div>,<div align='center'>3</div>,idh3,id");
	grid.setColumnIds("unit,title,line,idh3,id");
	grid.setInitWidths("100,250,80,0,0");
	grid.setColAlign("left,left,right,left,left");
	grid.setColTypes("ro,ro,ro,ro,ro");
	grid.setSkin('modern');
// 	grid.setStyle("font: 14px Helvetica, Arial, sans-serif;padding:4px", "font: 14px Helvetica, Arial, sans-serif; padding:4px", "", "background-color:#c6f39d;color:#FFFFFF");
grid.setStyle("", "", "", "background-color:#c6f39d;color:#FFFFFF");
	grid.init();
	for(var i=0; i<10; i++){
		grid.addRow(i, ['test'+i,'test'+(i+1),'test'+(i+3)], i);
		grid.setCellTextStyle(5, 1, 'color:red; background-color:#FFFFFF');
	}
	grid.setCellTextStyle(5, 1, 'color:red; background-color:#FFFFFF');
// 	grid.setStyle("", "", "background-color#EEEEEE", "");
});
// $('#group').click(function(){
// 	var gService = new GroupService();
// 	var data=new Array();
// 	data.push("DN02-00011447730");
// 	data.push("DN02-00011447740");
// 	gService.checkSingleWord(data,function(success){
// // 		alert('s');
// 		alert(success+'xxxxx');
// // // 		var splitd=[];
// 		alert(1);
// 		splitd=success.split("|");
// 		alert(2);
// 		alert(splitd);
// 		for(var i=0; i<splitd.length; i++){
// 			console.log('split : '+splitd[i]);
// 		}
// 	});		
// });
</script>
</html>