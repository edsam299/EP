function findWord(word,divname){	
	word=word.trim();
	$('#'+divname).removeHighlight();	
	$('#'+divname).removeHighlightSearch();
	if(word!=''){
	    var strarray=word.split(" ");
		void($('#'+divname).removeHighlight().highlight(strarray)); //pass string array to function
	}
//	if(word.length>0){
//		
//		console.log(word+' '+divname);
//		var str=word.split(/\s+/);
//		console.log('str '+str.length);
//		for(var i=0;i<str.length;i++){
//			find(str[i],divname);
//		}
//	}else
//		find('--------------------------',divname);
}
function replace_word(content,word,wordreplace,divname) {
	 word=word.trim();
	 var replaced = "";
	 //console.log(content.indexOf(word));
	 //console.log(content.substr(content.indexOf(word)-11,9));
	 
	var re = new RegExp("<\s*span[^>]*>(.*?)<\s*/\s*span>", "g");
	var myArray = content.match(re);
	if(myArray==null) return;
console.log('myArray\n'+myArray);
	if ( myArray != null) {
		for (var i = 0; i < myArray.length; i++ ) { 
			console.log('eeeeeeeee\n'+i+' '+myArray);
		}
	}
	
	 if (wordreplace.length > 0) {
			console.log('eee');					
		  replaced = content.replace(word, wordreplace);	
			replaced = replaced.replace('<span class="highlight">'+wordreplace+'</span>','<span class="highlightSearch">'+wordreplace+'</span>');				  
		  console.log(replaced.substr(replaced.indexOf(word)-11,9));

		  
		  //replaced=content.replace(replaced.substr(replaced.indexOf(word)-11,9),"highlight1");
	 }
	 else {
		  //var boldText = "<div style=\"background-color: yellow; display: inline; font-weight: bold;\">" + word + "</div>";
		  //replaced = content.replace(match, word); //replace all
		  console.log('e+++++++++++++++++++++++++++++++d');
		   //replaced=replaced.replace(word,wordreplace); //replace à¸—à¸µà¸¥à¸°à¸•à¸±à¸§
		  //alert(content.search('test'));
	 }
	 //replaced=replaced.replace('ff','EEEEE'); replace à¸—à¸µà¸¥à¸°à¸•à¸±à¸§
	 
	 document.getElementById(divname).innerHTML = replaced;
	 
}		

function replaceAll(content,word,replacement,divname) {
	word=word.trim();
	 var match = new RegExp(word, "g");
	 var replaced = "";
	 if (replacement.length > 0) {
			var re = new RegExp("<\s*span[^>]*>(.*?)<\s*/\s*span>", "g");
			var myArray = content.match(re);
			if(myArray==null) return;
			if ( myArray != null) {
				for (var i = 0; i < myArray.length; i++ ) { 
					console.log('myArray '+myArray[i]);
					replaced = content.replace('<span class="highlight">'+word+'</span>','<span class="highlightSearch">'+replacement+'</span>');
					content=replaced;
				}
				myArray=null;
			}	
	 }
	 else {
		  //var boldText = "<div style=\"background-color: yellow; display: inline; font-weight: bold;\">" + word + "</div>";
		  console.log('<<<<<<<<<<<<<<<<<<<<<<');
		  replaced = content.replace(match, word); //replace all				  
		  //alert(content.search('test'));
	 }
	 document.getElementById(divname).innerHTML = replaced;
	 
	 //var xx='http://www.randomsnippets.com/2008/03/07/how-to-find-and-replace-text-dynamically-via-javascript/';
}	
//function find(word,divname){$("#"+divname).highlight(word);}

function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    if (typeof window.getSelection != "undefined") {
        var range = window.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
    } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
        var textRange = document.selection.createRange();
        var preCaretTextRange = document.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function showCaretPos(elementname,displayposition) {
    var el = document.getElementById(elementname);
    var caretPosEl = document.getElementById(displayposition);
    caretPosEl.innerHTML = getCaretCharacterOffsetWithin(el);
//    caretPosEl.innerHTML = "Caret position: " + getCaretCharacterOffsetWithin(el);
}

function pasteHtmlAtCaret(html, selectPastedContent) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
//		console.log('sel: '+sel+' '+sel.rangeCount);
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }			
            var firstNode = frag.firstChild;			
            range.insertNode(frag);

            // Preserve the selection
          
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                if (selectPastedContent) {
                    range.setStartBefore(firstNode);
                } else {
                    range.collapse(true);
                }
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        // IE < 9
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
            range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select();
        }
    }
}
