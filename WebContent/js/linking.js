//var _ukitUtil = null;
var grid = null;
var _fcrid=null;
var _filter=null;
var _total=null;
var _rearrange=null;
var _oth=null;
$(document).ready(function(){
	$('#detail').css('fontSize',20);
	$("#detail").css("font-family", "Open Sans");	
	$('#h1toh4').css('fontSize',16);
	$("#h1toh4").css("font-family", "Open Sans");	
	$('#divtext').css('fontSize',28);
	$("#divtext").css("font-family", "Open Sans");	
//	$("#divtext").html("Text:");
	$('#divtotal').css('fontSize',28);
	$("#divtotal").css("font-family", "Open Sans");	
	$("#divtotal").html("(__units)");
	$('#divrearranged').css('fontSize',28);
	$("#divrearranged").css("font-family", "Open Sans");	
	$("#divrearranged").html("( Rearranged:__units&nbsp;&nbsp;&nbsp;");
	$('#divoth').css('fontSize',28);
	$("#divoth").css("font-family", "Open Sans");	
	$("#divoth").html("Unrearranged:__units&nbsp;)");

//	_ukitUtil = new UkitUtil();
	genTable();
//	   grid.makeFilter("_filter",2);
	var treemenu=new dhtmlXTreeObject("treeboxbox","100%","100%",0);

	treemenu.setSkin('dhx_skyblue');
	treemenu.setImagePath("dhtmlxTree/codebase/imgs/csh_bluebooks/");
	treemenu.enableThreeStateCheckboxes(true);
	treemenu.loadXMLString(getTree());
	treemenu.setOnClickHandler(tonclick);
	
//	treemenu.attachEvent("onSelect", function(id){
//		_idh4=null;
//		if(treemenu.getLevel(id)==3){
//			_idh1=treemenu.getParentId(treemenu.getParentId(id));
//			_idh2=treemenu.getParentId(id);
//			_idh3=treemenu.getSelectedItemId();	
//		}
//	});
	
	$('#showdetail').click(function(){
		if(_fcrid==null){
			_ukitUtil.getMessageById(51, _messageUI, function(msg){
				 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+msg);
			});
			return
		}
		$("#content").mask("Waiting...");
		showDetail(_fcrid, function(obj){
			grid.clearAll();			
			if(obj!=null){
				_filter=obj;
				genTable();
				for (var i = 0, len = obj.length; i<len; i+=1) {
					console.log(obj[i].unitno+' '+obj[i].content+' '+obj[i].status+' '+obj[i].doneby);
					grid.addRow(i, [obj[i].unitno,obj[i].content,obj[i].status,obj[i].doneby], i);
				}
			}
			$("#content").unmask();
		});
	});
	
	$('#setdetail').click(function(){
		showDetail(_fcrid, function(obj){
//			console.log(JSON.stringify(obj));
		});
	});
	$('#link').click(function(){
		if(_fcrid==null ||_fcrid==0 || _total==null || _rearrange==null || _oth==null){
			_ukitUtil.getMessageById(51, _messageUI, function(msg){
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
						 link(_fcrid, _total, _rearrange, _oth, _iduser, function(success){
							 dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+success.description);
						 });
						 $("#content").unmask();
					 }	
				 }
			 });
		});
	});
});

function genTable(){
	grid=_ukitUtil.createDhtmlxGrid('gridbox');
	grid.setImagePath("dhtmlxGrid/codebase/imgs/");
	grid.setHeader("Unit,<div align='center'>Content</div>,<div align='center'>Status</div>,<div align='center'>Done By</div>");
	grid.attachHeader(",,#select_filter,#select_filter");
	grid.enableAutoWidth(true);
	grid.setColumnIds("unit,title,status,doneby");
	grid.setInitWidths("50,250,120,120");
	grid.setColAlign("left,left,right,left");
	grid.setColTypes("ro,ro,ro,ro");
	grid.setSkin('modern');
	grid.attachEvent("onCollectValues",getValue);
	grid.attachEvent("onRowSelect",setH1ToH4);
//	grid.attachEvent("onRowDblClicked", function(rId,cInd){alert(rId);});
	grid.init();
}

function getValue(ind){
	if (ind == 2){
	       var result=groupBy(_filter,'status',function(item){
//	    	   console.log(item);
	       });
	       return result._arr;
	}else if(ind == 3){
	       var result=groupBy(_filter,'doneby',function(item){
//	    	   console.log(item);
	       });
	       return result._arr;
	}
    else 
        return true; //default processing
}

function groupBy(objList,column,fn) {
//  var arr = ["Car","Car","Truck","Boat","Truck","Truck","Truck","Truck","Truck","Truck","Truck","Truck","Truck","Truck","Truck","Truck","Truck","Truck"];
  var s =new HashSet();//new HashSet();
//  console.log(objList);
  try{
	  if(objList!=null){
		  for (var i = 0, len = objList.length; i<len; i+=1) {
			  s.add(objList[i][column]);
		  }
	  }
	  fn(s);
	  return s;
  }catch(e){
	  alert(e.message);
  }finally{
	  s=null;
  }
}

function getTree(){
	var strXml=null;
	try{
		setXmlTreeH1ToH2(function(xml){
			strXml=xml;
		});
//		console.log(strXml);
		return strXml;
	}catch(e){
		alert('getTree '+e.message);
	}finally{
		strXml=null;
	}
}

function tonclick(id) {
//	$("#detail").css("width", "800px");
	grid.clearAll();
	setDetail(id);
};

function setDetail(h2){
	var datas={'h2':h2};
	try{
		$.ajax({
			url: baseUrl+"/service/ManageLinking",
			data: JSON.stringify(datas),
			dataType : "json",
			type : "POST",
			headers: {
                "param":"setDetail"
            },
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
			success: function(success) {
				$('#divtext').html('<b>'+success.text+'</b>');
				$('#divtotal').html('&nbsp;&nbsp;(<u>'+success.total+'</u>units)&nbsp;&nbsp;');
				$('#divoth').html("Unrearranged: <font color='red'><u>"+success.others+"</font></u>&nbsp;&nbsp;units&nbsp;)");
				if(success.total==success.rearranged){
					if(success.total=='' && success.rearranged==''){
						$("#divtotal").html("(__units)");
						$("#divrearranged").html("( Rearranged:__units&nbsp;&nbsp;&nbsp;");
						$("#divoth").html("Unrearranged:__units&nbsp;)");
					}else
						$('#divrearranged').html("<font color='green'>Ready to Link&nbsp;</font>( Rearranged: <u>"+success.rearranged+"</u>&nbsp;&nbsp;units&nbsp;&nbsp;&nbsp;");
				}else{
					$('#divrearranged').html("<font color='red'>Not Ready to Link&nbsp;</font>( Rearranged: <u>"+success.rearranged+"</u>&nbsp;&nbsp;units&nbsp;&nbsp;&nbsp;");
				}								
				_fcrid=success.idbasetext;
				_total=success.total;
				_rearrange=success.rearranged;
				_oth=success.others;				
					
		}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('showDetail: '+e.message);
	}finally{
		datas=null; strArray=null;
	}
}

function showDetail(fcrid,fn){
	var datas={'fcrid':fcrid};
	try{
		$.ajax({
			url: baseUrl+"/service/ManageLinking",
			data: JSON.stringify(datas),
			dataType : "json",
			type : "POST",
			headers: {
                "param":"showDetail"
            },
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
			success: function(sucess) {
				fn(sucess);
		}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('showDetail: '+e.message);
	}finally{
		datas=null;
	}
}

function link(fcrid,total,rearrange,oth,iduser,fn){
	var datas={'fcrid':fcrid,'total':total,'rearrange':rearrange,'oth':oth, 'iduser':iduser};
	try{
		$.ajax({
			url: baseUrl+"/service/ManageLinking",
			data: JSON.stringify(datas),
			dataType : "json",
			type : "POST",
			headers: {
                "param":"link"
            },
			async : true,
			cache: false,
			contentType : "text/plan;charset=utf-8",
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
		alert('link: '+e.message);
	}finally{
		datas=null;
	}
}

function setH1ToH4(id){
//	console.log(_filter[id].idstatus+' '+_filter[id].series+' '+_filter[id].basetext+' '+_filter[id].sutta+' '+_filter[id].section);
	$('#h1toh4').html(_filter[id].series+'>'+_filter[id].basetext+'>'+_filter[id].sutta+'>'+
			_filter[id].section+"&nbsp;&nbsp;&nbsp;&nbsp;<font size='5'><b><<&nbsp;<u>"+_filter[id].unitno+"&nbsp;</u>>></b></font>");
	if(_filter[id].status!=4){
		$('#detail').css('color', '#F75D59');
	}else{
		$('#detail').css('color','black');
	}
	$('#detail').html(_filter[id].detail);
}
