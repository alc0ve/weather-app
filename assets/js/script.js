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
            console.log(data);
        })

    currentCityForecast(cityInput);
};

var currentCityForecast = function (cityInput) {
    console.log(cityInput);
    var lat = data[0].lat;
    var lon = data[0].lon;
    var geoTag = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    fetch(geoTag)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
        })
}


searchBtn.on('click', function () {
    console.log("this is the search button");
    currentCityDisplay();
})
