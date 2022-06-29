let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let dateFirstRow = document.querySelector(".currentday");
dateFirstRow.innerHTML = day;
let dateSecondRow = document.querySelector(".currentdate");
dateSecondRow.innerHTML = `${month} ${date}, ${year}`;
let dateThirdRow = document.querySelector(".currenttime");
dateThirdRow.innerHTML = `${hour}:${minute}`;
function showWeather(response) {
  console.log(response);
  let currentTemperature = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  let countryName = document.querySelector(".country");
  let country = response.data.sys.country;
  let cloudyState = document.querySelector(".cloudy");
  let cloudy = response.data.weather[0].description;
  let humidityState = document.querySelector(".humidity");
  let humidity = response.data.main.humidity;
  let windSpeed = document.querySelector(".wind");
  let wind = response.data.wind.speed;
  let currentCity = document.querySelector(".city");
  let city = response.data.name;
  currentTemperature.innerHTML = `${temperature}`;
  countryName.innerHTML = `${country}`;
  cloudyState.innerHTML = `${cloudy}`;
  humidityState.innerHTML = `Humidity: ${humidity}%`;
  windSpeed.innerHTML = `Wind: ${wind} km/hour`;
  currentCity.innerHTML = `${city}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".inputform");
  let apiKey = "daa9bbc25db2c0ed05d28a96cf2d42f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentPositionWeather(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "daa9bbc25db2c0ed05d28a96cf2d42f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentCityWeather() {
  navigator.geolocation.getCurrentPosition(currentPositionWeather);
}

let searchForm = document.querySelector(".entercity");
searchForm.addEventListener("submit", search);

let currentButton = document.querySelector(".btn-secondary");
currentButton.addEventListener("click", currentCityWeather);
