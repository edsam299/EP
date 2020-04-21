var _gunit = null;
var _gfootnote = null;
var _idcurent = null;
var _isSelectUnit=null;
var _proof=null;
var _idh1=null;
var _idh2=null;
var _idh3=null;
var _idh4=null;
var _unit=null;
var _idh=null;
var _objUnit=null;
var _objFootnote=null;
var _fcrid=null;
var _hide=true;
$(document).ready(function(){
	var select = $('#filename');
	var newOptions = {1 : 'Unit', 2 : 'Section( H4 )', 3 : 'Chapter( H3 )', 4 : 'Text ( H2 )'};
	$('option', select).remove();
	$.each(newOptions, function(text, key) {
	    var option = new Option(key, text);
	    select.append($(option));
	    option=null;
	});
	select=null; newOptions=null;
	$('#previous').html('<<');
	$('#next').html('>>');
	$('#divh1toh4').css('fontSize',20);
	$('#divh1toh4').css("font-family", "Open Sans");
	$('#divh1toh4').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp'+
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	_isSelectUnit=false;
	$('#dtpcontent').css('fontSize',20);
	$("#dtpcontent").css("font-family", "Open Sans");		
	$('#divunit').css('fontSize',20);
	$("#divunit").css("font-family", "Open Sans");	
	$("#divunit").html("___");
	$('#dtp').css('fontSize',20);
	$("#dtp").css("font-family", "Open Sans");	
	_proof = new proofing();
	genTable();
//	   _gsection.makeFilter("_filter",2);
	var treemenu=new dhtmlXTreeObject("treeboxbox","100%","100%",0);

	treemenu.setSkin('dhx_skyblue');
	treemenu.setImagePath("dhtmlxTree/codebase/imgs/csh_bluebooks/");
	treemenu.enableThreeStateCheckboxes(true);
	setXmlTreeH1ToH4(function(value){
		treemenu.loadXMLString(value);
	});
	treemenu.setOnClickHandler(tonclick);
	
	treemenu.attachEvent("onSelect", function(id){	
		_idh1=treemenu.getParentId(treemenu.getParentId(treemenu.getParentId(id)));
		_idh2=treemenu.getParentId(treemenu.getParentId(id));
		_idh3=treemenu.getParentId(id);
		_idh4=treemenu.getSelectedItemId();
		
	});

//	$('#hide_unhide').click(function(){
//		console.log('hide '+_hide);
//		if(_hide==false){
//			_hide=true;
//			$('#display_ebt_dtp').hide();
//			$('#hide_unhide').val('Unhide');
////			$('#view').height(470);
//		}else{
//			_hide=false;
//			$('#display_ebt_dtp').show();
//			$('#hide_unhide').val('Hide');
////			$('#view').height(370);
//		}
//	});
	
	$('#next').click(function(){
		nextLine();
	});
	$('#previous').click(function(){
		previousLine();
	});

	
	$('#comment').click(function(){
		if(_fcrid==null){
			_ukitUtil.getMessageById(54, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		$("#content").mask("Waiting...");
		var obj=new Object();
		obj.title='View Comment';	
		_proof.getComment(_fcrid, _idh, function(objComment){
			obj.comment=objComment;
			_ukitUtil.popuppage(obj, 'popupproofing.jsp', (screen.width), (screen.height), 0, 0);
			obj=null;
			$("#content").unmask();
		});
	});
	
	$('#dtpcontent').click(function(){
		reply_click();
	});
	
	$('#showfootnote').click(function(){
		$("#content").mask("Waiting...");
		if($('#showfootnote').is(':checked')){			
			_proof.showFootnote(_fcrid, _idh, _iduser, function(footnote){
				$('#divfootnote').html(footnote);
				$("#content").unmask();
			});
		}else{
			_proof.deleteFootnote(_fcrid, _idh, function(success){
				if(success.value)
					$('#divfootnote').html('');
				else{
					_ukitUtil.getMessageById(55, _messageUI, function(msg){
						 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
					});
				}
				$("#content").unmask();
			});
		}
	});
	
	$('#hide_unhide').click(function(){
		if(_hide==false){
			_hide=true;
			$('#display_ebt_dtp').hide();
			$('#hide_unhide').val('Unhide');
		}else{
			if(_unit==null){
				_ukitUtil.getMessageById(56, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
				return
			}
			_hide=false;
			$('#display_ebt_dtp').show();
			$('#hide_unhide').val('Hide');
			_proof.getCompareTable(_unit, _idh, function(table){
				if(table!=null)
					$('#ebt_dtp').html(table);
			});
		}
	});
	
	$('#save').click(function(){
		_proof.saveFootnote(_fcrid, _idh, _iduser, $('#divfootnote').html(), function(success){
			dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
		});
	});
	
	$('#tools').click(function(){
		window.open('./url?operation=Tools&amp;id=8&amp;menu=Tools&amp;page_id=8', '');
	});
	
	$('#history').click(function(){
		if(_fcrid==null){
			_ukitUtil.getMessageById(57, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		$("#content").mask("Waiting...");
		var obj=new Object();
		obj.title='View History';	
		_proof.searchFootnoteHistory(_fcrid, _idh, function(hisroty){
			if(hisroty!=null){
				obj.history=hisroty;
				_ukitUtil.popuppage(obj, 'popuphistory.html', (screen.width), (screen.height), 0, 0);
				obj=null;
			}else{
				_ukitUtil.getMessageById(58, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
			}
			$("#content").unmask();
		});
	});
});

function previousLine(){
	try{
		if(_idcurent>0){
//			configView();
			$("#content").mask("Waiting...");
			_idcurent--;
			_idh=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("idh")).getValue();
			_unit=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("unit")).getValue();
			_gunit.selectRowById(_idcurent);
			$("#content").mask("Waiting...");
			$('#dtpcontent').html('');
			$('#divunit').html('<b><u>'+_unit+'</u></b>');
			_proof.getContentFT(_idh, _unit, function(footnote){
				_gfootnote.clearAll();
				if(footnote!=null){
					$('#dtpcontent').html(footnote[0].content);
					for(var i=0, len=footnote[0].footnote.length; i<len; i++){
						_gfootnote.addRow(i, [footnote[0].footnote[i].word,  footnote[0].footnote[i].ft], i);
					};
				}
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
//				configView();
				$("#content").mask("Waiting...");
				_idcurent++;
//				_newIdh=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("newIdh")).getValue();
//				_newunit=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("dunit")).getValue();
//				_unitcontent=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("content")).getValue();
				_idh=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("idh")).getValue();
				_unit=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("unit")).getValue();
				_gunit.selectRowById(_idcurent);
				$("#content").mask("Waiting...");
				$('#dtpcontent').html('');
				$('#divunit').html('<b><u>'+_unit+'</u></b>');
				_proof.getContentFT(_idh, _unit, function(footnote){
					_gfootnote.clearAll();
					if(footnote!=null){
						$('#dtpcontent').html(footnote[0].content);
						for(var i=0, len=footnote[0].footnote.length; i<len; i++){
							_gfootnote.addRow(i, [footnote[0].footnote[i].word,  footnote[0].footnote[i].ft], i);
						};
					}
					$("#content").unmask();
				});
			}
		}else{
			if(_isSelectUnit){
//				configView();
				$("#content").mask("Waiting...");
				_idcurent=0;
				_idh=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("idh")).getValue();
				_unit=_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("unit")).getValue();
				_gunit.selectRowById(_idcurent);
				$("#content").mask("Waiting...");
				$('#dtpcontent').html('');
				$('#divunit').html('<b><u>'+_unit+'</u></b>');
				_proof.getContentFT(_idh, _unit, function(footnote){
					_gfootnote.clearAll();
					if(footnote!=null){
						$('#dtpcontent').html(footnote[0].content);
						for(var i=0, len=footnote[0].footnote.length; i<len; i++){
							_gfootnote.addRow(i, [footnote[0].footnote[i].word,  footnote[0].footnote[i].ft], i);
						};
					}
					$("#content").unmask();
				});
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

	_gunit=_ukitUtil.createDhtmlxGrid('gunit');
	_gunit.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gunit.setHeader("Unit,Content,Line,idh");
	_gunit.enableAutoWidth(true);
	_gunit.setColumnIds("unit,content,line,idh");
	_gunit.setInitWidths("70,350,120,0");
	_gunit.setColAlign("left,left,left,left");
	_gunit.setColTypes("ro,ro,ro,ro");
	_gunit.attachEvent("onRowSelect",unitSelect);
	_gunit.setSkin('modern');
	_gunit.init();
	
	_gfootnote=_ukitUtil.createDhtmlxGrid('gfootnote');
	_gfootnote.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gfootnote.setHeader("Words,Footnotes");
	_gfootnote.enableAutoWidth(true);
	_gfootnote.setColumnIds("words,footnotes");
	_gfootnote.setInitWidths("100,350");
	_gfootnote.setColAlign("left,left");
	_gfootnote.setColTypes("ro,ro");
//	_gunit.attachEvent("onRowSelect",unitSelect);
	_gfootnote.setSkin('modern');
	_gfootnote.enableMultiline(true);
	_gfootnote.setStyle("font: 16px Open Sans", "font: 16px Open Sans");
	_gfootnote.init();
	
	
}

function unitSelect(rowIndex,colIndex){
	_proof.clear();
	_idh=_gunit.cells(_gunit.getRowId(rowIndex),_gunit.getColIndexById("idh")).getValue();
	_unit=_gunit.cells(_gunit.getRowId(rowIndex),_gunit.getColIndexById("unit")).getValue();
//	var content=_gunit.cells(_gunit.getRowId(rowIndex),_gunit.getColIndexById("content")).getValue();	
	_idcurent=rowIndex;	
//	_isSelectUnit=true;
	$("#content").mask("Waiting...");
	$('#dtpcontent').html('');
	$('#divunit').html('<b><u>'+_unit+'</u></b>');
	_proof.getContentFT(_idh, _unit, function(footnote){
		_gfootnote.clearAll();
		if(footnote!=null){
			$('#dtpcontent').html(footnote[0].content);
			for(var i=0, len=footnote[0].footnote.length; i<len; i++){
				_gfootnote.addRow(i, [footnote[0].footnote[i].word,  footnote[0].footnote[i].ft], i);
			};
			
		}
		$("#content").unmask();
	});
//	configView();
}


//function configView(){
//	$("#overview").addClass("basic");
//	$('#basic-modal .basic').bind('click', function(e) {
//		if(_newunit!=null)
//			$('#basic-modal-content').modal();
//		else
//			$(this).unbind(e);
//		return false;
//	});
//}

function tonclick(id) {
	$("#content").mask("Waiting...");
	_gunit.clearAll();
	_proof.clear();
	_isSelectUnit=false;
//	console.log(_idh1);
//	console.log(_idh2);
//	console.log(_idh3);
//	console.log(_idh4);
	_proof.getHeader(_idh1, _idh2, _idh3, _idh4, function(strHeader){
		$('#divh1toh4').html(strHeader);
	});
	_proof.setUnitTable(_idh1, _idh2, _idh3, _idh4, function(obj){
		_objUnit=obj;
		if(obj!=null){
			_isSelectUnit=true;
			for(var i=0, len=obj.length; i<len; i++){
				_gunit.addRow(i, [obj[i].unit, obj[i].content, obj[i].line, obj[i].idh], i);
			}
		}
		$("#content").unmask();
	});
};

function reply_click(e) {
	e = e || window.event;
	e = e.target || e.srcElement;	
	if (e.nodeName === 'LABEL' || e.nodeName === 'I') {
		$("#content").mask("Waiting...");
		_fcrid=e.id;		
		_proof.searchFootnoteById(_fcrid, _idh, function(footnote){
			$('#dtp').val($('#'+_fcrid).text());
			console.log($('#'+_fcrid).text()+' '+footnote[0]);
			$('#divfootnote').html(footnote[1]);
			if(footnote[0]==1)
				$('#showfootnote').prop('checked', true);
			else
				$('#showfootnote').prop('checked', false);	
			$("#content").unmask();
		});
//		console.log(document.getElementById('comments.document'));
//		if(document.getElementById(e.id).parentNode.id!='word')
//			_fcrid=document.getElementById(e.id).parentNode.id;
//		else
//			_fcrid=e.id;
//		console.log('idword '+_fcrid+' '+document.getElementById(e.id).parentNode.id+' '+e.id);
	}
}

//function setH1ToH4(rowIndex,colIndex){
//	_newIdh=null; _newunit=null;
//	_isSelectUnit=false;
//	_idcurent=null;
//	$('#divunit').html('__');
//	$('#view').html('');
//	$("#content").mask("Waiting...");
//	_gunit.clearAll();
//	_approveLinking.getHeader(_gsection.cells(_gsection.getRowId(rowIndex),_gsection.getColIndexById("idh")).getValue(), function(strHeader){
//		$('#divh1toh4').html(strHeader);
//	});
//	_approveLinking.loadUnitTable(_gsection.cells(_gsection.getRowId(rowIndex),_gsection.getColIndexById("idsection")).getValue(), 
//			_gsection.cells(_gsection.getRowId(rowIndex),_gsection.getColIndexById("idh")).getValue(), function(unitTable){
//		if(unitTable!=null){
//			_isSelectUnit=true;
//			for(var i=0, len=unitTable.length; i<len; i++){
//				_gunit.addRow(i, [unitTable[i].newunit, unitTable[i].eunit, unitTable[i].econtent
//				                  , unitTable[i].idstatus, unitTable[i].newidh, unitTable[i].content], i);
//			}
//		}
//		$("#content").unmask();
//	});
//}

function proofing(){
	
	proofing.prototype.getHeader = function(h1,h2,h3,h4, fn){
		var datas={'h1':h1,'h2':h2,'h3':h3,'h4':h4};
		try{
			$.ajax({
				url: baseUrl+"/service/Proof",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				async : false,
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
	
	proofing.prototype.setUnitTable = function(h1,h2,h3,h4, fn){
		var datas={'h1':h1,'h2':h2,'h3':h3,'h4':h4};
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
	                "param":"setUnitTable"
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
	
	proofing.prototype.getContentFT = function(idh, unit, fn){
		var datas={'idh':idh,'unit':unit};
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
	                "param":"getContentFT"
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
			alert('getContentFT '+e.message);
		}finally{
			datas=null;
		}
	};
	
	proofing.prototype.searchFootnoteById = function(fcrid, idh, fn){
		var datas={'fcrid':fcrid, 'idh':idh};
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
	                "param":"searchFootnoteById"
	            },
				success: function(strHeader) {
					fn(eval(strHeader));
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('searchFootnoteById '+e.message);
		}finally{
			datas=null;
		}
	};
	
	proofing.prototype.getLatestCommentByEPFcrid = function(iduser, fcrid, idh, fn){
		var datas={'iduser':iduser, 'fcrid':fcrid, 'idh':idh};
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
	                "param":"getLatestCommentByEPFcrid"
	            },
				success: function(lastcomment) {
					fn(lastcomment);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('getLatestCommentByEPFcrid '+e.message);
		}finally{
			datas=null;
		}
	};	
	
	proofing.prototype.searchFootnoteHistory = function(fcrid, idh, fn){
		var datas={'fcrid':fcrid, 'idh':idh};
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
	                "param":"searchFootnoteHistory"
	            },
				success: function(footnote) {
					fn(footnote);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
			});
		}catch(e){
			alert('searchFootnoteHistory '+e.message);
		}finally{
			datas=null;
		}
	};	
	
	proofing.prototype.saveFootnote = function(fcrid, idh, iduser, ft, fn){
		var datas={'fcrid':fcrid, 'idh':idh, 'iduser':iduser, 'ft':ft};
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
	                "param":"saveFootnote"
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
			alert('saveFootnote '+e.message);
		}finally{
			datas=null;
		}
	};
	
	proofing.prototype.getComment = function(fcrid, idh, fn){
		var datas={'fcrid':fcrid, 'idh':idh};
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
	                "param":"getComment"
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
			alert('getComment '+e.message);
		}finally{
			datas=null;
		}
	};
	
	proofing.prototype.searchComment = function(idh, iduser, unit, idword, idgroup, id, fn){
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
	
	proofing.prototype.searchReasonComment = function(fn){
		try{
			$.ajax({
				url: baseUrl+"/service/Proof",
				data: "param=searchReasonComment",
				dataType : "json",
				type : "GET",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
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
			alert('searchReasonComment '+e.message);
		}
	};
	
	proofing.prototype.deleteComment = function(idh, id, fn){
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
	
	proofing.prototype.deleteFootnote = function(fcrid, idh, fn){
		var datas={'fcrid':fcrid, 'idh':idh};
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
	                "param":"deleteFootnote"
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
			alert('deleteFootnote '+e.message);
		}finally{
			datas=null;
		}
	};
	
	proofing.prototype.showFootnote = function(fcrid, idh, iduser, fn){
		var datas={'fcrid':fcrid, 'idh':idh, 'iduser':iduser};
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
	                "param":"showFootnote"
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
			alert('showFootnote '+e.message);
		}finally{
			datas=null;
		}
	};
	
	proofing.prototype.getCompareTable = function(newunit, idh, fn){
		var datas={'newunit':newunit, 'idh':idh};
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
	                "param":"getCompareTable"
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
			alert('getCompareTable '+e.message);
		}finally{
			datas=null;
		}
	};

	proofing.prototype.clear = function(){
		_fcrid=null;
		$('#dtp').val('');
		$('#divfootnote').html('');
		$('#divunit').html('___');
		$('#dtpcontent').html('');
		$('#showfootnote').prop('checked', false);	
		_gfootnote.clearAll();
		_idcurent=null;
	};

}

//function checkSession(fn){
//	try{
//		$.ajax({
//			url: baseUrl+"/LoginService",
////			data: JSON.stringify(datas),
//			dataType : "json",
//			type : "GET",
//			async : true,
//			cache: false,
//			contentType : "application/json",
//			success: function(success) {
////				alert(success);
////				if(success==false){
//					 window.open('','_self','');
//					 window.close();
////				}
//					
//		}, 
//			error: function(data) {
//				if (data.responseText != null && data.responseText != "") {
//					alert(data.responseText);
//				}
//			}
//		});
//	}catch(e){
//		
//	}
//}