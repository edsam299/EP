/**
 * 
 */
function UkitUtil(){
	try{
		/**
		 * สร้าง DHTMLX Grid
		 * @returns dhtmlXGridObject
		 *
		 */
		this.createDhtmlxGrid=function(gridName){
			return new dhtmlXGridObject(gridName);
		};
		/**
		 * สร้างปฎิทิน
		 */
		this.getCalendar=function(objectId,skin,language){
			var myCalendar = new dhtmlXCalendarObject([objectId]);
			myCalendar.setSkin(skin);
			myCalendar.loadUserLanguage(language);
			myCalendar.setDateFormat("%d/%m/%Y");
			myCalendar=null;
		};
		/**
		 * ดึงวันที่ปัจจุบัน 
		 * @param
		 * type=th
		 * type=default
		 * @returns
		 * วัน/เดือน/ปี พ.ศ. ถ้า Parameter = th
		 * วัน/เดือน/ปี ค.ศ. ถ้า Parameter != th
		 */
		this.getCurrentDate=function(type){
			var today =  new Date();	
			var month=parseInt(today.getMonth()+1).toString().length==1?"0"+parseInt(today.getMonth()+1):parseInt(today.getMonth()+1);
			var day=today.getDate().toString().length==1?"0"+today.getDate():today.getDate();
			var fullyear=null;
			if(type=='th')
				fullyear=parseInt(today.getFullYear()+543);
			else
				fullyear=today.getFullYear();
			return day+"/"+month+"/"+fullyear;
		};
		/**
		 * เปลี่ยนค่าวันที่จาก  dd/mm/yyyy To yyyy/mm/dd
		 */
		this.convertDateFromThaiFormat=function(date){
			return parseInt(date.substring(6, 10))-parseInt(543)+'/'+date.substring(3, 5)+'/'+date.substring(0, 2);
		};
		
		/**
		 *  เปลี่ยนค่าวันที่จาก  dd/mm/yyyy ค.ศ. To yyyy/mm/dd พ.ศ.
		 */
		this.convertDateFromUsToThai=function(date){
//			alert(parseInt(date.substring(6, 10))+parseInt(543));
			var year=parseInt(date.substring(6, 10))+parseInt(543);
			return  date.substring(0, 2)+'/'+date.substring(3, 5)+'/'+year;
		};
		/**
		 * ใช้หาวันที่ล่วงหน้าหรือย้อนหลัง 
		 * @param
		 * mdate = 01/08/2013
		 * days = 2
		 * @returns
		 * 03/08/2013
		 */
		this.addOrSubtractDates=function(mdate,days){
			var today = new Date(mdate);
			var nextDay = new Date();
			nextDay.setDate(today.getDate()+days);
			return this.formatDateDDMMYYYY(nextDay);
		};
		/**
		 * ใช้เปลี่ยน Format วันที่เช่น 
		 * @param
		 * date=9/8/2013
		 * @returns
		 * 09/08/2013
		 */
		this.formatDateDDMMYYYY=function(date){
			var month=parseInt(date.getMonth()+1).toString().length==1?"0"+parseInt(date.getMonth()+1):parseInt(date.getMonth()+1);
			var day=date.getDate().toString().length==1?"0"+date.getDate():date.getDate();
			return day+"/"+month+"/"+date.getFullYear();
		};
		/**
		 * ตรวจสอบว่าเป็นตัวเลขหรือไม่
		 * @returns
		 * true or false
		 */
		this.isNumeric=function(input){
			var number = /^\-{0,1}(?:[0-9]+){0,1}(?:\.[0-9]+){0,1}$/i;
			var regex = RegExp(number);
			return regex.test(input) && input.length>0;
		};
		
		this.addCommas=function(nStr){
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		};

		this.removeCommas=function(str) {
		    return(str.replace(/,/g,''));
		};
		
		this.between=function(x,min,max){
			return x >= min && x <= max;
		};
		
		this.replaceAll=function(find, replace, str){
				 return str.replace(new RegExp(find, 'g'), replace);
		};
		
		this.popuup=function(width,height,top,left,fullscreen,page,data,windowsname){
			 var obj=null;
//	   		 params  = 'width='+width;
//			 params += ', height='+height;
//			 params += ', top='+top;
//			 params+=', left='+left;
//			 params += ', fullscreen='+fullscreen;
////			 params+=', toolbars=no,menubar=no,location=no,scrollbars=yes,resizable=yes,status=yes,addressbar=no';
//			    'height='+screen.height,
//			    'width='+screen.width,
//			    alert(params);
			    var params = [
			                  'height='+height,
			                  'width='+width,
			                  'fullscreen='+fullscreen,
			                  'location=yes,resizable=yes,scrollbars=yes,status=yes'// only works in IE, but here for completeness
			              ].join(',');
			 obj=window.open(page+'?rnd='+Math.random(),windowsname, params);
			 obj.moveTo(0,0);
			 obj.dialogArguments = data; 
			 if (window.focus) {obj.focus();}
			 return false;
		};
		
		this.closePopup=function(name){
			var winref = window.open('', name, 'width=0, height=0, left=0, top=0', true);
			winref.blur();
			winref.close();
			winref=null;
		};
		this.getImage=function(filename,finalchecking,file,page,width,height,finaltext) {			
//			alert(filename+' '+finalchecking+' '+file);
//			img=document.getElementById("imgpreview");
//			filename='../manuscripts/TH_05_01_006_00/TH_05_01_006_00_01_005.jpg';
//			img.src=filename;//'manuscripts/TH_05_01_006_00/TH_05_01_006_00_01_005.jpg';
//			$("#finalchecking").html("<b>line&nbsp;&nbsp;170&nbsp;&nbsp;Final&nbsp;Checking&nbsp;By&nbsp;:&nbsp;Ueahanong Pon.&nbsp;Created&nbsp;By&nbsp;:&nbsp;02/03/2012 14:50</b>");
			var obj = new Object();
			obj.imgpath=filename;
			obj.title=file;  
			obj.finalchecking=finalchecking;
			obj.finaltext=finaltext;
			params  = 'width='+width;
			params += ', height='+height;
			params += ', top='+(window.innerHeight-height);
			params+=', left='+(window.innerWidth-width);
//			alert(params);
			var view=window.open(page+'?rnd='+Math.random(),"_blank",params);
			view.dialogArguments = obj;
		};
		
		this.popuppage=function(obj,page,width,height,top,left){
			var params=null;
			params  = 'width='+width;
			params += ', height='+height;
			params += ', top='+top;
			params+=', left='+left;
			var view=window.open(page+'?rnd='+Math.random(),'_blank',params);
			view.dialogArguments = obj;
		};
		
		this.reload=function() {			
			location.reload();
		};
		
		this.close=function() {			
			window.close();
		};
		
		this.setFontSize=function(type,divname,currentsize){
			if(type=='big'){
				currentsize=currentsize+2;
				$("#"+divname).css("fontSize", currentsize);				
			}else{
				currentsize=currentsize-2;
				$("#"+divname).css("fontSize", currentsize);
			}
			return currentsize;
		};
		
		this.ajax = function(url,data,dataType,type, async, cache, contentType, header, callback){
			try{
				$.ajax({
					url: url,
					data: data,
					dataType:dataType,
					type: type,
					async: async,
					cache: cache,
					contentType: contentType,
		            headers: {
		                "param":header
		            },
					success: function(response_data) {
						callback(response_data);
					}, 
					error: function(data) {
						if (data.responseText != null && data.responseText != "") {
							$('#overlay').html('<span>Session Time Out<br></br></span>');
							setTimeout(function(){document.location.reload(true);},5000);
						}
					}
				});
			}catch(e){
				alert(url+' '+e.message);
			}
		};	
		
		this.getMessageUI=function(callback){
			this.ajax(baseUrl+'/service/CommonService','','json','post', true, false, 'application/json','searchAllMessage', function(msgUI){
				callback(msgUI);
			});
		};
		
		this.getMessageById=function(id,msgList, callback){
			var msg=null;
			if(msgList.length>0){
				for(var i=0; i<msgList.length; i++){
					if(id==msgList[i].id){
						msg=msgList[i].message;
						break;
					}
				}
			}
			callback(msg);
		};
		
		this.loading=function(id){
			document.getElementById(id).style.display='';
		};
		this.unloading=function(id){
			document.getElementById(id).style.display='none';
		};

	}catch(e){
		alert(e.message);
	}
}
function HashSet(){
	this._arr = new Array();

	HashSet.prototype.add = function(e) {
	    var arr = this._arr;
	    var i = arr.indexOf(e);
	    if (i == -1) arr.push(e);
	};

	HashSet.prototype.get = function(i) {
	    return this._arr[i];
	};

	HashSet.prototype.size = function(i) {
	    return this._arr.length;
	};

	HashSet.prototype.remove = function(e) {
	    var arr =this._arr;
	    var i = arr.indexOf(e);
	    if (i != -1) arr.splice(i, 1);
	};

	HashSet.prototype.toString = function() {
	    return this._arr.join(',');
	};
}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

