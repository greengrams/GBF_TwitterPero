var start_check_obj=null;
var check_status;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	var obj = JSON.parse(message);
    if(obj.checkST != null){
		if(obj.checkST=="0"){
			check_status=false;
		}else if(obj.checkST=="1"){
			check_status=true;
		}else if(obj.checkST=="-1"){
			var jsonobj;
			if(check_status){
				jsonobj = {"checkST":"1"};
			}else{
				jsonobj = {"checkST":"0"};
			}
			chrome.runtime.sendMessage(JSON.stringify(jsonobj));
		}
	}else if(obj.lastscantime != null){
		document.getElementById("show_scan_time").innerHTML = obj.lastscantime;
	}else if(obj.diffList != null){
		document.getElementById("diff_list").innerHTML = obj.diffList;
	}else if(obj.scanList != null){
		document.getElementById("scan_list").innerHTML = obj.scanList;
	}
	//check the checkbox of input
	start_check_obj.checked=check_status;
});

var toggleCheckbox = function()
{
	if(check_status){
		chrome.browserAction.setIcon({path: "off.png"});
		
		var jsonobj = {"checkST":"0"};
		chrome.runtime.sendMessage(JSON.stringify(jsonobj));
		jsonobj = {"checkST":"-1"};
		chrome.runtime.sendMessage(JSON.stringify(jsonobj));
	}else{
		chrome.browserAction.setIcon({path: "on.png"});
		
		var jsonobj = {"checkST":"1"};
		chrome.runtime.sendMessage(JSON.stringify(jsonobj));
		jsonobj = {"checkST":"-1"};
		chrome.runtime.sendMessage(JSON.stringify(jsonobj));
	}
}

function initialize()
{
	if(start_check_obj == null){
		start_check_obj = document.getElementById("start_check");
	}
	start_check_obj.addEventListener("click",toggleCheckbox);
	//updata check_status
	var jsonobj = {"checkST":"-1"};
	chrome.runtime.sendMessage(JSON.stringify(jsonobj));
}

document.addEventListener('DOMContentLoaded', initialize);