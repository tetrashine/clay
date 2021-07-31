import Evented from 'displays/abstract/evented';
import Link from 'displays/link';

import { Point, NodePoint, Offset } from 'types/index';
import INode from 'interfaces/inode';

export default class Mouse extends Evented implements INode {
  private _coords: NodePoint;
  private _offset: Offset;
  private _link: Link;

  constructor(offset: Offset) {
    super();
    this._coords = { x: 0, y: 0, side: '' };
    this._offset = offset;

    this.move = this.move.bind(this);
    this.drag = this.drag.bind(this);

    this.on('drag', this.drag);
    window.addEventListener('mousemove', this.move);
  }

  drag() {
    this._link.redrawPath();
  }

  destroy() {
    this.off('drag', this.drag);
    window.removeEventListener('mousemove', this.move)
  }

  addLink(link: Link) { this._link = link; }

  deleteLink(link: Link) { this._link = undefined; }

  move(ev: any): void {
    if (ev.changedTouches) {
      ev = ev.changedTouches[0]
    }

    const newX: number = ev.clientX - this._offset.left;
    const newY: number = ev.clientY - this._offset.top;

    const dx: number = newX - this._coords.x;
    const dy: number = newY - this._coords.y;
  
    this._coords = { 
      x: newX, 
      y: newY, 
      side: 'mouse' 
    };
  
    this.trigger('drag', {
      x: newX,
      y: newY,
      dx: dx, 
      dy: dy
    });
  }

  getInputCoord(): Point { 
    return {
      x: this._coords.x,
      y: this._coords.y
    };
  }

  getOutputCoord(): Point { 
    return {
      x: this._coords.x,
      y: this._coords.y
    };
  }

  setXY(point: Point): void {
    this._coords.x = point.x;
    this._coords.y = point.y;
  }

  getFaceCoord(side: string): NodePoint { return this._coords; }

  getFaceCoords(): NodePoint[] { return [this._coords]; }

  getIndex(): number { return -1; }
  setIndex(index: number) {}
};