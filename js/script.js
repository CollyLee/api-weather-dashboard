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


// -----------------------------------------------------------------------------------------------
// global variables

var citySearchBar = document.querySelector('#city-search')
var citySearchHistory = document.querySelector('#search-history')
var currentDayForecast = document.querySelector('#current-day')
var futureForecast = document.querySelector('#future-forecast')

// -----------------------------------------------------------------------------------------------
// function that makes history divs sortable cards

$(function () {
  $("#sortable").sortable();
});


// -----------------------------------------------------------------------------------------------
// search button function

var citySearch = function (event) {
  event.preventDefault();

  // how do I capture the text from the search bar???????????????????????????????????????????
  var city = citySearchBar.value;

    var searchHistoryButton = document.createElement('div');
    searchHistoryButton.textContent = city;

    citySearchHistory.appendChild(searchHistoryButton)

      // getWeather(city);


    citySearch.textContent = '';

}

// -----------------------------------------------------------------------------------------------
// function to put together the API URL and run the search

var getWeather = function () {

// -----------------------------------------------------------------------------------------------
// function to pull the lat/long stats of the city

var cityStatsAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + "chicago" + "&limit=5&appid=cf82558b772b7dffa6ddf33e4d31bd06

fetch(cityStatsAPI);

.then(function (response) {
  return response.json();
})

.then(function (data) {
  console.log(data);
})

// -----------------------------------------------------------------------------------------------
// fetch to pull weather stats using prev fetch data

//   var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + "," + countryCode + "&limit=" + limit + "&appid=" + "cf82558b772b7dffa6ddf33e4d31bd06";

//   fetch(apiURL)

//     .then(function (response) {
//       return response.json();
//     })

//     .then(function (data) {
//       console.log(data);

      // need to append the date, temp, wind speed, and humidity to the six divs
//     })
// }

// -----------------------------------------------------------------------------------------------
// event listeners

// (search-history-tiles).addEventListener('text', citySearch)
citySearchBar.addEventListener('submit', citySearch)
