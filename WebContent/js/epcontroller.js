function loadButton(idrole,idpage){
    try{
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: "act=searchButtonByIdRoleIdPageForActive&idrole="+idrole+"&idpage="+idpage+'&r='+Math.random(),
            dataType: "json",
            type: "GET",
            async: false,
            cache: false,
            contentType: "application/json",
            success: function(button) {
            	if(button!=null){
            		for(var i=0, len=button.length; i<len; i++){
            			$('#'+button[i].div).html(button[i].name);
//            			console.log(button[i].div+'--'+button[i].name);
//            			alert(button[i].div+'--'+button[i].name);
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
        alert('loadButton '+e.message);
    }
}

function buttonConfigByRole(idrole,fn){
	var arr_button=[];
	try{
		if(idrole!=4){
			arr_button=[{'name':'Group'},{'name':'Ungroup'},{'name':'Submit Unit'},{'name':'Reason'}];
		}
		fn(arr_button);
	}catch(e){
		alert('buttonConfigByRole '+e.message);
	}finally{arr_button=null;}
}

function loadButtonCheckunit(idrole,idpage,arr_btnname,fn){
    try{
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: "act=searchButtonByIdRoleIdPageForActive&idrole="+idrole+"&idpage="+idpage+'&r='+Math.random(),
            dataType: "json",
            type: "GET",
            async: false,
            cache: false,
            contentType: "application/json",
            success: function(button) {
            	if(button!=null){
            		for(var i=0, len=button.length; i<len; i++){          		
            			for(var j=0, arrlen=arr_btnname.length; j<arrlen; j++){
            				if(button[i].description==arr_btnname[j].name){
            					if(document.getElementById(button[i].div)!=null){
                					document.getElementById(button[i].div).style.display='none';
                					arr_btnname.splice(j,1);
                					break;
            					}
            				}
            			}
            		}
            	}
            	fn(button);
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
    }catch(e){
    	console.log(e);
        alert('loadButton '+e.message);
    }
}

function loadMenu(idrole){
    try{
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: "act=loadMenu&idrole="+idrole+'&r='+Math.random(),
            dataType: "json",
            type: "GET",
            async: false,
            cache: false,
            contentType: "application/json",
            success: function(menu) {
            	if(menu!=null){
            		$('#menu').html(menu);
            	}else
            		dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>Not Permission Menu");
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
    }catch(e){
        alert('loadMenu '+e.message);
    }
}

function permissionpage(idrole,idpage,idmenu,callback){
    try{
    	var ispermission=false;
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: "act=searchPageByIdRoleIdMenuForActive&idrole="+idrole+"&idmenu="+idmenu+'&r='+Math.random(),
            dataType: "json",
            type: "GET",
            async: false,
            cache: false,
            contentType: "application/json",
            success: function(page) {
            	if(page!=null){
            		for(var i=0, len=page.length; i<len; i++){
            			if(page[i].id==idpage && page[i].status==1){
            				ispermission=true;
            				break;
            			}
            		}
            	}
            	setTimeout(function() { callback(ispermission); }, 1);
//            	if(!ispermission){        
//            		dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>Not Permission...");
////            		$("#content").mask();
////            		setTimeout(function(){  
//            			window.close();
////            			window.location.href='./url?operation=Main Menu&id=1';   
////            		}, 1500);
//            	}else{
////            		window.location.assign('e1.jsp');
////            		loadButton(idrole, idpage);	
//            	}            		
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
//		return ispermission;
    }catch(e){
        alert('permissionpage '+e.message);
    }
}

function searchUnitByH4(seq,idh1,idh2,idh3,idh4,iduser,fn){
    try{
		$.ajax({
            url: baseUrl+"/E2",
            data: "act=searchUnitByH4&seq="+seq+"&h1="+idh1+"&h2="+idh2+"&h3="+idh3+"&h4="+idh4+'&iduser='+iduser+'&rnd='+Math.random(),
            dataType: "json",
            type: "GET",
            async: true,
            cache: false,
            contentType: "application/json",
            success: function(oSection) {
            	fn(oSection);
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

function setXmlTree(fn){
	try{
		$.ajax({
			url: baseUrl+"/E1",
			data: "act=getXmlTree",
			dataType: "json",
			type: "GET",
			async: false,
			cache: false,
			contentType: "application/json",
			success: function(objBean) {
				if(objBean!=null){
					fn(objBean.description);
				}else
					fn(null);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('epcontroller: setXmlTree '+e.message);
	}
}

function searchSectionOverviewGrid(id, fn){
	try{
		$.ajax({
			url: baseUrl+"/service/Rearrange",
			data: "act=searchSectionOverviewGrid&id="+id,
			dataType: "json",
			type: "GET",
			async: false,
			cache: false,
			contentType: "application/json",
			success: function(objBean) {
				fn(objBean);

			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('epcontroller: searchSectionOverviewGrid '+e.message);
	}
}



function getSection(id,fn){
	try{
		$.ajax({
            url: baseUrl+"/E1",
            data: "act=getSection&id="+id,
            dataType: "json",
            type: "GET",
            async: true,
            cache: false,
            contentType: "application/json",
            success: function(objSection) {
            		fn(objSection);        		         
            }, 
            error: function(data,t,m) {
                if (data.responseText != null && data.responseText != "") {
                	alert(data.responseText);    	
                }
            }
		});
	}catch(e){
		alert('epcontroller: getSection '+e.message);
	}
}

function getE2Header(idh1,idh2,idh3,idh4,fn){
	try{
		$.ajax({
            url: baseUrl+"/E2",
            data: "act=getE2Header&h1="+_idh1+"&h2="+_idh2+"&h3="+_idh3+"&h4="+_idh4+"&r="+Math.random(),
            dataType: "json",
            type: "GET",
            async: true,
            cache: false,
            contentType: "application/json",
            success: function(header) {
            	fn(header);
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
	}catch(e){
		alert('getE2Header: '+e.message);
	}
}

function viewHistory(tagview,display){
	$(tagview).show();
	jQuery(tagview).dialog({
		modal: true,
		buttons: [{
			text:'OK',
			handler:function(){
				$(tagview).dialog("close");
			}
		},{
			text:'Cancel',
			handler:function(){
				$(tagview).dialog("close");
			}
		}],
		autoOpen: false,
		title:display,
		height:650,
		width:1100
	});
	$( tagview ).dialog( "open" );	
}

function setXmlTreeH1ToH2(fn){
	try{
		$.ajax({
			url: baseUrl+"/service/ManageLinking",
			data: "param=setXmlTreeH1ToH2",
			dataType: "json",
			type: "GET",
			async: false,
			cache: false,
			contentType: "application/json",
			success: function(objBean) {
				if(objBean!=null){
					fn(objBean.description);
				}else
					fn(null);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('epcontroller: setXmlTree 2 param'+e.message);
	}
}

function setXmlTreeH1ToH4(fn){
	try{
		$.ajax({
            url: baseUrl+"/Tool",
            data: "act=setXMLTreeH1toH4",
            dataType: "json",
            type: "GET",
            async: false,
            cache: false,
            contentType: "application/json",
            success: function(objBean) {
				fn(objBean.description);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('epcontroller: setXmlTreeH1ToH4'+e.message);
	}
}

function contentService(){
	contentService.prototype.checkBasetextStatus = function(fcrid, flag, fn){
		var ukit=new UkitUtil();
		var datas={'fcrid':fcrid, 'flag':flag};
		ukit.ajax(baseUrl+'/E2', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'checkBasetextStatus', function(success){
			fn(success);
		});
		ukit=null;
	};
	
	contentService.prototype.resetUnit = function(fcrid, unitno, iduser, fn){
		var ukit=new UkitUtil();
		var datas={'fcrid':fcrid, 'unitno':unitno, 'iduser':iduser};
		ukit.ajax(baseUrl+'/E2', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'resetUnit', function(success){
			fn(success);
		});
		ukit=null;
	};
	
	contentService.prototype.getBaseText = function(h4, unitno, iduser, fn){
		var ukit=new UkitUtil();
		var datas={'h4':h4, 'unitno':unitno, 'iduser':iduser};
		ukit.ajax(baseUrl+'/E2', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'getBaseText', function(success){
			fn(success);
		});
		ukit=null;
	};
	
	contentService.prototype.getTable = function(fcbaseid, fn){
		var ukit=new UkitUtil();
		var datas={'fcbaseid':fcbaseid};
		ukit.ajax(baseUrl+'/E2', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'getTable', function(success){
			fn(success);
		});
		ukit=null;
	};
}

function comment(){
	comment.prototype.saveComment=function(fcrid, iduser, idpage, comment, conclusion, fn){
		var data={'fcrid':fcrid, 'iduser':iduser, 'idpage':idpage, 'comment':utf8_to_b64(comment), 'conclusion':conclusion};
		_ukitUtil.ajax(baseUrl+'/E2',JSON.stringify(data),'json','post', true, false, 'application/json','saveComment', function(data){
			fn(data);
		});
	};
	comment.prototype.searchComment=function(fcrid, fn){
		var data={'fcrid':fcrid};
		_ukitUtil.ajax(baseUrl+'/E2',JSON.stringify(data),'json','post', true, false, 'application/json','searchComment', function(data){
			fn(data);
		});
	};
	comment.prototype.manageComment=function(fcrid, iduser, idpage, comment, conclusion, flagedit, idcomment, fn){
		var data={'fcrid':fcrid, 'iduser':iduser, 'idpage':idpage, 'comment':comment, 'conclusion':conclusion, 'flagedit':flagedit, 'idcomment':idcomment};
		_ukitUtil.ajax(baseUrl+'/E2',JSON.stringify(data),'json','post', true, false, 'application/json','manageComment', function(data){
			fn(data);
		});
	};
}
function exportService(){
	exportService.prototype.getTableH1ToH4= function(level, id, fn){
		var datas={'level':level,'id':id};
		_ukitUtil.ajax(baseUrl+'/service/Export', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'getTableH1ToH4', function(success){
			fn(success);
		});
	};
	exportService.prototype.getUnit= function(idseries, idbasetext, idsutta, idsection, fn){
		var datas={'idseries':idseries,'idbasetext':idbasetext, 'idsection':idsection, 'idsutta':idsutta};
		_ukitUtil.ajax(baseUrl+'/service/Export', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'getUnit', function(success){
			fn(success);
		});
	};
	exportService.prototype.exportWordByUnit= function(idseries, idbasetext, idsutta, idsection, unit, excluding, fn){
		var datas={'idseries':idseries,'idbasetext':idbasetext, 'idsection':idsection, 'idsutta':idsutta, 'unit':unit, 'excluding':excluding};
		_ukitUtil.ajax(baseUrl+'/service/Export', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'exportWordByUnit', function(success){
			fn(success);
		});
	};
	exportService.prototype.exportWordByUnitFromE2= function(idseries, idbasetext, idsutta, idsection, unit, excluding, fn){
		var datas={'idseries':idseries,'idbasetext':idbasetext, 'idsection':idsection, 'idsutta':idsutta, 'unit':unit, 'excluding':excluding};
		_ukitUtil.ajax(baseUrl+'/service/Export', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'exportWordByUnitFromE2', function(success){
			fn(success);
		});
	};
	exportService.prototype.exportWordBySutta= function(idseries, idbasetext, idsutta, excluding, fn){
		var datas={'idseries':idseries,'idbasetext':idbasetext, 'idsutta':idsutta, 'excluding':excluding};
		_ukitUtil.ajax(baseUrl+'/service/Export', JSON.stringify(datas), 'json', 'post', true, false, 'application/json', 'exportWordBySutta', function(success){
			fn(success);
		});
	};
}
function html(){
	html.prototype.replaceTag = function(htmlTag, fn){
		var tmpPattern=_ukitUtil.replaceAll('&lt;', '<', htmlTag);
		tmpPattern=_ukitUtil.replaceAll('<', '&lt;',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll('>', '&gt;',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll('&lt;i&gt;','<i>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll( '&lt;/i&gt;','</i>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll('&lt;em&gt;','<em>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll( '&lt;/em&gt;','</em>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll('&lt;sup&gt;','<sup>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll( '&lt;/sup&gt;','</sup>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll('&lt;sub&gt;','<sub>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll( '&lt;/sub&gt;','</sub>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll('&lt;span','<span',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll('&lt;u&gt;','<u>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll( '&lt;/u&gt;','</u>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll( '"&gt;','">',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll('&lt;strong&gt;','<strong>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll( '&lt;/strong&gt;','</strong>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll('&lt;br&gt;','<br>',tmpPattern);
	   tmpPattern=_ukitUtil.replaceAll( '&lt;/br&gt;','</br>',tmpPattern);	
	   tmpPattern=_ukitUtil.replaceAll( '&lt;p&gt;','<p>',tmpPattern);	
	   tmpPattern=_ukitUtil.replaceAll( '&lt;/p&gt;','</p>',tmpPattern);
	   fn(tmpPattern);
	};
}