# weather-app

## Description

Knowing the weather is helpful on any given day, any given location, and at any given time. I created this app to test my skills in using APIs from a website that provides weather data for anywhere around the world. I wanted to have buttons on the side for previously searched cities as well so that I can go back to it, if needed. I learned that patience and a VERY open mind goes a long way. I broadened my horizons with API usage as well!

## Installation

I started this application with nothing. I created a directory for the entire application, then added appropriate folders and files. I started by creating and APIKey from the OpenWeather webpage that provides APIs. After, I had to append the APIKey to the geocode API URL to call and receive a response with longitude and latitude data from a given location. Once I was able to pull that data, I retrieved another URL to pull the forecast data. I created variables for the longitude and latitude values and placed them into the forecast API call URL to pull weather data for user input city. I created a loop that will run through data needed in place of the slots created to display weather information. A local storage was used to store inputted data to retrieve in the side column. Once I had the functions down, I was able to have user input a city and pull data from OpenWeather API! Bootstrap was used for CSS styling.

## Usage

Upon opening application, there will be no data but placeholders for where the user should expect information. User is able to input a city and hit enter, or click search which then will pull weather data, including cloudy/sunny icon, temperature in Farenheit, wind gust, and humidity. It will also display the next 5 days with the same expected data. Searched cities will show up as button under the search bar in which user is able to pull back weather from previously searched. Each city searched will append at the bottom of each button.

![alt text](assets/images/screenshot.png)

Link to use application: 

## Credits

Classmates helped me a lot with this assignment! I also thank the TA's provided in the bootcamp.

OpenWeather API site: https://openweathermap.org/forecast5

Bootstrap: https://getbootstrap.com/docs/5.1/getting-started/introduction/