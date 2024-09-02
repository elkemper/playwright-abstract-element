import { Locator } from "playwright-core";

export default abstract class AbstractElement {
  protected abstract selector: string
  constructor(protected parent?: AbstractElement){
  }

  protected abstract get element(): Locator
}