export class MainContainer {
  constructor() {
    this.forecast;
  }

  processForecast(forecast) {
    this.forecast = forecast;
    this.showForecast();
    console.log(this.forecast);
  }

  showForecast() {
    const currDay = new Date();
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const mainContainer = document.getElementsByClassName("main-container")[0];

    let htmlStr = `
    <div class="main-container__week-forecast">
        <p class="main-container__week-forecast__title">Next week forecast</p>
        <div class="main-container__week-forecast__container">`;
    for (let [key, forecast] of Object.entries(this.forecast.daily)) {
      htmlStr += ` <div class="main-container__week-forecast__container__item">
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
    htmlStr += `        
        </div>
    </div>`;

    mainContainer.innerHTML = htmlStr;
  }
}
