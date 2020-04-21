<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../new_header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="css/maintable.css" rel="stylesheet">
<link rel="stylesheet" href="fastselect-master/dist/fastselect.min.css">
<link rel="stylesheet" type="text/css" href="css/border/border.css">
<!-- <link rel="stylesheet" type="text/css" href="dhtmlxmsg/codebase/themes/message_default.css"> -->
<link href="css/custom.css" rel="stylesheet">
<!-- <link rel="stylesheet" type="text/css" href="css/modal.css"/> -->
<style type="text/css">
.close {
    color: red; 
    opacity: 1;
}
.modal-body {
    max-height: calc(100vh - 130px);
    overflow-y: auto;
}
.modal-open {
    overflow: hidden;
    overflow-y: scroll;
    padding-right: 0 !important;
}
	p:hover {
	 cursor:pointer;
	}
	td:hover{
		cursor:pointer;
	}
		.csscomment{
	    width: 100%;
    	height: 200px;
    	overflow: auto;
    	font-family: "Open Sans";
    	font-size: 22px;
	}
	
.myDiv {
  text-align: left;
}

.myDiv h1 {
  display: inline-block;
/*   font-family: 'Gabriela', serif; */
  color: #FFF;
  font-size: 1em;
/*   border-radius: 20px; */
  background: rgba(43, 166, 203, 0.5 /* alpha value for background */);
/*   padding: 0.5em 0.2em 0.8em 0.5em; */
}

.fstMultipleMode .fstControls {
    box-sizing: border-box;
    padding: 0.5em 0.5em 0em 0.5em;
    overflow: hidden;
    min-width: 500px;
    max-width: 100%;
    min-height: 35px;
    height: auto;
    cursor: text;
}	
.highlight{background-color:#4CC552}
  
</style>
</head>
<body>
<div id="divcomment" style="display: none"></div>
<div id="overlay" style="display: none"><span>Please wait...</span></div>  
<table>
  <tr>
    <td width=49% valign="top">
      <h3><span class = "label label-default">Search Option Texts</span></h3>
      <div id="choice"></div>
    </td>
    <td width=2%>&nbsp;&nbsp;
    </td>
    <td width=49% >
    	<div class = "panel panel-default"> 
          <div class = "panel-heading">
            <table>
             <tr>
               <td valign="center"><input type = "text" id="t_search" class = "form-control" placeholder = "Enter your searching word"></td>
               <td valign="center"><button type = "button" id="b_search" class = "btn btn-primary">Search</button></td>
               <td valign="center"><h4><input type="checkbox" id="chktypesearch_exact">&nbsp;Exact&nbsp;&nbsp;
                  <input type="checkbox" id="chktypesearch_conclusion">&nbsp;Only Conclusion&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 </h4></td>              
             </tr>
           </table>
         </div>
      </div>
    </td>
  </tr>
</table>
<table>
	<tr>
		<td valign="bottom"><div><h3><span id="word_click_view" class = "label label-warning"></span></h3></div></td>
		<td valign="bottom"><div id="btnview"></div></td>
	</tr>
</table>
<div id="display_detail"></div>
<br>
<div id="display_variant"></div>
<div id="viewpopup" style="display:none"></div>
<div id="reason" style="display:none;"></div>
<!-- <div class = "panel panel-danger"> -->
<!--    <div id="viewpopup" style="display:none"></div> -->
<!--    <div id="viewdetail" style="display:nones"> -->
<!--    	<table style="width:100%" border="0"> -->
<!--    		<tr> -->
<!--    			<td> -->
<!--    				<div class = "panel panel-danger"> -->
<!--    					<div class = "panel-heading">	 -->
<!--    						<div id="header_detail"></div> -->
<!--    					</div> -->
<!--    				</div> -->
<!--    			</td> -->
<!--    			<td> -->
<!--    			   	<div class = "panel panel-danger"> -->
<!--    					<div class = "panel-heading">	 -->
<!--    						<div id="div_word_content"></div> -->
<!--    					</div> -->
<!--    				</div>	 -->
<!--    			</td> -->
<!--    		</tr> -->
<!--    		<tr> -->
<!--    			<td width="70%"><div id="word" style="overflow: scroll; width:auto; height: 190px;" class="border-line"></div></td> -->
<!--    			<td valign="top"><div id="view_picture"></div></td> -->
<!--    		</tr>   		 -->
<!--    		<tr> -->
<!--    			<td colspan="2"> -->
<!--    				<div id="variant">variant</div> -->
<!--    			</td> -->
<!--    		</tr> -->
<!--    		<tr> -->
<!--    			<td colspan="2"> -->
<!--    				<div class="panel panel-default"> -->
<!--    					<div class="panel-body"> -->
<!--    						<div id="footnote" class="csscomment" style="height: auto;">footnote</div> -->
<!--    					</div> 					 -->
<!--    				</div> -->
<!--    			</td> -->
<!--    		</tr>    -->
<!--    		<tr> -->
<!--    			<td> -->
<!--    				<div class="panel panel-default"> -->
<!--    					<div class="panel-body"> -->
<!--    						<div id="comment" class="csscomment" style="height: 200px;">comment</div> -->
<!--    					</div> 					 -->
<!--    				</div> -->
<!--    			</td> -->
<!--    		</tr>      				 -->
<!--    	</table> -->
<!--    </div> -->
<!-- </div> -->
</body>
<script>
var baseUrl = "${pageContext.request.contextPath}";
var _iduser='${sessionScope.iduser}';
</script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/common.js?${sessionScope.key}"></script>
<script  src="js/epcontroller.js?${sessionScope.key}"></script>
<script  src="js/map.js?${sessionScope.key}"></script>
<!-- <script type="text/javascript" src="js/jquery.highlight-4.closure.js"></script>  -->
<!-- <script type="text/javascript" src="dhtmlxmsg/codebase/message.js"></script>  -->
<script  src="js/cesearch.js?${sessionScope.key}"></script>
</html>