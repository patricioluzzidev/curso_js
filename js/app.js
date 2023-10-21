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
  drawLoading();
  fetchDailyWeatherForecast(latitude, longitude);
} else {  
  drawEmptyStateLocation();
  const activeGeolocationBtn = document.getElementById("active-geolocation-btn");
  activeGeolocationBtn.addEventListener('click', getGeolocation);
}


async function fetchDailyWeatherForecast(latitude, longitude) {
  try {
    const apiKey = '1f3f6d432735dbd4373eea176b2889eb';
    const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const apiUrlForescast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    const responseWeather = await fetch(apiUrlWeather);
    const responseForecast = await fetch(apiUrlForescast);

    if (!responseWeather.ok || !responseForecast.ok) {
      throw new Error('Error endpoints!');
    } else {
      const dataWeather = await responseWeather.json();
      const dataForecast = await responseForecast.json();
      this.drawContainerWeather(dataWeather);
      this.drawContainerForescast(dataForecast);  
    }

  } catch (error) {
    this.openModalError(error);
  }
}

function drawContainerWeather(data){

  const weatherData = new WeatherPerDay(data);
  const { weather, main: {temp_max, temp_min}} = weatherData;
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
      <h3>${weatherMain ? weatherMain :  "No Data"} | ${ temp_max ? temp_max : "0" }° | ${ temp_min ? temp_min : "0" }°</h3>
      ${ weather && `<button class='btn btn-primary' id='more-details-btn'>More details</button>`}
      </div>
  </div>
  <div class='row main__content__other__days align-items-sm-center'>
    <ul class="nav nav-tabs" id="myTabHeader" role="tablist">
    </ul>
    <div class="tab-content" id="myTabContent"> 
    </div>
  </div>`

  if(weatherData){
    const moreDetailsBtn = document.querySelector("#more-details-btn");
    moreDetailsBtn.addEventListener('click', function() {
      moreDetails(weatherData);
    });
  }
}

function drawContainerForescast(data){
  const forescastData = new ForecastData(data);
  const groupedByDay = forescastData.groupByDay();

  const main__content__other__days = document.querySelector('.main__content__other__days'); 
  main__content__other__days.innerHTML = `
  <div class='row main__content__other__days align-items-sm-center'>
    <ul class="nav nav-tabs justify-content-center" id="myTabHeader" role="tablist">
    </ul>
    <div class="tab-content" id="myTabContent"> 
    </div>
  </div>`;
  
  const myTabHeader = document.querySelector('#myTabHeader');
  const myTabContent = document.querySelector('#myTabContent');
  const limitDay = 2;

  groupedByDay.forEach((day, index) =>{

    if(index <= limitDay){
      myTabHeader.innerHTML += `
      <li class="nav-item" role="presentation">
        <button class="nav-link ${ index === 0 ? 'active' : '' }" id="${ day.date }-tab" data-bs-toggle="pill" data-bs-target="#${ day.date }" type="button" role="tab" aria-controls="${ day.date }" aria-selected="true">${ index === 0 ? 'TODAY' : day.date.toUpperCase() }</button>
      </li>`

      myTabContent.innerHTML += `
      <div class="tab-pane fade show ${ index === 0 ? 'active' : '' }" id="${ day.date }" role="tabpanel" aria-labelledby="${ day.date }-tab" tabindex="0">
        <div class="row justify-content-center"></div>
      </div>`

      day.weatherData.forEach((weatherItem) => {
        const weatherData = new WeatherPerDay(weatherItem);
        const { weather, main: {temp_max, temp_min}, date } = weatherData;
        const { description: weatherDesctiption } = weather;
       
        const divContent = document.querySelector(`#${ day.date } .row`);
        divContent.innerHTML +=`
        <div class='col-12 col-md-1 text-center'>
          <h2>${ date }hs</h2>
          <i class="wi ${weatherIcon( weatherDesctiption || "")}"></i>
          <h3>${ temp_max ? temp_max : "0" }° | ${ temp_min ? temp_min : "0" }°</h3>
        </div>`;
      })
    }
  })
}


function getGeolocation(){
  navigator.geolocation.getCurrentPosition(
    (position) => {
      localStorage.setItem('latitude', position.coords.latitude);
      localStorage.setItem('longitude', position.coords.longitude)
      drawLoading();
      fetchDailyWeatherForecast(position.coords.latitude, position.coords.longitude);
     },() => {
      openModalWarning();
    }
  )
}