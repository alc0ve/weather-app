var APIKey = '4532a034efa99547e19a1354eab8e09d';
var searchBtn = $('#searchBtn');

var currentCityDisplay = function () {
    var cityInput = $('#input-city').val().trim();
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=5" + "&appid=" + APIKey;

    fetch(queryURL)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);
            getCurrentCityForecast(data[0]);
            var lat = data[0].lat
            var lon = data[0].lon
            console.log(lat, lon);
        })

};

var getCurrentCityForecast = function (location) {
    let { lat, lon } = location;
    let city = location.name;
    console.log(location);
    console.log(location.name);

    var geoTag = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";

    fetch(geoTag)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            showCityForecastNow(city, data)
        })
}

var showCityForecastNow = function (city, data) {
    //city, date, weather icon, temp, wind, humidity

    var cityName = $('#current-city-name');
    cityName.text(city);

    currentTemp = data.list[0].main.temp;
    cityTemp = $('#current-city-temp');
    cityTemp.text(currentTemp + " ºF");

    weatherIcon = data.list[0].weather[0].icon;
    displayIcon = `https://openweathermap.org/img/w/${weatherIcon}.png`
    document.getElementById("icon").src = displayIcon;

    currentWind = data.list[0].wind.speed;
    cityWind = $('#current-city-wind');
    cityWind.text(currentWind + " MPH");

    currentHumidity = data.list[0].main.humidity;
    console.log(currentHumidity);
}


searchBtn.on('click', function () {
    console.log("this is the search button");
    currentCityDisplay();
})
