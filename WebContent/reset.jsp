<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
 <link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css">
     <link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/dhtmlxgrid.css">
	<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_terrace.css">
	<link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css">
	<link rel="stylesheet" type="text/css" href="dhtmlxGrid/codebase/gridmanual.css">
	<link rel="stylesheet" type="text/css" href="css/modal.css"/>
	<link rel="stylesheet" href="fastselect-master/dist/fastselect.min.css">
	<style type="text/css">
		.csscomment{
	    width: 100%;
    	height: 200px;
    	overflow: auto;
    	font-family: "Open Sans";
    	font-size: 22px;
	}
	
	.fstMultipleMode .fstControls {
	    box-sizing: border-box;
	    padding: 0.5em 0.5em 0em 0.5em;
	    overflow: hidden;
	    min-width: 750px;
	    max-width: 100%;
	    min-height: 35px;
	    height: auto;
	    cursor: text;
	}
    .mark, mark {
   		padding: .2em;
    	background-color: #f1e142;
	}
	.linkue{
		color: blue;
		cursor: pointer;
	}
	</style>
<title>Reset</title>
</head>
<body>
<div id="overlay" style="display: none"><span>Please wait...</span></div>  
<table border="0" width="100%">
  <tr>
    <td width="80%">
		<button type="button" class="btn btn-info" id="resetcontent">Update Content</button>
		<button type="button" class="btn btn-primary" id="exportword">Export Word</button>
		<input type="checkbox" id="excluding" value="0">Excluding comments
		<button type="button" class="btn btn-danger" id="resetunit">Reset Unit</button>
	</td>
    <td colspan="2"><div id="divadmin"></div></td>
  </tr>
  <tr>
    <td colspan="2" valign="top" width="80%">
    	<div id="viewdetail"></div>
    	<div id="gvariant"  style="width:auto; height:auto;background-color:white;"></div>
    	<div id="divfootnote"></div>
    	<div class="fstElement fstMultipleMode">
  			<div id="listreason" class="fstControls" style="display:none"></div>
  		</div>	
  		<div id="reason" style="display: none;"></div>
  		<div id="viewcomment"></div>    	
    </td>
    <td  rowspan="3" valign="top" width="80%">
    	<div id="viewposition" style="width:600px; min-height:200px; max-height:700px; overflow: scroll;"></div>
    </td>
  </tr>
<!--   <tr> -->
<!--     <td colspan="2" height="5%" valign="top"></td> -->
<!--   </tr> -->
<!--   <tr> -->
<!--     <td colspan="2" valign="top" width="70%" height="3%"><div id="divfootnote"></div></td> -->
<!--     <td colspan="2" valign="top" width="30%"></td>     -->
<!--   </tr> -->
<!--   <tr> -->
<!--     <td rowspan="2" width="70%" valign="top"> -->
<!--     	<div class="fstElement fstMultipleMode"> -->
<!--   			<div id="listreason" class="fstControls" style="display:none"></div> -->
<!--   		</div>	 -->
<!--   		<div id="reason" style="display: none;"></div> -->
<!--   		<div id="viewcomment"></div> -->
<!--   	</td> -->
<!--   </tr> -->
</table>	
<div id="displaypopup" style="display:none;"></div>
</body>
    <script src="bootstrap/js/jquery.js"></script>
	<script src="js/common.js"></script>
	<script src="js/epcontroller.js"></script>
	<script src="js/footnote.js"></script>
	<script src="dhtmlxmsg/codebase/message.js"></script> 
	<script  src="dhtmlxGrid/codebase/dhtmlxcommon.js"></script>
	<script  src="dhtmlxGrid/codebase/dhtmlxgrid.js"></script>
	<script  src="dhtmlxGrid/codebase/dhtmlxgridcell.js"></script> 	
    <!-- Bootstrap Core JavaScript -->
    <script src="bootstrap/js/bootstrap.js"></script>
 <script>
 	var param=window.dialogArguments;
 	var _idword=null;
 	_ukitUtil=new UkitUtil();
 	_comment=new comment();
 	var reset=new resetService();
 	document.getElementById('viewdetail').innerHTML=param.detail;
 	document.getElementById('viewposition').innerHTML=param.content;
 	document.getElementById('divadmin').innerHTML=param.displayadmin;
	$('#divfootnote').css('fontSize',19);
	$("#divfootnote").css("font-family", "Open Sans");
 	var baseUrl = "${pageContext.request.contextPath}";
 	var _iduser='${sessionScope.iduser}';
 	var _export=new exportService();
 	document.getElementById('exportword').addEventListener('click',function(){
 		_ukitUtil.loading('overlay');
 		_export.exportWordByUnitFromE2(param.h1toh4.idh1, param.h1toh4.idh2, param.h1toh4.idh3, param.h1toh4.idh4, [param.unit], document.getElementById('excluding').value, function(wordFile){
			if(typeof(wordFile)!='object'){
				window.location.href=wordFile;
			}else
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+wordFile.description);
			_ukitUtil.unloading('overlay');
 		});
 	});
 	document.getElementById('viewdetail').addEventListener('click',function(){ 		
 		reply_click();
 	});
 	document.getElementById('resetunit').addEventListener('click', function(){
		var content=new contentService();
		dhtmlxs.confirm({
			text:"<img src='dhtmlxmsg/codebase/alert_small.png'>Do you want to reset unit?",
			ok:"Yes", cancel:"No", callback:function(result){
				if(result){
					_ukitUtil.loading('overlay');								
					content.resetUnit(param.h1toh4.idh4, param.unit, _iduser, function(success){
						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
						window.close();
						_ukitUtil.unloading('overlay');
					});
					content=null;
					return;
				}
			}
		});
 	});
 	document.getElementById('resetcontent').addEventListener('click', function(){
 		if(_idword!=null){
 			dhtmlxs.confirm({
 				text:"<img src='dhtmlxmsg/codebase/alert_small.png'>Do you want to update the content?",
 				ok:"Yes", cancel:"No", callback:function(result){
 					if(result){
 						_ukitUtil.loading('overlay');
 			 	 		reset.resetContent(_idword, _iduser, function(success){
 			 	 			if(success.value=='true'){
 			 	 				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>Reset Content success.");
 			 	 				reset.refreshData(param.h1toh4.idh4, param.unit, _iduser, function(obj){
 			 						if(obj.value=='check' || obj.value=='admin'){
 			 							var arrDetail=obj.description.split('@');
 			 							var reset=new Object();
 			 							if(obj.value=='admin')
 			 								reset.displayadmin='Please contract admin';
 			 							else
 			 								reset.displayadmin='';	
 			 						 	document.getElementById('viewdetail').innerHTML=arrDetail[0];
 			 						 	document.getElementById('viewposition').innerHTML=arrDetail[1];
 			 						 	document.getElementById('divadmin').innerHTML=reset.displayadmin;
 			 						 	grid.clearAll();
 			 						 	document.getElementById('divfootnote').innerHTML='';
 			 						 	document.getElementById('viewcomment').innerHTML='';
 			 						 	document.getElementById('reason').innerHTML='';
 			 							_ukitUtil.unloading('overlay');
 			 						}else
 			 							window.close();
 			 	 				});
 			 	 			} 			 	 				
 			 	 			else
 			 	 				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
 			 	 		});
 					}
 				}
 			});
 		}else
 			dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>Please select word!!!");
 	});
 	document.getElementById('viewposition').addEventListener('click', function(){
 		viewTablePopup();
 	});
 	function viewTablePopup(e){
 		e = e || window.event;
 		e = e.target || e.srcElement;	
 		if(e.nodeName=='LABEL'){
 			if(e.id!=''){
 				reset.getTableReset(e.id, function(success){
//  					console.log(JSON.stringify(success));
 					var html='<div class="container">';
 					html+='<input type="hidden"  id="getPopup" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false">';
 					html+='<div class="modal fade" id="myModal" role="dialog">';
 					html+='<div class="modal-dialog modal-lg">';
 					html+='<div class="modal-content">';
 					html+='<div class="modal-header">';
// 					html+='<button type="button" class="close" data-dismiss="modal">&times;</button>';
 					html+='<h4 class="modal-title">Variant</h4></div>';
 					html+='<div class="modal-body"><div id="viewtable" style="max-height:400px; overflow:auto;"></div></div>';
 					html+='<div class="modal-footer">';
 					html+='<button type="button" class="btn btn-default" id="close" data-dismiss="modal">Close</button>';
 					html+='</div></div></div></div></div>';
 				    document.getElementById('displaypopup').innerHTML=html;
 				    var table='<table id="tbview" class="table table-bordered"><thead><tr><th onclick="sortTable(0)" style="cursor:pointer">MSS/EDS</th><th onclick="sortTable(1)" style="cursor:pointer">Matching</th><th onclick="sortTable(2)" style="cursor:pointer">Editing</th></tr></thead><tbody>'; 				    
 					if(success.object.difvariant.length>0){	
 						for(var i=0; i<success.object.difvariant.length; i++){
 							table+='<tr><td>{msseds}</td><td>{matching}</td><td>{editing}</td></tr>';
 							table=table.split('{msseds}').join(success.object.difvariant[i].msseds);
 							table=table.split('{matching}').join(success.object.difvariant[i].matching);
 							table=table.split('{editing}').join(success.object.difvariant[i].editing);
 						}
 					}
 					if(success.object.samevariant.length>0){
 						for(var i=success.object.difvariant.length; i<success.object.samevariant.length; i++){
 							table+='<tr><td>{msseds}</td><td>{matching}</td><td>{editing}</td></tr>';
 							table=table.split('{msseds}').join(success.object.samevariant[i].msseds);
 							table=table.split('{matching}').join(success.object.samevariant[i].matching);
 							table=table.split('{editing}').join(success.object.samevariant[i].editing);
 						}
 					}
 					table+='</tbody></table>';
 				    document.getElementById('viewtable').innerHTML=table;
 				    document.getElementById('displaypopup').style.display='';
 				    document.getElementById('getPopup').click();
 				});
 			}
 		}
 	}
 	function searchVariantTable(idword){
 		var col=null; var affterSplit = null; var tmpcol=null; var colId=null;
 		_ukitUtil.loading('overlay');
 		try{
 			$.ajax({
 				url: baseUrl+"/E2",
 				data: "act=searchVariantTable&idword="+idword,
 				dataType: "json",
 				type: "GET",
 				async: true,
 				cache: false,
 				contentType: "application/json",
 				success: function(objVariantTable) {
 					if(objVariantTable.value=='true'){	
 						col = objVariantTable.data[0];
 						affterSplit = col.toString().split(",");
 						tmpcol=''; colId='space';
 						for(var i=0, len=affterSplit.length; i<len; i++){
 							tmpcol=tmpcol+'<div align="center">'+affterSplit[i]+'</div>,';
 							colId=colId+affterSplit[i]+',';
 						}
 						var colalign='right,left,left,left,';
 						for(var i=4, afflen=affterSplit.length; i<afflen; i++){
 							colalign=colalign+'left,';
 						}
 						var coltype='ch,ed,ro,ro,ro,ro,ro,ro,';
 						for(var i=8, splen=affterSplit.length; i<splen; i++){
 							coltype=coltype+'ro,';
 						}
 						grid =_ukitUtil.createDhtmlxGrid('gvariant');
 						grid.setImagePath("dhtmlxGrid/codebase/imgs/");
 						tmpcol=tmpcol.substring(0, tmpcol.length-1).split('Variant').join('Variant&nbsp;&nbsp;<button type="button" title="sort" class="btn btn-xs" id="btnsortvariant"><img src="img/if_arrow-down_383189.png"/></button>');
 						tmpcol=tmpcol.split('MSS').join('MSS&nbsp;&nbsp;<button type="button" title="sort" class="btn btn-xs" id="btnmss"><img src="img/if_arrow-down_383189.png"/></button>');
 						grid.setHeader(tmpcol);
 						grid.setColumnIds(colId.substring(0, colId.length-1));
 						grid.setColAlign(colalign.substring(0, colalign.length-1));
 						grid.setColTypes(coltype.substring(0, coltype.length-1));
						grid.setSkin('modern');
 						grid.enableAutoHeight(true);
 						grid.init();
 						var indexCol=null;
 						if(objVariantTable.data.length>0){
 							var newArray = JSON.stringify(objVariantTable.data);
 							newArray=_ukitUtil.replaceAll('<', '&lt;',newArray);
 							newArray=_ukitUtil.replaceAll('>', '&gt;',newArray);
 							newArray=_ukitUtil.replaceAll('!', '<',newArray);
 							newArray=_ukitUtil.replaceAll('@', '>',newArray);
 							objVariantTable=JSON.parse(newArray);
 						}
 						for(var j=1, vlen=objVariantTable.length; j<vlen; j++){
 							indexCol=j-1;
 							grid.addRow(indexCol,objVariantTable[j], indexCol);
 							grid.setRowTextStyle(indexCol, "font-family: Open Sans; font-size:16px");
 							grid.setCellTextStyle(indexCol,1,"font-family: Open Sans; font-size:19px");
 						}
 						grid.sortRows(7, 'int', 'desc');
 						for(var i=0, alen=affterSplit.length-1; i<alen; i++){
 							grid.adjustColumnSize(i);
 						}
 						
 						for(var i=1, alen=grid.getColumnCount()-1; i<alen; i++){//dynamic adjust column 19122015 disable 6/3/2016
 							grid.setColWidth(i,(grid.getColWidth(i)/8.5)); //10.5
 						}					
 						grid.setColWidth(80, 13);//Comm.
 						if(grid.getColWidth(1)<120){
 							grid.setColWidth(1,8); //9=120
 						}
 							
 						var maxgrid=document.getElementById('gvariant').style.width;
 						for(var i=0; i<grid.getRowsNum()-1; i++){
 							if(grid.getColumnId(7)=='MMS' && grid.getColumnId(8)=='Eds');
 								grid.cells(i,1).setDisabled(true);	
 						}
 							grid.enableAutoWidth(true,maxgrid,maxgrid);
 							grid.setColWidth(0,2);
 							getReasonCommentChoice(_idword, _iduser);
 							_comment.searchComment(_idword, function(oComment){
 								document.getElementById('viewcomment').innerHTML=oComment.description.substring(oComment.description.indexOf('#')+1,oComment.description.length);
 								var dcomment=document.getElementsByName('datecomment');
 								var html=null;
 								for(var i=0; i<oComment.data.length; i++){
 									var cssComment='<div {id} class="csscomment">';
 									cssComment=cssComment.split('{id}').join('id="cssComment'+oComment.data[i].id+'"');								
 									document.getElementById(dcomment[i].id).innerHTML=oComment.data[i].comment_date;		
 									html=document.getElementById('delete'+oComment.data[i].id).outerHTML;
 									html=html.split('(y)').join("<button onclick='confirmdel({id})' style='color:black;'>Yes</button>");
 									html=html.split('(n)').join("<button onclick='canceldel({id})' style='color:black;'>No</button>");
 									html=html.split('{id}').join(oComment.data[i].id);
 									document.getElementById('delete'+oComment.data[i].id).outerHTML=html;
 									document.getElementById('body'+oComment.data[i].id).innerHTML=cssComment+b64_to_utf8(oComment.data[i].comment)+'</div>';
 								}
 							});					
 							var flagsort='asc';
 							document.getElementById('btnsortvariant').addEventListener('click',function(){
 								grid.clearAll();
 								for(var j=1, vlen=objVariantTable.length; j<vlen; j++){
 									indexCol=j-1;
 									grid.addRow(indexCol,objVariantTable[j], indexCol);
 									grid.setRowTextStyle(indexCol, "font-family: Open Sans; font-size:16px");
 									grid.setCellTextStyle(indexCol,1,"font-family: Open Sans; font-size:19px");
 								}
 								grid.sortRows(1, 'str', flagsort);
 								if(flagsort=='asc'){
 									flagsort='desc';
 								}
 								else{
 									flagsort='asc';
 								}								
 									
 								for(var i=0; i<grid.getRowsNum()-1; i++){
 									if(grid.getColumnId(7)=='MMS' && grid.getColumnId(8)=='Eds');
 										grid.cells(i,1).setDisabled(true);	
 								}
 							});
 							document.getElementById('btnmss').addEventListener('click',function(){
 								grid.clearAll();
 								for(var j=1, vlen=objVariantTable.length; j<vlen; j++){
 									indexCol=j-1;
 									grid.addRow(indexCol,objVariantTable[j], indexCol);
 									grid.setRowTextStyle(indexCol, "font-family: Open Sans; font-size:16px");
 									grid.setCellTextStyle(indexCol,1,"font-family: Open Sans; font-size:19px");
 								}
 								grid.sortRows(7, 'int', flagsort);
 								if(flagsort=='asc'){
 									flagsort='desc';
 								}
 								else{
 									flagsort='asc';
 								}								
 								for(var i=0; i<grid.getRowsNum()-1; i++){
 									if(grid.getColumnId(7)=='MMS' && grid.getColumnId(8)=='Eds');
 										grid.cells(i,1).setDisabled(true);	
 								}
 						 		_ukitUtil.unloading('overlay');
 							});
 					}else{dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+objVariantTable.description); grid.addRow(0,[0],0);}
 				}, 
 				error: function(data) {
 					if (data.responseText != null && data.responseText != "") {
 						alert(data.responseText);
 					}
// 					$("#content").unmask();
 				}
 			});
 		}catch(e){
 			alert('searchVariantTable '+e.message);
 		}finally{
 			col=null;
 		}
 	}
 	function reply_click(e) {
 		e = e || window.event;
 		e = e.target || e.srcElement;	
 		if (e.nodeName === 'LABEL' || e.nodeName === 'I' || e.nodeName==='SPAN') {
 			_ukitUtil.loading('overlay');
 			reset.searchFcrid(e.id, _iduser, function(success){
 				if(success.value=='true'){
 	 				_idword=success.description; 	 				
 	 		 		if(_idword!=null){
 	 		 			searchVariantTable(_idword);
 	 		 	 		searchFootnoteByFcrid(_idword, _iduser, 2, function(footnote){	
 	 		 	 			var htmlreplace=new html();
 	 		 	 			htmlreplace.replaceTag(footnote.description, function(tmpPattern){
 	 		 	 				document.getElementById('divfootnote').innerHTML=tmpPattern;
 	 		 	 			});		
// 							setTimeout(function(){
// 								var heightDiv=(document.getElementById('viewdetail').clientHeight+document.getElementById('gvariant').clientHeight)+
//  	 		 	 				(document.getElementById('divfootnote').clientHeight+document.getElementById('viewcomment').clientHeight);
// 								console.log(heightDiv);
// 	 	 		 	 			console.log(document.getElementById('viewdetail').clientHeight);
// 	 	 		 	 			console.log(document.getElementById('gvariant').clientHeight);
// 	 	 		 	 			console.log(document.getElementById('divfootnote').clientHeight);
// 	 	 		 	 			console.log(document.getElementById('viewcomment').clientHeight);
// 	 	 		 	 			document.getElementById('viewposition').style.height=heightDiv+'px;';
// 							}, 100);
 	 		 	 			htmlreplace=null;
 	 		 	 			_ukitUtil.unloading('overlay');
 	 		 	 		});
 	 		 		}else{
 	 		 			_ukitUtil.unloading('overlay');
 	 		 		}
 				}else{
 					_idword=null;
 					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
 				}
 			}); 			
 		}
 	}
 	function resetService(){
 		resetService.prototype.getTableReset=function(fcbaseid,fn){
 			var datas={'fcbaseid':fcbaseid};
 			_ukitUtil.ajax(baseUrl+'/E2', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'getTableReset', function(success){
 				fn(success);
 			});
 		};
 		resetService.prototype.resetContent=function(fcbaseid, iduser, fn){
 			var datas={'fcbaseid':fcbaseid, 'iduser':iduser};
 			_ukitUtil.ajax(baseUrl+'/E2', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'resetBlock', function(success){
 				fn(success);
 			});
 		}; 		
 		resetService.prototype.refreshData=function( h4, unitno, iduser, fn){
 			var datas={'h4':h4, 'unitno':unitno, 'iduser':iduser};
 			_ukitUtil.ajax(baseUrl+'/E2', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'refreshData', function(success){
 				fn(success);
 			});
 		};
 		resetService.prototype.searchFcrid=function(fcrid , iduser, fn){
 			var datas={'fcrid':fcrid, 'iduser':iduser};
 			_ukitUtil.ajax(baseUrl+'/E2', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'searchFcrid', function(success){
 				fn(success);
 			});
 		};
 		
 	}
 	
 	function getReasonCommentChoice(fcrid, iduser){
 		try{
 			 document.getElementById('reason').innerHTML='';
 			$.ajax({
 				url: baseUrl+"/E2",
 				data: 'act=showReasonCommentChoice&fcrid='+fcrid+'&iduser='+iduser,
 				dataType : "json",
 				type : "GET",
 				async : true,
 				cache: false,
 				contentType : "application/text;charset=utf-8",
 				success: function(reasoncomment) {
 					if(reasoncomment.value=='true'){
 						 document.getElementById('reason').innerHTML=reasoncomment.description;
 						 document.getElementById('listreason').innerHTML='';
 						var reason=document.getElementsByName('reasonchoice');
 						document.getElementById('listreason').style.display='none';
 						for(var i=0; i<reason.length; i++){
 							if(reason[i].checked){
 								document.getElementById('listreason').style.display='';
 									var html='<div id="{id}" class="fstChoiceItem">{display}<button id="{bid}" value="{value}" class="fstChoiceRemove" type="button">×</button></div>';
 									html=html.split('{id}').join('r'+parseInt(reason[i].id));
 									html=html.split('{bid}').join('b'+parseInt(reason[i].id));
 									html=html.split('{value}').join(reason[i].value);
 									html=html.split('{display}').join(reason[i].value);
 									document.getElementById('listreason').innerHTML+=html;
 							}
 						}
 					}else
 						document.getElementById('listreason').style.display='none';
 				}, 
 				error: function(data) {
 					if (data.responseText != null && data.responseText != "") {
 						alert(data.responseText);
 					}
 				}
 			});
 		}catch(e){
 			alert('getCommentaryChoice '+e.message);
 		}finally{
 			datas=null; strArray=null;
 		}
 	}
 	
 	function sortTable(n) {
 		  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
 		  table = document.getElementById('tbview');
 		  switching = true;
 		  //Set the sorting direction to ascending:
 		  dir = "asc"; 
 		  /*Make a loop that will continue until
 		  no switching has been done:*/
 		  while (switching) {
 		    //start by saying: no switching is done:
 		    switching = false;
 		    rows = table.getElementsByTagName("TR");
 		    /*Loop through all table rows (except the
 		    first, which contains table headers):*/
 		    for (i = 1; i < (rows.length - 1); i++) {
 		      //start by saying there should be no switching:
 		      shouldSwitch = false;
 		      /*Get the two elements you want to compare,
 		      one from current row and one from the next:*/
 		      x = rows[i].getElementsByTagName("TD")[n];
 		      y = rows[i + 1].getElementsByTagName("TD")[n];
 		      /*check if the two rows should switch place,
 		      based on the direction, asc or desc:*/
 		      if (dir == "asc") {
 		        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
 		          //if so, mark as a switch and break the loop:
 		          shouldSwitch= true;
 		          break;
 		        }
 		      } else if (dir == "desc") {
 		        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
 		          //if so, mark as a switch and break the loop:
 		          shouldSwitch= true;
 		          break;
 		        }
 		      }
 		    }
 		    if (shouldSwitch) {
 		      /*If a switch has been marked, make the switch
 		      and mark that a switch has been done:*/
 		      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
 		      switching = true;
 		      //Each time a switch is done, increase this count by 1:
 		      switchcount ++; 
 		    } else {
 		      /*If no switching has been done AND the direction is "asc",
 		      set the direction to "desc" and run the while loop again.*/
 		      if (switchcount == 0 && dir == "asc") {
 		        dir = "desc";
 		        switching = true;
 		      }
 		    }
 		  }
 		}

 </script>
</html>