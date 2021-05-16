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

    this.fetchApi();
  }

  fetchApi() {
    this.api.search(this.query).then(
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
    ]) {
      this.forecast[key] = fetchedInfo.current[key];
    }

    this.forecast["daily"] = {};
    for (let i = 1; i <= 7; ++i) {
      this.forecast["daily"][i] = {};
      for (let key of ["temp", "weather"]) {
        this.forecast["daily"][i][key] = fetchedInfo["daily"][i][key];
      }
    }
    console.log(this.forecast);
    showLeftBar();
  }

  showLeftBar() {
    const htmlStr = ``;
  }
}
