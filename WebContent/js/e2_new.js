var grid = null;
var gridpicture = null;
var geds = null;
var gunit = null;
var _idCurent = 0;
var _idrowvariant = 0;
var _idcomment = 0;
var _idrow = 0;
var _fontsize = 25;
var _finaltext = null;
var _idwordgroup = null;
var _wordgroup = null;
var _button = null;
var _idunit = null;
var _isLoadUnit = false;
var _idword = null;
var _gService = null;
var _frame = null;
var _comment = null;
var _E2 = null;
var _line = 0;
var _fcedition = null;
var _synoptic = null;
$(document).ready(function() {
	_E2 = new E2();
	localStorage.setItem('idword', null);
	setTimeout(function() {
		_frame = document.getElementById('comments');
		_frame = _frame.contentDocument || _frame.contentWindow.document;
		var elements = _frame.getElementsByClassName('fr-placeholder');
		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		}
		document.getElementById('edit_footnote').innerHTML += '<div id="divfootnote" style="display:inline-block;"></div>';
		$('#divfootnote').css('fontSize', 19);
		$("#divfootnote").css("font-family", "Open Sans");
		document.getElementById('editfootnote').addEventListener('click', function() {
			if (document.getElementById('divfootnote').innerHTML == '') {
				_ukitUtil.getMessageById(106, _messageUI, function(msg) {
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
				});
				return
			} else
				editFootnote();
		});
	}, 400);
	_comment = new comment();
	_gService = new GroupService();
	document.getElementById('word').addEventListener('click', function() {
		//		document.getElementById('overlay').style.display='';
		_ukitUtil.loading('overlay');
		reply_click();
		if (document.getElementById('chkgroup').checked) {
			if (_idwordgroup == null) {
				_wordgroup = ''; _idwordgroup = new Array();
			}
			checkDuplicateIdWord(_idwordgroup, _idword, function(have) {
				if (!have) {
					//					document.getElementById('lblgroup').innerHTML='';
					_idwordgroup.push(_idword);
					//					_wordgroup=_wordgroup+$('#'+_idword).html()+'&nbsp;';
					var word_ = document.querySelectorAll('#' + _idword);

					if (word_.length == 1) {
						if (document.getElementById('lblgroup').innerHTML == '') {
							document.getElementById('lblgroup').innerHTML = word_[0].innerHTML + '&nbsp;';
						} else {
							document.getElementById('lblgroup').innerHTML += word_[0].innerHTML + '&nbsp;';
						}
					}
					else {
						for (var i = 0; i < word_.length; i++) {
							_wordgroup = _wordgroup + word_[i].innerHTML + '<br>';
						}
						document.getElementById('lblgroup').innerHTML = _wordgroup;
					}
				}
			});

		} else {
			_wordgroup = null; _wordgroup = null;
		}
		_ukitUtil.loading('overlay');
		searchFootnoteByFcrid(_idword, _iduser, 2, function(footnote) {
			if (footnote.value == 'true')
				$('#viewfootnote').prop('checked', true);
			else
				$('#viewfootnote').prop('checked', false);
			var htmlreplace = new html();
			htmlreplace.replaceTag(footnote.description, function(tmpPattern) {
				document.getElementById('divfootnote').innerHTML = tmpPattern;
			});
			htmlreplace = null;
			//			document.getElementById('overlay').style.display='none';
			_ukitUtil.unloading('overlay');
		});
	});
	document.getElementById('setfontbig').addEventListener('click', function() {
		_fontsize = _ukitUtil.setFontSize('big', 'word', _fontsize);
	});
	document.getElementById('setfontsmall').addEventListener('click', function() {
		_fontsize = _ukitUtil.setFontSize('small', 'word', _fontsize);
	});
	document.getElementById('chkgroup').addEventListener('click', function() {
		if (this.checked) {
			document.getElementById('lblgroup').innerHTML = '';
		} else {
			document.getElementById('lblgroup').innerHTML = '';
			_idwordgroup = null;
			_wordgroup = null;
		}
	});
	document.getElementById('group').addEventListener('click', function() {
		if (_idwordgroup != null) {
			if (_idwordgroup.length == 1) {
				_ukitUtil.getMessageById(39, _messageUI, function(msg) {
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
				});
				return
			}
			_ukitUtil.getMessageById(34, _messageUI, function(msg) {
				dhtmlxs.confirm({
					text: "<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg,
					ok: "Yes", cancel: "No", callback: function(result) {
						if (result) {
							_ukitUtil.loading('overlay');
							_gService.groupungroup(_idwordgroup, _iduser, 0, 1, function(success) {
								dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description, function(response) {
									if (response) {
										if (success.value == 'true')
											refreshWord(success.description.substr(success.description.indexOf('\n'), success.description.length - 1), 'group');
										if (success.value == 'trueload') {
											searchH4DetailByUnitno(_idunit, _iduser, function(obj) {
												document.getElementById('word').innerHTML = obj.object;
												_ukitUtil.unloading('overlay');
												clearGroup();
											});
										}
										if (success.value == 'false') {
											dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description);
											_ukitUtil.unloading('overlay');
										}
									}
								});
							});
							return;
						}
					}
				});
			});
		} else {
			_ukitUtil.getMessageById(40, _messageUI, function(msg) {
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
			});
		}
	});
	document.getElementById('ungroup').addEventListener('click', function() {
		if (_idwordgroup != null) {
			_ukitUtil.getMessageById(35, _messageUI, function(msg) {
				dhtmlxs.confirm({
					text: "<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg,
					ok: "Yes", cancel: "No", callback: function(result) {
						if (result) {
							_ukitUtil.loading('overlay');
							_gService.groupungroup(_idwordgroup, _iduser, 0, 0, function(success) {
								dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description, function(response) {
									if (response) {
										if (success.value == 'true')
											refreshWord(success.description.substr(success.description.indexOf('\n'), success.description.length - 1), 'ungroup');
										if (success.value == 'trueload') {
											searchH4DetailByUnitno(_idunit, _iduser, function(obj) {
												document.getElementById('word').innerHTML = obj.object;
												_ukitUtil.unloading('overlay');
												clearGroup();
											});
										}
										if (success.value == 'false') {
											dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description);
											_ukitUtil.unloading('overlay');
										}
									}
								});
							});
							return;
						}
					}
				});
			});
		} else {
			_ukitUtil.getMessageById(40, _messageUI, function(msg) {
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
			});
		}
	});
	document.getElementById('search').addEventListener('click', function() {
		findWord();
	});
	document.getElementById('clearsearch').addEventListener('click', function() {
		document.getElementById('word').innerHTML = _objUnit.data[_idrow].detail;
		find('clearsearch');
	});
	document.getElementById('tools').addEventListener('click', function() {
		window.open('./url?operation=CESearch&amp;id=8&amp;menu=CESearch&amp;page_id=9', '');
	});
	document.getElementById('synoptic').addEventListener('click', function() {
		_ukitUtil.loading('overlay');
		setTimeout(function() {
			_ukitUtil.closePopup('synoptic');
			_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'synoptic.jsp', _synoptic, 'synoptic');
			_ukitUtil.unloading('overlay');
		}, 1200);
	});

	document.getElementById('viewfootnote').addEventListener('click', function() {
		document.getElementById('divfootnote').innerHTML = '';
		if (document.getElementById('viewfootnote').checked) {
			//			$("#content").mask("Waiting...");
			showFootnote(_idword, _iduser, 2, function(footnote) {
				if (footnote.value == 'true') {
					var htmlreplace = new html();
					htmlreplace.replaceTag(footnote.description, function(tmpPattern) {
						document.getElementById('divfootnote').innerHTML = tmpPattern;
					});
					htmlreplace = null;
				}
				else
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + footnote.description);
				//				$("#content").unmask();
			});
		} else {
			deleteFootnote(_idword, _iduser, 2, function(success) {
				if (success)
					document.getElementById('divfootnote').innerHTML = '';
				else {
					_ukitUtil.getMessageById(33, _messageUI, function(msg) {
						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
					});
				}
			});
		}
	});
	document.getElementById('save').addEventListener('click', function() {
		var pattern = new Array();
		var isSelect = grid.getCheckedRows(0);
		var tmpPattern = null;
		isSelect = isSelect.split(',');
		for (var i = 0, len = isSelect.length; i < len; i++) {
			if (isSelect[i] != '') {
				tmpPattern = _ukitUtil.replaceAll('&lt;', '<', grid.cells(isSelect[i], 1).getValue());
				tmpPattern = _ukitUtil.replaceAll('&gt;', '>', tmpPattern);
				pattern.push(tmpPattern);
				tmpPattern = null;
			}
			else
				pattern = null;
		}
		//		_frame = window.frames["comment"].document;

		saveE2(_idword, JSON.stringify(pattern), _idcomment, '', _iduser, 2, function(success) {
			_ukitUtil.loading('overlay');
			if (success.value == 'true') {
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description);
				_idcomment = 0;
				searchPatternLabel(_idword, function(pattern) {
					if (pattern.value == 'true') {
						var word = $('#word').html();
						var tag = document.getElementById(_idword);
						word = word.replace(tag.outerHTML, pattern.description);
						$('#word').html(word);
						_objUnit.data[_idrow].detail = word;
						word = null; tag = null;
						_ukitUtil.unloading('overlay');
					} else
						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + pattern.description);
				});
			} else if (success.value == 'check' || success.value == 'admin') {
				clearDisplay();
				var arrDetail = obj.description.split('@');
				_ukitUtil.closePopup('reset');
				var reset = new Object();
				if (success.value == 'admin')
					reset.displayadmin = 'Please contract admin';
				else
					reset.displayadmin = '';
				reset.h1toh4 = _objH4;
				reset.unit = _objUnit.data[_idCurent].unit;
				reset.detail = arrDetail[0];
				reset.content = arrDetail[1];
				_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'reset.jsp', reset, 'reset');
				_ukitUtil.unloading('overlay');
			} else if (success.value == 'trueload') {
				searchH4DetailByUnitno(_idunit, _iduser, function(obj) {
					document.getElementById('word').innerHTML = obj.object;
					_ukitUtil.unloading('overlay');
					clearGroup();
				});
			} else
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description);
		});
	});
	document.getElementById('favorites').addEventListener('click', function() {
		favorites(_idword, _iduser, 2, function(success) {
			dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description);
		});
	});
	document.getElementById('next').addEventListener('click', function() {
		if (_isLoadUnit) {
			gunit.selectRowById(_idCurent);
			_ukitUtil.getMessageById(29, _messageUI, function(msg) {
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
			});
			return
		}
		nextUnit();
	});

	document.getElementById('previous').addEventListener('click', function() {
		if (_isLoadUnit) {
			gunit.selectRowById(_idCurent);
			_ukitUtil.getMessageById(29, _messageUI, function(msg) {
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
			});
			return
		}
		previousUnit();
	});

	document.getElementById('submit').addEventListener('click', function() {
		_ukitUtil.getMessageById(36, _messageUI, function(msg) {
			dhtmlxs.confirm({
				text: "<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg,
				ok: "Yes", cancel: "No", callback: function(result) {
					if (result) {
						submitUnit(_idh, _idunit, _iduser, 2, function(success) {
							if (success.value == 'true') {
								dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description);
								_ukitUtil.loading('overlay');
								searchUnitByH4('before', _objH4.idh1, _objH4.idh2, _objH4.idh3, _objH4.idh4, _iduser, function(objSection) {
									if (objSection != null) {
										_objUnit = objSection;
										genUnit();
										gunit.selectRowById(_idCurent);
										searchH4DetailByUnitno(gunit.cells(gunit.getRowId(_idCurent), gunit.getColIndexById("unit")).getValue(), _iduser, function(o) {
											$('#unitno').html(_objUnit.data[_idCurent].unit);
											_ukitUtil.unloading('overlay');
										});
									} else {
										_ukitUtil.getMessageById(41, _messageUI, function(msg) {
											dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
										});
									}
								});
							} else if (success.value == 'check' || success.value == 'admin') {
								clearDisplay();
								var arrDetail = obj.description.split('@');
								_ukitUtil.closePopup('reset');
								var reset = new Object();
								if (success.value == 'admin')
									reset.displayadmin = 'Please contract admin';
								else
									reset.displayadmin = '';
								reset.h1toh4 = _objH4;
								reset.unit = _objUnit.data[_idCurent].unit;
								reset.detail = arrDetail[0];
								reset.content = arrDetail[1];
								_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'reset.jsp', reset, 'reset');
								_ukitUtil.unloading('overlay');
							} else
								dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description);
						});
						return;
					}
				}
			});
		});
	});
	document.getElementById('btnunit').addEventListener('click', function() {
		var html = '<span><ukit>UnitHistory';
		html += '<div id="viewunithistory style="display:none"><div id="gunithis" style="height:450px;background-color:white;"></div>';
		html += '<input type="button" class="btn btn-primary" id="closeUI" value="OK"></ukit></span>';
		document.getElementById('modalUI').innerHTML = html;
		var gunithis = _ukitUtil.createDhtmlxGrid('gunithis');
		gunithis.setImagePath("dhtmlxGrid/codebase/imgs/");
		gunithis.setHeader("Username,Word/Group,Description,date");
		gunithis.setColumnIds("username,wordgroup,description,date");
		gunithis.setInitWidths("120,120,120,100");
		gunithis.setColAlign("left,left,left,left");
		gunithis.setColTypes("ro,ro,ro,ro");
		gunithis.setSkin('modern');
		gunithis.enableMultiline(false);
		gunithis.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif", "", "");
		gunithis.setColSorting("na,str,str,str");
		gunithis.init();
		_ukitUtil.loading('overlay');
		document.getElementById('closeUI').addEventListener('click', function() {
			document.getElementById('modalUI').style.display = 'none';
		});
		searchUnit(_idh, _idunit, function(unitHistory) {
			if (unitHistory.value == 'true') {
				//				var csv='';
				for (var i = 0, len = unitHistory.data.length; i < len; i++) {
					//					csv=csv+i+','+unitHistory[i].username+','+unitHistory[i].wg+','+unitHistory[i].description+','+unitHistory[i].date+'\n';
					gunithis.addRow(i, [unitHistory.data[i].username, unitHistory.data[i].wg, unitHistory.data[i].description, unitHistory.data[i].date], i);
					gunithis.setRowTextStyle(i, "color:black; font-family: Open Sans; font-size:15px");
				}
				//				gunithis.parse(csv,'csv');
				gunithis.adjustColumnSize(0);
				gunithis.adjustColumnSize(1);
				gunithis.adjustColumnSize(2);
				gunithis.adjustColumnSize(3);
				csv = null;
				_ukitUtil.unloading('overlay');
				document.getElementById('modalUI').style.display = '';
			} else {
				_ukitUtil.getMessageById(28, _messageUI, function(msg) {
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
				});
				_ukitUtil.unloading('overlay');
			}
		});
	});
	document.getElementById('btncomment').addEventListener('click', function() {
		var html = '<span><ukit>CommentHistory';
		html += '<div id="gcomment" style="height:450px;background-color:white;"></div><div align="left" id="viewcommentdetail"></div>';
		html += '<input type="button" class="btn btn-primary" id="closeUI" value="OK"></ukit></span>';
		document.getElementById('modalUI').innerHTML = html;
		gcomment = _ukitUtil.createDhtmlxGrid('gcomment');
		gcomment.setImagePath("dhtmlxGrid/codebase/imgs/");
		gcomment.setHeader("Username,Word/Group,date");
		gcomment.setColumnIds("username,wordgroup,date");
		gcomment.setInitWidths("120,120,120");
		gcomment.setColAlign("left,left,left");
		gcomment.setColTypes("ro,ro,ro");
		gcomment.setSkin('modern');
		gcomment.enableMultiline(false);
		gcomment.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif", "", "");
		gcomment.setColSorting("na,str,str");
		gcomment.attachEvent("onRowSelect", function(id, cellid) {
			$("#viewcommentdetail").css("fontSize", 15);
			$("#viewcommentdetail").css("font-family", "Open Sans");
			$('#viewcommentdetail').html(_commentHistory.data[id].description);
		});
		gcomment.init();
		_ukitUtil.loading('overlay');
		document.getElementById('closeUI').addEventListener('click', function() {
			document.getElementById('modalUI').style.display = 'none';
		});
		searchComment(_idh, _idunit, function(commentHistory) {
			if (commentHistory == 'true') {
				_commentHistory = commentHistory;
				for (var i = 0, len = commentHistory.data.length; i < len; i++) {
					gcomment.addRow(i, [commentHistory.data[i].username, commentHistory.data[i].wg, commentHistory.data[i].date], i);
					gcomment.setRowTextStyle(i, "color:black; font-family: Open Sans; font-size:15px");
				}
				gcomment.adjustColumnSize(0);
				gcomment.adjustColumnSize(1);
				gcomment.adjustColumnSize(2);
				_ukitUtil.unloading('overlay');
				document.getElementById('modalUI').style.display = '';
			} else {
				_ukitUtil.unloading('overlay');
				_ukitUtil.getMessageById(28, _messageUI, function(msg) {
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
				});
			}
		});
	});
	document.getElementById('btnfootnote').addEventListener('click', function() {
		var html = '<span><ukit>Footnote History';
		html += '<div id="gfootnote" style="height:250px;background-color:white;"></div><div align="left" id="viewfootnotedetail"></div>';
		html += '<input type="button" class="btn btn-primary" id="closeUI" value="OK"></ukit></span>';
		document.getElementById('modalUI').innerHTML = html;
		gfootnote = _ukitUtil.createDhtmlxGrid('gfootnote');
		gfootnote.setImagePath("dhtmlxGrid/codebase/imgs/");
		gfootnote.setHeader("Username,Word/Group,date");
		gfootnote.setColumnIds("username,wordgroup,date");
		gfootnote.setInitWidths("120,120,120");
		gfootnote.setColAlign("left,left,left");
		gfootnote.setColTypes("ro,ro,ro");
		gfootnote.setSkin('modern');
		gfootnote.enableMultiline(false);
		gfootnote.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif", "", "");
		gfootnote.setColSorting("na,str,str");
		gfootnote.attachEvent("onRowSelect", function(id, cellid) {
			$("#viewfootnotedetail").css("fontSize", 15);
			$("#viewfootnotedetail").css("font-family", "Open Sans");
			var html_ = _footnoteHistory.data[id].ft;
			html_ = _ukitUtil.replaceAll("<<", "&lt;&lt;", html_);
			document.getElementById('viewfootnotedetail').innerHTML = html_;
			html_ = null;
		});
		gfootnote.init();
		document.getElementById('closeUI').addEventListener('click', function() {
			document.getElementById('modalUI').style.display = 'none';
		});
		_ukitUtil.loading('overlay');
		searchFootnote(_idh, _idunit, function(footnoteHistory) {
			if (footnoteHistory.value == 'true') {
				_footnoteHistory = footnoteHistory;
				for (var i = 0, len = footnoteHistory.data.length; i < len; i++) {
					gfootnote.addRow(i, [footnoteHistory.data[i].username, footnoteHistory.data[i].wg, footnoteHistory.data[i].date], i);
					gfootnote.setRowTextStyle(i, "color:black; font-family: Open Sans; font-size:15px");
				}
				gfootnote.adjustColumnSize(0);
				gfootnote.adjustColumnSize(1);
				gfootnote.adjustColumnSize(2);
				_ukitUtil.unloading('overlay');
				document.getElementById('modalUI').style.display = '';
			} else {
				_ukitUtil.unloading('overlay');
				_ukitUtil.getMessageById(28, _messageUI, function(msg) {
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
				});
			}
		});
	});
	document.getElementById('btnemendation').addEventListener('click', function() {
		var html = '<span><ukit>Emendation History';
		html += '<div id="gemendation" style="height:350px;background-color:white;"></div><div align="left" id="viewemendationdetail"></div>';
		html += '<input type="button" class="btn btn-primary" id="closeUI" value="OK"></ukit></span>';
		document.getElementById('modalUI').innerHTML = html;
		gemendation = _ukitUtil.createDhtmlxGrid('gemendation');
		gemendation.setImagePath("dhtmlxGrid/codebase/imgs/");
		gemendation.setHeader("Username,Word/Emendation,date");
		gemendation.setColumnIds("username,wordemendation,date");
		gemendation.setInitWidths("120,120,120");
		gemendation.setColAlign("left,left,left");
		gemendation.setColTypes("ro,ro,ro");
		gemendation.setSkin('modern');
		gemendation.enableMultiline(false);
		gemendation.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif", "", "");
		gemendation.setColSorting("na,str,str");
		gemendation.attachEvent("onRowSelect", function(id, cellid) {
			$("#viewemendationdetail").css("fontSize", 15);
			$("#viewemendationdetail").css("font-family", "Open Sans");
			document.getElementById('viewemendationdetail').innerHTML = _emendationHistory.data[id].wg;
		});
		gemendation.init();
		document.getElementById('closeUI').addEventListener('click', function() {
			document.getElementById('modalUI').style.display = 'none';
		});
		_ukitUtil.loading('overlay');
		searchEmendation(_idh, _idunit, function(emendationHistory) {
			if (emendationHistory.value == 'true') {
				_emendationHistory = emendationHistory;
				//				console.log(_emendationHistory);
				for (var i = 0, len = emendationHistory.data.length; i < len; i++) {
					gemendation.addRow(i, [emendationHistory.data[i].username, emendationHistory.data[i].we, emendationHistory.data[i].date], i);
					gemendation.setRowTextStyle(i, "color:black; font-family: Open Sans; font-size:15px");
				}
				gemendation.adjustColumnSize(0);
				gemendation.adjustColumnSize(1);
				gemendation.adjustColumnSize(2);
				_ukitUtil.unloading('overlay');
				document.getElementById('modalUI').style.display = '';
			} else {
				_ukitUtil.unloading('overlay');
				_ukitUtil.getMessageById(28, _messageUI, function(msg) {
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
				});
			}
		});
	});
	_objH4 = window.dialogArguments;
	console.log(_objH4);
	_objUnit = _objH4.objSection;
	document.getElementById('basetexname').innerHTML = '<b>' + _objH4.e2Header[0].e2HeaderLeft + '</b>';
	$("#word").css("fontSize", _fontsize);
	$("#word").css("font-family", "Open Sans");
	if (_objUnit != null && _objUnit.data != null) {
		$('#unitno').html(_objUnit.data[0].unit);
		$('#unitno').css("fontSize", 24);
		$('#unitno').css("font-weight", "bold");
		_idh = _objUnit.data[0].idh;
		_idunit = _objUnit.data[0].unit;
	} else {
		_idh = 0;
		_idunit = 0;
		$('#unitno').html('');
	}
	gunit = _ukitUtil.createDhtmlxGrid('gunit');
	gunit.setImagePath("dhtmlxGrid/codebase/imgs/");
	gunit.setHeader("Unit,Content,Status,idh");
	gunit.setColumnIds("unit,content,status,idh");
	gunit.setInitWidths("45,150,80,0");
	gunit.setColAlign("left,left,left,left");
	gunit.setColTypes("ro,ro,ro,ro");
	gunit.setSkin('modern');
	gunit.attachEvent("onRowSelect", function(id, ind) {
		//		if(_isLoadUnit){
		//			gunit.selectRowById(_idCurent);
		//			_ukitUtil.getMessageById(29, _messageUI, function(msg){
		//				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
		//			});
		//			return
		//		}
		var content = _frame.getElementsByClassName('note-editable panel-body');
		content[0].innerHTML = '';
		_ukitUtil.loading('overlay');
		document.getElementById('viewfootnote').checked = false;
		localStorage.setItem("idword", null);
		document.getElementById('divfootnote').innerHTML = '';
		clearGroup();
		_idrow = id;
		_idunit = _objUnit.data[id].unit;
		_idh = _objUnit.data[id].idh;
		checkButtonUnit(_idh, _idunit);
		grid.clearAll();
		gridpicture.clearAll();
		geds.clearAll();
		document.getElementById('word').innerHTML = _objUnit.data[id].detail;
		_objUnitHilight = document.getElementById('word').innerText;
		_idCurent = id;
		if (gunit.cells(gunit.getRowId(id), gunit.getColIndexById("unit")).getValue() != '') {
			//			clearInterval(_timerId);

			searchH4DetailByUnitno(gunit.cells(gunit.getRowId(id), gunit.getColIndexById("unit")).getValue(), _iduser, function(obj) {
				if (obj.value == 'check' || obj.value == 'admin') {
					clearDisplay();
					var arrDetail = obj.description.split('@');
					_ukitUtil.closePopup('reset');
					var reset = new Object();
					if (obj.value == 'admin')
						reset.displayadmin = 'Please contract admin';
					else
						reset.displayadmin = '';
					reset.h1toh4 = _objH4;
					reset.unit = gunit.cells(gunit.getRowId(id), gunit.getColIndexById("unit")).getValue();
					reset.detail = arrDetail[0];
					reset.content = arrDetail[1];
					_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'reset.jsp', reset, 'reset');
					_ukitUtil.unloading('overlay');
				} else {
					if (obj.value == 'true') {
						$('#unitno').html(_objUnit.data[id].unit);
					} else {
						dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + obj.description);
						document.getElementById('word').innerHTML = '';
					}
					_ukitUtil.unloading('overlay');

				}
			});
		} else {
			_ukitUtil.unloading('overlay');
			_ukitUtil.getMessageById(30, _messageUI, function(msg) {
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
			});
		}
	});
	gunit.init();
	genUnit();
	grid = _ukitUtil.createDhtmlxGrid('gvariant');
	grid.setImagePath("dhtmlxGrid/codebase/imgs/");
	grid.setHeader("&nbsp;,<div align='center'>Variant</div>,<div align='center'>B</div>,<div align='center'>C</div>,<div align='center'>K</div>,<div align='center'>L</div>,<div align='center'>MSS</div>,<div align='center'>Eds</div>,<div align='center'>Comm.</div>");
	grid.setColumnIds("space,Variant,B,C,K,L,MSS,Eds,Cty");
	grid.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif", "", "");
	grid.setColAlign("right,left,left,right,left,left,left,left,left");
	grid.setColTypes("ch,ed,ed,ed,ed,ed,ed,ed,ro");
	grid.setSkin('modern');
	grid.enableColumnAutoSize(true);
	grid.init();

	for (var i = 0, len = grid.getRowsNum(); i < len - 1; i++) {
		for (var j = 1, lencol = grid.getColumnCount(); j < lencol; j++) {
			grid.cells(i, j).setDisabled(true);
		}
	}
	gridpicture = _ukitUtil.createDhtmlxGrid('gpicture');
	gridpicture.setImagePath("dhtmlxGrid/codebase/imgs/");
	gridpicture.setHeader("Abbr,Filename,line,name,date,time,server,folder,finaltext");
	gridpicture.setColumnIds("abbr,filename,line,name,date,time,server,folder,finaltext");
	gridpicture.setInitWidths("60,,0,0,0,0,0,0,0");
	//	gridpicture.enableAutoWidth(true);
	gridpicture.setColAlign("left,left,left,left,left,left,left,left,left");
	gridpicture.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro");
	gridpicture.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif", "", "");
	gridpicture.setSkin('modern');
	gridpicture.attachEvent("onRowSelect", doRowSelect);
	//	gridpicture.enableColumnAutoSize(true);
	//	gridpicture.enableAutoWidth(true,600,100);
	gridpicture.init();

	geds = _ukitUtil.createDhtmlxGrid('geds');
	geds.setImagePath("dhtmlxGrid/codebase/imgs/");
	geds.setHeader("Editions,Vol.Page,line,name,date,time,server,folder,filename");
	geds.setColumnIds("eds,vp,line,name,date,time,server,folder,filename");
	geds.setInitWidths("120,0,0,0,0,0,0,0,120");
	geds.setColAlign("left,left,left,left,left,left,left,left,left");
	geds.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro");
	geds.setSkin('modern');
	geds.setStyle("", "font: 22px Open Sans, Cordia New, sans-serif", "", "");
	geds.attachEvent("onRowSelect", doRowSelectEds);
	//	geds.enableColumnAutoSize(true);
	//	geds.enableAutoWidth(true,600,100);
	geds.init();
});

function genUnit() {
	gunit.clearAll();
	try {
		//alert(_objUnit);
		if (_objUnit.data != null) {
			for (var i = 0, len = _objUnit.data.length; i < len; i++) {
				gunit.addRow(i, [_objUnit.data[i].unit, _objUnit.data[i].content, _objUnit.data[i].status, _objUnit.data[i].idh], i);
			}
			$('#word').html(_objUnit.data[0].detail);
			_objUnitHilight = $('#word').text();
			gunit.selectRowById(0);
		}
	} catch (e) {
		alert('genUnit ' + e.message);
	}
}
function searchH4DetailByUnitno(unitno, iduser, callback) {
	try {
		//		console.log("h1="+_idh1+"&h2="+_idh2+"&h3="+_idh3+"&h4="+_idh4);
		//		_isLoadUnit=true;
		$('#word').html('Loading............');
		$.ajax({
			url: baseUrl + "/E2",
			data: "act=searchUnitByH4&seq=after&h1=" + _objH4.idh1 + "&h2=" + _objH4.idh2 + "&h3=" + _objH4.idh3 + "&h4=" + _objH4.idh4
				+ "&unitno=" + unitno + '&iduser=' + iduser + '&r=' + Math.random(),
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(obj) {
				if (obj.value == 'true') {
					_objUnit.data[_idCurent].detail = obj.object;
					document.getElementById("word").innerHTML = obj.object;
					_objUnitHilight = document.getElementById('word').innerText;
					$('#unitno').html(_objUnit.data[_idCurent].unit);
					callback(obj);
				} else {
					callback(obj);
				}
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	} catch (e) {
		alert('searchH4DetailByUnitno ' + e.message);
	} finally {
		sectionGrid = null;
	}
}
function reply_click(e) {
	e = e || window.event;
	e = e.target || e.srcElement;
	if (e.nodeName === 'LABEL' || e.nodeName === 'I' || e.nodeName === 'SPAN') {
		//		console.log(window.frames["comments"]);
		//		console.log(document.getElementById('comments.document'));
		//		console.log(e.parentElement.id);
		if (e.parentElement.id != 'word') { // รองรับ hightlight span
			_idword = e.parentElement.id;
		} else {
			if (document.getElementById(e.id).parentNode.id != 'word')
				_idword = document.getElementById(e.id).parentNode.id;
			else
				_idword = e.id;
		}

		//		_frame = window.frames["comments"].document;
		//		_frame.getElementById('editor').innerHTML='';
		localStorage.setItem("idword", _idword);
		getReasonCommentChoice(_idword, _iduser);
		$('#commentdetail').html('');
		searchVariantTable(_idword);
		_E2.searchLine(_idword, function(line) {
			if (line.value == 'true') {
				_line = line.description;
				if (_idword.indexOf('EP') != -1)
					_fcedition = _idword.substring(2, 6);
				else
					_fcedition = _idword.substring(0, 4);
				var synoptic = new Object();
				synoptic.h1 = _objH4.idh1;
				synoptic.h2 = _objH4.idh2;
				synoptic.h3 = _objH4.idh3;
				synoptic.h4 = _objH4.idh4;
				synoptic.header = _objH4.e2Header[0].e2HeaderRight;
				synoptic.line = _line;
				synoptic.unit = _idunit;
				synoptic.fcedition = _fcedition;
				synoptic.idh = _idh;
				_synoptic = synoptic;
				//				console.log(synoptic);
			}
			//				console.log(line.description);
		});
	}
}
function searchVariantTable(idword) {
	var col = null; var affterSplit = null; var tmpcol = null; var colId = null;
	_ukitUtil.loading('overlay');
	try {
		gridpicture.clearAll();
		//		grid.clearAll();
		//		geds.clearAll();
		$.ajax({
			url: baseUrl + "/E2",
			data: "act=searchVariantTable&idword=" + idword,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(objVariantTable) {
				if (objVariantTable.value == 'true') {
					col = objVariantTable.data[0];
					affterSplit = col.toString().split(",");
					tmpcol = ''; colId = 'space';
					for (var i = 0, len = affterSplit.length; i < len; i++) {
						tmpcol = tmpcol + '<div align="center">' + affterSplit[i] + '</div>,';
						colId = colId + affterSplit[i] + ',';
					}
					var colalign = 'right,left,left,left,';
					for (var i = 4, afflen = affterSplit.length; i < afflen; i++) {
						colalign = colalign + 'left,';
					}
					var coltype = 'ch,ed,ro,ro,ro,ro,ro,ro,';
					for (var i = 8, splen = affterSplit.length; i < splen; i++) {
						coltype = coltype + 'ro,';
					}
					//					alert(tmpcol.substring(0, tmpcol.length-1));
					//					alert(colId.substring(0, colId.length-1));
					grid = _ukitUtil.createDhtmlxGrid('gvariant');
					grid.setImagePath("dhtmlxGrid/codebase/imgs/");
					tmpcol = tmpcol.substring(0, tmpcol.length - 1).split('Variant').join('Variant&nbsp;&nbsp;<button type="button" title="sort" class="btn btn-xs" id="btnsortvariant"><img src="img/if_arrow-down_383189.png"/></button>');
					tmpcol = tmpcol.split('MSS').join('MSS&nbsp;&nbsp;<button type="button" title="sort" class="btn btn-xs" id="btnmss"><img src="img/if_arrow-down_383189.png"/></button>');
					grid.setHeader(tmpcol);
					//					grid.setInitWidths("10,*");
					grid.setColumnIds(colId.substring(0, colId.length - 1));
					grid.setColAlign(colalign.substring(0, colalign.length - 1));
					grid.setColTypes(coltype.substring(0, coltype.length - 1));
					grid.attachEvent("onRowSelect", doVariant);
					grid.attachEvent("onEditCell", doOnEditCell);
					grid.attachEvent("onCheck", doOnCheck);
					//					grid.attachEvent("onRowDblClicked", function(rId,cInd){
					//					   alert(cInd);
					//					});
					//					grid.enableStableSorting(true);			
					//					grid.enableAutoWidth(true);
					//					grid.enableAutoWidth(true,1270,1270);					
					grid.enableAutoHeight(true, 250, true);
					grid.init();
					var indexCol = null;
					if (objVariantTable.data.length > 0) {
						var newArray = JSON.stringify(objVariantTable.data);
						newArray = _ukitUtil.replaceAll('<', '&lt;', newArray);
						newArray = _ukitUtil.replaceAll('>', '&gt;', newArray);
						newArray = _ukitUtil.replaceAll('!', '<', newArray);
						newArray = _ukitUtil.replaceAll('@', '>', newArray);
						objVariantTable = JSON.parse(newArray);
					}
					for (var j = 1, vlen = objVariantTable.length; j < vlen; j++) {
						indexCol = j - 1;
						grid.addRow(indexCol, objVariantTable[j], indexCol);
						//						grid.setRowTextStyle(indexCol, "font-family: Arial; font-size:18px");//12/12/2015
						grid.setRowTextStyle(indexCol, "font-family: Open Sans; font-size:16px");
						grid.setCellTextStyle(indexCol, 1, "font-family: Open Sans; font-size:19px");
					}
					grid.sortRows(7, 'int', 'desc');
					var haveEmendation = false;
					for (var i = 0, rlen = grid.getRowsNum(); i < rlen; i++) {
						if (grid.cells(i, grid.getColumnCount() - 3).getValue() == '' && grid.cells(i, grid.getColumnCount() - 2).getValue() == '') {
							haveEmendation = true;
							break;
						}
					}

					if (haveEmendation == false)
						grid.addRow(indexCol + 1, [0], indexCol + 1);
					for (var i = 0, alen = affterSplit.length - 1; i < alen; i++) {
						grid.adjustColumnSize(i);
					}

					for (var i = 1, alen = grid.getColumnCount() - 1; i < alen; i++) {//dynamic adjust column 19122015 disable 6/3/2016
						grid.setColWidth(i, (grid.getColWidth(i) / 10.5));
						//						grid.setColWidth(i,(grid.getColWidth(i)));
					}
					grid.setColWidth(affterSplit.length - 1, 13);//Comm.
					if (grid.getColWidth(1) < 120) {
						grid.setColWidth(1, 8); //9=120
					}

					var maxgrid = document.getElementById('gvariant').style.width;
					for (var i = 0; i < grid.getRowsNum() - 1; i++) {
						if (grid.getColumnId(7) == 'MMS' && grid.getColumnId(8) == 'Eds');
						grid.cells(i, 1).setDisabled(true);
					}
					grid.enableAutoWidth(true, maxgrid, maxgrid);
					grid.setColWidth(0, 2);
					_ukitUtil.loading('overlay');
					_frame.getElementById('clearcomment').click();
					_comment.searchComment(localStorage.getItem('idword'), function(oComment) {
						_frame.getElementById('viewcomment').innerHTML = oComment.description.substring(oComment.description.indexOf('#') + 1, oComment.description.length);
						var dcomment = _frame.getElementsByName('datecomment');
						var html = null;
						for (var i = 0; i < oComment.data.length; i++) {
							var cssComment = '<div {id} class="csscomment">';
							cssComment = cssComment.split('{id}').join('id="cssComment' + oComment.data[i].id + '"');
							_frame.getElementById(dcomment[i].id).innerHTML = oComment.data[i].comment_date;
							html = _frame.getElementById('delete' + oComment.data[i].id).outerHTML;
							html = html.split('(y)').join("<button onclick='confirmdel({id})' style='color:black;'>Yes</button>");
							html = html.split('(n)').join("<button onclick='canceldel({id})' style='color:black;'>No</button>");
							html = html.split('{id}').join(oComment.data[i].id);
							_frame.getElementById('delete' + oComment.data[i].id).outerHTML = html;
							_frame.getElementById('body' + oComment.data[i].id).innerHTML = cssComment + b64_to_utf8(oComment.data[i].comment) + '</div>';
						}
						document.getElementById('comments').style.height = '';
						document.getElementById('comments').style.height = _frame.body.scrollHeight + "px";
						_frame.getElementById('callpopupeve').click();
						_ukitUtil.unloading('overlay');
					});
					//						console.log(document.getElementById('gvariant').style.width);						
					var flagsort = 'asc';
					document.getElementById('btnsortvariant').addEventListener('click', function() {
						grid.clearAll();
						//							document.getElementById('gvariant').style.width=maxgrid;
						for (var j = 1, vlen = objVariantTable.length; j < vlen; j++) {
							indexCol = j - 1;
							grid.addRow(indexCol, objVariantTable[j], indexCol);
							grid.setRowTextStyle(indexCol, "font-family: Open Sans; font-size:16px");
							grid.setCellTextStyle(indexCol, 1, "font-family: Open Sans; font-size:19px");
						}
						grid.sortRows(1, 'str', flagsort);
						if (flagsort == 'asc') {
							flagsort = 'desc';
						}
						else {
							flagsort = 'asc';
						}
						var haveEmendation = false;
						for (var i = 0, rlen = grid.getRowsNum(); i < rlen; i++) {
							if (grid.cells(i, grid.getColumnCount() - 3).getValue() == '' && grid.cells(i, grid.getColumnCount() - 2).getValue() == '') {
								haveEmendation = true;
								break;
							}
						}
						if (haveEmendation == false)
							grid.addRow(indexCol + 1, [0], indexCol + 1);

						for (var i = 0; i < grid.getRowsNum() - 1; i++) {
							if (grid.getColumnId(7) == 'MMS' && grid.getColumnId(8) == 'Eds');
							grid.cells(i, 1).setDisabled(true);
						}
					});
					document.getElementById('btnmss').addEventListener('click', function() {
						grid.clearAll();
						for (var j = 1, vlen = objVariantTable.length; j < vlen; j++) {
							indexCol = j - 1;
							grid.addRow(indexCol, objVariantTable[j], indexCol);
							grid.setRowTextStyle(indexCol, "font-family: Open Sans; font-size:16px");
							grid.setCellTextStyle(indexCol, 1, "font-family: Open Sans; font-size:19px");
						}
						grid.sortRows(7, 'int', flagsort);
						if (flagsort == 'asc') {
							flagsort = 'desc';
						}
						else {
							flagsort = 'asc';
						}
						var haveEmendation = false;
						for (var i = 0, rlen = grid.getRowsNum(); i < rlen; i++) {
							if (grid.cells(i, grid.getColumnCount() - 3).getValue() == '' && grid.cells(i, grid.getColumnCount() - 2).getValue() == '') {
								haveEmendation = true;
								break;
							}
						}
						if (haveEmendation == false)
							grid.addRow(indexCol + 1, [0], indexCol + 1);
						for (var i = 0; i < grid.getRowsNum() - 1; i++) {
							if (grid.getColumnId(7) == 'MMS' && grid.getColumnId(8) == 'Eds');
							grid.cells(i, 1).setDisabled(true);
						}
						_ukitUtil.unloading('overlay');
					});
				} else { dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + objVariantTable.description); grid.addRow(0, [0], 0); }
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
				_ukitUtil.unloading('overlay');
			}
		});
	} catch (e) {
		alert('searchVariantTable ' + e.message);

		//		$("#content").unmask();
	} finally {
		col = null;
	}
}
function doVariant(rowId, cellIndex) {
	try {
		_idrowvariant = rowId;
		_pattern = grid.cells(rowId, 1).getValue();
		if (_ukitUtil.between((cellIndex + 1), 3, (grid.getColumnCount() - 3))) {
			$('#geds').hide();
			$('#gpicture').show();
			gridpicture.clearAll();
			_pattern = _ukitUtil.replaceAll('&lt;', '<', _pattern);
			_pattern = _ukitUtil.replaceAll('&gt;', '>', _pattern);
			getInfocardPicture(_pattern, _idword, grid.getColumnId(cellIndex), grid.cells(rowId, cellIndex).getValue());
		} else
			if (grid.getColumnId(cellIndex) == 'Eds') {
				if (grid.cells(rowId, cellIndex).getValue() != '') {
					$('#geds').show();
					$('#gpicture').hide();
					geds.clearAll();
					getEds(grid.cells(rowId, 1).getValue(), _idword, grid.cells(rowId, cellIndex).getValue());
				}
			}
		if (grid.getColumnId(cellIndex) == 'Comm.') {
			getCommentaryChoice(grid.cells(rowId, 1).getValue(), _idword);
		}

	} catch (e) {
		alert('doVariant ' + e.message);
	}
}
function getInfocardPicture(pattern, fcrid, column, columnvalue) {
	var datas = { 'pattern': pattern, 'fcrid': fcrid, 'column': column, 'columnvalue': columnvalue };
	var strArray = new Array();
	strArray.push(datas);
	try {
		$.ajax({
			url: baseUrl + "/E2",
			data: JSON.stringify(strArray),
			dataType: "json",
			type: "POST",
			async: true,
			cache: false,
			contentType: "text/plan;charset=utf-8",
			headers: {
				"param": "getInfocardPicture"
			},
			success: function(infopicture) {
				if (infopicture.value == 'true') {
					_finaltext = new Array();
					for (var i = 0, len = infopicture.data.length; i < len; i++) {
						gridpicture.addRow(i, [infopicture.data[i].abbr, infopicture.data[i].filename, infopicture.data[i].line
							, infopicture.data[i].name, infopicture.data[i].date, infopicture.data[i].time
							, infopicture.data[i].server, infopicture.data[i].folder, infopicture.data[i].finaltext], i);
						_finaltext.push(infopicture.data[i].finaltext);
					}
				}
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	} catch (e) {
		alert('getInfocardPicture ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function doOnEditCell(stage, rowId, cellIndex, newValue, oldValue) {
	if ((stage == 2) && (newValue != oldValue)) {
		if (grid.cells(rowId, 1).getValue() == '') {
			_ukitUtil.getMessageById(44, _messageUI, function(msg) {
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
			});
			grid.cells(rowId, 1).setValue(oldValue);
			return true;
		}
		_ukitUtil.getMessageById(38, _messageUI, function(msg) {
			dhtmlxs.confirm({
				text: "<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg,
				ok: "Yes", cancel: "No", callback: function(result) {
					if (result) {
						saveEmendation(_idword, _iduser, grid.cells(rowId, 1).getValue(), 2, function(success) {
							dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description);
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
function doOnCheck(rId, cInd, state) {
	if (state) {
		if (rId == grid.getRowsNum() - 1) {
			grid.selectCell(rId, 1);
			grid.editCell();
		}
	} else {
		grid.editStop();
	}
}
function doRowSelect(rowId, cellIndex) {
	try {
		//		<b>line&nbsp;&nbsp;170&nbsp;&nbsp;Final&nbsp;Checking&nbsp;By&nbsp;:&nbsp;Ueahanong Pon.&nbsp;Created&nbsp;By&nbsp;:&nbsp;02/03/2012 14:50</b>
		var finalchecking = gridpicture.cells(gridpicture.getRowId(rowId), gridpicture.getColIndexById("line")).getValue() +
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + gridpicture.cells(gridpicture.getRowId(rowId), gridpicture.getColIndexById("name")).getValue() +
			'&nbsp;&nbsp;&nbsp;&nbsp;' + gridpicture.cells(gridpicture.getRowId(rowId), gridpicture.getColIndexById("date")).getValue() +
			'&nbsp;&nbsp;' + gridpicture.cells(gridpicture.getRowId(rowId), gridpicture.getColIndexById("time")).getValue() + '</b>';
		_ukitUtil.getImage(gridpicture.cells(gridpicture.getRowId(rowId), gridpicture.getColIndexById("server")).getValue()
			+ '/' + gridpicture.cells(gridpicture.getRowId(rowId), gridpicture.getColIndexById("folder")).getValue()
			+ '/' + gridpicture.cells(gridpicture.getRowId(rowId), gridpicture.getColIndexById("filename")).getValue()
			+ '.jpg', finalchecking, gridpicture.cells(gridpicture.getRowId(rowId), gridpicture.getColIndexById("filename")).getValue(), 'viewinfo.jsp'
			, (screen.width), (screen.height), _finaltext[rowId]);
		finalchecking = null;
	} catch (e) {
		alert('doRowSelect ' + e.message);
	}
}

function doRowSelectEds(rowId, cellIndex) {
	try {
		//		<b>line&nbsp;&nbsp;170&nbsp;&nbsp;Final&nbsp;Checking&nbsp;By&nbsp;:&nbsp;Ueahanong Pon.&nbsp;Created&nbsp;By&nbsp;:&nbsp;02/03/2012 14:50</b>
		var finalchecking = geds.cells(geds.getRowId(rowId), geds.getColIndexById("line")).getValue() +
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + geds.cells(geds.getRowId(rowId), geds.getColIndexById("name")).getValue() +
			'&nbsp;&nbsp;&nbsp;&nbsp;' + geds.cells(geds.getRowId(rowId), geds.getColIndexById("date")).getValue() +
			'&nbsp;&nbsp;' + geds.cells(geds.getRowId(rowId), geds.getColIndexById("time")).getValue() + '</b>';
		_ukitUtil.getImage(geds.cells(geds.getRowId(rowId), geds.getColIndexById("server")).getValue()
			+ '/' + geds.cells(geds.getRowId(rowId), geds.getColIndexById("folder")).getValue()
			+ '/' + geds.cells(geds.getRowId(rowId), geds.getColIndexById("filename")).getValue()
			+ '.jpg', finalchecking, geds.cells(geds.getRowId(rowId), geds.getColIndexById("filename")).getValue(), 'vieweds.jsp'
			, (screen.width), (screen.height), _finaltext[rowId]);
		finalchecking = null;
	} catch (e) {
		alert('doRowSelectEds ' + e.message);
	}
}

function searchLastCommentByFcrid(fcrid, iduser, idpage, callback) {
	try {
		$.ajax({
			url: baseUrl + "/E2",
			data: 'act=searchLastCommentByFcrid&fcrid=' + fcrid + '&iduser=' + iduser + '&idpage=' + idpage,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "text/plan;charset=utf-8",
			success: function(success) {
				callback(success);
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	} catch (e) {
		alert('searchLastCommentByFcrid ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function getEds(pattern, fcrid, columnvalue) {
	try {
		$.ajax({
			url: baseUrl + "/E2",
			data: 'act=getEds&pattern=' + pattern + '&fcrid=' + fcrid + '&columnvalue=' + columnvalue,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "text/plan;charset=utf-8",
			success: function(eds) {
				if (eds.value == 'true') {
					_finaltext = new Array();
					for (var i = 0, len = eds.data.length; i < len; i++) {
						geds.addRow(i, [eds.data[i].eds, eds.data[i].vp, eds.data[i].line
							, eds.data[i].name, eds.data[i].date, eds.data[i].time
							, eds.data[i].server, eds.data[i].folder, eds.data[i].filename], i);
						_finaltext.push(eds.data[i].finaltext);
					}
				}
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	} catch (e) {
		alert('getEds ' + e.message);
	} finally {

	}
}
function checkDuplicateIdWord(idword, newid, fn) {
	var have = false;
	try {
		for (var i = 0, len = idword.length; i < len; i++) {
			if (idword[i] == newid) {
				have = true;
				break;
			}
		}
		fn(have);
	} catch (e) {
		alert('checkDuplicateIdWord: ' + e.message);
	}
}
function findWord() {
	if (document.getElementById('txtsearch').value.indexOf(' ') >= 0) {
		document.getElementById('txtsearch').focus();
		return
	}

	var word = document.getElementById('txtsearch').value;
	if (word.length > 0) {
		document.getElementById('word').innerHTML = _objUnit.data[_idrow].detail;
		if (word.substring(word.length - 1, word.length) == '*') {
			splitWordBack(word.substring(0, word.length - 1));
		} else if (word.substring(0, 1) == '*') {
			splitWordFront(word.substring(1, word.length));
		} else {
			var str = word.split(/\s+/);
			for (var i = 0, len = str.length; i < len; i++) {
				find(str[i]);
			}
		}
	}
}
function splitWordBack(strword) {
	try {
		var tmp = _objUnitHilight;
		var word = []; var newWord = [];
		tmp = tmp.toLowerCase();
		word = tmp.split(/\s+/);
		if (word.length > 0) {
			newWord = new Array();
			for (var i = 0, len = word.length; i < len; i++) {
				var p = word[i].indexOf(strword);
				//				var all = word[i].length;
				if (p >= 0) {
					newWord[newWord.length] = word[i].substring(p, word[i].length);
				}
			}
			newWord.sort(function(a, b) { return b.length - a.length; });
			for (var i = 0, len = newWord.length; i < len; i++) {
				find(newWord[i]);
			}
		}
		tmp = null; word = null;
	} catch (e) {
		alert('splitWordBack: ' + e.message);
	}
}

function splitWordFront(strword) {
	try {
		var tmp = _objUnitHilight;
		var word = []; var newWord = [];
		tmp = tmp.toLowerCase();
		word = tmp.split(/\s+/);
		if (word.length > 0) {
			newWord = new Array();
			for (var i = 0, len = word.length; i < len; i++) {
				var p = word[i].lastIndexOf(strword);
				//				var all = word[i].length;
				if (p >= 0) {
					newWord[newWord.length] = word[i].substring(0, (p + strword.length));
				}
			}
			newWord.sort(function(a, b) { return b.length - a.length; });
			for (var i = 0, wlen = newWord.length; i < wlen; i++) {
				//				console.log(newWord[i]);
				find(newWord[i]);
			}
		}
		tmp = null; word = null;
	} catch (e) {
		alert('splitWordBack: ' + e.message);
	}
}
function find(word) { $("#word").highlight(word); }
function clearGroup() {
	document.getElementById('lblgroup').innerHTML = '';
	_idwordgroup = null;
	_wordgroup = null;
	document.getElementById('chkgroup').checked = false;
}
function clearDisplay() {
	document.getElementById('word').innerHTML = '';
}
function viewDiference(desc, data) {
	$('#viewdiference').show();
	$('#desc').html('<b>' + desc + '</b>');
	$('#divitap').html(data[1]);
	$('#divedit').html(data[2]);
	$('#submititap').html('<b>Submited by:</b> ' + data[4]);
	$('#submitediting').html('<b>Submited by:</b> ' + data[3]);
	$('#changeby').html('<b>Changed by:</b> ' + data[5]);
	jQuery('#viewdiference').dialog({
		modal: true,
		buttons: [{
			text: 'OK',
			handler: function() {
				$('#viewdiference').dialog("close");
			}
		}],

		autoOpen: false,
		title: "Difference",
		height: 500,
		width: screen.width - 50
	});
}
function checkButtonUnit(idh, idunit) {
	try {
		if (roleId != 4) {
			checkUnit(_idh, _idunit, function(isLock) {
				if (isLock) {
					buttonConfigByRole(roleId, function(arr_button) {
						loadButtonCheckunit(roleId, 2, arr_button, function(button) { _button = button; });
					});
				} else {
					buttonConfigByRole(roleId, function(arr_button) {
						if (_button != null) {
							for (var j = 0, len = _button.length; j < len; j++) {
								for (var i = 0, arrlen = arr_button.length; i < arrlen; i++) {
									if (_button[j].description == arr_button[i].name)
										document.getElementById(_button[j].div).style.display = '';
								}
							}
						}
					});
				}
			});
		}//else
		//loadButton(roleId, 2);
	} catch (e) {
		alert('checkButtonUnit ' + e.message);
	}
}
function checkUnit(idh, unitno, fn) {
	var datas = { 'idh': idh, 'unitno': unitno };
	var strArray = new Array();
	strArray.push(datas);
	try {
		$.ajax({
			url: baseUrl + "/E2",
			data: JSON.stringify(strArray),
			dataType: "json",
			type: "POST",
			async: true,
			cache: false,
			contentType: "text/plan;charset=utf-8",
			headers: {
				"param": "checkUnit"
			},
			success: function(idstatus) {
				if (idstatus >= 3)
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
	} catch (e) {
		alert('checkUnit ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function editFootnote() {
	var html = '<span><ukit>Edit Footnote';
	html += '<div id="viewfootnoteedit" style="display:none">';
	html += '<div id="editor"></div></div>';
	html += '<input type="button" class="btn btn-primary" id="savefootnote" value="Save"><input type="button" class="btn btn-primary" id="closeUI" value="Close"></ukit></span>';
	document.getElementById('modalUI').innerHTML = html;
	document.getElementById('modalUI').style.display = '';
	$('<link rel="stylesheet" href="ckeditor/lib/css/samples.css" type="text/css" />').appendTo('head');
	initSample();
	CKEDITOR.instances.editor.setData($('#divfootnote').html());
	$('#viewfootnoteedit').show();
	document.getElementById('closeUI').addEventListener('click', function() {
		document.getElementById('modalUI').style.display = 'none';
		$('link[rel=stylesheet][href="ckeditor/lib/css/samples.css"]').remove();
	});
	document.getElementById('savefootnote').addEventListener('click', function() {
		saveFootnote(CKEDITOR.instances.editor.document.getBody().getHtml(), _iduser, _idword, function(success) {
			if (success.value == 'true') {
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/info.png'><b>" + success.description + '</b>', function(btsave) {
					if (btsave) {
						$('#divfootnote').html(CKEDITOR.instances.editor.document.getBody().getHtml());
						$('link[rel=stylesheet][href="ckeditor/lib/css/samples.css"]').remove();
						document.getElementById('modalUI').style.display = 'none';
					}
				});
			} else
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description);
		});
	});
}
function saveFootnote(ft, iduser, fcrid, fn) {
	try {
		var dataPost = { 'ft': ft, 'iduser': iduser, 'fcrid': fcrid };
		var strArray = new Array();
		strArray.push(dataPost);
		$.ajax({
			url: baseUrl + "/Footnote",
			data: JSON.stringify(strArray),
			dataType: "json",
			type: "POST",
			async: true,
			cache: false,
			contentType: "application/json",
			headers: {
				"param": "saveFootnote"
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
	} catch (e) {
		alert('saveFootnote ' + e.message);
	}
}
function getCommentaryChoice(pattern, fcrid) {
	try {
		var html = '<div class="container">';
		html += '<button type="button" id="getCtychoice" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false"></button>';
		html += '<div class="modal fade" id="myModal" role="dialog">';
		html += '<div class="modal-dialog modal-sm">';
		html += '<div class="modal-content">';
		html += '<div class="modal-header">';
		//		html+='<button type="button" class="close" data-dismiss="modal">&times;</button>';
		html += '<h4 class="modal-title">Cty</h4></div>';
		html += '<div class="modal-body"><div id="divcty"></div></div>';
		html += '<div class="modal-footer">';
		html += '<input type="button" class="btn btn-primary" id="savecty" value="Save">';
		html += '<button type="button" class="btn btn-default" id="close" data-dismiss="modal">Close</button>';
		html += '</div></div></div></div></div>';
		document.getElementById('displaypopup').innerHTML = html;
		document.getElementById('displaypopup').style.display = '';
		$.ajax({
			url: baseUrl + "/E2",
			data: 'act=getCommentaryChoice&pattern=' + encodeURIComponent(pattern) + '&fcrid=' + fcrid,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/text;charset=utf-8",
			success: function(cty) {
				if (cty.value == 'true') {
					document.getElementById('getCtychoice').click();
					document.getElementById('divcty').innerHTML = cty.description + document.getElementById('divcty').innerHTML;
					callCty();
				}
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	} catch (e) {
		alert('getCommentaryChoice ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function getCommentaryChoice_(pattern, fcrid) {
	try {
		var html = '<span><ukit>Comm.';
		html += '<div id="divcty" style="height:200px; width:300px;">';
		html += '<input type="button" class="btn btn-primary" id="savecty" value="Save"><input type="button" class="btn btn-primary" id="closeUI" value="Close"></div></ukit></span>';
		document.getElementById('modalUI').innerHTML = html;
		document.getElementById('modalUI').style.display = '';
		$.ajax({
			url: baseUrl + "/E2",
			data: 'act=getCommentaryChoice&pattern=' + pattern + '&fcrid=' + fcrid,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/text;charset=utf-8",
			success: function(cty) {
				if (cty.value == 'true') {
					document.getElementById('divcty').innerHTML = cty.description + document.getElementById('divcty').innerHTML;
					callCty();
				}
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	} catch (e) {
		alert('getCommentaryChoice ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function saveCommentary(pattern, fcrid, cty, iduser, callback) {
	var isSave = false;
	try {
		$.ajax({
			url: baseUrl + "/E2",
			data: 'act=saveCty&pattern=' + encodeURIComponent(pattern) + '&fcrid=' + fcrid + '&ctyId=' + cty + '&iduser=' + iduser,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json;charset=utf-8",
			success: function(success) {
				if (success != null) {
					if (success.value == 'true')
						isSave = true;
					else
						isSave = false;
					//					_ukitUtil.getMessageById(success.idmessage, _messageUI, function(msg){
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + success.description);
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

	} catch (e) {
		alert('saveCommentary ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function getCommentary(value) {
	_ctyValue = value.value;
}
function callCty() {
	document.getElementById('savecty').addEventListener('click', function() {
		var chk = document.getElementsByName("cty");
		var selected = '';
		var Cty = '';
		for (var i = 0, len = chk.length; i < len; i++) {
			if (chk[i].checked == true) {
				selected = selected + chk[i].value + ',';
				Cty = Cty + chk[i].id + ',';
				chk[i].checked = false;
			}
		}
		chk = null;
		var btn = '<input type="button" value="{cty}">';
		btn = btn.replace('{cty}', selected.substring(0, selected.length - 1));
		grid.cells(_idrowvariant, grid.getColIndexById('Comm.')).setValue(btn);
		saveCommentary(_pattern, _idword, Cty.substring(0, Cty.length - 1), _iduser, function(isSave) {
			if (isSave) {
				var btn = '<input type="button" value="{cty}">';
				btn = btn.replace('{cty}', selected.substring(0, selected.length - 1));
				grid.cells(_idrowvariant, grid.getColIndexById('Comm.')).setValue(btn);
				document.getElementById('close').click();
			}
			Cty = null;
			selected = null;
		});
	});
	document.getElementById('close').addEventListener('click', function() {
		document.getElementById('displaypopup').innerHTML = '';
		document.getElementById('displaypopup').style.display = 'none';
	});
}
function saveE2(fcrid, pattern, idcomment, comment, iduser, idpage, callback) {
	var datas = { 'fcrid': fcrid, 'pattern': pattern, 'idcomment': idcomment, 'comment': comment, 'iduser': iduser, 'idpage': idpage };
	var strArray = new Array();
	strArray.push(datas);
	try {
		$.ajax({
			url: baseUrl + "/SaveE2",
			data: JSON.stringify(strArray),
			dataType: "json",
			type: "POST",
			async: true,
			cache: false,
			contentType: "text/plan;charset=utf-8",
			success: function(success) {
				callback(success);
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	} catch (e) {
		alert('saveE2 ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function searchPatternLabel(fcrid, callback) {
	try {
		$.ajax({
			url: baseUrl + "/E2",
			data: 'act=searchPatternLabel&fcrid=' + fcrid,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/text;charset=utf-8",
			success: function(pattern) {
				if (pattern != null) {
					callback(pattern);
				}
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	} catch (e) {
		alert('searchPatternLabel ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function nextUnit() {
	if (_objUnit != null && _objUnit.data.length > 0) {
		if (_idunit < parseInt(_objUnit.data[_objUnit.data.length - 1].unit)) {
			var content = _frame.getElementsByClassName('note-editable panel-body');
			content[0].innerHTML = '';
			_ukitUtil.loading('overlay');
			grid.clearAll();
			if (gunit.cells(gunit.getRowId(_idrow), gunit.getColIndexById("content")).getValue() != '') {
				searchH4DetailByUnitno(parseInt(_idunit) + 1, _iduser, function(obj) {
					if (obj.value == 'check' || obj.value == 'admin') {
						clearDisplay();
						var arrDetail = obj.description.split('@');
						_ukitUtil.closePopup('reset');
						var reset = new Object();
						if (obj.value == 'admin')
							reset.displayadmin = 'Please contract admin';
						else
							reset.displayadmin = '';
						reset.h1toh4 = _objH4;
						reset.unit = parseInt(_idunit) + 1;
						reset.detail = arrDetail[0];
						reset.content = arrDetail[1];
						_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'reset.jsp', reset, 'reset');
						_ukitUtil.unloading('overlay');
					} else {
						if (obj.value == 'true') {
							gunit.selectRowById(parseInt(_idrow) + 1);
							//							console.log(obj);
							document.getElementById('word').innerHTML = obj.object;
							document.getElementById('unitno').innerHTML = parseInt(_idunit) + 1;//obj.data[_idunit].unit;
						} else {
							dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + obj.description);
						}

						_idunit++;
						_idrow++;
						_ukitUtil.unloading('overlay');
					}
				});
			} else {
				//				alert(_idunit);
				document.getElementById('word').innerHTML = obj.data[parseInt(_idrow) + 1].detail;
				document.getElementById('unitno').innerHTML = obj.data[parseInt(_idrow) + 1].unit;
				gunit.selectRowById(parseInt(_idrow) + 1);
				_idunit++;
				_idrow++;
				_ukitUtil.unloading('overlay');
			}
		} else {
			_ukitUtil.getMessageById(43, _messageUI, function(msg) {
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
				_ukitUtil.unloading('overlay');
			});
		}
	}
}
function previousUnit() {
	if (_objUnit != null && _objUnit.data.length > 0) {
		if (_idrow != 0) {
			_ukitUtil.loading('overlay');
			var content = _frame.getElementsByClassName('note-editable panel-body');
			content[0].innerHTML = '';
			_idunit--;
			_idrow--;
			grid.clearAll();
			if (gunit.cells(gunit.getRowId(_idrow), gunit.getColIndexById("content")).getValue() != '') {
				searchH4DetailByUnitno(gunit.cells(gunit.getRowId(_idrow), gunit.getColIndexById("unit")).getValue(), _iduser, function(obj) {
					if (obj.value == 'check' || obj.value == 'admin') {
						clearDisplay();
						var arrDetail = obj.description.split('@');
						_ukitUtil.closePopup('reset');
						var reset = new Object();
						if (obj.value == 'admin')
							reset.displayadmin = 'Please contract admin';
						else
							reset.displayadmin = '';
						reset.h1toh4 = _objH4;
						reset.unit = gunit.cells(gunit.getRowId(_idrow), gunit.getColIndexById("unit")).getValue();
						reset.detail = arrDetail[0];
						reset.content = arrDetail[1];
						_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'reset.jsp', reset, 'reset');
						_ukitUtil.unloading('overlay');
					} else {
						if (obj.value == 'true') {
							gunit.selectRowById(_idrow);
							//							document.getElementById('word').innerHTML=obj.data[(_idunit-1)].detail;
							document.getElementById('unitno').innerHTML = _idunit;//(_obj.data[(_idunit-1)].unit;
							_ukitUtil.unloading('overlay');
						} else {
							dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + obj.description);
						}
						_ukitUtil.unloading('overlay');
					}
				});
			} else {
				//				document.getElementById('word').innerHTML=obj.data[(_idunit-1)].detail;
				document.getElementById('unitno').innerHTML = _idunit;//(_obj.data[(_idunit-1)].unit;			
				gunit.selectRowById(_idrow);
				_ukitUtil.unloading('overlay');
			}
		} else {
			_ukitUtil.getMessageById(42, _messageUI, function(msg) {
				dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>" + msg);
				_ukitUtil.unloading('overlay');
			});
		}
	}
}
function submitUnit(idh, unitno, iduser, idpage, fn) {
	var datas = { 'idh': idh, 'unitno': unitno, 'iduser': iduser, 'idpage': idpage };
	var strArray = new Array();
	strArray.push(datas);
	try {
		$.ajax({
			url: baseUrl + "/E2",
			data: JSON.stringify(strArray),
			dataType: "json",
			type: "POST",
			async: true,
			cache: false,
			contentType: "text/plan;charset=utf-8",
			headers: {
				"param": "submitUnit"
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
	} catch (e) {
		alert('submitUnit ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function saveEmendation(fcrid, iduser, content, idpage, callback) {
	try {
		$.ajax({
			url: baseUrl + "/E2",
			data: 'act=saveEmendation&fcrid=' + fcrid + '&iduser=' + iduser + '&content=' + content + '&idpage=' + idpage,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json;charset=utf-8",
			success: function(success) {
				callback(success);
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});

	} catch (e) {
		alert('saveEmendation ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function refreshWord(str, type) {
	try {
		str = _ukitUtil.replaceAll('<<', '&lt;&lt;', str);
		str = _ukitUtil.replaceAll('>>', '&gt;&gt;', str);
		str = _ukitUtil.replaceAll("'", '"', str);
		var word_ = $('#word').html();
		getStringById(_idwordgroup, function(tag) {
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
			tag = tag.substring(0, tag.length - 1);
			//				console.log(tag);
			//			 console.log('str\n'+ str.substr(0,str.length-6));
			//			var find = tag;
			//			var re = new RegExp(find, 'g');

			word_ = word_.replace(tag, str);
			$('#word').html(word_);
			clearGroup();
		});
	} catch (e) {
		alert('refreshword: ' + e.message);
	}
}
function getStringById(arrId, callback) {
	var strTag = ''; var tag = null;
	try {
		for (var i = 0, len = arrId.length; i < len; i++) {
			tag = document.getElementById(arrId[i]);
			strTag = strTag + tag.outerHTML + ' ';
		}
		callback(strTag);
	} catch (e) {
		alert('getStringById: ' + e.message);
	} finally {
		strTag = null; tag = null;
	}
}
function getReasonCommentChoice(fcrid, iduser) {
	try {
		_frame.getElementById('listreason').innerHTML = '';
		$.ajax({
			url: baseUrl + "/E2",
			data: 'act=showReasonCommentChoice&fcrid=' + fcrid + '&iduser=' + iduser,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/text;charset=utf-8",
			success: function(reasoncomment) {
				if (reasoncomment.value == 'true') {
					//					_frame.getElementById('listreason').innerHTML='';
					_frame.getElementById('reason').innerHTML = reasoncomment.description;
					_frame.getElementById('savereasoncomment').addEventListener('click', function() {
						var chk = _frame.getElementsByName("reasonchoice");
						var idreason = ''; var value = '';
						for (var i = 0, len = chk.length; i < len; i++) {
							if (chk[i].checked) {
								idreason = idreason + chk[i].id + '|';
								value = value + chk[i].value + ';&nbsp;';
							}
						}
						saveReasonComment(_idword, 2, _iduser, idreason.substring(0, idreason.length - 1), function(success) {
							if (success) {
								//									alert(success);
							}
							value = null;
						});
					});
					_frame.getElementById('savereasoncomment').addEventListener('click', function() {
						addEventReasonComment();
					});
					addEventReasonComment();
				}
			},
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	} catch (e) {
		alert('getCommentaryChoice ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function addEventReasonComment() {
	//	 _frame.getElementById('savereasoncomment').addEventListener('click',function(){
	_frame.getElementById('listreason').innerHTML = '';
	var reason = _frame.getElementsByName('reasonchoice');
	for (var i = 0; i < reason.length; i++) {
		if (reason[i].checked) {
			var html = '<div id="{id}" class="fstChoiceItem">{display}<button id="{bid}" value="{value}" class="fstChoiceRemove" type="button">×</button></div>';
			html = html.split('{id}').join('r' + parseInt(reason[i].id));
			html = html.split('{bid}').join('b' + parseInt(reason[i].id));
			html = html.split('{value}').join(reason[i].value);
			html = html.split('{display}').join(reason[i].value);
			_frame.getElementById('listreason').innerHTML += html;
		}
	}
	var cssLength = _frame.getElementsByClassName('fstChoiceItem');
	for (var i = 0; i < cssLength.length; i++) {
		var rm = _frame.getElementById(cssLength[i].children[0].id);
		if (rm != null) {
			_frame.getElementById(cssLength[i].children[0].id).removeEventListener('click', function() { });
			_frame.getElementById(cssLength[i].children[0].id).addEventListener('click', function() {
				_frame.getElementById('r' + this.id.substring(1, this.id.length)).outerHTML = '';
				_frame.getElementById(this.id.substring(1, this.id.length)).checked = false; //clear checkbox
				_frame.getElementById('savereasoncomment').click();
			});
		}
	}
	//	 });
}
function saveReasonComment(fcrid, idpage, iduser, idreason, callback) {
	try {
		$.ajax({
			url: baseUrl + "/E2",
			data: 'act=saveReasoncomment&fcrid=' + fcrid + '&idpage=' + idpage + '&iduser=' + iduser + '&idreason=' + encodeURIComponent(idreason),
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json;charset=utf-8",
			success: function(success) {
				if (success != null) {
					_idcomment = success.description.substring(success.description.indexOf('#') + 1, success.description.length);
					if (success.value == 'true')
						isSave = true;
					else
						isSave = false;
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

	} catch (e) {
		alert('saveReasonComment ' + e.message);
	} finally {
		datas = null; strArray = null;
	}
}
function E2() {
	E2.prototype.searchLine = function(fcrid, fn) {
		var datas = { 'fcrid': fcrid };
		_ukitUtil.ajax(baseUrl + '/Tool', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'searchLine', function(success) {
			fn(success);
		});
	};
}