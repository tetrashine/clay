import Node from 'displays/node';
import Link from 'displays/link';
import Base from 'displays/base';
import Mouse from 'displays/mouse';

import {EditMode} from 'constants/editmode';
import {ZoomMode} from 'constants/zoommode';

import { default as config } from 'constants/config';
const {
  LINK_COLOR, LINK_SELECTED_COLOR,
  NODE_CONNECTOR_COLOR, NODE_CONNECTOR_SELECTED_COLOR, NODE_CONNECTOR_BORDER_COLOR, NODE_CONNECTOR_HOVER_COLOR
} = config;

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
    
    let sel = this._sel = doc.createElementNS(XMLNS, 'svg');
    this._refreshTransformMatrix();
    sel.setAttribute('viewBox', `0 0 ${width} ${height}`)
    sel.setAttribute('width', width);
    sel.setAttribute('height', height);
    sel.innerText = "Your browser does not support inline svg";

    let defs = doc.createElementNS(XMLNS, 'defs');
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

  load(state) {console.log('load', state)
    //parse new state
    const {nodes: nodeState, links: linkState} = state;
    const nodes = this.parseNodes(this._doc, nodeState, this._editable);
    const links = this.parseLinks(this._doc, linkState, nodes, this._editable);

    //clear current state
    this.deleteNodes();

    //assignment
    this.setNodes(nodes);
    this.setLinks(links);
  }

  parseNodes(doc, configs, editable) {
    return configs.map(config => new Node(doc, config.node, {
      editable: editable,
      ...config,
    }));
  }

  parseLinks(doc, configs, nodes, editable) {
    return configs.map(config => {
      const { src, target, output_index, input_index } = config;
      return new Link(doc, nodes[src], output_index, nodes[target], input_index, {
        editable: editable
      })
    });
  }

  exportState() {
    return {
      "editable": this._editable,
      "nodes": this._nodes.map(node => node.exportAsJson()),
      "links": this._links.map(link => link.exportAsJson())
    };
  }

  clearHighlight() {
    //clear highlight
    this._highlight.setAttribute('width', 0);
    this._highlight.setAttribute('height', 0);
  }

  initialize(editable) {
    editable && this.edit();
    var highlighting = false;
    var origin = undefined;

    //board drag
    this.elem.addEventListener('mousedown', (evt) => {
      if (event.which === 1) {//left click
        origin = getCoordsFromEvent(evt, this.elem);
        this.elem.appendChild(this._highlight);
      }
    });

    this.elem.addEventListener('mousemove', (evt) => {
      
      if (event.which == 1) {
        const point = getCoordsFromEvent(evt, this.elem);

        if (this._mode == EditMode.Pan) {
          const viewBox = this.elem.viewBox.baseVal;

          viewBox.x -= (point.x - origin.x);
          viewBox.y -= (point.y - origin.y);
        } else if (origin && this._nodes.every(_ => !_.isDragging())) {
          highlighting = true;
          
          let left = origin.x < point.x ? origin.x : point.x;
          let right = origin.x > point.x ? origin.x : point.x;
          let top = origin.y < point.y ? origin.y : point.y;
          let bottom = origin.y > point.y ? origin.y : point.y;
          
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
        const svgRect = this.elem.createSVGRect();
        svgRect.x = this._highlight.attributes.x.value;
        svgRect.y = this._highlight.attributes.y.value;
        svgRect.width = this._highlight.attributes.width.value;
        svgRect.height = this._highlight.attributes.height.value;

        this.unselectItems();

        this.elem.getIntersectionList(svgRect, null).forEach(_ => {
          const node = _.node || _.parentNode.node;
          if (node) {
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

  onNodeDrag(node, { dx, dy }) {
    this._selected.filter(n => n !== node).forEach(n => {
      n.setXY(n.x + dx, n.y + dy);
      n._links.forEach(link => link.redrawPath());
    });
  }

  reorderItems(selected) {
    selected.forEach((baseItem) => {
      this.removeChild(baseItem);
      this.appendChild(baseItem);
    });
  }

  unselectItems() {
    this._selected.forEach(_ => {
      _.unselect();
      _.off('drag', this.onNodeDrag.bind(this, _));
    });
    this._selected = [];
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
    this._links.push(link);
    this.appendChild(link);
  }

  addToBoardItems(arr, item) {
    item.setIndex(arr.length);
    this.appendChild(item);
    arr.push(item);
    this.subscribeToSelection(item);
  }

  setMode(mode) {
    this._mode = mode;
  }

  setNodes(nodes) { 
    nodes.forEach(node => this.addNode(node));
  }

  setLinks(links) { 
    links.forEach(link => this.addLink(link));
  }
  
  subscribeToSelection(item) { 
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

  enterSelectionMode(onComplete=()=>{}){
    this.elem.onclick = (evt) => {
      const point = getCoordsFromEvent(evt, this._sel);

      //exit
      this.exitSelectionMode();
      onComplete(point);
    };
  }

  enterNodeMode(onComplete=()=>{}) {
    this.enterSelectionMode((point) => {
      const config = {
        x: point.x - this._transformMatrix[4],
        y: point.y - this._transformMatrix[5],
        title: 'New Title',
        editable: this._editable,
      };

      let node = new Node(this._doc, null, config);
      this.addNode(node);
  
      onComplete();
    });
  }

  exitSelectionMode() {
    //stop onclick events
    this.elem.onclick = undefined;
  }

  enterLinkMode(onComplete=()=>{}) {
    const scope = this;
    const onLinkConstructed = (node, ioIndex) => {
      if (this._link) {
        scope._mode = EditMode.None;
        
        //complete linking target
        this._link.setTarget(node, ioIndex);
        this._link.setDotted(false);
        this._link.selectable();

        //clean up
        onComplete();

        this._nodes.forEach(node => {
          node.startListening();
          node.removeLinkables();
          node.resetColor();
        });

        this._link = undefined;

      } else {
        const link = this._link = new Link(this._doc, node, ioIndex, new Mouse(this.elem.getBoundingClientRect()), -1, {
          dotted: true,
          editable: this._editable,
        });

        this.addLink(link);
        node.addLink(link);

        this._nodes.forEach(node => {
          node.removeLinkables();
          node.drawInputLinkables(onLinkConstructed);
          node.setInputColor();
        });
      }
    };

    this._nodes.forEach(node => {
      node.stopListening();
      node.drawOutputLinkables(onLinkConstructed);
    });
  }

  exitLinkMode() {
    this._nodes.forEach(node => {
      node.removeLinkables();
      node.resetColor();
    });
    
    this._links.splice(this._links.indexOf(this._link), 1);
    this._link.remove();
    this._link = undefined;
  }

  enterZoomMode(type) {
    this._sel.onclick = (evt) => {
      const scale = this._scale + (type === ZoomMode.ZoomIn ? 1 : -1) * 0.25;
      const point = getCoordsFromEvent(evt, this._sel);
      this.zoom(scale, point);
    };
  }

  exitZoomMode() {
    this._sel.onclick = undefined;
  }

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

  delete(item) {
    //if node, delete links related to it
    if (this._nodes.indexOf(item) >= 0) {
      this._nodes.splice(this._nodes.indexOf(item), 1);
      this._nodes.forEach((node, index) => node.setIndex(index));
    } else if (this._links.indexOf(item) >= 0) {
      // if link
      this._links.splice(this._links.indexOf(item), 1);
    }
    
    item.destroy(); 
  }

  deleteNodes() {
    this._nodes.forEach(node => node.destroy());
    this._nodes = [];
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