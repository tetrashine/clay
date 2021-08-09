import Base from 'displays/abstract/base';

type ButtonOptions = {
  id: string, doc: any, svg: string, tooltip: string, 
  onClick?: (evt: MouseEvent)=>void, execFn?: ()=>void, cancelFn?: ()=>void, 
  cancelSvg?: string, enable?: boolean
};

export default class Button extends Base {
  private _enable: boolean;
  public execFn: ()=>void;
  public cancelFn: ()=>void;

  constructor(opts: ButtonOptions) {
    super();

    const {
      id, doc, svg, tooltip, 
      onClick, execFn, cancelFn, 
      cancelSvg='', enable=true
    } = opts;
    
    let sel: any = this.elem = this.createDomElement(doc, 'div', svg, cancelSvg);
    sel.setAttribute('id', id);
    sel.setAttribute('class', 'clay-mb e');

    const tooltipElem = this.createDomElement(doc, 'span', tooltip);
    tooltipElem.setAttribute('class', 'tooltiptext');
    sel.appendChild(tooltipElem);
    sel._svg = sel.innerHTML;

    Object.entries({
      'onclick': onClick,
    }).forEach(([name, fn]) => {
      if (fn) {
        sel[name] = fn;
      }
    });

    this.execFn = execFn;
    this.cancelFn = cancelFn;

    enable ? this.enable() : this.disable();
  }

  registerEvt(evt: string, fn: (evt: MouseEvent)=>void): void {
    this.elem[evt] = fn;
  }

  isEnable(): boolean {
    return this._enable;
  }

  enable() {
    this._enable = true;
    this.elem.setAttribute('class', 'clay-mb e');
  }
  
  disable() {
    this._enable = false;
    this.elem.setAttribute('class', 'clay-mb s');
  }

  toDefaultView() {
    this.elem.innerHTML = this.elem._svg;
  }

  toCancelView() {
    this.elem.innerHTML = this.elem._cancel;
  }
}