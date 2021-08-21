import Draggable from 'displays/abstract/draggable';
import { DockState, Point } from 'types/index';
import Node from 'displays/node';

import { default as config } from 'constants/config';
import { createImportSpecifier } from 'typescript';
const {
  NODE_PADDING, DOCK_WIDTH, DOCK_HEIGHT, DOCK_COLOR, DOCK_TITLE_COLOR, DOCK_BORDER_COLOR
} = config;

const HEADER_HEIGHT: number = 34;
const DOCK_NODE_HEIGHT: number = 28;
const HALF_DOCK_NODE_HEIGHT: number = DOCK_NODE_HEIGHT /2;
const DOCK_NODE_PADDING: number = 15;

export default class Dock extends Draggable {
  private _doc: any;
  private _body: any;
  private _fo: any;
  private _bg: any;
  private _width: number;
  private _height: number;
  private _editable: boolean;
  private _index: number;
  private _nodes: Node[];
  

  constructor(doc: any, state: DockState, nodes: Node[] = []) {
    super();
    const {width=DOCK_WIDTH, height=DOCK_HEIGHT, editable, nodes: nodeNums} = state;
    this._doc = doc;
    this._width = width;
    this._height = height;
    this._editable = editable;
    this._nodes = [];
    this._state = state;

    this.initialize(doc, state);

    nodeNums.forEach((nodeId: number) => {
      this.addNode(nodes[nodeId]);
    });

    this.on('drag', () => {
      this._nodes.forEach(node => node.trigger('drag'));
    });
  }

  initialize(doc: any, state: DockState): void {
    const {x=0, y=0, color=DOCK_COLOR, title=''} = state;
    let sel: HTMLElement = this.elem = this.createSvgElement(doc, 'g');
    this.setXY({
      x: x, 
      y: y
    });
    sel.setAttribute('transform', `translate(${x},${y})`);

    let rect: HTMLElement;
    this._bg = rect = this.createSvgElement(doc, 'rect');
    rect.setAttribute('width', this._width.toString());
    rect.setAttribute('height', this._height.toString());
    rect.setAttribute('rx', NODE_PADDING.toString());
    rect.setAttribute('ry', NODE_PADDING.toString());
    rect.setAttribute('style', `fill:rgba(0,0,0,0);`);
    sel.appendChild(rect);

    let foreignObject: any 
    this._fo = foreignObject = this.createSvgElement(doc, 'foreignObject');
    foreignObject.setAttribute('class', 'no-mouse');
    foreignObject.setAttribute('width', this._width-2*NODE_PADDING);
    foreignObject.setAttribute('height', this._height-2*NODE_PADDING);

    let text: HTMLElement = this.createNonSvgElement(doc, 'div');
    //text.setAttribute('contenteditable', 'true');
    text.setAttribute('xmlns', "http://www.w3.org/1999/xhtml");
    text.setAttribute('style', `font-size:11px;color:${DOCK_TITLE_COLOR};overflow:hidden;display:-webkit-box;border:1px solid ${DOCK_BORDER_COLOR};background-color:white;padding:9px ${DOCK_NODE_PADDING}px;border-radius:3px 3px 0 0;`);
    text.innerHTML = title;
    foreignObject.appendChild(text);

    this._body = text = this.createNonSvgElement(doc, 'div');
    text.setAttribute('xmlns', "http://www.w3.org/1999/xhtml");
    text.setAttribute('style', `font-size:11px;color:${DOCK_COLOR};overflow:hidden;border:1px solid ${DOCK_BORDER_COLOR};background-color:#F8F8F8;padding:5px 12px;height:30px;border-radius:0 0 3px 3px;`);
    foreignObject.appendChild(text);
    
    sel.appendChild(foreignObject);

    if (this._editable) {
      this.draggable(sel);

      //this.on('drag', this._dragFn);
    }
  }

  subscribeToMouseOver(callback: any): void {
    this._bg.addEventListener('mouseover', callback, false);
  }

  unsubscribeToMouseOver(callback: any): void {
    this._bg.removeEventListener('mouseover', callback);
  }

  calcHeightByNodeIndex(index: number): number {
    return (index * (28 + NODE_PADDING)) + NODE_PADDING;
  }

  addNode(node: Node) {
    this._nodes.push(node);
    node.dock(this);

    const div = this.drawInnerDiv(node.title);
    this._body.appendChild(div);
    const bodyHeight: number = this.calcHeightByNodeIndex(this._nodes.length);
    this._body.style.height = `${bodyHeight}px`;

    this._bg.setAttribute('height', bodyHeight + HEADER_HEIGHT);
    this._fo.setAttribute('height', bodyHeight + HEADER_HEIGHT);
  }

  drawInnerDiv(title: string): HTMLElement {
    let div: HTMLElement = this.createNonSvgElement(this._doc, 'div');
    div.setAttribute('class', 'dock-node');
    div.setAttribute('xmlns', "http://www.w3.org/1999/xhtml");
    div.setAttribute('style', `color:${DOCK_TITLE_COLOR};overflow:hidden;background-color:white;width:calc(100% - 20px);height:16px;padding:5px 10px;border:1px solid #EFEFEF;text-overflow:ellipsis;white-space:nowrap;`);
    div.innerHTML = title;
    return div;
  }

  setIndex(index: number): void {
    this._index = index;
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
    this._state.x = x;
    this._state.y = y;

    this.elem.setAttributeNS(null, 'transform', `translate(${x},${y})`);
  }

  getInputCoord(node: Node): Point {
    const index = this._nodes.indexOf(node);

    return {
      x: this._state.x + DOCK_NODE_PADDING,
      y: this._state.y + HEADER_HEIGHT + this.calcHeightByNodeIndex(index) + HALF_DOCK_NODE_HEIGHT,
    };
  }

  getOutputCoord(node: Node): Point {
    const index = this._nodes.indexOf(node);

    return {
      x: this._state.x + NODE_PADDING,
      y: this._state.y + HEADER_HEIGHT + this.calcHeightByNodeIndex(index) + HALF_DOCK_NODE_HEIGHT,
    };
  }

  exportAsJson(): DockState {
    const { editable, x, y, title, nodes } = this._state;
    const state: DockState = {
      "title": title,
      "x": x,
      "y": y,
      "editable": editable,
      "nodes": nodes,
    };

    return state;
  }
}