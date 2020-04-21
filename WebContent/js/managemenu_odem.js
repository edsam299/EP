var _grole=null;
var _gmenu=null;
var _gpage=null;
var _gbutton=null;
var _ukitUtil=null;
var _idrole=null;
var _idmenu=null;
$(document).ready(function(){
	_ukitUtil = new UkitUtil();

	_gbutton=_ukitUtil.createDhtmlxGrid('buttonname');
	_gbutton.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gbutton.setHeader("<div align='center'>*</div>,<div align='center'>Button Name</div>,id");
	_gbutton.setColumnIds("status,buttonname,id");
	_gbutton.setInitWidths("30,200,0");
	_gbutton.setColAlign("left,left,left");
	_gbutton.setColTypes("ch,ro,ro");
	_gbutton.setSkin('modern');
	_gbutton.enableAutoWidth(true);
	_gbutton.init();
	
	_gmenu=_ukitUtil.createDhtmlxGrid('menuname');
	_gmenu.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gmenu.setHeader("<div align='center'>*</div>,<div align='center'>Menu Name</div>,idmenu");
	_gmenu.setColumnIds("status,menuname,idmenu");
	_gmenu.setInitWidths("30,200,0");
	_gmenu.setColAlign("left,left,left");
	_gmenu.setColTypes("ch,ro,ro");
	_gmenu.setSkin('modern');
	_gmenu.enableAutoWidth(true);
	_gmenu.attachEvent("onRowSelect",function(id,ind){		
		_gpage.clearAll();
		_gbutton.clearAll();
		_idmenu=id;
		searchPageByIdRoleIdMenu(_idrole, _gmenu.cells(_gmenu.getRowId(id),_gmenu.getColIndexById("idmenu")).getValue());	
	});
	_gmenu.init();
	
	_grole=_ukitUtil.createDhtmlxGrid('role');
	_grole.setImagePath("dhtmlxGrid/codebase/imgs/");
	_grole.setHeader("*,<div align='center'>Role</div>");
	_grole.setColumnIds("id,role");
	_grole.setInitWidths("0,200");
	_grole.setColAlign("left,left");
	_grole.setColTypes("ro,ro");
	_grole.setSkin('modern');
	_grole.enableAutoWidth(true);
	_grole.attachEvent("onRowSelect",function(id,ind){		
		_gmenu.clearAll();
		_gpage.clearAll();
		_gbutton.clearAll();
		_idrole=_grole.cells(_grole.getRowId(id),_grole.getColIndexById("id")).getValue();
		searchMenuByIdRole(_idrole);		
	});
	_grole.init();
	
	_gpage=_ukitUtil.createDhtmlxGrid('page');
	_gpage.setImagePath("dhtmlxGrid/codebase/imgs/");
	_gpage.setHeader("<div align='left'>*</div>,<div align='center'>Page</div>,id");
	_gpage.setColumnIds("status,description,id");
	_gpage.setInitWidths("30,200,0");
	_gpage.setColAlign("left,left,left");
	_gpage.setColTypes("ch,ro,ro");
	_gpage.setSkin('modern');
	_gpage.enableAutoWidth(true);
	_gpage.attachEvent("onRowSelect",function(id,ind){		
		_gbutton.clearAll();
		searchButtonByIdRoleIdPage(_idrole, _gpage.cells(_gpage.getRowId(id),_gpage.getColIndexById("id")).getValue());
	});
	_gpage.init();
	
	searchAllRole();
	
	$('#savemenu').click(function(){
//		if(_gmenu.getCheckedRows(0)!=''){
		var menu=null; var arrMenu = new Array();
		for(var i=0; i<_gmenu.getRowsNum(); i++){
			menu = new Object();
			menu.status=_gmenu.cells(_gmenu.getRowId(i),_gmenu.getColIndexById("status")).getValue();
			menu.id=_gmenu.cells(_gmenu.getRowId(i),_gmenu.getColIndexById("idmenu")).getValue();
			arrMenu.push(menu);
		}
			saveMenu(_idrole, arrMenu);
//		}else{
//			dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'><b>Please select menu name !</b>");
//		}
	});
	
	$('#savepage').click(function(){
//		if(_gpage.getCheckedRows(0)!=''){
//			var select=[]; var arrIdpage=[];
//			select=_gpage.getCheckedRows(0).split(',');
//			for(var i=0; i<select.length; i++){
//				if(_gpage.getCheckedRows(0)!='')
//					arrIdpage[i]=_gpage.cells(_gpage.getRowId(select[i]),_gpage.getColIndexById("id")).getValue();
//			}
		var page=null; var arrPage = new Array();
		for(var i=0; i<_gpage.getRowsNum(); i++){
			page = new Object();
			page.status=_gpage.cells(_gpage.getRowId(i),_gpage.getColIndexById("status")).getValue();
			page.id=_gpage.cells(_gpage.getRowId(i),_gpage.getColIndexById("id")).getValue();
			arrPage.push(page);
		}
			savePageByIdRole(_idrole,arrPage);
//		}else{
//			dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'><b>Please select page !</b>");
//		}
	});
	
	$('#savebutton').click(function(){
//		if(_gbutton.getCheckedRows(0)!=''){
		var button=null; var arrButton = new Array();
		for(var i=0; i<_gbutton.getRowsNum(); i++){
			button = new Object();
			button.status=_gbutton.cells(_gbutton.getRowId(i),_gbutton.getColIndexById("status")).getValue();
			button.id=_gbutton.cells(_gbutton.getRowId(i),_gbutton.getColIndexById("id")).getValue();
			arrButton.push(button);
		}
			saveButtonByIdRole(_idrole, arrButton);
//		}else{
//			dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'><b>Please select button !</b>");
//		}
	});
});

function searchAllRole(){
	try{
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: "act=searchAllRole&r="+Math.random(),
            dataType: "json",
            type: "GET",
            async: true,
            cache: false,
            contentType: "application/json",
            success: function(role) {
            	if(role!=null){
            		for(var i=0; i<role.length; i++){
            			_grole.addRow(i, [role[i].id,role[i].description], i);
            			_grole.adjustColumnSize(1);
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
		alert('searchAllRole '+e.message);
	}
}

function searchMenuByIdRole(idrole){
	try{
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: "act=searchMenuByIdRole&r="+Math.random()+"&idrole="+idrole,
            dataType: "json",
            type: "GET",
            async: true,
            cache: false,
            contentType: "application/json",
            success: function(objMenu) {
            	if(objMenu!=null){
            		for(var i=0; i<objMenu.length; i++){
            			_gmenu.addRow(i, [objMenu[i].status,objMenu[i].menuname,objMenu[i].idmenu], i);
            			_gmenu.adjustColumnSize(1);
            		}
            		
            	}
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                    alert('time out');
                    location.reload();
                }
            }
		});
	}catch(e){
		alert('searchMenuByIdRole '+e.message);
	}
}

function searchPageByIdRoleIdMenu(idrole,idmenu){
	try{
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: "act=searchPageByIdRoleIdMenu&idrole="+idrole+"&idmenu="+idmenu+"&r="+Math.random(),
            dataType: "json",
            type: "GET",
            async: true,
            cache: false,
            contentType: "application/json",
            success: function(objPage) {
            	if(objPage!=null){
            		for(var i=0; i<objPage.length; i++){
            			_gpage.addRow(i, [objPage[i].status,objPage[i].description,objPage[i].id], i);
            			_gpage.adjustColumnSize(1);
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
		alert('searchPageByIdRoleIdMenu '+e.message);
	}
}

function searchButtonByIdRoleIdPage(idrole,idpage){
	try{
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: "act=searchButtonByIdRoleIdPage&idrole="+idrole+"&idpage="+idpage+"&r="+Math.random(),
            dataType: "json",
            type: "GET",
            async: true,
            cache: false,
            contentType: "application/json",
            success: function(objButton) {
            	if(objButton!=null){
            		for(var i=0; i<objButton.length; i++){
            			_gbutton.addRow(i, [objButton[i].status,objButton[i].description,objButton[i].id], i);
            			_gbutton.adjustColumnSize(1);
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
		alert('searchButtonByIdRoleIdPage '+e.message);
	}
}

function saveMenu(idrole,arrMenu){
	try{
		var dataPost={'idrole':idrole,'menu':arrMenu};
		var strArray = new Array();
		strArray.push(dataPost);
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: JSON.stringify(strArray),
            dataType: "json",
            type: "POST",
            async: true,
            cache: false,
            contentType: "application/json",
            headers: {
                "act":"saveMenu"
            },
            success: function(success) {
            	if(success!=null){
            		dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'><b>"+success.description+"</b>");
            	}
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
	}catch(e){
		alert('saveMenu '+e.message);
	}
}

function savePageByIdRole(idrole,arrPage){
	try{
		var dataPost={'idrole':idrole,'page':arrPage};
		var strArray = new Array();
		strArray.push(dataPost);
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: JSON.stringify(strArray),
            dataType: "json",
            type: "POST",
            async: true,
            cache: false,
            contentType: "application/json",
            headers: {
                "act":"savePageByIdRole"
            },
            success: function(success) {
            	if(success!=null){
            		dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'><b>"+success.description+"</b>");
            	}
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
	}catch(e){
		alert('savePageByIdRole '+e.message);
	}
}

function saveButtonByIdRole(idrole,arrButton){
	try{
		var dataPost={'idrole':idrole,'button':arrButton};
		var strArray = new Array();
		strArray.push(dataPost);
		$.ajax({
            url: baseUrl+"/MenuAdmin",
            data: JSON.stringify(strArray),
            dataType: "json",
            type: "POST",
            async: true,
            cache: false,
            contentType: "application/json",
            headers: {
                "act":"saveButtonByIdRole"
            },
            success: function(success) {
            	if(success!=null){
            		dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'><b>"+success.description+"</b>");
            	}
            }, 
            error: function(data) {
                if (data.responseText != null && data.responseText != "") {
                    alert(data.responseText);
                }
            }
		});
	}catch(e){
		alert('saveButtonByIdRole '+e.message);
	}
}