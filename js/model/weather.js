function WeatherPerDay(data) {
    this.coord = data.coord;
    this.weather = data.weather[0];
    this.base = data.base;
    this.main = data.main;
    this.visibility = data.visibility;
    this.wind = data.wind;
    this.clouds = data.clouds;
    this.dt = data.dt;
    this.sys = data.sys;
    this.sunrise = new Date(data.sys.sunrise * 1000);
    this.sunset = new Date(data.sys.sunset * 1000);
    this.timezone = data.timezone;
    this.id = data.id;
    this.name = data.name;
    this.cod = data.cod;
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