const currentHour = new Date().getHours();
const DAY_HOUR = 6;
const NIGHT_HOUR = 18;

const swictherTheme = document.querySelector('.toggle');
const hours = new Date().getHours();
toggle.checked = hours > DAY_HOUR && hours < NIGHT_HOUR;

const root = document.documentElement;
const content = document.getElementById("content");
const screenWidth = window.screen.width;

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
  fetchDailyWeatherForecast(latitude, longitude);
} else {  
  drawEmptyStateLocation();
  const activeGeolocationBtn = document.getElementById("active-geolocation-btn");
  activeGeolocationBtn.addEventListener('click', getGeolocation);
}


async function fetchDailyWeatherForecast(latitude, longitude) {
  try {
    const apiKey = '1f3f6d432735dbd4373eea176b2889eb';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('La solicitud no pudo completarse correctamente.');
    }

    const data = await response.json();

    // Organizamos el pronóstico por día
    const dailyForecast = {};
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toDateString();

      if (!dailyForecast[day]) {
        dailyForecast[day] = [];
      }

      dailyForecast[day].push(item);
    });
    //this.drawContainerWeather(dailyForecast)
    console.log(data);
    this.drawContainerWeather(data);
    console.log(dailyForecast);
  } catch (error) {
    console.error('Ocurrió un error al obtener el pronóstico diario del tiempo:', error);
  }
}

function drawContainerWeather(data){

  const weatherForecastRosario = new WeatherForecast(data);
  const {city, forecast} = weatherForecastRosario;
  const todayWeather = forecast[0];
  const { weather: { description: weatherDesctiption, main: weatherMain}, temperature: { max: tempMax, min: tempMin}} = todayWeather;
  
  content.innerHTML = `
  <div class='row'>
    <div class='col text-center'>
      <h2 class='pb-50'>${city.name ? city.name : "No found"}</h2>
    </div>
  </div>
  <div class='row main__content__today'>
    <div class='col-12 text-center'>
      <i class="wi ${weatherIcon(weatherDesctiption)}"></i>
      <h3>${weatherMain ? weatherMain :  "No Data"} | ${tempMax | "0" }° | ${tempMin | "0" }°</h3>
      ${forecast[0] && `<button class='btn btn-primary' id='more-details-btn'>More details</button>`}
      </div>
  </div>
  <div class='row main__content__other_days align-items-sm-center'> 
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="four-days-tab" data-bs-toggle="pill" data-bs-target="#four-days" type="button" role="tab" aria-controls="four-days" aria-selected="true">4 days</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="eight-days-tab" data-bs-toggle="pill" data-bs-target="#eight-days" type="button" role="tab" aria-controls="eight-days" aria-selected="false">8 days</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="four-days" role="tabpanel" aria-labelledby="four-days-tab" tabindex="0">
        <div class="row">
        </div> 
      </div> 
      <div class="tab-pane fade" id="eight-days" role="tabpanel" aria-labelledby="eight-days-tab" tabindex="0">
        <div class="row">
        </div> 
      </div> 
    </div> 
  </div>`;

  const otherDaysContainer = document.querySelector('#four-days .row');
  const otherDaysContainer2 = document.querySelector('#eight-days .row');

  forecast.forEach((day, index) =>{
    const { date, weather: { description: weatherDesctiption }, temperature: { max: tempMax, min: tempMin}} = day;
    if(index > 0){
      if(index <= 4){
        const fourDaysHtml = `
        <div class='col-6 col-md-3 text-center'>
          <h4>${convertDate(date)}</h4>
          <i class="wi ${weatherIcon( weatherDesctiption || "")}"></i>
          <h3>${ tempMax || "0"}°/${ tempMin || "0" }°</h3>
        </div>`;
        otherDaysContainer.innerHTML += fourDaysHtml;
      }

      if (index <= 8){
        const eightDaysHtml = `
        <div class='col-6 col-md-1 text-center'>
          <h4>${convertDate(date)}</h4>
          <i class="wi ${weatherIcon( weatherDesctiption || "")}"></i>
          <h3>${ tempMax || "0"}°/${ tempMin || "0" }°</h3>
        </div>`;
        otherDaysContainer2.innerHTML += eightDaysHtml;
      }
    }
  })


  if(todayWeather){
    const moreDetailsBtn = document.getElementById("more-details-btn");
    moreDetailsBtn.addEventListener('click', function() {
      moreDetails(todayWeather);
    });
  }
}

function moreDetails(day){
  const {sunrise, sunset, pressure, humidity} = day;
  Swal.fire({
    title: "Details",
    customClass: 'swal-wide',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    background: toggle.checked ? '#2a8bb1' : '#06294a',
    html:
    `<div class="container align-items-center">
      <div class="row align-items-center details">
        <div class="col-6 col-md-3">
          <i class="wi wi-horizon-alt"></i> <p>Sunrise</p>
          <p>${sunrise.getHours()}:${sunrise.getMinutes()}</p>
        </div>
        <div class="col-6 col-md-3">
          <i class="wi wi-horizon"></i> <p>Sunset</p>
          <p>${sunset.getHours()}:${sunset.getMinutes()}</p>
        </div>
        <div class="col-6 col-md-3">
          <i class="wi wi-barometer"></i> <p>Pressure</p>
          <p>${pressure}</p>
        </div>
        <div class="col-6 col-md-3">
          <i class="wi wi-humidity"></i> <p>Humidity</p>
          <p>${humidity}%</p>
        </div>
      </div>
      </div>`,
    showCloseButton: true,
    showConfirmButton: false
  });
}

function drawEmptyStateLocation(){
  content.innerHTML = `
  <div class='row d-flex justify-content-center'>
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
      openModalWarning();
    }
  )
}


function openModalWarning() {
  Swal.fire({
    title: 'Are you sure?',
    text: "If you do not enable geolocation, you won't be able to use the weather app. We apologize for any inconvenience.",
    icon: 'warning',
    showCloseButton: true,
    showConfirmButton: false
  });
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

function convertDate(date) {
  if(date){
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
  
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return formattedDate;
    }
  } else {
    return "No data";
  }
}