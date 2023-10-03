const currentHour = new Date().getHours();
const DAY_HOUR = 6;
const NIGHT_HOUR = 18;

const swictherTheme = document.querySelector('.toggle');
const hours = new Date().getHours();
toggle.checked = hours > DAY_HOUR && hours < NIGHT_HOUR;

const root = document.documentElement;
const content = document.getElementById("content");

//CONFIGURATION THEME

if(!toggle.checked){
  theme = "dark";
  root.setAttribute('data-theme', theme);  
} else {
  theme = "light";
  root.setAttribute('data-theme', theme);  
}

toggle.addEventListener('click', toggleTheme);

function toggleTheme(){
  const setTheme = swictherTheme.checked ? 'light' : 'dark';
  root.setAttribute('data-theme', setTheme);
}

// DATA ROSARIO JSON 
const jsonDataRosario = {
  "city": {
      "id": 3836873,
      "name": "Rosario",
      "country": "AR",
      "coord": {
          "lon": -60.6393,
          "lat": -32.9468
      },
      "population": 1173533,
      "timezone": -10800
  },
  "cod": "200",
  "message": 0.0812998,
  "cnt": 7,
  "list": [
      {
          "dt": 1696343415,
          "sunrise": 1661002157,
          "sunset": 1661046359,
          "temp": {
              "day": 20.34,
              "min": 17.11,
              "max": 20.34,
              "night": 18.92,
              "eve": 19.83,
              "morn": 17.11
          },
          "pressure": 1014,
          "humidity": 58,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "speed": 2.59,
          "deg": 112,
          "clouds": 0
      },
      {
          "dt": 1696429815,
          "sunrise": 1661088581,
          "sunset": 1661132659,
          "temp": {
              "day": 21.12,
              "min": 16.79,
              "max": 21.12,
              "night": 19.67,
              "eve": 20.34,
              "morn": 16.79
          },
          "pressure": 1014,
          "humidity": 56,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02d"
              }
          ],
          "speed": 2.25,
          "deg": 96,
          "clouds": 19
      },
      {
          "dt": 1696516215,
          "sunrise": 1661088581,
          "sunset": 1661132659,
          "temp": {
              "day": 21.12,
              "min": 16.79,
              "max": 21.12,
              "night": 19.67,
              "eve": 20.34,
              "morn": 16.79
          },
          "pressure": 1014,
          "humidity": 56,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02d"
              }
          ],
          "speed": 2.25,
          "deg": 96,
          "clouds": 19
      },
      {
          "dt": 1696602615,
          "sunrise": 1661088581,
          "sunset": 1661132659,
          "temp": {
              "day": 21.12,
              "min": 16.79,
              "max": 21.12,
              "night": 19.67,
              "eve": 20.34,
              "morn": 16.79
          },
          "pressure": 1014,
          "humidity": 56,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02d"
              }
          ],
          "speed": 2.25,
          "deg": 96,
          "clouds": 19
      },
      {
          "dt": 1696689015,
          "sunrise": 1661088581,
          "sunset": 1661132659,
          "temp": {
              "day": 21.12,
              "min": 16.79,
              "max": 21.12,
              "night": 19.67,
              "eve": 20.34,
              "morn": 16.79
          },
          "pressure": 1014,
          "humidity": 56,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02d"
              }
          ],
          "speed": 2.25,
          "deg": 96,
          "clouds": 19
      },
  ]
};


// GEOLOCATION 
let latitude = localStorage.getItem('latitude');
let longitude = localStorage.getItem('longitude');

if (latitude && longitude) {
    drawContainerWeather();
  } else {  
    drawEmptyStateLocation();
    const activeGeolocationBtn = document.getElementById("active-geolocation-btn");
    activeGeolocationBtn.addEventListener('click', getGeolocation);
}


function drawContainerWeather(){
  const weatherForecastRosario = new WeatherForecast(jsonDataRosario);
  const {city, forecast} = weatherForecastRosario;
  content.innerHTML = `
  <div class='row'>
    <div class='col text-center'>
      <h2 class='pb-50'>${city.name ? city.name : "No found"}</h2>
    </div>
  </div>
  <div class='row main__content__today'>
    <div class='col-12 text-center'>
      <i class="wi ${weatherIcon(forecast[0]?.weather.description)}"></i>
      <h3>Max. ${forecast[0]?.temperature.max | "" }° Min. ${forecast[0]?.temperature.min | "" }°</h3>
      <span class="main__content__today__weather">${forecast[0]?.weather.main ? forecast[0]?.weather.main : ""}</span>
    </div>
  </div>
  <div class='row main__content__other_days'>  
  </div>`;

  const otherDaysContainer = document.querySelector('.main__content__other_days');

  for (let i = 1; i < forecast.length; i++) {
    const dayHtml = `
      <div class='col-12 col-md-3 text-center'>
        <i class="wi ${weatherIcon(forecast[i]?.weather.description || "")}"></i>
        <h3>Max. ${forecast[i]?.temperature.max || "0"}° Min. ${forecast[i]?.temperature.min || "0" }°</h3>
        <span class="main__content__today__weather">${forecast[i]?.weather.main ? forecast[i]?.weather.main : "No weather"}</span>
      </div>
    `;
    otherDaysContainer.innerHTML += dayHtml;
  }
}

function drawEmptyStateLocation(){
  content.innerHTML = `
  <div class='row'>
    <div class='col text-center'>
      <div class='main__content__image__geolocation pb-50'></div>
      <h2 class='pb-50' data-aos="fade">Enable geolocation & check the weather</h2>
      <button class='btn btn-primary' id='active-geolocation-btn'>Active geolocation</button>
    </div>
  </div>`;  
}

function getGeolocation(){
  navigator.geolocation.getCurrentPosition(
    (position) => {
      localStorage.setItem('latitude', position.coords.latitude);
      localStorage.setItem('longitude', position.coords.longitude)
      drawContainerWeather();
     },() => {
      insertModalWarning();
      openModalWarning();
    }
  )
}

function insertModalWarning() {
  var modal = document.createElement("div");
  modal.id = "myModal";
  modal.classList.add("modal");
  modal.classList.add("fade");
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-labelledby", "exampleModalLabel");
  modal.setAttribute("aria-hidden", "true");

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Warning</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>If you do not enable geolocation, you won't be able to use the weather app. We apologize for any inconvenience.</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function openModalWarning() {
  $('#myModal').modal('show');
}


function weatherIcon(descripcion) {
  switch (descripcion.toLowerCase()) {
    case "clear sky":
      return "wi-day-sunny";
    case "few clouds":
      return "wi-day-sunny-overcast";
    case "scattered clouds" || "broken clouds":
      return "wi-day-cloudy";
    case "overcast clouds":
      return "wi-cloud";
    case "mist || fog":
      return "wi-fog";
    case "light rain" || "moderate rain" || "drizzle":
      return "wi-day-rain-mix";
    case "heavy rain":
      return "wi-day-rain";
    case "light snow" || "moderate snow" || "snow showers":
      return "wi-day-snow";
    case "heavy snow":
      return "wi-snowflake-cold";
    case "thunderstorm":
      return "wi-day-thunderstorm";
    case "shower rain":
      return "wi-day-rain-wind";
    case "hail":
      return "wi-day-hail";
    default:
      return "wi-alien";
  }
}