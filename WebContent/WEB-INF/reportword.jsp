<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../new_header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/treemenu.css"/>
<title>Report Word</title>
</head>
<body>
<div id="overlay" style="display: none"><span>Please wait...</span></div>  
<table width="100%" border="0">
	<tr>
		<td width="20%" valign="top">
			<ul class="tree">
			  <li>
				<input type="checkbox" id="c1" />
				<label class="tree_label" for="c1">History</label>
				<ul>
				  <li>
					<input type="checkbox" checked="checked" id="c2" />
					<label class="tree_label"><span class="tree_custom"><a name="t_menu" id="editing">Editing</a></span></label>
				  </li>
				  <li>
						  <input type="checkbox" checked="checked" id="c3" />
						<label class="tree_label"><span class="tree_custom"><a name="t_menu" id="revise">Revise</a></span></label>
				  </li>
				</ul>
			  </li>
			  
			  <li>
				<input type="checkbox" id="c4" />
				<label class="tree_label" for="c4">Word List</label>
				<ul>
				  <li>
					<input type="checkbox" checked="checked" id="c5" />
					<label class="tree_label"><span class="tree_custom"><a name="t_menu" id="undecided_all_of_word">All Record of Undecided Word</a></span></label>
				  </li>
				   <li>
						  <input type="checkbox" checked="checked" id="c9" />
						<label class="tree_label"><span class="tree_custom"><a name="t_menu" id="undecided_word">Undecided Word</a></span></label>
				  </li>	  	
				  <li>
						  <input type="checkbox" checked="checked" id="c6" />
						<label class="tree_label"><span class="tree_custom"><a name="t_menu" id="emendation">Emendation</a></span></label>
				  </li>
				  <li>
						 <input type="checkbox" checked="checked" id="c7" />
						<label class="tree_label"><span class="tree_custom"><a name="t_menu" id="interesting">Interesting</a></span></label>
				  </li>	 
				  <li>
						  <input type="checkbox" checked="checked" id="c8" />
						<label class="tree_label"><span class="tree_custom"><a name="t_menu" id="footnote_comment">Footnote + Comment</a></span></label>
				  </li>	  
				 			  
				</ul>
			  </li>
			</ul>		
		</td>
		<td width="80%" valign="top">
			<table border="0" width="100%">
				<tr>
					<td style="width: 25%"><div id="series"></div></td><td style="width: 25%"><div id="basetext"></div></td>
					<td style="width: 25%"><div id="sutta"></div></td><td style="width: 25%"><div id="section"></div></td>
				</tr>
				<tr>
					<td style="width: 50%" colspan="2"><div id="unit"></div><div align="right" id="btnexport_unit"></div></td>
<!-- 					<td style="width: 25%"></td> -->
					<td style="width: 25%" valign="top"><div align="right" id="btnexport_sutta"></div></td>
					<td style="width: 25%" valign="top"><div align="right" id="btnexport_section"></div></td>
				</tr>
				<tr>
					<td style="width: 25%"><div id="heading"></div></td><td style="width: 25%"><div id="subheading1"></div></td>
					<td style="width: 25%"><div id="subheading2"></div></td><td style="width: 25%"></td>
				</tr>								
			</table>
		</td>
	</tr>
</table>
</body>
<script src="js/reportword.js"></script>
</html>