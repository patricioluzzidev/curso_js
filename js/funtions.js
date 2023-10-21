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
      case "mist || fog":
        return "wi-fog";
      case "light rain":
      case "moderate rain":
      case "drizzle":
        return "wi-day-rain-mix";
      case "heavy rain":
        return "wi-day-rain";
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

  function openModalWarning() {
    Swal.fire({
      title: 'Are you sure?',
      text: "If you do not enable geolocation, you won't be able to use the weather app. We apologize for any inconvenience.",
      icon: 'warning',
      showCloseButton: true,
      showConfirmButton: false
    });
  }
  
  function openModalError(error) {
    Swal.fire({
      title: 'Upps!',
      text: "Something is wrong: " + error,
      icon: 'error',
      showCloseButton: true,
      showConfirmButton: false
    });
  }