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
  let timeElement = document.querySelector("#current-time");
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  console.log(response.data);
}

function backgroundCity(city) {
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(callTemperature);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location-input");
currentLocation.addEventListener("click", getCurrent);
