function myFunction(){
	var firstName = document.getElementById('fullname').value;
	chrome.storage.local.set({'fNameKey': firstName}, () => {
        });
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