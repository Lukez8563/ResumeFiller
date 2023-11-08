function myFunction(){
	var name = document.getElementById('fullname').value;
	localStorage.setItem("temp", name);
	alert(localStorage.getItem("temp"));
	//localStorage.removeItem("name");
}

function Main(){
	var query = { active: true, lastFocusedWindow: true };
	chrome.tabs.query(query, callback);
}

function callback(tabs) {
	var currentTab = tabs[0];
	chrome.scripting.executeScript({
		target: {tabId: currentTab.id},
    		files: ['content.js']
  	});
}

document.getElementById("myButton").addEventListener("click", myFunction);
document.getElementById("Autofill").addEventListener("click", Main);