function formatTime(timestamp) {
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function fromatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2" >
              <div class=weather-forecast-date>${fromatDay(
                forecastDay.time
              )}</div>  
                <img
                  src="${forecastDay.condition.icon_url}"
                  alt="${forecastDay.condition.description}"
                  width="50"
                />
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max">${Math.round(
                  forecastDay.temperature.maximum
                )}C°</span>
                <span class="weather-forecast-temp-min">${Math.round(
                  forecastDay.temperature.minimum
                )}C°</span>
              </div>
              </div>
           
            `;
  });
  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6a9a43e787b2d5cdc0af18644o21t03e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function callTemperature(response) {
  console.log(response.data);
  let timeElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#current-emoji-temperature");

  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#number").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#current-humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#condition").innerHTML =
    response.data.condition.description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  timeElement.innerHTML = formatTime(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function backgroundCity(city) {
  let apiKey = "6a9a43e787b2d5cdc0af18644o21t03e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(callTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  backgroundCity(city);
}

let form = document.querySelector("#form-city");
form.addEventListener("submit", showCity);

function searchLocation(position) {
  let apiKey = "6a9a43e787b2d5cdc0af18644o21t03e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(callTemperature);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location-input");
currentLocation.addEventListener("click", getCurrent);

let celsiusTemperature = null;

function displaycelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElemnt = document.querySelector("#number");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElemnt.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

backgroundCity("Ljubljana");
