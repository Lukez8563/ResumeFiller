// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values

//autopopulate the html popup
function autopopulate(){
	keyList = ['fNameKey', 'lNameKey', 'emailKey', 'phoneNumberKey', 'addressOneKey', 'addressTwoKey', 
		'cityKey', 'stateKey', 'countryKey', 'zipcodeKey', 'schoolOneKey', 'degreeOneKey', 'majorOneKey',
		'minorOneKey', 'timeFrameOneStartKey', 'timeFrameOneEndKey', 'schoolTwoKey', 'degreeTwoKey',
		'majorTwoKey', 'minorTwoKey', 'timeFrameTwoStartKey', 'timeFrameTwoEndKey', 'schoolThreeKey', 
		'degreeThreeKey', 'majorThreeKey', 'minorThreeKey', 'timeFrameThreeStartKey', 'timeFrameThreeEndKey',
		'jobOneKey', 'orgOneKey', 'timeFrameJobOneStartKey', 'timeFrameJobOneEndKey', 'jobTwoKey', 'orgTwoKey',
		'timeFrameJobTwoStartKey', 'timeFrameJobTwoEndKey'];

	chrome.storage.local.get(keyList, (result) => {
		keysArray = Object.keys(result);
		valuesArray = Object.values(result);
		for (let i = 0; i < keysArray.length; i++) {
			keysArray[i] = keysArray[i].slice(0, -3);
			console.log(valuesArray[i]);
			if (valuesArray[i] == undefined) {
				valuesArray[i] = "";
			}
			document.getElementById(keysArray[i]).value = valuesArray[i];
		}
	});
}

// updates local variables
function myFunction(){
	keyList = ['fNameKey', 'lNameKey', 'emailKey', 'phoneNumberKey', 'addressOneKey', 'addressTwoKey', 
		'cityKey', 'stateKey', 'countryKey', 'zipcodeKey', 'schoolOneKey', 'degreeOneKey', 'majorOneKey',
		'minorOneKey', 'timeFrameOneStartKey', 'timeFrameOneEndKey', 'schoolTwoKey', 'degreeTwoKey',
		'majorTwoKey', 'minorTwoKey', 'timeFrameTwoStartKey', 'timeFrameTwoEndKey', 'schoolThreeKey', 
		'degreeThreeKey', 'majorThreeKey', 'minorThreeKey', 'timeFrameThreeStartKey', 'timeFrameThreeEndKey',
		'jobOneKey', 'orgOneKey', 'timeFrameJobOneStartKey', 'timeFrameJobOneEndKey', 'jobTwoKey', 'orgTwoKey',
		'timeFrameJobTwoStartKey', 'timeFrameJobTwoEndKey'];

	for (let i = 0; i < keyList.length; i++) {
		var id = keyList[i].slice(0, -3);
		var temp = document.getElementById(id).value
		chrome.storage.local.set({ [ keyList[i] ]: temp}, () => {});
	}

	window.close();
}

document.getElementById("setInfo").addEventListener("click", myFunction);
autopopulate();