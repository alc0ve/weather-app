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
            // doFiveDay(data);
        })
}

var showCityForecastNow = function (city, data) {
    //city, date, weather icon, temp, wind, humidit
    // var cityContainer = $('#cities-container')
    document.getElementById('cities-container').innerHTML = ''
    for (let index = 0; index <= 5; index++) {

        var cityName = $('#current-city-name').text(city);
        var today = dayjs();
        var todayAfter = today.add(index, 'day');
        weatherIcon = data.list[index].weather[0].icon
        displayIcon = `https://openweathermap.org/img/w/${weatherIcon}.png`
        document.getElementById("current-weather-icon").src = displayIcon;
        cityTemp = $('#current-city-temp');
        currentTemp = data.list[index].main.temp
        cityWind = $('#current-city-wind');
        currentWind = data.list[index].wind.speed
        cityHumidity = $('#current-city-humidity');
        currentHumidity = data.list[index].main.humidity

        // cityName.text(city);

        // var today = dayjs();
        // $('#current-date').text(today.format('(' + 'MM/DD/YYYY' + ')'));

        // currentTemp = data.list[index].main.temp;
        // cityTemp = $('#current-city-temp');
        // cityTemp.text(currentTemp + " ºF");

        // weatherIcon = data.list[index].weather[0].icon;
        // // currentWIcon = $("current-weather-icon");
        // // currentWIcon.attr('img', `https://openweathermap.org/img/w/${weatherIcon}.png`);
        // displayIcon = `https://openweathermap.org/img/w/${weatherIcon}.png`
        // document.getElementById("current-weather-icon").src = displayIcon;

        // currentWind = data.list[index].wind.speed;
        // cityWind = $('#current-city-wind');
        // cityWind.text(currentWind + " MPH");

        // currentHumidity = data.list[index].main.humidity;
        // cityHumidity = $('#current-city-humidity');
        // cityHumidity.text(currentHumidity + "%");

        // var cityContainer =$('#cities-container')
        // current day weather
        if (index == 0) {
            cityName;
            $('#current-date').text(today.format('(' + 'MM/DD/YYYY' + ')'));
            cityTemp.text(currentTemp + " ºF");
            document.getElementById("current-weather-icon").src = displayIcon;
            cityWind.text(currentWind + " MPH");
            cityHumidity.text(currentHumidity + "%");
        }
        // 5 day forecast
        if (index > 0) {
                document.getElementById('cities-container').innerHTML +=`
                <div class="card text-white bg-primary mb-3 w-100 h-100">
                <div class="card-body">
                    <h5>${todayAfter}</h5>
                    <img src=${displayIcon}>
                    <p>Temp: ${currentTemp} ºF</p>
                    <p>Wind: ${currentWind} MPH</p>
                    <p>Humidity: ${currentHumidity}%</p>
                </div>
            </div>
            `
        }  
        }
    }

// setSavedSearches(city); 



// var doFiveDay = function (data) {
//     //date, weather icon, temp, wind, humidity
//     var cardTitle = dayjs();
//     $("#1-date").text(cardTitle.format('MM/DD/YYYY'));

//     temp1 = data.list[1].main.temp;
//     cityTemp1 = $("#1-temp");
//     cityTemp1.text(temp1 + " ºF");


// }

searchBtn.on('click', function () {
    console.log("this is the search button");
    getCurrentCityCoords();
})

// var setSavedSearches = function (city, savedSearches) {
//     var savedSearches = { weatherIcon, currentTemp, currentWind, currentHumidity };
//     console.log(city);
//     console.log(savedSearches);
//     //stingify to convert forecast objects to string
//     localStorage.setItem(city, JSON.stringify(savedSearches));
// }

// var getSavedSearches = function () {
//     //create buttons to store city name in html; when button is clicked show info for that city in past searches
//     var lastWeather = JSON.parse(localStorage.getItem("savedSearches"));
//     console.log(lastWeather);
// }