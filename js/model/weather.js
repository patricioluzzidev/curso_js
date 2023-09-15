function Weather(day, tempMax, tempMin, description){
    this.day = day;
    this.tempMax = tempMax;
    this.tempMin = tempMin;
    this.description = description;


    this.alertWeatherDay = () => {
        alert(
            "Día " +
            this.day +
              " \n" +
            this.description +
              " \nMin: " +
            this.tempMin +
              " Max: " +
            this.tempMax
          );
    }
}