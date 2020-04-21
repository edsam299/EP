<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="headerpopup.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- <meta http-equiv="X-UA-Compatible" content="chrome1" /> -->
<title>E2</title>
<head>	

	<link rel="stylesheet" href="ckeditor/lib/toolbarconfigurator/lib/codemirror/neo.css">
	    <!-- Bootstrap Core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="bootstrap/css/simple-sidebar.css" rel="stylesheet">	  
    <link href="css/custom.css" rel="stylesheet">
<%--     <script  src="js/e2.js?${sessionScope.key}"></script> --%>
	<style>
		.highlight{background-color:#4CC552}
		#content,#up_div{width: 100%; height: 100%;}
		#up_div{ position: absolute; z-index:999; display:none; z-index:999; }
		.wordwrap { 
    word-break:break-all;
}	
	body{
		line-height: 21px;
	}
	</style>   
</head>
<body>
<div id="overlay" style="display: none"><span>Please wait...</span></div>  
<div id="modalUI" style="display: none"></div>  
<div style="font-family:Open Sans;background:rgba(230, 228, 229, 0.79);color: #1f1d1d">
	<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true" id="menu-toggle"></span>
	<label id="basetexname"></label>
</div>
    <div id="wrapper">
		<div id="sidebar-wrapper">
			<div style="font-family:Open Sans;background:#f5f5f5;color:#675c5c">
			<b>Choose a Unit</b></div>
				<table align="center">
					<tr>
						<td><button title="previous" id="previous" type="button" class="btn btn-default btn-sm glyphicon glyphicon-backward"></button>	</td>
						<td><div id=unitno><font size="10"></font></div></td>
						<td><button title="next" id="next" type="button" class="btn btn-default btn-sm glyphicon glyphicon-forward"></button>	</td>
					</tr>
				</table>	
			<div id="gunit" style="width:300px;height:400px;background-color:white;"></div>	
			<fieldset>
				<legend class="well-legend"> History</legend>
				<div align="center">
					<table>
						<tr>
							<td><div id="hunit"></div></td>
							<td><div id="hcomment"></div></td>
							<td><div id="hfootnote"></div></td>
							<td><div id="hemendation"></div></td>						
						</tr>
					</table>
				</div>
			</fieldset>	 			
		</div>		
	<div id="page-content-wrapper">	
		<table>
			<tr>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
				<td>
					<div class="row">
						<div class="col-md-9">
							<div id="word" style="overflow: scroll; width:auto; height: 250px;" class="border-line"></div>		
						</div>
						<div class="col-md-3">
							<div class="border-line">
								<div id="gpicture" style="width:auto; height:250px;background-color:white;"></div>
								<div id="geds" style="width:auto;height:250px;background-color:white; display: none;"></div>	
							</div>			
						</div>
					</div>
					<div class="row">
						<div class="col-md-8">
							<div id="saveDiv" class="left"></div>
							<div id="fontBigDiv" class="left"></div>
							<div id="fontSmallDiv" class="left"></div>			
							<div id="addtolistDiv" class="left"></div>	
							<fieldset class="well">
								<legend><input type="checkbox" id="chkgroup" class="left">&nbsp;
									<div id="group" class="left"></div><div id="ungroup" class="left"></div>
								</legend>						
								<div id="lblgroup" style="width: auto;" class="wordwrap"></div>
			<!-- 					<label id="lblgroup" style="width:auto;  display: block;"></label> -->
							</fieldset>			
						</div>
						<div class="col-md-1">
							<input class="form-control" type="text" id="txtsearch">			
						</div>
						<div class="col-md-3">							
							<div id="searchdiv" class="left"></div>		
							<div class="left"><input type="button" class="btn btn-default btn-sm" value="clear" id="clearsearch"></div>
							<div class="left"><input type="button" class="btn btn-default btn-sm" value="Synoptic" id="synoptic"></div>							
							<div id="tools" class="left"></div>
							<div id="unlocktoresearch" class="left"></div>
							<div id="submitunit" class="left"></div>				
						</div>					
<!-- 						<input type="button" value="Test Reset" id="testreset"> -->
					</div>
					<div class="row">
						<div class="col-md-12">
							<div id="gvariant"  style="width:auto; height:auto;background-color:white;"></div>	
						</div>
					</div>		
					<div class="row">
						<div class="col-md-12">
						<fieldset class="well">
			    			<legend class="well-legend"><input type="checkbox" id="viewfootnote">Footnotes in the Printed Edition</legend>
			    			<div id="edit_footnote"></div>
			<!--     			<div id="divfootnote"></div> -->
			    		</fieldset>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<iframe id="comments" src="comment.jsp" width="100%" height="1000px;" frameborder="0" scrolling="no" align="top"></iframe>		
						</div>
					</div>
					<div id="viewdiference" style="display:none">
						<table border="0" width="100%">
							<tr><td colspan="2"><div id="desc"></div></td></tr>
							<tr><td width="50%"><b>ITAP</b></td><td width="50%"><b>Editing</b></td></tr>				
							<tr>
								<td><div id="divitap" class="border-line" style="overflow:scroll; width:100%;height:330px;background-color:white; font-size: 18px; font-family: 'Open Sans';"></div>
								</td><td><div id="divedit" class="border-line" style="overflow:scroll; width:100%;height:330px;background-color:white; font-size: 18px; font-family: 'Open Sans';"></div></td>
							</tr>
							<tr><td><div id="submititap"></div></td><td><div id="submitediting"></div></td></tr>
							<tr><td><div id="changeby"></div></td><td></td></tr>
						</table>			
					</div>	
				</div>		
				</td>
			</tr>
		</table>
	</div></div>
	<div id="displaypopup" style="display:none"></div>
</body>
	<script  src="js/footnote.js?${sessionScope.key}"></script> 
	<script  src="js/history.js?${sessionScope.key}"></script> 
	<script  src="js/groupungroup.js?${sessionScope.key}"></script>  
	<script  src="js/e2_new.js?${sessionScope.key}"></script>
	<script src="ckeditor/lib/js/ckeditor.js"></script>
	<script src="ckeditor/lib/js/sample.js"></script>
    <script src="bootstrap/js/jquery.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
     <script type="text/javascript" src="js/jquery.highlight-4.closure.js"></script> 
<script type="text/javascript">
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
	var _iduser='${sessionScope.iduser}';
	var roleId='${sessionScope.idrole}';
	loadButton(roleId, 2);
	document.getElementById('menu-toggle').click();
	
// 	document.getElementById('testreset').addEventListener('click', function(){
// 		var objReset=new Object();
// 		objReset.h1=_objH4.idh1;
// 		objReset.h2=_objH4.idh2;
// 		objReset.h3=_objH4.idh3;
// 		objReset.h4=_objH4.idh4;
// 		objReset.unit=[document.getElementById('unitno').innerText];
// 		_ukitUtil.closePopup('windowsname2');
// 		_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'reset.jsp',objReset,'windowsname2'); 
// 	});
</script>
</html>
