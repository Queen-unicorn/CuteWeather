export class LeftBar {
  constructor(api) {
    this.leftBar = document.querySelector("left-bar");
    this.api = api;
    this.forecast = {};

    this.searchInput = document.getElementsByClassName(
      "left-bar__search__input"
    )[0];

    this.searchButton = document.getElementsByClassName(
      "left-bar__search__button"
    )[0];

    this.searchInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.search();
      }
    });

    this.searchButton.addEventListener("click", (event) => {
      this.search();
    });
  }

  search() {
    this.query = this.searchInput.value;

    if (!this.query) {
      this.searchInput.dataset.isEmpty = true;
      return;
    } else {
      this.searchInput.dataset.isEmpty = true;
    }

    this.fetchCoordApi();
  }

  fetchCoordApi() {
    this.api.fetchLatLon(this.query).then(
      (fetchedInfo) => {
        this.fetchApi(fetchedInfo);
      },
      (error) => ErrorHandler.handleError(error)
    );
  }

  fetchApi(fetchedCoordInfo) {
    if (!fetchedCoordInfo.coord) {
      this.searchInput.dataset.isWrong = true;
      return;
    }

    delete this.searchInput.dataset.isWrong;
    this.api
      .forecastSearch(fetchedCoordInfo.coord.lon, fetchedCoordInfo.coord.lat)
      .then(
        (fetchedInfo) => {
          this.processSearchResult(fetchedInfo);
        },
        (error) => ErrorHandler.handleError(error)
      );
  }

  processSearchResult(fetchedInfo) {
    for (let key of ["lat", "lon", "timezone"]) {
      this.forecast[key] = fetchedInfo[key];
    }

    for (let key of [
      "temp",
      "feels_like",
      "pressure",
      "clouds",
      "wind_speed",
      "weather",
      "humidity",
      "sunrise",
      "sunset",
    ]) {
      this.forecast[key] = fetchedInfo.current[key];
    }

    this.forecast["daily"] = {};
    for (let i = 0; i <= 7; ++i) {
      this.forecast["daily"][i] = {};
      for (let key of ["temp", "weather"]) {
        this.forecast["daily"][i][key] = fetchedInfo["daily"][i][key];
      }
    }
    this.showLeftBar();
    this.dispatchOnForecastLoadedEvent();
  }

  showLeftBar() {
    const currDay = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const htmlStr = `
    <img class="left-bar__current-weather__image" src="http://openweathermap.org/img/wn/${
      this.forecast.weather[0].icon
    }@4x.png"/>
    <div class="left-bar__current-weather__temperature-block">
        <p class="left-bar__current-weather__temperature-block__temp">${
          Math.round(+this.forecast.temp * 10) / 10
        }</p>
        &nbsp
        <p class="left-bar__current-weather__temperature-block__measure">°C</p>
    </div>
    <p class="left-bar__current-weather__timezone">${this.forecast.timezone}</p>
    <p class="left-bar__current-weather__time">${days[currDay.getDay()]}, ${
      currDay.getHours() + ":" + currDay.getMinutes()
    }</p>
    <hr/>
    <p class="left-bar__current-weather__clouds">${
      this.forecast.clouds + " %"
    }</p>
    <p class="left-bar__current-weather__pressure">&nbsp${
      this.forecast.pressure + " hpa"
    }</p>`;

    const weatherContentDiv = document.getElementsByClassName(
      "left-bar__current-weather"
    )[0];

    weatherContentDiv.innerHTML = htmlStr;
  }

  dispatchOnForecastLoadedEvent() {
    const eventButtonClicked = new CustomEvent("buttonClick", {
      detail: this.forecast,
    });
    document.dispatchEvent(eventButtonClicked);
  }
}
