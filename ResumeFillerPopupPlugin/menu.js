// gets the tab to autofill on
function Main(){
	var query = { active: true, lastFocusedWindow: true };
	chrome.tabs.query(query, callback);
}

// runs content.js script on correct tab
function callback(tabs) {
	var currentTab = tabs[0];
	chrome.scripting.executeScript({
		target: {tabId: currentTab.id},
    		files: ['content.js']
  	});
}

//pulls up place to enter information
function updateInfo() {
	window.location.href="update.html";
}

window.onload = function() {
	chrome.storage.local.get("updatedInfo", (result) => {
		if (result["updatedInfo"] == "hi") {
			document.getElementById("banner").style.display = "initial";
			setTimeout(hideBanner, 3000);
		}
	});
	chrome.storage.local.set({["updatedInfo"]: "bye"}, () => {});
}

function hideBanner() {
	document.getElementById("banner").style.display = "none";
}

document.getElementById("autofill").addEventListener("click", Main);
document.getElementById("update").addEventListener("click", updateInfo);