function drawEmptyStateLocation() {
  content.innerHTML = `
  <div class='row d-flex justify-content-center'>
    <div class='col text-center'>
    <div class='main__content__image__geolocation pb-50'></div>
    <h2 class='pb-50' data-aos="fade">Enable geolocation & check the weather</h2>
      <button class='btn btn-primary' id='active-geolocation-btn'>Active geolocation</button>
    </div>
  </div>`;
}

function openModalWarning() {
  Swal.fire({
    title: "Are you sure?",
    text: "If you do not enable geolocation, you won't be able to use the weather app. We apologize for any inconvenience.",
    icon: "warning",
    showCloseButton: true,
    showConfirmButton: false,
  });
}

function openModalError(error) {
  Swal.fire({
    title: "Upps!",
    text: "Something is wrong: " + error,
    icon: "error",
    showCloseButton: true,
    showConfirmButton: false,
  });
}

function drawLoading() {
  content.innerHTML = `
      <div class='row'>
        <div class='col text-center'>
          <span class="loader"></span>
        </div>
      </div>`;
}

function moreDetails(day) {
  const { sunset, sunrise } = day;
  const { pressure, humidity } = day.main;

  Swal.fire({
    title: "Details",
    customClass: "swal-wide",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    background: toggle.checked ? "#2a8bb1" : "#06294a",

    html: `<div class="container align-items-center">
        <div class="row align-items-center details">
          <div class="col-6 col-md-3">
            <i class="wi wi-horizon-alt"></i> <p>Sunrise</p>
            <p>${sunrise ? sunrise.getHours() : 0}:${ sunrise ? sunrise.getMinutes() : 0 }</p>
          </div>
          <div class="col-6 col-md-3">
            <i class="wi wi-horizon"></i> <p>Sunset</p>
            <p>${sunset ? sunset.getHours() : 0}:${ sunset ? sunset.getMinutes() : 0 }</p>
          </div>
          <div class="col-6 col-md-3">
            <i class="wi wi-barometer"></i> <p>Pressure</p>
            <p>${pressure ? pressure : "No data"}</p>
          </div>
          <div class="col-6 col-md-3">
            <i class="wi wi-humidity"></i> <p>Humidity</p>
            <p>${pressure ? humidity : "No data"}%</p>
          </div>
        </div>
      </div>`,
    showCloseButton: true,
    showConfirmButton: false,
  });
}

function weatherIcon(descripcion) {
  switch (descripcion.toLowerCase()) {
    case "clear sky":
      return "wi-day-sunny";
    case "few clouds":
      return "wi-day-sunny-overcast";
    case "scattered clouds":
    case "broken clouds":
      return "wi-day-cloudy";
    case "overcast clouds":
      return "wi-cloud";
    case "mist":
    case  "fog":
      return "wi-fog";

    case "light rain":
    case "moderate rain":
    case "drizzle":
      return "wi-day-rain-mix";
    case "heavy rain":
    case "heavy intensity rain":  
      return "wi-rain";
    case "light snow":
    case "moderate snow":
    case "snow showers":
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
