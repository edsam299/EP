<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	    <!-- Bootstrap Core CSS -->
   
   <link rel="stylesheet" href="fastselect-master/dist/fastselect.min.css">
   <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    
  <link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css">
   <link rel="stylesheet" href="editor/dist/summernote.css"> 
    <style type="text/css">
     /* Popover */
  .popover {
      border: 2px solid #31708f;
  }
  /* Popover Header */
  .popover-title {
    background-color: #b8c3a8;
    color: #000000;
    font-size: 16px;
    text-align: center;
  }
  /* Popover Body */
  .popover-content {
    background-color: white;
    color: #FFFFFF;
    padding: 2px;
  }
  /* Popover Arrow */
  .arrow {
      border-right-color: red !important;
  }
	.csscomment{
	    width: 100%;
    	height: 200px;
    	overflow: auto;
    	font-family: "Open Sans";
    	font-size: 22px;
	}
      div#editorcomment {
          width: 100%;
/*           margin: auto; */
          text-align: left;
      }

      .class1 {
        border-radius: 10%;
        border: 2px solid #efefef;
      }

      .class2 {
        opacity: 0.5;
      }   
  </style>
<title>Comment</title>

</head>
<body>
    
<table>
	<tr>
		<td>
			<div class="col-md-12">
				<div id="reason"></div>
			</div>
		</td>
		<td>
			 <div class="fstElement fstMultipleMode">
  				<div id="listreason" class="fstControls"></div>
  			</div>		
		</td>
	</tr>
</table>
<table border="0" width="100%">
  <tr>
         <td  valign="top" width="50%">
     		<div class="col-md-12">
		   <div id="editorcomment">
		    <textarea name="text" class="summernote" id="contents" title="Contents"></textarea>
		  </div>
          <div class="checkbox">
		  	<label><input type="checkbox" id="chkconclusion">Conclusion</label>
            <button type="button" class="btn btn-success" id="savecomment">Save Comment</button>
            <button type="button" class="btn btn-success" id="clearcomment" style="display:none">Cancel Edit Comment</button>
            <input type="hidden" id="callpopupeve" onclick="callpopupevn()">
       </div>
     </div>
      </td>
     <td valign="top" width="50%">
     	<div class="col-md-12">
			<div id="viewcomment"></div>
      </div>
    </td>      
      </tr>
     </table>
</body>
    <script src="bootstrap/js/jquery.js"></script>
	<script src="js/common.js"></script>
	<script src="js/epcontroller.js"></script>
	<script src="dhtmlxmsg/codebase/message.js"></script> 
    <!-- Bootstrap Core JavaScript -->
    	<script src="bootstrap/js/bootstrap.js"></script>
<!-- 	<script src="bootstrap/js/bootstrap-confirmation.min.js"></script> -->
<!--     <script src="bootstrap/js/bootstrap.min.js"></script> -->
 	<script type="text/javascript" src="editor/dist/summernote.min.js"></script>

<script type="text/javascript">
var baseUrl = "${pageContext.request.contextPath}";
var _iduser='${sessionScope.iduser}';
var _ukitUtil = new UkitUtil();
var _comment=new comment();
var editflag=false;
var _idcomment=0;
	$(document).ready(function(){
	      $('.summernote').summernote({
	          height: 200,
	  		toolbar: [
	  		// [groupName, [list of button]]
	  		['style', ['bold', 'italic', 'underline', 'clear']],
	  		['font', ['strikethrough', 'superscript', 'subscript']],
	  		['fontsize', ['fontsize']],
	  		['color', ['color']],
	  		['para', ['ul', 'ol', 'paragraph']],
	  		['height', ['height']],
	  		['insert', ['picture']],
	  		['misc',['redo','undo']]]
	        });

		$("#editorcomment").css("font-family", "Open Sans");
		$("#editorcomment").css("fontSize", 22);
// 		getReasonCommentChoice('', _iduser);
	});
setTimeout(function(){
// 	Remove 
	var a=document.getElementsByTagName('a');
    for(var i=0; i<a.length; i++){
    	if(a[i].innerHTML.indexOf('Unlicensed')!=-1){
            a[i].outerHTML='';
        }        	
    }
}, 1000);
	document.getElementById('savecomment').addEventListener('click',function(){	
		var comment_=document.getElementsByClassName('note-editable panel-body');		
		var conclusion_=(document.getElementById('chkconclusion').checked?1:0);
		var txt=comment_[0].innerText.trim();
		console.log(comment_);
		if(txt.length==0 || localStorage.getItem('idword')==null)
			return;
		if(editflag){
			var data=document.getElementsByClassName('note-editable panel-body');
			_comment.manageComment(localStorage.getItem('idword'), _iduser, 2, utf8_to_b64(data[0].innerHTML),
					conclusion_, 1, _idcomment, function(success){
				if(success.value=='true'){
					document.getElementById('clearcomment').click();
					_comment.searchComment(localStorage.getItem('idword'), function(oComment){
						document.getElementById('viewcomment').innerHTML=oComment.description.substring(oComment.description.indexOf('#')+1,oComment.description.length);
						var dcomment=document.getElementsByName('datecomment');
						var html=null;
						for(var i=0; i<oComment.data.length; i++){
							var cssComment='<div {id} class="csscomment">';
							cssComment=cssComment.split('{id}').join('id="cssComment'+oComment.data[i].id+'"');	
							cssComment=cssComment.split('{id}').join('cssComment'+oComment.data[i].id);
							html=document.getElementById('delete'+oComment.data[i].id).outerHTML;
							html=html.split('(y)').join("<button onclick='confirmdel({id})' style='color:black;'>Yes</button>");
							html=html.split('(n)').join("<button onclick='canceldel({id})' style='color:black;'>No</button>");
							html=html.split('{id}').join(oComment.data[i].id);
							document.getElementById('delete'+oComment.data[i].id).outerHTML=html;
							document.getElementById(dcomment[i].id).innerHTML=oComment.data[i].comment_date;							
							document.getElementById('body'+oComment.data[i].id).innerHTML=cssComment+b64_to_utf8(oComment.data[i].comment)+'</div>';
						}
						callpopupevn();
						reset();
					});
				}
			});
		}else{
			_comment.saveComment(localStorage.getItem('idword'), _iduser, 2, comment_[0].innerHTML, conclusion_, function(success){
				if(success.value=='true'){
							comment_[0].innerHTML='';
							_comment.searchComment(localStorage.getItem('idword'), function(oComment){
								document.getElementById('viewcomment').innerHTML=oComment.description.substring(oComment.description.indexOf('#')+1,oComment.description.length);
								var dcomment=document.getElementsByName('datecomment');
								var html=null;
								for(var i=0; i<oComment.data.length; i++){
									var cssComment='<div {id} class="csscomment">';
									cssComment=cssComment.split('{id}').join('id="cssComment'+oComment.data[i].id+'"');	
									cssComment=cssComment.split('{id}').join('cssComment'+oComment.data[i].id);
									html=document.getElementById('delete'+oComment.data[i].id).outerHTML;
									html=html.split('(y)').join("<button onclick='confirmdel({id})' style='color:black;'>Yes</button>");
									html=html.split('(n)').join("<button onclick='canceldel({id})' style='color:black;'>No</button>");
									html=html.split('{id}').join(oComment.data[i].id);
									document.getElementById('delete'+oComment.data[i].id).outerHTML=html;
									document.getElementById(dcomment[i].id).innerHTML=oComment.data[i].comment_date;							
									document.getElementById('body'+oComment.data[i].id).innerHTML=cssComment+b64_to_utf8(oComment.data[i].comment)+'</div>';									
								}
								parent.document.getElementById('comments').style='height:'+document.documentElement.scrollHeight+'px;';
								callpopupevn();
								reset();
							});
//	 					}
//	 				});
					
				}else{
// 					var d = document.getElementById("savemessage");
// 					d.className = "alert alert-danger";
// 					d.innerHTML=success.description.substring(0,success.description.indexOf('#'));
// 					document.getElementById('overlay').style.display='';
				}
			});
		}
	});
	document.getElementById('clearcomment').addEventListener('click',function(){
		this.style.display='none';
		reset();
	});
	function deletecomment(idcomment){
		_comment.manageComment(localStorage.getItem('idword'), _iduser, 2, document.getElementById('cssComment'+idcomment).innerHTML,
				0, 2, idcomment, function(success){
			if(success.value=='true'){
				_comment.searchComment(localStorage.getItem('idword'), function(oComment){
					document.getElementById('viewcomment').innerHTML=oComment.description.substring(oComment.description.indexOf('#')+1,oComment.description.length);
					var dcomment=document.getElementsByName('datecomment');
					var html=null;
					for(var i=0; i<oComment.data.length; i++){
						var cssComment='<div {id} class="csscomment">';
						cssComment=cssComment.split('{id}').join('id="cssComment'+oComment.data[i].id+'"');	
						cssComment=cssComment.split('{id}').join('cssComment'+oComment.data[i].id);
						html=document.getElementById('delete'+oComment.data[i].id).outerHTML;
						html=html.split('(y)').join("<button onclick='confirmdel({id})' style='color:black;'>Yes</button>");
						html=html.split('(n)').join("<button onclick='canceldel({id})' style='color:black;'>No</button>");
						html=html.split('{id}').join(oComment.data[i].id);
						document.getElementById('delete'+oComment.data[i].id).outerHTML=html;
						document.getElementById(dcomment[i].id).innerHTML=oComment.data[i].comment_date;							
						document.getElementById('body'+oComment.data[i].id).innerHTML=cssComment+b64_to_utf8(oComment.data[i].comment)+'</div>';
					}
					parent.document.getElementById('comments').style='height:'+document.documentElement.scrollHeight+'px;';
					callpopupevn();
				});
			}
		});
	}
	function callpopupevn(){
		$('[data-toggle="popover"]').popover(); 
	}
	function editecomment(idcomment){
		_idcomment=idcomment;
		editflag=true;
		var data=document.getElementsByClassName('note-editable panel-body');
		data[0].innerHTML=document.getElementById('cssComment'+idcomment).innerHTML;
		data[0].focus();
		document.getElementById('clearcomment').style.display='';
	}
	function canceldel(id){
		$('[data-toggle="popover"]').popover('hide'); 
		$('[data-toggle="popover"]').popover(); 
		document.getElementById('delete'+id).click();
	}
	function confirmdel(id){
		deletecomment(id);
		$('[data-toggle="popover"]').popover('hide');
		$('[data-toggle="popover"]').popover(); 
		document.getElementById('delete'+id).click();
	}
	function reset(){
		var data=document.getElementsByClassName('note-editable panel-body');
		data[0].innerHTML='';
		editflag=false;
		document.getElementById('chkconclusion').checked=false;
	}
</script>
</html>