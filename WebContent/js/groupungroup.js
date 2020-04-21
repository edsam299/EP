function GroupService(){
	/**
	 * 
	 * @returns test
	 *
	 */
	this.checkSingleWord = function(fcrid,callback){
		var datas={'fcrid':fcrid};
		try{
			$.ajax({
				url: baseUrl+"/GroupUngroup",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				headers: {
	                "act":"checkSingleOrGroupWord"
	            },
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
				success: function(sucess) {
					callback(sucess);
			}, 
				error: function(data) {
					if (data.responseText != null && data.responseText != "") {
						alert(data.responseText);
					}
				}
			});
		}catch(e){
			alert('checkSingleWord: '+e.message);
		}finally{
			datas=null; strArray=null;
		}
	};
	
	this.checkContinueId = function(fcrid,callback){
		var datas={'fcrid':fcrid};
		try{
			$.ajax({
				url: baseUrl+"/GroupUngroup",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				headers: {
	                "act":"checkContinueId"
	            },
				async : true,
				cache: false,
				contentType : "text/plan;charset=utf-8",
				success: function(sucess) {
					callback(sucess);
			}, 
				error: function(data) {
					if (data.responseText != null && data.responseText != "") {
						alert(data.responseText);
					}
				}
			});
		}catch(e){
			alert('checkContinueId: '+e.message);
		}finally{
			datas=null; strArray=null;
		}
	};

	this.groupungroup = function(fcrid,iduser,status,flag,callback){
		var datas={'fcrid':fcrid,'iduser':iduser,'status':status,'flag':flag};
		try{
			$.ajax({
				url: baseUrl+"/GroupUngroup",
				data: JSON.stringify(datas),
				dataType : "json",
				type : "POST",
				headers: {
	                "act":"groupungroup"
	            },
				async : true,
				cache: false,
				contentType : "application/json;charset=utf-8",
				success: function(sucess) {
					callback(sucess);
			}, 
				error: function(data) {
					if (data.responseText != null && data.responseText != "") {
						alert(data.responseText);
					}
				}
			});
		}catch(e){
			alert('groupungroup: '+e.message);
		}finally{
			
		}
	};
};
