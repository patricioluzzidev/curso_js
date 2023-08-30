let miPosicion = null;

//  Consulto la geolocalizacion
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      miPosicion = position;
      alert(
        "Tu ubicación es:" +
          " Latitud " +
          miPosicion.coords.latitude +
          " Longitud " +
          miPosicion.coords.longitude
      );

      let cantidadDias;

      do {
        cantidadDias = +prompt( "¿Quieres ver el clima dentro de cuántos días? \n 1 \n 3\n 7");

        switch (cantidadDias) {
          case 1:
            alertarClima(1, "Parcialmente Nublado", "7°", "18°");
            break;

          case 3:
            for (let i = 1; i <= cantidadDias; i++) {
              if (i === 2) {
                alertarClima(i, "Parcialmente Nublado", "10°", "30°");
              } else {
                alertarClima(i, "Soleado", "14°", "35°");
              }
            }
            break;

          case 7:
            for (let i = 1; i <= cantidadDias; i++) {
              if (i <= 5) {
                alertarClima(i, "Lluvioso", "-3°", "7°");
              } else {
                alertarClima(i, "Nublado", "3°", "10°");
              }
            }
            break;

          default:
            alert("Opción Inválida");
            break;
        }
      } while (cantidadDias !== 1 && cantidadDias !== 3 && cantidadDias !== 7);
    },
    () => {
      alert(
        "¡Si quieres saber el clima de tu ciudad, activa la ubicación del navegador!"
      );
    }
  );
}

const alertarClima = (dia, clima, temperaturaMinima, temperaturaMaxima) => {
  alert(
    "Día " +
      dia +
      " \n " +
      clima +
      " \n Min: " +
      temperaturaMinima +
      " Max: " +
      temperaturaMaxima
  );
};
