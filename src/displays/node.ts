import Draggable from 'displays/abstract/draggable';
import SvgTable from 'displays/graphics/svgtable';
import Link from 'displays/link';

import { Point, NodePoint, NodeConfig, NodeAttribute } from 'types/index';
import INode from 'interfaces/inode';
import Dock from './dock';

import {ArrowDown, ArrowUp, Add, Delete} from 'constants/svg';
import { default as config } from 'constants/config';
const {
  NODE_WIDTH, NODE_HEIGHT, NODE_COLOR, NODE_DISABLED_COLOR, NODE_BORDER_COLOR, NODE_TEXT_COLOR,  
  NODE_STROKE_WEIGHT, NODE_PADDING, NODE_IO_SIZE, NODE_IO_SPACING,
  NODE_CONNECTOR_BORDER_COLOR, NODE_IO_HOVER_COLOR, NODE_IO_CONNECTOR_COLOR, BORDER_WIDTH,
} = config;

class Node extends Draggable implements INode  {
  private _doc: any;
  private _config: NodeConfig;
  private _dock: Dock;

  private _width: number;
  private _height: number;
  private _editable: boolean;
  private _inputCount: number;
  private _outputCount: number;
  private _attrs: NodeAttribute[];
  private _links: Link[];
  private _inputLinks: Link[];
  private _outputLinks: Link[];
  private _menuState: boolean;
  private _index: number;
  private _selectedText: any;

  private _inputs: string[];
  private _outputs: string[];

  private _text: any;
  private _bg: any;

  constructor(doc: any, config: NodeConfig) {
    super();
    const {width=NODE_WIDTH, height=NODE_HEIGHT, editable, attrs=[], inputs=[], outputs=[]} = config;
    this._doc = doc;
    this._config = config;
    this._width = width;
    this._height = height;
    this._editable = editable;
    this._inputCount = 0;
    this._outputCount = 1;
    this._attrs = attrs;
    this._links = [];
    this._inputLinks = [];
    this._outputLinks = [];
    this._inputs = inputs;
    this._outputs = outputs;
    this._menuState = false;
    
    this.validateNodeTemplate(inputs, outputs);
    
    this._inputCount = this._inputs.length;
    this._outputCount = this._outputs.length;
    
    this._dragFn = this._dragFn.bind(this);

    this.initialize(doc, config);
  }

  _dragFn() {
    this._links.forEach(_ => _.redrawPath());
  }

  validateNodeTemplate(inputs: string[], outputs: string[]): void {
    if (!inputs && !outputs) {
      throw Error('Invalid Node Template: No inputs or outputs in function node.');
    }

    if (!Array.isArray(inputs) || !Array.isArray(outputs)) {
      throw Error('Invalid Node Template: invalid inputs/outputs type.');
    }

    const ioNames: string[] = ['inputs', 'outputs'];
    [inputs, outputs].forEach((io: string[], ioIndex: number) => {
      io.forEach((_: string, index: number) => {
        if (!_ && typeof(_) !== 'string') throw Error(`Invalid Node Template: Invalid ${ioNames[ioIndex]} type on index (${index}). Only string can be accepted.`);
        if (this.validateIoType(_)) throw Error(`Invalid Node Template: Invalid ${ioNames[ioIndex]} type on index (${index}). Values can only be "string", "boolean", "integer", "function"`);
      });
    });
  }

  validateIoType(type: string): boolean {
    return ['string', 'boolean', 'integer', 'function'].indexOf(type) < 0;
  }

  addLink(link: Link, type: string): void {
    if (type === 'input') {
      this._inputLinks.push(link);
    } else if (type === 'output') {
      this._outputLinks.push(link);
    }

    this._links.push(link);
  }

  deleteLink(link: Link): void {
    const inputIndex = this._inputLinks.indexOf(link);
    const outputIndex = this._outputLinks.indexOf(link);

    if (inputIndex >= 0) this._inputLinks.splice(inputIndex, 1);
    if (outputIndex >= 0) this._outputLinks.splice(outputIndex, 1);

    this._links.splice(this._links.indexOf(link), 1);
  }

  setFillColor(color: string = NODE_COLOR): void {
    this._bg.setAttribute('style', `fill:${color};stroke-width:${NODE_STROKE_WEIGHT};stroke:${NODE_BORDER_COLOR};filter:drop-shadow(0px 1px 1px rgba(0,0,0,.4));`);
  }

  setFontColor(fontColor: string): void {
    const {fontSize=11} = this._config;
    this._config.fontColor = fontColor;
    this._text.setAttribute('style', `font-size:${fontSize}px;color:${fontColor};overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;`);
  }
  
  initialize(doc: any, config: NodeConfig): void {
    const {x=0, y=0, title='', fontSize=11, color=NODE_COLOR, fontColor=NODE_TEXT_COLOR} = config;

    let sel: any = this.elem = this.createSvgElement(doc, 'g');
    this.setXY({
      x: x, 
      y: y
    });
    sel.setAttribute('transform', `translate(${x},${y})`);
  
    let rect: any;
    this._bg = rect = this.createSvgElement(doc, 'rect');
    rect.setAttribute('width', this._width);
    rect.setAttribute('height', this._height);
    rect.setAttribute('rx', NODE_PADDING);
    rect.setAttribute('ry', NODE_PADDING);
    this.setFillColor(color);
    sel.appendChild(rect);
  
    let foreignObject: any = this.createSvgElement(doc, 'foreignObject');
    foreignObject.setAttribute('class', 'no-mouse');
    foreignObject.setAttribute('x', NODE_PADDING);
    foreignObject.setAttribute('y', NODE_PADDING);
    foreignObject.setAttribute('width', this._width-2*NODE_PADDING);
    foreignObject.setAttribute('height', this._height-2*NODE_PADDING);

    let text: any;
    this._text = text = this.createNonSvgElement(doc, 'div');
    text.setAttribute('contenteditable', 'true');
    text.setAttribute('xmlns', "http://www.w3.org/1999/xhtml");
    text.setAttribute('style', `font-size:${fontSize}px;color:${fontColor};overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;`);

    text.innerHTML = title;

    foreignObject.appendChild(text);
    sel.appendChild(foreignObject);
  
    if (this._editable) {
      this.draggable(sel);

      this.on('drag', this._dragFn);
    }
  }

  destroy(): void {  
    //remove related links
    this._links.forEach(link => {
      link.destroy();
    });

    this.remove();

    this.off('drag', this._dragFn);
  }

  select(): void {
    super.select();

    //draw selected highlight
    let rect: any = this.createSvgElement(this._doc, 'rect');
    rect.setAttribute('class', 'highlight');
    rect.setAttribute('width', this._width);
    rect.setAttribute('height', this._height);
    this.elem.appendChild(rect);

    this.drawInputLinkables();
    this.drawOutputLinkables();
    this.drawMenu();

    this._links.forEach(link => link.redrawPath());
  }

  unselect(): void {
    super.unselect();

    this.elem.removeAttribute('id');

    ['.highlight', '#menu-btn', '#svg-table'].forEach(id => {
      const elem: any = this.elem.querySelector(id);
      if (elem !== null) {
        this.elem.removeChild(elem);
      }
    });

    this.removeLinkables();
    this._links.forEach(link => link.redrawPath());
  }

  drawMenu(open: boolean = false): void {
    this._menuState = open;
    const gDom: any = this.createSvgElement(this._doc, 'g');
    gDom.setAttribute('id', `menu-btn`);
    gDom.setAttribute('style', `transform: translate(0,${this._height+10}px);`);

    const svg: any = open ? ArrowUp : ArrowDown;
    const arrowIcon = this.createDomElement(this._doc, 'g', svg).lastChild;
    this.appendIconAttrs(arrowIcon);

    const foreignObject: any = this.createSvgElement(this._doc, 'foreignObject');
    foreignObject.setAttribute('width', 25);
    foreignObject.setAttribute('height', 25);
    foreignObject.setAttribute('style', 'background-color:rgb(238,238,238);border-radius:15px;box-shadow:0px 2px 1px -1px rgb(0 0 0 / 20%),0px 1px 1px 0px rgb(0 0 0 / 14%),0px 1px 3px 0px rgb(0 0 0 / 12%);');

    gDom.appendChild(foreignObject);
    gDom.appendChild(arrowIcon);
    gDom.addEventListener('mousedown', (evt: MouseEvent) => {
      evt.stopImmediatePropagation();
      this._menuState = !this._menuState;
      this.redrawMenu(this._menuState);
    });

    this.elem.appendChild(gDom);
  }

  generateTable(perm:  Array<Array<string>>, attrs: NodeAttribute[]): any {
    const table = SvgTable.generate(this._doc, 
      ['Attribute', 'Value', `<button class="icon-btn add-btn">${Add}</button`], 
      [
        ...perm,
        ...this.appendWithDeleteBtn(this.toEditable(attrs))
      ]
    );
    table.setAttribute('id', "svg-table");
    table.setAttribute('style', "transform:translate(0,70px);");
    table.onmousedown = (evt: any) => {
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
        var replacement = false;
        if (this._selectedText) replacement = true;
        this._selectedText = evt.target;
        this._selectedText.onblur = () => {
          if (replacement) {
            replacement = false;
          } else {
            this._selectedText = undefined;
          }
        };
      }
    }

    return table;
  }

  toEditable(attrs: NodeAttribute[]): NodeAttribute[] {
    return attrs.map((attr, index) => {
      const ret: NodeAttribute = {
        name: '',
        value: ''
      };
      const placeholder: NodeAttribute = {
        name: 'Enter key',
        value: 'Enter value'
      };
      Object.keys(attr).filter(key => key !== 'placeholder').map(key => {
        const keyOf: keyof NodeAttribute = key as keyof NodeAttribute;
        ret[keyOf] = `<input value="${attr[keyOf]}" placeholder="${placeholder[keyOf]}" index="${index}" key="${key}" />`;
      });

      return ret;
    });
  }

  drawOrRefreshTable(): void {
    const table = this.elem.querySelector("#svg-table");
    if (table) {
      this.elem.removeChild(table);
    }
    
    this.elem.appendChild(this.generateTable(this.getPermAttributes(), this.getAttributes()));
  }

  redrawMenu(open: boolean): void {
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

  getPermAttributes(): Array<Array<string>> {
    return [['Index', this.getIndex().toString(), ' ']];
  }

  getAttributes(): NodeAttribute[] {
    return this._attrs;
  }

  appendWithDeleteBtn(arr: NodeAttribute[]): string[][] {
    return arr.map((item, index) => {
      return [item.name, item.value, `<button class="icon-btn del-btn" index="${index}">${Delete}</button>`];
    });
  }

  appendIconAttrs(icon: any):void {
    icon.setAttribute('id', 'menu-icon')
    icon.setAttribute('style', 'fill:rgba(0,0,0,.54);')
    icon.setAttribute('x', 3);
    icon.setAttribute('y', 3);
  }

  calculateTextSize(doc: any, font: string, txt: string): any {
    let canvas = doc.createElement('canvas');
    let context = canvas.getContext("2d");
    context.font = font;
    let tsize = {'width':context.measureText(txt).width, 'height':parseInt(context.font)};
    return tsize;
  }

  setXY(point: Point) {
    super.setXY(point);
    const svg: any = this._parent;

    if (svg) {
      let svgPoint: any = svg.createSVGPoint();
      svgPoint.x = point.x;
      svgPoint.y = point.y;

      const invertedSVGMatrix = svg.getScreenCTM().inverse();
      svgPoint = svgPoint.matrixTransform(invertedSVGMatrix);

      this._setXY(svgPoint);
    } else {
      this._setXY(point);
    }
  }

  _setXY({x, y}: Point) {
    this._config.x = x;
    this._config.y = y;

    this.elem.setAttributeNS(null, 'transform', `translate(${x},${y})`);
  }

  addXY(dx: number, dy: number): void {
    const x = this.x + dx;
    const y = this.y + dy;

    this._setXY({
      x: x, 
      y: y
    });
  }

  getFaceCoords(): NodePoint[] {
    return ['u', 'l', 'r', 'd'].map((side: string) => this.getFaceCoord(side));
  }

  getFaceCoord(side: string): NodePoint {
    const { x = 0, y = 0 } = this._config;
    var coord: NodePoint;
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

  isTextEditable(): boolean {
    return this._text._editable;
  }

  makeDefaultTextEditable(): void {

    if (!this._selectedText) {
      const textbox: any = this._text;
      textbox._editable = true;
      textbox.setAttribute('contenteditable', 'true');
      const range = document.createRange();
      const sel: any = window.getSelection();
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
      this._selectedText.onchange = (evt: MouseEvent): void => {
        const input: any = evt.target
        const key: string = input.attributes.key.value;
        const index: number = input.attributes.index.value;
        this._attrs[index][key as keyof NodeAttribute] = input.value;
      };
    }
  }

  exportAsJson(): NodeConfig {
    const { x, y, title, color, description = ''} = this._config;
    const state: NodeConfig = {
      "title": title,
      "description": description,
      "x": x,
      "y": y,
      "editable": this._editable,
      "attrs": this._attrs,

      "inputs": this._inputs,
      "outputs": this._outputs
    };

    if (color) state.color = color;

    return state;
  }

  getInputCoord(index: number): Point {
    const { x=0, y=0 } = this._config;
    let coord: Point;

    if (this.isDocked()) {
      coord = this._dock.getInputCoord(this);
    } else if (this.selected) {
      coord = this.getInputCoordByIndex(index);
    } else {
      coord = {
        x: x,
        y: y + (this._height / 2),
      };
    }


    return coord;
  }

  getInputCoordByIndex(index: number): Point {
    const { x=0, y=0 } = this._config;
    const coords: Point[] = this.calcInputCoords(0, NODE_IO_SIZE / 2);
    return {
      x: x + coords[index].x,
      y: y + coords[index].y
    };
  }


  getOutputCoord(index: number): Point {
    const { x=0, y=0 } = this._config;
    let coord: Point;

    if (this.isDocked()) {
      coord = this._dock.getOutputCoord(this);
    } else if (this.selected) {
      coord = this.getOutputCoordByIndex(index);
    } else {
      coord = {
        x: x + this._width,
        y: y + (this._height / 2),
      };
    }

    return coord;
  }

  getOutputCoordByIndex(index: number): Point {
    const { x=0, y=0 } = this._config;
    const coords: Point[] = this.calcOutputCoords(NODE_IO_SIZE + 1, NODE_IO_SIZE / 2);
    return {
      x: x + coords[index].x,
      y: y + coords[index].y
    };
  }

  setInputColor(): void {
    if (this._inputs.length === 0) {
      this.setFillColor(NODE_DISABLED_COLOR);
    }
  }

  getIndex(): number {
    return this._index;
  }

  setIndex(index: number): void {
    this._index = index;
  }

  resetColor(): void {
    //reset to default color
    this.setFillColor(NODE_COLOR);
  }

  calcInputCoords(xOffset: number = 0, yOffset:number = 0): Point[] {
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

  calcOutputCoords(xOffset: number = 0, yOffset:number = 0): Point[] {
    const OUTPUT_COUNT: number = this._outputCount;
    const height: number = OUTPUT_COUNT * NODE_IO_SIZE + (OUTPUT_COUNT - 1) * NODE_IO_SPACING;
    const halfAbove: number = height / 2;
    const startingY: number = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);

    const coords: Point[] = [];
    for (let i: number = 0; i < OUTPUT_COUNT; i++) {
      coords.push({
        x: NODE_WIDTH + NODE_IO_SPACING + xOffset,
        y: startingY + i * NODE_IO_SPACING + yOffset
      });
    }

    return coords;
  }

  drawInputLinkables(onLinkConstruct?: (node: any, index: number) => void): void {
    if (this._inputs.length > 0) {
      const INPUT_COUNT: number = this._inputCount;
      const X: number = -(BORDER_WIDTH + NODE_IO_SIZE + NODE_IO_SPACING);
      const height: number = INPUT_COUNT * NODE_IO_SIZE + (INPUT_COUNT - 1) * NODE_IO_SPACING;
      const halfAbove: number = height / 2;
      const startingY: number = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);

      //draw the main body
      const foreignObject: any = this.createSvgElement(this._doc, 'foreignObject');
      foreignObject.setAttribute('id', 'inputLinkables');
      foreignObject.setAttribute('width', NODE_IO_SIZE + BORDER_WIDTH);
      foreignObject.setAttribute('height', height + BORDER_WIDTH);
      foreignObject.setAttribute('style', `transform: translate(${X}px,${startingY}px);`);

      //draw linkable for each output
      for (let i: number = 0; i < INPUT_COUNT; i++) {
        foreignObject.appendChild(this.generateIoLinks(this._doc, i+1, {x : 0, y: i * (NODE_IO_SIZE + NODE_IO_SPACING)}, onLinkConstruct));
      }
      
      this.elem.appendChild(foreignObject);
    }
  }

  drawOutputLinkables(onLinkConstruct?: (node: any, index: number) => void): void {
    const BORDER_WIDTH: number = 5;
    const height: number = this._outputCount * NODE_IO_SIZE + (this._outputCount - 1) * NODE_IO_SPACING;
    const halfAbove: number = height / 2;
    const startingY: number = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);

    //draw the main body
    const foreignObject: any = this.createSvgElement(this._doc, 'foreignObject');
    foreignObject.setAttribute('id', 'outputLinkables');
    foreignObject.setAttribute('width', NODE_IO_SIZE + NODE_WIDTH + NODE_IO_SPACING + BORDER_WIDTH);
    foreignObject.setAttribute('height', height + BORDER_WIDTH);
    foreignObject.setAttribute('style', `transform: translate(0,${startingY}px);`);

    //draw linkable for each output
    for (let i: number = 0; i < this._outputCount; i++) {
      foreignObject.appendChild(this.generateIoLinks(this._doc, i+1, {x : NODE_WIDTH + NODE_IO_SPACING, y: i * NODE_IO_SPACING}, onLinkConstruct));
    }
    
    this.elem.appendChild(foreignObject);
  }

  removeLinkables(): void {
    ['#inputLinkables', '#outputLinkables'].forEach(id => {
      const elem = this.elem.querySelector(id);
      if (elem !== null) {
        this.elem.removeChild(elem);
      }
    });
  }

  generateIoLinks(doc:any, index: number, coords: Point, onLinkConstruct: (node: any, index: number) => void) {
    const div = this.createDomElement(doc, 'div', index.toString());
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

  dock(dock: Dock): void {
    this._dock = dock;
    this.elem.setAttribute('visibility', 'hidden');

    this.trigger('drag');
  }

  undock(event: MouseEvent): void {
    const coord = this.getCoordsFromEvent(event);
    this.setXY(coord);
    this.startDragFn(event);
    this.drag(event);

    this._dock = undefined;
    this.elem.removeAttribute('visibility');
  }

  isDocked(): boolean {
    return this._dock !== undefined;
  }

  //#region

  get outputCount(): number {
    return this._outputCount;
  }

  get title(): string {
    return this._config.title;
  }
  //#endregion
}

export default Node;