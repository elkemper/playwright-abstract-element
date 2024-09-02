export default abstract class AbstractElement {
  protected abstract selector: string
  constructor(protected parent?: AbstractElement){
  }
}