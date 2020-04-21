<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="bootstrap/crop/css/font-awesome.min.css">
<link rel="stylesheet" href="bootstrap/crop/css/bootstrap.min.css">
<link rel="stylesheet" href="bootstrap/crop/css/cropper.css">
<link rel="stylesheet" href="bootstrap/crop/css/main.css">
<style type="text/css">
.img-container {
  min-height: 150px;
  max-height: 800px;
  max-width: 100%;
  margin-bottom: 20px;
}
label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 100;
}
textarea.form-control {
    height: 400px;
}
</style>
<title>finaltext</title>
</head>
<body>
	<div class="row">
		<div class="col-md-12">
			<div id="viewpicture" class="img-container" style="height: 250px; width: 100%">
				<img id="imgview">
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<textarea class="form-control" rows="12" id="finaltext" wrap="off"  spellcheck="false" readonly="readonly" 
			style="background-color: #fff;"></textarea>
		</div>
	</div>
	<div class="col-md-12 docs-buttons">
		<table width=100%>
			<tr>
				<td align="left">
					<div class="btn-group">
						<button title="Move" id="move" type="button" class="btn btn-primary" style="display:none"><span class="fa fa-arrows"></span></button>
						<button title="Refresh" id="reset" type="button" class="btn btn-primary">Refresh</button>
						<button title="A+" id="setfontbig" type="button" class="btn btn-primary">A+</button>
						<button title="A-" id="setfontsmall" type="button" class="btn btn-primary">A-</button>											
					</div>	
					<label id="finalchecking" class="right"></label>				
				</td>
			</tr>
		</table>
	</div>	
</body>
<script src="js/common.js"></script>
<script src="bootstrap/crop/js/jquery.min.js"></script>
<script src="bootstrap/crop/js/bootstrap.min.js"></script>
 <script src="bootstrap/crop/js/cropper.js"></script>
 <script>
 var _ukitUtil = new UkitUtil();
 var obj=window.dialogArguments;
 var _fontsize=22;
 document.title=obj.title;
 var imgs=document.getElementById("imgview");
 imgs.src=obj.imgpath;
	$("#finaltext").css("fontSize", _fontsize);
	$("#finaltext").css("font-family", "Open Sans");	
 $('#finalchecking').html(obj.finalchecking);
	$("#move").click(function() {
		$('.img-container > img').cropper("clear");
		$(".img-container > img").cropper("setDragMode","move");
	});
	$("#reset").click(function() {
		$('.img-container > img').cropper("clear");
		$('.img-container > img').cropper("reset");
	});
	document.getElementById('finaltext').value=obj.finaltext;
	document.getElementById('setfontbig').addEventListener('click', function(){
		_fontsize=_ukitUtil.setFontSize('big', 'finaltext', _fontsize);
	});
	document.getElementById('setfontsmall').addEventListener('click', function(){
		_fontsize=_ukitUtil.setFontSize('small', 'finaltext', _fontsize);
	});
	document.getElementById('move').click();
	setInterval(function(){document.getElementById('move').click();}, 100);
 </script>
</html>