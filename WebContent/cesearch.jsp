<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%--     <%@ include file="../header.jsp" %> --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="css/maintable.css" rel="stylesheet">
<title>CESearch</title>
</head>
<body>
   <div id="viewpopup" style="display:noned"></div>
   <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>
<div class="modal fade" id="exampleModal" tabindex="100" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
<table>
  <tr>
    <td width=49% valign="top">
      <h3><span class = "label label-default"><input type="checkbox" checked/>Search Option Texts</span></h3>
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
               <td valign="center"><h4><input type="checkbox"/ id="chktypesearch">&nbsp;Exact&nbsp;&nbsp;&nbsp;&nbsp;
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 </h4></td>
               
             </tr>
           </table>
         </div>
         <div class = "panel-body">
           <span class = "label label-default">parisa</span>&nbsp;&nbsp;<span class = "label label-default">pariso</span>&nbsp;&nbsp;...<br>
           <span class = "label label-default">paṭisallānā</span>&nbsp;&nbsp;<span class = "label label-default">puriyādinnavaṭṭe</span>
           ........................<br>
           
           ......................
         </div>
      </div>
    </td>
  </tr>
</table>
<table>
	<tr>
		<td><div><h3><span class = "label label-warning">paṭisallānā</span></h3></div></td>
		<td></td>
	</tr>
</table>
<table border=1>
  <tr>
    <td align="center"><b>Text code</b></td> <td align="center"><b>Unit</b></td> <td align="center"><b>Line</b></td>
    <td align="center"><b>Comment</b></td> <td align="center"><b>Footnote</b></td>  <td align="center"><b>Detail</b></td>
  </tr>
  <tr>
    <td align="center">DN02</td><td align="center">1</td><td align="center">1</td>
    <td align="center">
      ................................................................................................<br>
      ...............................................................................................<br>
      ................................................................................................<br>
    </td>
    <td align="center">
      ................................................................................................<br>
      ................................................................................................<br>
      ................................................................................................<br>
    </td>
    <td align="center"><span class = "label label-default">Detail</span></td>
  </tr>
  <tr>
    <td align="center">DN02</td><td align="center">1</td><td align="center">1</td>
    <td align="center">
      ................................................................................................<br>
      ...............................................................................................<br>
      ................................................................................................<br>
    </td>
    <td align="center">
      ................................................................................................<br>
      ................................................................................................<br>
      ................................................................................................<br>
    </td>
    <td align="center"><span class = "label label-default">Detail</span></td>
  </tr>
  <tr>
    <td align="center">DN02</td><td align="center">1</td><td align="center">2</td>
    <td align="center">
      ................................................................................................<br>
      ...............................................................................................<br>
      ................................................................................................<br>
    </td>
    <td align="center">
      ................................................................................................<br>
      ................................................................................................<br>
      ................................................................................................<br>
    </td>
    <td align="center"><span class = "label label-default">Detaildfff</span></td>
  </tr>
</table> dfdfdfdfdf
 

<div id="div_table"></div>
<br>
<div class = "panel panel-danger">
   <div class = "panel-heading">
     <table>
       <tr>
         <td width=50%>
           <h3 class = "panel-title">
        	DN02>H3>H4>Unit no.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
           </h3>
         </td>
         <td width=50% align="right">
           <h3 class = "panel-title">
             <button type = "button" class = "btn btn-default"><b>&lt;&lt;</b></button>
              <b>paṭisallānā</b>
              <button type = "button" class = "btn btn-default"><b>&gt;&gt;</b></button>
           </h3>
         </td>
       </tr>
     </table>
   </div>
   <div class = "panel-body">
      This is a Basic panel
   </div>
</div>

</body>
<script  src="js/epcontroller.js?${sessionScope.key}"></script>
<script  src="js/map.js?${sessionScope.key}"></script>
<script  src="js/cesearch.js?${sessionScope.key}"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
</html>