import * as ErrorHandler from "./ErrorHandler";
import { LeftBar } from "./LeftBar";

export class App {
  constructor(api) {
    const leftBar = new LeftBar(api);
  }
}
