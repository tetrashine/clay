import Base from 'displays/abstract/base';
import SelectableHOC from 'composite/selectable';

import { Point } from 'types/index';

abstract class Draggable extends Base {
  private _x: number;
  private _y: number;
  private _enabled: boolean;
  private _dragged: boolean;
  private _offset: {x: number, y: number};
  private startDragFn: (evt:any) => void;
  private dragFn: (evt:any) => void;
  private endDragFn: () => void;

  constructor() {
    super();
    this._enabled = false;
    this._dragged = false;
  }

  getCoordsFromEvent(ev: any): Point {
    if (ev.changedTouches) {
      ev = ev.changedTouches[0]
    }
    return { x: ev.clientX, y: ev.clientY }
  }

  draggable(el: any): void {
    this._enabled = true;
  
    this.startDragFn = this.startDrag.bind(this);
    this.dragFn = this.drag.bind(this);
    this.endDragFn = this.endDrag.bind(this);
  
    this.init(this.enabled, el);
  }

  init(enabled: boolean, el: any): void {
    el.addEventListener('mousedown', this.startDragFn);
    el.addEventListener('touchstart', this.startDragFn, { passive: false });
  }

  startListening() {
    this.elem.addEventListener('mousedown', this.startDragFn);
    this.elem.addEventListener('touchstart', this.startDragFn, { passive: false });
  }
  
  stopListening() {
    //remove click event listener
    //remove drag event listener
    this.elem.removeEventListener('mousedown', this.startDragFn);
    this.elem.removeEventListener('touchstart', this.startDragFn, { passive: false });
  }

  destroy() {
    this.stopListening();
  }

  startDrag(evt: MouseEvent): void {

    // Prevent browser drag behavior as soon as possible
    evt.preventDefault()
  
    // Prevent propagation to a parent that might also have dragging enabled
    evt.stopPropagation()
  
    //setup last click
    var clicked = this.getCoordsFromEvent(evt);
    var rect = this.elem.getBoundingClientRect();
    this._offset = {
      x: clicked.x - rect.x,
      y: clicked.y - rect.y
    };
  
    //register mousemove
    window.addEventListener('mousemove', this.dragFn)
    window.addEventListener('touchmove', this.dragFn, { passive: false })
  
    //register end drag
    window.addEventListener('mouseup', this.endDragFn)
    window.addEventListener('touchend', this.endDragFn, { passive: false })
  }

  drag(evt: MouseEvent): void {
    if (!this._dragged) this.trigger('dragstart');

    this._dragged = true;
    const offset = this._offset;
    const coord = this.getCoordsFromEvent(evt);
  
    const x = coord.x - offset.x;
    const y = coord.y - offset.y;
    const dx = x - this.x;
    const dy = y - this.y;
    this.setXY({
      x: x, 
      y: y
    });
  
    this.trigger('drag', {
      x: x,
      y: y,
      dx: dx,
      dy: dy,
    });
  }

  endDrag() {
    if (!this._dragged) this.trigger('clickonly');
    this._dragged = false;

    window.removeEventListener('mousemove', this.dragFn);
    window.removeEventListener('touchmove', this.dragFn);
    window.removeEventListener('mouseup', this.endDragFn);
    window.removeEventListener('touchend', this.endDragFn);

    this.trigger('dragend');
  }
  
  setXY(point: Point): void {
    this.x = point.x;
    this.y = point.y;
  }

  isDragging(): boolean {
    return this._dragged;
  }

  get x() {
    return this._x;
  }

  set x(v) {
    this._x = v;
  }

  get y() {
    return this._y;
  }

  set y(v) {
    this._y = v;
  }

  get enabled() {
    return this._enabled;
  }
}

export default SelectableHOC(Draggable);