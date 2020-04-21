var _ukitUtil = null;
var _guser = null;
var _popupproof=null;
var _idh=null;
var _unit=null;
var _idword=null;
var _idgroup=null;
var _id=null;
var iduser_=null;
$(document).ready(function(){
	var obj=window.dialogArguments;
	document.title=obj.title;
	_ukitUtil = new UkitUtil();
	_popupproof=new popupproof();
	_guser=_ukitUtil.createDhtmlxGrid('guser');
	_guser.setImagePath("dhtmlxGrid/codebase/imgs/");
	_guser.setHeader("UserName,Date,comment,iduser,idh,unit,idword,idgroup,idcomment,idpage,id");
	_guser.setColumnIds("username,date,comment,iduser,idh,unit,idword,idgroup,idcomment,idpage,id");
//	iduser":1,"idh":1,"unit":0,"idword":23,"idgroup":1266,"idcomment":" 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15 ","idpage":2
	_guser.setInitWidths("150,150,0,0,0,0,0,0,0,0,0");
	_guser.setColAlign("left,left,left,left,left,left,left,left,left,left,left");
	_guser.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
	_guser.setSkin('modern');
	_guser.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif","", "");
	_guser.attachEvent("onRowSelect", doRowSelectComment);
	_guser.init();
	$('#create_by').html('Create By'); 	$('#create_date').html('Date');
	$("#editor").css("font-family", "Arial");
	$("#editor").css("fontSize", 22);
	$("#content").mask("Waiting...");
	_popupproof.renderGrid(obj.comment,function(success){
		if(success){
			if(_guser.getRowsNum()>0){
				$('#editor').html(_guser.cells(_guser.getRowId(0),_guser.getColIndexById("comment")).getValue());
				_idh=_guser.cells(_guser.getRowId(0),_guser.getColIndexById("idh")).getValue();
				_unit=_guser.cells(_guser.getRowId(0),_guser.getColIndexById("unit")).getValue();
				_idword=_guser.cells(_guser.getRowId(0),_guser.getColIndexById("idword")).getValue();
				_idgroup=_guser.cells(_guser.getRowId(0),_guser.getColIndexById("idgroup")).getValue();
				_id=_guser.cells(_guser.getRowId(0),_guser.getColIndexById("id")).getValue();
				iduser_=_guser.cells(_guser.getRowId(0),_guser.getColIndexById("iduser")).getValue();
				$('#create_by').html('Create By: <b>'+_guser.cells(_guser.getRowId(0),_guser.getColIndexById("username")).getValue()+'</b>');
				$('#create_date').html('Date: <b>'+_guser.cells(_guser.getRowId(0),_guser.getColIndexById("date")).getValue()+'</b>');
				_guser.selectRowById(0);
				_popupproof.searchComment(_idh, _iduser, _unit, _idword, _idgroup, _id, function(comment){
					console.log('reason \n'+comment.length);
					$('#reason').html(comment[0]);
				});
			}
		}
		$("#content").unmask();
	});
	
	$('#clear').click(function(){
		$('#editor').html('');
		$('#editor').focus();
	});
	
	$('#del').click(function(){
		if(_iduser!=iduser_){
			_ukitUtil.getMessageById(53, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			 return
		}
		_ukitUtil.getMessageById(52, _messageUI, function(msg){
			dhtmlxs.confirm({
				text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
				ok:"Yes", cancel:"No", callback:function(result){
					if(result){
						$("#content").mask("Waiting...");
						_popupproof.deleteComment(_id, _idh, function(success){
							dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
							if(success.value){
								_guser.deleteSelectedItem();
								clear();
							}
							$("#content").unmask();
						});
						return;
					}
				}
			 });
		});	
	});
});

function doRowSelectComment(rowIndex,colIndex){
	$('#editor').html(_guser.cells(_guser.getRowId(rowIndex),_guser.getColIndexById("comment")).getValue());
	_idh=_guser.cells(_guser.getRowId(rowIndex),_guser.getColIndexById("idh")).getValue();
	_unit=_guser.cells(_guser.getRowId(rowIndex),_guser.getColIndexById("unit")).getValue();
	_idword=_guser.cells(_guser.getRowId(rowIndex),_guser.getColIndexById("idword")).getValue();
	_idgroup=_guser.cells(_guser.getRowId(rowIndex),_guser.getColIndexById("idgroup")).getValue();
	_id=_guser.cells(_guser.getRowId(rowIndex),_guser.getColIndexById("id")).getValue();
	iduser_=_guser.cells(_guser.getRowId(rowIndex),_guser.getColIndexById("iduser")).getValue();
	$('#create_by').html('Create By: <b>'+_guser.cells(_guser.getRowId(rowIndex),_guser.getColIndexById("username")).getValue()+'</b>');
	$('#create_date').html('Date: <b>'+_guser.cells(_guser.getRowId(rowIndex),_guser.getColIndexById("date")).getValue()+'</b>');
}
function popupproof(){
	popupproof.prototype.renderGrid = function(obj,fn){
		//&#44 comma
		if(obj!=null){
			var csvA='';
			for(var i=0, len=obj.length; i<len; i++){
				csvA = csvA + i+','+obj[i].username+','+obj[i].date+','+obj[i].description.replace(',','&#44')
				+','+obj[i].iduser+','+obj[i].idh+','+obj[i].unit+','+obj[i].idword+','+obj[i].idgroup+','
				+obj[i].idcomment+','+obj[i].idpage+','+obj[i].id+'\n'; 
//				csvA = csvA +obj[i].username+','+obj[i].date+','+obj[i].description.replace(',','&#44')+'\n';
			}	
//			console.log(csvA);
			_guser.parse(csvA,'csv');
			csvA=null;
			fn(true);
		}
	};
	
	popupproof.prototype.searchComment = function(idh, iduser, unit, idword, idgroup, id, fn){
		var datas={'idh':idh, 'iduser':iduser, 'unit':unit, 'idword':idword, 'idgroup':idgroup, 'id':id};
		try{
			$.ajax({
				url: baseUrl+"/service/Proof",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"searchComment"
	            },
				success: function(comment) {
					fn(comment);
			}, 
				error: function(data) {
					if (data.responseText != null && data.responseText != "") {
						alert(data.responseText);
					}
				}
			});
		}catch(e){
			alert('searchComment '+e.message);
		}finally{
			datas=null;
		}
	};
	
	popupproof.prototype.deleteComment = function(id, idh, fn){
		var datas={'idh':idh, 'id':id};
		try{
			$.ajax({
				url: baseUrl+"/service/Proof",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"deleteComment"
	            },
				success: function(comment) {
					fn(comment);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('deleteComment '+e.message);
		}finally{
			datas=null;
		}
	};
}

function clear(){
$('#editor').html(''); $('#create_by').html('Create By'); 	$('#create_date').html('Date');
}