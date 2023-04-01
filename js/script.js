// URL for the API info: https://openweathermap.org/forecast5

// base URL to use for calls: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} (replace the curlies with the data you need)

// Info on how to use OpenWeather ------------------------------------
// lat, lon:	required	Geographical coordinates (latitude, longitude).

// appid:	required	Your unique API key (you can always find it on your account page under the "API key" tab)

// units:	optional	Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

// need to tie each city to a lat and lon

// store recent searches in localstorage

// GeoCoder to convert cities to lan and lon -------------------------- 
// URL: https://openweathermap.org/api/geocoding-api



var citySearchBar = document.querySelector('#city-search')
var citySearchHistory = document.querySelector('#search-history')
var currentDayForecast = document.querySelector('#current-day')
var futureForecast = document.querySelector('#future-forecast')


// function that makes history divs sortable cards
$(function () {
  $("#sortable").sortable();
});

// search button function
var citySearch = function (event) {
  event.preventDefault();

  var city = citySearch.ariaValueMax.trim();

  if (city) {
    getWeather(city);
    citySearch.textContent = '';
    
  } else {
    alert('Please choose a valid city name');
  }
}

// function to put together the API URL and run the search
var getWeather = function () {
  var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + "," + countryCode + "&limit=" + limit + "&appid=" + apiKey;

  fetch(apiURL)

    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);

      // need to append the date, temp, wind speed, and humidity to the six divs
    })
}

// (search-history-tiles).addEventListener('text', citySearch)
citySearchBar.addEventListener('submit', citySearch)
