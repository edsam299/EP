var _reportService=null;
var _exportService=null;
var _gseries=null;
var gbasetext=null;
var _grptediting=null;
var _grptprogress=null;
var _idseries=null;
var _headerreport=null;
$(document).ready(function(){
	_exportService=new exportService();
	_reportService=new reportService();
	_gseries=_ukitUtil.createDhtmlxGrid('gseries');
	_gseries.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gseries.setHeader("Series,idh");
	_gseries.setColumnIds("series,idh");
	_gseries.setInitWidths(",0");
	_gseries.setColAlign("left,left");
	_gseries.setColTypes("ro,ro");
	_gseries.setSkin('modern');
	_gseries.enableMultiline(false);
	_gseries.enableAutoWidth(true);
	_gseries.setStyle("font: 17px Arial, Cordia New, sans-serif", "font: 17px Arial, Cordia New, sans-serif","", "");
	_gseries.setColSorting("na");
	_gseries.attachEvent("onRowSelect", doBasetextreport);
	_gseries.init();
	
//	_reportService.getReportEditingMaster(function(data){
//		if(data.value='true'){
//			for(var i=0; i<data.data.length; i++){
//				$('#rpt_edit').html($('#rpt_edit').html()+data.data[i]+'<br>');
//			}
//		}		
//	});
	_exportService.getTableH1ToH4(1, 0, function(success){
		if(success.value=='true'){
			for(var i=0; i<success.data.length; i++){
				_gseries.addRow(i,[success.data[i].content,success.data[i].idh],i);
				_gseries.setRowColor(i,"white");
			}
		}
	});
	gbasetext=_ukitUtil.createDhtmlxGrid('gbase_text');
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
	gbasetext.attachEvent("onRowSelect", doReportList);
	gbasetext.init();
	
	_grptediting=_ukitUtil.createDhtmlxGrid('rpt_edit');
	_grptediting.setImagePath("dhtmlxGrid/codebase/imgs/");
	_grptediting.setHeader("Report about Editing");
	_grptediting.setColumnIds("rptedit");
//	_grptediting.setInitWidths("300");
	_grptediting.setColAlign("left");
	_grptediting.setColTypes("ro");
	_grptediting.setSkin('modern');
	_grptediting.enableMultiline(false);
	_grptediting.enableAutoWidth(true);
	_grptediting.setStyle("font: 17px Arial, Cordia New, sans-serif", "font: 17px Arial, Cordia New, sans-serif","", "");
	_grptediting.attachEvent("onRowSelect", doReportName);
	_grptediting.init();
	
	_grptprogress=_ukitUtil.createDhtmlxGrid('rpt_progress');
	_grptprogress.setImagePath("dhtmlxGrid/codebase/imgs/");
	_grptprogress.setHeader("Report about Word Progress");
	_grptprogress.setColumnIds("rptprogress");
//	_grptprogress.setInitWidths("300");
	_grptprogress.setColAlign("left");
	_grptprogress.setColTypes("ro");
	_grptprogress.setSkin('modern');
	_grptprogress.enableMultiline(false);
	_grptprogress.enableAutoWidth(true);
	_grptprogress.setStyle("font: 17px Arial, Cordia New, sans-serif", "font: 17px Arial, Cordia New, sans-serif","", "");
	_grptprogress.attachEvent("onRowSelect", doReportName);
	_grptprogress.init();
	
//	_grptediting.clearAll();
//	_reportService.getListReport(function(data){
//		for(var i=0; i<data.length; i++){
//			_grptediting.addRow(i,[data[i]],i);
//		}
//	});
//	rpt_progress
});
function doBasetextreport(rowId,cellIndex){
	try{
		gbasetext.clearAll();
		_idseries=_gseries.cells(_gseries.getRowId(rowId),_gseries.getColIndexById("idh")).getValue();
		_exportService.getTableH1ToH4(2, _idseries, function(success){
			if(success.value=='true'){
				for(var i=0; i<success.data.length; i++){
					gbasetext.addRow(i,[success.data[i].content,success.data[i].idh],i);
					gbasetext.setRowColor(i,"white");
				}
			}
		});
	}catch(e){
		alert('doBasetextreport '+e.message);
	}
}
function doReportList(rowId,cellIndex){
	try{
		_grptediting.clearAll();
		_grptprogress.clearAll();
		_idbasetext=gbasetext.cells(gbasetext.getRowId(rowId),gbasetext.getColIndexById("idh")).getValue();
		_reportService.getListReport('rptEdit', function(data){
			for(var i=0; i<data.length; i++){
				_grptediting.addRow(i,[data[i]],i);
				_grptediting.setRowColor(i,"white");
			}
		});
		_reportService.getListReport('rptProgress', function(data){
			for(var i=0; i<data.length; i++){
				_grptprogress.addRow(i,[data[i]],i);
				_grptprogress.setRowColor(i,"white");
			}
		});
	}catch(e){
		alert('doReportList '+e.message);
	}
}
function doReportName(rowId,cellIndex){
	try{
		_headerreport=_grptediting.cells(_grptediting.getRowId(rowId),_grptediting.getColIndexById("rptedit")).getValue();
		_reportService.reportListOfUndecideWord(_idseries, _idbasetext, _headerreport, function(excelFile){
			if(typeof(excelFile)!='object'){
				window.location.href=excelFile;
			}else
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+excelFile.description);
//			$("#content").unmask();
		});
	}catch(e){
		alert('doReportList '+e.message);
	}
}

function reportService(){
	reportService.prototype.getReportEditingMaster=function(fn){
		_ukitUtil.ajax(baseUrl+'/service/Report', '', 'json', 'post', true, false, 'application/json', 'getReportEditingMaster', function(success){
			fn(success);
		});
	};
	reportService.prototype.reportListOfUndecideWord=function(idseries, idbasetext, header_report, fn){
		var datas={'idseries':idseries,'idbasetext':idbasetext, 'header_report':header_report};
		_ukitUtil.ajax(baseUrl+'/service/Report', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', header_report, function(success){
			fn(success);
		});
	};
	reportService.prototype.getListReport=function(type, fn){
		var datas=null;
		if(type=='rptEdit')
			datas=['List of undecided word','List of emendation','Word List(By Text)','Word List(By Username)'];
		else
			datas=['Progress Summary (By Amount of Unit Number)','Progress Summary (By Text)'];
		fn(datas);
	};
}