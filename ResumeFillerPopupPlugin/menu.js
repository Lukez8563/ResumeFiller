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

function updateInfo() {
	window.location.href="update.html";
}

document.getElementById("autofill").addEventListener("click", Main);
document.getElementById("update").addEventListener("click", updateInfo);