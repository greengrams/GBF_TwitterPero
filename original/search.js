function idInStr(content) {
	var ptrn = new RegExp("ID：[A-Za-z0-9]{8}");
	var pos = content.search(ptrn);
	if (pos != -1) {
		var id = content.substring(pos+3, pos+11);
		return id;	
	}
}

function getID(htmlStr) {
	var el = document.createElement( 'html' );
	el.innerHTML = htmlStr;

	var tagObj = el.getElementsByTagName( 'h2' );
	var fit_list = new Array();
	for (i=0;i<tagObj.length;i++){
		var id = idInStr(tagObj[i].innerHTML);
		if (id){
			fit_list[fit_list.length] = id;
		}
	}
	return fit_list;
}
function playSound(){
	
}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

var scan_id_list = null;
var diff_id_list = new Array();
var audio = new Audio('alert.wav');
var idInAll = false;
function loadDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var htmlStr = this.responseText;
		var fit_list = getID(htmlStr);
		if (fit_list.length != 0){
			var id_str = '';
			var fit_length = 3;
			if (fit_list.length<fit_length){
				fit_length = fit_list.length;
			}
			for (i=0;i<fit_length;i++){
				if (scan_id_list != null){
					var idIn = false;
					for (j=0;j<scan_id_list.length;j++){
						if (i==0){
							id_str = id_str+scan_id_list[j]+'<br>';
						}
						if (fit_list[i]==scan_id_list[j]){
							idIn = true;
						}
					}
					if (!idIn){
						diff_id_list[diff_id_list.length]=fit_list[i];
						idInAll = true;
					}
				}
			}
			document.getElementById("scan_list").innerHTML = id_str;
			
			var diff_id_str = '';
			if (idInAll){			
				for (i=0;i<diff_id_list.length;i++){
					// copyToClipboard(diff_id_list[i]);
					diff_id_str = diff_id_str+'<input id="post-shortlink'+i+'" value="'+diff_id_list[i]+'">'+'<button class="button" data-clipboard-action="cut" id="copy-button'+i+'" data-clipboard-target="#post-shortlink'+i+'">Cut</button><br>';
				
					// rm btn click
					$('#copy-button'+i).unbind( "click" );
					// copy to Clipboard btn
					var clipboard = new Clipboard('#copy-button'+i);
					clipboard.on('success', function(e) {
						var btn_id = e.trigger.id;
						var str_index = btn_id.slice(-1);
						var rm_ind = parseInt(str_index);
						if(!isNaN(rm_ind)) {
							diff_id_list.splice(rm_ind, 1);
							console.log('rm '+rm_ind);
						}
						e.clearSelection();
					});
				}
				// play sound
				//audio.play();
				idInAll = false;
				document.getElementById("diff_list").innerHTML = diff_id_str;
			}
			
			scan_id_list = fit_list;
		}
	}
	};
	
	//暗終招
	//xhttp.open("GET", "http://realtime.search.yahoo.co.jp/search;_ylt=A2RCAwm2BoJYUD8Axydol_p7?p=Lv100+%E3%82%AA%E3%83%AA%E3%83%B4%E3%82%A3%E3%82%A8&ei=UTF-8", true);
	//光終招
	//xhttp.open("GET", "http://realtime.search.yahoo.co.jp/search;_ylt=A2RCD09W.4FYHTYAwTNol_p7?p=Lv100+%E3%82%A2%E3%83%9D%E3%83%AD%E3%83%B3&ei=UTF-8", true);
	//火終招
	//xhttp.open("GET", "http://realtime.search.yahoo.co.jp/search;_ylt=A2RimU.VVYBYrz4AeEFol_p7?p=Lv100+%E3%83%95%E3%83%A9%E3%83%A0%EF%BC%9D%E3%82%B0%E3%83%A9%E3%82%B9&ei=UTF-8", true);
	//丁
	xhttp.open("GET", "http://realtime.search.yahoo.co.jp/search;_ylt=A2RCAwU0Ln9YakoAkEpnl_p7?p=Lv100+%E3%82%B0%E3%83%A9%E3%83%B3%E3%83%87&ei=UTF-8", true);
	//巴哈
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search?p=Lv100+%E3%83%97%E3%83%AD%E3%83%88%E3%83%90%E3%83%8F%E3%83%A0%E3%83%BC%E3%83%88&ei=UTF-8", true);
	//古戰肉(26回)
	//xhttp.open("GET", "http://realtime.search.yahoo.co.jp/search;_ylt=A2RCKwmwX4hYOCsAvwFol_p7?p=Lv75+%E3%83%86%E3%82%A3%E3%83%A9%E3%83%8E%E3%82%B9&ei=UTF-8", true);
	//神立 活動王
	//xhttp.open("GET", "http://realtime.search.yahoo.co.jp/search;_ylt=A2RCKwmM75NY_wUABjZol_p7?p=Lv50+%E3%82%AD%E3%83%9E%E3%82%A4%E3%83%A9%E3%83%BB%E3%83%A6%E3%83%AA%E3%82%A6%E3%82%B9&ei=UTF-8", true);
	//光方陣EX
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2RCAwXQIGJZPQkAfj1ol_p7?p=Lv75+%E3%82%B7%E3%83%A5%E3%83%B4%E3%82%A1%E3%83%AA%E3%82%A8&ei=UTF-8");
	//光方陣HL
	//xhttp.open("GET", "http://realtime.search.yahoo.co.jp/search;_ylt=A2RCAwrDLJRY3WMAtBlol_p7?p=Lv100+%E3%82%B7%E3%83%A5%E3%83%B4%E3%82%A1%E3%83%AA%E3%82%A8&ei=UTF-8", true);
	//光活動路西法
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2RCL6tBB7xY6wgA9itol_p7?p=Lv50+%E3%82%B5%E3%83%B3%E3%83%80%E3%83%AB%E3%83%95%E3%82%A9%E3%83%B3&ei=UTF-8", true);
	//巴哈HL
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2RiouJzoM5YpWMA9QFol_p7?p=Lv150+%E3%83%97%E3%83%AD%E3%83%88%E3%83%90%E3%83%8F%E3%83%A0%E3%83%BC%E3%83%88&ei=UTF-8", true);
	//BBA HL
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2Rivb_HPeNYiysAwT5ol_p7?p=Lv110+%E3%83%AD%E3%83%BC%E3%82%BA%E3%82%AF%E3%82%A4%E3%83%BC%E3%83%B3&ei=UTF-8", true);
	//土 HL
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2RimE2Rg2BZ0hoA5SZol_p7?p=lv100+%E3%83%A6%E3%82%B0%E3%83%89%E3%83%A9%E3%82%B7%E3%83%AB&ei=UTF-8", true);
	//水HL
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2Rivb7eBJhZvyMAckJnl_p7?p=Lv100+%E3%83%AA%E3%83%B4%E3%82%A1%E3%82%A4%E3%82%A2%E3%82%B5%E3%83%B3&ei=UTF-8", true);
	//風HL
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2Rivc0AJqRZH2MArhlol_p7?p=Lv100+%E3%83%86%E3%82%A3%E3%82%A2%E3%83%9E%E3%83%88+%E3%83%9E%E3%82%B0%E3%83%8A&ei=UTF-8", true);
	//風天司
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2RCKwnKzmxZenEAQC9ol_p7?p=Lv100+%E3%83%A9%E3%83%95%E3%82%A1%E3%82%A8%E3%83%AB&ei=UTF-8", true);
	//土天司
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2RCAwPQO4NZSBUAvSVnl_p7?p=Lv100+%E3%82%A6%E3%83%AA%E3%82%A8%E3%83%AB&ei=UTF-8", true);
	//水天司
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2RCA9yiYIxZUlgAWSVol_p7?p=Lv100+%E3%82%AC%E3%83%96%E3%83%AA%E3%82%A8%E3%83%AB&ei=UTF-8", true);
	//黃龍
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2RCCzLUhnhZ1ikAXBRol_p7?p=Lv100+%E9%BB%84%E9%BE%8D&ei=UTF-8", true);
	//水神威
	//xhttp.open("GET", "https://search.yahoo.co.jp/realtime/search;_ylt=A2RCL6llooBZzj4AtB9nl_p7?p=Lv100+%E3%83%9E%E3%82%AD%E3%83%A5%E3%83%A9+%E3%83%9E%E3%83%AA%E3%82%A6%E3%82%B9&ei=UTF-8", true);
	//雅典娜
	//xhttp.open("GET","https://search.yahoo.co.jp/realtime/search;_ylt=A2Riol34EcZZO0cAzBNol_p7?p=Lv100+%E3%82%A2%E3%83%86%E3%83%8A&ei=UTF-8", true);
	
	
	xhttp.send();
	setTimeout("loadDoc()", 3000);
	var d = new Date(); 
	if (document.getElementById("show_scan_time")){
		document.getElementById("show_scan_time").innerHTML = 'last scan:'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	}
}

loadDoc();