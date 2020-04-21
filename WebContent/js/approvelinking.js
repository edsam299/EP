var _gsection = null;
var _gunit = null;
var _gebt = null;
var _approveLinking=null;
var _h1=null; var _h2=null; var _h3=null;
var _newIdh=null; var _newunit=null;
var _hide=false;
var _unitcontent=null;
var _approveEBTUnit=null;
var _fontsize=18;
var _idcurent=null;
var _isSelectUnit=null;
$(document).ready(function(){
//	$('#detail').css('fontSize',20);
//	$("#detail").css("font-family", "Open Sans");	
	$('#previous').html('<<');
	$('#next').html('>>');
	$('#divh1toh4').css('fontSize',20);
	$('#divh1toh4').css("font-family", "Open Sans");
	$('#divh1toh4').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp'+
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	_isSelectUnit=false;
	$('#divunit').css('fontSize',20);
	$("#divunit").css("font-family", "Open Sans");	
	$("#divunit").html("___");
	$('#dtp').css('fontSize',20);
	$("#dtp").css("font-family", "Open Sans");	
	$('#rearranged').css('fontSize',20);
	$("#rearranged").css("font-family", "Open Sans");	
	$("#rearranged").html("Rearranged by:____________________________");
	$('#viewdtp').css('fontSize',18);
	$('#viewebt').css('fontSize',18);
	_approveLinking = new approveLinking();
	genTable();
//	   _gsection.makeFilter("_filter",2);
	var treemenu=new dhtmlXTreeObject("treeboxbox","100%","100%",0);

	treemenu.setSkin('dhx_skyblue');
	treemenu.setImagePath("dhtmlxTree/codebase/imgs/csh_bluebooks/");
	treemenu.enableThreeStateCheckboxes(true);
	treemenu.loadXMLString(getTree());
	treemenu.setOnClickHandler(tonclick);
	
	treemenu.attachEvent("onSelect", function(id){
//		_idh4=null;
		
//		console.log('parent 1 '+treemenu.getItemText(treemenu.getParentId(treemenu.getParentId(id))));
//		console.log('select: parent h2'+treemenu.getItemText(treemenu.getParentId(id))+' select level '+treemenu.getLevel(id));
//		console.log('getSelectedItemId '+treemenu.getSelectedItemText());			
		if(treemenu.getLevel(id)==3){
			_h1=treemenu.getParentId(treemenu.getParentId(id));
			_h2=treemenu.getParentId(id);
			_h3=treemenu.getSelectedItemId();	
			$('#divh1toh4').html(treemenu.getItemText(treemenu.getParentId(treemenu.getParentId(id)))+'>'+treemenu.getItemText(treemenu.getParentId(id))+'>'+treemenu.getSelectedItemText());
		}
	});
	
	$('#overview').click(function(){
		if(_newIdh==null || _newunit==null){
			return
		}
		
		$('#dtp').html('DTP: <u>'+_unitcontent+'&nbsp;[ '+_newunit+' ]</u>');
		$('#content').mask('Waiting...');
		_approveLinking.getRearrangeBy(_newIdh, _newunit, function(rearrangeBy){
			$('#viewebt').html(rearrangeBy);
		});
		_approveLinking.getDTPContent(_newIdh, _newunit, function(dtpContent){
			$('#viewdtp').html(dtpContent);
		});
		_approveLinking.setEBTUnitTable(_newIdh, _newunit, function(approveEBTUnit){
			_approveEBTUnit=approveEBTUnit;
			if(approveEBTUnit!=null){			
				_gebt=_ukitUtil.createDhtmlxGrid('gebt');
				_gebt.setImagePath("dhtmlxGrid/codebase/imgs/");
				_gebt.setHeader("CSUnit,CSText,CSLine,Done by");
//				_gebt.enableAutoWidth(true);
				_gebt.setColumnIds("csunit,cstext,csline,doneby");
				_gebt.setInitWidths("60,380,70,150");
				_gebt.setColAlign("left,left,right,left");
				_gebt.setColTypes("ro,ro,ro,ro");
				_gebt.attachEvent("onRowSelect",setDetail);
				_gebt.setSkin('modern');
				_gebt.init();
				for(var i=0, len=approveEBTUnit.length; i<len; i++){
					_gebt.addRow(i, [approveEBTUnit[i].unit, approveEBTUnit[i].content, approveEBTUnit[i].line, approveEBTUnit[i].doneby], i);
				}	
			}
			$('#content').unmask();
		});
	});
//	$('#showdetail').click(function(){
////		if(_fcrid==null){
////			dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>Please select the text on the left hand side.");
////			return
////		}
////		$("#content").mask("Waiting...");
////		showDetail(_fcrid, function(obj){
////			_gsection.clearAll();			
////			if(obj!=null){
////				_filter=obj;
////				genTable();
////				  for (var i = 0, len = obj.length; i<len; i+=1) {
////					_gsection.addRow(i, [obj[i].unitno,obj[i].content,obj[i].status,obj[i].doneby], i);
////				}
////			}
////			$("#content").unmask();
////		});
//		_approveLinking.getRearrangeBy(_newIdh, _newunit, function(rearrangeBy){
//			$('#viewebt').html(rearrangeBy);
//		});
//		_approveLinking.getDTPContent(_newIdh, _newunit, function(dtpContent){
//			$('#viewdtp').html(dtpContent);
//		});
//	});
	
	$('#setdetail').click(function(){
		showDetail(_fcrid, function(obj){
//			console.log(JSON.stringify(obj));
		});
	});
	$('#link').click(function(){
		if(_fcrid==null ||_fcrid==0 || _total==null || _rearrange==null || _oth==null){
			_ukitUtil.getMessageById(49, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		_ukitUtil.getMessageById(47, _messageUI, function(msg){
			 dhtmlxs.confirm({
				 text: "<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
				 ok:"Yes",cancel:"No",
				 callback: function(result) {
					 if(result){
						 $("#content").mask("Waiting...");
						 link(_fcrid, _total, _rearrange, _oth, function(success){
							 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
						 });
						 $("#content").unmask();
					 }	
				 }
			 });
		});
	});
	
	$('#manualmode').click(function(){
		$("#content").mask("Waiting...");
		_approveLinking.getTable(_newIdh, _newunit, 'manual', function(table){
			$('#view').html(table);
			$("#content").unmask();
		});
	});
	
//	$('#showallebt').click(function(){
//		_approveLinking.setEBTUnitTable(_newIdh, _newunit, function(approveEBTUnit){
//			if(approveEBTUnit!=null){
//				generateEBT(approveEBTUnit);
//			}
//		});
//	});
	
	$('#hide_unhide').click(function(){
		if(_hide==false){
			_hide=true;
			$('#display').hide();
			$('#hide_unhide').val('Unhide');
			$('#view').height(470);
		}else{
			_hide=false;
			$('#display').show();
			$('#hide_unhide').val('Hide');
			$('#view').height(370);
		}
	});
	
	$('#setfontbig').click(function(){
		_ukitUtil.setFontSize('big', 'viewdtp', _fontsize);
		_fontsize=_ukitUtil.setFontSize('big', 'viewebt', _fontsize);
	});
	$('#setfontsmall').click(function(){
		_ukitUtil.setFontSize('small', 'viewdtp', _fontsize);
		_fontsize=_ukitUtil.setFontSize('small', 'viewebt', _fontsize);
	});
	
	$('#next').click(function(){
		nextLine();
	});
	$('#previous').click(function(){
		previousLine();
	});
	$('#approve').click(function(){
		_ukitUtil.getMessageById(48, _messageUI, function(msg){
			dhtmlxs.confirm({
				text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
				ok:"Yes", cancel:"No", callback:function(result){
					if(result){
						$("#content").mask("Waiting...");
						_approveLinking.approve($('#view').html(), _newIdh, _newunit, _iduser, 4, function(success){
							dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
							$("#content").unmask();
						});
						return;
					}
				}
			 });
		});
	});
});

function previousLine(){
	try{
		if(_idcurent>0){
			configView();
			$("#content").mask("Waiting...");
			_idcurent--;
			_newIdh=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("newIdh")).getValue();
			_newunit=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("dunit")).getValue();
			_gunit.selectRowById(_idcurent);
			_unitcontent=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("content")).getValue();
			$('#divunit').html('<b><u>'+_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("dunit")).getValue()+'</u></b>');
			_approveLinking.getTable(_newIdh, _newunit, 'auto', function(table){
				$('#view').html(table);
				$("#content").unmask();
			});
		}
	}catch(e){
		alert('previouseLine '+e.message);
	}
}

function nextLine(){
	try{
		if(_idcurent!=null){
			if(_idcurent<_gunit.getRowsNum()-1){
				configView();
				$("#content").mask("Waiting...");
				_idcurent++;
				_newIdh=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("newIdh")).getValue();
				_newunit=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("dunit")).getValue();
				_unitcontent=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("content")).getValue();
				_gunit.selectRowById(_idcurent);
				$('#divunit').html('<b><u>'+_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("dunit")).getValue()+'</u></b>');
				_approveLinking.getTable(_newIdh, _newunit, 'auto', function(table){
					$('#view').html(table);
					$("#content").unmask();
				});
			}
		}else{
			if(_isSelectUnit){
				configView();
				$("#content").mask("Waiting...");
				_idcurent=0;
				_newIdh=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("newIdh")).getValue();
				_newunit=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("dunit")).getValue();
				_unitcontent=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("content")).getValue();
				_gunit.selectRowById(_idcurent);
				$('#divunit').html('<b><u>'+_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("dunit")).getValue()+'</u></b>');
				_approveLinking.getTable(_newIdh, _newunit, 'auto', function(table){
					$('#view').html(table);
					$("#content").unmask();
				});
//				searchLatestUser(_idh1, _idh2, _idh3, _idh4, $('#divunit').text(), 2);
			}else{
				_ukitUtil.getMessageById(50, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
			}
		}
	}catch(e){
		alert('nextLine '+e.message);
	}
}
function genTable(){
	_gsection=_ukitUtil.createDhtmlxGrid('gsection');
	_gsection.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gsection.setHeader("Title,DUnit,CSUnit,CSLine,idsection,idh");
	_gsection.enableAutoWidth(true);
	_gsection.setColumnIds("title,dunit,eunit,eline,idsection,idh");
	_gsection.setInitWidths("150,70,70,80,0,0");
	_gsection.setColAlign("left,center,left,left,left,left");
	_gsection.setColTypes("ro,ro,ro,ro,ro,ro,ro");
	_gsection.setSkin('modern');
	_gsection.attachEvent("onRowSelect",setH1ToH4);
	_gsection.init();
	
	_gunit=_ukitUtil.createDhtmlxGrid('gunit');
	_gunit.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gunit.setHeader("DUnit,CSUnit,CSText,idStatus,newIdh,content");
	_gunit.enableAutoWidth(true);
	_gunit.setColumnIds("dunit,csunit,cstext,idstatus,newIdh,content");
	_gunit.setInitWidths("70,120,450,0,0,0");
	_gunit.setColAlign("left,left,left,left,left,left");
	_gunit.setColTypes("ro,ro,ro,ro,ro,ro");
	_gunit.attachEvent("onRowSelect",unitSelect);
	_gunit.setSkin('modern');
	_gunit.init();
	
	_gebt=_ukitUtil.createDhtmlxGrid('gebt');
	_gebt.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gebt.setHeader("CSUnit,CSText,CSLine,Done by");
//	_gebt.enableAutoWidth(true);
	_gebt.setColumnIds("csunit,cstext,csline,doneby");
	_gebt.setInitWidths("60,380,70,150");
	_gebt.setColAlign("left,left,left,left");
	_gebt.setColTypes("ro,ro,ro,ro");
	_gebt.setSkin('modern');
	_gebt.init();
	
}

function setDetail(rowIndex,colIndex){
	if(_approveEBTUnit!=null)
		$('#viewebt').html(_approveEBTUnit[rowIndex].detail);
	else
		$('#viewebt').html('');
}

function unitSelect(rowIndex,colIndex){
	_newIdh=_gunit.cells(_gunit.getRowId(rowIndex),_gunit.getColIndexById("newIdh")).getValue();
	_newunit=_gunit.cells(_gunit.getRowId(rowIndex),_gunit.getColIndexById("dunit")).getValue();
	_unitcontent=_gunit.cells(_gunit.getRowId(rowIndex),_gunit.getColIndexById("content")).getValue();
	_idcurent=rowIndex;	
	$("#content").mask("Waiting...");
	$('#divunit').html('<b><u>'+_newunit+'</u></b>');
	_approveLinking.getTable(_newIdh, _newunit, 'auto', function(table){
		$('#view').html(table);
		$("#content").unmask();
	});
	configView();
}

function configView(){
	$("#overview").addClass("basic");
	$('#basic-modal .basic').bind('click', function(e) {
		if(_newunit!=null)
			$('#basic-modal-content').modal();
		else
			$(this).unbind(e);
		return false;
	});
}

function getTree(){
	var strXml=null;
	try{
		setXmlTree(function(xml){
			strXml=xml;
		});
		return strXml;
	}catch(e){
		alert('getTree '+e.message);
	}finally{
		strXml=null;
	}
}

function tonclick(id) {
	$("#content").mask("Waiting...");
	_gsection.clearAll();
	_approveLinking.loadSectionTable(_h1, _h2, _h3, function(sectionTable){
		_gsection.clearAll();
		if(sectionTable!=null){
			for(var i=0, len=sectionTable.length; i<len; i++){
				_gsection.addRow(i, [sectionTable[i].title, '<b><font color="red">'+sectionTable[i].dunit+'</font></b>', sectionTable[i].eunit, 
				                     sectionTable[i].eline,  sectionTable[i].idsection,  sectionTable[i].idh], i);
			}
		}
		$("#content").unmask();
	});
//	setDetail(id);
};



function setH1ToH4(rowIndex,colIndex){
//	console.log(_filter[id].idstatus+' '+_filter[id].series+' '+_filter[id].basetext+' '+_filter[id].sutta+' '+_filter[id].section);
//	if(_filter[id].status!=4){
//		$('#detail').css('color', '#F75D59');
//	}else{
//		$('#detail').css('color','black');
//	}
//	$('#detail').html(_filter[id].detail);
	_newIdh=null; _newunit=null;
	_isSelectUnit=false;
	_idcurent=null;
	$('#divunit').html('__');
	$('#view').html('');
	$("#content").mask("Waiting...");
	_gunit.clearAll();
	_approveLinking.getHeader(_gsection.cells(_gsection.getRowId(rowIndex),_gsection.getColIndexById("idh")).getValue(), function(strHeader){
		$('#divh1toh4').html(strHeader);
	});
	_approveLinking.loadUnitTable(_gsection.cells(_gsection.getRowId(rowIndex),_gsection.getColIndexById("idsection")).getValue(), 
			_gsection.cells(_gsection.getRowId(rowIndex),_gsection.getColIndexById("idh")).getValue(), function(unitTable){
		if(unitTable!=null){
			_isSelectUnit=true;
			for(var i=0, len=unitTable.length; i<len; i++){
				_gunit.addRow(i, [unitTable[i].newunit, unitTable[i].eunit, unitTable[i].econtent
				                  , unitTable[i].idstatus, unitTable[i].newidh, unitTable[i].content], i);
			}
		}
		$("#content").unmask();
	});
}

function approveLinking(){
	
	approveLinking.prototype.loadSectionTable = function(h1, h2, h3, fn){
		var datas={'h1':h1,'h2':h2,'h3':h3};
		try{
			$.ajax({
				url: baseUrl+"/service/ApproveLinking",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"loadSectionTable"
	            },
				success: function(sectionTable) {
					fn(sectionTable);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('loadSectionTable '+e.message);
		}finally{
			datas=null;
		}
	};
	
	approveLinking.prototype.loadUnitTable = function(idsection, idh, fn){
		var datas={'idsection':idsection,'idh':idh};
		try{
			$.ajax({
				url: baseUrl+"/service/ApproveLinking",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"loadUnitTable"
	            },
				success: function(unitTable) {
					fn(unitTable);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('loadUnitTable '+e.message);
		}finally{
			datas=null;
		}
	};
	
	approveLinking.prototype.getHeader = function(newIdh, fn){
		var datas={'newIdh':newIdh};
		try{
			$.ajax({
				url: baseUrl+"/service/ApproveLinking",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"getHeader"
	            },
				success: function(strHeader) {
					fn(strHeader);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('getHeader '+e.message);
		}finally{
			datas=null;
		}
	};
	
	approveLinking.prototype.getTable = function(newIdh, newunit, mode, fn){
		var datas={'newIdh':newIdh, 'newunit':newunit,'mode':mode};
		try{
			$.ajax({
				url: baseUrl+"/service/ApproveLinking",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"getTable"
	            },
				success: function(strHeader) {
					fn(strHeader);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('getTable '+e.message);
		}finally{
			datas=null;
		}
	};
	
	approveLinking.prototype.getRearrangeBy = function(newIdh, newunit, fn){
		var datas={'newIdh':newIdh, 'newunit':newunit};
		try{
			$.ajax({
				url: baseUrl+"/service/ApproveLinking",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"getRearrangeBy"
	            },
				success: function(rearrangeBy) {
					fn(rearrangeBy);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('getRearrangeBy '+e.message);
		}finally{
			datas=null;
		}
	};
	
	approveLinking.prototype.getDTPContent = function(newIdh, newunit, fn){
		var datas={'newIdh':newIdh, 'newunit':newunit};
		try{
			$.ajax({
				url: baseUrl+"/service/ApproveLinking",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"getDTPContent"
	            },
				success: function(dtpContent) {
					fn(dtpContent);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('getDTPContent '+e.message);
		}finally{
			datas=null;
		}
	};
	
	approveLinking.prototype.setEBTUnitTable = function(newIdh, newunit, fn){
		var datas={'newIdh':newIdh, 'newunit':newunit};
		try{
			$.ajax({
				url: baseUrl+"/service/ApproveLinking",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"setEBTUnitTable"
	            },
				success: function(approveEBTUnit) {
					fn(approveEBTUnit);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('setEBTUnitTable '+e.message);
		}finally{
			datas=null;
		}
	};
	
	approveLinking.prototype.approve = function(ft, idh, unitno, iduser, idpage, fn){
		var datas={'ft':ft, 'idh':idh, 'unitno':unitno, 'iduser':iduser, 'idpage':idpage};
		try{
			$.ajax({
				url: baseUrl+"/service/ApproveLinking",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"approve"
	            },
				success: function(success) {
					fn(success);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('approve '+e.message);
		}finally{
			datas=null;
		}
	};
}
