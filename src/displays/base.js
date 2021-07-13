
import Evented from 'displays/evented';

class Base extends Evented {

  appendChild(node) {
    this.elem.appendChild(node.elem);
    node._parent = this.elem;
  }

  appendToDom(elem) {
    elem.appendChild(this.elem);
  }

  createDomElement(doc, type, text, cancel='') {
    let func = (['svg', 'g', 'text', 'rect', 'foreignobject'].indexOf(type.toLowerCase()) >= 0) ? this.createSvgElement : this.createNonSvgElement;
    let elem = func.call(this, doc, type);
    elem.innerHTML = text;
    elem._svg = text;
    elem._cancel = cancel;
    return elem;
  }

  createNonSvgElement(doc, type) {
    return doc.createElement(type);
  }

  createSvgElement(doc, type) {
    return doc.createElementNS("http://www.w3.org/2000/svg", type);
  }

  remove() {
    this.elem.remove();
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