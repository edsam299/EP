//var _server='http://localhost:9200';
//var _server='http://10.190.0.55:9200';

var _server ="";
if(window.location.host.indexOf(":")>0){
	if(window.location.port=='8080')
		_server = window.location.protocol+"//"+window.location.host.substring(0,window.location.host.indexOf(":"))+":9200";
	else
		_server = window.location.protocol+"//"+window.location.host.substring(0,window.location.host.indexOf(":"))+":19200";
}else{
	_server = window.location.protocol+"//"+window.location.host+":9200";
}

//alert(_server);
//var _server='http://localhost:9200';
var _dbep='ep';
var _ukitUtil = new UkitUtil();
var table_='';
var template_choice_='';
var template_choice_color='';
var template_choice_all_chk='';
var html_='';
var out='';
var _basetext_content=null;
var _basetext_content_detail=null;
var _basetext_level=null;
var _basetext_level_detail=null;
var arrChkColor=null;
var _variant_row=0;
var _arrVariant=null;
var _arrPictureMSS=null;
var _arrPictureEDS=null;
var _rowIndexContent=null;
var _wordContent=null;
var sizeunit= 100000;
var _itapusermap = null;
var _reasonmap=null;
var CESearchService=new CESearch();
var sizemap ={"size":500};
var word_allByTextCode=null;
var _basetext_category_master=null;
var _piseq=null;
var _firstWordSelect=null;
var _otherWordSelect=null;
document.getElementById('t_search').focus();
CESearchService.searchBasetextCategeryMaster(function(data){
	if(data.hits.hits.length>0){
		_basetext_category_master=new Array();
		_piseq=new Array();
		var basetext_category_master=null;
		var piseq=null;
		for(var i=0; i<data.hits.hits.length; i++){
//			if(data.hits.hits[i]._source.description=='DN')
//				data.hits.hits[i]._source.seq='7';
//			if(data.hits.hits[i]._source.description=='MN')
//				data.hits.hits[i]._source.seq='9';
				basetext_category_master=new Object();
				basetext_category_master.description=data.hits.hits[i]._source.description;
				basetext_category_master.seq=data.hits.hits[i]._source.seq;
				_basetext_category_master.push(basetext_category_master);
				basetext_category_master=null;
				if(data.hits.hits[i]._source.description=='|'){// เพื่อใช้ในการ Sort
					piseq=new Object();
					piseq.seq=data.hits.hits[i]._source.seq;
					piseq.flag=0;
					_piseq.push(piseq);
					piseq=null;
				}
		}
//		console.log(_basetext_category_master);
	}
});
CESearchService.ElasticSearch(sizemap, 'itapuser', '_search', 'GET', function(data){
	_itapusermap = new Map();
	for(var i=0; i<data.hits.hits.length; i++){
		_itapusermap.put(data.hits.hits[i]._source.fcrid,data.hits.hits[i]._source.fcfirstname+" "+data.hits.hits[i]._source.fclastname);
	}
//	console.log(_itapusermap);
});
CESearchService.ElasticSearch(sizemap, 'reasoncomment', '_search', 'GET', function(data){
	_reasonmap = new Map();
	for(var i=0; i<data.hits.hits.length; i++){
		_reasonmap.put(data.hits.hits[i]._source.id,data.hits.hits[i]._source.reason);
	}
//	console.log(_reasonmap);
});

document.getElementById('t_search').addEventListener('keypress', function(e){
	if(e.keyCode==13){
		document.getElementById('b_search').click();
	}
});
_ukitUtil.ajax(baseUrl + '/CESearch', '', 'json', 'post', true, false,'application/json', 'getTexts2Search', function(success) {	
	for(var key in success.datamap){
//		console.log(key, success.datamap[key]);
		table_='{0}{1}{2}{3}';
		table_='<tr>'+table_;
		template_choice_='<td width="25%"><input type="checkbox" onclick="handleClick(this);" name="choice" id="{id}" value={des}>{des}</td>';		
		template_choice_color='<td width="25%" bgcolor="#6CC417"><input type="checkbox" onclick="handleClickColor(this);" name="choice" id="{id}" value={des}>{des}</td>';
		template_choice_all_chk='<td width="25%"><input type="checkbox" onclick="handleClickAll(this);"';
			template_choice_all_chk+='name="choice" id="{id}" value={des}>{des}<button type="button" id="btnclearall_searchoption" class="btn btn-default btn-xs">Clear All</button></td>';
		html_='';
		for(var i=0; i<success.datamap[key].length; i++){
//			console.log(success.datamap[key][i].id,success.datamap[key][i].description,
//					success.datamap[key][i].column,success.datamap[key][i].row);
			if(i<=2){
				if(success.datamap[key][i].description!='All'){
					html_=template_choice_.split('{id}').join(success.datamap[key][i].id)
					.split('{des}').join(success.datamap[key][i].description.split(' ').join('&nbsp;'));
				}else{
					html_=template_choice_all_chk.split('{id}').join(success.datamap[key][i].id)
					.split('{des}').join(success.datamap[key][i].description);
				}
			}else{
				html_=template_choice_color.split('{id}').join(success.datamap[key][i].id)
				.split('{des}').join(success.datamap[key][i].description);
			}

			table_=table_.split('{'+i+'}').join(html_);
		}
		table_=table_+'</tr>';
		out+=table_;
	}
	document.getElementById('choice').innerHTML='<table width="100%">'+out+'</table>';
	eventAllCheckBox('check');
	document.getElementById('btnclearall_searchoption').addEventListener('click', function(){
		eventAllCheckBox('uncheck');
	});
});

function handleClick(cb) {
	document.getElementById('t_search').focus();
//	  console.log("Clicked, new value = " + cb.checked);
	  var chk=document.getElementsByName(cb.name);
	  var arrChk=new Array();
	  var count_c=0;
	  var c_value='';
	  for(var i=0; i<chk.length; i++){
//		  console.log(chk[i].id);
		  if(chk[i].checked){
			  arrChk.push(chk[i].id);
		  }
	  }
//console.log(arrChk);
	  for(var i=0; i<arrChk.length; i++){
		if(arrChk[i].indexOf('C')!=-1){
			count_c++;
			c_value=arrChk[i];
		}
	  }
//	  console.log(count_c);
	  if(count_c==1 && c_value=='C8'){
			document.getElementById('L1').checked=false;
			document.getElementById('L2').checked=false;
			document.getElementById('L3').checked=false;
	  }else{
		  if(count_c!=0){
			  document.getElementById('L1').checked=true;
		  }else{
			  document.getElementById('L1').checked=false;
		  }
			  
	  }
}

function handleClickColor(cb){
//	var chk=document.getElementsByName(cb.name);
//	arrChkColor=new Array();
//	for(var i=0; i<chk.length; i++){
//		if(chk[i].id.indexOf('L')!=-1){
//			arrChkColor.push(chk[i].id.substring(1,1));
//		}
//	}
//	console.log(arrChkColor);
}
function handleClickAll(cb){
	if (document.getElementById('C9').checked) {
//		document.getElementById('L1').checked=true;
//		document.getElementById('L2').checked=true;
//		document.getElementById('L3').checked=true;
		eventAllCheckBox('check');
	} else {
//		document.getElementById('L1').checked=false;
//		document.getElementById('L2').checked=false;
//		document.getElementById('L3').checked=false;
		eventAllCheckBox('uncheck');
	}
}

document.getElementById('b_search').addEventListener('click', function(){
	_firstWordSelect=null;
	var chk=document.getElementsByName('choice');
	var select_choice=false;
	for(var i=0; i<chk.length; i++){
		if(chk[i].checked){
			select_choice=true;
			break;
		}
	}
	for(var i=0; i<_piseq.length; i++){ // Clear flag ทุกรอบเพื่อใช้ในการ sort textcode
		_piseq[i].flag=0;
	}
	if(select_choice==false){
		dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>Please select Search Option Texts");
		return
	}
	if(document.getElementById('t_search').value.length<2){
		var html ='Please key your searching word more than two character!';
		dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>"+html, function(success){
			if(success){
				document.getElementById('t_search').focus();
			}
		});
	}else{
		
		CESearchService.loadData(function(complete){
			if(complete){
				var typeSearch=null;
				var arr_word= new Array();
				if(document.getElementById('chktypesearch_exact').checked)
					typeSearch='EXACT';
				else
					typeSearch='LIKE';
					
				console.log('searchKeyword '+ typeSearch +'typeSearch')
				CESearchService.searchKeyword(document.getElementById('t_search').value, typeSearch, function(data){
					console.log(data);	
//					for(var i=0; i<data.hits.hits.length; i++){
//						 console.log(decodeURIComponent(data.hits.hits[i]._source.footnote));
//					}
					var sort_pali=0;  var obj_word = null;
				       for(var i=0; i<data.aggregations.group_by_state.buckets.length; i++){
				    	   sort_pali="";
				    	   obj_word=new Object();
				    	   obj_word.word=data.aggregations.group_by_state.buckets[i].key;
				    	   obj_word.word_count=data.aggregations.group_by_state.buckets[i].doc_count;
				    	   obj_word.sort_pali=null;//new Array();
				    	   for(var j=0; j<data.aggregations.group_by_state.buckets[i].key.length; j++){
				    		   sort_pali+=map.get(data.aggregations.group_by_state.buckets[i].key[j]);				    			   
				    	   }	
				    	   obj_word.sort_pali=sort_pali;
				    	   arr_word.push(obj_word);				    	   
					   }
				       arr_word.sort(function(a, b) {
				    	   return a.sort_pali.localeCompare(b.sort_pali);   
				       });
//				       item1.attr.localeCompare(item2.attr);
//				       console.log(arr_word);
				});
				console.log('arr_word.length '+arr_word.length)
				if(arr_word.length>0){
					var obj=new Object();
					obj.arr_word=arr_word;
					obj.keyword=document.getElementById('t_search').value;
					word_allByTextCode=obj;
					console.log('searchBasetext_category ')
					CESearchService.searchBasetext_category(document.getElementById('t_search').value, function(data){
						console.log(data);
						console.log('response searchBasetext_category '+data.aggregations.group_by_state.buckets.length)
						if(data.aggregations.group_by_state.buckets.length>0){
							obj.basetext_category=new Array(); 
							var basetext_category=null;
						       for(var i=0; i<data.aggregations.group_by_state.buckets.length; i++){
						    	   basetext_category=new Object();
						    	   basetext_category.key=data.aggregations.group_by_state.buckets[i].key;
						    	   basetext_category.doc_count=data.aggregations.group_by_state.buckets[i].doc_count;
						    	   for(var k=0; k<_basetext_category_master.length; k++){
						    		   if(basetext_category.key==_basetext_category_master[k].description){
						    			   basetext_category.seq=_basetext_category_master[k].seq;
						    			   break;
						    		   }						    			  
						    	   }
						    	   obj.basetext_category.push(basetext_category);
						       }
//						       console.log(obj);
						       obj.basetext_category.sort(function(a, b) {
						    	   return a.seq>b.seq;   
						       });
//								_ukitUtil.closePopup('viewpali');
//								_ukitUtil.popuup(screen.width, screen.height, 0, 0, 'yes', 'viewpali_cesearch.jsp',obj,'viewpali');
						       if(arr_word.length>1){ //กรณีมีหลายคำให้ Popup เลือกคำ
							       CESearchService.viewPali(obj, function(){
							    	   
							       });
						       }else{ //กรณีมีคำเดียวไม่ต้อง Popup
						    	   getWord(arr_word[0].word,'MAIN_SEARCH');
						       }
								CESearchService.searchAllBasetextCategory(function(data){
//									console.log(data);
								});
								
						}
					});
				}else{
					dhtmlxs.alert("<img src='dhtmlxmsg/codebase/alert_small.png'>Search <b>"+document.getElementById('t_search').value+'</b> not found');
				}
				
			}
		});
	}
});

function CESearch(){
	var sizelimit=150;
	CESearch.prototype.ElasticSearch = function(command, db, event, method, fn){
		$.ajax({
			  method: method,
			  url: _server+"/"+db+"/"+event,
			  async: false,
			crossdomain:true,
			  data:command,
			  dataType : 'json',
			  contentType: 'application/json'
			})
			.done(function( data ) {
				fn(data);
			})
			.fail(function( data ) {
			  fn(data);
			});
	};
	CESearch.prototype.loadData = function(fn){
		
		var query_basetextcontent={
				"size":sizelimit,
			    "query": {
			        "query_string" : {
			            "fields" : ["description", "status"],
			            "query" : "(description:{desc}) AND status:1"
			        }
			    }
			};		
		var chk=document.getElementsByName('choice');
		var des=''; var count_loop=0;
		for(var i=0; i<chk.length; i++){
			if(chk[i].value=='All')
				continue;
			if(chk[i].checked && count_loop==0){
				des=chk[i].value;
				count_loop++;
			}else{
				if(chk[i].checked)
					des=des+' OR '+chk[i].value;
			}
		}
		des=des.split('"').join('');
		query_basetextcontent=JSON.stringify(query_basetextcontent).split('{desc}').join(des);
		this.ElasticSearch(query_basetextcontent, 'basetext_content', '_search', 'POST', function(data){
			_basetext_content=new Array();
			for(var i=0; i<data.hits.hits.length; i++){
				_basetext_content.push(data.hits.hits[i]._source);
			}
		});
//		End query_basetextcontent
		
		if(_basetext_content.length>0){
			des=''; count_loop=0;
			var query_basetextcontent_detail={
					"size":sizelimit,
				    "query": {
				        "query_string" : {
				            "fields" : ["idbasetextcontent"],
				            "query" : "(idbasetextcontent:{desc}) AND status:1"
				        }
				    }
				};
			for(var i=0; i<_basetext_content.length; i++){
				if(count_loop==0){
					des=_basetext_content[i].id;
					count_loop++;
				}else{
					des=des+' OR '+_basetext_content[i].id;
				}
			}
			query_basetextcontent_detail=JSON.stringify(query_basetextcontent_detail).split('{desc}').join(des);
		
			this.ElasticSearch(query_basetextcontent_detail, 'basetext_content_detail', '_search', 'POST', function(data){				
				_basetext_content_detail=new Array();
				for(var i=0; i<data.hits.hits.length; i++){
					_basetext_content_detail.push(data.hits.hits[i]._source);
				}
			});
//			End query_basetextcontent_detail
			
			if(_basetext_content_detail.length>0){
				var chk=document.getElementsByName('choice');
				arrChkColor=new Array();
				for(var i=0; i<chk.length; i++){
					if(chk[i].id.indexOf('L')!=-1 && chk[i].checked){
						arrChkColor.push(chk[i].id.substring(1,2));
					}
				}
//				console.log(arrChkColor);
				
				var query_basetext_level={
						"size":sizelimit,
					    "query": {
					        "query_string" : {
					            "fields" : ["id"],
					            "query" : "(id:{desc}) AND status:1"
					        }
					    }
					};
				des=''; count_loop=0;
				for(var i=0; i<arrChkColor.length; i++){
					if(count_loop==0){
						des=arrChkColor[i];
						count_loop++;
					}else{
						des=des+' OR '+arrChkColor[i];
					}
				}
				query_basetext_level=JSON.stringify(query_basetext_level).split('{desc}').join(des);				
				this.ElasticSearch(query_basetext_level, 'basetext_level', '_search', 'POST', function(data){
					_basetext_level=new Array();
					for(var i=0; i<data.hits.hits.length; i++){
						_basetext_level.push(data.hits.hits[i]._source);
					}
//					console.log(_basetext_level);
				});				
			}
//			End query_basetext_level_detail
		}
//		console.log('_basetext_content_detail');
//		console.log(_basetext_content_detail);
		if(_basetext_content_detail.length>0){
			des=''; count_loop=0;
			var query_basetext_level_detail={
					"size":sizelimit,
				    "query": {
				        "query_string" : {
				            "fields" : ["textCode"],
				            "query" : "(textCode:{desc}) AND status:1"
				        }
				    }
				};
		
			for(var i=0; i<_basetext_content_detail.length; i++){
				if(count_loop==0){
					des=_basetext_content_detail[i].textcode.substring(1,2);
					count_loop++;
				}else{
					des=des+' OR '+_basetext_content_detail[i].textcode.substring(1,2);
				}
			}
			query_basetext_level_detail=JSON.stringify(query_basetext_level_detail).split('{desc}').join(des);
			this.ElasticSearch(query_basetext_level_detail, 'basetext_level_detail', '_search', 'POST', function(data){				
				_basetext_level_detail=new Array();
				for(var i=0; i<data.hits.hits.length; i++){
					_basetext_level_detail.push(data.hits.hits[i]._source);
				}
				fn(true);
			});
		}		
//		end basetext_level_detail		
	};
	
	CESearch.prototype.searchKeyword = function(keyword, typesearch, fn){
		clear();
		if(_basetext_content_detail.length==0){
			fn(null);
			return
		}
		keyword=keyword.split(' ').join(' AND ');
		var count_loop=0; var des='';
		
		for(var i=0; i<_basetext_content_detail.length; i++){
			if(count_loop==0){
				des=_basetext_content_detail[i].textcode+'*';
				count_loop++;
			}else{
				des=des+' OR textcode:'+_basetext_content_detail[i].textcode+'*';
			}
		}
		var query_by_keywowrd={    "query": {
	        "query_string" : {
	            "fields" : ["content", "textcode","basetext_content_detail","comment_content","comment_conclusion","comment_reason"],
	            "query" : "(content:{keyword} AND (textcode:{desc})) OR( " +
	            (document.getElementById('chktypesearch_conclusion').checked?"(comment_conclusion:*?*)":"(footnote:*?* OR comment_conclusion:*?* OR comment_content:*?* OR comment_reason:*?*))")
	        }
	    },
//		"track_total_hits": true,
	    "size":100000,
	    "aggs": {
	    "group_by_state": {
	      "terms": {
	        "field": "content",
	        "size": 10000
	      }
	    }
	    
	  },"sort":[{"textcode":{"order":"asc"}},{"lineno":{"order":"asc"}},{"fnseq":{"order":"asc"}}]};
		if(typesearch=='EXACT'){
			query_by_keywowrd=JSON.stringify(query_by_keywowrd).split('{desc}').join(des).split('{keyword}').join(keyword);
		}else{
			query_by_keywowrd=JSON.stringify(query_by_keywowrd).split('{desc}').join(des).split('{keyword}').join('*'+keyword+'*');
		}
//		console.log(typesearch);
		console.log(query_by_keywowrd);
		this.ElasticSearch(query_by_keywowrd, _dbep, '_search', 'POST', function(data){				
			_basetext_level_detail=new Array();
			fn(data);
		});
	};
	
	CESearch.prototype.searchTextCode = function(keyword, textcode, fn){
		var query_by_textcode={ "query":
	    {
		      "query_string":
		      {
		        "fields":["content","basetext_category","comment_content","comment_conclusion","comment_reason","footnote"],
		       "query":"(content:{keyword}) AND (basetext_category:{desc}) AND "+
		       (document.getElementById('chktypesearch_conclusion').checked?"(comment_conclusion:*?*)":"(footnote:*?* OR comment_conclusion:*?* OR comment_content:*?* OR comment_reason:*?*)")
		      }
		      
		    },
		    "size":100000,
		    "aggs":{"group_by_state":{"terms":{"field":"content","size":1000000}}},"sort":[{"textcode":{"order":"asc"}},{"lineno":{"order":"asc"}},{"fnseq":{"order":"asc"}}]};
		query_by_textcode=JSON.stringify(query_by_textcode).split('{desc}').join(textcode).split('{keyword}').join('*'+keyword+'*');
		this.ElasticSearch(query_by_textcode, _dbep, '_search', 'POST', function(data){				
			_basetext_level_detail=new Array();
//			console.log(data);
			fn(data);
		});
	};
	
	CESearch.prototype.searchAllBasetextCategory = function(fn){
		var query={
			"size":sizelimit,
			"query": {
		        "query_string" : {
		            "fields" : ["description", "seq", "status"],
		            "query" : "status:1"
		        }
	    	},"sort": [{"seq": {"order": "desc"}}]
				  
			};
		
		this.ElasticSearch(JSON.stringify(query), 'basetext_category', '_search', 'POST', function(data){
//			console.log(data);
		});
	};
	
	CESearch.prototype.searchBasetext_category = function(keyword, fn){
		var query_basetext_category={
			    "query": {
			        "query_string" : {
			            "fields" : ["content", "textcode", "basetext_category","footnote","comment_content","comment_reason"],
			            "query" : "content:{keyword} AND (textcode:{desc}) AND "+
			            (document.getElementById('chktypesearch_conclusion').checked?"(comment_conclusion:*?*)":"(footnote:*?* OR comment_conclusion:*?* OR comment_content:*?* OR comment_reason:*?*)")
			        }
			    },
			    "size":100000,
			    "aggs": {
			    "group_by_state": {
			      "terms": {
			        "field": "basetext_category.keyword",
			        "size": 1000000
			      }
			    }
			  }
			};
		
		var count_loop=0; var des='';
		for(var i=0; i<_basetext_content_detail.length; i++){
			if(count_loop==0){
				des=_basetext_content_detail[i].textcode+'*';
				count_loop++;
			}else{
				des=des+' OR textcode:'+_basetext_content_detail[i].textcode+'*';
			}
		}
		
		query_basetext_category=JSON.stringify(query_basetext_category).split('{desc}').join(des).split('{keyword}').join('*'+keyword+'*');
		console.log(query_basetext_category);
		this.ElasticSearch(query_basetext_category, _dbep, '_search', 'POST', function(data){	
			console.log(data);
			fn(data);
		});
	};

	CESearch.prototype.viewPali = function(data, fn){
		var html='<div class="container">';
		html+='<button type="button" style="display:none" id="getView" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false"></button>';
		html+='<div class="modal fade" id="myModal" role="dialog">';
		html+='<div class="modal-dialog" style="width:90%;">';
		html+='<div class="modal-content">';
		html+='<div class="modal-header">';
		html+='<button type="button" id="close_popup" class="close" data-dismiss="modal">&times;</button>';
		html+='<h4 class="modal-title"><div id="div_header"></div></h4></div>';
		html+='<div class="modal-body"><div id="divview" style="height:400px; overflow-y: scroll;">{table}</div></div>';
		html+='<div class="modal-footer">';
//		html+='<input type="button" class="btn btn-primary" id="savecty" value="Save">';
//		html+='<button type="button" class="close" id="close" data-dismiss="modal" style="display:none">Close</button>';
		html+='</div></div></div></div></div>';
		var table='<table class="table table-condensed table table-bordered">';
		table+='<tr><td width="50%"><div id="col1"></div></td><td width="50%"><div id="col2"></div></td></tr></table>';
		document.getElementById('viewpopup').innerHTML=html;
		document.getElementById('viewpopup').style.display='';	 

		document.getElementById('divview').innerHTML=document.getElementById('divview').innerHTML.split('{table}').join(table);
		document.getElementById('div_header').innerHTML='Search: <b>'+data.keyword+'</b>&nbsp;';
//		console.log(data);
		if(data.basetext_category.length>0){
			var sort=false;
			document.getElementById('div_header').innerHTML+='<button type="button" class="btn btn-warning" id="getAllTextCode">All</button>';
			for(var i=0; i<data.basetext_category.length; i++){
				if(i==0){ //first loop
					document.getElementById('div_header').innerHTML+='<button type="button" class="btn btn-warning" id="{id}">{key}</button>'
						.split('{key}').join(data.basetext_category[i].key+':'+data.basetext_category[i].doc_count)
						.split('{id}').join(data.basetext_category[i].key);	
				}else{
					for(var k=0; k<_basetext_category_master.length; k++){
						if(data.basetext_category[i].key==_basetext_category_master[k].description){
							for(var seq=0; seq<_piseq.length; seq++){
								if(_piseq[seq].flag==0){
									if(_piseq[seq].seq-_basetext_category_master[k].seq<0){
										_piseq[seq].flag=1;
										document.getElementById('div_header').innerHTML+='<button type="button" class="btn btn-warning" id="{id}">{key}</button>'
											.split('{key}').join('|').split('{id}').join(0);	
										sort=true;
										break;
									}
								}
							}
						}
						if(sort){
							break;
						}			
					}
//					if(sort==false){
						document.getElementById('div_header').innerHTML+='<button type="button" class="btn btn-warning" id="{id}">{key}</button>'
							.split('{key}').join(data.basetext_category[i].key+':'+data.basetext_category[i].doc_count)
							.split('{id}').join(data.basetext_category[i].key);	
//					}
				}	
			}
			console.log('data.basetext_category.length xx '+data.basetext_category.length)
			for(var i=0; i<data.basetext_category.length; i++){ //Make Event Search By Textcode
				document.getElementById(data.basetext_category[i].key).addEventListener('click', function(){
					CESearchService.searchTextCode(document.getElementById('t_search').value, this.id, function(data){
//						console.log(data);
						var arr_word=new Array();
					       for(var i=0; i<data.aggregations.group_by_state.buckets.length; i++){
					    	   sort_pali="";
					    	   obj_word=new Object();
					    	   obj_word.word=data.aggregations.group_by_state.buckets[i].key;
					    	   obj_word.word_count=data.aggregations.group_by_state.buckets[i].doc_count;
					    	   obj_word.sort_pali=null;//new Array();
					    	   for(var j=0; j<data.aggregations.group_by_state.buckets[i].key.length; j++){
					    		   sort_pali+=map.get(data.aggregations.group_by_state.buckets[i].key[j]);				    			   
					    	   }	
					    	   obj_word.sort_pali=sort_pali;
					    	   arr_word.push(obj_word);				    	   
						   }
					       arr_word.sort(function(a, b) {
					    	   return a.sort_pali.localeCompare(b.sort_pali);   
					       });
							var obj=new Object();
							obj.arr_word=arr_word;
						setContentDetail(obj,'ByTextCode');
					});		
				});
			}
			document.getElementById('getAllTextCode').addEventListener('click', function(){
				setContentDetail(word_allByTextCode,'All');
			});
			setContentDetail(data,'load');
		}
		
	};

	CESearch.prototype.searchUnit = function(textcode, unit, fn){
	    
	     var query={"query": {
	       "query_string": {
	         "fields": ["textcode, unitno, fnseq, lineno,fcrid"],
	         "query": "(textcode:\""+textcode+"\") AND (unitno:\""+unit+"\")"
	       }
	        },
	       "sort": [{"unitno": "asc"}, {"lineno": "asc"}, {"fnseq": "asc"}]
	       ,"size": sizeunit
	     };
	     var sb = [];
	     var linenow=0, linecount=0, fcridsone='',fcridstwo='';fcridgone='',fcridgtwo='';
	     var nl = "<br>"; var content =""; var sp="&nbsp;";
	     var searchunit_source = null; var ft = ''; 
	     var ftstyle = " style='text-decoration: underline;' ";
	     this.ElasticSearch(JSON.stringify(query), _dbep, '_search', 'POST', function(data){
	      for(var i=0; i<data.hits.hits.length; i++){
	       searchunit_source=data.hits.hits[i]._source;
	       ft= searchunit_source.footnote;
	       if(i==0){
	        linenow=searchunit_source.lineno;
	        fcridsone = searchunit_source.fcrid;
	           fcridgone = searchunit_source.fcgroupid;
	           
	           sb.push("<label id='");
	           if(fcridgone.trim().length==0){
	            sb.push(fcridsone);
	           }else{
	            sb.push(fcridgone);
	           }
	           if(ft!=''){sb.push("'");sb.push(ftstyle);sb.push(">");}
	           else {sb.push("'>");}
	       }else{
	        linecount=searchunit_source.lineno;
	        fcridstwo=searchunit_source.fcrid;
	        fcridgtwo=searchunit_source.fcgroupid;
	        if(linecount==linenow){
	         if(searchunit_source.fnseq==1){
	          sb.push("<label id='");
	          if(fcridgtwo.trim().length==0){
	           sb.push(fcridstwo);
	          }else{
	           sb.push(fcridgtwo);
	          }
	          if(ft!=''){sb.push("'");sb.push(ftstyle);sb.push(">");}
	          else {sb.push("'>");}
	         }else{
	          if(fcridgone.trim().length==0){
	           sb.push("</label>");
	           sb.push(sp);
	           sb.push("<label id='");
	           if(fcridgtwo.trim().length==0){
	            sb.push(fcridstwo);
	           }else{
	            sb.push(fcridgtwo);
	           }
	           if(ft!=''){sb.push("'");sb.push(ftstyle);sb.push(">");}
	           else {sb.push("'>");}
	          }else{
	           if(fcridgone==fcridgtwo && fcridgtwo.trim().length!=0){
	            //case of content is not ebt
	            sb.push(sp);sb.push(searchunit_source.content);
	            //case of content is ebt must continue not insert
	            continue;
	           }else{
//	            if(ft!=''){sb.push(ftstyle);}
	            sb.push("</label>");
	            sb.push(sp);
	            sb.push("<label id='");
	            if(fcridgtwo.trim().length==0){
	             sb.push(fcridstwo);
	            }else{
	             sb.push(fcridgtwo);
	            }
	            if(ft!=''){sb.push("'");sb.push(ftstyle);sb.push(">");}
	            else {sb.push("'>");}
	           }
	          }
	         }
	        }else{
	         sb.push("</label>");
	         sb.push(nl);
	         sb.push("<label id='");
	         if(fcridgtwo.trim().length==0){
	          sb.push(fcridstwo);
	         }else{
	          sb.push(fcridgtwo);
	         }
	         if(ft!=''){sb.push("'");sb.push(ftstyle);sb.push(">");}
	         else {sb.push("'>");}
	        }
	        linenow=searchunit_source.lineno;
	        fcridsone=searchunit_source.fcrid;
	        fcridgone=searchunit_source.fcgroupid;
	       }//i!=0
	  //     content = searchunit_source.ebt;
	       content = searchunit_source.content;
	       sb.push(content);
//	       console.log(content);
	      }//end for
	      sb.push("</label>");
	      fn(sb.join(''));
	     });
	    };

	CESearch.prototype.makeEventFilter = function(keyword){
		keyword=keyword.split(' ').join(' AND ');
		var count_loop=0; var des='';
		
		for(var i=0; i<_basetext_content_detail.length; i++){
			if(count_loop==0){
				des=_basetext_content_detail[i].textcode+'*';
				count_loop++;
			}else{
				des=des+' OR textcode:'+_basetext_content_detail[i].textcode+'*';
			}
		}
		var query_by_keywowrd={    "query": {
	        "query_string" : {
	            "fields" : ["content", "textcode","basetext_content_detail","comment_content","comment_conclusion","comment_reason"],
	            "query" : "content:{keyword} AND (textcode:{desc}) AND " +
	            (document.getElementById('chktypesearch_conclusion').checked?"(comment_conclusion:*?*)":"(footnote:*?* OR comment_conclusion:*?* OR comment_content:*?* OR comment_reason:*?*)")
	        }
	    },
	    "size":100000,
	    "aggs": {
	    "group_by_state": {
	      "terms": {
	        "field": "basetext_category.keyword",
	        "size": 1000000
	      }
	    }
	    
	  },"sort":[{"textcode":{"order":"asc"}},{"lineno":{"order":"asc"}},{"fnseq":{"order":"asc"}}]};
		query_by_keywowrd=JSON.stringify(query_by_keywowrd).split('{desc}').join(des).split('{keyword}').join(keyword);
		this.ElasticSearch(query_by_keywowrd, _dbep, '_search', 'POST', function(data){				
			if(data.aggregations.group_by_state.buckets.length>0){
				var basetext_detail=data;
				var arr_textcode=new Array(); var textcode=null;
				document.getElementById('btnview').innerHTML='<button type="button" class="btn btn-warning" id="{id}">{key}</button>';
				document.getElementById('btnview').innerHTML=document.getElementById('btnview')
				.innerHTML.split('{id}').join('wordall').split('{key}').join('All');
				for(var i=0; i<data.aggregations.group_by_state.buckets.length; i++){
					for(var k=0; k<_basetext_category_master.length; k++){
						if(data.aggregations.group_by_state.buckets[i].key==_basetext_category_master[k].description){
							textcode=new Object();
							textcode.seq=_basetext_category_master[k].seq;
							textcode.textcode=_basetext_category_master[k].description;
							textcode.word_count=data.aggregations.group_by_state.buckets[i].doc_count;
							arr_textcode.push(textcode);
						}
					}
				}
				arr_textcode.sort(function(a,b){
					return a.seq>b.seq;
				});
//				console.log(arr_textcode);
				for(var seq=0; seq<_piseq.length; seq++){ //clear flag
					_piseq[seq].flag=0;
				}
				
				for(var i=0; i<arr_textcode.length; i++){
					if(i==0){
						document.getElementById('btnview').innerHTML+='<button type="button" class="btn btn-warning" id="{id}">{key}</button>'
							.split('{id}').join(arr_textcode[i].textcode).split('{key}').join(arr_textcode[i].textcode+':'+arr_textcode[i].word_count);					}else{
						for(var seq=0; seq<_piseq.length; seq++){
							if(_piseq[seq].flag==0){
								if(_piseq[seq].seq-arr_textcode[i].seq<0){
									_piseq[seq].flag=1;
									document.getElementById('btnview').innerHTML+='<button type="button" class="btn btn-warning" id="{id}">{key}</button>'
										.split('{key}').join('|').split('{id}').join(0);	
//									sort=true;
									break;
								}
							}
						}
						document.getElementById('btnview').innerHTML+='<button type="button" class="btn btn-warning" id="{id}">{key}</button>'
							.split('{id}').join(arr_textcode[i].textcode).split('{key}').join(arr_textcode[i].textcode+':'+arr_textcode[i].word_count);
					}
				}
				
				
				for(var i=0; i<arr_textcode.length; i++){
					document.getElementById(arr_textcode[i].textcode).addEventListener('click', function(){
						var clonedata=new Object();
						clonedata.hits=new Object();
						clonedata.hits.hits=new Array();
						for(var j=0; j<basetext_detail.hits.hits.length; j++){
							if(basetext_detail.hits.hits[j]._source.basetext_category==this.id){
								clonedata.hits.hits.push(basetext_detail.hits.hits[j]);
							}
						}
						
						CESearchService.displayTableDetail(clonedata, function(success){
							if(success)
								clonedata=null;
						});
						
					});
				}
				document.getElementById('wordall').addEventListener('click',function(){
					CESearchService.displayTableDetail(basetext_detail, function(){});
				});
			}
		});
	};
	
	CESearch.prototype.displayTableDetail = function(basetext_level_detail, fn){
		var table=' <div class="headercontainer"><div class="tablecontainer" style="height:380px;">';
		table+='<table><thead><tr>';
		table+='<th>Text Code<div>Text Code</div></th><th>Unit<div>Unit</div></th><th>Line<div>Line</div></th>';
		table+='<th>Footnote<div>Footnote</div></th><th>Conclusion<div>Conclusion</div></th><th>Conclusion By<div>Conclusion By</div></th><th>Comment<div>Comment</div></th><th>Comment By<div>Comment By</div></th><th>Reason<div>Reason</div></th><th>Detail<div>Detail</div></th></tr>';
		table+='</thead><tbody>';
		var tr_td=null;
		var item=''; var idusercomment=''; var iduserconclusion=''; var arrcommentreason=''; var commentreason='';
		var close_table='</tbody></table></div></div>';
		_basetext_level_detail=new Array();
//		console.log(basetext_level_detail);
		console.log('basetext_level_detail.hits.hits.length '+basetext_level_detail.hits.hits.length);
		let start = new Date();
		for(var i=0; i<basetext_level_detail.hits.hits.length; i++){
			 tr_td='<tr><td style="width:3%" valign="top">{col1}</td><td style="width:3%" valign="top">{col2}</td><td style="width:5%" valign="top">{col3}</td><td style="width:20%" valign="top">{col4}</td><td style="width:15%" valign="top">{col7}</td><td style="width:10%" valign="top">{col8}</td><td style="width:35%" valign="top">{col5}</td><td style="width:10%" valign="top">{col9}</td><td style="width:10%" valign="top">{col10}</td><td style="width:5%" valign="top">{col6}</td></tr>';
			 tr_td=tr_td.split('{col1}').join(basetext_level_detail.hits.hits[i]._source.textcode);
			 tr_td=tr_td.split('{col2}').join(basetext_level_detail.hits.hits[i]._source.unitno);
			 tr_td=tr_td.split('{col3}').join(basetext_level_detail.hits.hits[i]._source.lineno);
			 tr_td=tr_td.split('{col5}').join(b64_to_utf8(basetext_level_detail.hits.hits[i]._source.comment_content));
			 tr_td=tr_td.split('{col4}').join(b64_to_utf8(basetext_level_detail.hits.hits[i]._source.footnote));
			 tr_td=tr_td.split('{col7}').join(b64_to_utf8(basetext_level_detail.hits.hits[i]._source.comment_conclusion));
			 if(basetext_level_detail.hits.hits[i]._source.comment_conclusion.length==0){
				 tr_td=tr_td.split('{col8}').join('');
			 }else{
				 iduserconclusion = basetext_level_detail.hits.hits[i]._source.iduserconclusion;
				 tr_td=tr_td.split('{col8}').join(_itapusermap.get(iduserconclusion));
			 }
			 if(basetext_level_detail.hits.hits[i]._source.comment_content.length==0){
				 tr_td=tr_td.split('{col9}').join('');
			 }else{
				 idusercomment = basetext_level_detail.hits.hits[i]._source.idusercomment;
				 tr_td=tr_td.split('{col9}').join(_itapusermap.get(idusercomment));
			 }
			 
			 if(basetext_level_detail.hits.hits[i]._source.comment_reason.length==0){
				 tr_td=tr_td.split('{col10}').join('');
			 }else{
				 commentreason='';
				 arrcommentreason=basetext_level_detail.hits.hits[i]._source.comment_reason.split(/\|/);
				 for(var j=0;j<arrcommentreason.length;j++){
					 commentreason =commentreason+_reasonmap.get(arrcommentreason[j]);
				 }
				 tr_td=tr_td.split('{col10}').join(commentreason);
			 }
			 tr_td=tr_td.split('{col6}').join('<input type="button" value="Detail" onClick="getUnitByTextCodeAndUnit({textcode},{unit},{index},{event})" id="{id}">').split('{id}').join('detail'+i).split('{textcode}').join("'"+basetext_level_detail.hits.hits[i]._source.textcode+"'").split('{unit}').join("'"+basetext_level_detail.hits.hits[i]._source.unitno+"'").split('{index}').join(i).split('{event}').join("'detail"+"'");
			 item+=tr_td;
			 _basetext_level_detail.push(basetext_level_detail.hits.hits[i]._source);
//			 console.log(i);
//			 console.log(decodeURIComponent(basetext_level_detail.hits.hits[i]._source.footnote));
//			 console.log(b64_to_utf8(basetext_level_detail.hits.hits[i]._source.comment_content));
		}		
//		console.log(table+item+close_table);
		document.getElementById('display_detail').innerHTML=table+item+close_table;
		document.getElementById('display_detail').style.height='400px';
		let end=new Date();		
		let time = Math.abs(end - start) / 1000;
		let minutes = Math.floor(time / 60) % 60;
		let sec = time % 60;
		console.log('success render basetext_level_detail '+ minutes+':'+sec)
		fn(true);
	};
	
	CESearch.prototype.searchVariantTable = function(idword, fn){
//		var datas={'idword':idword};
		_ukitUtil.ajax(baseUrl + '/E2', 'idword='+idword, 'json', 'get', true, false,'application/json', 'searchVariantTable', function(data) {
			fn(data);
		});
	};
	
	CESearch.prototype.getInfocardPicture = function(pattern, fcrid, column, columnvalue, fn){
		var data=[{pattern: pattern, fcrid: fcrid, column: column, columnvalue: columnvalue}];
		_ukitUtil.ajax(baseUrl + '/E2', JSON.stringify(data), 'json', 'get', true, false,'application/json', 'getInfocardPicture', function(data) {
			fn(data);
		});		
	};
	
	CESearch.prototype.getPictureData = function(size, cellIndex, text, pattern, fcrid, column, columnvalue,fn){
		if(size==cellIndex){
			CESearchService.viewPicture('EDS', pattern, fcrid, column, text, function(data){
//				console.log(data);
				fn(data);
			});
		}else{
//			alert(1);
			if(cellIndex>1 && cellIndex<size-1){
				CESearchService.viewPicture('MSS',pattern, fcrid, column, text, function(data){
					_arrPictureMSS=data.data;
//					console.log(_arrPictureMSS);
//					console.log(data);
				});
			}			
		}
	};
	CESearch.prototype.getRowIndexByTable = function(id_table, fn){
		var tbl=document.getElementById("t_picture");
		if(tbl!=null){
			highlight_row('t_picture');
			for(var i=0; i<tbl.rows.length; i++){
				tbl.rows[i].onclick = function(){
					highlight_row('t_picture');
					fn(this.rowIndex-1);
				};
			}
		}else{
			fn(null);
		}
	};
	
	CESearch.prototype.getResonCommentChoice = function(fcrid, iduser, fn){
		_ukitUtil.ajax(baseUrl + '/E2', 'fcrid='+fcrid+'&iduser='+iduser, 'json', 'get', true, false,'application/json', 'showReasonCommentChoice', function(data) {
//			console.log(data);
			fn(data);
		});
	};
	
	CESearch.prototype.searchBasetextCategeryMaster = function(fn){
		var query={
			   "query": {
			    "query_string": {
			      "fields": ["status"],
			      "query": "status:1"
			    }
			  },
			  "sort":[{"seq":{"order":"asc"}}]
			  ,"size": 1000
			};
		query=JSON.stringify(query);
//		console.log(query);
		this.ElasticSearch(query, 'basetext_category', '_search', 'POST', function(data){
			fn(data);
		});
	};
	
	CESearch.prototype.viewPicture = function(viewType, pattern, fcrid, column, columnvalue, fn){
		var table=' <div class="headercontainer"><div class="tablecontainer" style="height:150px;">';
		table+='<table id="t_picture"><thead><tr>';
		var close_table='</tbody></table></div></div>';
		var item='';
		var finalchecking=null;
		if(viewType=='EDS'){
			table+='<th>Editions<div>Editions</div></th><th>Filename<div>Filename</div></th></tr>';
			_ukitUtil.ajax(baseUrl + '/E2', 'pattern='+encodeURIComponent(pattern)+'&fcrid='+fcrid+'&columnvalue='+columnvalue, 'json', 'get', true, false,'application/json', 'getEds', function(data) {
				_arrPictureEDS=data.data;
				if(data.value=='true' && data.data.length>0){
					for(var i=0; i<data.data.length; i++){
						item+='<tr><td>'+data.data[i].eds+'</td><td>'+data.data[i].filename+'</td></td></tr>';
					}
				}else{
//					alert(data.description);
				}
				document.getElementById('view_picture').innerHTML=table+item+close_table;
				CESearchService.getRowIndexByTable('t_picture', function(rowIndex){
					finalchecking=_arrPictureEDS[rowIndex].line+
					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+_arrPictureEDS[rowIndex].name+
					'&nbsp;&nbsp;&nbsp;&nbsp;'+_arrPictureEDS[rowIndex].date+
					'&nbsp;&nbsp;'+_arrPictureEDS[rowIndex].time+'</b>';
					_ukitUtil.getImage(_arrPictureEDS[rowIndex].server
							+'/'+_arrPictureEDS[rowIndex].folder
							+'/'+_arrPictureEDS[rowIndex].filename
							+'.jpg',finalchecking,_arrPictureEDS[rowIndex].filename,'vieweds.jsp'
							,(screen.width),(screen.height),_arrPictureEDS[rowIndex].finaltext);
				});
				fn(data);
			});
		}else{
			table+='<th>Abbr<div>Abbr</div></th><th>Filename<div>Filename</div></th></tr>';
			var datas=[{pattern:pattern,'fcrid':fcrid,'column':column,'columnvalue':columnvalue}];
			_ukitUtil.ajax(baseUrl + '/E2', JSON.stringify(datas), 'json', 'post', true, false,'application/json', 'getInfocardPicture', function(data) {
				_arrPictureMSS=data.data;
				if(data.data.length>0){
					for(var i=0; i<data.data.length; i++){
						item+='<tr><td>'+data.data[i].abbr+'</td><td>'+data.data[i].filename+'</td></td></tr>';
					}
				}
				document.getElementById('view_picture').innerHTML=table+item+close_table;
				CESearchService.getRowIndexByTable('t_picture', function(rowIndex){
					finalchecking=_arrPictureMSS[rowIndex].line+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+
					_arrPictureMSS[rowIndex].name+'&nbsp;&nbsp;&nbsp;&nbsp;'+_arrPictureMSS[rowIndex].date+
					'&nbsp;&nbsp;'+_arrPictureMSS[rowIndex].time+'<br>';
					_ukitUtil.getImage(_arrPictureMSS[rowIndex].server
							+'/'+_arrPictureMSS[rowIndex].folder
							+'/'+_arrPictureMSS[rowIndex].filename
							+'.jpg',finalchecking,_arrPictureMSS[rowIndex].filename,'viewinfo.jsp'
							,(screen.width),(screen.height),_arrPictureMSS[rowIndex].finaltext);
				});
				fn(data);
			});
		}	
	};	
}

function setComment(fcrid){
	var data={'fcrid':fcrid};
	_ukitUtil.ajax(baseUrl+'/E2',JSON.stringify(data),'json','post', true, false, 'application/json','searchComment', function(datacomment){
//		console.log('return of comment : '+JSON.stringify(datacomment));
//		console.log(datacomment.description);
//		document.getElementById('comment').innerHTML=datacomment.description.substring(datacomment.description.indexOf('#')+1,datacomment.description.length);
//		 var dcomment=documentment.getElementsByName('datecomment');
		 var html=[]; var conclusionposition=-1;
		 for(var i=0; i<datacomment.data.length; i++){
			 if(datacomment.data.conclusion==1){
				 conclusionposition=i;
				 break;
			 }
		 }
		 if(conclusionposition!=-1){
			 setCommentContent(html,datacomment,i);
		 }
		 for(var i=0; i<datacomment.data.length; i++){
			if(conclusionposition==i) continue;
//			console.log(JSON.stringify(datacomment.data[i]));
			setCommentContent(html,datacomment,i);
		}
		 document.getElementById('comment').style.fontSize = '23px';
			document.getElementById('comment').style.fontFamily='Open Sans';
		 document.getElementById('comment').innerHTML=html.join("");		
	});
}
function setCommentContent(html,datacomment, position){
	html.push("<div class='"+(datacomment.data[position].conclusion==0?"panel panel-default'":"panel panel-primary'")+">");
	html.push("<div class='panel-body'>");
		html.push(b64_to_utf8(datacomment.data[position].comment));
	html.push("</div>");
	html.push("<div class='panel-heading'>");
	html.push("<table width=100%>");
		html.push("<tr>");
			html.push("<td align='center' width=52%>");
				html.push(datacomment.data[position].username);
			html.push("</td>");
			html.push("<td align='center' width=10%><span class='badge'>");
			if(datacomment.data[position].conclusion==0){
				html.push("Comment");
			}else{
				html.push("Conclusion");
			}
			html.push("</span></td>");
			html.push("<td align='center' width=30% >");
				html.push(datacomment.data[position].comment_date);
			html.push("</td>");
		 html.push("</tr>");
	 html.push("</table>");
	html.push("</div>");
html.push("</div>");
}
function reply_click(e) {
	document.getElementById('listreason').innerHTML='';
	e = e || window.event;
	e = e.target || e.srcElement;	
	if (e.nodeName === 'LABEL' || e.nodeName === 'I' || e.nodeName==='SPAN') {
		var idword=null;
		if(e.parentElement.id!='word'){ // รองรับ hightlight span
			idword=e.parentElement.id;
		}else{
			if(document.getElementById(e.id).parentNode.id!='word')
				idword=document.getElementById(e.id).parentNode.id;
			else
				idword=e.id;
		}
		searchVariant(idword);
		getReasonCommentAndFootnote(idword, 'reply_click');
		
		var query=(idword.indexOf('EP')!=-1?'q=fcgroupid:'+idword:'q=fcrid:'+idword);
		CESearchService.ElasticSearch(query, _dbep, '_search', 'GET', function(data){	
//			console.log(data);
			if(data.hits.hits.length>0){
				document.getElementById('footnote').style.fontSize = '19px';
				document.getElementById('footnote').style.fontFamily='Open Sans';
				document.getElementById('footnote').innerHTML=b64_to_utf8(data.hits.hits[0]._source.footnote);
//				document.getElementById('comment').style.fontSize = '19px';
//				document.getElementById('comment').style.fontFamily='Open Sans';
				if(data.hits.hits[0]._source.fcgroupid==''){
					setComment(data.hits.hits[0]._source.fcrid);
				}else{
					setComment(data.hits.hits[0]._source.fcgroupid);
				}
			}else{
				document.getElementById('footnote').innerHTML='';
				document.getElementById('comment').innerHTML='';
			}
		});
	}
}
function searchVariant(idword){
	CESearchService.searchVariantTable(idword, function(variant){
		_arrVariant=variant;
//		console.log(variant);
		var table='<div class="headercontainer"><div class="tablecontainer" style="height:150px;"><table id="t_variant"><thead><tr>';
		var column='<th>{th}{div}</th></th>';
		var add_col='';
		var item='';
		var close_table='</tbody></table></div></div>';
		var fcrid=null; 
		if(variant.value=='true'){
			fcrid=variant.description;
			for(var i=0; i<variant.data[0].length; i++){
				if(i!=1){
					add_col+=column.split('{th}').join(variant.data[0][i]).split('{div}').join('<div>'+variant.data[0][i]+'</div>');
				}else{
					add_col+=column.split('{th}').join(variant.data[0][i]).split('{div}').join('<div id="sort_variant">'+variant.data[0][i]+'</div>');
				}
			}
			for(var i=1; i<variant.data.length; i++){
				item+='<tr>';
				for(var j=0; j<variant.data[i].length; j++){
					if(j==0){
						if(variant.data[i][j]==0){
							item+='<td><image src="../EP/images/unchk.png"</td>';
						}else{
							item+='<td><image src="../EP/images/chk.png"</td>';
						}	
					}else{
						if(j==variant.data[i].length-1){
							item+='<td><input type="button" onClick="getCommentaryChoice({pattern},{idword})"></td>'.split('{pattern}')
								.join("'"+variant.data[i][1]+"'").split('{idword}').join("'"+idword+"'");
						}else{
							item+='<td>'+variant.data[i][j]+'</td>';
						}			
					}	
				}
				item+='</tr>';
			}
			document.getElementById('variant').innerHTML='';
			document.getElementById('variant').innerHTML=table+add_col+item+close_table;
			sortTable(0,'t_variant');
			document.getElementById('sort_variant').addEventListener('click', function(data){
				sortTable(0,'t_variant');
			});
			var table = document.getElementById("t_variant");
			if (table != null) {
				var column=null; var columnvalue=null; var pattern=''; var cellIndex=0; var text=null;
			    for (var i = 0; i < table.rows.length; i++) {
			    	table.rows[i].onclick = function(){
//			    		console.log(this.cells.item(1).innerText);
			    		pattern=table.rows[this.rowIndex].cells[1].innerText;
//			    		alert(pattern);
			    		_variant_row=this.rowIndex;
//			    		console.log(_arrVariant);
//			    		console.log(_variant_row);
			    	};
			        for (var j = 0; j < table.rows[i].cells.length; j++)
			        table.rows[i].cells[j].onclick = function () {
//			        	console.log(variant.data[0][this.cellIndex]); //get column by cell index
			        	column=variant.data[0][this.cellIndex];
			        	columnvalue=this.innerText;
			        	cellIndex=this.cellIndex;
			        	text=this.innerText;
//			        	alert(table.rows.rowIndex);
//			        	pattern=_arrVariant.data[_variant_row][1];
//			        	console.log(_arrVariant.data[_variant_row][this.cellIndex]);
//			        	CESearchService.getPictureData((variant.data[0].length-2),this, pattern, fcrid, column, columnvalue, function(){
//			        			            var rowId = this.parentNode.rowIndex;
			        	  var rowId = this.parentNode.rowIndex;
			            var rowsNotSelected = table.getElementsByTagName('tr');
			            for (var row = 0; row < rowsNotSelected.length; row++) {
			                rowsNotSelected[row].style.backgroundColor = "";
			                rowsNotSelected[row].classList.remove('selected');
			            }
			            var rowSelected = table.getElementsByTagName('tr')[rowId];
			            rowSelected.style.backgroundColor = "#BCD4EC";
			            rowSelected.className += " selected";
//			        	});
//			        	alert(pattern);
			            setTimeout(function(){
				        	CESearchService.getPictureData((variant.data[0].length-2),cellIndex, text, pattern, fcrid, column, columnvalue, function(picture){
//				        		console.log(picture);
				        	});
//			            	getPictureData((variant.data[0].length-2),cellIndex, text, pattern, fcrid, column, columnvalue);
			            }, 1);
			        };
			    }
			}

			function getPictureData(size, cellIndex, text, p_pattern, fcrid, column, columnvalue) {
//			    console.log(size, cellIndex, text);
				if(size==cellIndex){
					CESearchService.viewPicture('EDS', p_pattern, fcrid, column, text, function(data){
//						console.log(data);
					});
				}else{
					if(cellIndex>1 && cellIndex<size-1){
						CESearchService.viewPicture('MSS',p_pattern, fcrid, column, text, function(data){
//							console.log(data);
						});
					}
					
				}
			}
		}
	});
}
	function getCommentaryChoice(pattern,fcrid){
		try{
			var html='<div class="container">';
			html+='<button type="button" style="display:none" id="getCtychoice" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false"></button>';
			html+='<div class="modal fade" id="myModal" tabindex="-1" role="dialog">';
			html+='<div class="modal-dialog modal-sm">';
			html+='<div class="modal-content">';
			html+='<div class="modal-header">';
			html+='<button type="button" class="close" data-dismiss="modal">&times;</button>';
			html+='<h4 class="modal-title">Cty</h4></div>';
			html+='<div class="modal-body"><div id="divcty"></div></div>';
			html+='<div class="modal-footer">';
//			html+='<input type="button" class="btn btn-primary" id="savecty" value="Save">';
//			html+='<button type="button" class="btn btn-default" id="close" data-dismiss="modal">Close</button>';
			html+='</div></div></div></div></div>';
		    document.getElementById('viewpopup').innerHTML=html;
		    document.getElementById('viewpopup').style.display='';	    
			$.ajax({
				url: baseUrl+"/E2",
				data: 'act=getCommentaryChoice&pattern='+encodeURIComponent(pattern)+'&fcrid='+fcrid,
				dataType : "json",
				type : "GET",
				async : true,
				cache: false,
				contentType : "application/text;charset=utf-8",
				success: function(cty) {
					if(cty.value=='true'){
						document.getElementById('getCtychoice').click();
						document.getElementById('divcty').innerHTML=cty.description+document.getElementById('divcty').innerHTML;
//						callCty();
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
function getWord(word, event){
	if(event=='POPUP'){
		document.getElementById('close_popup').click();
	}
//	console.log(event);
	CESearchService.searchKeyword(word, 'EXACT', function(data){
		document.getElementById('word_click_view').innerHTML=word;
		CESearchService.displayTableDetail(data, function(success){
			if(success){
//				console.log(_basetext_level_detail);
			}
		});
		CESearchService.makeEventFilter(word);
	});
}

function clear(){
	document.getElementById('display_detail').innerHTML='';
	document.getElementById('word_click_view').innerHTML='';
	document.getElementById('btnview').innerHTML='';
}

function getUnitByTextCodeAndUnit(textcode, unit, index, event){
	if(event=='detail'){
		_firstWordSelect=null;
		getPopup();
		document.getElementById('getPopupVariant').click();
	}
	CESearchService.searchUnit(textcode, unit, function(data_content){
//		-------------------------------------------------------------------Table Variant
	
		var table='<div class="headercontainer"><div class="tablecontainer" style="height:100%;">';
		table+='<table id="t_variant"><thead><tr>';
		table+='<th><div></div></th><th>Variant<div id="sort_variant">Variant</div></th><th>B<div>B</div></th>';
		table+='<th>C<div>C</div></th><th>K<div>K</div></th><th>M<div>M</div></th>';
		table+='<th>T<div>T</div></th><th>MMS<div>MMS</div></th><th>Eds<div>Eds</div></th><th>Comm.<div>Comm.</div></th></tr>';
//		console.log(data_content);
		var item='';
		var close_table='</tbody></table></div></div>';
		document.getElementById('header_detail').innerHTML=_basetext_level_detail[index].seriesname+'>>'
			+_basetext_level_detail[index].basetextname+'>>'+_basetext_level_detail[index].suttaname+'>>'
			+_basetext_level_detail[index].sectionname+' <b>'+_basetext_level_detail[index].unitno+'</b>';
		document.getElementById('div_word_content').innerHTML='<input type="button" value="<<" id="prevoius">'+_basetext_level_detail[index].content
			+'<input type="button" value=">>" id="next">';
		document.getElementById('word').innerHTML='';
		document.getElementById('word').innerHTML=data_content;
		document.getElementById('variant').innerHTML=table+item+close_table;
		document.getElementById('word').style.fontSize = '22px';
		document.getElementById('word').style.fontFamily='Open Sans';
		document.getElementById('footnote').style.fontSize = '19px';
		document.getElementById('footnote').style.fontFamily='Open Sans';
		document.getElementById('footnote').innerHTML=b64_to_utf8(_basetext_level_detail[index].footnote);
//		document.getElementById('comment').style.fontSize = '19px';
//		document.getElementById('comment').style.fontFamily='Open Sans';
//		document.getElementById('comment').innerHTML='<div class="myDiv"><h1>Comment</h1></div>'+b64_to_utf8(_basetext_level_detail[index].comment_content);
		var idword=null;
		if(_basetext_level_detail[index].fcgroupid==''){
			setComment(_basetext_level_detail[index].fcrid);
			idword=_basetext_level_detail[index].fcrid;
		}else{
			setComment(_basetext_level_detail[index].fcgroupid);
			idword=_basetext_level_detail[index].fcgroupid;
		}
//		_otherWordSelect=idword;
		if(_firstWordSelect==null){
			_firstWordSelect=idword;
		}
//		-------------------------------------------------------------------ViewPicture
		table=' <div class="headercontainer"><div class="tablecontainer" style="height:150px;">';
		table+='<table><thead><tr>';
		table+='<th>Abbr<div>Abbr</div></th><th>Filename<div>Filename</div></th><tr>';
		item='';
		highlightText(idword);
		if(_basetext_level_detail[index].fcgroupid==''){
			searchVariant(_basetext_level_detail[index].fcrid);
		}else{
			searchVariant(_basetext_level_detail[index].fcgroupid);
		}
		
		getReasonCommentAndFootnote(index, 'getUnitByTextCodeAndUnit');

		document.getElementById('view_picture').innerHTML=table+item+close_table;
		
		_rowIndexContent=index;
		document.getElementById('next').addEventListener('click', function(){
			if(_rowIndexContent<_basetext_level_detail.length-1){
				_rowIndexContent++;
				getUnitByTextCodeAndUnit(_basetext_level_detail[_rowIndexContent].textcode, _basetext_level_detail[_rowIndexContent].unitno, _rowIndexContent, 'next');
			}
		});
		document.getElementById('prevoius').addEventListener('click', function(){
			if(_rowIndexContent!=0){
				_rowIndexContent--;
				getUnitByTextCodeAndUnit(_basetext_level_detail[_rowIndexContent].textcode, _basetext_level_detail[_rowIndexContent].unitno, _rowIndexContent, 'prevoius');
			}
		});
	});
}

function getPopup(){
	var html='<div class="container">';
	html+='<button type="button" style="display:none" id="getPopupVariant" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal1"  data-backdrop="static" data-keyboard="false"></button>';
	html+='<div class="modal fade" id="myModal1" tabindex="-1" role="dialog">';
	html+='<div class="modal-dialog" style="width:100%;  margin-top: 0px;">';
	html+='<div class="modal-content" >';
	html+='<div class="modal-header">';
	html+='<button type="button" class="close" data-dismiss="modal">&times;</button>';
//	html+='<h4 class="modal-title">Cty</h4></div>';
	html+='<div class="modal-body" style="height:70%"><div id="div_popup_detail_variant"></div></div>';
	html+='<div class="modal-footer">';
//	html+='<input type="button" class="btn btn-primary" id="savecty" value="Save">';
//	html+='<button type="button" class="btn btn-default" id="close" data-dismiss="modal">Close</button>';
	html+='</div></div></div></div></div>';
		var table='<div class = "panel panel-danger">';
//		table+='<div id="viewpopup" style="display:none"></div>';
		table+='<div id="viewdetail" style="display:nones">';
		table+='<table style="width:100%" border="0">';
		table+='<tr>';
		table+='<td>';
		table+='<div class = "panel panel-danger">';
		table+='<div class = "panel-heading">';	
		table+='<div id="header_detail"></div>';
		table+='</div>';
		table+='</div>';
		table+='</td>';
		table+='<td>';
		table+='<div class = "panel panel-danger">';
		table+='<div class = "panel-heading">';	
		table+='<div id="div_word_content"></div>';
		table+='</div>';
		table+='</div>';	
		table+='</td>';
		table+='</tr>';
		table+='<tr>';
		table+='<td width="70%"><div id="word" style="overflow: scroll; width:auto; height: 190px;" class="border-line"></div></td>';
		table+='<td valign="top"><div id="view_picture"></div></td>';
		table+='</tr>';   		
		table+='<tr>';
		table+='<td colspan="2">';
		table+='<div id="variant">variant</div>';
		table+='</td>';
		table+='</tr>';
		table+='<tr>';
		table+='<td colspan="2">';
		table+='<br><span class="badge">Footnote</span>';
		table+='<div id="footnote" class="csscomment" style="height: auto;"></div>';
		table+='</td>';
		table+='</tr>';   
		table+='<tr>';
		table+='<td colspan="2" valign="top"  border=0><br><span class="badge">Reason</span><br><div class="fstElement fstMultipleMode"><div id="listreason" class="fstControls"></div></div></td>';
		table+='</tr>';
		table+='<tr>';
		table+='<td valign="top" width=100% border=0 colspan="2">';
//		table+='<div class="panel panel-default">';
//		table+='<div class="panel-body">';
		table+='<div id="comment"></div>';
//		table+='</div>'; 	
//		table+='<div class="panel-heading">{detail_heading}</div>';
//		table+='</div>';
		table+='</td>';
		table+='</tr>';     				
		table+='</table>';
		table+='</div>';
		table+='</div>';
		document.getElementById('display_variant').innerHTML=html;
		document.getElementById('div_popup_detail_variant').innerHTML=table;
		document.getElementById('word').addEventListener('click', function(){
			reply_click();
		});
}

function highlightText(idword)
{
//	console.log(idword);
    var str = document.getElementById(idword).innerText;
    //highlight the searched text
    document.getElementById(idword).innerHTML =document.getElementById(idword).innerHTML.replace(str, '<span class="highlight">' + str + '</span>');
	var word_list = document.getElementsByClassName("highlight");
    for(var i=0; i<word_list.length; i++){
		if(idword==_firstWordSelect){
			word_list[i].style.backgroundColor='#4CC552';
		}else{
			word_list[i].style.backgroundColor='#ff8000';
		}
	}
}

function changeFootnote (statement){
//	console.log(statement);
	CESearchService.ElasticSearch(statement, _dbep,'_search', 'GET', function(data){
//		console.log(data);
		for(var i=0; i<data.hits.hits.length; i++){
//			document.getElementById('divcomment').innerHTML=data.hits.hits[i]._source.footnote;
//			console.log(data.hits.hits[i]._source.footnote);
//			document.getElementById('footnote').innerHTML='<div class="myDiv"><h1>Footnote</h1></div>'+"<div>"+document.getElementById('divcomment').innerText+"</div>";
			document.getElementById('footnote').innerHTML=b64_to_utf8(data.hits.hits[i]._source.footnote);
		}
		if(data.hits.hits.length<1){
//			document.getElementById('divcomment').innerHTML='';
			document.getElementById('footnote').innerHTML='';
		}
	});
}
function getReasonCommentAndFootnote(index, pEvent){
	if(pEvent=='getUnitByTextCodeAndUnit'){
		var query=(_basetext_level_detail[index].fcgroupid!=''?'q=fcgroupid:'+_basetext_level_detail[index].fcgroupid:'q=fcrid:'+_basetext_level_detail[index].fcrid);
		var fcrid_fcgroupid=(_basetext_level_detail[index].fcgroupid!=''?_basetext_level_detail[index].fcgroupid:_basetext_level_detail[index].fcrid);		
		changeFootnote(query);
	}else{
		fcrid_fcgroupid=index;
//		console.log('fcrid group 1252 : '+fcrid_fcgroupid);
		changeFootnote('q=fcrid'+fcrid_fcgroupid);
	}
	CESearchService.getResonCommentChoice(fcrid_fcgroupid, _iduser, function(data){
		document.getElementById('reason').innerHTML=data.description;
		document.getElementById('listreason').innerHTML='';
			var reason=document.getElementsByName('reasonchoice');
			for(var i=0; i<reason.length; i++){
				if(reason[i].checked){
						var html='<div id="{id}" class="fstChoiceItem">{display}<button id="{bid}" value="{value}" class="fstChoiceRemove" type="button"></button></div>';
						html=html.split('{id}').join('r'+parseInt(reason[i].id));
						html=html.split('{bid}').join('b'+parseInt(reason[i].id));
						html=html.split('{value}').join(reason[i].value);
						html=html.split('{display}').join(reason[i].value);
						document.getElementById('listreason').innerHTML+=html;
				}
			}
	});	
}
function eventAllCheckBox(event){
	var choice=document.getElementsByName('choice');
	if(event=='check'){
		for(var i=0; i<choice.length; i++){
			choice[i].checked=true;
		}
	}else{
		for(var i=0; i<choice.length; i++){
			choice[i].checked=false;
		}
	}
}
function setContentDetail(data, type){
	console.log('setContentDetail '+data.arr_word.length+' '+type);
	document.getElementById('col1').innerHTML='';
	document.getElementById('col2').innerHTML='';
	if(data.arr_word.length<15){
		for(var i=0; i<data.arr_word.length; i++){
			document.getElementById('col1').innerHTML+='<p onclick="getWord('+"'"+data.arr_word[i].word+"'"+","+"'POPUP'"+')">'+data.arr_word[i].word+' ('+data.arr_word[i].word_count+')</p>';
		}
	}else{
		console.log('render content')
		let start = new Date();
		var partial=parseInt(data.arr_word.length / 2);	
//		console.log(partial);
		for(var i=0; i<partial; i++){
			document.getElementById('col1').innerHTML+='<p onclick="getWord('+"'"+data.arr_word[i].word+"'"+","+"'POPUP'"+')">'+data.arr_word[i].word+' ('+data.arr_word[i].word_count+')</p>';
		}
		for(var i=partial; i<data.arr_word.length; i++){
			document.getElementById('col2').innerHTML+='<p onclick="getWord('+"'"+data.arr_word[i].word+"'"+","+"'POPUP'"+')">'+data.arr_word[i].word+' ('+data.arr_word[i].word_count+')</p>';
		}
		let end =new Date();
		let time = Math.abs(end - start) / 1000;
		let minutes = Math.floor(time / 60) % 60;
		let sec = time % 60;
		console.log('success render '+minutes+':'+sec)
	}	
	if(type=='load'){
		document.getElementById('getView').click();
	}
	
}

function sortTable(n,id) {
	  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	  table = document.getElementById(id);
	  switching = true;
	  //Set the sorting direction to ascending:
	  dir = "asc"; 
	  /*Make a loop that will continue until
	  no switching has been done:*/
	  while (switching) {
	    //start by saying: no switching is done:
	    switching = false;
	    rows = table.getElementsByTagName("TR");
	    /*Loop through all table rows (except the
	    first, which contains table headers):*/
	    for (i = 1; i < (rows.length - 1); i++) {
	      //start by saying there should be no switching:
	      shouldSwitch = false;
	      /*Get the two elements you want to compare,
	      one from current row and one from the next:*/
	      x = rows[i].getElementsByTagName("TD")[n];
	      y = rows[i + 1].getElementsByTagName("TD")[n];
	      /*check if the two rows should switch place,
	      based on the direction, asc or desc:*/
	      if (dir == "asc") {
	        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
	          //if so, mark as a switch and break the loop:
	          shouldSwitch= true;
	          break;
	        }
	      } else if (dir == "desc") {
	        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
	          //if so, mark as a switch and break the loop:
	          shouldSwitch = true;
	          break;
	        }
	      }
	    }
	    if (shouldSwitch) {
	      /*If a switch has been marked, make the switch
	      and mark that a switch has been done:*/
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	      //Each time a switch is done, increase this count by 1:
	      switchcount ++;      
	    } else {
	      /*If no switching has been done AND the direction is "asc",
	      set the direction to "desc" and run the while loop again.*/
	      if (switchcount == 0 && dir == "asc") {
	        dir = "desc";
	        switching = true;
	      }
	    }
	  }
	}
//$(document).on('show.bs.modal', '.modal', function (event) {
//    var zIndex = 1040 + (10 * $('.modal:visible').length);
//    $(this).css('z-index', zIndex);
//    setTimeout(function() {
//        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
//    }, 0);
//});