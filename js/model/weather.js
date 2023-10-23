function WeatherPerDay(data) {
    this.weather = data.weather[0];
    this.main = data.main;
    this.sunrise = new Date(data.sys.sunrise * 1000);
    this.sunset = new Date(data.sys.sunset * 1000);
    this.name = data.name;
    this.date = new Date(data.dt_txt).getHours();
}

class ForecastData {
    constructor(data) {
      this.data = data;
    }
  
    groupByDay() {
      const groupedData = [];
  
      this.data.list.forEach(entry => {
        const dt_txt = entry.dt_txt;
        const date = new Date(dt_txt).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const isToday = isTodayF(dt_txt);
    
        function isTodayF(dt) {
            const today = new Date();
            const inputDate = new Date(dt);
    
            return (
                today.toDateString() === inputDate.toDateString()
            );
        }
    
        const existingEntry = groupedData.find(item => item.date === date);
  
        if (!existingEntry) {
          const newEntry = {
            date: date,
            isToday: isToday,
            weatherData: [entry],
          };
          groupedData.push(newEntry);
        } else {
          existingEntry.weatherData.push(entry);
        }
      });
  
      return groupedData;
    }
  }