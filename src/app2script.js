let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayIndex = currentTime.getDay();
let dateIndex = currentTime.getDate();

dateElement.innerHTML = `Current Time: ${hour}:${minutes}`;

let fullDateElement = document.querySelector("#current-day");
fullDateElement.innerHTML = ` ${days[dayIndex]}, ${dateIndex}<sup>th</sup> `;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

    celsiusTemperature = response.data.main.temp;
}

function search(city) {
  let units = "metric";
  let apiKey = `f7d6cf7df2325679cfae09f1ff8a7a24`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  let units = "metric";
  let apiKey = `f7d6cf7df2325679cfae09f1ff8a7a24`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayFahrTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature (event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#button-addon2-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", displayFahrTemperature); 

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Warsaw");
