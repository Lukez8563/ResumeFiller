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


    // The actual data
    const values = {};
    chrome.storage.local.get(['fullname']).then((result) => {
      alert(result.fullname);
      Object.assign(values, result);
      if (result.fullname == null) {
        chrome.storage.local.set({'fullname': prompt('What is your full name?')}).then(() => {
        });
      }
    });
    var namevals = [values.fullname];

    chrome.storage.local.get(['firstname']).then((result) => {
      if (result.firstname == null) {
        var fnamevals = [prompt('What is your first name?')];
        chrome.storage.local.set({'firstname': fnamevals[0]}).then(() => {
        });
      } else {
        var fnamevals = [result.firstname];
      }
    });

    alert(values.fullname);

    var lnamevals = ['Eastmond']

    var phonevals = ['801-884-9185']
    var emailvals = ['tanner.s.eastmond@gmail.com']
    var addressvals = ['3869 Miramar St', 'Box 3534']
    var cityvals = ['La Jolla']
    var statevals = ['California']
    var countryvals = ['United States']
    var zipvals = ['92037']

    var schoolvals = ['Lehi High', 'BYU', 'UCSD'];
    var degreevals = ['HS', 'BA', 'PhD'];
    var majorvals = ['', 'Economics', 'Economics']
    var minorvals = ['', 'Business', '']
    var schoolfrommonthvals = ['Aug', 'Aug', 'Aug']
    var schoolfromyearvals = ['2007', '2011', '2018']
    var schooltomonthvals = ['Jun', 'Jun', 'Jun']
    var schooltoyearvals = ['2011', '2018', '2024']

    var jobvals = ['Pharmacy Tech', 'Research Assistant']
    var orgvals = ['Smith\'s Pharmacy', 'Brigham Young University']
    var workfrommonthvals = ['Nov', 'Jun']
    var workfromyearvals = ['2014', '2016']
    var worktomonthvals = ['Jun', 'Aug']
    var worktoyearvals = ['2016', '2018']


    // Contact info
    // Full name
    findInputBoxes(namexpath, namevals)

    // First name
    findInputBoxes(fnamexpath, fnamevals)

    // Last name
    findInputBoxes(lnamexpath, lnamevals)

    // Email
    findInputBoxes(emailxpath, emailvals)

    // Phone number
    findInputBoxes(phonexpath, phonevals)

    // Address
    findInputBoxes(addressxpath, addressvals)
    findInputBoxes(cityxpath, cityvals)
    findInputBoxes(statexpath, statevals)
    findInputBoxes(countryxpath, countryvals)
    findInputBoxes(zipxpath, zipvals)


    // Education
    // Degrees
    findInputBoxes(degreexpath, degreevals)

    // Major/minor
    findInputBoxes(majorxpath, majorvals, schoolxpath)
    findInputBoxes(minorxpath, minorvals, schoolxpath)

    // Dates
    findInputBoxes(schoolfrommonthxpath, schoolfrommonthvals, schoolxpath)
    findInputBoxes(schoolfromyearxpath, schoolfromyearvals, schoolxpath)
    findInputBoxes(schooltomonthxpath, schooltomonthvals, schoolxpath)
    findInputBoxes(schooltoyearxpath, schooltoyearvals, schoolxpath)

    // School names
    findInputBoxes(schoolxpath, schoolvals)


    // Work history
    // Company name
    findInputBoxes(orgxpath, orgvals, jobxpath)

    // Dates
    findInputBoxes(workfrommonthxpath, workfrommonthvals, jobxpath)
    findInputBoxes(workfromyearxpath, workfromyearvals, jobxpath)
    findInputBoxes(worktomonthxpath, worktomonthvals, jobxpath)
    findInputBoxes(worktoyearxpath, worktoyearvals, jobxpath)

    // Job title
    findInputBoxes(jobxpath, jobvals)
}



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

Main();
