import * as ErrorHandler from "./ErrorHandler";
import { LeftBar } from "./LeftBar";
import { MainContainer } from "./MainContainer";

export class App {
  constructor(api) {
    const leftBar = new LeftBar(api);
    this.forecast = leftBar.forecast;

    const mainContainer = new MainContainer(api);

    document.addEventListener("buttonClick", (event) => {
      mainContainer.processForecast(event.detail);
    });
  }
}
