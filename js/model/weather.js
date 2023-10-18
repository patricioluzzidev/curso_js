function WeatherForecast(data){
  this.city = data.city;
  this.cod = data.cod;
  this.message = data.message;
  this.forecast = [];

  if (Array.isArray(data.list)) {
      for (const dayData of data.list) {
          this.forecast.push(new WeatherDay(dayData));
      }
  }
}

function WeatherDay(data){
  this.date = new Date(data.dt * 1000); // Convierte el timestamp en una fecha.
  this.sunrise = new Date(data.sunrise * 1000);
  this.sunset = new Date(data.sunset * 1000);
  this.temperature = {
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max),
  };
  this.pressure = data.pressure;
  this.humidity = data.humidity;
  this.weather = {
      id: data.weather[0].id,
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
  };
  this.wind = {
      speed: data.speed,
      degree: data.deg,
  };
  this.clouds = data.clouds;
}