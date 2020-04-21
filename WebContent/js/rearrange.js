//var _ukitUtil=null;
var _idh1=null;
var _idh2=null;
var _idh3=null;
var _idh4=null;
var _gunit=null;
var _gsection=null;
var _idh=null;
var _idcurent=null;
var _isSelectUnit=null;
var _hide=false;
var _fontsize=20;
var gunithis=null;
var _unitno=null;

$(document).ready(function(){
	$('#previous').html('<<');
	$("#previous").css("fontSize", 24);
	$('#next').html('>>');
	$("#next").css("fontSize", 24);
	$('#h1toh4').css("font-family", "Open Sans");	
	$('#h1toh4').css("fontSize", 14);
	$('#divunit').css("font-family", "Open Sans");	
	$('#divunit').css("fontSize", 20);	
	$('#unit').html('Unit no:');
	$("#lineno").css("fontSize", 20);
	$('#lineno').css("font-weight", "bold");
	$('#word').css('fontSize',_fontsize);
	$("#word").css("font-family", "Open Sans");	
	_isSelectUnit=false;
//	_ukitUtil = new UkitUtil();
	
	gunithis=_ukitUtil.createDhtmlxGrid('gunithis');
	gunithis.setImagePath("dhtmlxGrid/codebase/imgs/");
	gunithis.setHeader("Username,Word/Group,Description,date");
	gunithis.setColumnIds("username,wordgroup,description,date");
	gunithis.setInitWidths("120,120,120,100");
	gunithis.setColAlign("left,left,left,left");
	gunithis.setColTypes("ro,ro,ro,ro");
	gunithis.setSkin('modern');
	gunithis.enableMultiline(false);
	gunithis.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif","", "");
	gunithis.setColSorting("na,str,str,str");	
	gunithis.init();
	
	_gunit=_ukitUtil.createDhtmlxGrid('gunit');
	_gunit.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gunit.setHeader("<div align='center'>Unit</div>,<div align='center'>Content</div>,<div align='center'>Status</div>,idh");
	_gunit.setColumnIds("unitno,content,status,idh");
	_gunit.setInitWidths("60,380,120,0");
	_gunit.setSizes();
	_gunit.setColAlign("left,left,right,left");
	_gunit.setColTypes("ro,ro,ro,ro");
	_gunit.setSkin('modern');
//	_gunit.enableAutoWidth(true, 510, 250);
	_gunit.attachEvent("onRowSelect",function(id,ind){
		_idcurent=id;		
		_idh=_gunit.cells(_gunit.getRowId(id),_gunit.getColIndexById("idh")).getValue();
		_unitno=_gunit.cells(_gunit.getRowId(id),_gunit.getColIndexById("unitno")).getValue();
		$('#divunit').html(_unitno);
		getMainContent(_idh, $('#divunit').text(), 0, function(content){
			if(content.value=='true')
				$('#word').html(content.description);
			else{
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+content.description);
				$('#word').html('');
			}	
			$('#view').html('');
		});
		searchLatestUser(_idh, $('#divunit').text());
	});
	_gunit.init();
	
	_gsection=_ukitUtil.createDhtmlxGrid('gsection');
	_gsection.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gsection.setHeader("<div align='center'>Section Title</div>,<div align='center'>Range Unit</div>,<div align='center'>Line</div>,idh3,id");
	_gsection.setColumnIds("sectiontitle,rangeunit,line,idh3,id");
	_gsection.setInitWidths("220,90,70,0,0");
	_gsection.setSizes();
	_gsection.setColAlign("left,left,left,left,left");
	_gsection.setColTypes("ro,ro,ro,ro,ro");
	_gsection.setSkin('modern');
//	_gsection.enableAutoWidth(true, 510, 250);
	_gsection.attachEvent("onRowSelect",function(id,ind){		
		$('#lineno').html(_gsection.cells(_gsection.getRowId(id),_gsection.getColIndexById("line")).getValue());			
		_idcurent=null;		
		_gunit.clearAll();
		_idh4=_gsection.cells(_gsection.getRowId(id),_gsection.getColIndexById("id")).getValue();
		_isSelectUnit=true;
		$('#editby').html('');
		$('#view').html('');
		$('#word').html('');
		$('#divunit').html('');
		$("#content").mask("Waiting...");
		searchUnitByH4Rearrange(_idh4, function(obj){
			if(obj.value=='true'){
				for(var i=0, len=obj.data.length; i<len; i++){
					_gunit.addRow(i, [obj.data[i].unit,obj.data[i].content,obj.data[i].status,obj.data[i].idh], i);
				}
			}
			$("#content").unmask();
			_idh=_gunit.cells(_gunit.getRowId(0),_gunit.getColIndexById("idh")).getValue();
			
			getE2Header(_idh1, _idh2, _idh3, _idh4, function(header){
				$('#h1toh4').html(header[0].e2HeaderLeft);
			});
		});
	});
	_gsection.init();
	
//	dhtmlxEvent(window,"resize",function(){_gsection.setSizes();_gunit.setSizes();}); 
	var treemenu=new dhtmlXTreeObject("treeboxbox","100%","100%",0);
	treemenu.setSkin('dhx_skyblue');
	treemenu.setImagePath("dhtmlxTree/codebase/imgs/csh_bluebooks/");
	treemenu.enableThreeStateCheckboxes(true);
	treemenu.loadXMLString(getTree());
	treemenu.setOnClickHandler(tonclick);
	treemenu.attachEvent("onSelect", function(id){
		_idh4=null;
//		if(treemenu.getLevel(id)==2){
//			return
//		}else{
//			treemenu.setOnClickHandler(tonclick);
			if(treemenu.getOpenState(id)==-1)
				treemenu.openItem(id);
			else
				treemenu.closeItem(id);
			if(treemenu.getLevel(id)==3){
				_idh1=treemenu.getParentId(treemenu.getParentId(id));
				_idh2=treemenu.getParentId(id);
				_idh3=treemenu.getSelectedItemId();
			}
//		}

	});
	
	$('#next').click(function(){
		nextLine();
	});
	$('#previous').click(function(){
		previousLine();
	});
	
	$('#hide_unhide').click(function(){
		if(_hide==false){
			_hide=true;
			$('#display').hide();
			$('#hide_unhide').val('Unhide');
		}else{
			_hide=false;
			$('#display').show();
			$('#hide_unhide').val('Hide');
		}
	});
	
	$('#btnunit').click(function(){
		if($('#divunit').text()==''){
			_ukitUtil.getMessageById(56, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		gunithis.clearAll();
		$('#viewuitdetail').html('');
		$("#content").mask("Waiting...");
		searchUnit(_idh, $('#divunit').text(), function(unitHistory){			
			if(unitHistory!=null){
//				var csv='';
				for(var i=0, len=unitHistory.length; i<len; i++){
//					csv=csv+i+','+unitHistory[i].username+','+unitHistory[i].wg+','+unitHistory[i].description+','+unitHistory[i].date+'\n';
					gunithis.addRow(i, [unitHistory[i].username,unitHistory[i].wg,unitHistory[i].description,unitHistory[i].date], i);
					gunithis.setRowTextStyle(i, "font-family: Open Sans; font-size:15px");				
				}
//				gunithis.parse(csv,'csv');
				gunithis.adjustColumnSize(0);
				gunithis.adjustColumnSize(1);
				gunithis.adjustColumnSize(2);
				gunithis.adjustColumnSize(3);
//				csv=null;
				$("#content").unmask();
				viewHistory('#viewunithistory','UnitHistory');				
			}else{
				_ukitUtil.getMessageById(28, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
				$("#content").unmask();
			}		
		});
	});
	
	$('#submitunit').click(function(){
		if(_unitno==null){
			_ukitUtil.getMessageById(56, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		compareRearrange($('#divunit').text(), _idh, $('#word').html(),0);
	});
	$('#manualmode').click(function(){
		if(_unitno==null){
			_ukitUtil.getMessageById(56, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		compareRearrange($('#divunit').text(), _idh, $('#word').html(),1);
	});
	$('#confirm').click(function(){
		if($('#view').text()==''){
			_ukitUtil.getMessageById(62, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		_ukitUtil.getMessageById(59, _messageUI, function(msg){
			 dhtmlxs.confirm({
				 text: "<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
				 ok:"Yes",cancel:"No",
				 callback: function(result) {
					 if(result){
						 confirmSubmit(_unitno, _idh, $('#view').html(), _iduser, 2, $('#word').html(), function(success){
							 if(success.value=='true'){
								 $("#content").mask("Waiting...");
								 _gunit.clearAll();
								 searchUnitByH4Rearrange(_idh4, function(obj){
									 if(obj!=null){
										 for(var i=0, len=obj.data.length; i<len; i++){
											 _gunit.addRow(i, [obj.data[i].unit,obj.data[i].content,obj.data[i].status,obj.data[i].idh], i);
										 }
									 }
									 $("#content").unmask();
									 _unitno=null;
								 });							 
								 $('#word').html('');
								 $('#view').html('');
							 }
								 _unitno=null;
							 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
						 });
					 }	
				 }
			 });
		});
	});
	$('#unlocked').click(function(){
		if(_unitno==null || _unitno==0){
			_ukitUtil.getMessageById(56, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		_ukitUtil.getMessageById(60, _messageUI, function(msg){
			 dhtmlxs.confirm({
				 text: "<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
				 ok:"Yes",cancel:"No",
				 callback: function(result) {
					 if(result){
						 unlock(_unitno, _idh, function(success){
							 if(success.value=='true'){
								 $("#content").mask("Waiting...");
								 _gunit.clearAll();
									searchUnitByH4Rearrange(_idh4, function(obj){
										if(obj.value=='true'){
											for(var i=0, len=obj.data.length; i<len; i++){
												_gunit.addRow(i, [obj.data[i].unit,obj.data[i].content,obj.data[i].status,obj.data[i].idh], i);
											}
										}
										$("#content").unmask();
									});		
								 _unitno=null;
//								 $('#word').html('');
							 }
							 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
						 });
					 }	
				 }
			 });
		});
	});
	
	$('#save').click(function(){
		if($('#word').text()==''){
			_ukitUtil.getMessageById(62, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		_ukitUtil.getMessageById(61, _messageUI, function(msg){
			 dhtmlxs.confirm({
				 text: "<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
				 ok:"Yes",cancel:"No",
				 callback: function(result) {
					 if(result){
						 save(_unitno, _idh, _iduser,  $('#word').html(),function(success){
							 if(success.value=='true'){
								 $("#content").mask("Waiting...");
								 _gunit.clearAll();
									searchUnitByH4Rearrange(_idh4, function(obj){
										if(obj.value=='true'){
											for(var i=0, len=obj.data.length; i<len; i++){
												_gunit.addRow(i, [obj.data[i].unit,obj.data[i].content,obj.data[i].status,obj.data[i].idh], i);
											}
										}
										$("#content").unmask();
									});								 
//								 searchUnitByH4('before', _idh1, _idh2, _idh3, _idh4, _iduser, function(obj){
//									 if(obj.value=='true'){
//										 for(var i=0, len=obj.data.length; i<len; i++){
//											 _gunit.addRow(i, [obj.data[i].unit,obj.data[i].content,obj.data[i].status,obj.data[i].idh], i);
//										 }
//									 }
//									 $("#content").unmask();								
//								 });							 
//								 $('#view').html(''); $('#word').html('');
							 }
							 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
						 });
					 }	
				 }
			 });
		});		
	});
	
	$('#search').click(function(){
//		findMyText($('#find').val(), '');
		var str=$('#word').html();
		str.replace(/<\/?span[^>]*>/g,"");
		$('#word').html(str);
		findWord($('#find').val(),'word');
	});
	$('#replaceall').click(function(){
		replaceAll($('#word').html(), $('#find').val(), $('#findreplace').val(), 'word');
	});
	$('#replace').click(function(){
		var sel=window.getSelection();
		if(window.getSelection)			
			if(sel==$('#find').val())
				pasteHtmlAtCaret('<span class="highlightSearch">'+$('#findreplace').val()+'</span>', false);					          
			else{
				_ukitUtil.getMessageById(63, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
			}
		else
			replace_word($('#word').html(), $('#find').val(), $('#findreplace').val(), 'word');
		sel=null;
	});
	$('#find').click(function(){this.select();}); $('#findreplace').click(function(){this.select();});
//	$('#word').click(function(){
//		showCaretPos("word", "caretPos");
//	});
//	$('#word').keyup(function(){
//		showCaretPos("word", "caretPos");
//	});
//	$('#word').mouseup(function(){
//		showCaretPos("word", "caretPos");
//		var content=$('#word');
//		console.log(content);
//		var node=document.getElementById('word').parentNode.childNodes;
//		console.log(node[0].nextSibling.childNodes[2].nextElementSibling);
//		console.log(node[0].nextSibling.childNodes);
//		reply_click();
//	});
	
	$('#breakunit').click(function(){
		pasteHtmlAtCaret("##. ", false);
	});
	$('#breakparagraph').click(function(){
		pasteHtmlAtCaret("=== ", false);
	});
	$('#setfontbig').click(function(){
		_fontsize=_ukitUtil.setFontSize('big', 'word', _fontsize);
	});
	$('#setfontsmall').click(function(){
		_fontsize=_ukitUtil.setFontSize('small', 'word', _fontsize);
	});
});

function reply_click(e) {
	e = e || window.event;
	e = e.target || e.srcElement;	
	console.log(e);
	if (e.nodeName === 'LABEL' || e.nodeName === 'I') {
//		console.log(window.frames["comments"]);
//		console.log(document.getElementById('comments.document'));childNodes
//		console.log('T '+document.getElementById(e.id).parentNode);
		var node=document.getElementById(e.id).parentNode;
		console.log('node '+node.getAttribute("data-element"));
		var nodeList=node.nextSibling.childNodes;//.nextSibling.childNodes[0].nextElementSibling);
//		alert(nodeList.length);
		for (var index = 0, len=nodeList.length; index < len; index++) {
		    alert(nodeList[i]);
		}
		if(document.getElementById(e.id).parentNode.id!='word')
			_idword=document.getElementById(e.id).parentNode.id;
		else
			_idword=e.id;
////		_frame = window.frames["comments"].document;
////		_frame.getElementById('editor').innerHTML='';
//		_frame=$("#comments").contents().find("body");
//		_frame.find("#editor").html('');
//		$('#commentdetail').html('');
//		searchVariantTable(_idword);
	}
}

function tonclick(id) {	
	_gsection.clearAll();
	_gunit.clearAll();
	$('#editby').html('');
	$('#divunit').html('');
	$('#word').html('');
	$('#view').html('');
	$('#h1toh4').html('');
	$("#content").mask("Waiting...");
	searchSectionOverviewGrid(id, function(objSection){
    	if(objSection.value=='true'){
//    		var allrow=_gsection.getRowsNum();
//    		for(var d=0; d<=allrow; d++){
//    			_gsection.deleteRow(d);
//    		}

    		for(var i=0, len=objSection.data.length; i<len; i++){
    			_gsection.addRow(i, [objSection.data[i].detail,objSection.data[i].number,objSection.data[i].line,objSection.data[i].idh3,
    			                     objSection.data[i].id], i); 
    		}    	
    	}//else
//    		dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+objSection.description);
    	$("#content").unmask();
	});
};


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

function nextLine(){
	try{
		if(_idcurent!=null){
			if(_idcurent<_gunit.getRowsNum()-1){
				_idcurent++;
				_gunit.selectRowById(_idcurent);
				$('#divunit').html(_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("unitno")).getValue());
				getMainContent(_idh, $('#divunit').text(), 0, function(content){
					if(content.value=='true')
						$('#word').html(content.description);
					else{
						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+content.description);
						$('#word').html('');
					}	
				});
				searchLatestUser(_idh, $('#divunit').text());
			}
		}else{
			if(_isSelectUnit){
				_idcurent=0;
				_gunit.selectRowById(_idcurent);
				$('#divunit').html(_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("unitno")).getValue());
				getMainContent(_idh, $('#divunit').text(), 0, function(content){
					if(content.value=='true')
						$('#word').html(content.description);
					else{
						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+content.description);
						$('#word').html('');
					}	
				});
				searchLatestUser(_idh, $('#divunit').text());
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

function previousLine(){
	try{
		if(_idcurent>0){
			_idcurent--;
			_gunit.selectRowById(_idcurent);
			$('#divunit').html(_gunit.cells(_gunit.getRowId(_idcurent),_gunit.getColIndexById("unitno")).getValue());
			getMainContent(_idh, $('#divunit').text(), 0, function(content){
				if(content.value=='true')
					$('#word').html(content.description);
				else{
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+content.description);
					$('#word').html('');
				}					
			});
			searchLatestUser(_idh, $('#divunit').text());
		}
	}catch(e){
		alert('previouseLine '+e.message);
	}
}

function getMainContent(idh,unitno,flag,fn){
	var datas={'idh':idh,'unitno':unitno,'flag':flag};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
			url: baseUrl+"/service/Rearrange",
			data: JSON.stringify(strArray),
			dataType : "json",
			type : "POST",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
            headers: {
                "act":"getMainContent"
            },
			success: function(obj) {
			fn(obj);
		}, 
		error: function(data) {
			if (data.responseText != null && data.responseText != "") {
				alert(data.responseText);
			}
		}
		});
	}catch(e){
		alert('submitUnit '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

function searchLatestUser(idh,unitno){
	var datas={'idh':idh,'unitno':unitno};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
			url: baseUrl+"/service/Rearrange",
			data: JSON.stringify(strArray),
			dataType : "json",
			type : "POST",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
            headers: {
                "act":"searchLatestUser"
            },
			success: function(lastsubmit) {
				$('#editby').html('<b>Edited by: </b>'+lastsubmit.description);
		}, 
		error: function(data) {
			if (data.responseText != null && data.responseText != "") {
				alert(data.responseText);
			}
		}
		});
	}catch(e){
		alert('getInfocardPicture '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

function compareRearrange(unitno,idh,ft,flag){
	var datas={'unitno':unitno,'idh':idh,'ft':ft,'flag':flag};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
			url: baseUrl+"/service/Rearrange",
			data: JSON.stringify(strArray),
			dataType : "json",
			type : "POST",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
            headers: {
                "act":"compareRearrange"
            },
			success: function(tag) {
				if(tag.value=='true')
					$('#view').html(tag.description);
				else
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+tag.description);
		}, 
		error: function(data) {
			if (data.responseText != null && data.responseText != "") {
				alert(data.responseText);
			}
		}
		});
	}catch(e){
		alert('confirmSubmit '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

function confirmSubmit(unitno,idh,ft,iduser,idpage,word,fn){
	var datas={'unitno':unitno,'idh':idh,'ft':ft,'iduser':iduser,'idpage':idpage,'word':word};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
			url: baseUrl+"/service/Rearrange",
			data: JSON.stringify(strArray),
			dataType : "json",
			type : "POST",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
            headers: {
                "act":"confirmSubmit"
            },
			success: function(obj) {
				fn(obj);
		}, 
		error: function(data) {
			if (data.responseText != null && data.responseText != "") {
				alert(data.responseText);
			}
		}
		});
	}catch(e){
		alert('confirmSubmit '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

function unlock(unitno,idh,fn){
	var datas={'unitno':unitno,'idh':idh};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
			url: baseUrl+"/service/Rearrange",
			data: JSON.stringify(strArray),
			dataType : "json",
			type : "POST",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
            headers: {
                "act":"unlock"
            },
			success: function(obj) {
				fn(obj);
		}, 
		error: function(data) {
			if (data.responseText != null && data.responseText != "") {
				alert(data.responseText);
			}
		}
		});
	}catch(e){
		alert('unlock '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

function save(unitno,idh,iduser,ft,fn){
	var datas={'unitno':unitno,'idh':idh,'iduser':iduser,'ft':ft};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
			url: baseUrl+"/service/Rearrange",
			data: JSON.stringify(strArray),
			dataType : "json",
			type : "POST",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
            headers: {
                "act":"save"
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
		alert('confirmSubmit '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}


function searchUnitByH4Rearrange(idh4 ,fn){
    try{
		$.ajax({
            url: baseUrl+"/service/Rearrange",
            data: "act=searchUnitByH4&h4="+idh4+'&rnd='+Math.random(),
            dataType: "json",
            type: "GET",
            async: true,
            cache: false,
            contentType: "application/json",
            success: function(obj) {
            	fn(obj);
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
    }catch(e){
        alert('epcontroller: searchUnitByH4 '+e.message);
    }
}

function findMyText(needle, replacement) {
	var haystackText = "";
    //if (haystackText.length == 0) {
          haystackText = document.getElementById("word").innerHTML;
     //}
     var match = new RegExp(needle, "g");
     var replaced = "";
     if (replacement.length > 0) {
          replaced = haystackText.replace(match, replacement);		 
     }
     else {
          var boldText = "<div style=\"background-color: yellow; display: inline; font-weight: bold;\">" + needle + "</div>";
          replaced = haystackText.replace(match, boldText); //replace all
		  //alert(haystackText.search('test'));
     }
	 //replaced=replaced.replace('ff','EEEEE'); replace ทีละตัว
     document.getElementById("word").innerHTML = replaced;
	 
}