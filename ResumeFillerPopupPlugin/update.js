function autopopulate(){
	chrome.storage.local.get(['fNameKey'], (result) => {
               	document.getElementById('fName').value = result.fNameKey;
	});

	chrome.storage.local.get(['lNameKey'], (result) => {
               	document.getElementById('lName').value = result.lNameKey;
	});

	chrome.storage.local.get(['emailKey'], (result) => {
               	document.getElementById('email').value = result.emailKey;
	});

	chrome.storage.local.get(['phoneNumberKey'], (result) => {
               	document.getElementById('phoneNumber').value = result.phoneNumberKey;
	});

	chrome.storage.local.get(['addressOneKey'], (result) => {
               	document.getElementById('addressOne').value = result.addressOneKey;
	});

	chrome.storage.local.get(['addressTwoKey'], (result) => {
               	document.getElementById('addressTwo').value = result.addressTwoKey;
	});

	chrome.storage.local.get(['cityKey'], (result) => {
               	document.getElementById('city').value = result.cityKey;
	});

	chrome.storage.local.get(['stateKey'], (result) => {
               	document.getElementById('state').value = result.stateKey;
	});

	chrome.storage.local.get(['countryKey'], (result) => {
               	document.getElementById('country').value = result.countryKey;
	});

	chrome.storage.local.get(['zipcodeKey'], (result) => {
               	document.getElementById('zipcode').value = result.zipcodeKey;
	});

	chrome.storage.local.get(['schoolOneKey'], (result) => {
               	document.getElementById('schoolOne').value = result.schoolOneKey;
	});

	chrome.storage.local.get(['degreeOneKey'], (result) => {
               	document.getElementById('degreeOne').value = result.degreeOneKey;
	});

	chrome.storage.local.get(['majorOneKey'], (result) => {
               	document.getElementById('majorOne').value = result.majorOneKey;
	});

	chrome.storage.local.get(['minorOneKey'], (result) => {
               	document.getElementById('minorOne').value = result.minorOneKey;
	});

	chrome.storage.local.get(['timeFrameOneStartKey'], (result) => {
               	document.getElementById('timeFrameOneStart').value = result.timeFrameOneStartKey;
	});

	chrome.storage.local.get(['timeFrameOneEndKey'], (result) => {
               	document.getElementById('timeFrameOneEnd').value = result.timeFrameOneEndKey;
	});

	chrome.storage.local.get(['schoolTwoKey'], (result) => {
               	document.getElementById('schoolTwo').value = result.schoolTwoKey;
	});

	chrome.storage.local.get(['degreeTwoKey'], (result) => {
               	document.getElementById('degreeTwo').value = result.degreeTwoKey;
	});

	chrome.storage.local.get(['majorTwoKey'], (result) => {
               	document.getElementById('majorTwo').value = result.majorTwoKey;
	});

	chrome.storage.local.get(['minorTwoKey'], (result) => {
               	document.getElementById('minorTwo').value = result.minorTwoKey;
	});

	chrome.storage.local.get(['timeFrameTwoStartKey'], (result) => {
               	document.getElementById('timeFrameTwoStart').value = result.timeFrameTwoStartKey;
	});

	chrome.storage.local.get(['timeFrameTwoEndKey'], (result) => {
               	document.getElementById('timeFrameTwoEnd').value = result.timeFrameTwoEndKey;
	});

	chrome.storage.local.get(['schoolThreeKey'], (result) => {
               	document.getElementById('schoolThree').value = result.schoolThreeKey;
	});

	chrome.storage.local.get(['degreeThreeKey'], (result) => {
               	document.getElementById('degreeThree').value = result.degreeThreeKey;
	});

	chrome.storage.local.get(['majorThreeKey'], (result) => {
               	document.getElementById('majorThree').value = result.majorThreeKey;
	});

	chrome.storage.local.get(['minorThreeKey'], (result) => {
               	document.getElementById('minorThree').value = result.minorThreeKey;
	});

	chrome.storage.local.get(['timeFrameThreeStartKey'], (result) => {
               	document.getElementById('timeFrameThreeStart').value = result.timeFrameThreeStartKey;
	});

	chrome.storage.local.get(['timeFrameThreeEndKey'], (result) => {
               	document.getElementById('timeFrameThreeEnd').value = result.timeFrameThreeEndKey;
	});
}

// updates local variables
function myFunction(){
	var firstName = document.getElementById('fName').value;
	chrome.storage.local.set({'fNameKey': firstName}, () => {
        });

	var lastName = document.getElementById('lName').value;
	chrome.storage.local.set({'lNameKey': lastName}, () => {
        });

	var email = document.getElementById('email').value;
	chrome.storage.local.set({'emailKey': email}, () => {
        });

	var phoneNumber = document.getElementById('phoneNumber').value;
	chrome.storage.local.set({'phoneNumberKey': phoneNumber}, () => {
        });

	var addressOne = document.getElementById('addressOne').value;
	chrome.storage.local.set({'addressOneKey': addressOne}, () => {
        });

	var addressTwo = document.getElementById('addressTwo').value;
	chrome.storage.local.set({'addressTwoKey': addressTwo}, () => {
        });

	var city = document.getElementById('city').value;
	chrome.storage.local.set({'cityKey': city}, () => {
        });

	var state = document.getElementById('state').value;
	chrome.storage.local.set({'stateKey': state}, () => {
        });

	var country = document.getElementById('country').value;
	chrome.storage.local.set({'countryKey': country}, () => {
        });

	var zipcode = document.getElementById('zipcode').value;
	chrome.storage.local.set({'zipcodeKey': zipcode}, () => {
        });

	var schoolOne = document.getElementById('schoolOne').value;
	chrome.storage.local.set({'schoolOneKey': schoolOne}, () => {
        });

	var degreeOne = document.getElementById('degreeOne').value;
	chrome.storage.local.set({'degreeOneKey': degreeOne}, () => {
        });

	var majorOne = document.getElementById('majorOne').value;
	chrome.storage.local.set({'majorOneKey': majorOne}, () => {
        });

	var minorOne = document.getElementById('minorOne').value;
	chrome.storage.local.set({'minorOneKey': minorOne}, () => {
        });

	var timeFrameOneStart = document.getElementById('timeFrameOneStart').value;
	chrome.storage.local.set({'timeFrameOneStartKey': timeFrameOneStart}, () => {
        });

	var timeFrameOneEnd = document.getElementById('timeFrameOneEnd').value;
	chrome.storage.local.set({'timeFrameOneEndKey': timeFrameOneEnd}, () => {
        });

	var schoolTwo = document.getElementById('schoolTwo').value;
	chrome.storage.local.set({'schoolTwoKey': schoolTwo}, () => {
        });

	var degreeTwo = document.getElementById('degreeTwo').value;
	chrome.storage.local.set({'degreeTwoKey': degreeTwo}, () => {
        });

	var majorTwo = document.getElementById('majorTwo').value;
	chrome.storage.local.set({'majorTwoKey': majorTwo}, () => {
        });

	var minorTwo = document.getElementById('minorTwo').value;
	chrome.storage.local.set({'minorTwoKey': minorTwo}, () => {
        });

	var timeFrameTwoStart = document.getElementById('timeFrameTwoStart').value;
	chrome.storage.local.set({'timeFrameTwoStartKey': timeFrameTwoStart}, () => {
        });

	var timeFrameTwoEnd = document.getElementById('timeFrameTwoEnd').value;
	chrome.storage.local.set({'timeFrameTwoEndKey': timeFrameTwoEnd}, () => {
        });

	var schoolThree = document.getElementById('schoolThree').value;
	chrome.storage.local.set({'schoolThreeKey': schoolThree}, () => {
        });

	var degreeThree = document.getElementById('degreeThree').value;
	chrome.storage.local.set({'degreeThreeKey': degreeThree}, () => {
        });

	var majorThree = document.getElementById('majorThree').value;
	chrome.storage.local.set({'majorThreeKey': majorThree}, () => {
        });

	var minorThree = document.getElementById('minorThree').value;
	chrome.storage.local.set({'minorThreeKey': minorThree}, () => {
        });

	var timeFrameThreeStart = document.getElementById('timeFrameThreeStart').value;
	chrome.storage.local.set({'timeFrameThreeStartKey': timeFrameThreeStart}, () => {
        });

	var timeFrameThreeEnd = document.getElementById('timeFrameThreeEnd').value;
	chrome.storage.local.set({'timeFrameThreeEndKey': timeFrameThreeEnd}, () => {
        });
}

document.getElementById("setInfo").addEventListener("click", myFunction);
autopopulate();