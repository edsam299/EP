<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Popup comment</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.easyui.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/uecheckeditor/uechkeditor.css">
   	<link href="css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/uecheckeditor/bootstrap-combined.no-icons.min.css">
    <link rel="stylesheet" type="text/css" href="css/uecheckeditor/bootstrap-responsive.min.css">
    <link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/dhtmlxgrid.css">
	<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_skyblue.css">
	<link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.loadmask.css"/>

    <script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
    <script type="text/javascript" src="dhtmlxmsg/codebase/message.js"></script> 	   
    <script  src="dhtmlxGrid/codebase/dhtmlxcommon.js"></script>
	<script  src="dhtmlxGrid/codebase/dhtmlxgrid.js"></script>
	<script  src="dhtmlxGrid/codebase/dhtmlxgridcell.js"></script> 	    
    <script type="text/javascript" src="js/uechkeditor/bootstrap-wysiwyg.js"></script>
    <script type="text/javascript" src="js/uechkeditor/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/uechkeditor/jquery.hotkeys.js"></script>
    <script type="text/javascript" src="js/uechkeditor/uecheckeditor.js"></script>
    <script type="text/javascript" src="js/common.js"></script> 
    <script type="text/javascript" src="js/popupproofing.js?${sessionScope.key}"></script>
    
    			<div class="container">
    			<div>
    				<table>
    					<tr>
    						<td width="30%"><div id="guser" style="width:350px;height:200px;background-color:white;"></div></td><td width="70%"><div id="reason" style="width:100%; height:200px; overflow: auto"></div></td>
    					</tr>
    					<tr><td><input type="button" id="clear" value="Clear"></td></tr>
    				</table>
    			</div>
					<div class="btn-toolbar" data-role="editor-toolbar" data-target="#editor">
				      <div class="btn-group">
				          <ul class="dropdown-menu">
				          <li><a data-edit="fontName Serif" style="font-family:'Serif'">Serif</a></li><li><a data-edit="fontName Sans" style="font-family:'Sans'">Sans</a></li><li><a data-edit="fontName Arial" style="font-family:'Arial'">Arial</a></li><li><a data-edit="fontName Arial Black" style="font-family:'Arial Black'">Arial Black</a></li><li><a data-edit="fontName Courier" style="font-family:'Courier'">Courier</a></li><li><a data-edit="fontName Courier New" style="font-family:'Courier New'">Courier New</a></li><li><a data-edit="fontName Comic Sans MS" style="font-family:'Comic Sans MS'">Comic Sans MS</a></li><li><a data-edit="fontName Helvetica" style="font-family:'Helvetica'">Helvetica</a></li><li><a data-edit="fontName Impact" style="font-family:'Impact'">Impact</a></li><li><a data-edit="fontName Lucida Grande" style="font-family:'Lucida Grande'">Lucida Grande</a></li><li><a data-edit="fontName Lucida Sans" style="font-family:'Lucida Sans'">Lucida Sans</a></li><li><a data-edit="fontName Tahoma" style="font-family:'Tahoma'">Tahoma</a></li><li><a data-edit="fontName Times" style="font-family:'Times'">Times</a></li><li><a data-edit="fontName Times New Roman" style="font-family:'Times New Roman'">Times New Roman</a></li><li><a data-edit="fontName Verdana" style="font-family:'Verdana'">Verdana</a></li></ul>
				        </div>
				      <div class="btn-group">
				        <a class="btn dropdown-toggle" data-toggle="dropdown" title=""><i class="icon-text-height"></i>&nbsp;<b class="caret"></b></a>
				          <ul class="dropdown-menu">
				          <li><a data-edit="fontSize 7"><font size="7">Huge</font></a></li>
				          <li><a data-edit="fontSize 5"><font size="5">Large</font></a></li>
				          <li><a data-edit="fontSize 3"><font size="3">Normal</font></a></li>
				          <li><a data-edit="fontSize 1"><font size="1">Small</font></a></li>
				          </ul>
				      </div>
				      <div class="btn-group">
				        <a class="btn" data-edit="bold" title=""><i class="icon-bold"></i></a>
				        <a class="btn" data-edit="italic" title=""><i class="icon-italic"></i></a>
				        <a class="btn" data-edit="strikethrough" title=""><i class="icon-strikethrough"></i></a>
				        <a class="btn" data-edit="underline" title=""><i class="icon-underline"></i></a>
				      </div>
				      <div class="btn-group">
				        <a class="btn" data-edit="insertunorderedlist" title=""><i class="icon-list-ul"></i></a>
				        <a class="btn" data-edit="insertorderedlist" title=""><i class="icon-list-ol"></i></a>
				        <a class="btn" data-edit="outdent" title=""><i class="icon-indent-left"></i></a>
				        <a class="btn" data-edit="indent" title=""><i class="icon-indent-right"></i></a>
				      </div>
				      <div class="btn-group">
				        <a class="btn btn-info" data-edit="justifyleft" title=""><i class="icon-align-left"></i></a>
				        <a class="btn" data-edit="justifycenter" title=""><i class="icon-align-center"></i></a>
				        <a class="btn" data-edit="justifyright" title=""><i class="icon-align-right"></i></a>
				        <a class="btn" data-edit="justifyfull" title=""><i class="icon-align-justify"></i></a>
				      </div>
				      
				      <div class="btn-group">
				        <a class="btn" title="" id="pictureBtn"><i class="icon-picture"></i></a>
				        <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" style="opacity: 0; position: absolute; top: 0px; left: 0px; width: 41px; height: 30px;">
				      </div>
				      <div class="btn-group">
				        <a class="btn" data-edit="undo" title=""><i class="icon-undo"></i></a>
				        <a class="btn" data-edit="redo" title=""><i class="icon-repeat"></i></a>
				      </div>				  
				    </div>
				    <div id="editor" contenteditable="true" spellcheck="false"></div>	
				    <table width="100%">
				    	<tr>
				    		<td><div id="create_by"></div></td>
				    		<td><div id="create_date"></div></td>
				    		<td align="right">
							    <div align="right">
							    	<input type="button" id="edit" value="Edit">
							    	<input type="button" id="add" value="Add">
							    	<input type="button" id="del" value="Delete">
							    </div>					    		
				    		</td>
				    	</tr>
				    </table>		    
				 </div>
</head>
<body>
</body>
<script type="text/javascript">
var baseUrl = "${pageContext.request.contextPath}";
var _iduser='${sessionScope.iduser}';
var role='${sessionScope.idrole}';
// loadButton(role, 5);
</script>
</html>