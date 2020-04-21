//var _ukitUtil=null;
var _idh1=null;
var _idh2=null;
var _idh3=null;
var _idh4=null;
var _gunit=null;
var _gline=null;
var _idh=null;
//var _fcedition=null;
var _idcurent=null;
var _isSelectUnit=null;
var _path=null;
var _synoptic_e2=null;
var _detail=window.dialogArguments;
$(document).ready(function(){	
	console.log(_detail);
	getPicturePath(function(path){
		_path=path;
	});
	_synoptic_e2=new synoptic_e2();
	$('#previous').html('<<');
	$("#previous").css("fontSize", 24);
	$('#next').html('>>');
	$("#next").css("fontSize", 24);
	$('#h1toh4').css("font-family", "Open Sans");	
	$('#h1toh4').css("fontSize", 20);
	$('#divunit').css("font-family", "Open Sans");	
	$('#divunit').css("fontSize", 20);	
	$('#divunit').html('UNIT:');
	$('#lineno').css("font-family", "Open Sans");	
	$("#lineno").css("fontSize", 20);
	$('#lineno').css("font-weight", "bold");
	$('#display_synoptic').css("font-family", "Open Sans");	
	$('#display_synoptic').css("fontSize", 20);	
	document.getElementById('h1toh4').innerHTML=_detail.header;
	document.getElementById('divunit').innerHTML='UNIT: <b>'+_detail.unit+'</b>';
	searchLineGridBean(_detail.unit, _detail.fcedition ,function(objLine){
		if(objLine.value=='true'){
			_gline.enableAutoWidth(true);
			for(var i=0, len=objLine.data.length; i<len; i++){
				_gline.addRow(i, [objLine.data[i].lineno,objLine.data[i].content], i);
				_gline.adjustColumnSize(0); 
				_gline.adjustColumnSize(1);
//				_idh=_gunit.cells(_gunit.getRowId(id),_gunit.getColIndexById("idh")).getValue();
				
			}
		}
		for(var i=0; i<_gline.getRowsNum(); i++){
			if(_gline.cells(_gline.getRowId(i),_gline.getColIndexById("lineno")).getValue()==_detail.line){
				_gline.selectRowById(i);
				viewTable(i);
			}
		}
		
	});
	_isSelectUnit=false;
//	_ukitUtil = new UkitUtil();
	
	_gline=_ukitUtil.createDhtmlxGrid('gdesc');
	_gline.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gline.setHeader("<div align='center'>Line</div>,<div align='center'>Content</div>");
	_gline.setColumnIds("lineno,content");
	_gline.setInitWidths("70,440");
	_gline.setColAlign("left,left");
	_gline.setColTypes("ro,ro");
	_gline.setSkin('modern');
//	_gline.enableAutoWidth(true, 510, 250);
	_gline.attachEvent("onRowSelect",function(id,ind){	
		var line=_gline.cells(_gline.getRowId(id),_gline.getColIndexById("lineno")).getValue();				
//		$('#display_synoptic').html(_gline.cells(_gline.getRowId(id),_gline.getColIndexById("content")).getValue());			
		_idcurent=id;
		if(_idcurent!=_gline.getRowsNum()-1){
			var toline=_gline.cells(_gline.getRowId((id+1)),_gline.getColIndexById("lineno")).getValue();
			$('#display_synoptic').html(_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("content")).getValue()+' '+
					_gline.cells(_gline.getRowId((_idcurent+1)),_gline.getColIndexById("content")).getValue());
			$('#lineno').html(line+'-'+toline);
			searchSynopticLabel(_detail.unit,line,_detail.idh,_detail.fcedition, toline);
		}else{
			$('#display_synoptic').html(_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("content")).getValue());
			$('#lineno').html(line+'-'+(parseInt(line)+1));
			searchSynopticLabel(_detail.unit,line,_detail.idh,_detail.fcedition,line);
		}		
	});
	_gline.init();
	
	$('#view').click(function(){
		reply_click();
	});
	
	$('#next').click(function(){
		nextLine();
	});
	$('#previous').click(function(){
		previousLine();
	});
});
function viewTable(id){
	var line=_gline.cells(_gline.getRowId(id),_gline.getColIndexById("lineno")).getValue();							
	_idcurent=id;
	if(_idcurent!=_gline.getRowsNum()-1){
		var toline=_gline.cells(_gline.getRowId((id+1)),_gline.getColIndexById("lineno")).getValue();
		$('#display_synoptic').html(_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("content")).getValue()+' '+
				_gline.cells(_gline.getRowId((_idcurent+1)),_gline.getColIndexById("content")).getValue());
		$('#lineno').html(line+'-'+toline);
		searchSynopticLabel(_detail.unit,line,_detail.idh,_detail.fcedition, toline);
	}else{
		$('#display_synoptic').html(_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("content")).getValue());
		$('#lineno').html(line);
		searchSynopticLabel(_detail.unit,line,_detail.idh,_detail.fcedition,line);
	}	
}
//function tonclick(){
//	
//}
//
//function getTree(){
//	var strXml=null;
//	try{
//		$.ajax({
//            url: baseUrl+"/Tool",
//            data: "act=setXMLTreeH1toH4",
//            dataType: "json",
//            type: "GET",
//            async: false,
//            cache: false,
//            contentType: "application/json",
//            success: function(objBean) {
//            	if(objBean!=null){
//            		if(objBean.value=true)
//            			strXml = objBean.description;            			
//            	}else{
//            		 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+objBean.description);
//            	}
//            }, 
//            error: function(data) {
//                if (data.responseText != null && data.responseText != "") {
//                    alert(data.responseText);
//                }
//            }
//		});
//		return strXml;
//	}catch(e){
//		alert('getTree '+e.message);
//	}finally{
//		strXml=null;
//	}
//}

function searchAllUnitByH4(h1,h2,h3,h4,callback){
	try{
		$.ajax({
            url: baseUrl+"/Tool",
            data: "act=searchAllUnitByH4&h1="+h1+'&h2='+h2+'&h3='+h3+'&h4='+h4,
            dataType: "json",
            type: "GET",
            async: true,
            contentType: "application/json",
            cache: false,
            success: function(objUnit) {
            	setTimeout(function() { callback(objUnit); }, 1);
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);                   
                }
            }
		});
	}catch(e){
		alert('searchAllUnitByH4 '+e.message);
	}finally{
		strXml=null;
	}
}

function searchLineGridBean(unitno,fcedition,callback){
	try{
		$.ajax({
            url: baseUrl+"/Tool",
            data: "act=searchLineGridBean&unitno="+unitno+'&fcedition='+fcedition,
            dataType: "json",
            type: "GET",
            async: false,
            cache: false,
            contentType: "application/json",
            success: function(obj) {
            	setTimeout(function() { callback(obj); }, 1);
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
	}catch(e){
		alert('searchLineGridBean '+e.message);
	}finally{
		strXml=null;
	}
}

function searchSynopticLabel(unitno,lineno,idh, fcedition, endline){
	try{
		$("#content").mask("Waiting...");
//		$('#view').html('');
		$.ajax({
            url: baseUrl+"/Tool",
            data: "act=searchSynopticLabel&unitno="+unitno+"&lineno="+lineno+"&idh="+idh+"&fcedition="+fcedition+"&endline="+endline+"&r="+Math.random(),
            dataType: "json",
            type: "GET",
            async: true,
            cache: false,
            contentType: "application/json",
            success: function(obj) {
            	obj.description=_ukitUtil.replaceAll('<<', '&lt;&lt;', obj.description);
            	obj.description=_ukitUtil.replaceAll('>>', '&gt;&gt;',obj.description);
            	$('#view').html(obj.description);
            	$("#content").unmask();
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
	}catch(e){
		alert('searchSynopticLabel '+e.message);
	}finally{
		strXml=null;
	}
}
function getPicturePath(fn){
	try{
		$.ajax({
            url: baseUrl+"/Tool",
            data: "act=getPicturePath&r="+Math.random(),
            dataType: "json",
            type: "GET",
            async: true,
            cache: false,
            contentType: "application/json",
            success: function(path) {
            	fn(path);
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
	}catch(e){
		alert('getPicturePath '+e.message);
	}finally{
		strXml=null;
	}
}

function reply_click(e) {
	e = e || window.event;
	e = e.target || e.srcElement;	
	if (e.nodeName === 'LABEL') {
		var arr=e.id.split('|');
		var type=null; var picture=null; var fcrid=null;
		for(var i=0, len=arr.length; i<len; i++){
			if(i==0)
				type=arr[i];
			if(i==1)
				fcrid=arr[i];
			if(i==2)
				picture=arr[i];
		}
//		mss|DN02000140002508|SR_08_01_002_02_01_002.jpg|4|6.00|Tejo Bhasa"" +
//				"Line: 4 Word no: 1      Final Checked: Sermsuk Vijarnsathait    on 17/07/2014  16:49
		var finalchecking='Line: <b>'+arr[3]+'</b> Word no: <b>'+arr[4]+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Final Checked: '+arr[5]+' on '+arr[6];
//		'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+geds.cells(geds.getRowId(rowId),geds.getColIndexById("name")).getValue()+
//		'&nbsp;&nbsp;&nbsp;&nbsp;'+geds.cells(geds.getRowId(rowId),geds.getColIndexById("date")).getValue()+
//		'&nbsp;&nbsp;'+geds.cells(geds.getRowId(rowId),geds.getColIndexById("time")).getValue()+'</b>';
		_synoptic_e2.searchFinaltext(picture, function(success){
			if(success.value=='true'){
				if(type=='mss'){
					_ukitUtil.getImage(_path+'/'+picture.substring(0,15)+'/'+picture, finalchecking,
							picture.substring(0,15)+'/'+picture,'viewinfo.jsp',(screen.width),(screen.height),success.description);
				}else{
					_ukitUtil.getImage(_path+'/'+picture.substring(0,5)+'/'+picture, finalchecking,
							picture.substring(0,9)+'/'+picture,'vieweds.jsp',(screen.width),(screen.height),success.description);
				}
			}else{
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
			}
		});
	}
}

function nextLine(){
	try{
		if(_idcurent!=null){
			if(_idcurent<_gline.getRowsNum()-1){
				_idcurent++;
				var line=_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("lineno")).getValue();				
				_gline.selectRowById(_idcurent);
				if(_idcurent!=_gline.getRowsNum()-1){
					var toline=_gline.cells(_gline.getRowId((_idcurent+1)),_gline.getColIndexById("lineno")).getValue();
					$('#lineno').html(line+'-'+toline);
					$('#display_synoptic').html(_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("content")).getValue()+' '+
							_gline.cells(_gline.getRowId((_idcurent+1)),_gline.getColIndexById("content")).getValue());
					searchSynopticLabel(_detail.unit,line,_detail.idh,_detail.fcedition,toline);
				}else{
					$('#lineno').html(line);
					$('#display_synoptic').html(_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("content")).getValue());
					searchSynopticLabel(_detail.unit,line,_detail.idh,_detail.fcedition,line);
				}
				
			}
		}else{
			if(_isSelectUnit){
				_idcurent=0;
				_gline.selectRowById(_idcurent);
				var line=_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("lineno")).getValue();
				var toline=_gline.cells(_gline.getRowId((_idcurent+1)),_gline.getColIndexById("lineno")).getValue();
				$('#lineno').html(line+'-'+(parseInt(line)+1));
//				$('#display_synoptic').html(_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("content")).getValue());
				$('#display_synoptic').html(_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("content")).getValue()+' '+
						_gline.cells(_gline.getRowId((_idcurent+1)),_gline.getColIndexById("content")).getValue());
				searchSynopticLabel(_detail.unit, line,_detail.idh,_detail.fcedition,toline);
			}else{
				_ukitUtil.getMessageById(56, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
			}
		}
	}catch(e){
		alert('nextLine '+e.message);
	}
}

function previousLine(){
	try{
		if(_idcurent>0){
			_idcurent--;
			_gline.selectRowById(_idcurent);
			var line=_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("lineno")).getValue();
			var toline=_gline.cells(_gline.getRowId((_idcurent+1)),_gline.getColIndexById("lineno")).getValue();
			if(_idcurent!=0)
				$('#lineno').html(line+'-'+toline);
			else
				$('#lineno').html(line+'-'+toline);
//			$('#lineno').html(_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("lineno")).getValue());
			$('#display_synoptic').html(_gline.cells(_gline.getRowId(_idcurent),_gline.getColIndexById("content")).getValue()+' '+
					_gline.cells(_gline.getRowId((_idcurent+1)),_gline.getColIndexById("content")).getValue());
			searchSynopticLabel(_detail.unit,line,_detail.idh,_detail.fcedition, toline);
		}
	}catch(e){
		alert('previouseLine '+e.message);
	}
}
function synoptic_e2(){
	synoptic_e2.prototype.searchFinaltext=function(picturename, fn){
		var datas={'picturename':picturename};
		_ukitUtil.ajax(baseUrl+'/Tool', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'searchFinaltext', function(success){
			fn(success);
		});
	};
}