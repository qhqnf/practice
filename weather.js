const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "3cf4a08ded88b43f79da1e2b3def0c4b";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}C @ ${place}`;
    });
}

function savePosition(positionObj) {
  localStorage.setItem(COORDS, JSON.stringify(positionObj));
}

function handleSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  positionObj = {
    latitude,
    longitude,
  };
  savePosition(positionObj);
  getWeather(latitude, longitude);
}

function handleError(position) {
  console.log("Can't not load geolocation");
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askCoords();
  } else {
    parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
