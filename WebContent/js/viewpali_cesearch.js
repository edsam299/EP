var param=window.dialogArguments;
console.log(param);
if(param.arr_word!=null){
	document.getElementById('lblkeyword').innerHTML='Search: '+param.keyword;
	if(param.arr_word.length<25){
		for(var i=0; i<param.arr_word.length; i++){
			document.getElementById('col1').innerHTML+='<p>'+param.arr_word[i].word+' ('+param.arr_word[i].word_count+')</p>';
		}
	}else{
		var partial=parseInt(param.arr_word.length / 2);	
		console.log(partial);
		for(var i=0; i<partial; i++){
			document.getElementById('col1').innerHTML+='<p>'+param.arr_word[i].word+' ('+param.arr_word[i].word_count+')</p>';
		}
		for(var i=partial; i<param.arr_word.length; i++){
			document.getElementById('col2').innerHTML+='<p>'+param.arr_word[i].word+' ('+param.arr_word[i].word_count+')</p>';
		}
	}
}