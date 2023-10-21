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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error endpoint!');
    }

    const data = await response.json();

    this.drawContainerWeather(data);

  } catch (error) {
    this.openModalError(error);
  }
}

function drawContainerWeather(data){

  const weatherData = new WeatherPerDay(data);
  const { weather} = weatherData;
  const { description: weatherDesctiption, main: weatherMain} = weather;
  
  content.innerHTML = `
  <div class='row'>
    <div class='col text-center'>
      <h2 class='pb-50'>${weatherData.name ? weatherData.name : "No found"}</h2>
    </div>
  </div>
  <div class='row main__content__today'>
    <div class='col-12 text-center'>
      <i class="wi ${weatherIcon(weatherDesctiption)}"></i>
      <h3>${weatherMain ? weatherMain :  "No Data"} | ${weatherData.main.temp_max | "0" }° | ${weatherData.main.temp_min | "0" }°</h3>
      ${ weather && `<button class='btn btn-primary' id='more-details-btn'>More details</button>`}
      </div>
  </div>
  `
  /*
  <div class='row main_content_other_days align-items-sm-center'> 
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

  */
  if(weatherData){
    const moreDetailsBtn = document.getElementById("more-details-btn");
    moreDetailsBtn.addEventListener('click', function() {
      moreDetails(weatherData);
    });
  }
}

function moreDetails(day){
  const {sunset, sunrise} = day;
  const {pressure, humidity} = day.main;

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
          <p>${sunrise ? sunrise.getHours() : 0 }:${sunrise ? sunrise.getMinutes() : 0}</p>
        </div>
        <div class="col-6 col-md-3">
          <i class="wi wi-horizon"></i> <p>Sunset</p>
          <p>${sunset ? sunset.getHours() : 0 }:${sunset ? sunset.getMinutes() : 0}</p>
        </div>
        <div class="col-6 col-md-3">
          <i class="wi wi-barometer"></i> <p>Pressure</p>
          <p>${pressure ? pressure : 'No data'}</p>
        </div>
        <div class="col-6 col-md-3">
          <i class="wi wi-humidity"></i> <p>Humidity</p>
          <p>${pressure ? humidity : 'No data'}%</p>
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
      fetchDailyWeatherForecast(position.coords.latitude, position.coords.longitude);
     },() => {
      openModalWarning();
    }
  )
}