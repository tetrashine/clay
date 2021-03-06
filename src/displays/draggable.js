import Base from 'displays/base';
import SelectableHOC from 'composite/selectable';

const getCoordsFromEvent = ev => {
  if (ev.changedTouches) {
    ev = ev.changedTouches[0]
  }
  return { x: ev.clientX, y: ev.clientY }
}

class Draggable extends Base {
  constructor() {
    super();
    this._enabled = false;
    this._dragged = false;
  }

  draggable(el) {
    this._enabled = true;
  
    this.startDragFn = this.startDrag.bind(this);
    this.dragFn = this.drag.bind(this);
    this.endDragFn = this.endDrag.bind(this);
  
    this.init(this.enabled, el);
  }

  init(enabled, el) {
    el.addEventListener('mousedown', this.startDragFn);
    el.addEventListener('touchstart', this.startDragFn, { passive: false });
  }

  startListening() {
    this._sel.addEventListener('mousedown', this.startDragFn);
    this._sel.addEventListener('touchstart', this.startDragFn, { passive: false });
  }
  
  stopListening() {
    //remove click event listener
    //remove drag event listener
    this._sel.removeEventListener('mousedown', this.startDragFn);
    this._sel.removeEventListener('touchstart', this.startDragFn, { passive: false });
  }

  destroy() {
    this.stopListening();
  }

  startDrag(evt) {

    // Prevent browser drag behavior as soon as possible
    evt.preventDefault()
  
    // Prevent propagation to a parent that might also have dragging enabled
    evt.stopPropagation()
  
    //setup last click
    var clicked = getCoordsFromEvent(evt);
    var rect = this._sel.getBoundingClientRect();
    this.offset = {
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

  drag(evt) {
    this._dragged = true;
    var offset = this.offset;
    var coord = getCoordsFromEvent(evt);
  
    var x = coord.x - offset.x;
    var y = coord.y - offset.y;
    this.setXY(x, y);
  
    this.trigger('drag', x, y);
  }

  endDrag(evt) {
    if (!this._dragged) this.trigger('clickonly');
    this._dragged = false;

    window.removeEventListener('mousemove', this.dragFn);
    window.removeEventListener('touchmove', this.dragFn);
    window.removeEventListener('mouseup', this.endDragFn);
    window.removeEventListener('touchend', this.endDragFn);
  }
  
  setXY(x, y) {
    this._x = x;
    this._y = y;
  }

  isDragging() {
    return this._dragged;
  }
}

export default SelectableHOC(Draggable);