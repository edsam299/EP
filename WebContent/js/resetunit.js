var _dataReset=null;
var _fcbaseid=null;
var _h1toh4andunit=null;
$(document).ready(function(){
	_dataReset=window.dialogArguments;
	_h1toh4andunit=_dataReset.h1toh4+'&nbsp;&nbsp;'+_dataReset.unit;
	_dataReset=_dataReset.data;	
	$('#h1toh4andunit').html(_h1toh4andunit);
	grid=_ukitUtil.createDhtmlxGrid('basetextcontent');
	grid.setImagePath("dhtmlxGrid/codebase/imgs/");
	grid.setHeader("<div align='center'>MSS/EDS</div>,<div align='center'>Matching</div>,<div align='center'>Editing</div>,idh3,id");
	grid.setColumnIds("unit,title,line,idh3,id");
	grid.setInitWidths("100,200,200,0,0");
	grid.setColAlign("left,left,left,left,left");
	grid.setColTypes("ro,ro,ro,ro,ro");
	grid.setSkin('modern');
 	grid.setStyle("font: 14px Open Sans,Helvetica, Arial, sans-serif;padding:4px", "font: 14px Open Sans,Helvetica, Arial, sans-serif; padding:4px", "", "");
//grid.setStyle("", "", "", "background-color:#c6f39d;color:#FFFFFF");
	grid.init();
	$("#basetext").css("fontSize", 22);
	$("#basetext").css("font-family", "Open Sans");	
	$('#basetext').html(_dataReset[0]);
	
	$('#basetext').click(function(){
		reply_click();
	});
	
	$('#update').click(function(){
		$("#content").mask("Waiting...");
		var resetBlock=new resetService();
		resetBlock.resetBlock(_fcbaseid, _iduser, _dataReset[1], _dataReset[2], function(success){
			dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
			if(success.value=='true'){
				console.log('before '+JSON.stringify(_dataReset[1]));
				_dataReset[1]=_ukitUtil.replaceAll(_fcbaseid, "", _dataReset[1]);
				$("#"+_fcbaseid).css("color", "black");
				console.log('after '+JSON.stringify(_dataReset[1]));
			}
			
			$("#content").unmask();
		});
		resetBlock=null;
	});
	$('#updateall').click(function(){
		dhtmlxs.confirm({
			text:"<img src='dhtmlxmsg/codebase/alert_small.png'>Are you sure?<br>This will update all the orange words. The footnotes on those words will be reset.",
			ok:"Yes", cancel:"No", callback:function(result){
				if(result){
					var resetBlock=new resetService();
//					console.log(JSON.stringify(_dataReset[2]));
					resetBlock.resetAllBlock(_fcbaseid, _iduser, _dataReset[1], _dataReset[2], function(success){
						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description,function(pass){
							if(success.value=='true')
								_ukitUtil.closePopup('windowsname2');
						});

					});
					resetBlock=null;
				}
			}
		 });
	});
});

function reply_click(e) {
	e = e || window.event;
	e = e.target || e.srcElement;
	grid.clearAll();
	if (e.nodeName === 'LABEL' || e.nodeName === 'I') {
		_fcbaseid=e.id;
		var content=new contentService();
		content.getTable(e.id, function(success){
			if(success.value=='true'){
				$('#emendation').html(success.object.emendation);
				$('#newvariant').html(success.object.newpattern);
				$('#footnote').html(success.object.footnote);
				$('#variant').html(success.object.nowpattern);
				$('#contentbasetext').html('<b>'+$('#'+e.id).text()+'</b>');				
				if(success.object.difvariant.length>0){	
					for(var i=0; i<success.object.difvariant.length; i++){
						grid.addRow(i,[success.object.difvariant[i].msseds, success.object.difvariant[i].matching, success.object.difvariant[i].editing],i);
					}
				}
				if(success.object.samevariant.length>0){
					for(var i=success.object.difvariant.length; i<success.object.samevariant.length; i++){
						grid.addRow(i,[success.object.samevariant[i].msseds, success.object.samevariant[i].matching, success.object.samevariant[i].editing],i);
					}
				}
			}
		});
	}
}

function resetService(){
	var ukit=new UkitUtil();
	resetService.prototype.resetBlock= function(fcbaseid, iduser, all, fcedition, fn){
		var datas={'fcbaseid':fcbaseid,'iduser':iduser,'all':all,'fcedition':fcedition};
		ukit.ajax(baseUrl+'/E2', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'resetBlock', function(success){
			fn(success);
		});
		ukit=null;
	};
	resetService.prototype.resetAllBlock= function(fcbaseid, iduser, all, fcedition, fn){		
		var datas={'fcbaseid':fcbaseid,'iduser':iduser,'all':all,'fcedition':fcedition};
		ukit.ajax(baseUrl+'/E2', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'resetAllBlock', function(success){
			fn(success);
		});
		ukit=null;
	};
}