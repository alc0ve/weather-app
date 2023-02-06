var APIKey = '4532a034efa99547e19a1354eab8e09d';
var searchBtn = $('#searchBtn');

//getting city input coordinates
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

//getting city input weather data
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
            setSavedSearches(location)
        })
}

//showing city input weather forecast, including 5 day forecast
var showCityForecastNow = function (city, data) {
    //city, date, weather icon, temp, wind, humidity

    //could I do localstorage set item in this function..?
    //do a get item in a separate function with a click event?

    //used vanilla js instead here to show '5 day forecast' area blank prior to search
    // var cityContainer = $('#cities-container')
    document.getElementById('cities-container').innerHTML = ''

    //start looping through days, showing weather data pulled from API
    for (let index = 0; index <= 5; index++) {

        //setting all variables used; icon is used with vanilla-- how do jQuery way?
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

        //Current day forecast
        if (index == 0) {
            cityName;
            $('#current-date').text(today.format('(' + 'MM/DD/YYYY' + ')'));
            cityTemp.text(currentTemp + " ºF");
            document.getElementById("current-weather-icon").src = displayIcon;
            cityWind.text(currentWind + " MPH");
            cityHumidity.text(currentHumidity + "%");
        }

        //5 day forecast
        if (index > 0) {
            document.getElementById('cities-container').innerHTML +=
                `
                <div class="card text-white bg-primary mb-3 w-100 h-100">
                <div class="card-body">
                    <h5>${todayAfter.format('MM/DD/YYYY')}</h5>
                    <img src=${displayIcon}>
                    <p>Temp: ${currentTemp} ºF</p>
                    <p>Wind: ${currentWind} MPH</p>
                    <p>Humidity: ${currentHumidity}%</p>
                </div>
            </div>
            `
        }
    }

    //local storage functions
    setSavedSearches(city);
    getSavedSearches();
}


//on search button click-> pulls weather,etc. function
searchBtn.on('click', function () {
    console.log("this is the search button");
    getCurrentCityCoords();
})


//saving searches in local storage
var setSavedSearches = function (location) {
    var searchInput = location.name;

    //if there is nothing saved at the start then save an empty array
    //will not save as an array without the null part???
    // if (localStorage.getItem('city') == null) {
    localStorage.setItem('city', '[]');
    // }

    //get saved city data and add on the next search input... will work with the null part...
    var savedCity = JSON.parse(localStorage.getItem('city'));
    savedCity.push(searchInput);

    //save the saved and new city input to local storage
    localStorage.setItem('city', JSON.stringify(savedCity));
}

//geting data from local storage
var getSavedSearches = function () {

}