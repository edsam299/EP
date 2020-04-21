var _linkingService = new LinkingService();
var treemenu=new dhtmlXTreeObject("treeboxbox","100%","100%",0);

_linkingService.getTreeMenu(1, 2, function(menu){
	try{
		if(menu.value=='true'){
			treemenu.setSkin('dhx_skyblue');
			treemenu.setImagePath("dhtmlxTree/codebase/imgs/csh_bluebooks/");
			treemenu.enableThreeStateCheckboxes(true);
			treemenu.loadXMLString(menu.description);
			treemenu.setOnClickHandler(tonclick);
		}else{
			dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+menu.description);
		}
	}catch(e){
		dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+e.message);
	}

});

function tonclick(id) {
	console.log(id);
	document.getElementById('linking').src='../../linking/linking.jsp?textCode='+id;
//	$("#detail").css("width", "800px");
//	grid.clearAll();
//	setDetail(id);
};

function LinkingService(){
	LinkingService.prototype.getTreeMenu = function(start, end, fn){
		_ukitUtil.ajax(baseUrl + '/Linking', 'act=getTreeMenu&start='+start+'&end='+end, 'json', 'get', true, false,'application/json', '', function(data) {
			fn(data);
		});
	};
}