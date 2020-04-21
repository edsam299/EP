<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Comment</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.easyui.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/uecheckeditor/uechkeditor.css">
   <link href="css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/uecheckeditor/bootstrap-combined.no-icons.min.css">
    <link rel="stylesheet" type="text/css" href="css/uecheckeditor/bootstrap-responsive.min.css">
    <script type="text/javascript" src="js/uechkeditor/bootstrap-wysiwyg.js"></script>
    <script type="text/javascript" src="js/uechkeditor/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/uechkeditor/jquery.hotkeys.js"></script>
    <script type="text/javascript" src="js/uechkeditor/uecheckeditor.js"></script>
    
    			<div class="container">
							<div class="btn-toolbar" data-role="editor-toolbar" data-target="#editor">
				      <div class="btn-group">
				          <ul class="dropdown-menu">
				          <li><a data-edit="fontName Serif" style="font-family:'Serif'">Serif</a></li><li><a data-edit="fontName Sans" style="font-family:'Sans'">Sans</a></li><li><a data-edit="fontName Arial" style="font-family:'Arial'">Arial</a></li><li><a data-edit="fontName Arial Black" style="font-family:'Arial Black'">Arial Black</a></li><li><a data-edit="fontName Courier" style="font-family:'Courier'">Courier</a></li><li><a data-edit="fontName Courier New" style="font-family:'Courier New'">Courier New</a></li><li><a data-edit="fontName Comic Sans MS" style="font-family:'Comic Sans MS'">Comic Sans MS</a></li><li><a data-edit="fontName Helvetica" style="font-family:'Helvetica'">Helvetica</a></li><li><a data-edit="fontName Impact" style="font-family:'Impact'">Impact</a></li><li><a data-edit="fontName Lucida Grande" style="font-family:'Lucida Grande'">Lucida Grande</a></li><li><a data-edit="fontName Lucida Sans" style="font-family:'Lucida Sans'">Lucida Sans</a></li><li><a data-edit="fontName Tahoma" style="font-family:'Tahoma'">Tahoma</a></li><li><a data-edit="fontName Times" style="font-family:'Times'">Times</a></li><li><a data-edit="fontName Times New Roman" style="font-family:'Times New Roman'">Times New Roman</a></li><li><a data-edit="fontName Verdana" style="font-family:'Verdana'">Verdana</a></li></ul>
				        </div>
				      <div class="btn-group">
				        <a class="btn" data-edit="bold" title=""><i class="icon-bold"></i></a>
				        <a class="btn" data-edit="italic" title=""><i class="icon-italic"></i></a>
				        <a class="btn" data-edit="strikethrough" title=""><i class="icon-strikethrough"></i></a>
				        <a class="btn" data-edit="underline" title=""><i class="icon-underline"></i></a>
				      </div>			      
				      <div class="btn-group">
				        <a class="btn" title="" id="pictureBtn"><i class="icon-picture"></i></a>
				        <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" style="opacity: 0; position: absolute; top: 0px; left: 0px; width: 41px; height: 30px;">
				      </div>
				      <div class="btn-group">
				        <a class="btn" data-edit="undo" title=""><i class="icon-undo"></i></a>
				        <a class="btn" data-edit="redo" title=""><i class="icon-repeat"></i></a>
<!-- 				        <a class="btn" data-edit="foreColor #ff0000" style="background-color:red" title=""><i class=""></i>.</a> -->
				        <input class="fixbutton" type="button" style="width:30px; background-color:#DF0101" data-edit="foreColor #DF0101">
				        <input class="fixbutton" type="button" style="width:30px; background-color:#088A4B" data-edit="foreColor #088A4B">
				        <input class="fixbutton" type="button" style="width:30px; background-color:#FFFF00" data-edit="foreColor #FFFF00">
				        <input class="fixbutton" type="button" style="width:30px; background-color:#0080FF" data-edit="foreColor #0080FF">
				        <input class="fixbutton" type="button" style="width:30px; background-color:#190707" data-edit="foreColor #190707">
				      </div>				  
				    </div>
				    <div id="editor" contenteditable="true" spellcheck="false"></div>				    
				 </div>	
</head>
<body>

</body>
<script type="text/javascript">
	$(document).ready(function(){
		$("#editor").css("font-family", "Open Sans");
		$("#editor").css("fontSize", 22);
	});
</script>
</html>