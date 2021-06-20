import Node from 'displays/node';
import Link from 'displays/link';
import Base from 'displays/base';
import Mouse from 'displays/mouse';

import {KeyCode} from 'constants/keycode';
import {EditMode} from 'constants/editmode';
import {ZoomMode} from 'constants/zoommode';
const XMLNS = "http://www.w3.org/2000/svg";

const getCoordsFromEvent = (ev, svg) => {
  if (ev.changedTouches) {
    ev = ev.changedTouches[0];
  } else if (ev.targetTouches) {
    ev = ev.targetTouches[0];
  }

  const point = svg.createSVGPoint();
  point.x = ev.clientX;
  point.y = ev.clientY;
  const invertedSVGMatrix = svg.getScreenCTM().inverse();

  return point.matrixTransform(invertedSVGMatrix);
}

class Board extends Base {
  constructor(doc, dom, width, height, zoom, editable) {
    super();
    this._width = width;
    this._height = height;
    this._zoom = zoom;
    this._editable = editable;
    this._nodes = [];
    this._links = [];
    this._showGrid = false;
    this._type = 'svg';
    this._doc = doc;
    this._parent = dom;
    this._buttons = {};
    this._scale = 1;
    this._transformMatrix = [1, 0, 0, 1, 0, 0];

    //background
    dom.setAttribute('style', 'overflow:hidden;position:absolute;background-image:url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")');
    
    let sel = this._sel = doc.createElementNS(XMLNS, 'svg');
    this._refreshTransformMatrix();
    sel.setAttribute('viewBox', `0 0 ${width} ${height}`)
    sel.setAttribute('width', width);
    sel.setAttribute('height', height);
    sel.innerText = "Your browser does not support inline svg";

    let defs = doc.createElementNS(XMLNS, 'defs');
    defs.innerHTML = `<marker id='head' orient="auto" markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill="black"/></marker><marker id='head-selected' orient="auto" markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill="blue"/></marker>`;
    sel.appendChild(defs);

    //background color
    let bg = doc.createElementNS(XMLNS, 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('style', "fill:rgba(0,0,0,0);");
    sel.appendChild(bg);

    dom.appendChild(sel);

    this.initialize(editable);
  }

  _pan(matrix, dx, dy) {
    matrix[4] = dx;
    matrix[5] = dy;
    return matrix;
  }

  //#region Private Functions
  _refreshTransformMatrix(newOrigin) {
    this._sel.setAttribute('transform', `matrix(${this._transformMatrix.join(' ')})`);

    if (newOrigin) {
      this._sel.setAttribute('style', `${ this._sel.getAttribute('style')};transform-origin:${newOrigin.x}px ${newOrigin.y}px`);
    }
  }

  _zoomToScale(matrix, scale, coord) {
    matrix[0] = scale;
    matrix[3] = scale;
    matrix[4] = (1 - scale) * coord.x;
    matrix[5] = (1 - scale) * coord.y;
    return matrix;
  }
  //#endregion

  exportAsJson() {
    return {
      "editable": this._editable,
      "nodes": this._nodes.map(node => node.exportAsJson()),
      "links": []
    };
  }

  initialize(editable) {
    editable && this.edit();

    //board drag
    this._sel.addEventListener('mousedown', (evt) => {
      if (event.which == 1 && this._mode == EditMode.Pan) {
        this._origin = getCoordsFromEvent(evt, this._sel);
      }
    });

    this._sel.addEventListener('mousemove', (evt) => {
      if (event.which == 1 && this._mode == EditMode.Pan) {
        const point = getCoordsFromEvent(evt, this._sel);
        const viewBox = this._sel.viewBox.baseVal;

        viewBox.x -= (point.x - this._origin.x);
        viewBox.y -= (point.y - this._origin.y);
      }
    });
  }

  edit() {
    this._editable = true;
    this._mode = EditMode.None;
  }

  addNode(node) { 
    node.selectable();
    this.addToBoardItems(this._nodes, node);
  }

  addLink(link) { 
    this.addToBoardItems(this._links, link);
  }

  addToBoardItems(arr, item) {
    this.appendChild(item);
    arr.push(item);
    this.subscribeToSelection(item);
  }

  setMode(mode) {
    this._mode = mode;
  }

  setNodes(nodes) { 
    this._nodes = nodes;
    nodes.forEach(node => this.addNode(node));
  }

  setLinks(links) { 
    this._links = links;
    links.forEach(link => this.addLink(link));
  }
  
  subscribeToSelection(item) { 
    item.on('clickonly', (e) => {
      this.trigger('onselect', item)
    });
  }

  enterNodeMode(onComplete=()=>{}) {
    this._sel.onclick = (evt) => {
      const point = getCoordsFromEvent(evt, this._sel);

      const config = {
        x: point.x - this._transformMatrix[4],
        y: point.y - this._transformMatrix[5],
        title: 'New Title'
      };

      let node = new Node(this._doc, config);
  
      this.addNode(node);
  
      //exit
      this.exitNodeMode();
      onComplete();
    };
  }

  exitNodeMode(onComplete=()=>{}) {
    //stop onclick events
    this._sel.onclick = undefined;
  }

  enterLinkMode(onComplete=()=>{}) {
    this._linkables = this.buildLinkablesByNodes(this._doc, this._nodes, onComplete);
    this._linkables.forEach(linkable => this._parent.appendChild(linkable));
  }

  exitLinkMode() {
    //hide all linkables
    this._nodes.forEach(node => node._linkables = []);
    this._linkables.forEach(linkable => linkable.remove());
  
    //remove if in half linking mode
    if (this._linked) {
      let link = this._linked._link;
  
      this._links.splice(this._links.indexOf(link), 1);
  
      link.remove();
      this._linked._link = undefined;
      this._linked = undefined;
    }
  }

  enterZoomMode(type) {
    this._sel.onclick = (evt) => {
      const scale = this._scale + (type === ZoomMode.ZoomIn ? 1 : -1) * 0.25;
      const point = getCoordsFromEvent(evt, this._sel);
      this.zoom(this._scale, point);
    };
  }

  exitZoomMode() {}

  zoom(scale, point) {
    this._scale = scale;
    const bbox = this._sel.getBoundingClientRect();
    const scalePoint = point ? point : { x: bbox.width / 2 , y: bbox.height / 2 };

    this._transformMatrix = this._zoomToScale(this._transformMatrix, scale, scalePoint);
    this._refreshTransformMatrix({
      x: scalePoint.x / scale,
      y: scalePoint.y / scale,
    });
  }

  buildLinkablesByNodes(doc, nodes, onComplete) {
    let linkables = nodes.map(node => {
      let coordsList = node.getFaceCoords();
      let linkables = coordsList.map(coords => this.generateLinkable(doc, coords, node, onComplete));
      node._linkables = linkables;
      node.on('drag', (x, y) => {
        //when node is dragged, move all linkables together with it
        linkables.forEach(linkable => {
          const WIDTH = 10;
          let side = linkable.getAttribute('side');
          let coords = node.getFaceCoord(side);
  
          linkable.style.left = `${coords.x-WIDTH/2}px`;
          linkable.style.top = `${coords.y-WIDTH/2}px`;
        });
      });
  
      return linkables;
    });
  
    return [].concat.apply([], linkables);
  }

  generateLinkable(doc, coords, node, onComplete) {
    const WIDTH = 10;
    let div = this.createDomElement(doc, 'div', '');
    div.selected = false;
    div.setAttribute('side', coords.side);
    div.setAttribute('style', `position: absolute;left:${coords.x-WIDTH/2}px;top:${coords.y-WIDTH/2}px;width:${WIDTH}px;height:${WIDTH}px;background-color: white;border: 1px solid black;`);
    div._node = node;
  
    div.onmouseover = () => {
      if (!div.selected) {
        div.style.backgroundColor = 'red';
      }
    };
  
    div.onmouseout = () => {
      if (!div.selected) {
        div.style.backgroundColor = 'white';
      }
    };
  
    div.onclick = () => {
      let node = div._node;
  
      if (this._linked) {
        this._mode = EditMode.None;
  
        //complete linking target
        this._linked._link.setTarget(node, div.getAttribute('side'));
        this._linked._link.setDotted(false);
        this._linked._link.selectable();
  
        this._linked._link = undefined;
        this._linked.selected = false;
        this._linked.style.backgroundColor = 'white';
        this._linked = undefined;
  
        //exit
        this.exitLinkMode();
        onComplete();
        
      } else {
        //linking src
        this._linked = div;
        div.selected = true;
        div.style.backgroundColor = 'green';
  
        //hide linkables from same nodes
        node._linkables.forEach(linkable => {
          if (linkable != div) linkable.style.display = "none";
        });
  
        //draw link from clicked to mouse
        let side = div.getAttribute('side');
        let link = new Link(this._doc, node, side, new Mouse(), this.oppositeSide(side), {
          dotted: true
        });
        div._link = link;
  
        //add to links
        this.addLink(link);
      }
    }
  
    return div;
  }

  delete(item) {
    //if node, delete links related to it
    this._nodes.splice(this._nodes.indexOf(item), 1);
  
    // if link
    this._links.splice(this._links.indexOf(item), 1);
  
    item.destroy(); 
  }

  oppositeSide(side) {
    return {'l':'r','r':'l','u':'d','d':'u'}[side];
  }

  //#region Getter / Setter
  get scale() {
    return this._scale;
  }
  //#endregion
}

export default Board;