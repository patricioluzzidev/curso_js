const currentHour = new Date().getHours();
const DAY_HOUR = 6;
const NIGHT_HOUR = 18;

const swictherTheme = document.querySelector('.toggle');
const hours = new Date().getHours();
toggle.checked = hours > DAY_HOUR && hours < NIGHT_HOUR;

const root = document.documentElement;
const content = document.getElementById("content");
const images = document.getElementsByClassName('image');


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
let position = null;
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
  content.innerHTML = `
  <div class='row'>
    <div class='col text-center'>
      <h2 class='pb-50'>Rosario</h2>
    </div>
  </div>
  <div class='row main__content__today'>
    <div class='col-12 text-center'>
      <i class="wi wi-day-sunny"></i>
      <h3>Max. 23° Min. 16°</h3>
      <span class="main__content__today__weather">Clear</span>
    </div>
  </div>
  <div class='row main__content__other_days'>
    <div class='col-2 text-center'>
      <i class="wi wi-day-sunny"></i>
      <h3>Max. 23° Min. 16°</h3>
      <span class="main__content__today__weather">Clear</span>
    </div>
    <div class='col-2 text-center'>
      <i class="wi wi-day-sunny"></i>
      <h3>Max. 23° Min. 16°</h3>
      <span class="main__content__today__weather">Clear</span>
    </div>
    <div class='col-2 text-center'>
      <i class="wi wi-day-sunny"></i>
      <h3>Max. 23° Min. 16°</h3>
      <span class="main__content__today__weather">Clear</span>
    </div>
    <div class='col-2 text-center'>
      <i class="wi wi-day-sunny"></i>
      <h3>Max. 23° Min. 16°</h3>
      <span class="main__content__today__weather">Clear</span>
    </div>
    <div class='col-2 text-center'>
      <i class="wi wi-day-sunny"></i>
      <h3>Max. 23° Min. 16°</h3>
      <span class="main__content__today__weather">Clear</span>
    </div>
    <div class='col-2 text-center'>
      <i class="wi wi-day-sunny"></i>
      <h3>Max. 23° Min. 16°</h3>
      <span class="main__content__today__weather">Clear</span>
    </div>    
  </div>`;
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


/*
function myFunction() {
  mode = (mode === "light") ? "dark" : "light";
  labelMode.innerText = (mode === "light") ? "Light Mode" : "Dark Mode";
  img.src = (mode === "light") ? "assets/img/20945751.png" : "assets/img/20945752.png";
  console.log(mode)
 if(mode == "light"){
  containerTheme.classList.add("light");
  containerTheme.classList.remove("dark");
 }else{
  console.log("Entra aca")
  containerTheme.classList.remove("light");
  containerTheme.classList.add("dark");
 }
}
*/

/*


const today = new Date();
const locations = [];

const rosarioWeather = [];
rosarioWeather.push(new Weather(today.getDate() + '/' + today.getFullYear(), '35°', '23°', 'Soleado ☀️'));
rosarioWeather.push(new Weather(today.getDate() + 1 + '/' + today.getFullYear(), '30°', '20°', 'Nublado 🌥️'));
rosarioWeather.push(new Weather(today.getDate() + 2 + '/' + today.getFullYear(), '40°', '21°', 'Soleado ☀️'));
rosarioWeather.push(new Weather(today.getDate() + 3 + '/' + today.getFullYear(), '28°', '16°', 'Lluvioso 🌧️'));
rosarioWeather.push(new Weather(today.getDate() + 4 + '/' + today.getFullYear(), '28°', '18°', 'Nublado ☀️' ));

const rosarioLocation = new Location("Rosario", '-32.9597692', ' -60.6632024', rosarioWeather);


const dublinWeather = [];
dublinWeather.push(new Weather(today.getDate() + '/' + today.getFullYear(), '17°', '11°', 'Lluvioso 🌧️'));
dublinWeather.push(new Weather(today.getDate() + 1 + '/' + today.getFullYear(), '16°', '10°', 'Lluvioso 🌧️'));
dublinWeather.push(new Weather(today.getDate() + 2 + '/' + today.getFullYear(), '18°', '9°', 'Lluvioso 🌧️'));
dublinWeather.push(new Weather(today.getDate() + 3 + '/' + today.getFullYear(), '15°', '6°', 'Lluvioso 🌧️'));
dublinWeather.push(new Weather(today.getDate() + 4 + '/' + today.getFullYear(), '16°', '9°', 'Nublado 🌥️' ));

const dublinLocation = new Location("Dublin", '20.9585692', ' -20.6632024', dublinWeather);

locations.push(rosarioLocation, dublinLocation);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const myLocationWeather = [];

      myLocationWeather.push(new Weather(today.getDate() + '/' + today.getFullYear(), '30°', '18°', 'Soleado ☀️'));
      myLocationWeather.push(new Weather(today.getDate() + 1 + '/' + today.getFullYear(), '28°', '16°', 'Nublado 🌥️'));
      myLocationWeather.push(new Weather(today.getDate() + 2 + '/' + today.getFullYear(), '33°', '14°', 'Soleado ☀️'));
      myLocationWeather.push(new Weather(today.getDate() + 3 + '/' + today.getFullYear(), '25°', '10°', 'Lluvioso 🌧️'));
      myLocationWeather.push(new Weather(today.getDate() + 4 + '/' + today.getFullYear(), '28°', '10°', 'Nublado 🌥️' ));

      const myLocation = new Location("Mi ciudad", position.coords.latitude, position.coords.longitude, myLocationWeather);        
      locations.unshift(myLocation);

      myLocation.alertLocation();    

      const namesArray = locations.map((location) => location.name) ;
      let chooseLocation = prompt( "Quieres ver el clima de: \n \n" +  namesArray.join("\n"));
      console.log
      let locationFind = locations.find( location => { return location.name.toLowerCase().trim() === (chooseLocation ? chooseLocation.toLowerCase().trim() : '')})
      if(locationFind) {
        locationFind.alertWeather();
      } else{
        alert("No se encuentran datos con esa opción...");
      }
    },
    () => {
      alert(
        "¡Si quieres saber el clima de tu ciudad, activa la ubicación del navegador!"
      );
    }
  );
}

*/