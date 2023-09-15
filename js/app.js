
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

      const namesArray = locations.map((location) => location.name);
      let chooseLocation = prompt( "¿Quieres ver el clima de " + namesArray + '?');
      
      let locationFind = locations.find( location => { return location.name.toLowerCase() == chooseLocation.toLowerCase()})
      if(locationFind) {
        locationFind.alertWeather();
      } else{
        alert(
          "No se encontraron datos con: " + chooseLocation);
      }
    },
    () => {
      alert(
        "¡Si quieres saber el clima de tu ciudad, activa la ubicación del navegador!"
      );
    }
  );
}