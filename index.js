let date = document.querySelector("#current-time");

let currentDate = new Date();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let day = currentDate.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

date.innerHTML = `${days[day]} ${hours}:${minutes}`;

function callTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
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
