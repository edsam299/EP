var grid = null;
var _section=null;
var _myProgressBar = null;
var _timerId = null ;
var _idh1=null;
var _idh2=null;
var _idh3=null;
var _idh4=null;
//window.oncontextmenu = function () { return false; };
//document.onkeydown = function (e) {	
//	if (window.event.keyCode == 123 || e.button==2)
//		return false; 
//	};
	
$(document).ready(function(){
	_section={};
	_section.data=new Array();
//	_section=new Array();
//	_section.push(bean);
//	alert(_section.data.length);
	$("#detail").css("fontSize", 16);
	$("#detail").css("font-family", "Open Sans");	
	$('#p').val(0);
	grid=_ukitUtil.createDhtmlxGrid('gridbox');
	grid.setImagePath("dhtmlxGrid/codebase/imgs/");
	grid.setHeader("<div align='center'>Unit</div>,<div align='center'>Section Title</div>,<div align='center'>Line</div>,idh3,id");
	grid.setColumnIds("unit,title,line,idh3,id");
	grid.setInitWidths("100,250,80,0,0");
	grid.setColAlign("left,left,right,left,left");
	grid.setColTypes("ro,ro,ro,ro,ro");
	grid.setSkin('modern');
	grid.attachEvent("onRowSelect",function(id,ind){		
		if(_section.data[id].detail!='')
			$("#detail").css("width", "auto;");
		else
			$("#detail").css("width", "800px");
		getDetail(grid.cells(grid.getRowId(id),grid.getColIndexById("id")).getValue());
//		$('#detail').html(_section[grid.cells(grid.getRowId(id),grid.getColIndexById("idh3")).getValue()].detail);
		_idh4=grid.cells(grid.getRowId(id),grid.getColIndexById("id")).getValue();
//		console.log('h4 '+_idh4);
	});
	grid.init();
	var treemenu=new dhtmlXTreeObject("treeboxbox","100%","100%",0);
	treemenu.setSkin('dhx_skyblue');
	treemenu.setImagePath("dhtmlxTree/codebase/imgs/csh_bluebooks/");
// 	treemenu.enableCheckBoxes(1);
	treemenu.enableThreeStateCheckboxes(true);
	treemenu.loadXMLString(getTree());
	treemenu.setOnClickHandler(tonclick);
//	treemenu.loadXML('xml/tree.xml');
	
	treemenu.attachEvent("onSelect", function(id){
		_idh4=null;
		
		if(treemenu.getOpenState(id)==-1)
			treemenu.openItem(id);
		else
			treemenu.closeItem(id);
		
		_idh1=null;
		_idh2=null;
		_idh3=null;
		if(treemenu.getLevel(id)==3){
			_idh1=treemenu.getParentId(treemenu.getParentId(id));
			_idh2=treemenu.getParentId(id);
			_idh3=treemenu.getSelectedItemId();
//			_idh4=null;
//			console.log('parent 1 '+treemenu.getParentId(treemenu.getParentId(id)));
//			console.log('select: parent h2'+treemenu.getParentId(id)+' select level '+treemenu.getLevel(id));
//			console.log('getSelectedItemId '+treemenu.getSelectedItemId());			
		}
//		if(treemenu.getLevel(id)==1){
//			console.log('getSelectedItemId 0'+treemenu.getSelectedItemId());
////			treemenu.attachEvent("onClick", function(id){console.log('onclick '+id);});
//		}else if(treemenu.getLevel(id)==2){
//			console.log('select: parent h2'+treemenu.getParentId(id)+' select level '+treemenu.getLevel(id));
//			console.log('getSelectedItemId '+treemenu.getSelectedItemId());
////			console.log('getIndexById '+treemenu.getIndexById(id));
////			treemenu.attachEvent("onClick", function(id){console.log('onclick '+id);});
//		}else{
//			console.log('parent 1 '+treemenu.getParentId(treemenu.getParentId(id)));
//			console.log('select: parent h2'+treemenu.getParentId(id)+' select level '+treemenu.getLevel(id));
//			console.log('getSelectedItemId '+treemenu.getSelectedItemId());
//		}
//		console.log('getSelectedItemId '+treemenu.getSelectedItemId());
//		console.log(treemenu.get)
	});
	
	
//	console.log('xx '+treemenu.getAllSubItems(a));
	$('#btnedit').click(function(){
		if(_idh4==null){
			_ukitUtil.getMessageById(26, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
		}else{
			_ukitUtil.loading('overlay');
			permissionpage(role, 2, 1, function(permission){
				if(permission){					
					_ukitUtil.closePopup('windowsname1');
					_ukitUtil.closePopup('windowsname2');
					_myProgressBar.setValue(0);		
					loadProgressBar();
					searchH4();
				}else{
					_ukitUtil.getMessageById(27, _messageUI, function(msg){
						 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
					});
				}
			});
		}
		
	});
	
	function closeWindow(name) {
		alert(name+' '+window.name);
		for (name in this.windows) {
			alert(name);
//	        this.closeWindow(name);
	    }
//	    var wind = windows[name];
//	    alert(wind);
//	    if(wind) {
//	        window.close();
//	        delete windows[name];
//	    }
	}
	
	_myProgressBar = new ProgressBar("my_progress_bar_1",{
		borderRadius: 10,
		width: 300,
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
	
	$('#export').click(function(){
		_ukitUtil.closePopup('word');
		_ukitUtil.popuup(screen.width, 600, 0, 0, 'yes', 'exportword.jsp','ukitsd','word');
	});
});

function getTree(){
	var strXml=null;
	try{
		setXmlTree(function(xml){
//			console.log(xml);
			strXml=xml;
		});
		return strXml;
	}catch(e){
		alert('getTree '+e.message);
	}finally{
		strXml=null;
	}
}

function getSectionById(id){
	try{    	
		grid.clearAll();
		$('#detail').html('');
		clearInterval(_timerId);
		_myProgressBar.setValue(0);		
		loadProgressBar();
		if(isLoad(id)){		
			renderSectionGrid(id,_section,'rerun'); 
		}else{
			_ukitUtil.loading('overlay');
			getSection(id, function(objSection){
            	if(objSection!=null){
            		renderSectionGrid(id,objSection,'new');          		         
            	}else{
            		clearInterval(_timerId);
            	}
            	_ukitUtil.unloading('overlay');
			});
		}
	}catch(e){
		alert('getSectionById '+e.message);
	}
}

function tonclick(id) {
//    alert("Item " + treemenu.getItemText(id) + " was selected"+" "+treemenu.getSelectedItemId());	
	$("#detail").css("width", "800px");
	grid.clearAll();
	if(_idh3!=null)
		getSectionById(id);
};

function renderSectionGrid(id,objGrid,action){
	try{		
		grid.clearAll();
		if(action=='new'){
			for(var i=0, len=objGrid.data.length; i<len; i++){
//				console.log(objGrid.data[i]);
//				break;
				grid.addRow(i, [objGrid.data[i].number,objGrid.data[i].title,objGrid.data[i].line,objGrid.data[i].idh3,objGrid.data[i].id], i);
				_section.data.push(objGrid.data[i]);
			}
		}else{
			for(var i=0, len=objGrid.length; i<len; i++){
				if(objGrid[i].idh3==id){
					grid.addRow(i, [objGrid.data[i].number,objGrid.data[i].title,objGrid.data[i].line,objGrid.data[i].idh3,objGrid.data[i].id], i);
				}				
			}
		}		
		grid.enableAutoWidth(true, 800, 300);
		grid.adjustColumnSize(0);
		grid.adjustColumnSize(1);
		grid.adjustColumnSize(2);
		_myProgressBar.setValue(100);
		clearInterval(_timerId);
	}catch(e){
		alert('renderSectionGrid '+e.message);
	}
}

function isLoad(id){
	var load = false;
	try{
//		alert(22+JSON.stringify(_section.data));
		for(var j=0, len=_section.data.length; j<len; j++){
			if(_section.data[j].idh3==id){
				load=true;
				break;
			}
		}
		return load;
	}catch(e){
		alert('isLoad '+e.message);
	}finally{
		load=null;
	}
}

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

function searchH4(){
	try{
//		console.log("h1="+_idh1+"&h2="+_idh2+"&h3="+_idh3+"&h4="+_idh4);
		searchUnitByH4('before', _idh1, _idh2, _idh3, _idh4, _iduser, function(objSection){
        	if(objSection!=null){
        		getE2Header(_idh1, _idh2, _idh3, _idh4, function(header){
                	if(header!=null){
                		var objH4 = new Object();
                		objH4.objSection=objSection;
                		objH4.idh1=_idh1;
                		objH4.idh2=_idh2;
                		objH4.idh3=_idh3;
                		objH4.idh4=_idh4;
                		objH4.e2Header=header;
                		_myProgressBar.setValue(100);
                		clearInterval(_timerId);
                		_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'e2_new.jsp',objH4,'windowsname1'); 
//                		_idh4=null;
//                		window.location='./url?operation=E2';
                	}        	     
                	_ukitUtil.unloading('overlay');
        		});
        	}else{
				_ukitUtil.getMessageById(28, _messageUI, function(msg){
					 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
				});
        	}
		});
	}catch(e){
		alert('searchH4 '+e.message);
	}finally{
		sectionGrid=null;
	}
}

function getDetail(id){
	try{
//		console.log(id);
//		console.log(JSON.stringify(_section));
		for(var i=0, len=_section.data.length; i<len; i++){
			if(_section.data[i].id==id){
				$('#detail').html(_section.data[i].detail);
				$("#detail").css("font-family", "Open Sans");
				break;
			}
		}
	}catch(e){
		alert(e.message);
	}
}

function getEvtType(event){
	alert(event.type);	
}
//window.onbeforeunload = function() { return false; };
//window.onbeforeunload =function() { return window.history.forward(); };
