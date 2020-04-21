function showFootnote(fcrid,iduser,idpage,callback){
	try{
		$.ajax({
			url: baseUrl+"/Footnote",
			data: 'act=showFootnote&fcrid='+fcrid+'&iduser='+iduser+'&idpage='+idpage,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(footnote) {
				setTimeout(function() { callback(footnote); }, 1);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('showFootnote '+e.message);
	}
}

function searchFootnoteByFcrid(fcrid, iduser, idpage,callback){
	try{
		$.ajax({
			url: baseUrl+"/Footnote",
			data: 'act=searchFootnoteByFcrid&fcrid='+fcrid+'&iduser='+iduser+'&idpage='+idpage,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(footnote) {
				setTimeout(function() { callback(footnote); }, 1);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('searchFootnoteByFcrid '+e.message);
	}
}

function deleteFootnote(fcrid,iduser,idpage,callback){
	try{
		$.ajax({
			url: baseUrl+"/Footnote",
			data: 'act=deleteFootnote&fcrid='+fcrid+'&iduser='+iduser+'&idpage='+idpage,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(success) {
				setTimeout(function() { callback(success); }, 1);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('deleteFootnote '+e.message);
	}
}

function favorites(fcrid,iduser,idpage,callback){
	try{
		$.ajax({
			url: baseUrl+"/Footnote",
			data: 'act=favorites&fcrid='+fcrid+'&iduser='+iduser+'&idpage='+idpage,
			dataType: "json",
			type: "GET",
			async: true,
			cache: false,
			contentType: "application/json",
			success: function(success) {
				setTimeout(function() { callback(success); }, 1);
			}, 
			error: function(data) {
				if (data.responseText != null && data.responseText != "") {
					alert(data.responseText);
				}
			}
		});
	}catch(e){
		alert('deleteFootnote '+e.message);
	}
}