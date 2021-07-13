import Draggable from 'displays/draggable';

var Mouse = function (offset) {
  Draggable.call(this);
  this._events = {};
  this._coords = { x: 0, y: 0 };
  this._offset = offset;
  this.moveFn = this._move.bind(this);

  window.addEventListener('mousemove', this.moveFn)
};

Mouse.prototype = Object.create(Draggable.prototype);

Mouse.prototype.destroy = function() {
  window.removeEventListener('mousemove', this.moveFn)
}

Mouse.prototype.addLink = function() {}

Mouse.prototype._move = function(ev) {
  if (ev.changedTouches) {
    ev = ev.changedTouches[0]
  }

  this._coords = { x: ev.clientX - this._offset.left, y: ev.clientY - this._offset.top, side: 'mouse' }

  this.trigger('drag', this._coords.x, this._coords.y);
}

Mouse.prototype.getInputCoord = Mouse.prototype.getFaceCoord = function() { return this._coords; }

export default Mouse;