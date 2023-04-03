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
// var futureForecast = $('.five-day')
var fiveDayOne = document.querySelector('#five-day-one')
var fiveDayTwo = document.querySelector('#five-day-two')
var fiveDayThree = document.querySelector('#five-day-three')
var fiveDayFour = document.querySelector('#five-day-four')
var fiveDayFive = document.querySelector('#five-day-five')

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

var cityHistorySearch = function (event) {
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
      currentDayForecast.children[0].textContent = "Today's Date: " + dayjs().format('ddd M/D/YYYY');
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

        fiveDayOne.children[0].textContent = dayjs.unix(forecastData.list[0].dt).format('ddd M/D/YYYY')
        fiveDayOne.children[1].textContent = "Forecast Temp: " + forecastData.list[0].main.temp + "F"
        fiveDayOne.children[2].textContent = "Forecast Wind Speed: " + forecastData.list[0].wind.speed + "mph";
        fiveDayOne.children[3].textContent = "Forecast Humidity: " + forecastData.list[0].main.humidity + "%";

        fiveDayTwo.children[0].textContent = dayjs.unix(forecastData.list[8].dt).format('ddd M/D/YYYY')
        fiveDayTwo.children[1].textContent = "Forecast Temp: " + forecastData.list[8].main.temp + "F"
        fiveDayTwo.children[2].textContent = "Forecast Wind Speed: " + forecastData.list[8].wind.speed + "mph";
        fiveDayTwo.children[3].textContent = "Forecast Humidity: " + forecastData.list[8].main.humidity + "%";

        fiveDayThree.children[0].textContent = dayjs.unix(forecastData.list[16].dt).format('ddd M/D/YYYY')
        fiveDayThree.children[1].textContent = "Forecast Temp: " + forecastData.list[16].main.temp + "F"
        fiveDayThree.children[2].textContent = "Forecast Wind Speed: " + forecastData.list[16].wind.speed + "mph";
        fiveDayThree.children[3].textContent = "Forecast Humidity: " + forecastData.list[16].main.humidity + "%";

        fiveDayFour.children[0].textContent = dayjs.unix(forecastData.list[24].dt).format('ddd M/D/YYYY')
        fiveDayFour.children[1].textContent = "Forecast Temp: " + forecastData.list[24].main.temp + "F"
        fiveDayFour.children[2].textContent = "Forecast Wind Speed: " + forecastData.list[24].wind.speed + "mph";
        fiveDayFour.children[3].textContent = "Forecast Humidity: " + forecastData.list[24].main.humidity + "%";

        fiveDayFive.children[0].textContent = dayjs.unix(forecastData.list[32].dt).format('ddd M/D/YYYY')
        fiveDayFive.children[1].textContent = "Forecast Temp: " + forecastData.list[32].main.temp + "F"
        fiveDayFive.children[2].textContent = "Forecast Wind Speed: " + forecastData.list[32].wind.speed + "mph";
        fiveDayFive.children[3].textContent = "Forecast Humidity: " + forecastData.list[32].main.humidity + "%";

      })

  }
}

init();

// -----------------------------------------------------------------------------------------------
// event listeners

citySearchHistory.addEventListener('click', cityHistorySearch)
citySearchBar.addEventListener('submit', citySearch)
