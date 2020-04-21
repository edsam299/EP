var ReportService=new ReportWord();
document.getElementById('editing').addEventListener('click', function(){
	ReportService.loadData('history_editing', 'Editing');
	clearTreemenuColor(this);
});
//document.getElementById('revise').addEventListener('click', function(){
//	
//});
document.getElementById('undecided_all_of_word').addEventListener('click', function(){
	ReportService.loadData(1, 'All Record of Undecided Word');
	clearTreemenuColor(this);
});
document.getElementById('emendation').addEventListener('click', function(){
	ReportService.loadData(2, 'Emendation');
	clearTreemenuColor(this);
});
document.getElementById('interesting').addEventListener('click', function(){
	ReportService.loadData(3, 'Interesting');
	clearTreemenuColor(this);
});
document.getElementById('footnote_comment').addEventListener('click', function(){
	ReportService.loadData(4, 'Comment And Footnote');
	clearTreemenuColor(this);
});
document.getElementById('undecided_word').addEventListener('click', function(){
	ReportService.loadData(5, 'Undecided Word');
	clearTreemenuColor(this);
});

function ReportWord(){
	ReportWord.prototype.searchAllSeries=function(fn){
		_ukitUtil.ajax(baseUrl + '/service/Report', '', 'json', 'post', true, false,'application/json', 'getAllSeries', function(success) {	
			fn(success);
		});
	};
	ReportWord.prototype.searchBasetextBySeriesId=function(idseries, fn){
		var data={idseries:idseries};
		_ukitUtil.ajax(baseUrl + '/service/Report', JSON.stringify(data), 'json', 'post', true, false,'application/json', 'getBastextByIdseries', function(success) {	
			fn(success);
		});
	};
	ReportWord.prototype.searchSuttaByIdbasetext=function(idbasetext, fn){
		var data={idbasetext:idbasetext};
		_ukitUtil.ajax(baseUrl + '/service/Report', JSON.stringify(data), 'json', 'post', true, false,'application/json', 'getSuttaByIdbasetext', function(success) {	
			fn(success);
		});
	};
	ReportWord.prototype.searchSectionByIdSutta=function(idsutta, fn){
		var data={idsutta:idsutta};
		_ukitUtil.ajax(baseUrl + '/service/Report', JSON.stringify(data), 'json', 'post', true, false,'application/json', 'getSectionByIdsutta', function(success) {	
			fn(success);
		});
	};
	ReportWord.prototype.searchUnitByIdSection=function(idsutta, fn){
		var data={idsutta:idsutta};
		_ukitUtil.ajax(baseUrl + '/service/Report', JSON.stringify(data), 'json', 'post', true, false,'application/json', 'getUnitByIdSection', function(success) {	
			fn(success);
		});
	};
	ReportWord.prototype.reset = function(){
		document.getElementById('unit').innerHTML='';
		document.getElementById('basetext').innerHTML='';
		document.getElementById('sutta').innerHTML='';
		document.getElementById('section').innerHTML='';
		document.getElementById('btnexport_sutta').innerHTML='';
		document.getElementById('btnexport_section').innerHTML='';
		document.getElementById('btnexport_unit').innerHTML='';
	};
	ReportWord.prototype.loadBaseText = function(fn){
		var table=null; var item=null;
		var table_s=document.getElementById('t_series');
		var close_table='</tbody></table></div></div>';
		highlight_row('t_series');
		for(var i=0; i<table_s.rows.length; i++){
			table_s.rows[i].onclick = function(){
				highlight_row('t_series');
				ReportService.reset();
				ReportService.searchBasetextBySeriesId(table_s.rows[this.rowIndex].cells[0].innerText, function(basetext){
					if(basetext.value=='true'){
						table=' <div class="headercontainer"><div class="tablecontainer" style="height:200px;">';
						table+='<table id="t_basetext"><thead><tr>';
						table+='<th style="display:none">Id<div style="display:none">Id</div></th><th>BaseText<div>BaseText</div></th>';
						table+='<th style="display:none">fcrid<div style="display:none">fcrid</div>';
						table+='<th style="display:none">fnseq<div style="display:none">fnseq</div><th style="display:none">fcedition<div style="display:none">fcedition</div></tr>';
						table+='</thead><tbody>';
						tr_td='';
						item='';
						for(var j=0; j<basetext.jsonarray.length; j++){
							tr_td='<tr><td style="display:none">{col1}</td><td style="width:5%">{col2}</td><td style="display:none">{col3}</td><td style="display:none">{col4}</td><td style="display:none">{col5}</td></tr>';
							tr_td=tr_td.split('{col1}').join(basetext.jsonarray[j].id);
							tr_td=tr_td.split('{col2}').join(basetext.jsonarray[j].fcname);
							tr_td=tr_td.split('{col3}').join(basetext.jsonarray[j].fcrid);
							tr_td=tr_td.split('{col4}').join(basetext.jsonarray[j].fnseq);
							tr_td=tr_td.split('{col5}').join(basetext.jsonarray[j].fcedition);
							item+=tr_td;
						}
						document.getElementById('basetext').innerHTML=table+item+close_table;
						fn(true);
					}else{
						document.getElementById('basetext').innerHTML='';
						fn(false);
					}
				});
			};
		}
	};
	ReportWord.prototype.loadSutta = function(fn){
		var table=null; var item=null;
		var table_s=document.getElementById('t_basetext');
		var close_table='</tbody></table></div></div>';
		highlight_row('t_basetext');
		for(var i=0; i<table_s.rows.length; i++){
			table_s.rows[i].onclick = function(){
				highlight_row('t_basetext');
				ReportService.searchSuttaByIdbasetext(table_s.rows[this.rowIndex].cells[0].innerText, function(sutta){
					if(sutta.value=='true'){
						table=' <div class="headercontainer"><div class="tablecontainer" style="height:200px;">';
						table+='<table id="t_sutta"><thead><tr>';
						table+='<th style="display:none">Id<div style="display:none">Id</div></th><th><div><input type="checkbox" id="chkallsutta"></div></th><th>Sutta<div>Sutta</div></th>';
						table+='<th style="display:none">fcrid<div style="display:none">fcrid</div>';
						table+='<th style="display:none">fnseq<div style="display:none">fnseq</div><th style="display:none">fcedition<div style="display:none">fcedition</div></tr>';
						table+='</thead><tbody>';
						tr_td='';
						item='';
						for(var j=0; j<sutta.jsonarray.length; j++){
							tr_td='<tr><td style="display:none">{col1}</td><td style="width:1%">{col_chk}</td><td style="width:5%">{col2}</td><td style="display:none">{col3}</td><td style="display:none">{col4}</td><td style="display:none">{col5}</td></tr>';
							tr_td=tr_td.split('{col1}').join(sutta.jsonarray[j].id);
							tr_td=tr_td.split('{col_chk}').join('<input type="checkbox" name="chksutta" id={id}>').split('{id}').join('"'+sutta.jsonarray[j].id+'"');
							tr_td=tr_td.split('{col2}').join(sutta.jsonarray[j].fcname);
							tr_td=tr_td.split('{col3}').join(sutta.jsonarray[j].fcrid);
							tr_td=tr_td.split('{col4}').join(sutta.jsonarray[j].fnseq);
							tr_td=tr_td.split('{col5}').join(sutta.jsonarray[j].fcedition);
							item+=tr_td;
						}
						document.getElementById('sutta').innerHTML=table+item+close_table;
						fn(true);
					}else{
						document.getElementById('sutta').innerHTML='';
						fn(false);
					}
				});
			};
		}
	};
	ReportWord.prototype.loadSection = function(fn){
		var table=null; var item=null;
		var table_s=document.getElementById('t_sutta');
		var close_table='</tbody></table></div></div>';
		highlight_row('t_sutta');
		for(var i=0; i<table_s.rows.length; i++){
			table_s.rows[i].onclick = function(){
				if(table_s.rows[this.rowIndex].cells[0].innerText=='IdId')
					return;
				highlight_row('t_sutta');
				ReportService.searchSectionByIdSutta(table_s.rows[this.rowIndex].cells[0].innerText, function(section){
					if(section.value=='true'){
						table=' <div class="headercontainer"><div class="tablecontainer" style="height:200px;">';
						table+='<table id="t_section"><thead><tr>';
						table+='<th style="display:none">Id<div style="display:none">Id</div></th><th><div><input type="checkbox" id="chkallsection"></div></th><th>Section<div align="center">Section</div></th>';
						table+='<th style="display:none">fcrid<div style="display:none">fcrid</div>';
						table+='<th style="display:none">fnseq<div style="display:none">fnseq</div><th style="display:none">fcedition<div style="display:none">fcedition</div></tr>';
						table+='</thead><tbody>';
						tr_td='';
						item='';
						for(var j=0; j<section.jsonarray.length; j++){
							tr_td='<tr><td style="display:none">{col1}</td><td style="width:1%">{col_chk}</td><td style="width:5%">{col2}</td><td style="display:none">{col3}</td><td style="display:none">{col4}</td><td style="display:none">{col5}</td></tr>';
							tr_td=tr_td.split('{col1}').join(section.jsonarray[j].id);
							tr_td=tr_td.split('{col_chk}').join('<input type="checkbox" name="chksection" id={id}>').split('{id}').join('"'+section.jsonarray[j].id+'"');
							tr_td=tr_td.split('{col2}').join(section.jsonarray[j].fcname);
							tr_td=tr_td.split('{col3}').join(section.jsonarray[j].fcrid);
							tr_td=tr_td.split('{col4}').join(section.jsonarray[j].fnseq);
							tr_td=tr_td.split('{col5}').join(section.jsonarray[j].fcedition);
							item+=tr_td;
						}
						document.getElementById('section').innerHTML=table+item+close_table;
						highlight_row('t_section');
						fn(true);
					}else{
						document.getElementById('section').innerHTML='';
						fn(false);
					}
				});
			};
		}
	};
	ReportWord.prototype.loadUnit = function(menu, fn){
		var table=null; var item=null;
		var table_s=document.getElementById('t_section');
		var close_table='</tbody></table></div></div>';
		highlight_row('t_section');
		for(var i=0; i<table_s.rows.length; i++){
			table_s.rows[i].onclick = function(){
				if(table_s.rows[this.rowIndex].cells[0].innerText=='IdId')
					return;
				ReportService.searchUnitByIdSection(table_s.rows[this.rowIndex].cells[0].innerText, function(unit){
					console.log(unit);
					if(unit.value=='true'){
						table=' <div class="headercontainer"><div class="tablecontainer" style="height:200px;">';
						table+='<table id="t_unit"><thead><tr>';
						table+='<th style="display:none">Idh<div style="display:none">Idh</div></th><th><div><input type="checkbox" id="chkallunit"></div></th>';
						table+='<th>Unit<div align="center">Unit No</div></th><th>Content<div align="center">Content</div></th></tr>';
//						table+='</th></tr>';
//						table+='<th style="display:none">fnseq<div style="display:none">fnseq</div><th style="display:none">fcedition<div style="display:none">fcedition</div></tr>';
						table+='</thead><tbody>';
						tr_td='';
						item='';
						for(var j=0; j<unit.jsonarray.length; j++){
							tr_td='<tr><td style="display:none">{col1}</td><td style="width:1%">{col_chk}</td><td style="width:15%">{col2}</td><td>{col3}</td></tr>';
							tr_td=tr_td.split('{col1}').join(unit.jsonarray[j].idh);
							tr_td=tr_td.split('{col_chk}').join('<input type="checkbox" name="chkunit" id={id}>').split('{id}').join('"'+unit.jsonarray[j].idh+'|'+unit.jsonarray[j].unitno+'"');
							tr_td=tr_td.split('{col2}').join(unit.jsonarray[j].unitno);
							tr_td=tr_td.split('{col3}').join(unit.jsonarray[j].content);
							item+=tr_td;
						}
						document.getElementById('unit').innerHTML=table+item+close_table;
						document.getElementById('chkallunit').addEventListener('click', function(){
							var chkall=document.getElementsByName('chkunit');
							for(var i=0; i<chkall.length; i++){
								if(this.checked){
									chkall[i].checked=true;
								}else{
									chkall[i].checked=false;
								}
							}
						});
						highlight_row('t_unit');
						document.getElementById('btnexport_unit').innerHTML='<button type = "button" id="export_unit" class = "btn btn-primary">Export Unit</button>';
						document.getElementById('export_unit').addEventListener('click', function(){
							_ukitUtil.loading('overlay');
							var chk_unit =document.getElementsByName('chkunit'); 
							var unit='';
							for(var i=0; i<chk_unit.length; i++){
								if(chk_unit[i].checked){
									unit+=chk_unit[i].id+',';
								}
							}
							console.log('unit : '+unit);
							if(unit!=''){
								if(menu=='history_editing' || menu=='history_revise'){
									ReportService.editingHistory('', '', unit.substring(0,unit.length-1), menu, 'Unit', function(excelFile){
										if(excelFile.value)
											window.location.href=excelFile.file;
										else
											dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+excelFile.message);
										_ukitUtil.unloading('overlay');
									});
								}else{
//									ReportService.getWordList('', unit.substring(0,section.length-1), menu, reportName, function(excelFile){
//										if(excelFile.value)
//											window.location.href=excelFile.file;
//										else
//											dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+excelFile.message);
//										_ukitUtil.unloading('overlay');
//									});
								}
							}else{
								dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>Please select Unit");
								_ukitUtil.unloading('overlay');
							}
						});// export_section button event
						
					
						fn(true);
					}else{
						document.getElementById('unit').innerHTML='';
						fn(false);
					}
				});
			};
		}
	};
	ReportWord.prototype.loadData = function(menu, reportName){
		this.reset();
		this.searchAllSeries(function(series){
			var table=' <div class="headercontainer"><div class="tablecontainer" style="height:200px;">';
			table+='<table id="t_series"><thead><tr>';
			table+='<th style="display:none">Id<div style="display:none">Id</div></th><th>Series<div>Series</div></th>';
			table+='<th style="display:none">fcrid<div style="display:none">fcrid</div><th style="display:none">fnseq<div style="display:none">fnseq</div></tr>';
			table+='</thead><tbody>';
			var tr_td=null;
			var item='';
			var close_table='</tbody></table></div></div>';
			if(series.value=='true'){
				for(var i=0; i<series.jsonarray.length; i++){
					tr_td='<tr><td style="display:none">{col1}</td><td style="width:5%">{col2}</td><td style="display:none">{col3}</td><td style="display:none">{col4}</td></tr>';
					tr_td=tr_td.split('{col1}').join(series.jsonarray[i].id);
					tr_td=tr_td.split('{col2}').join(series.jsonarray[i].fcname);
					tr_td=tr_td.split('{col3}').join(series.jsonarray[i].fcrid);
					tr_td=tr_td.split('{col4}').join(series.jsonarray[i].fnseq);
					item+=tr_td;
				}
				document.getElementById('series').innerHTML=table+item+close_table;
				ReportService.loadBaseText(function(isLoad){
					if(isLoad){
						ReportService.loadSutta(function(isLoad){
							if(isLoad){
								document.getElementById('btnexport_sutta').innerHTML='<button type = "button" id="export_sutta" class = "btn btn-primary">Export Sutta</button>';
								document.getElementById('chkallsutta').addEventListener('click', function(){
									var chkall=document.getElementsByName('chksutta');
									for(var i=0; i<chkall.length; i++){
										if(this.checked){
											chkall[i].checked=true;
										}else{
											chkall[i].checked=false;
										}
									}
								});
								document.getElementById('export_sutta').addEventListener('click', function(){
									_ukitUtil.loading('overlay');
									var chk_sutta=document.getElementsByName('chksutta');
									var sutta='';
									for(var i=0; i<chk_sutta.length; i++){
										if(chk_sutta[i].checked){
											sutta+=chk_sutta[i].id+',';
										}
									}
									if(sutta!=''){
										if(menu=='history_editing' || menu=='history_revise'){
											ReportService.editingHistory(sutta.substring(0,sutta.length-1), '', '', menu, 'Sutta', function(excelFile){
												if(excelFile.value)
													window.location.href=excelFile.file;
												else
													dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+excelFile.message);
												_ukitUtil.unloading('overlay');
											});
										}else{
											ReportService.getWordList(sutta.substring(0,sutta.length-1), '', menu, reportName, function(excelFile){
												if(excelFile.value)
													window.location.href=excelFile.file;
												else
													dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+excelFile.message);
												_ukitUtil.unloading('overlay');
											});
										}
									}else{
										dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>Please select Sutta");
										_ukitUtil.unloading('overlay');
									}
								});

								ReportService.loadSection(function(isLoad){
									if(isLoad){
										document.getElementById('chkallsection').addEventListener('click', function(){
											var chkall=document.getElementsByName('chksection');
											for(var i=0; i<chkall.length; i++){
												if(this.checked){
													chkall[i].checked=true;
												}else{
													chkall[i].checked=false;
												}
											}
										});
										document.getElementById('btnexport_section').innerHTML='<button type = "button" id="export_section" class = "btn btn-primary">Export Section</button>';
										document.getElementById('export_section').addEventListener('click', function(){
											_ukitUtil.loading('overlay');
											var chk_section=document.getElementsByName('chksection');
											console.log(chk_section);
											var section='';
											for(var i=0; i<chk_section.length; i++){
												if(chk_section[i].checked){
													section+=chk_section[i].id+',';
												}
											}
											if(section!=''){
												if(menu=='history_editing' || menu=='history_revise'){
													ReportService.editingHistory('', section.substring(0,section.length-1), '', menu, 'Section', function(excelFile){
														if(excelFile.value)
															window.location.href=excelFile.file;
														else
															dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+excelFile.message);
														_ukitUtil.unloading('overlay');
													});
												}else{
													ReportService.getWordList('', section.substring(0,section.length-1), menu, reportName, function(excelFile){
														if(excelFile.value)
															window.location.href=excelFile.file;
														else
															dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+excelFile.message);
														_ukitUtil.unloading('overlay');
													});
												}
											}else{
												dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>Please select Section");
												_ukitUtil.unloading('overlay');
											}
										});// export_section button event
										
									}
									if(menu=='history_editing'){
										ReportService.loadUnit(menu, function(success){
//											alert(success);
										});
									}
								});//loadSection
							}
						});//loadSutta
					}
				});//loadBaseText
			}
		});//searchAllSeries
	};
	
	ReportWord.prototype.getWordList = function(sutta, section, menu, header_report, fn){
		var data={sutta:sutta, section:section, menu:menu, header_report:header_report};
		_ukitUtil.ajax(baseUrl + '/service/Report', JSON.stringify(data), 'json', 'post', true, false,'application/json', 'getWordList', function(success) {	
			fn(success);
		});
	};
	ReportWord.prototype.editingHistory = function(sutta, section, unit, menu, header_report, fn){
		var data={sutta:sutta, section:section, unit:unit, menu:menu, header_report:header_report};
		_ukitUtil.ajax(baseUrl + '/service/Report', JSON.stringify(data), 'json', 'post', true, false,'application/json', 'editingHistory', function(success) {	
			fn(success);
		});
	};
};

function clearTreemenuColor(tree){
	var a_tag=document.getElementsByName(tree.name);
    for(var i=0; i<a_tag.length; i++){
        a_tag[i].style.color='black';
    }
    tree.style.color='blue';
 }

//window.onload = highlight_row;
//function highlight(idtable){
//	 var table = document.getElementById(idtable);
//	 for (var i=0;i < table.rows.length;i++){
//	  table.rows[i].onclick= function () {
//	   if(!this.hilite){
//	    unhighlight(idtable);
//	    this.origColor=this.style.backgroundColor;
//	    this.style.backgroundColor='#BCD4EC';
//	    this.hilite = true;
//	   }
//	   else{
//	    this.style.backgroundColor=this.origColor;
//	    this.hilite = false;
//	   }
//	    };
//	 }
//	}
//function unhighlight(idtable){
//	 var table = document.getElementById(idtable);
//	 for (var i=0;i < table.rows.length;i++){
//	   var row = table.rows[i];
//	   console.log(this.o)
//	   row.style.backgroundColor=this.origColor;
//	   row.hilite = false;
//	 }
//}