var grid=null;
var gridpicture=null;
//var _ukitUtil=null;
var geds=null;
var gunit=null;
var gfootnote=null;
var gemendation=null;
var gcomment=null;
var gunithis=null;
var img=null;
var _objUnit=null;
var _objH4=null;
var _mapUnit = null;
var _idunit=null;
var _idh=null;
var _idword=null;
var _objUnitHilight=null;
var _isLoadUnit=null;
var _idCurent=null;
var _ctyValue=null;
var _pattern=null;
var _idrowvariant=null;
var _frame=null;
var _idcomment=null;
var _reasonComment=null;
var _timerId=null;
var _footnoteHistory=null;
var _emendationHistory=null;
var _commentHistory=null;
var _fontsize=22;
var _idrow=null;
var _idwordgroup=null;
var _wordgroup=null;
var _gService = null;
var _button=null;
var _haveEdit=false;
$(document).ready(function(){	
//	window.location.hash='xxx';
//	window.location.host='test';	
	_gService = new GroupService();
	_objH4=window.dialogArguments;
	_objUnit=_objH4.objSection;
	_mapUnit=new Array();
	_isLoadUnit=false;
	_idCurent=0;
	_idrowvariant=0;
	_idcomment=0;
	_idrow=0;
	$('#content').panel({
		title:_objH4.e2Header[0].e2HeaderRight
	});
	if(_objUnit.value=='check'){
		var content_=new contentService();
		dhtmlxs.confirm({
			text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+_objUnit.description,
			ok:"Yes", cancel:"No", callback:function(result){
				if(result){
					$("#content").mask("Waiting...");					
					content_.resetUnit(_objH4.idh4, 0, _iduser, function(success){
						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);						
						window.close();
						$("#content").unmask();
					});
//					content=null;
//					return;
				}else{
					content_.getBaseText(_objH4.idh4, 0, _iduser, function(success){
						if(success.value=='true'){
							var objReset=new Object();
							objReset.data=success.data;
							objReset.h1toh4=_objH4.e2Header[0].e2HeaderRight.substring(0,_objH4.e2Header[0].e2HeaderRight.lastIndexOf('>')+1);
						    objReset.unit=success.data[3];
							_ukitUtil.closePopup('windowsname2');
							_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'resetblock.jsp',objReset,'windowsname2'); 
						}else{
							if(success.data==null){
								dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);		
							}else{
								viewDiference(success.description, success.data);
							}							
						}
						$("#content").unmask();
					});
				}
			}
		 });
	}
//	alert(_objUnit.length);
//	document.title=obj.title;
	_idunit=0;//default 
	$('#basetexname').html(_objH4.e2Header[0].e2HeaderLeft);
	$('#previous').html('<<');
	$("#previous").css("fontSize", 24);
	$('#next').html('>>');
	$("#next").css("fontSize", 24);
	$('#lblgroup').css('fontSize',16);
	$('#show').css('fontSize',12);
	$("#show").css("font-family", "Open Sans");	
	$('#divfootnote').css('fontSize',22);
	$("#divfootnote").css("font-family", "Open Sans");		
	if(_objUnit!=null && _objUnit.data!=null){
		$('#unitno').html(_objUnit.data[0].unit);
		$('#unitno').css("fontSize", 24);
		$('#unitno').css("font-weight", "bold");
		_idh=_objUnit.data[0].idh;
		_idunit=_objUnit.data[0].unit;
	}else{
		_idh=0;
		_idunit=0;
		$('#unitno').html('');
	}
	
	$('#unitno').html((_objUnit.data!=null)?_objUnit.data[0].unit:'');
	$("#word").css("fontSize", _fontsize);
	$("#word").css("font-family", "Open Sans");		
//	_ukitUtil = new UkitUtil();
	grid =_ukitUtil.createDhtmlxGrid('gvariant');
	grid.setImagePath("dhtmlxGrid/codebase/imgs/");
	grid.setHeader("&nbsp;,<div align='center'>Variant</div>,<div align='center'>B</div>,<div align='center'>C</div>,<div align='center'>K</div>,<div align='center'>L</div>,<div align='center'>MSS</div>,<div align='center'>Eds</div>,<div align='center'>Comm.</div>");
	grid.setColumnIds("space,Variant,B,C,K,L,MSS,Eds,Cty");
	grid.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif","", "");
//	grid.setInitWidths("30,100,50,50,50,50,50,50,200");
	grid.setColAlign("right,left,left,right,left,left,left,left,left");
	grid.setColTypes("ch,ed,ed,ed,ed,ed,ed,ed,ro");
	grid.setSkin('modern');
//	grid.attachEvent("onRowSelect", doVariant);
//	grid.attachEvent("onEditCell",doOnEditCell);
	grid.enableColumnAutoSize(true);		
//	grid.enableAutoWidth(true);
	grid.init();

	for(var i=0, len=grid.getRowsNum(); i<len-1; i++){
		for(var j=1, lencol=grid.getColumnCount(); j<lencol;j++){
			grid.cells(i,j).setDisabled(true);	
		}
//		grid.lockRow(i, true);
	}
	gridpicture=_ukitUtil.createDhtmlxGrid('gpicture');
	gridpicture.setImagePath("dhtmlxGrid/codebase/imgs/");
	gridpicture.setHeader("Abbr,Filename,line,name,date,time,server,folder");
	gridpicture.setColumnIds("abbr,filename,line,name,date,time,server,folder");
	gridpicture.setInitWidths("60,180,0,0,0,0,0,0");
//	gridpicture.enableAutoWidth(true);
	gridpicture.setColAlign("left,left,left,left,left,left,left,left");
	gridpicture.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro");
	gridpicture.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif","", "");
	gridpicture.setSkin('modern');
	gridpicture.attachEvent("onRowSelect", doRowSelect);
//	gridpicture.enableColumnAutoSize(true);
//	gridpicture.enableAutoWidth(true,600,100);
	gridpicture.init();

	geds=_ukitUtil.createDhtmlxGrid('geds');
	geds.setImagePath("dhtmlxGrid/codebase/imgs/");
	geds.setHeader("Editions,Vol.Page,line,name,date,time,server,folder,filename");
	geds.setColumnIds("eds,vp,line,name,date,time,server,folder,filename");
	geds.setInitWidths("120,0,0,0,0,0,0,0,120");
	geds.setColAlign("left,left,left,left,left,left,left,left,left");
	geds.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro");
	geds.setSkin('modern');
	geds.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif","", "");
	geds.attachEvent("onRowSelect", doRowSelectEds);
//	geds.enableColumnAutoSize(true);
//	geds.enableAutoWidth(true,600,100);
	geds.init();

	gunit=_ukitUtil.createDhtmlxGrid('gunit');
	gunit.setImagePath("dhtmlxGrid/codebase/imgs/");
	gunit.setHeader("Unit,Content,Status,idh");
	gunit.setColumnIds("unit,content,status,idh");
	gunit.setInitWidths("40,180,80,0");
	gunit.setColAlign("center,center,left,left");
	gunit.setColTypes("ro,ro,ro,ro");
	gunit.setSkin('modern');
	gunit.attachEvent("onRowSelect",function(id,ind){
		if(_isLoadUnit){
			gunit.selectRowById(_idCurent);
			_ukitUtil.getMessageById(29, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
//		console.log(JSON.stringify(_objUnit));		
		$("#content").mask("Waiting...");
		clearGroup();
		_idrow=id;
		_idunit=_objUnit.data[id].unit;
		_idh=_objUnit.data[id].idh;
		checkButtonUnit(_idh,_idunit);
		$('#word').html('Loading............');
		grid.clearAll();
		gridpicture.clearAll();
		geds.clearAll();
		$('#word').html(_objUnit.data[id].detail);
		
		_objUnitHilight=$('#word').text();		
		_idCurent=id;
		if(gunit.cells(gunit.getRowId(id),gunit.getColIndexById("unit")).getValue()!=''){
			clearInterval(_timerId);
			_myProgressBar.setValue(0);		
			loadProgressBar();
			searchH4DetailByUnitno(gunit.cells(gunit.getRowId(id),gunit.getColIndexById("unit")).getValue(),_iduser,function(obj){
				if(obj.value=='check'){
					var content=new contentService();
					dhtmlxs.confirm({
						text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+obj.description,
						ok:"Yes", cancel:"No", callback:function(result){							
							if(result){
								$("#content").mask("Waiting...");								
								content.resetUnit(_objH4.idh4, _objUnit.data[id].unit, _iduser, function(success){
									dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);						
									window.close();
									$("#content").unmask();
								});
								content=null;
								return;
							}else{
								content.getBaseText(_objH4.idh4, _objUnit.data[id].unit, _iduser, function(success){
									if(success.value=='true'){
										var objReset=new Object();
										objReset.data=success.data;
										objReset.h1toh4=_objH4.e2Header[0].e2HeaderRight;
										objReset.unit=_objUnit.data[id].unit;
										_ukitUtil.closePopup('windowsname2');
										_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'resetblock.jsp',objReset,'windowsname2'); 
									}else{
										if(success.data==null){
											dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);		
										}else{
											viewDiference(success.description, success.data);
										}
									}
									$('#unitno').html(_objUnit.data[id].unit);
									$("#content").unmask();
									clearInterval(_timerId);
									_myProgressBar.setValue(0);	
									_isLoadUnit=false;
									$('#word').html('');
								});
//								$('#unitno').html(_objUnit.data[id].unit);
//								$("#content").unmask();
//								clearInterval(_timerId);
//								_myProgressBar.setValue(0);	
//								_isLoadUnit=false;
//								$('#word').html('');
							}
						}
					 });
				}else{
					$('#unitno').html(_objUnit.data[id].unit);
					$("#content").unmask();
				}
			});
		}else{
			$("#content").unmask();
			_ukitUtil.getMessageById(30, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
		}			
	});
//	gunit.attachEvent("onRowSelect",function(id,ind){
//		_idrow=id;
//		_idunit=_objUnit[id].unit;
//		_idh=_objUnit[id].idh;
//		if(_isLoadUnit==false){
//			if(id==0){
//				$('#word').html(_objUnit[id].detail);
//				_objUnitHilight=$('#word').text();
//				$('#unitno').html(_objUnit[id].unit);
//			}else{
////				alert(_mapUnit.length+' '+id);
//				if(_mapUnit.length<id){
//					$('#word').html('Loading............');
//					grid.clearAll();
//					clearInterval(_timerId);
//					_myProgressBar.setValue(0);		
//					loadProgressBar();
//					if(_mapUnit.length==0){
//						_isLoadUnit=true;
//						_idCurent=id;
//						searchH4DetailByUnitno(gunit.cells(gunit.getRowId(id),gunit.getColIndexById("unit")).getValue(),_iduser);
//					}						
//					else{
//						var nodata=false;
//						for(var i=0; i<_mapUnit.length; i++){
//							if(_mapUnit[i].unitno==gunit.cells(gunit.getRowId(id),gunit.getColIndexById("unit")).getValue()){
//								$('#word').html(_mapUnit[i].detail);
//								_objUnitHilight=$('#word').text();
//								$('#unitno').html(_objUnit[id].unit);
//								break;
//							}else{
//								nodata=true;
//							}
//						}
//						if(nodata==true){
//							_isLoadUnit=true;
//							_idCurent=id;
//							searchH4DetailByUnitno(gunit.cells(gunit.getRowId(id),gunit.getColIndexById("unit")).getValue());
//						}nodata=null;
//					}
//				}else{
//					$('#word').html(_mapUnit[id-1].detail);
//					_objUnitHilight=$('#word').text();
//					$('#unitno').html(_objUnit[id].unit);
//				}
//			}				
//		}else{
//			gunit.selectRowById(_idCurent);
//			dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'><b>Please Waiting to Load Unit !</b>");
//		}
//	});
	gunit.init();
	genUnit();

	gfootnote=_ukitUtil.createDhtmlxGrid('gfootnote');
	gfootnote.setImagePath("dhtmlxGrid/codebase/imgs/");
	gfootnote.setHeader("Username,Word/Group,date");
	gfootnote.setColumnIds("username,wordgroup,date");
	gfootnote.setInitWidths("120,120,120");
	gfootnote.setColAlign("left,left,left");
	gfootnote.setColTypes("ro,ro,ro");
	gfootnote.setSkin('modern');
	gfootnote.enableMultiline(false);
	gfootnote.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif","", "");
	gfootnote.setColSorting("na,str,str");
	gfootnote.attachEvent("onRowSelect", function(id,cellid){
		$("#viewfootnotedetail").css("fontSize", 15);
		$("#viewfootnotedetail").css("font-family", "Open Sans");	
		var html=_footnoteHistory.data[id].ft;
		html=_ukitUtil.replaceAll("<<", "&lt;&lt;", html);
		$('#viewfootnotedetail').html(html);
		html=null;
	});
	gfootnote.init();
	
	gemendation=_ukitUtil.createDhtmlxGrid('gemendation');
	gemendation.setImagePath("dhtmlxGrid/codebase/imgs/");
	gemendation.setHeader("Username,Word/Emendation,date");
	gemendation.setColumnIds("username,wordemendation,date");
	gemendation.setInitWidths("120,120,120");
	gemendation.setColAlign("left,left,left");
	gemendation.setColTypes("ro,ro,ro");
	gemendation.setSkin('modern');
	gemendation.enableMultiline(false);
	gemendation.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif","", "");
	gemendation.setColSorting("na,str,str");
	gemendation.attachEvent("onRowSelect", function(id,cellid){
		$("#viewemendationdetail").css("fontSize", 15);
		$("#viewemendationdetail").css("font-family", "Open Sans");	
		$('#viewemendationdetail').html(_emendationHistory.data[id].wg);
	});
	gemendation.init();
	
	gcomment=_ukitUtil.createDhtmlxGrid('gcomment');
	gcomment.setImagePath("dhtmlxGrid/codebase/imgs/");
	gcomment.setHeader("Username,Word/Group,date");
	gcomment.setColumnIds("username,wordgroup,date");
	gcomment.setInitWidths("120,120,120");
	gcomment.setColAlign("left,left,left");
	gcomment.setColTypes("ro,ro,ro");
	gcomment.setSkin('modern');
	gcomment.enableMultiline(false);
	gcomment.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif","", "");
	gcomment.setColSorting("na,str,str");
	gcomment.attachEvent("onRowSelect", function(id,cellid){
		$("#viewcommentdetail").css("fontSize", 15);
		$("#viewcommentdetail").css("font-family", "Open Sans");	
		$('#viewcommentdetail').html(_commentHistory.data[id].description);
	});
	gcomment.init();
	
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
//	gunithis.attachEvent("onRowSelect", function(id,cellid){
//		$("#viewunitdetail").css("fontSize", 15);
//		$("#viewunitdetail").css("font-family", "Open Sans");	
//		$('#viewunitdetail').html(_commentHistory[id].description);
//	});
	gunithis.init();
	
	var content=new contentService();//lock ui
	content.checkBasetextStatus(_objH4.idh4, 4, function(success){
		if(success.value=='false')
			$("#up_div").show();
	});
	content=null;
	$('#txtsearch').click(function(){this.select();});
	$('#search').click(function(){
		//searchPrompt_div($('#txtsearch').val(), true, 'green', 'pink' , 'word');
		findWord();
	});

	$('#btntest').click(function(){
		searchH4();
	});

	$('#next').click(function(){
		if(_isLoadUnit){
			gunit.selectRowById(_idCurent);
			_ukitUtil.getMessageById(29, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		nextUnit();
	});

	$('#previous').click(function(){
		if(_isLoadUnit){
			gunit.selectRowById(_idCurent);
			_ukitUtil.getMessageById(29, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		previousUnit();
	});

	$('#word').click(function(){
		reply_click();
		if($("#chkgroup").is(':checked')){
			if(_idwordgroup==null){
				_wordgroup=''; _idwordgroup=new Array();
			}				
			checkDuplicateIdWord(_idwordgroup,_idword, function(have){
				if(!have){
					_idwordgroup.push(_idword);
					_wordgroup=_wordgroup+$('#'+_idword).html()+'&nbsp;';
					$('#lblgroup').html(_wordgroup);
				}
			});

		}else{
			_wordgroup=null; _wordgroup=null;
		}			
		
		searchFootnoteByFcrid(_idword, _iduser, 2, function(footnote){
			if(footnote.value=='true')
				$('#viewfootnote').prop('checked', true);
			else
				$('#viewfootnote').prop('checked', false);		
			var htmlreplace=new html();
			htmlreplace.replaceTag(footnote.description, function(tmpPattern){
				$('#divfootnote').html(tmpPattern);	
			});		
			htmlreplace=null;
		});
	});
	
	$('#favorites').click(function(){
		favorites(_idword, _iduser, 2, function(success){
			 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
//			if(sucess){
//				_ukitUtil.getMessageById(31, _messageUI, function(msg){
//					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
//				});
//			}
//			else{
//				_ukitUtil.getMessageById(32, _messageUI, function(msg){
//					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
//				});
//			}				
		});
	});

	$('#save').click(function(){
		var pattern=new Array();
		var isSelect=grid.getCheckedRows(0);
		var tmpPattern=null;
		isSelect=isSelect.split(',');
		for(var i=0, len=isSelect.length; i<len; i++){
			if(isSelect[i]!=''){
				tmpPattern=_ukitUtil.replaceAll('&lt;', '<', grid.cells(isSelect[i],1).getValue());
				tmpPattern=_ukitUtil.replaceAll('&gt;', '>',tmpPattern);
				pattern.push(tmpPattern);
				tmpPattern=null;
			}	
			else
				pattern=null;
		}
//		_frame = window.frames["comment"].document;
		_frame=$("#comments").contents().find("body");
		 saveE2(_idword, JSON.stringify(pattern), _idcomment,_frame.find("#editor").html(), _iduser, 2,function(success){
			 
//			 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
			 if(success.value=='true'){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
				 _idcomment=0;
				_frame.find("#editor").html('');
				 searchPatternLabel(_idword, function(pattern){					 
					 if(pattern.value=='true'){
//						 console.log(pattern.description);
//						 pattern.description=_ukitUtil.replaceAll('<<', '&lt;&lt;', pattern.description);
//						 pattern.description=_ukitUtil.replaceAll('>>', '&gt;&gt;',pattern.description);
						 var word = $('#word').html();
						 var tag= document.getElementById(_idword);
//						 console.log(tag.outerHTML);
//						 console.log(pattern.description);
//						 console.log(word);
						 word=word.replace(tag.outerHTML,pattern.description);
						 $('#word').html(word);
						 _objUnit.data[_idrow].detail=word;
//						 if(_idunit!=0)
//							 _mapUnit[_idunit-1].detail=word;

						 word=null; tag=null;
					 }else
						 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+pattern.description);
				 });
			 }else if(success.value=='check'){
				 var content=new contentService();
					dhtmlxs.confirm({
						text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description,
						ok:"Yes", cancel:"No", callback:function(result){
							if(result){
								$("#content").mask("Waiting...");								
								content.resetUnit(_objH4.idh4, _objUnit.data[_idCurent].unit, _iduser, function(success){
									dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);						
									window.close();
									$("#content").unmask();
								});
								content=null;
								return;
							}else{
								content.getBaseText(_objH4.idh4, _objUnit.data[_idCurent].unit, _iduser, function(success){
									if(success.value=='true'){
										var objReset=new Object();
										objReset.data=success.data;
										objReset.h1toh4=_objH4.e2Header[0].e2HeaderRight;
										objReset.unit=_objUnit.data[_idCurent].unit;
										_ukitUtil.closePopup('windowsname2');
										_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'resetblock.jsp',objReset,'windowsname2'); 
									}else{
										if(success.data==null){
											dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);		
										}else{
											viewDiference(success.description, success.data);
										}
									}
									$("#content").unmask();
								});
							}
						}
					 });
			 }else
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
		 });
	});
	
	$('#getReasoncomment').click(function(){
		getReasonCommentChoice(_idword, _iduser);
	});
	
	$('#viewfootnote').click(function(){
		if($('#viewfootnote').is(':checked')){
			$("#content").mask("Waiting...");
			showFootnote(_idword, _iduser, 2, function(footnote){
				if(footnote.value=='true'){
					var htmlreplace=new html();
					htmlreplace.replaceTag(footnote.description, function(tmpPattern){
						$('#divfootnote').html(tmpPattern);	
					});		
					htmlreplace=null;
				}					
				else
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+footnote.description);
				$("#content").unmask();
			});
		}else{
			deleteFootnote(_idword, function(success){
				if(success)
					$('#divfootnote').html('');
				else{
					_ukitUtil.getMessageById(33, _messageUI, function(msg){
						 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
					});
				}					
			});
		}
	});

	$('#getLastcomment').click(function(){
		popupChoiceReasonComment(_reasonComment);
	});
	
	$('#btnfootnote').click(function(){
		gfootnote.clearAll();
		$('#viewfootnotedetail').html('');
		$("#content").mask("Waiting...");
		searchFootnote(_idh, _idunit, function(footnoteHistory){
			if(footnoteHistory.value=='true'){
				_footnoteHistory=footnoteHistory;
				for(var i=0, len=footnoteHistory.data.length; i<len; i++){	
					gfootnote.addRow(i, [footnoteHistory.data[i].username,footnoteHistory.data[i].wg,footnoteHistory.data[i].date], i);
					gfootnote.setRowTextStyle(i, "font-family: Open Sans; font-size:15px");
				}
				gfootnote.adjustColumnSize(0);
				gfootnote.adjustColumnSize(1);
				gfootnote.adjustColumnSize(2);
				viewHistory('#viewfootnotehistory','FootnoteHistory');
				$("#content").unmask();
			}else{
				$("#content").unmask();
				_ukitUtil.getMessageById(28, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
			}		
		});
	});
	
	$('#btnemendation').click(function(){
		gemendation.clearAll();
		$('#viewemendationdetail').html('');
		$("#content").mask("Waiting...");
		searchEmendation(_idh, _idunit, function(emendationHistory){
			if(emendationHistory.value=='true'){
				_emendationHistory=emendationHistory;
//				console.log(_emendationHistory);
				for(var i=0, len=emendationHistory.data.length; i<len; i++){	
					gemendation.addRow(i, [emendationHistory.data[i].username,emendationHistory.data[i].we,emendationHistory.data[i].date], i);
					gemendation.setRowTextStyle(i, "font-family: Open Sans; font-size:15px");
				}
				gemendation.adjustColumnSize(0);
				gemendation.adjustColumnSize(1);
				gemendation.adjustColumnSize(2);
				viewHistory('#viewemendationhistory','EmendationHistory');
				$("#content").unmask();
			}else{
				$("#content").unmask();
				_ukitUtil.getMessageById(28, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
			}		
		});
	});
	
	$('#btncomment').click(function(){
		gcomment.clearAll();
		$('#viewcommentdetail').html('');
		$("#content").mask("Waiting...");
		searchComment(_idh, _idunit, function(commentHistory){
			
			if(commentHistory=='true'){
				_commentHistory=commentHistory;
				for(var i=0, len=commentHistory.data.length; i<len; i++){					
					gcomment.addRow(i, [commentHistory.data[i].username,commentHistory.data[i].wg,commentHistory.data[i].date], i);
					gcomment.setRowTextStyle(i, "font-family: Open Sans; font-size:15px");
				}
				gcomment.adjustColumnSize(0);
				gcomment.adjustColumnSize(1);
				gcomment.adjustColumnSize(2);
				viewHistory('#viewcommenthistory','CommentHistory');
				$("#content").unmask();
			}else{
				$("#content").unmask();
				_ukitUtil.getMessageById(28, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
			}		
		});
	});
		
	$('#btnunit').click(function(){
		gunithis.clearAll();
		$('#viewuitdetail').html('');
		$("#content").mask("Waiting...");
		searchUnit(_idh, _idunit, function(unitHistory){			
			if(unitHistory.value=='true'){
//				var csv='';
				for(var i=0, len=unitHistory.data.length; i<len; i++){
//					csv=csv+i+','+unitHistory[i].username+','+unitHistory[i].wg+','+unitHistory[i].description+','+unitHistory[i].date+'\n';
					gunithis.addRow(i, [unitHistory.data[i].username,unitHistory.data[i].wg,unitHistory.data[i].description,unitHistory.data[i].date], i);
					gunithis.setRowTextStyle(i, "font-family: Open Sans; font-size:15px");
				}
//				gunithis.parse(csv,'csv');
				gunithis.adjustColumnSize(0);
				gunithis.adjustColumnSize(1);
				gunithis.adjustColumnSize(2);
				gunithis.adjustColumnSize(3);
				csv=null;
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
	
	$('#setfontbig').click(function(){
		_fontsize=_ukitUtil.setFontSize('big', 'word', _fontsize);
	});
	$('#setfontsmall').click(function(){
		_fontsize=_ukitUtil.setFontSize('small', 'word', _fontsize);
	});
	_myProgressBar = new ProgressBar("my_progress_bar_1",{
		borderRadius: 10,
		width: 280,
		height: 20,
		maxValue: 100,
		labelText: "Loaded in {value,0} %",
		orientation: ProgressBar.Orientation.Horizontal,
		direction: ProgressBar.Direction.LeftToRight,
		animationStyle: ProgressBar.AnimationStyle.LeftToRight1,
		animationSpeed: 1.5,
		imageUrl: 'images/h_bg1.png',
		backgroundUrl: 'images/h_bg3.png',
		markerUrl: 'images/marker2.png'
	});
	
	$("#chkgroup").click(function () {
		if(this.checked){
			$('#lblgroup').html('');
		}else{
			$('#lblgroup').html('');
			_idwordgroup=null;
			_wordgroup=null;
		}
	});
	
	$('#group').click(function(){
		if(_idwordgroup!=null){		
			if(_idwordgroup.length==1){
				_ukitUtil.getMessageById(39, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
				return
			}
			_ukitUtil.getMessageById(34, _messageUI, function(msg){
				dhtmlxs.confirm({
					text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
					ok:"Yes", cancel:"No", callback:function(result){
						if(result){
							$("#content").mask("Waiting...");
							_gService.groupungroup(_idwordgroup, _iduser, 0, 1, function(success){
								dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
								if(success.value=='true')
									refreshWord(success.description.substr(success.description.indexOf('\n'),success.description.length-1),'group');		
								$("#content").unmask();
							});
							return;
						}
					}
				 });
			});	
		}else{
			_ukitUtil.getMessageById(40, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
		}
	});
	
	$('#ungroup').click(function(){
		if(_idwordgroup!=null){
			_ukitUtil.getMessageById(35, _messageUI, function(msg){
				dhtmlxs.confirm({
					text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
					ok:"Yes", cancel:"No", callback:function(result){
						if(result){
							$("#content").mask("Waiting...");
							_gService.groupungroup(_idwordgroup, _iduser, 0, 0, function(success){
								dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
								if(success.value=='true')
									refreshWord(success.description.substr(success.description.indexOf('\n'),success.description.length-1),'ungroup');
								$("#content").unmask();
							});
							return;
						}
					}
				});
			});
		}else{
			_ukitUtil.getMessageById(40, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
		}
	});
	
	$('#submit').click(function(){
		_ukitUtil.getMessageById(36, _messageUI, function(msg){
			dhtmlxs.confirm({
				text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
				ok:"Yes", cancel:"No", callback:function(result){
					if(result){
						submitUnit(_idh, _idunit, _iduser, 2, function(success){
							if(success.value=='true'){
								dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
								$("#content").mask("Waiting...");
								searchUnitByH4('before', _objH4.idh1, _objH4.idh2, _objH4.idh3, _objH4.idh4, _iduser, function(objSection){
									if(objSection!=null){
										_objUnit=objSection;
										genUnit();	
										gunit.selectRowById(_idCurent);
										clearInterval(_timerId);
										_myProgressBar.setValue(0);		
										loadProgressBar();
										searchH4DetailByUnitno(gunit.cells(gunit.getRowId(_idCurent),gunit.getColIndexById("unit")).getValue(),_iduser,function(o){
											$('#unitno').html(_objUnit.data[_idCurent].unit);
											$("#content").unmask();		
										});
									}else{
										_ukitUtil.getMessageById(41, _messageUI, function(msg){
											 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
										});
									}
								});
							}else if(success.value=='check'){
								var content=new contentService();
								dhtmlxs.confirm({
									text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description,
									ok:"Yes", cancel:"No", callback:function(result){
										if(result){
											$("#content").mask("Waiting...");											
											content.resetUnit(_objH4.idh4, _objUnit.data[_idCurent].unit, _iduser, function(success){
												dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);						
												window.close();
												$("#content").unmask();
											});
											content=null;
											return;
										}else{
											content.getBaseText(_objH4.idh4, _objUnit.data[_idCurent].unit, _iduser, function(success){
												if(success.value=='true'){
													var objReset=new Object();
													objReset.data=success.data;
													objReset.h1toh4=_objH4.e2Header[0].e2HeaderRight;
													objReset.unit=_objUnit.data[_idCurent].unit;
													_ukitUtil.closePopup('windowsname2');
													_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'resetblock.jsp',objReset,'windowsname2');  
												}else{
													if(success.data==null){
														dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);		
													}else{
														viewDiference(success.description, success.data);
													}
												}
												$("#content").unmask();
											});
										}
									}
								 });
							}else
								dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
						});
						return;
					}
				}
			});
		});
	});
	$('#unlock').click(function(){
		_ukitUtil.getMessageById(37, _messageUI, function(msg){
			dhtmlxs.confirm({
				text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
				ok:"Yes", cancel:"No", callback:function(result){
					if(result){
						var content=new contentService();
						content.resetUnit(_objH4.idh4, _objUnit.data[_idCurent].unit, _iduser, function(success){
							dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
							window.close();
							$("#content").unmask();
						});
						content=null;
						return;
					}
				}
			});
		});
	});
	
	$('#tools').click(function(){
		window.open('./url?operation=Tools&amp;id=8&amp;menu=Tools&amp;page_id=8', '');
	});
	
	checkButtonUnit(_idh,_idunit);
	
	$('#editfootnote').click(function(){
		if($('#divfootnote').html()==''){
			_ukitUtil.getMessageById(106, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}else
			editFootnote();
	});	
});
function checkUnit(idh,unitno,fn){
	var datas={'idh':idh,'unitno':unitno};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
				url: baseUrl+"/E2",
				data: JSON.stringify(strArray),
				dataType : "json",
				type : "POST",
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
	            headers: {
	                "param":"checkUnit"
	            },
				success: function(idstatus) {
					if(idstatus>=3)
						fn(true);
					else
						fn(false);
				}, 
				error: function(data) {
					if (data.responseText != null && data.responseText != "") {
						alert(data.responseText);
					}
				}
		});
	}catch(e){
		alert('checkUnit '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}
function callCty(){
	$('#divcty').show();
	jQuery("#divcty").dialog({
		modal: true,
		buttons: [{
			text:'OK',
			handler:function(){
				$('#divcty').dialog("close");
				var chk=document.getElementsByName("cty");
				var selected='';
				var Cty = '';
				for(var i=0, len=chk.length;i<len; i++){
					if(chk[i].checked==true){
						selected=selected+chk[i].value+',';
						Cty=Cty+chk[i].id+',';
						chk[i].checked=false;
					}
				}
				chk=null; 
//				if(Cty!=''){
					saveCommentary(_pattern, _idword, Cty.substring(0, Cty.length-1), _iduser,function(isSave){
						if(isSave){
							var btn='<input type="button" value="{cty}">';
							btn=btn.replace('{cty}', selected.substring(0, selected.length-1));                            	
							grid.cells(_idrowvariant,grid.getColIndexById('Comm.')).setValue(btn);
						}
						Cty=null;
						selected=null;
					});
//				} 
				
			}
		},{
			text:'Cancel',
			handler:function(){
				$('#divcty').dialog("close");
			}
		}],

		autoOpen: false,
		title:"Comm.",
		height:200,
		width:440
	});
	$( "#divcty" ).dialog( "open" );
}

function deliveryService() {
	$('#divcomment').show();
	jQuery('#divcomment').dialog({
		modal: true,
		buttons: [{
			text:'Save',
			handler:function(){
				$('#divcomment').dialog("close");
				var chk=document.getElementsByName("reasonchoice");
				var idreason=''; var value='';
				for(var i=0, len=chk.length;i<len; i++){
//					alert(document.getElementById(chk[i].id).checked);
					if(chk[i].checked){
						idreason=idreason+chk[i].id+'|';
						value=value+chk[i].value+';&nbsp;';
//						chk[i].checked=false;
					}
				}
//				alert(idreason);
				saveReasonComment(_idword, 2, _iduser, idreason.substring(0, idreason.length-1),function(success){
					if(success){
						$('#commentdetail').html(value);
//						_frame = window.frames["comments"].document;
//						_frame.getElementById('editor').innerHTML=value;
						_frame=$("#comments").contents().find("body");
						_frame.find("#editor").html(value);
//						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
					}
					value=null;
				}); 
				idreason=null; chk=null;
			}
		},{
			text:'Cancel',
			handler:function(){
				$('#divcomment').dialog("close");
			}
		}],

		autoOpen: false,
		title:"Add a Reason",
		height:500,
		width:600
	});
	$( "#divcomment" ).dialog( "open" );
}

function editFootnote() {		
	$('<link rel="stylesheet" href="ckeditor/lib/css/samples.css" type="text/css" />').appendTo('head');
	if(_haveEdit==false)
		initSample();
	_haveEdit=true;
	CKEDITOR.instances.editor.setData( $('#divfootnote').html());
	$('#viewfootnoteedit').show();	
	jQuery('#viewfootnoteedit').dialog({		 
		modal: true,
		buttons: [{
			text:'Save',
			handler:function(){
//				console.log($('#editor').html());
				saveFootnote(CKEDITOR.instances.editor.document.getBody().getHtml(), _iduser, _idword, function(success){
					if(success.value=='true'){
						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/info.png'><b>"+success.description+'</b>',function(btsave){
							if(btsave){
								$('#viewfootnoteedit').dialog("close");
								$('#divfootnote').html(CKEDITOR.instances.editor.document.getBody().getHtml());	
								$('link[rel=stylesheet][href="ckeditor/lib/css/samples.css"]').remove();
							}
						});
					}else
						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
				});
			}
		},{
			text:'Cancel',
			handler:function(){
				$('#viewfootnoteedit').dialog("close");
				$('link[rel=stylesheet][href="ckeditor/lib/css/samples.css"]').remove();
			}
		}],
		closed: false,
		autoOpen: false,
		title:"Edit Footnote",
		height:500,
		width:1050
	});
	$( "#viewfootnoteedit" ).dialog( "open" );	
	$("a").removeClass("panel-tool-close");
}
function viewDiference(desc,data) {
	$('#viewdiference').show();
	$('#desc').html('<b>'+desc+'</b>');
	$('#divitap').html(data[1]);
	$('#divedit').html(data[2]);
	$('#submititap').html('<b>Submited by:</b> '+data[4]);
	$('#submitediting').html('<b>Submited by:</b> '+data[3]);
	$('#changeby').html('<b>Changed by:</b> '+data[5]);
	jQuery('#viewdiference').dialog({
		modal: true,
		buttons: [{
			text:'OK',
			handler:function(){
				$('#viewdiference').dialog("close");
			}
		}],

		autoOpen: false,
		title:"Difference",
		height:500,
		width:screen.width-50
	});
}
//function getImage(filename,finalchecking,file) {
////	alert(filename+' '+finalchecking+' '+file);
////	img=document.getElementById("imgpreview");
////	filename='../manuscripts/TH_05_01_006_00/TH_05_01_006_00_01_005.jpg';
////	img.src=filename;//'manuscripts/TH_05_01_006_00/TH_05_01_006_00_01_005.jpg';
////	$("#finalchecking").html("<b>line&nbsp;&nbsp;170&nbsp;&nbsp;Final&nbsp;Checking&nbsp;By&nbsp;:&nbsp;Ueahanong Pon.&nbsp;Created&nbsp;By&nbsp;:&nbsp;02/03/2012 14:50</b>");
//	var obj = new Object();
//	obj.imgpath=filename;
//	obj.title=file;  
//	obj.finalchecking=finalchecking;
//	params  = 'width='+(screen.width);
//	params += ', height=350';
//	params += ', top=0';
//	params+=', left=0';
//	var view=window.open('viewimage.jsp?rnd='+Math.random(),"_blank",params);
//	view.dialogArguments = obj;
//}

function doRowSelect(rowId,cellIndex){
	try{
//		<b>line&nbsp;&nbsp;170&nbsp;&nbsp;Final&nbsp;Checking&nbsp;By&nbsp;:&nbsp;Ueahanong Pon.&nbsp;Created&nbsp;By&nbsp;:&nbsp;02/03/2012 14:50</b>
		var finalchecking=gridpicture.cells(gridpicture.getRowId(rowId),gridpicture.getColIndexById("line")).getValue()+
		'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+gridpicture.cells(gridpicture.getRowId(rowId),gridpicture.getColIndexById("name")).getValue()+
		'&nbsp;&nbsp;&nbsp;&nbsp;'+gridpicture.cells(gridpicture.getRowId(rowId),gridpicture.getColIndexById("date")).getValue()+
		'&nbsp;&nbsp;'+gridpicture.cells(gridpicture.getRowId(rowId),gridpicture.getColIndexById("time")).getValue()+'</b>';
		_ukitUtil.getImage(gridpicture.cells(gridpicture.getRowId(rowId),gridpicture.getColIndexById("server")).getValue()
				+'/'+gridpicture.cells(gridpicture.getRowId(rowId),gridpicture.getColIndexById("folder")).getValue()
				+'/'+gridpicture.cells(gridpicture.getRowId(rowId),gridpicture.getColIndexById("filename")).getValue()
				+'.jpg',finalchecking,gridpicture.cells(gridpicture.getRowId(rowId),gridpicture.getColIndexById("filename")).getValue(),'viewinfo.jsp'
				,(screen.width),380);
		finalchecking=null;
	}catch(e){
		alert('doRowSelect '+e.message);
	}
}

function doRowSelectEds(rowId,cellIndex){
	try{
//		<b>line&nbsp;&nbsp;170&nbsp;&nbsp;Final&nbsp;Checking&nbsp;By&nbsp;:&nbsp;Ueahanong Pon.&nbsp;Created&nbsp;By&nbsp;:&nbsp;02/03/2012 14:50</b>
		var finalchecking=geds.cells(geds.getRowId(rowId),geds.getColIndexById("line")).getValue()+
		'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+geds.cells(geds.getRowId(rowId),geds.getColIndexById("name")).getValue()+
		'&nbsp;&nbsp;&nbsp;&nbsp;'+geds.cells(geds.getRowId(rowId),geds.getColIndexById("date")).getValue()+
		'&nbsp;&nbsp;'+geds.cells(geds.getRowId(rowId),geds.getColIndexById("time")).getValue()+'</b>';
		_ukitUtil.getImage(geds.cells(geds.getRowId(rowId),geds.getColIndexById("server")).getValue()
				+'/'+geds.cells(geds.getRowId(rowId),geds.getColIndexById("folder")).getValue()
				+'/'+geds.cells(geds.getRowId(rowId),geds.getColIndexById("filename")).getValue()
				+'.jpg',finalchecking,geds.cells(geds.getRowId(rowId),geds.getColIndexById("filename")).getValue(),'vieweds.jsp'
				,(screen.width),(screen.height));
		finalchecking=null;
	}catch(e){
		alert('doRowSelectEds '+e.message);
	}
}
function doVariant(rowId,cellIndex){
	try{
//		alert(rowId+' '+cellIndex+' '+gridpicture.cells(rowId,cellIndex).getValue());
//		getImage(gridpicture.cells(rowId,1).getValue());
//		alert(grid.getColumnCount());
//		console.log(grid.getColumnCount()-3+' '+grid.getColumnCount()+' ss '+grid.cells(rowId,cellIndex).getValue());
//		if(grid.getColumnId(cellIndex)=='MSS'){
		_idrowvariant=rowId;
		_pattern=grid.cells(rowId,1).getValue();
		if(_ukitUtil.between((cellIndex+1), 3, (grid.getColumnCount()-3))){
			$('#geds').hide();
			$('#gpicture').show();
			gridpicture.clearAll();
//			_pattern=grid.cells(rowId,1).getValue();
			_pattern=_ukitUtil.replaceAll('&lt;', '<', _pattern);
			_pattern=_ukitUtil.replaceAll('&gt;', '>', _pattern);
			getInfocardPicture(_pattern, _idword, grid.getColumnId(cellIndex),grid.cells(rowId,cellIndex).getValue());
//			_pattern=null;
//			alert('show');
		}else
//			console.log('N');

//		for(var i=2; i<grid.getColumnCount()-3; i++){
//		alert(grid.getColumnId(i));
//		}
			
		if(grid.getColumnId(cellIndex)=='Eds'){
			if(grid.cells(rowId,cellIndex).getValue()!=''){
				$('#geds').show();
				$('#gpicture').hide();
				geds.clearAll();
				getEds(grid.cells(rowId,1).getValue(), _idword,grid.cells(rowId,cellIndex).getValue());
			}
		}		
		if(grid.getColumnId(cellIndex)=='Comm.'){
			getCommentaryChoice(grid.cells(rowId,1).getValue(), _idword);
		}

	}catch(e){
		alert('doVariant '+e.message);
	}
}

function doOnCheck(rId,cInd,state){
	if(state){
//		alert(grid.getCheckedRows(0));
		if(rId==grid.getRowsNum()-1){
			grid.selectCell(rId,1);
			grid.editCell();
		}
//		else{
//			grid.selectCell(rId,cInd);
//		}	
	}else{
		grid.editStop();
//		grid.lockRow(grid.getRowsNum()-1, true);
	}
	
}

function genUnit(){
	gunit.clearAll();
	try{
		//alert(_objUnit);
		if(_objUnit.data!=null){
			for(var i=0, len=_objUnit.data.length; i<len; i++){
				gunit.addRow(i, [_objUnit.data[i].unit,_objUnit.data[i].content,_objUnit.data[i].status,_objUnit.data[i].idh], i);
			}
			$('#word').html(_objUnit.data[0].detail);
			_objUnitHilight=$('#word').text();
			gunit.selectRowById(0);
		}

	}catch(e){
		alert('genUnit '+e.message);
	}
}

function getDetail(idh){
	var detail=null;
	try{
		if(_objUnit!=null){
			for(var i=0, len=_objUnit.data.length; i<len; i++){
				if(_objUnit.data[i].idh==idh){
					detail=_objUnit.data[i].detail;
					break;
				}
			}
		}
		return detail;
	}catch(e){
		alert('getDetail '+e.message);
	}
}

function previousUnit(){
	if(_objUnit!=null && _objUnit.data.length > 0){
//		console.log('before '+_idunit);
		if(_idunit!=1){
			$("#content").mask("Waiting...");
			_idunit--;
			grid.clearAll();
			if(gunit.cells(gunit.getRowId((_idunit-1)),gunit.getColIndexById("content")).getValue()!=''){
				clearInterval(_timerId);
				_myProgressBar.setValue(0);		
				loadProgressBar();
				searchH4DetailByUnitno(gunit.cells(gunit.getRowId((_idunit-1)),gunit.getColIndexById("unit")).getValue(),_iduser,function(obj){
					if(obj.value=='check'){
						var content=new contentService();
						dhtmlxs.confirm({
							text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+obj.description,
							ok:"Yes", cancel:"No", callback:function(result){
								if(result){
									$("#content").mask("Waiting...");									
									content.resetUnit(_objH4.idh4, obj.data[(_idunit-1)].unit, _iduser, function(success){
										dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
										window.close();
										$("#content").unmask();
									});
									content=null;
									return;
								}else{
									content.getBaseText(_objH4.idh4, obj.data[(_idunit-1)].unit, _iduser, function(success){
										if(success.value=='true'){
											var objReset=new Object();
											objReset.data=success.data;
											objReset.h1toh4=_objH4.e2Header[0].e2HeaderRight;
											objReset.unit=obj.data[(_idunit-1)].unit;
											_ukitUtil.closePopup('windowsname2');
											_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'resetblock.jsp',objReset,'windowsname2'); 										}else{
											if(success.data==null){
												dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);		
											}else{
												viewDiference(success.description, success.data);
											}
										}
										gunit.selectRowById((_idunit-1));
										$('#word').html(obj.data[(_idunit-1)].detail);
										$('#unitno').html(obj.data[(_idunit-1)].unit);
										$("#content").unmask();
									});
								}
							}
						 });
					}else{
						if(obj.value=='true'){
							gunit.selectRowById((_idunit-1));
							$('#word').html(obj.data[(_idunit-1)].detail);
							$('#unitno').html(obj.data[(_idunit-1)].unit);
							$("#content").unmask();
						}else{
							 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+obj.description);
						}
						$("#content").unmask();
					}
//					_idunit--;
				});
			}else{
				$('#word').html(_objUnit.data[(_idunit-1)].detail);
				$('#unitno').html(_objUnit.data[(_idunit-1)].unit);
				
				gunit.selectRowById((_idunit-1));
				$("#content").unmask();
//				_idunit++;
			}		
//			$('#word').html(_objUnit[(_idunit-1)].detail);
//			$('#unitno').html(_objUnit[(_idunit-1)].unit);
//			gunit.selectRowById((_idunit-1));
		}else{
			_ukitUtil.getMessageById(42, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				 $("#content").unmask();
			});			
		}
	}
}

function nextUnit(){
	if(_objUnit!=null && _objUnit.data.length > 0){
		if(_idunit<_objUnit.data.length){
			$("#content").mask("Waiting...");
			grid.clearAll();
			if(gunit.cells(gunit.getRowId(_idunit),gunit.getColIndexById("content")).getValue()!=''){
				clearInterval(_timerId);
				_myProgressBar.setValue(0);		
				loadProgressBar();
				searchH4DetailByUnitno(gunit.cells(gunit.getRowId(_idunit),gunit.getColIndexById("unit")).getValue(),_iduser,function(obj){
					if(obj.value=='check'){
						var content=new contentService();
						dhtmlxs.confirm({
							text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+obj.description,
							ok:"Yes", cancel:"No", callback:function(result){
								if(result){
									$("#content").mask("Waiting...");								
									content.resetUnit(_objH4.idh4, obj.data[_idunit].unit, _iduser, function(success){
										dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
										window.close();
										$("#content").unmask();
									});
									content=null;
									return;
								}else{
									content.getBaseText(_objH4.idh4, obj.data[_idunit].unit, _iduser, function(success){
										if(success.value=='true'){
											var objReset=new Object();
											objReset.data=success.data;
											objReset.h1toh4=_objH4.e2Header[0].e2HeaderRight;
											objReset.unit=obj.data[_idunit].unit;
											_ukitUtil.closePopup('windowsname2');
											_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'resetblock.jsp',objReset,'windowsname2'); 
										}else{
											if(success.data==null){
												dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);		
											}else{
												viewDiference(success.description, success.data);
											}
										}
										gunit.selectRowById(_idunit);
										$('#word').html(obj.data[_idunit].detail);
										$('#unitno').html(obj.data[_idunit].unit);
										_idunit++;
										$("#content").unmask();
									});
								}
							}
						 });
					}else{
						if(obj.value=='true'){
							gunit.selectRowById(_idunit);
							$('#word').html(obj.data[_idunit].detail);
							$('#unitno').html(obj.data[_idunit].unit);
						}else{
							 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+obj.description);
						}

						_idunit++;
						$("#content").unmask();
					}
				});
			}else{
//				alert(_idunit);
				$('#word').html(_objUnit.data[_idunit].detail);
				$('#unitno').html(_objUnit.data[_idunit].unit);
				gunit.selectRowById(_idunit);
				_idunit++;
				$("#content").unmask();
			}			
		}else{
			_ukitUtil.getMessageById(43, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				 $("#content").unmask();
			});
		}
	}
}

function searchVariantTable(idword){
	var col=null; var affterSplit = null; var tmpcol=null; var colId=null;
	$("#content").mask("Waiting...");
	try{
		gridpicture.clearAll();
		grid.clearAll();
		geds.clearAll();
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
//					alert(tmpcol.substring(0, tmpcol.length-1));
//					alert(colId.substring(0, colId.length-1));
					grid =_ukitUtil.createDhtmlxGrid('gvariant');
					grid.setImagePath("dhtmlxGrid/codebase/imgs/");
					grid.setHeader(tmpcol.substring(0, tmpcol.length-1));
//					grid.setInitWidths("10,*");
					grid.setColumnIds(colId.substring(0, colId.length-1));
					grid.setColAlign(colalign.substring(0, colalign.length-1));
					grid.setColTypes(coltype.substring(0, coltype.length-1));
					grid.attachEvent("onRowSelect", doVariant);
					grid.attachEvent("onEditCell",doOnEditCell);
					grid.attachEvent("onCheck", doOnCheck);
					grid.enableStableSorting(true);			
//					grid.enableAutoWidth(true);
//					grid.enableAutoWidth(true,1270,1270);
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
//						grid.setRowTextStyle(indexCol, "font-family: Arial; font-size:18px");//12/12/2015
						grid.setRowTextStyle(indexCol, "font-family: Open Sans; font-size:18px");
					}
					var haveEmendation=false;
					for(var i=0, rlen=grid.getRowsNum(); i<rlen; i++){
						if(grid.cells(i,grid.getColumnCount()-3).getValue()=='' && grid.cells(i,grid.getColumnCount()-2).getValue()==''){
							haveEmendation=true;
							break;
						}
					}
					if(haveEmendation==false)
						grid.addRow(indexCol+1,[0],indexCol+1);
					if(objVariantTable.length>1)
						grid.sortRows(grid.getColumnCount()-3, 'int', 'desc');
//					alert(grid.getColumnCount());
					
//					grid.enableAutoWidth(true, 2000, 250);
					
					for(var i=0, alen=affterSplit.length-1; i<alen; i++){
						grid.adjustColumnSize(i);
					}
					
					for(var i=1, alen=grid.getColumnCount()-1; i<alen; i++){//dynamic adjust column 19122015 disable 6/3/2016
//						console.log(i+' '+(grid.getColWidth(i)/8));
						grid.setColWidth(i,(grid.getColWidth(i)/9));
//						grid.setColWidth(i,(grid.getColWidth(i)));
					}
					
//					grid.enableAutoWidth(true);
//					grid.enableColumnAutoSize(true);
					grid.setColWidth(affterSplit.length-1, 13);//Comm.
//					if(haveEmendation){ //.Emendation กรณีมีข้อมูลจะเป็น Record แรกเสมอ
						for(var i=1, r_len=grid.getRowsNum()-1; i<r_len; i++){
							for(var j=1, clen=grid.getColumnCount(); j<clen;j++){
								grid.cells(i,j).setDisabled(true);	
							}
//							grid.lockRow(i, true);
						}			
						grid.enableAutoWidth(true,1270,1270);
					$('#getLastcomment').hide();
					searchLastCommentByFcrid(idword, _iduser, 2, function(reasonComment){
						if(reasonComment!=null){
							var html='<table>';
							html=html+'<tr><td colspan="2"><div id="reasoncomment"></div></td><tr>';
							html=html+'<tr><td valign="top"><div id="reasoncommenthtml" style="width: 400px;"></div></td><td valign="top"><div id="reason_comment" style="width: 400px; height: 400px; overflow: scroll;"></div></td></tr>';
							html=html+'</table>';
							$('#choicereason').html(html);
//							$('#reasoncomment').html(reasonComment.dataarr[1]);
							$('#reasoncommenthtml').html(reasonComment.dataarr[4]);
							$('#reason_comment').html(reasonComment.dataarr[0]);
							_reasonComment=eval(reasonComment);
							if(_reasonComment.dataarr[0]!='' || _reasonComment.dataarr[1]!='')
								$('#getLastcomment').show();
							else{
								$('#getLastcomment').hide();
							}
//							popupChoiceReasonComment();
							html=null;							
						}
					});					
				}else{dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+objVariantTable.description); grid.addRow(0,[0],0);}
				$("#content").unmask();
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
				$("#content").unmask();
			}
		});
	}catch(e){
		alert('searchVariantTable '+e.message);
		$("#content").unmask();
	}finally{
		col=null;
	}
}

function getInfocardPicture(pattern,fcrid,column,columnvalue){
	var datas={'pattern':pattern,'fcrid':fcrid,'column':column,'columnvalue':columnvalue};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
			url: baseUrl+"/E2",
			data: JSON.stringify(strArray),
			dataType : "json",
			type : "POST",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
            headers: {
                "param":"getInfocardPicture"
            },
			success: function(infopicture) {
				if(infopicture.value=='true'){
					for(var i=0, len=infopicture.data.length; i<len; i++){
						gridpicture.addRow(i, [infopicture.data[i].abbr,infopicture.data[i].filename,infopicture.data[i].line
						                       ,infopicture.data[i].name,infopicture.data[i].date,infopicture.data[i].time
						                       ,infopicture.data[i].server,infopicture.data[i].folder], i);
					}
				}
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

function getEds(pattern,fcrid,columnvalue){
	try{
		$.ajax({
			url: baseUrl+"/E2",
			data: 'act=getEds&pattern='+pattern+'&fcrid='+fcrid+'&columnvalue='+columnvalue,
			dataType : "json",
			type : "GET",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
			success: function(eds) {
				if(eds.value=='true'){
					for(var i=0, len=eds.data.length; i<len; i++){
						geds.addRow(i, [eds.data[i].eds,eds.data[i].vp,eds.data[i].line
						                ,eds.data[i].name,eds.data[i].date,eds.data[i].time
						                ,eds.data[i].server,eds.data[i].folder,eds.data[i].filename], i);
					}
//					}
			}
		}, 
		error: function(data) {
			if (data.responseText != null && data.responseText != "") {
				alert(data.responseText);
			}
		}
		});
	}catch(e){
		alert('getEds '+e.message);
	}finally{

	}
}

function reply_click(e) {
	e = e || window.event;
	e = e.target || e.srcElement;	
	if (e.nodeName === 'LABEL' || e.nodeName === 'I' || e.nodeName==='SPAN') {
//		console.log(window.frames["comments"]);
//		console.log(document.getElementById('comments.document'));
//		console.log(e.parentElement.id);
		if(e.parentElement.id!='word'){ // รองรับ hightlight span
			_idword=e.parentElement.id;
		}else{
			if(document.getElementById(e.id).parentNode.id!='word')
				_idword=document.getElementById(e.id).parentNode.id;
			else
				_idword=e.id;
		}

//		_frame = window.frames["comments"].document;
//		_frame.getElementById('editor').innerHTML='';
		_frame=$("#comments").contents().find("body");
		_frame.find("#editor").html('');
		$('#commentdetail').html('');
		searchVariantTable(_idword);
	}
}

function findWord(){
	var word=$('#txtsearch').val();
	if(word.length>0){
//		if(_idrow==0){
			$('#word').html(_objUnit.data[_idrow].detail);
//		}		
//		else{
//			$('#word').html(_mapUnit.data[_idrow-1].detail);
//		}
			
		if(word.substring(word.length-1,word.length)=='*'){
			splitWordBack(word.substring(0,word.length-1));
		}else if(word.substring(0,1)=='*'){
			splitWordFront(word.substring(1,word.length));
		}else{
			var str=word.split(/\s+/);
			for(var i=0, len=str.length;i<len;i++){
				find(str[i]);
			}
		}
	}
}

function find(word){$("#word").highlight(word);}

function splitWordBack(strword){
	try{		
		var tmp= _objUnitHilight;
		var word=[];var newWord=[];
		tmp=tmp.toLowerCase();
		word=tmp.split(/\s+/);
		if(word.length>0){
			newWord = new Array();
			for(var i=0, len=word.length; i<len; i++){	
				var p= word[i].indexOf(strword);
//				var all = word[i].length;
				if(p>=0){
					newWord[newWord.length]=word[i].substring(p,word[i].length);
				}
			}
			newWord.sort(function(a,b){return b.length-a.length;});
			for(var i=0, len=newWord.length;i<len;i++){
				find(newWord[i]);
			}				
		}	
		tmp=null; word=null;
	}catch(e){
		alert('splitWordBack: '+e.message);
	}
}

function splitWordFront(strword){
	try{		
		var tmp= _objUnitHilight;
		var word=[];var newWord=[];
		tmp=tmp.toLowerCase();
		word=tmp.split(/\s+/);
		if(word.length>0){
			newWord = new Array();
			for(var i=0, len=word.length; i<len; i++){	
				var p= word[i].lastIndexOf(strword);
//				var all = word[i].length;
				if(p>=0){
					newWord[newWord.length]=word[i].substring(0,(p+strword.length));
				}
			}
			newWord.sort(function(a,b){return b.length-a.length;});
			for(var i=0, wlen=newWord.length;i<wlen;i++){
//				console.log(newWord[i]);
				find(newWord[i]);
			}				
		}	
		tmp=null; word=null;
	}catch(e){
		alert('splitWordBack: '+e.message);
	}
}

function searchH4DetailByUnitno(unitno,iduser,callback){
	try{
//		console.log("h1="+_idh1+"&h2="+_idh2+"&h3="+_idh3+"&h4="+_idh4);
		_isLoadUnit=true;
		$('#word').html('Loading............');
		$.ajax({
			url: baseUrl+"/E2",
			data: "act=searchUnitByH4&seq=after&h1="+_objH4.idh1+"&h2="+_objH4.idh2+"&h3="+_objH4.idh3+"&h4="+_objH4.idh4
				+"&unitno="+unitno+'&iduser='+iduser+'&r='+Math.random(),
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(obj) {
				if(obj.value=='true'){
					_objUnit.data[_idCurent].detail=obj.data[_idCurent].detail;
					document.getElementById("word").innerHTML=obj.data[_idCurent].detail;
					_objUnitHilight=$('#word').text();
					$('#unitno').html(_objUnit.data[_idCurent].unit);
            		_myProgressBar.setValue(100);
            		clearInterval(_timerId);
            		_isLoadUnit=false;
            		callback(obj);
				}else{
					callback(obj);
				}
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('searchH4DetailByUnitno '+e.message);
	}finally{
		sectionGrid=null;
	}
}	

function getCommentaryChoice(pattern,fcrid){
	try{
		$.ajax({
			url: baseUrl+"/E2",
			data: 'act=getCommentaryChoice&pattern='+pattern+'&fcrid='+fcrid,
			dataType : "json",
			type : "GET",
			async : true,
			cache: false,
			contentType : "application/text;charset=utf-8",
			success: function(cty) {
				if(cty.value=='true'){
					$('#divcty').html(cty.description);
					callCty();
				}
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

function saveCommentary(pattern,fcrid,cty,iduser,callback){
	var isSave=false;
	try{
		$.ajax({
			url: baseUrl+"/E2",
			data: 'act=saveCty&pattern='+pattern+'&fcrid='+fcrid+'&ctyId='+cty+'&iduser='+iduser,
			dataType : "json",
			type : "GET",
			async : true,
			cache: false,
			contentType : "application/json;charset=utf-8",
			success: function(success) {
				if(success!=null){
					if(success.value=='true')
						isSave=true;
					else
						isSave=false;	
//					_ukitUtil.getMessageById(success.idmessage, _messageUI, function(msg){
						 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
//					});
					setTimeout(function() { callback(isSave); }, 1);
				}
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});

	}catch(e){
		alert('saveCommentary '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}
function getCommentary(value){
	_ctyValue=value.value;
}

function getReasonCommentChoice(fcrid, iduser){
	try{
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
					$('#divcomment').html(reasoncomment.description);
					deliveryService();
				}
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

function saveReasonComment(fcrid,idpage,iduser,idreason,callback){
	try{
		$.ajax({
			url: baseUrl+"/E2",
			data: 'act=saveReasoncomment&fcrid='+fcrid+'&idpage='+idpage+'&iduser='+iduser+'&idreason='+idreason,
			dataType : "json",
			type : "GET",
			async : true,
			cache: false,
			contentType : "application/json;charset=utf-8",
			success: function(success) {
				if(success!=null){
					_idcomment=success.description.substring(success.description.indexOf('#')+1,success.description.length);
					if(success.value=='true')
						isSave=true;
					else
						isSave=false;	
//					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description.substring(0,success.description.indexOf('#')));
					setTimeout(function() { callback(isSave); }, 1);
				}
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});

	}catch(e){
		alert('saveReasonComment '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

function saveEmendation(fcrid,iduser,content,idpage,callback){
	try{
		$.ajax({
			url: baseUrl+"/E2",
			data: 'act=saveEmendation&fcrid='+fcrid+'&iduser='+iduser+'&content='+content+'&idpage='+idpage,
			dataType : "json",
			type : "GET",
			async : true,
			cache: false,
			contentType : "application/json;charset=utf-8",
			success: function(success) {
				callback(success);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});

	}catch(e){
		alert('saveEmendation '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

function doOnEditCell(stage,rowId,cellIndex,newValue,oldValue){
    if ((stage==2)&&(newValue!=oldValue)){
    	if(grid.cells(rowId,1).getValue()==''){
			_ukitUtil.getMessageById(44, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
    		grid.cells(rowId,1).setValue(oldValue);
    		return true;
    	}
		_ukitUtil.getMessageById(38, _messageUI, function(msg){
	    	dhtmlxs.confirm({
	    		text:"<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg,
	    		ok:"Yes", cancel:"No", callback:function(result){
	    			if(result){
	    				saveEmendation(_idword, _iduser, grid.cells(rowId,1).getValue(), 2, function(success){
   							 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
   						});    						
	    				return;
	    			}
	    		}
	    	});
		});
       return true;
    }
    return true;
 }

function saveE2(fcrid, pattern, idcomment, comment, iduser, idpage,callback){	
	var datas={'fcrid':fcrid,'pattern':pattern,'idcomment':idcomment,'comment':comment,'iduser':iduser,'idpage':idpage};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
			url: baseUrl+"/SaveE2",
			data: JSON.stringify(strArray),
			dataType : "json",
			type : "POST",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
			success: function(success) {
				callback(success);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('saveE2 '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

function searchLastCommentByFcrid(fcrid, iduser, idpage, callback){	
	try{
		$.ajax({
			url: baseUrl+"/E2",
			data: 'act=searchLastCommentByFcrid&fcrid='+fcrid+'&iduser='+iduser+'&idpage='+idpage,
			dataType : "json",
			type : "GET",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
			success: function(success) {
				callback(success);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('searchLastCommentByFcrid '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

function popupChoiceReasonComment(reasonComment){
	if(reasonComment!=null){
		$('#choicereason').show();
		jQuery("#choicereason").dialog({
			modal: true,
			buttons: [{
				text:'OK',
				handler:function(){
					$('#choicereason').dialog("close");
					var chk=document.getElementsByName("reason");
					var idreason=''; var value='';
					for(var i=0, len=chk.length;i<len; i++){
						if(chk[i].checked==true){
							idreason=idreason+chk[i].id+'|';
							value=value+chk[i].value+'<br>';
//							chk[i].checked=false;
						}
					}

//					saveReasonComment(_idword, 2, _iduser, idreason.substring(0, idreason.length-1),function(success){
//						if(success){
//							_frame = window.frames["comments"].document;
//							_frame.getElementById('editor').innerHTML=reasonComment[0];
							_frame=$("#comments").contents().find("body");
							_frame.find("#editor").html(reasonComment.dataarr[0]);
//						}
						value=null;
////						lastcomment=null; 
//					}); 
					
				}
			},{
				text:'Cancel',
				handler:function(){
					$('#choicereason').dialog("close");
				}
			}],

			autoOpen: false,
			title:"Last Comment",
			height:620,
			width:900
		});
		$( "#choicereason" ).dialog( "open" );	
	}
}

function searchPatternLabel(fcrid,callback){
	try{
		$.ajax({
			url: baseUrl+"/E2",
			data: 'act=searchPatternLabel&fcrid='+fcrid,
			dataType : "json",
			type : "GET",
			async : true,
			cache: false,
			contentType : "application/text;charset=utf-8",
			success: function(pattern) {
				if(pattern!=null){
					callback(pattern);
				}
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('searchPatternLabel '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

//function viewHistory(tagview,display){
//	$(tagview).show();
//	jQuery(tagview).dialog({
//		modal: true,
//		buttons: [{
//			text:'OK',
//			handler:function(){
//				$(tagview).dialog("close");
//			}
//		},{
//			text:'Cancel',
//			handler:function(){
//				$(tagview).dialog("close");
//			}
//		}],
//		autoOpen: false,
//		title:display,
//		height:650,
//		width:1100
//	});
//	$( tagview ).dialog( "open" );	
//}
function loadProgressBar(){
	_timerId = setInterval(function() {
		if (_myProgressBar.value >= _myProgressBar.maxValue){
			_myProgressBar.setValue(0);			
		}		
		else
			_myProgressBar.setValue(_myProgressBar.value+1);		
	},
	1000);
}

//function setfontSize(type){
//	if(type=='big'){
//		_fontsize=_fontsize+2;
//		$("#word").css("fontSize", _fontsize);
//	}else{
//		_fontsize=_fontsize-2;
//		$("#word").css("fontSize", _fontsize);
//	}
//}

function date_custom(a,b,order){ 
    a=a.split("/");
    b=b.split("/");
    if (a[2]==b[2]){
        if (a[1]==b[1])
            return (a[0]>b[0]?1:-1)*(order=="asc"?1:-1);
        else
            return (a[1]>b[1]?1:-1)*(order=="asc"?1:-1);
    } else
         return (a[2]>b[2]?1:-1)*(order=="asc"?1:-1);
}

function clearGroup(){
	$('#lblgroup').html('');
	_idwordgroup=null;
	_wordgroup=null;
	document.getElementById('chkgroup').checked=false;
}

function refreshWord(str,type){
	try{
		str=_ukitUtil.replaceAll('<<', '&lt;&lt;', str);
		str=_ukitUtil.replaceAll('>>', '&gt;&gt;',str);
		str=_ukitUtil.replaceAll("'", '"', str);
		 var word_ = $('#word').html();
		 getStringById(_idwordgroup,function(tag){
//			 if(type=='group'){
//				console.log('group\n'+tag);
//			 }else{
//				 console.log('ungroup\n'+tag);
////				 str.substr(0,str.length-6);
//			 }
//			console.log(str);	 
//			console.log(tag);
//			console.log(word_);
			//if(type=='ungroup')
				tag=tag.substring(0,tag.length-1);
//				console.log(tag);
//			 console.log('str\n'+ str.substr(0,str.length-6));
//			var find = tag;
//			var re = new RegExp(find, 'g');

			word_ = word_.replace(tag, str);
			 $('#word').html(word_);
			 clearGroup();
		 });
	}catch(e){
		alert('refreshword: '+e.message);
	}
}

function getStringById(arrId, callback){
	var strTag=''; var tag=null;
	try{
		for(var i=0, len=arrId.length; i<len; i++){
				tag=document.getElementById(arrId[i]);
				strTag=strTag+tag.outerHTML+' ';
		}	
		callback(strTag);
	}catch(e){
		alert('getStringById: '+e.message);
	}finally{
		strTag=null; tag=null;
	}
}

function checkDuplicateIdWord(idword, newid, fn){
	var have=false;
	try{
		for(var i=0, len=idword.length; i<len; i++){
			if(idword[i]==newid){
				have=true;
				break;
			}
		}
		fn(have);
	}catch(e){
		alert('checkDuplicateIdWord: '+e.message);
	}
}

function submitUnit(idh,unitno,iduser,idpage,fn){
	var datas={'idh':idh,'unitno':unitno,'iduser':iduser,'idpage':idpage};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
			url: baseUrl+"/E2",
			data: JSON.stringify(strArray),
			dataType : "json",
			type : "POST",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
            headers: {
                "param":"submitUnit"
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
function unlockUnit(idh,unitno,iduser,idpage,fn){
	var datas={'idh':idh,'unitno':unitno,'iduser':iduser,'idpage':idpage};
	var strArray = new Array();
	strArray.push(datas);
	try{
		$.ajax({
			url: baseUrl+"/E2",
			data: JSON.stringify(strArray),
			dataType : "json",
			type : "POST",
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
            headers: {
                "param":"unlockUnit"
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

function checkButtonUnit(idh,idunit){
	try{
		if(roleId!=4){
			checkUnit(_idh,_idunit,function(isLock){
				if(isLock){
					buttonConfigByRole(roleId, function(arr_button){
						loadButtonCheckunit(roleId, 2, arr_button,function(button){_button=button;});
					});
				}else{
					buttonConfigByRole(roleId, function(arr_button){
						if(_button!=null){
							for(var j=0, len=_button.length; j<len; j++){
			            		for(var i=0, arrlen=arr_button.length; i<arrlen; i++){
			            			if(_button[j].description==arr_button[i].name)
			            				document.getElementById(_button[j].div).style.display='';
			            		}
							}
						}
					});
				}					
			});
		}//else
			//loadButton(roleId, 2);
	}catch(e){
		alert('checkButtonUnit '+e.message);
	}
}

function saveFootnote(ft,iduser, fcrid, fn){
	try{
		var dataPost={'ft':ft, 'iduser':iduser, 'fcrid':fcrid};
		var strArray = new Array();
		strArray.push(dataPost);
		$.ajax({
            url: baseUrl+"/Footnote",
            data: JSON.stringify(strArray),
            dataType: "json",
            type: "POST",
            async: true,
            cache: false,
            contentType: "application/json",
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
	}
}