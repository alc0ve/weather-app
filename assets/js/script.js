var APIKey = '4532a034efa99547e19a1354eab8e09d';
var searchBtn = $('#searchBtn');

var getCurrentCityCoords = function () {
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
            doFiveDay(data);
        })
}

var showCityForecastNow = function (city, data) {
    //city, date, weather icon, temp, wind, humidity
    // index = data.list[0];
    // console.log(index);

    var cityName = $('#current-city-name');
    cityName.text(city);

    var today = dayjs();
    $('#current-date').text(today.format('(' + 'MM/DD/YYYY' + ')'));

    // if (index === 0) {

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
    cityHumidity = $('#current-city-humidity');
    cityHumidity.text(currentHumidity + "%");

    // } else if (index > 0) {

    // }

    setSavedSearches(city); 
}


var doFiveDay = function (data) {
    //date, weather icon, temp, wind, humidity
    var cardTitle = dayjs();
    $(".card-title").text(cardTitle.format('MM/DD/YYYY'));
}

searchBtn.on('click', function () {
    console.log("this is the search button");
    getCurrentCityCoords();
})

var setSavedSearches = function (city, savedSearches) {
    var savedSearches = {weatherIcon, currentTemp, currentWind, currentHumidity};
    console.log(city);
    console.log(savedSearches);
    //stingify to convert forecast objects to string
    localStorage.setItem(city, JSON.stringify(savedSearches));
}

var getSavedSearches = function() {
    //create buttons to store city name in html; when button is clicked show info for that city in past searches
    var lastWeather = JSON.parse(localStorage.getItem("savedSearches"));
    console.log(lastWeather);
}