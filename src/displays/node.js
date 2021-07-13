import Draggable from 'displays/draggable';
import {ArrowDown, ArrowUp, Add, Delete} from 'displays/svg';
import SvgTable from 'displays/graphics/svgtable';

import { default as config } from 'constants/config';
const {
  NODE_WIDTH, NODE_HEIGHT, NODE_COLOR, NODE_DISABLED_COLOR, NODE_BORDER_COLOR, NODE_TEXT_COLOR, NODE_SELECTED_BORDER_COLOR, 
  NODE_STROKE_WEIGHT, NODE_PADDING, NODE_MAX_INPUT, NODE_MAX_OUTPUT, NODE_IO_SIZE, NODE_IO_SPACING,
  NODE_CONNECTOR_BORDER_COLOR, NODE_IO_HOVER_COLOR, NODE_IO_CONNECTOR_COLOR, BORDER_WIDTH,
} = config;

class Node extends Draggable {

  constructor(doc, nodeConfig, config={}) {
    super();
    const {width=NODE_WIDTH, height=NODE_HEIGHT, editable, attrs=[]} = config;
    this._doc = doc;
    this._config = config;
    this._width = width;
    this._height = height;
    this._selected = false;
    this._editable = editable;
    this._inputCount = 0;
    this._outputCount = 1;
    this._attrs = attrs;
    this._links = [];
    this._inputLinks = [];
    this._outputLinks = [];
    this._node = nodeConfig;
    this.validateNodeConfig(nodeConfig);
    this.parseNodeConfig(nodeConfig);
    
    this.initialize(doc, config);
  }

  validateNodeConfig(node) {
    if (!node || typeof(node) !== 'object') throw Error('Invalid NodeConfig: Invalid NodeConfig type.');

    const {type, inputs, outputs} = node;
    if (!type && typeof(type) !== 'string') throw Error('Invalid NodeConfig: Invalid type attribute.');
    if (this.validateIoType(type)) throw Error('Invalid NodeConfig: Invalid NodeConfig type. Can only accept "string", "boolean", "integer", "function"');

    if (type === 'function') {
      if (!inputs || !outputs) {
        throw Error('Invalid NodeConfig: No inputs or outputs in function node.');
      }
  
      if (!Array.isArray(inputs) || !Array.isArray(outputs)) {
        throw Error('Invalid NodeConfig: invalid inputs/outputs type.');
      }

      const ioNames = ['inputs', 'outputs'];
      [inputs, outputs].forEach((io, ioIndex) => {
        io.forEach((_, index) => {
          if (!_ && typeof(_) !== 'string') throw Error(`Invalid NodeConfig: Invalid ${ioNames[ioIndex]} type on index (${index}). Only string can be accepted.`);
          if (this.validateIoType(_)) throw Error(`Invalid NodeConfig: Invalid ${ioNames[ioIndex]} type on index (${index}). Values can only be "string", "boolean", "integer", "function"`);
        });
      });
    }
  }

  validateIoType(type) {
    return ['string', 'boolean', 'integer', 'function'].indexOf(type) < 0;
  }

  parseNodeConfig(node) {
    if (node.type === 'function') {
      this._inputCount = node.inputs.length;
      this._outputCount = node.outputs.length;;
    }
  }

  addLink(link) {
    this._links.push(link);
  }

  delLink(link) {
    this._links.splice(this._inputLinks.indexOf(link), 1);
  }

  setFillColor(color=NODE_COLOR) {
    this._bg.setAttribute('style', `fill:${color};stroke-width:${NODE_STROKE_WEIGHT};stroke:${NODE_BORDER_COLOR};filter:drop-shadow(0px 1px 1px rgba(0,0,0,.4));`);
  }

  setFontColor(fontColor) {
    const {fontSize=11} = this._config;
    this._config.fontColor = fontColor;
    this._text.setAttribute('style', `font-size:${fontSize}px;color:${fontColor};overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;`);
  }
  
  initialize(doc, config) {
    const {x=0, y=0, title='', fontSize=11, color=NODE_COLOR, fontColor=NODE_TEXT_COLOR, description=''} = config;

    let sel = this.elem = this.createSvgElement(doc, 'g');
    sel.setAttribute('transform', `translate(${x},${y})`);
  
    let rect;
    this._bg = rect = this.createSvgElement(doc, 'rect');
    rect.setAttribute('width', this._width);
    rect.setAttribute('height', this._height);
    rect.setAttribute('rx', NODE_PADDING);
    rect.setAttribute('ry', NODE_PADDING);
    this.setFillColor(color);
    sel.appendChild(rect);
  
    let foreignObject = this.createSvgElement(doc, 'foreignObject');
    foreignObject.setAttribute('class', 'no-mouse');
    foreignObject.setAttribute('x', NODE_PADDING);
    foreignObject.setAttribute('y', NODE_PADDING);
    foreignObject.setAttribute('width', this._width-2*NODE_PADDING);
    foreignObject.setAttribute('height', this._height-2*NODE_PADDING);

    let text;
    this._text = text = this.createNonSvgElement(doc, 'div');
    text.setAttribute('contenteditable', 'true');
    text.setAttribute('xmlns', "http://www.w3.org/1999/xhtml");
    text.setAttribute('style', `font-size:${fontSize}px;color:${fontColor};overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;`);

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

    //draw selected highlight
    let rect;
    this._selected = rect = this.createSvgElement(this._doc, 'rect');
    rect.setAttribute('class', 'highlight');
    rect.setAttribute('width', this._width);
    rect.setAttribute('height', this._height);
    this.elem.appendChild(rect);

    this.drawInputLinkables();
    this.drawOutputLinkables();
    this.drawMenu();

    this._links.forEach(link => link.redrawPath());
  }

  unselect() {
    super.unselect();

    ['.highlight', '#menu-btn', '#svg-table'].forEach(id => {
      const elem = this.elem.querySelector(id);
      if (elem !== null) {
        this.elem.removeChild(elem);
      }
    });

    this.removeLinkables();
    this._links.forEach(link => link.redrawPath());
  }

  drawMenu(open=false) {
    this._menuState = open;
    const gDom = this.createSvgElement(this._doc, 'g');
    gDom.setAttribute('id', `menu-btn`);
    gDom.setAttribute('style', `transform: translate(0,${this._height+10}px);`);

    const svg = open ? ArrowUp : ArrowDown;
    const arrowIcon = this.createDomElement(this._doc, 'g', svg).lastChild;
    this.appendIconAttrs(arrowIcon);

    const foreignObject = this.createSvgElement(this._doc, 'foreignObject');
    foreignObject.setAttribute('width', 25);
    foreignObject.setAttribute('height', 25);
    foreignObject.setAttribute('style', 'background-color:rgb(238,238,238);border-radius:15px;box-shadow:0px 2px 1px -1px rgb(0 0 0 / 20%),0px 1px 1px 0px rgb(0 0 0 / 14%),0px 1px 3px 0px rgb(0 0 0 / 12%);');

    gDom.appendChild(foreignObject);
    gDom.appendChild(arrowIcon);
    gDom.addEventListener('mousedown', (evt) => {
      evt.stopImmediatePropagation();
      this._menuState = !this._menuState;
      this.redrawMenu(this._menuState);
    });

    this.elem.appendChild(gDom);
  }

  generateTable(perm, attrs) {
    const table = SvgTable.generate(this._doc, 
      ['Input', 'Value', `<button class="icon-btn add-btn">${Add}</button`], 
      [
        ...perm,
        ...this.appendWithDeleteBtn(this.toEditable(attrs))
      ]
    );
    table.setAttribute('id', "svg-table");
    table.setAttribute('style', "transform:translate(0,70px);");
    table.onmousedown = (evt) => {
      const btn = evt.target.parentNode;
      if (btn && btn.nodeName === "BUTTON" && btn.className === "icon-btn del-btn") {
        //delete btns
        evt.stopImmediatePropagation();
        this._attrs.splice(parseInt(btn.attributes.index.value), 1);
        this.drawOrRefreshTable();
        
      } else if (btn && btn.nodeName === "BUTTON" && btn.className === "icon-btn add-btn") {
        //add btns
        evt.stopImmediatePropagation();
        this._attrs.push({
          name: '',
          value: '',
        });
        this.drawOrRefreshTable();
      } else if (evt.target.nodeName === "INPUT") {
        evt.stopImmediatePropagation();
        if (this._selectedText) this._replacement = true;
        this._selectedText = evt.target;
        this._selectedText.onblur = () => {
          if (this._replacement) {
            this._replacement = false;
          } else {
            this._selectedText = undefined;
          }
        };
      }
    }

    return table;
  }

  toEditable(attrs) {
    return attrs.map((attr, index) => {
      const ret = {};
      const placeholder = {
        name: 'Enter key',
        value: 'Enter value'
      };
      Object.keys(attr).filter(key => key !== 'placeholder').map(key => {
        ret[key] = `<input value="${attr[key]}" placeholder="${placeholder[key]}" index="${index}" key="${key}" />`;
      });

      return ret;
    });
  }

  drawOrRefreshTable() {
    const table = this.elem.querySelector("#svg-table");
    if (table) {
      this.elem.removeChild(table);
    }
    
    this.elem.appendChild(this.generateTable(this.getPermAttributes(), this.getAttributes()));
  }

  redrawMenu(open) {
    const icon = this._doc.getElementById('menu-icon');
    let svg;
    if (open) {
      svg = this.createDomElement(this._doc, 'g', ArrowUp).lastChild;

      this.drawOrRefreshTable();
      
    } else {
      svg = this.createDomElement(this._doc, 'g', ArrowDown).lastChild;

      const elem = this.elem.querySelector("#svg-table")
      this.elem.removeChild(elem);
    }
    this.appendIconAttrs(svg);
    icon.replaceWith(svg);
  }

  getPermAttributes() {
    return [['Index', this.getIndex(), ' ']];
  }

  getAttributes() {
    return this._attrs;
  }

  appendWithDeleteBtn(arr) {
    return arr.map((item, index) => {
      return [item.name, item.value, `<button class="icon-btn del-btn" index="${index}">${Delete}</button>`];
    });
  }

  appendIconAttrs(icon) {
    icon.setAttribute('id', 'menu-icon')
    icon.setAttribute('style', 'fill:rgba(0,0,0,.54);')
    icon.setAttribute('x', 3);
    icon.setAttribute('y', 3);
  }

  calculateTextSize(doc, font, txt) {
    let canvas = doc.createElement('canvas');
    let context = canvas.getContext("2d");
    context.font = font;
    let tsize = {'width':context.measureText(txt).width, 'height':parseInt(context.font)};
    return tsize;
  }

  setXY(x, y) {
    const svg = this._parent;
    let point = svg.createSVGPoint();
    const invertedSVGMatrix = svg.getScreenCTM().inverse();
    point.x = x;
    point.y = y;
    point = point.matrixTransform(invertedSVGMatrix);

    this._config.x = point.x;
    this._config.y = point.y;

    this._sel.setAttributeNS(null, 'transform', `translate(${point.x},${point.y})`);
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

  makeDefaultTextEditable(keyCode) {

    if (!this._selectedText) {
      const textbox = this._text;
      textbox._editable = true;
      textbox.setAttribute('contenteditable', 'true');
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(textbox, 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);

      this.stopListening();
      textbox.onblur = () => {
        textbox._editable = false;
        textbox.setAttribute('contenteditable', 'false');
        this.startListening()
      };
    } else {
      this._selectedText.onchange = (evt) => {
        const input = evt.target
        const key = input.attributes.key.value;
        const index = input.attributes.index.value;
        this._attrs[index][key] = input.value;
      };
    }
  }

  exportAsJson() {
    const {x, y, title, fontSize, color, description=''} = this._config;
    return {
      "title": title,
      "description": description,
      "color": color,
      "x": x,
      "y": y,
      "node": this._node,
      "attrs": this._attrs,
    };
  }

  getInputCoord(index) {
    const {x=0, y=0} = this._config;
    return this.selected ? this.getInputCoordByIndex(index) : {
      x: x,
      y: y + (this._height / 2),
    };
  }

  getInputCoordByIndex(index) {
    const {x=0, y=0} = this._config;
    const coords = this.calcInputCoords(0, NODE_IO_SIZE / 2);
    return {
      x: x + coords[index].x,
      y: y + coords[index].y
    };
  }

  getOutputCoord(index) {
    const {x=0, y=0} = this._config;
    return this.selected ? this.getOutputCoordByIndex(index) : {
      x: x + this._width,
      y: y + (this._height / 2),
    };
  }

  getOutputCoordByIndex(index) {
    const {x=0, y=0} = this._config;
    const coords = this.calcOutputCoords(NODE_IO_SIZE + 1, NODE_IO_SIZE / 2);
    return {
      x: x + coords[index].x,
      y: y + coords[index].y
    };
  }

  setInputColor() {
    if (this._node.type !== 'function') {
      this.setFillColor(NODE_DISABLED_COLOR);
    }
  }

  getIndex() {
    return this._index;
  }

  setIndex(index) {
    this._index = index;
  }

  resetColor() {
    //reset to default color
    this.setFillColor(NODE_COLOR);
  }

  calcInputCoords(xOffset=0, yOffset=0) {
    const INPUT_COUNT = this._inputCount;
    const X = -(BORDER_WIDTH + NODE_IO_SIZE + NODE_IO_SPACING);
    const height = INPUT_COUNT * NODE_IO_SIZE + (INPUT_COUNT - 1) * NODE_IO_SPACING;
    const halfAbove = height / 2;
    const startingY = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);

    const coords = [];
    for (let i = 0; i < INPUT_COUNT; i++) {
      coords.push({
        x: X + xOffset,
        y: startingY + i * (NODE_IO_SIZE + NODE_IO_SPACING) + yOffset
      });
    }

    return coords;
  }

  calcOutputCoords(xOffset=0, yOffset=0) {
    const OUTPUT_COUNT = this._outputCount;
    const X = -(BORDER_WIDTH + NODE_IO_SIZE + NODE_IO_SPACING);
    const height = OUTPUT_COUNT * NODE_IO_SIZE + (OUTPUT_COUNT - 1) * NODE_IO_SPACING;
    const halfAbove = height / 2;
    const startingY = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);

    const coords = [];
    for (let i = 0; i < OUTPUT_COUNT; i++) {
      coords.push({
        x: NODE_WIDTH + NODE_IO_SPACING + xOffset,
        y: startingY + i * NODE_IO_SPACING + yOffset
      });
    }

    return coords;
  }

  drawInputLinkables(onComplete) {
    if (this._node.type === 'function') {
      const INPUT_COUNT = this._inputCount;
      const X = -(BORDER_WIDTH + NODE_IO_SIZE + NODE_IO_SPACING);
      const height = INPUT_COUNT * NODE_IO_SIZE + (INPUT_COUNT - 1) * NODE_IO_SPACING;
      const halfAbove = height / 2;
      const startingY = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);

      //draw the main body
      const foreignObject = this.createSvgElement(this._doc, 'foreignObject');
      foreignObject.setAttribute('id', 'inputLinkables');
      foreignObject.setAttribute('width', NODE_IO_SIZE + BORDER_WIDTH);
      foreignObject.setAttribute('height', height + BORDER_WIDTH);
      foreignObject.setAttribute('style', `transform: translate(${X}px,${startingY}px);`);

      //draw linkable for each output
      for (let i = 0; i < INPUT_COUNT; i++) {
        foreignObject.appendChild(this.generateIoLinks(this._doc, i+1, {x : 0, y: i * (NODE_IO_SIZE + NODE_IO_SPACING)}, onComplete));
      }
      
      this.elem.appendChild(foreignObject);
    }
  }

  drawOutputLinkables(onLinkConstruct) {
    const BORDER_WIDTH = 5;
    const height = this._outputCount * NODE_IO_SIZE + (this._outputCount - 1) * NODE_IO_SPACING;
    const halfAbove = height / 2;
    const startingY = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);

    //draw the main body
    const foreignObject = this.createSvgElement(this._doc, 'foreignObject');
    foreignObject.setAttribute('id', 'outputLinkables');
    foreignObject.setAttribute('width', NODE_IO_SIZE + NODE_WIDTH + NODE_IO_SPACING + BORDER_WIDTH);
    foreignObject.setAttribute('height', height + BORDER_WIDTH);
    foreignObject.setAttribute('style', `transform: translate(0,${startingY}px);`);

    //draw linkable for each output
    for (let i = 0; i < this._outputCount; i++) {
      foreignObject.appendChild(this.generateIoLinks(this._doc, i+1, {x : NODE_WIDTH + NODE_IO_SPACING, y: i * NODE_IO_SPACING}, onLinkConstruct));
    }
    
    this.elem.appendChild(foreignObject);
  }

  removeLinkables() {
    ['#inputLinkables', '#outputLinkables'].forEach(id => {
      const elem = this.elem.querySelector(id);
      if (elem !== null) {
        this.elem.removeChild(elem);
      }
    });
  }

  generateIoLinks(doc, index, coords, onLinkConstruct) {
    const div = this.createDomElement(doc, 'div', index);
    div.setAttribute('class', 'io-link');
    div.setAttribute('index', index);
    div.setAttribute('style', `left:${coords.x}px;top:${coords.y}px;width:${NODE_IO_SIZE}px;height:${NODE_IO_SIZE}px;background-color:${NODE_IO_CONNECTOR_COLOR};border: 1px solid ${NODE_CONNECTOR_BORDER_COLOR};border-radius:${NODE_IO_SIZE}px;`);
    div._node = this;
    div._selected = false;

    div.onmouseover = () => {
      if (!div._selected) {
        div.style.backgroundColor = NODE_IO_HOVER_COLOR;
      }
    };
  
    div.onmouseout = () => {
      if (!div._selected) {
        div.style.backgroundColor = NODE_IO_CONNECTOR_COLOR;
      }
    };

    div.onclick = () => {

      div.selected = true;
      div.style.backgroundColor = NODE_IO_CONNECTOR_COLOR;
      const index = div.getAttribute('index');

      onLinkConstruct(div._node, index);
    }

    return div;
  }

  //#region
  get selected() {
    return this._selected;
  }

  get outputCount() {
    return this._outputCount;
  }
  //#endregion
}

export default Node;