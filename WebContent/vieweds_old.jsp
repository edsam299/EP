<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>View</title>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/easyzoom.js"></script>
<script type="text/javascript">
	
jQuery(function($){
	$('a.zoom').easyZoom();
// 	alert(obj.imgpath);
});

</script>
<style>

#easy_zoom{
	width:500px;
	height:250px;	
	border:0px solid #eee;
	background:#fff;
	color:#333;
	position:absolute;
	top:250px;
 	left:700px;
	overflow:hidden;
	-moz-box-shadow:0 0 10px #777;
	-webkit-box-shadow:0 0 10px #777;
	box-shadow:0 0 10px #777;
	/* vertical and horizontal alignment used for preloader text */
	line-height:400px;
	text-align:center;
}
.fixbutton{
	margin-left:-3px;
	margin-right:-3px;
}
textarea{
	width:1100px;
	height:250px;
	
}
.aa{position:relative;width="400"; height="370"}


</style>

</head>
<body>
<div id="divpicturename" class="aa"><div><a id="lnk_a" class="zoom" style="cursor: pointer;"> <img id="more_clicky"  width="700" height="600"></a><div style="position: relative; left: -100px; top: 50px; height: 0px;" id="more_clicky"><div style="float: left; margin-left: 300px; padding-top: 20px; width: 200px;" id="other_clicky"><div style="margin-left: -500px; top: -40px; width: 100px; height: 0px; position: relative;" id="reference">
</div></div><div style="margin-left: -100px; top: -60px; width: 100px; height: 100px; position: relative;" id="clicky"></div></div></div><div id="easy_zoom" style="display: none"></div><div align="center" id="finalchecking"></div></div>
</body>
<script type="text/javascript">
var obj=window.dialogArguments;
document.title=obj.title;
var img=document.getElementById("lnk_a");
img.href=obj.imgpath;
var imgs=document.getElementById("more_clicky");
imgs.src=obj.imgpath;
$('#finalchecking').html(obj.finalchecking);
</script>
</html>