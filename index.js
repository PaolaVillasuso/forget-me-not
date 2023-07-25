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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tuesd", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
              <div class=weather-forecast-date>${days}</div>  
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
                  alt=""
                  width="36"
                />
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max">18C°</span>
                <span class="weather-forecast-temp-min">12C°</span>
              </div>
              </div>
           
            `;
  });
  forecastHTML = ` </div>`;
  forecastElement.innerHTML = forecastHTML;
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElemnt = document.querySelector("#number");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElemnt.innerHTML = Math.round(fahrenheitTemperature);
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElemnt = document.querySelector("#number");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElemnt.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

backgroundCity("Ljubljana");
displayForecast();
