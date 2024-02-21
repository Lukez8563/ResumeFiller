///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Use XPath to find elements
function getElementsByXPath(xpath, parent)
{
    let results = [];
    let query = document.evaluate(xpath, parent || document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }

    let query1 = document.evaluate('//span[' + xpath.substring(38) + '/input', parent || document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query1.snapshotLength; i < length; ++i) {
        results.push(query1.snapshotItem(i));
    }

    let query2 = document.evaluate('//div[' + xpath.substring(38) + '/input', parent || document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query2.snapshotLength; i < length; ++i) {
        results.push(query2.snapshotItem(i));
    }

    return results;
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Cycle through all input boxes of a certain type
function findInputBoxes(xpath, values, checkinstead) {
  counter = 0;

  items = getElementsByXPath(xpath);

  if (checkinstead) {
    otheritems = getElementsByXPath(checkinstead);
  }

  if (items.length != 0) {
    console.log(items);
    for (var i = 0, l = items.length; i < l; i++) {
      if (checkinstead) {
        if (otheritems[i].value) {
          counter++;

          if (counter >= values.length) {
            return;
          }
          continue;
        }

      } else {
        if (items[i].value) {
          counter++;

          if (counter >= values.length) {
            return;
          }
          continue;
        }
      }
    }

    for (var i = 0, l = items.length; i < l; i++) {
      if (items[i]) {
        if (items[i].value) {
          continue;
        }

        if (checkinstead) {
          if (otheritems[i].value) {
            continue;
          }
        }

        // Check input versus select
        if (items[i].tagName == 'INPUT') {
          console.log(values[counter]);
          items[i].value = values[counter];
          if (items[i].classList.contains('ng-invalid')) {
            items[i].classList.remove('ng-invalid');
            items[i].classList.add('ng-valid');
          }
        } else if (items[i].tagName == 'SELECT') {
          // Find the option value if the tag is select
          for (var j = 0, l = items[i].options.length; j < l; j++) {
            if (items[i].options[j].innerHTML == values[counter]) {
              items[i].value = items[i].options[j].value;
              break;
            }
          }
        }

        items[i].placeholder = '';
        items[i].dispatchEvent(new Event('keypress'));
        items[i].dispatchEvent(new Event('click'));
        items[i].dispatchEvent(new Event('keydown'));
        items[i].dispatchEvent(new Event('keypress'));
        items[i].dispatchEvent(new Event('textInput'));
        items[i].dispatchEvent(new Event('input', {bubbles: true}));
        items[i].dispatchEvent(new Event('keyup'));
        items[i].dispatchEvent(new Event('change'));
        items[i].dispatchEvent(new Event('blur'));


        counter++;

        if (counter >= values.length) {
          return;
        }
      }
    }
  }
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Automatically define XPath variables
function writeXpath(orVals, andNotVals) {
  // Get each individual string
  orValsString = ''
  for (var i = 0, l = orVals.length; i < l; i++) {
    // Check if it is a list, and, if so, write the 'and' statement
    if (typeof orVals[i] == 'object') {
      andValsString = ''
      for (var j = 0, l1 = orVals[i].length; j < l1; j++) {
        if (j == 0) {
          andValsString += '@*[contains(translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "' + orVals[i][j] + '")]'
        } else {
          andValsString += ' and @*[contains(translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "' + orVals[i][j] + '")]'
        }
      }

      if (i == 0) {
        orValsString += '(' + andValsString + ')'
      } else {
        orValsString += ' or (' + andValsString + ')'
      }

    } else {
      if (i == 0) {
        orValsString += '@*[contains(translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "' + orVals[i] + '")]'
      } else {
        orValsString += ' or @*[contains(translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "' + orVals[i] + '")]'
      }
    }
  }


  if (!andNotVals) {
    andNotVals = []
  }

  andNotValsString = ''
  for (var i = 0, l = andNotVals.length; i < l; i++) {
    if (i == 0) {
      andNotValsString += 'not(@*[contains(translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "' + andNotVals[i] + '")])'
    } else {
      andNotValsString += ' and not(@*[contains(translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "' + andNotVals[i] + '")])'
    }
  }


  if (orValsString != '' && andNotValsString != '') {
    return '//*[(self::input or self::select) and (' + orValsString + ') and ' + andNotValsString + ']'
  } else if (orValsString != '' && andNotValsString == '') {
    return '//*[(self::input or self::select) and (' + orValsString + ')]'
  } else if (orValsString == '' && andNotValsString != '') {
    return '//*[(self::input or self::select) and ' + andNotValsString + ']'
  }
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Find the input labels
// Find previous element by xpath: /preceding::*[1]
function findLableForControl(el) {
   var idVal = el.id;
   labels = document.getElementsByTagName('label');
   for( var i = 0; i < labels.length; i++ ) {
      if (labels[i].htmlFor == idVal) {
           return labels[i];
      }
   }
}



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Define the main function
function Main() {
    // A few utility variables
    var namexpath = writeXpath([['full', 'name']])
    var fnamexpath = writeXpath([['first', 'name'], ['given', 'name']])
    var lnamexpath = writeXpath([['last', 'name'], 'surname'])
    var emailxpath = writeXpath(['email'])
    var phonexpath = writeXpath(['phone', ['mobile', 'number'], 'mobile'])
    var addressxpath = writeXpath(['address'], ['city', 'state', 'country', 'postal', 'zip', 'email'])
    var cityxpath = writeXpath(['city'], ['zip'])
    var statexpath = writeXpath([['state', 'res'], ['state', 'name'], ['state', 'home']])
    var countryxpath = writeXpath(['country'])
    var zipxpath = writeXpath(['postal', ['zip', 'res'], ['zip', 'smart']], ['city', 'state'])

    var schoolxpath = writeXpath(['school'])
    var degreexpath = writeXpath(['degree'])
    var majorxpath = writeXpath(['major'])
    var minorxpath = writeXpath(['minor'])
    var schoolfrommonthxpath = writeXpath([['from', 'month', 'education'], ['from', 'month', 'school']])
    var schoolfromyearxpath = writeXpath([['from', 'year', 'education'], ['from', 'year', 'school']])
    var schooltomonthxpath = writeXpath([['to', 'month', 'education'], ['to', 'month', 'school']])
    var schooltoyearxpath = writeXpath([['to', 'year', 'education'], ['to', 'year', 'school']])

    var jobxpath = writeXpath([['job', 'title'], ['work', 'title']])
    var orgxpath = writeXpath(['organization', 'company', 'employer'])
    var workfrommonthxpath = writeXpath([['from', 'month', 'work'], ['from', 'month', 'job'], ['from', 'month', 'experience'], ['start', 'month', 'work'], ['start', 'month', 'job'], ['start', 'month', 'experience'], ['begin', 'month', 'work'], ['begin', 'month', 'job'], ['begin', 'month', 'experience']])
    var workfromyearxpath = writeXpath([['from', 'year', 'work'], ['from', 'year', 'job'], ['from', 'year', 'experience'], ['start', 'year', 'work'], ['start', 'year', 'job'], ['start', 'year', 'experience'], ['begin', 'year', 'work'], ['begin', 'year', 'job'], ['begin', 'year', 'experience']])
    var worktomonthxpath = writeXpath([['to', 'month', 'work'], ['to', 'month', 'job'], ['to', 'month', 'experience'], ['end', 'month', 'work'], ['end', 'month', 'job'], ['end', 'month', 'experience']])
    var worktoyearxpath = writeXpath([['to', 'year', 'work'], ['to', 'year', 'job'], ['to', 'year', 'experience'], ['end', 'year', 'work'], ['end', 'year', 'job'], ['end', 'year', 'experience']])


    // Note in the console that the function is running
    console.log('Checking data...');

    // Contact info
    // Full name
    chrome.storage.local.get(['fNameKey', 'lNameKey'], (result) => {
      var fullName = [];
      var firstName = result.fNameKey;
      var lastName = result.lNameKey;
      fullNameResult = firstName.concat(' ', lastName);
      fullName.push(fullNameResult);
      findInputBoxes(namexpath, fullName)
    });
    //findInputBoxes(namexpath, namevals)

    // First name
    chrome.storage.local.get(['fNameKey'], (result) => {
      var fname = [];
      fname.push(result.fNameKey);
      findInputBoxes(fnamexpath, fname)
    });
    //findInputBoxes(fnamexpath, fnamevals)

    // Last name
    chrome.storage.local.get(['lNameKey'], (result) => {
      var lname = [];
      lname.push(result.lNameKey);
      findInputBoxes(lnamexpath, lname)
    });
    //findInputBoxes(lnamexpath, lnamevals)

    // Email
    chrome.storage.local.get(['emailKey'], (result) => {
      var email = [];
      email.push(result.emailKey);
      findInputBoxes(emailxpath, email)
    });
    //findInputBoxes(emailxpath, emailvals)

    // Phone number
    chrome.storage.local.get(['phoneNumberKey'], (result) => {
      var phone = [];
      phone.push(result.phoneNumberKey);
      findInputBoxes(phonexpath, phone)
    });
    //findInputBoxes(phonexpath, phonevals)

    // Address
    chrome.storage.local.get(['addressOneKey', 'addressTwoKey'], (result) => {
      var address = [];
      address.push(result.addressOneKey);
      address.push(result.addressTwoKey);
      findInputBoxes(addressxpath, address)
    });
    //findInputBoxes(addressxpath, addressvals)

    chrome.storage.local.get(['cityKey'], (result) => {
      var city = [];
      city.push(result.cityKey);
      findInputBoxes(cityxpath, city)
    });
    //findInputBoxes(cityxpath, cityvals)

    chrome.storage.local.get(['stateKey'], (result) => {
      var state = [];
      state.push(result.stateKey);
      findInputBoxes(statexpath, state)
    });
    //findInputBoxes(statexpath, statevals)

    chrome.storage.local.get(['countryKey'], (result) => {
      var country = [];
      country.push(result.countryKey);
      findInputBoxes(countryxpath, country)
    });
    //findInputBoxes(countryxpath, countryvals)

    chrome.storage.local.get(['zipcodeKey'], (result) => {
      var zipcode = [];
      zipcode.push(result.zipcodeKey);
      findInputBoxes(zipxpath, zipcode)
    });
    //findInputBoxes(zipxpath, zipvals)


    // Education
    // Degrees
    chrome.storage.local.get(['degreeOneKey', 'degreeTwoKey', 'degreeThreeKey'], (result) => {
      var degree = [];
      degree.push(result.degreeOneKey);
      degree.push(result.degreeTwoKey);
      degree.push(result.degreeThreeKey);
      findInputBoxes(degreexpath, degree)
    });
    //findInputBoxes(degreexpath, degreevals)

    // Major/minor
    chrome.storage.local.get(['majorOneKey', 'majorTwoKey', 'majorThreeKey'], (result) => {
      var major = [];
      major.push(result.majorOneKey);
      major.push(result.majorTwoKey);
      major.push(result.majorThreeKey);
      findInputBoxes(majorxpath, major)
    });
    //findInputBoxes(majorxpath, majorvals, schoolxpath)
    chrome.storage.local.get(['minorOneKey', 'minorTwoKey', 'minorThreeKey'], (result) => {
      var minor = [];
      minor.push(result.minorOneKey);
      minor.push(result.minorTwoKey);
      minor.push(result.minorThreeKey);
      findInputBoxes(minorxpath, minor)
    });
    //findInputBoxes(minorxpath, minorvals, schoolxpath)

    // Dates
    chrome.storage.local.get(['timeFrameOneStartKey', 'timeFrameTwoStartKey', 'timeFrameThreeStartKey'], (result) => {
      var months = [];
      var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var stringOneStart = result.timeFrameOneStartKey;
      var splitOneStart = stringOneStart.split("-");
      months.push(monthName[splitOneStart[1]-1]);
      var stringTwoStart = result.timeFrameTwoStartKey;
      var splitTwoStart = stringTwoStart.split("-");
      months.push(monthName[splitTwoStart[1]-1]);
      var stringThreeStart = result.timeFrameThreeStartKey;
      var splitThreeStart = stringThreeStart.split("-");
      months.push(monthName[splitThreeStart[1]-1]);
      console.log(months);
      findInputBoxes(schoolfrommonthxpath, months, schoolxpath)
    });
    //findInputBoxes(schoolfrommonthxpath, schoolfrommonthvals, schoolxpath)
    chrome.storage.local.get(['timeFrameOneStartKey', 'timeFrameTwoStartKey', 'timeFrameThreeStartKey'], (result) => {
      var years = [];
      var stringOneStart = result.timeFrameOneStartKey;
      var splitOneStart = stringOneStart.split("-");
      years.push(splitOneStart[0]);
      var stringTwoStart = result.timeFrameTwoStartKey;
      var splitTwoStart = stringTwoStart.split("-");
      years.push(splitTwoStart[0]);
      var stringThreeStart = result.timeFrameThreeStartKey;
      var splitThreeStart = stringThreeStart.split("-");
      years.push(splitThreeStart[0]);
      console.log(years);
      findInputBoxes(schoolfromyearxpath, years, schoolxpath)
    });
    //findInputBoxes(schoolfromyearxpath, schoolfromyearvals, schoolxpath)
    chrome.storage.local.get(['timeFrameOneEndKey', 'timeFrameTwoEndKey', 'timeFrameThreeEndKey'], (result) => {
      var months = [];
      var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var stringOneEnd = result.timeFrameOneEndKey;
      var splitOneEnd = stringOneEnd.split('-');
      months.push(monthName[splitOneEnd[1]-1]);
      var stringTwoEnd = result.timeFrameTwoEndKey;
      var splitTwoEnd = stringTwoEnd.split("-");
      months.push(monthName[splitTwoEnd[1]-1]);
      var stringThreeEnd = result.timeFrameThreeEndKey;
      var splitThreeEnd = stringThreeEnd.split("-");
      months.push(monthName[splitThreeEnd[1]-1]);
      console.log(months);
      findInputBoxes(schooltomonthxpath, months, schoolxpath)
    });
    //findInputBoxes(schooltomonthxpath, schooltomonthvals, schoolxpath)
    chrome.storage.local.get(['timeFrameOneEndKey', 'timeFrameTwoEndKey', 'timeFrameThreeEndKey'], (result) => {
      var years = [];
      var stringOneEnd = result.timeFrameOneEndKey;
      var splitOneEnd = stringOneEnd.split("-");
      years.push(splitOneEnd[0]);
      var stringTwoEnd = result.timeFrameTwoEndKey;
      var splitTwoEnd = stringTwoEnd.split("-");
      years.push(splitTwoEnd[0]);
      var stringThreeEnd = result.timeFrameThreeEndKey;
      var splitThreeEnd = stringThreeEnd.split("-");
      years.push(splitThreeEnd[0]);
      console.log(years);
      findInputBoxes(schooltoyearxpath, years, schoolxpath)
    });
    //findInputBoxes(schooltoyearxpath, schooltoyearvals, schoolxpath)

    // School names
    chrome.storage.local.get(['schoolOneKey', 'schoolTwoKey', 'schoolThreeKey'], (result) => {
      var school = [];
      school.push(result.schoolOneKey);
      school.push(result.schoolTwoKey);
      school.push(result.schoolThreeKey);
      findInputBoxes(schoolxpath, school)
    });
    //findInputBoxes(schoolxpath, schoolvals)


    // Work history
    // Company name
    chrome.storage.local.get(['orgOneKey', 'orgTwoKey', 'orgThreeKey'], (result) => {
      var orgs = [];
      orgs.push(result.orgOneKey);
      orgs.push(result.orgTwoKey);
      orgs.push(result.orgThreeKey);
      console.log(orgs);
      findInputBoxes(orgxpath, orgs, jobxpath)
    });
    //findInputBoxes(orgxpath, orgvals, jobxpath)

    // Dates
    chrome.storage.local.get(['timeFrameJobOneStartKey', 'timeFrameJobTwoStartKey', 'timeFrameJobThreeStartKey'], (result) => {
      var months = [];
      var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var stringOneStart = result.timeFrameJobOneStartKey;
      var splitOneStart = stringOneStart.split("-");
      months.push(monthName[splitOneStart[1]-1]);
      var stringTwoStart = result.timeFrameJobTwoStartKey;
      var splitTwoStart = stringTwoStart.split("-");
      months.push(monthName[splitTwoStart[1]-1]);
      var stringThreeStart = result.timeFrameJobThreeStartKey;
      var splitThreeStart = stringThreeStart.split("-");
      months.push(monthName[splitThreeStart[1]-1]);
      console.log(months);
      findInputBoxes(workfrommonthxpath, months, jobxpath)
    });
    //findInputBoxes(workfrommonthxpath, workfrommonthvals, jobxpath)

    chrome.storage.local.get(['timeFrameJobOneStartKey', 'timeFrameJobTwoStartKey', 'timeFrameJobThreeStartKey'], (result) => {
      var years = [];
      var stringOneStart = result.timeFrameJobOneStartKey;
      var splitOneStart = stringOneStart.split("-");
      years.push(splitOneStart[0]);
      var stringTwoStart = result.timeFrameJobTwoStartKey;
      var splitTwoStart = stringTwoStart.split("-");
      years.push(splitTwoStart[0]);
      var stringThreeStart = result.timeFrameJobThreeStartKey;
      var splitThreeStart = stringThreeStart.split("-");
      years.push(splitThreeStart[0]);
      console.log(years);
      findInputBoxes(workfromyearxpath, years, jobxpath)
    });
    //findInputBoxes(workfromyearxpath, workfromyearvals, jobxpath)

    chrome.storage.local.get(['timeFrameJobOneEndKey', 'timeFrameJobTwoEndKey', 'timeFrameJobThreeEndKey'], (result) => {
      var months = [];
      var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var stringOneEnd = result.timeFrameJobOneEndKey;
      var splitOneEnd = stringOneEnd.split('-');
      months.push(monthName[splitOneEnd[1]-1]);
      var stringTwoEnd = result.timeFrameJobTwoEndKey;
      var splitTwoEnd = stringTwoEnd.split("-");
      months.push(monthName[splitTwoEnd[1]-1]);
      var stringThreeEnd = result.timeFrameJobThreeEndKey;
      var splitThreeEnd = stringThreeEnd.split("-");
      months.push(monthName[splitThreeEnd[1]-1]);
      console.log(months);
      findInputBoxes(worktomonthxpath, months, jobxpath)
    });
    //findInputBoxes(worktomonthxpath, worktomonthvals, jobxpath)

    chrome.storage.local.get(['timeFrameJobOneEndKey', 'timeFrameJobTwoEndKey', 'timeFrameJobThreeEndKey'], (result) => {
      var years = [];
      var stringOneEnd = result.timeFrameJobOneEndKey;
      var splitOneEnd = stringOneEnd.split("-");
      years.push(splitOneEnd[0]);
      var stringTwoEnd = result.timeFrameJobTwoEndKey;
      var splitTwoEnd = stringTwoEnd.split("-");
      years.push(splitTwoEnd[0]);
      var stringThreeEnd = result.timeFrameJobThreeEndKey;
      var splitThreeEnd = stringThreeEnd.split("-");
      years.push(splitThreeEnd[0]);
      console.log(years);
      findInputBoxes(worktoyearxpath, years, jobxpath)
    });
    //findInputBoxes(worktoyearxpath, worktoyearvals, jobxpath)

    // Job title
    chrome.storage.local.get(['jobOneKey', 'jobTwoKey', 'jobThreeKey'], (result) => {
      var jobs = [];
      jobs.push(result.jobOneKey);
      jobs.push(result.jobTwoKey);
      jobs.push(result.jobThreeKey);
      console.log(jobs);
      findInputBoxes(jobxpath, jobs)
    });
    //findInputBoxes(jobxpath, jobvalss)
}



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

Main();
