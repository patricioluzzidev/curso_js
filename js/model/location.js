function Location(name, latitude, longitude, weatherList){
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.weatherList = weatherList;

    this.alertLocation = () => {
        alert(
            "Tu ubicación es: " +
              this.name +
              " Latitud " +
              this.latitude +
              " Longitud " +
              this.longitude
          );    
    }

    this.alertWeather = () => {
        this.weatherList.forEach( weather => {
            weather.alertWeatherDay();
        });   
    }
}