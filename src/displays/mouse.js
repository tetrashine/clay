import Draggable from 'displays/draggable';

var Mouse = function () {
  Draggable.call(this);
  this._events = {};
  this._coords = { x: 0, y: 0 };
  this.moveFn = this._move.bind(this);

  this.on = this._on.bind(this);
  this.off = this._off.bind(this);

  window.addEventListener('mousemove', this.moveFn)
};

Mouse.prototype = Object.create(Draggable.prototype);

Mouse.prototype.destroy = function() {
  window.removeEventListener('mousemove', this.moveFn)
}

Mouse.prototype._move = function(ev) {
  if (ev.changedTouches) {
    ev = ev.changedTouches[0]
  }

  this._coords = { x: ev.clientX, y: ev.clientY, side: 'mouse' }

  this.trigger('drag', this._coords.x, this._coords.y);
}

Mouse.prototype.getFaceCoord = function() { return this._coords; }

export default Mouse;