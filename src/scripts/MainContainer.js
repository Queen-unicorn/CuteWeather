export class MainContainer {
  constructor(api) {
    this.forecast;
    this.api = api;
  }

  processForecast(forecast) {
    this.forecast = forecast;
    this.showForecast();
  }

  showForecast() {
    const currDay = new Date();
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const mainContainer = document.getElementsByClassName("main-container")[0];

    let htmlStr = `
    <div class="main-container__week-forecast">
        <p class="main-container__week-forecast__title">Next week forecast for ${this.forecast.city}</p>
        <div class="main-container__week-forecast__container">`;
    for (let [key, forecast] of Object.entries(this.forecast.daily)) {
      if (key !== "0") {
        htmlStr += ` 
            <div class="main-container__week-forecast__container__item">
                <p class="main-container__week-forecast__container__item__day">${
                  days[(key - 1 + currDay.getDay()) % 7]
                }</p>
                <img class="main-container__week-forecast__container__item__img" src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@4x.png"/>
                <div class="main-container__week-forecast__container__item__temp">
                    <p class="main-container__week-forecast__container__item__temp--max">${
                      Math.floor(forecast.temp.max * 10) / 10
                    } °C</p>
                    <p class="main-container__week-forecast__container__item__temp--min">${
                      Math.floor(forecast.temp.min * 10) / 10
                    } °C</p>
                </div>
            </div>`;
      }
    }
    htmlStr += `        
        </div>
    </div>
    <div class="main-container__highlight">
        <p class="main-container__highlight__title">Today's highlight</p>
        <div class="main-container__highlight__container">
            <div class="main-container__highlight__container__item">
                <p class="main-container__highlight__container__item__title">Max & Min temp</p>
                <div class="main-container__highlight__container__item__temp">
                    <p class="main-container__highlight__container__item__temp--max">${
                      this.forecast.daily["0"].temp.max
                    } °C</p>
                    <p class="main-container__highlight__container__item__temp--min">${
                      this.forecast.daily["0"].temp.min
                    } °C</p>
                </div>
            </div>
            <div class="main-container__highlight__container__item">
                <p class="main-container__highlight__container__item__title">Wind speed</p>
                <div class="main-container__highlight__container__item__wind-speed">
                    <p class="main-container__highlight__container__item__wind-speed">${
                      this.forecast.wind_speed
                    } metre/sec</p>
                </div>
            </div>
            <div class="main-container__highlight__container__item">
                <p class="main-container__highlight__container__item__title">Humidity</p>
                <div class="main-container__highlight__container__item__humidity">
                    <p class="main-container__highlight__container__item__humidity">${
                      this.forecast.humidity
                    } %</p>
                </div>
            </div>
            <div class="main-container__highlight__container__item">
                <p class="main-container__highlight__container__item__title">Sunrise & Sunset</p>
                <div class="main-container__highlight__container__item__sunrise-sunset">
                    <p class="main-container__highlight__container__item__sunrise-sunset__sunrise">${
                      "" +
                      new Date(this.forecast.sunrise * 1000).getHours() +
                      ":" +
                      new Date(this.forecast.sunrise * 1000).getMinutes()
                    }</p>
                    <p class="main-container__highlight__container__item__sunrise-sunset__sunset">${
                      "" +
                      new Date(this.forecast.sunset * 1000).getHours() +
                      ":" +
                      new Date(this.forecast.sunset * 1000).getMinutes()
                    }</p>
                </div>
            </div>
        </div>
    </div>`;
    mainContainer.innerHTML = htmlStr;
  }
}
