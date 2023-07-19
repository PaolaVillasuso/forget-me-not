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

function callTemperature(response) {
  console.log(response.data);
  let timeElement = document.querySelector("#current-time");
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#condition").innerHTML =
    response.data.condition.description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  timeElement.innerHTML = formatTime(response.data.time * 1000);
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

backgroundCity("Ljubljana");

function searchLocation(position) {
  let apiKey = "6a9a43e787b2d5cdc0af18644o21t03e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coordinates.longitude}&lat=${position.coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(callTemperature);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location-input");
currentLocation.addEventListener("click", getCurrent);
