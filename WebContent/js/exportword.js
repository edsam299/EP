var gseries=null;
var gbasetext=null;
var gsutta=null;
var gsection=null;
var gunit=null;
var _idseries=null;
var _idbasetext=null;
var _idsutta=null;
var _idsection=null;
var _exportService=null;
var _excluding=0;
$(document).ready(function(){
	if(typeof(window.dialogArguments)=='undefined')
		return;
	$('#divsutta').html('<input type="button" value="Export by Sutta" id="exportsutta">');
	$('#divunit').html('<input type="button" value="Export by Unit" id="exportunit">');
	_exportService=new exportService();
	gseries=_ukitUtil.createDhtmlxGrid('gseries');
	gseries.setImagePath("dhtmlxGrid/codebase/imgs/");
	gseries.setHeader("Series,idh");
	gseries.setColumnIds("series,idh");
	gseries.setInitWidths(",0");
	gseries.setColAlign("left,left");
	gseries.setColTypes("ro,ro");
	gseries.setSkin('modern');
	gseries.enableMultiline(false);
	gseries.enableAutoWidth(true);
	gseries.setStyle("font: 17px Arial, Cordia New, sans-serif", "font: 17px Arial, Cordia New, sans-serif","", "");
	gseries.setColSorting("na");
	gseries.attachEvent("onRowSelect", doBasetext);
	gseries.init();
	_exportService.getTableH1ToH4(1, 0, function(success){
		if(success.value=='true'){
			for(var i=0; i<success.data.length; i++){
				gseries.addRow(i,[success.data[i].content,success.data[i].idh],i);
				gseries.setRowColor(i,"white");
			}
		}
	});
	
	gbasetext=_ukitUtil.createDhtmlxGrid('gbasetext');
	gbasetext.setImagePath("dhtmlxGrid/codebase/imgs/");
	gbasetext.setHeader("Basetext,idh");
	gbasetext.setColumnIds("basetext,idh");
	gbasetext.setInitWidths(",0");
	gbasetext.setColAlign("left,left");
	gbasetext.setColTypes("ro,ro");
	gbasetext.setSkin('modern');
	gbasetext.enableMultiline(false);
	gbasetext.enableAutoWidth(true);
	gbasetext.setStyle("font: 17px Arial, Cordia New, sans-serif", "font: 17px Arial, Cordia New, sans-serif","", "");
	gbasetext.attachEvent("onRowSelect", doSutta);
	gbasetext.init();
	
	gsutta=_ukitUtil.createDhtmlxGrid('gsutta');
	gsutta.setImagePath("dhtmlxGrid/codebase/imgs/");
	gsutta.setHeader("<input type='checkbox' id='chkallsutta'>,Sutta,idh");
	gsutta.setColumnIds("chk,unit,idh");
	gsutta.setColAlign("left,left,left");
	gsutta.setInitWidths("40,,0");
	gsutta.setColTypes("ch,ro,ro");
	gsutta.setSkin('modern');
	gsutta.enableMultiline(false);
	gsutta.enableAutoWidth(true);
	gsutta.setStyle("font: 17px Arial, Cordia New, sans-serif", "font: 17px Arial, Cordia New, sans-serif","", "");
	gsutta.attachEvent("onRowSelect", doSection);
	gsutta.init();
	
	gsection=_ukitUtil.createDhtmlxGrid('gsection');
	gsection.setImagePath("dhtmlxGrid/codebase/imgs/");
	gsection.setHeader("Section,idh");
	gsection.setColumnIds("section,idh");
	gsection.setColAlign("left,left");
	gsection.setColTypes("ro,ro");
	gsection.setInitWidths(",0");
	gsection.setSkin('modern');
	gsection.enableMultiline(false);
	gsection.enableAutoWidth(true);
	gsection.setStyle("font: 17px Arial, Cordia New, sans-serif", "font: 17px Arial, Cordia New, sans-serif","", "");
	gsection.attachEvent("onRowSelect", doUnit);
	gsection.init();
	
	gunit=_ukitUtil.createDhtmlxGrid('gunit');
	gunit.setImagePath("dhtmlxGrid/codebase/imgs/");
	gunit.setHeader("<input type='checkbox' id='chkallunit'>,Unitno,Description");
	gunit.setColumnIds("chk,unit,description");
	gunit.setColAlign("left,left,left");
	gunit.setInitWidths("40,60,500");
	gunit.setColTypes("ch,ro,ro");
	gunit.setSkin('modern');
	gunit.enableMultiline(false);
//	gunit.enableAutoWidth(true);
	gunit.setStyle("font: 17px Arial, Cordia New, sans-serif", "font: 17px Arial, Cordia New, sans-serif","", "");
	gunit.init();
	
	$('#chkallsutta').click(function(){
		if($('#chkallsutta').is(':checked'))
			gsutta.checkAll(true);
		else
			gsutta.checkAll(false);
	});
	$('#chkallunit').click(function(){
		if($('#chkallunit').is(':checked'))
			gunit.checkAll(true);
		else
			gunit.checkAll(false);
	});
	$('#exportsutta').click(function(){
		var arr=new Array();
		var selectedId=gsutta.getCheckedRows(0);
		selectedId=selectedId.split(',');
		if(selectedId[0]!=''){
			for(var i=0; i<selectedId.length; i++){
				arr.push(gsutta.cells(gsutta.getRowId(selectedId[i]),gsutta.getColIndexById("idh")).getValue());
			}
			$("#content").mask("Waiting...");
			_exportService.exportWordBySutta(_idseries, _idbasetext, arr, _excluding, function(excelFile){
				if(typeof(excelFile)!='object'){
					window.location.href=excelFile;
				}else
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+excelFile.description);
				$("#content").unmask();
			});
		}
	});
	$('#exportunit').click(function(){
		var arrunit=new Array();
		var selectedId=gunit.getCheckedRows(0);
		selectedId=selectedId.split(',');
		if(selectedId[0]!=''){
			for(var i=0; i<selectedId.length; i++){
				arrunit.push(gunit.cells(gunit.getRowId(selectedId[i]),gunit.getColIndexById("unit")).getValue());
			}
			$("#content").mask("Waiting...");
			_exportService.exportWordByUnit(_idseries, _idbasetext, _idsutta, _idsection, arrunit, _excluding, function(excelFile){
				if(typeof(excelFile)!='object'){
					window.location.href=excelFile;
				}else
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+excelFile.description);
				$("#content").unmask();
			});
		}
	});
	$("#excluding").click(function () {
		if(this.checked)
			_excluding=1;
		else
			_excluding=0;
	});
});
function doBasetext(rowId,cellIndex){
	try{
		gbasetext.clearAll();
		gsutta.clearAll();
		gsection.clearAll();
		gunit.clearAll();
		$('#chkallsutta').prop('checked', false);
		$('#chkallunit').prop('checked', false);
		_idseries=gseries.cells(gseries.getRowId(rowId),gseries.getColIndexById("idh")).getValue();
		_exportService.getTableH1ToH4(2, _idseries, function(success){
			if(success.value=='true'){
				for(var i=0; i<success.data.length; i++){
					gbasetext.addRow(i,[success.data[i].content,success.data[i].idh],i);
				}
			}
		});
	}catch(e){
		alert('doSeries '+e.message);
	}
}
function doSutta(rowId,cellIndex){
	try{
		$('#chkallsutta').prop('checked', false);	
		gsutta.clearAll();
		gsection.clearAll();
		gunit.clearAll();
		_idbasetext=gbasetext.cells(gbasetext.getRowId(rowId),gbasetext.getColIndexById("idh")).getValue();
		_exportService.getTableH1ToH4(3, _idbasetext, function(success){
			if(success.value=='true'){
				for(var i=0; i<success.data.length; i++){
					gsutta.addRow(i,[0,success.data[i].content, success.data[i].idh],i);
				}
			}
		});
	}catch(e){
		alert('doSutta '+e.message);
	}
}
function doSection(rowId,cellIndex){
	try{
		gsection.clearAll();
		gunit.clearAll();
		$('#chkallunit').prop('checked', false);
		_idsutta=gsutta.cells(gsutta.getRowId(rowId),gsutta.getColIndexById("idh")).getValue();
		_exportService.getTableH1ToH4(4, _idsutta, function(success){
			if(success.value=='true'){
				for(var i=0; i<success.data.length; i++){
					gsection.addRow(i,[success.data[i].content,success.data[i].idh],i);
				}
			}
		});
	}catch(e){
		alert('gsutta '+e.message);
	}
}
function doUnit(rowId,cellIndex){
	try{
		gunit.clearAll();
		$('#chkallunit').prop('checked', false);
		_idsection=gsection.cells(gsection.getRowId(rowId),gsection.getColIndexById("idh")).getValue();		
		_exportService.getUnit(_idseries, _idbasetext, _idsutta, _idsection, function(success){
			if(success.value=='true'){
				for(var i=0; i<success.data.length; i++){
					gunit.addRow(i,[0,success.data[i].idh, success.data[i].content],i);
				}
			}
		});
	}catch(e){
		alert('gsutta '+e.message);
	}
}
//function exportService(){
//	exportService.prototype.getTableH1ToH4= function(level, id, fn){
//		var datas={'level':level,'id':id};
//		_ukitUtil.ajax(baseUrl+'/service/Export', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'getTableH1ToH4', function(success){
//			fn(success);
//		});
//	};
//	exportService.prototype.getUnit= function(idseries, idbasetext, idsutta, idsection, fn){
//		var datas={'idseries':idseries,'idbasetext':idbasetext, 'idsection':idsection, 'idsutta':idsutta};
//		_ukitUtil.ajax(baseUrl+'/service/Export', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'getUnit', function(success){
//			fn(success);
//		});
//	};
//	exportService.prototype.exportWordByUnit= function(idseries, idbasetext, idsutta, idsection, unit, excluding, fn){
//		var datas={'idseries':idseries,'idbasetext':idbasetext, 'idsection':idsection, 'idsutta':idsutta, 'unit':unit, 'excluding':excluding};
//		_ukitUtil.ajax(baseUrl+'/service/Export', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'exportWordByUnit', function(success){
//			fn(success);
//		});
//	};
//	exportService.prototype.exportWordBySutta= function(idseries, idbasetext, idsutta, excluding, fn){
//		var datas={'idseries':idseries,'idbasetext':idbasetext, 'idsutta':idsutta, 'excluding':excluding};
//		_ukitUtil.ajax(baseUrl+'/service/Export', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'exportWordBySutta', function(success){
//			fn(success);
//		});
//	};
//}