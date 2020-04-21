function searchFootnote(idh,unit,callback){
	try{
		$.ajax({
			url: baseUrl+"/History",
			data: 'act=searchFootnote&idh='+idh+'&idunit='+unit,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(footnoteHistory) {
				setTimeout(function() { callback(footnoteHistory); }, 1);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('searchFootnote '+e.message);
	}
}

function searchEmendation(idh,unit,callback){
	try{
		$.ajax({
			url: baseUrl+"/History",
			data: 'act=searchEmendation&idh='+idh+'&idunit='+unit,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(emendationHistory) {
				setTimeout(function() { callback(emendationHistory); }, 1);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('emendationHistory '+e.message);
	}
}


function searchComment(idh,unit,callback){
	try{
		$.ajax({
			url: baseUrl+"/History",
			data: 'act=searchComment&idh='+idh+'&idunit='+unit,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(commentHistory) {
				setTimeout(function() { callback(commentHistory); }, 1);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('searchComment '+e.message);
	}
}

function searchUnit(idh,unit,callback){
	try{
		$.ajax({
			url: baseUrl+"/History",
			data: 'act=searchUnit&idh='+idh+'&idunit='+unit,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(unitHistory) {
				callback(unitHistory);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('searchUnit '+e.message);
	}
}