var Base = require('displays/base');

export default class Button extends Base {
  private _enable: boolean;

  constructor(doc: any, icon: string, cancel?: string) {
    super();
    
    this.enable();

    let sel = this.elem = this.createDomElement(doc, 'span', icon, cancel);
    sel.setAttribute('style', 'padding: 0 5px;')
  }

  enable() {
    this._enable = true;
  }
  
  disable() {
    this._enable = false;
  }
}