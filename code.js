/* Part One: Collect user-input to determine the target city (+) state. */

// This click-event is designed to capture the user's selected state, and generate...
// a list of cities to populate the dropdown menu. This is important because it...
// will prevent users from trying to capture information about a city that does...
// NOT exist in our database.
onEvent('confirmStateBtn', 'click', function () {
  var cityList = [];

  var cleanedStateName = cleanStateName(getText('stateInput'));

  readRecords('Daily Weather', { State: cleanedStateName }, function (records) {
    for (var i = 0; i < records.length; i++) {
      if (!includes(cityList, records[i].City)) {
        appendItem(cityList, records[i].City);
      }
    }
    setProperty('cityDropdown', 'options', cityList);
  });
});

// This function is designed to cycle through an array (a.k.a. "list") and determine...
// whether the given element is in it already.
function includes(arr, element) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === element) {
      return true;
    }
  }
  return false;
}

// This function ensures that the user-inputted state is formatted properly.
// 'stateName' param, data-type: {string}
function cleanStateName(stateName) {
  var properStateName = stateName[0].toUpperCase();
  for (var i = 1; i < stateName.length; i++) {
    properStateName += stateName[i].toLowerCase();
  }
  return properStateName;
}

// Note, this [altCleanStateName()] function does the exact same thing as the...
// [cleanStateName()] function. It just employs JavaScript string methods.
// function altCleanStateName(stateName) {
//   return stateName.charAt(0).toUpperCase() + stateName.slice(1).toLowerCase();
// }

/* Part Two: Gather key info about the chosen city. */

onEvent('weatherReportBtn', 'click', function () {
  // This list will consist of five 'forecast' objects w/ four key data points...
  // (1) date, (2) icon, (3), low temperature, and (4) high temperature.
  var arrayOfForecasts = [];

  var cityName = abridgeCityName(getText('cityDropdown'));
  setText('cityName', cityName);

  readRecords(
    'Daily Weather',
    { City: getText('cityDropdown') },
    function (records) {
      for (var i = 0; i < records.length; i++) {
        appendItem(arrayOfForecasts, {
          date: records[i].Date,
          icon: records[i].Icon,
          lowTemp: records[i]['Low Temperature'],
          highTemp: records[i]['High Temperature']
        });
      }

      for (var j = 0; j < 5; j++) {
        setProperty('date' + j, 'text', arrayOfForecasts[j].date);
        setProperty('icon' + j, 'image', arrayOfForecasts[j].icon);
        setProperty('lowTemp' + j, 'text', arrayOfForecasts[j].lowTemp);
        setProperty('highTemp' + j, 'text', arrayOfForecasts[j].highTemp);
      }

      setScreen('fiveDayForecastScreen');
    }
  );
});

// This function is designed to abridge or shorten a city name for display.
// 'cityName' param, data-type: {string}
function abridgeCityName(cityName) {
  if (cityName.includes('/')) {
    var terminalIndex = cityName.indexOf('/');
    return cityName.substring(0, terminalIndex);
  } else {
    return cityName;
  }
}

/* Part Three: Run it back turbo. */

onEvent('newForecastBtn', 'click', function () {
  // Reset key inputs.
  setText('stateInput', '');
  setProperty('cityDropdown', 'options', []);

  // Redirect users.
  setScreen('homeScreen');
});
