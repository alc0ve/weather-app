var APIKey = '4532a034efa99547e19a1354eab8e09d';
var searchBtn = $('#searchBtn');
var lat;
var lon;

var currentCityDisplay = function (city) {
    var city = $('.form-control').val();
    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    var geoTag = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    fetch(geoTag)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
        }
    })

    };


searchBtn.on('click', function () {
    console.log("this is the search button");
    currentCityDisplay();
})
