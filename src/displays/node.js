import Draggable from 'displays/draggable';

class Node extends Draggable {

  constructor(doc, config={}, editable) {
    super();
    this._config = config;
    this._width = 60;
    this._height = 30;
    this._selected = false;
    this._editable = editable;
    
    this.initialize(doc);
  }

  setFillColor(color) {
    this._bg.setAttribute('style', `fill:${color};stroke-width:0.5;stroke:#0d47a1;opacity:0.7;`);
  }

  setFontColor(fontColor) {
    const {fontSize=11} = this._config;
    this._config.fontColor = fontColor;
    this._text.setAttribute('style', `font-size:${fontSize}px;color:${fontColor};overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;`);
  }
  
  initialize(doc) {
    const {x=0, y=0, title='', fontSize=11, color='#2962FF', fontColor='black', description=''} = this._config;

    let sel = this._sel = this.createSvgElement(doc, 'g');
    sel.setAttribute('transform', `translate(${x},${y})`);
  
    const PADDING = 3;
    let rect;
    this._bg = rect = this.createSvgElement(doc, 'rect');
    rect.setAttribute('width', this._width);
    rect.setAttribute('height', this._height);
    rect.setAttribute('rx', PADDING);
    rect.setAttribute('ry', PADDING);
    rect.setAttribute('style', `fill:${color};stroke-width:0.5;stroke:#0d47a1;opacity:0.7;`);
    sel.appendChild(rect);
  
    let foreignObject = this.createSvgElement(doc, 'foreignObject');
    foreignObject.setAttribute('x', PADDING);
    foreignObject.setAttribute('y', PADDING);
    foreignObject.setAttribute('width', this._width-2*PADDING);
    foreignObject.setAttribute('height', this._height-2*PADDING);

    let text;
    this._text = text = this.createNonSvgElement(doc, 'div');
    text.setAttribute('contenteditable', 'true');
    text.setAttribute('xmlns', "http://www.w3.org/1999/xhtml");
    text.setAttribute('style', `font-size:${fontSize}px;color:${fontColor};overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;`);
   
    text.innerHTML = title;

    foreignObject.appendChild(text);
    sel.appendChild(foreignObject);
  
    if (this._editable) this.draggable(sel);
  }

  destroy() {  
    //remove related links
    this.remove();
  }

  select() {
    super.select();
    this._sel.setAttribute('style', "stroke-width:1;stroke:blue;font-weight:bold");
  }

  unselect() {
    super.unselect();
    this._sel.setAttribute('style', `stroke-width:0.5;stroke:#0d47a1;`);
  }

  calculateTextSize(doc, font, txt) {
    let canvas = doc.createElement('canvas');
    let context = canvas.getContext("2d");
    context.font = font;
    let tsize = {'width':context.measureText(txt).width, 'height':parseInt(context.font)};
    return tsize;
  }

  setXY(x, y) {
    this._config.x = x;
    this._config.y = y;
    this._sel.setAttributeNS(null, 'transform', `translate(${x},${y})`);
  }

  getFaceCoords() {
    return ['u', 'l', 'r', 'd'].map(side => this.getFaceCoord(side));
  }

  getFaceCoord(side) {
    const {x=0, y=0} = this._config;
    var coord;
    switch(side) {
      case 'u':
        coord = {
          x: x + (this._width / 2),
          y: y,
          side: side
        };
        break;
      case 'l':
        coord = {
          x: x,
          y: y + (this._height / 2),
          side: side
        };
        break;
      case 'r':
        coord = {
          x: x + this._width ,
          y: y + (this._height / 2),
          side: side
        };
        break;
      case 'd':
        coord = {
          x: x + (this._width / 2),
          y: y + this._height,
          side: side
        };
        break;
    }
  
    return coord;
  }

  isTextEditable() {
    return this._text._editable;
  }

  makeTextEditable() {
    this._text._editable = true;
    this._text.setAttribute('contenteditable', 'true');
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(this._text, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    this.stopListening();
    this._text.onblur = () => {
      this._text._editable = false;
      this._text.setAttribute('contenteditable', 'false');
      this.startListening()
    };
  }

  exportAsJson() {
    const {x, y, title, fontSize, color, description=''} = this._config;
    return {
      "title": title,
      "description": description,
      "color": color,
      "x": x,
      "y": y
    };
  }
}

export default Node;