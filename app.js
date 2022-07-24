let now = new Date();
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

function formatDay(date) {
  let now = new Date(date * 1000);
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row thirdrow">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
              <div class="card">
                <div class="card-body">
                  <div class="day">${formatDay(forecastDay.dt)}</div>
                  <div class="weather">Cloudy</div>
                  <div class="temperature">
                    <span class="weather-forecast-temperature-max">${Math.round(
                      forecastDay.temp.max
                    )}° </span>
                    <span class="weather-forecast-temperature-min">${Math.round(
                      forecastDay.temp.min
                    )}° </span>
                  </div>
                </div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  class="card-img-top"
                  alt="monday"
                />
              </div>
              </div>
           
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
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
  let wind = Math.round(response.data.wind.speed);
  let currentCity = document.querySelector(".city");
  let city = response.data.name;
  let iconElement = document.querySelector("#icon");

  celTemp = response.data.main.temp;
  currentTemperature.innerHTML = `${temperature}`;
  countryName.innerHTML = `${country}`;
  cloudyState.innerHTML = `${cloudy}`;
  humidityState.innerHTML = `Humidity: ${humidity}%`;
  windSpeed.innerHTML = `Wind: ${wind} km/hour`;
  currentCity.innerHTML = `${city}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "daa9bbc25db2c0ed05d28a96cf2d42f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".inputform");
  search(searchInput.value);
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

function showFarTemp(event) {
  event.preventDefault();
  celLink.classList.remove("active");
  farLink.classList.add("active");
  let farTemp = (celTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(farTemp);
}

function showCelTemp(event) {
  event.preventDefault();
  celLink.classList.add("active");
  farLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celTemp);
}

let celTemp = null;

let searchForm = document.querySelector(".entercity");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector(".btn-secondary");
currentButton.addEventListener("click", currentCityWeather);

let farLink = document.querySelector("#far");
farLink.addEventListener("click", showFarTemp);

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", showCelTemp);

search("Kyiv");
