
import Evented from 'displays/abstract/evented';

abstract class Base extends Evented {
  private _sel: any;

  appendChild(node: any): void {
    this.appendChildByElement(node.elem);
    node._parent = this.elem;
  }

  appendChildByElement(elem: any): void {
    this.elem.appendChild(elem);
  }

  removeChild(node: any): void {
    this.removeChildByElement(node.elem);
    node._parent = undefined;
  }

  removeChildByElement(elem: any): void {
    this.elem.removeChild(elem);
  }

  setAttribute(key: string, value: any): void {
    this.elem.setAttribute(key, value);
  }

  createDomElement(doc: any, type: string, text: string, cancel:string = ''): HTMLElement {
    let func: any = (['svg', 'g', 'text', 'rect', 'foreignobject'].indexOf(type.toLowerCase()) >= 0) ? this.createSvgElement : this.createNonSvgElement;
    let elem: any = func.call(this, doc, type);
    elem.innerHTML = text;
    elem._svg = text;
    elem._cancel = cancel;
    return elem;
  }

  createNonSvgElement(doc: any, type: string): HTMLElement {
    return doc.createElement(type);
  }

  createSvgElement(doc: any, type: string): HTMLElement {
    return doc.createElementNS("http://www.w3.org/2000/svg", type);
  }

  remove(): void {
    this.elem.remove();
  }

  overlap(base: Base): boolean {
    const rect1 = base.elem.getBoundingClientRect();
    const rect2 = this.elem.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
      rect1.left > rect2.right || 
      rect1.bottom < rect2.top || 
      rect1.top > rect2.bottom);
  }

  get elem() {
    return this._sel;
  }

  set elem(elem) {
    this._sel = elem;
    elem.node = this;
  }
}

export default Base;