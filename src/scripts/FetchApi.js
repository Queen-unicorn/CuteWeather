import * as ErrorHandler from "./ErrorHandler";

export class FetchApi {
  search(query = "", units = "metric") {
    if (!query) return;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${
      query.split(" ")[0]
    }&lon=${
      query.split(" ")[1]
    }&exclude=minutely,hourly&appid=e80bc8c57f85cc1f7f614031bc6bf037&units=${units}`;
    return fetch(url).then(
      (result) => result.json(),
      (error) => ErrorHandler.handleError(error)
    );
  }
}
