import Base from 'displays/abstract/base';

import Node from 'displays/node';
import Link from 'displays/link';
import Mouse from 'displays/mouse';

import {EditMode} from 'constants/editmode';
import {ZoomMode} from 'constants/zoommode';

import { Point, NodeConfig, LinkState, BoardState, DockState } from 'types/index';

import { default as config } from 'constants/config';
import Dock from './dock';
const {
  LINK_COLOR, LINK_SELECTED_COLOR,
  NODE_CONNECTOR_COLOR, NODE_CONNECTOR_SELECTED_COLOR, NODE_CONNECTOR_BORDER_COLOR, NODE_CONNECTOR_HOVER_COLOR
} = config;

const XMLNS = "http://www.w3.org/2000/svg";

const getCoordsFromEvent = (ev: any, svg: any) => {
  if (ev.changedTouches) {
    ev = ev.changedTouches[0];
  } else if (ev.targetTouches) {
    ev = ev.targetTouches[0];
  }

  const point: any = svg.createSVGPoint();
  point.x = ev.clientX;
  point.y = ev.clientY;
  const invertedSVGMatrix = svg.getScreenCTM().inverse();

  return point.matrixTransform(invertedSVGMatrix);
}

class Board extends Base {

  private _title: string;
  private _width: number;
  private _height: number;
  private _zoom: number;
  private _editable: boolean;
  private _docks: Dock[];
  private _nodes: Node[];
  private _links: Link[];
  private _selected: any[];
  private _showGrid: boolean;
  private _type: string;
  private _doc: any;
  private _parent: any;
  private _buttons: { [key:string]: any; };
  private _scale: number;
  private _transformMatrix: number[];
  private _mode: number;

  private _highlight: any;
  private _link: Link;

  constructor(doc: any, dom: any, width: number, height: number, zoom: number, editable: boolean) {
    super();
    this._width = width;
    this._height = height;
    this._zoom = zoom;
    this._editable = editable;
    this._docks = [];
    this._nodes = [];
    this._links = [];
    this._selected = [];
    this._showGrid = false;
    this._type = 'svg';
    this._doc = doc;
    this._parent = dom;
    this._buttons = {};
    this._scale = 1;
    this._transformMatrix = [1, 0, 0, 1, 0, 0];

    //background
    dom.setAttribute('style', 'overflow:hidden;position:absolute;background-image:url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")');
    
    let sel: any = this.elem = doc.createElementNS(XMLNS, 'svg');
    this._refreshTransformMatrix();
    sel.setAttribute('viewBox', `0 0 ${width} ${height}`)
    sel.setAttribute('width', width);
    sel.setAttribute('height', height);
    sel.innerText = "Your browser does not support inline svg";

    let defs: any = doc.createElementNS(XMLNS, 'defs');
    defs.innerHTML = `
      <marker id='head' orient="auto" markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill="${LINK_COLOR}"/></marker>
      <marker id='head-selected' orient="auto" markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill="${LINK_SELECTED_COLOR}"/></marker>
    `;
    sel.appendChild(defs);

    //draw highlights
    this._highlight = doc.createElementNS(XMLNS, 'rect');
    this._highlight.setAttribute('id', 'highlight');
    this._highlight.setAttribute('width', 0);
    this._highlight.setAttribute('height', 0);

    sel.appendChild(this._highlight);

    //background color
    let bg: any = doc.createElementNS(XMLNS, 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('style', "fill:rgba(0,0,0,0);");
    sel.appendChild(bg);

    dom.appendChild(sel);

    this.initialize(editable);
  }

  _pan(matrix: number[], dx: number, dy: number): number[] {
    matrix[4] = dx;
    matrix[5] = dy;
    return matrix;
  }

  //#region Private Functions
  _refreshTransformMatrix(newOrigin?: Point) {
    this.elem.setAttribute('transform', `matrix(${this._transformMatrix.join(' ')})`);

    if (newOrigin) {
      this.elem.setAttribute('style', `${ this.elem.getAttribute('style')};transform-origin:${newOrigin.x}px ${newOrigin.y}px`);
    }
  }

  _zoomToScale(matrix: number[], scale: number, coord: Point): number[] {
    matrix[0] = scale;
    matrix[3] = scale;
    matrix[4] = (1 - scale) * coord.x;
    matrix[5] = (1 - scale) * coord.y;
    return matrix;
  }
  //#endregion

  load(state: BoardState): void {
    //parse new state
    const {title, docks: dockStates, nodes: nodeStates, links: linkStates} = state;
    const nodes: Node[] = this.parseNodes(this._doc, nodeStates, this._editable);
    const docks: Dock[] = this.parseDocks(this._doc, dockStates, this._editable, nodes);
    const links: Link[] = this.parseLinks(this._doc, linkStates, nodes, this._editable);

    this._title = title;

    //clear current state
    this.deleteNodes();

    //assignment
    this.setDocks(docks);
    this.setNodes(nodes);
    this.setLinks(links);
  }

  parseDocks(doc: any, states: DockState[], editable: boolean, nodes: Node[]): Dock[] {
    return states.map((state: DockState) => new Dock(doc, {
      editable: editable,
      ...state,
    }, nodes));
  }

  parseNodes(doc: any, configs: NodeConfig[], editable: boolean): Node[] {
    return configs.map((config: NodeConfig) => new Node(doc, {
      editable: editable,
      ...config,
    }));
  }

  parseLinks(doc: any, states: LinkState[], nodes: Node[], editable: boolean): Link[] {
    return states.map((state: LinkState) => {
      const { src, target, output_index, input_index } = state;
      return new Link(doc, nodes[src], output_index, nodes[target], input_index, {
        editable: editable
      })
    });
  }

  exportState(): BoardState {
    return {
      "title": this._title,
      "editable": this._editable,
      "docks": this._docks.map((dock: Dock) => dock.exportAsJson()),
      "nodes": this._nodes.map((node: Node) => node.exportAsJson()),
      "links": this._links.map((link: Link) => link.exportAsJson())
    };
  }

  clearHighlight(): void {
    //clear highlight
    this._highlight.setAttribute('width', 0);
    this._highlight.setAttribute('height', 0);
  }

  initialize(editable: boolean): void {
    editable && this.edit();
    var highlighting: boolean = false;
    var origin:Point = undefined;

    //board drag
    this.elem.addEventListener('mousedown', (evt: MouseEvent) => {
      if (evt.which === 1) {//left click
        origin = getCoordsFromEvent(evt, this.elem);
        this.elem.appendChild(this._highlight);
      }
    });

    this.elem.addEventListener('mousemove', (evt: MouseEvent) => {
      
      if (evt.which == 1) {
        const point = getCoordsFromEvent(evt, this.elem);

        if (this._mode == EditMode.Pan) {
          const viewBox: any = this.elem.viewBox.baseVal;

          viewBox.x -= (point.x - origin.x);
          viewBox.y -= (point.y - origin.y);
        } else if (origin && this._nodes.every((_: Node) => !_.isDragging())) {
          highlighting = true;
          
          let left: number = origin.x < point.x ? origin.x : point.x;
          let right: number = origin.x > point.x ? origin.x : point.x;
          let top: number = origin.y < point.y ? origin.y : point.y;
          let bottom: number = origin.y > point.y ? origin.y : point.y;
          
          this._highlight.setAttribute('x', left);
          this._highlight.setAttribute('y', top);

          this._highlight.setAttribute('width', Math.abs(right - left));
          this._highlight.setAttribute('height', Math.abs(bottom - top));
        } else {
          this.clearHighlight();
        }
      }
    });

    this.elem.addEventListener('mouseup', () => {
      if (highlighting) {
        //use highlight to select items
        const svgRect: any = this.elem.createSVGRect();
        svgRect.x = this._highlight.attributes.x.value;
        svgRect.y = this._highlight.attributes.y.value;
        svgRect.width = this._highlight.attributes.width.value;
        svgRect.height = this._highlight.attributes.height.value;

        this.unselectItems();

        this.elem.getIntersectionList(svgRect, null).forEach((_: any) => {
          const node = _.node || _.parentNode.node;
          if (node && (
              node instanceof Node
              || node instanceof Link
              || node instanceof Dock
            )) {
            node.select();
            node.on('drag', this.onNodeDrag.bind(this, node));
            this._selected.push(node);

            this.trigger('onselect', this._selected);
          }
        });
        
        this.reorderItems(this._selected);

        this.clearHighlight();
      }
      
      origin = undefined;
      highlighting = false;
    });
  }

  onNodeDrag(node: any, { dx, dy }: { dx: number, dy: number }): void {
    this._selected.filter(n => n !== node).forEach((n: any) => {
      n.setXY(n.x + dx, n.y + dy);
      n._links.forEach((link: Link) => link.redrawPath());
    });
  }

  onNodeDragEnds(node: any) {
    const docked = this._docks.filter((dock: Dock) => dock.overlap(node)).shift();

    if (docked) docked.addNode(node);
  }

  reorderItems(selected: any[]): void {
    selected.forEach((baseItem: any) => {
      this.removeChild(baseItem);
      this.appendChild(baseItem);
    });
  }

  unselectItems(): void {
    this._selected.forEach(_ => {
      _.unselect();
      _.off('drag', this.onNodeDrag.bind(this, _));
    });
    this._selected = [];
  }

  edit(): void {
    this._editable = true;
    this._mode = EditMode.None;
  }

  addDock(dock: Dock): void {
    //TODO
    this.addToBoardItems(this._docks, dock);
  }

  addNode(node: Node): void { 
    node.selectable();
    node.on('dragend', this.onNodeDragEnds.bind(this, node));
    this.addToBoardItems(this._nodes, node);
  }

  addLink(link: Link): void { 
    this._links.push(link);
    this.appendChild(link);
  }

  addLinkState(linkState: LinkState): void {
    const { src, target, output_index, input_index } = linkState;
    const link: Link = new Link(this._doc, this._nodes[src], output_index, this._nodes[target], input_index, {
      editable: this._editable
    });
    this._links.push(link);
    this.appendChild(link);
  }

  addToBoardItems(arr: any[], item: any): void {
    item.on('dragstart', () => this.reorderItems([item]));
    item.setIndex(arr.length);
    this.appendChild(item);
    arr.push(item);
    this.subscribeToSelection(item);
  }

  setMode(mode: number): void {
    this._mode = mode;
  }

  setDocks(docks: Dock[]): void {
    docks.forEach((dock: Dock) => this.addDock(dock));
  }

  setNodes(nodes: Node[]): void { 
    nodes.forEach((node: Node) => this.addNode(node));
  }

  setLinks(links: Link[]): void { 
    links.forEach((link: Link) => this.addLink(link));
  }
  
  subscribeToSelection(item: any): void { 
    item.on('clickonly', () => {
      if (item.selected) {
        item.unselect();
        this._selected.splice(this._selected.indexOf(item), 1);

        this.trigger('ondeselect', this._selected)
      } else {
        this.unselectItems();
        item.select();
        this._selected.push(item);

        this.trigger('onselect', this._selected)

        this.reorderItems(this._selected);
        this.clearHighlight();
      }
    });
  }

  enterSelectionMode(onComplete=(point: Point)=>{}): void {
    this.elem.onclick = (evt: MouseEvent) => {
      const point: Point = getCoordsFromEvent(evt, this.elem);

      //exit
      this.exitSelectionMode();
      onComplete(point);
    };
  }

  enterDockMode(onComplete=(point: Point)=>{}): void {
    this.enterSelectionMode((point: Point) => {
      const state: DockState = {
        x: point.x - this._transformMatrix[4],
        y: point.y - this._transformMatrix[5],
        title: 'Dock',
        editable: this._editable,
        nodes: [],
      };

      let dock: Dock = new Dock(this._doc, state);
      this.addDock(dock);
  
      onComplete(point);
    });
  }

  enterNodeMode(onComplete=(point: Point)=>{}): void {
    this.enterSelectionMode((point: Point) => {
      const config: NodeConfig = {
        x: point.x - this._transformMatrix[4],
        y: point.y - this._transformMatrix[5],
        title: 'Title',
        editable: this._editable,
        inputs: [],
        outputs: []
      };

      let node: Node = new Node(this._doc, config);
      this.addNode(node);
  
      onComplete(point);
    });
  }

  exitNodeMode(): void {
    this.exitSelectionMode();
  }

  exitSelectionMode(): void {
    //stop onclick events
    this.elem.onclick = undefined;
  }

  enterLinkMode(onComplete=()=>{}): void {
    const scope: Board = this;
    const onLinkConstructed = (node: Node, ioIndex: number) => {
      if (this._link) {
        scope._mode = EditMode.None;
        
        //complete linking target
        this._link.setTarget(node, ioIndex);
        this._link.setDotted(false);
        this._link.selectable();

        //clean up
        onComplete();

        this._nodes.forEach((node: Node) => {
          node.startListening();
          node.removeLinkables();
          node.resetColor();
        });

        this._link = undefined;

      } else {
        const link: Link = this._link = new Link(this._doc, node, ioIndex, new Mouse(this.elem.getBoundingClientRect()), -1, {
          dotted: true,
          editable: this._editable,
        });

        this.addLink(link);
        node.addLink(link, 'output');

        this._nodes.forEach((node: Node) => {
          node.removeLinkables();
          node.drawInputLinkables(onLinkConstructed);
          node.setInputColor();
        });
      }
    };

    this._nodes.forEach((node: Node) => {
      node.stopListening();
      node.drawOutputLinkables(onLinkConstructed);
    });
  }

  exitLinkMode(): void {
    this._nodes.forEach((node: Node) => {
      node.removeLinkables();
      node.resetColor();
    });
    
    if (this._link) {
      this._links.splice(this._links.indexOf(this._link), 1);
      this._link.remove();
      this._link = undefined;
    }
  }

  enterZoomMode(type: number): void {
    this.elem.onclick = (evt: MouseEvent) => {
      const scale: number = this._scale + (type === ZoomMode.ZoomIn ? 1 : -1) * 0.25;
      const point: Point = getCoordsFromEvent(evt, this.elem);
      this.zoom(scale, point);
    };
  }

  exitZoomMode(): void {
    this.elem.onclick = undefined;
  }

  zoom(scale: number, point?: Point): void {
    this._scale = scale;
    const bbox: any = this.elem.getBoundingClientRect();
    const scalePoint: Point = point ? point : { x: bbox.width / 2 , y: bbox.height / 2 };

    this._transformMatrix = this._zoomToScale(this._transformMatrix, scale, scalePoint);
    this._refreshTransformMatrix({
      x: scalePoint.x / scale,
      y: scalePoint.y / scale,
    });
  }

  deleteSelected(): void {
    this._selected.forEach(_ => this.delete(_));
    this._selected = [];
  }

  delete(item: any): void {
    //if node, delete links related to it
    if (this._nodes.indexOf(item) >= 0) {
      this._nodes.splice(this._nodes.indexOf(item), 1);
      item.off('dragend', this.onNodeDragEnds.bind(this, item));
      this._nodes.forEach((node: Node, index: number) => node.setIndex(index));
    } else if (this._links.indexOf(item) >= 0) {
      // if link
      this._links.splice(this._links.indexOf(item), 1);
    }

    item.destroy(); 
  }

  deleteNodes(): void {
    this._nodes.forEach((node: Node) => node.destroy());
    this._nodes = [];
  }

  oppositeSide(side: string): string {
    return {'l':'r','r':'l','u':'d','d':'u'}[side];
  }

  //#region Getter / Setter
  get scale() {
    return this._scale;
  }

  get nodeCount() {
    return this._nodes.length;
  }

  get linkCount() {
    return this._links.length;
  }
  //#endregion
}

export default Board;