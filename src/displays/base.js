
import Evented from 'displays/evented';

class Base extends Evented {

  appendChild(node) {
    this._sel.appendChild(node.getElem());
    node._parent = this._sel;
  }

  appendToDom(elem) {
    elem.appendChild(this.getElem());
  }

  createDomElement(doc, type, text, cancel) {
    let func = type == 'svg' ? this.createSvgElement : this.createNonSvgElement;
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

  getElem() {
    return this._sel;
  }

  remove() {
    this._sel.remove();
  }
}

export default Base;