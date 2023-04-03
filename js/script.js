// URL for the API info: https://openweathermap.org/forecast5

// units:	optional	Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

// store recent searches in localstorage

// GeoCoder to convert cities to lan and lon -------------------------- 
// URL: https://openweathermap.org/api/geocoding-api


// -----------------------------------------------------------------------------------------------
// global variables

var citySearchBar = document.querySelector('#city-search')
var citySearchInput = document.querySelector('#city-search-input')
var citySearchHistory = document.querySelector('#search-history')
var currentDayForecast = document.querySelector('#current-day')
var futureForecast = document.getElementsByClassName('.five-day')

// -----------------------------------------------------------------------------------------------
// function that makes history divs sortable cards

$(function () {
  $(".sortable").sortable();
});

var init = function () {

  var cityHistoryArray = JSON.parse(localStorage.getItem("city-history"))

  if (cityHistoryArray !== null) {

    for (var i = 0; i < cityHistoryArray.length; i++) {
      var searchHistoryButton = document.createElement('button');
      searchHistoryButton.textContent = cityHistoryArray[i];
      citySearchHistory.appendChild(searchHistoryButton);
    }
  } else {
    return
  }
}


// -----------------------------------------------------------------------------------------------
// search button function

var cityHistory = [];

var citySearch = function (event) {
  event.preventDefault();
  
  var city = citySearchInput.value;
  cityHistory.push(city);
  localStorage.setItem("city-history", JSON.stringify(cityHistory));

  var searchHistoryButton = document.createElement('button');

  searchHistoryButton.textContent = city;

  citySearchHistory.appendChild(searchHistoryButton)

  getWeather(city);

  citySearchBar.reset();
}

// -----------------------------------------------------------------------------------------------
// historical search button function

var cityHistorySearch = function(event) {
  event.preventDefault();
  var city = event.target.innerHTML;
  getWeather(city);

}

// -----------------------------------------------------------------------------------------------
// function to put together the API URL and run the search

var getWeather = function (city) {

  // -----------------------------------------------------------------------------------------------
  // function to pull the lat/long stats of the city

  var cityStatsAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f21a10bf49ac32a7d097c29cd473c163";

  fetch(cityStatsAPI)

    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log("THE CURRENT FORECAST IS:  ", data);
      currentDayForecast.children[0].textContent = dayjs().format('ddd M/D/YYYY');
      currentDayForecast.children[1].textContent = "Current Temp: " + data.main.temp + "F"
      currentDayForecast.children[2].textContent = "Current Wind Speed: " + data.wind.speed + "mph";
      currentDayForecast.children[3].textContent = "Current Humidity: " + data.main.humidity + "%";

      getFutureForecast(data);

    })


  // -----------------------------------------------------------------------------------------------
  // fetch to pull future weather stats using prev fetch data
  var getFutureForecast = function (data) {

    // creates two variables by pointing to the location in the object
    var { lat, lon } = data.coord
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f21a10bf49ac32a7d097c29cd473c163`

    fetch(apiURL)

      .then(function (response) {
        return response.json();
      })

      .then(function (forecastData) {
        console.log("THE FUTURE FORECAST IS: ", forecastData);

        for (var i = 0; i < 5; i++)
        futureForecast[i].children[1].textContent = "Testing 1";
        futureForecast[i].children[2].textContent = "Testing 2";
        futureForecast[i].children[3].textContent = "Testing 3";

      })

  }
}

init();

// -----------------------------------------------------------------------------------------------
// event listeners

citySearchHistory.addEventListener('click', cityHistorySearch)
citySearchBar.addEventListener('submit', citySearch)
