function Map() {
	this.keys = new Array();
	this.data = new Object();

	this.put = function (key, value) {
		if (this.data[key] == null) {
			this.keys.push(key);
		}
		this.data[key] = value;
	};

	this.get = function (key) {
		return this.data[key];
	};

	this.remove = function (key) {
		this.keys.remove(key);
		this.data[key] = null;
	};

	this.each = function (fn) {
		if (typeof fn != 'function') {
			return;
		}
		var len = this.keys.length;
		for (var i = 0; i < len; i++) {
			var k = this.keys[i];
			fn(k, this.data[k], i);
		}
	};

	this.entrys = function () {
		var len = this.keys.length;
		var entrys = new Array(len);
		for (var i = 0; i < len; i++) {
			entrys[i] = {
				key: this.keys[i],
				value: this.data[i]
			};
		}
		return entrys;
	};

	this.isEmpty = function () {
		return this.keys.length == 0;
	};

	this.size = function () {
		return this.keys.length;
	};
}
 var map = new Map();
 map.put("\u0061", "01");//a
 map.put("\u0101", "02");//a long
 map.put("\u0069", "03");//i
 map.put("\u012B", "04");//i long
 map.put("\u0075","05");//u
 map.put("\u016B","06");//u long
 map.put("\u0065","07");//e
 map.put("\u006F","08");//o
 map.put("\u1E43","09");//romanAlpha.add("ṃ");//อัง
 map.put("\u006B", "10");//romanAlpha.add("k");//ก
 map.put("\u006B\u0068", "11");//romanAlpha.add("kh");//ข 0
 map.put("\u0067", "12");//romanAlpha.add("g");//ค
 map.put("\u0067\u0068", "13");//romanAlpha.add("gh");//ฆ
 map.put("\u1E45","14");//romanAlpha.add("ṅ");//ง
 map.put("\u0063", "15");//romanAlpha.add("c");//จ
 map.put("\u0063\u0068", "16");//romanAlpha.add("ch");//ฉ
 map.put("\u006A", "17");//romanAlpha.add("j");//ช
 map.put("\u006A\u0068", "18");//romanAlpha.add("jh");//ฌ
 map.put("\u00F1", "19");//romanAlpha.add("ñ");//ญ
 map.put("\u1E6D", "20");//romanAlpha.add("ṭ");//ฏ
 map.put("\u1E6D\u0068", "21");//romanAlpha.add("ṭh");//ฐ
 map.put("\u1E0D", "22");//romanAlpha.add("ḍ");//ฑ
 map.put("\u1E0D\u0068", "23");//romanAlpha.add("ḍh");//ฒ
 map.put("\u1E47", "24");//romanAlpha.add("ṇ");//ณ
 map.put("\u0074", "25");//romanAlpha.add("t");//ต
 map.put("\u0074\u0068", "26");//romanAlpha.add("th");//ถ
 map.put("\u0064", "27");//romanAlpha.add("d");//ท
 map.put("\u0064\u0068", "28");//romanAlpha.add("dh");//ธ
 map.put("\u006E", "29");//romanAlpha.add("n");// น
 map.put("\u0070","30");//romanAlpha.add("p");//ป
 map.put("\u0070\u0068", "31");//romanAlpha.add("ph");//ผ
 map.put("\u0062", "32");//romanAlpha.add("b");//พ
 map.put("\u0062\u0068", "33");// romanAlpha.add("bh");//ภ
 map.put("\u006D", "34");//romanAlpha.add("m");//ม
 map.put("\u0079", "35");//romanAlpha.add("y");//ย
 map.put("\u0072", "36");//romanAlpha.add("r");//ร
 map.put("\u006C", "37");//romanAlpha.add("l");//ล
 map.put("\u0076","38");//romanAlpha.add("v");//ว
 map.put("\u0073", "39");//romanAlpha.add("s");//ส
 map.put("\u0068", "40");//romanAlpha.add("h");//ห
 map.put("\u1E37", "31");//romanAlpha.add("ḷ");//ฬ
map.put("^", "");//romanAlpha.add("ḷ");//^
map.put(" ", "");//romanAlpha.add("ḷ");//^