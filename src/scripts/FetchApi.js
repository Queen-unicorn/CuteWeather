import * as ErrorHandler from "./ErrorHandler";

export class FetchApi {
  forecastSearch(lon, lat, units = "metric") {
    if (!lon || !lat) return;

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=e80bc8c57f85cc1f7f614031bc6bf037&units=${units}`;
    return fetch(url).then(
      (result) => result.json(),
      (error) => ErrorHandler.handleError(error)
    );
  }

  fetchLatLon(query) {
    console.log(query);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=e80bc8c57f85cc1f7f614031bc6bf037`;
    return fetch(url).then(
      (result) => result.json(),
      (error) => ErrorHandler.handleError(error)
    );
  }
}
