import Base from 'displays/base';
import SelectableHOC from 'composite/selectable';

const ARROW_WIDTH = 4;
const NODE_WIDTH = 30;
const NODE_HEIGHT = 15;
const NODE_BUFFER = 10;

class Link extends Base {

	constructor(doc, src, src_side, target, target_side, config, editable) {
		super();
		this._type = 'regular';
		this._src = src;
		this._src_side = src_side;
		this._target = target;
		this._target_side = target_side;

		const {dotted=false, mode='elbow'} = config;
		this._dotted = dotted;
		this._mode = mode;
		this._editable = editable;

		this.initialize(doc, src, src_side, target, target_side);
	}

	_dragFn(x, y) {
		let coord1 = this._src.getFaceCoord(this._src_side);
		let coord2 = this._target.getFaceCoord(this._target_side);
		this._sel.setAttribute('d', this.formPath(this._mode, coord1, coord2));
	};

	getSrc() { return this._src; }
	getTarget() { return this._target; }
	setTarget(target, target_side) { 
		this._target.off('drag', this.dragFn);
		this._target.destroy();
		this._target = target;
		this._target_side = target_side;
		target.on('drag', this.dragFn);

		this.redrawPath();
	}

	setDotted(dotted) { 
		this._dotted = dotted; 
		this.redrawPath();
	}

	redrawPath() {
		let coord1 = this._src.getFaceCoord(this._src_side);
		let coord2 = this._target.getFaceCoord(this._target_side);
	
		let sel = this._sel;
		sel.setAttribute('stroke', this._selected ? "blue" : "black");
		sel.setAttribute('marker-end', this._selected ? "url(#head-selected)" : "url(#head)");
		sel.setAttribute('stroke-dasharray', this._dotted && '10,10');
		sel.setAttribute('d', this.formPath(this._mode, coord1, coord2));
	}

	initialize(doc, src, src_side, target, target_side) {
		let xmlns = "http://www.w3.org/2000/svg";
		let sel = this._sel = doc.createElementNS(xmlns, 'path');
	
		this.dragFn = this._dragFn.bind(this);
	
		sel.setAttribute('stroke-width', "2");
		sel.setAttribute('fill', "none");
		this.redrawPath();
	
		this._src = src;
		this._target = target;
	
		src.on('drag', this.dragFn);
		target.on('drag', this.dragFn);
	}

	select() {
		this.constructor.prototype.select.call(this);
		this.redrawPath();
	}

	unselect() {
		this.constructor.prototype.unselect.call(this);
		this.redrawPath();
	}

	destroy() {
		this._src.off('drag', this.dragFn);
		this._target.off('drag', this.dragFn);
		this.remove();
	}

	exportAsJson() {}

	formPath(mode, coord1, coord2) {
		let d, midX, midY;
		switch(mode) {
			case 'direct':
				d = `M${coord1.x},${coord1.y} T${coord2.x-ARROW_WIDTH},${coord2.y}`;
				break;
	
			case 'curve':
				if (Math.abs(coord2.y - coord1.y) < 0.2 * coord2.y) {
					return `M${coord1.x},${coord1.y} T${coord2.x-ARROW_WIDTH},${coord2.y}`;
				}
				
				midX = coord1.x + (coord2.x - coord1.x) / 2;
				midY = coord1.y + (coord2.y - coord1.y) / 2;
			
				d = `M${coord1.x},${coord1.y} Q${midX},${coord1.y} ${midX},${midY} T${coord2.x-ARROW_WIDTH},${coord2.y}`;
				break;
	
			case 'elbow':
			default:
				let neg; 
				midX = coord1.x + (coord2.x - coord1.x) / 2, 
				midY = coord1.y + (coord2.y - coord1.y) / 2;
	
				if (this._target_side == 'l') {
					if (this._src_side == 'r') {
						//direct access
						if (coord2.x >= coord1.x + ARROW_WIDTH + 3) {//right enough
							d = `M${coord1.x},${coord1.y} L${midX},${coord1.y} L${midX},${coord2.y} L${coord2.x-ARROW_WIDTH},${coord2.y}`;
						} else {
							neg = (coord2.y > coord1.y + 2 * NODE_HEIGHT + NODE_BUFFER) || (coord2.y < coord1.y - NODE_HEIGHT) ? 1 : -1;
							d = `M${coord1.x},${coord1.y} L${coord1.x + NODE_BUFFER},${coord1.y} L${coord1.x + NODE_BUFFER},${coord1.y + neg * (NODE_HEIGHT + NODE_BUFFER)} L${coord2.x - NODE_BUFFER},${coord1.y + neg * (NODE_HEIGHT + NODE_BUFFER)} L${coord2.x - NODE_BUFFER},${coord2.y} L${coord2.x-ARROW_WIDTH},${coord2.y}`;
						}
					} else if (this._src_side != 'l') {
						//sub-direct
						neg = (this._src_side == 'u') ? -1 : 1;
						if (coord2.x >= coord1.x + 2*NODE_WIDTH) {//right enough
							alongTheLine = coord1.y < coord1.y + neg * NODE_BUFFER && coord1.y + neg * NODE_BUFFER < coord2.y || coord1.y > coord1.y + neg * NODE_BUFFER && coord1.y + neg * NODE_BUFFER > coord2.y;
							midStr = alongTheLine ? `L${coord1.x},${coord2.y}` : `L${coord1.x},${coord1.y + neg * NODE_BUFFER} L${midX},${coord1.y + neg * NODE_BUFFER} L${midX},${coord2.y}`;
	
							d = `M${coord1.x},${coord1.y} ${midStr} L${coord2.x - NODE_BUFFER},${coord2.y} L${coord2.x-ARROW_WIDTH},${coord2.y}`;
						} else {  
							d = `M${coord1.x},${coord1.y} L${coord1.x},${coord1.y + neg * NODE_BUFFER} L${coord2.x - NODE_BUFFER},${coord1.y + neg * NODE_BUFFER} L${coord2.x - NODE_BUFFER},${coord2.y} L${coord2.x-ARROW_WIDTH},${coord2.y}`;
						}
					} else {//left
						//may have blockage
						let coord1X = coord1.x;
						alongTheHorizontalDirection = coord1X > coord1X - NODE_BUFFER && coord1X - NODE_BUFFER > coord2.x;
						if (coord2.y > coord1.y + (NODE_HEIGHT + NODE_BUFFER) || coord2.y < coord1.y	- (NODE_HEIGHT + NODE_BUFFER)) {
							//block by node2 to destination
							midStr = alongTheHorizontalDirection ? `L${coord1.x - ARROW_WIDTH},${coord1.y} L${coord2.x - NODE_BUFFER},${coord1.y} L${coord2.x - NODE_BUFFER},${coord2.y}` : `L${coord1.x - NODE_BUFFER},${coord1.y} L${coord1.x - NODE_BUFFER},${coord2.y} L${coord2.x},${coord2.y} L${coord2.x - NODE_BUFFER},${coord2.y}`;
							d = `M${coord1.x},${coord1.y} ${midStr} L${coord2.x - ARROW_WIDTH},${coord2.y}`;
						} else {
							// direct access
							neg = (coord2.y > coord1.y - (NODE_HEIGHT - 5)) ? -1 : 1;
							d = `M${coord1.x},${coord1.y} L${coord1.x - NODE_BUFFER},${coord1.y} L${coord1.x - NODE_BUFFER},${coord1.y + neg * (NODE_HEIGHT + NODE_BUFFER)} L${coord2.x - NODE_BUFFER},${coord1.y + neg * (NODE_HEIGHT + NODE_BUFFER)} L${coord2.x - NODE_BUFFER},${coord2.y} L${coord2.x - ARROW_WIDTH},${coord2.y}`;
						}
					}
				} else if (this._target_side == 'u') {
					if (this._src_side == 'd') {
						//direct access
						if (coord2.y > coord1.y + ARROW_WIDTH + 1) {
							d = `M${coord1.x},${coord1.y} L${coord1.x},${midY} L${coord2.x},${midY} L${coord2.x},${coord2.y-ARROW_WIDTH}`;
						} else {
							d = `M${coord1.x},${coord1.y} L${coord1.x},${coord1.y + NODE_BUFFER} L${midX},${coord1.y + NODE_BUFFER} L${midX},${coord2.y - NODE_BUFFER} L${coord2.x},${coord2.y - NODE_BUFFER} L${coord2.x},${coord2.y - ARROW_WIDTH}`;
						}
					} else if (this._src_side !== 'u') {
						//sub-direct
						neg = (this._src_side == 'left') ? -1 : 1;
						if (this._src_side == 'left' && coord1.x >= coord2.x + 0.5 * NODE_WIDTH || this._src_side == 'right' && (coord1.x < coord2.x - 0.5 * NODE_WIDTH)) {
							if (coord1.y < coord2.y) {//top enough
								d = `M${coord1.x},${coord1.y} L${coord2.x},${coord1.y} L${coord2.x},${coord2.y-ARROW_WIDTH}`;
							} else {
								d = `M${coord1.x},${coord1.y} L${midX},${coord1.y} L${midX},${coord2.y-NODE_BUFFER} L${coord2.x},${coord2.y-NODE_BUFFER} L${coord2.x},${coord2.y-ARROW_WIDTH}`;
							}
						} else {
							d = `M${coord1.x},${coord1.y} L${coord1.x + neg * NODE_BUFFER},${coord1.y} L${coord1.x + neg * NODE_BUFFER},${coord2.y-NODE_BUFFER} L${coord2.x},${coord2.y-NODE_BUFFER} L${coord2.x},${coord2.y-ARROW_WIDTH}`;
						}
					} else if (this._src_side == 'u') {
						//may have blockage
						if (coord2.y < coord1.y + ARROW_WIDTH + 1) {
							d = `M${coord1.x},${coord1.y} L${coord1.x},${coord2.y-NODE_BUFFER} L${coord2.x},${coord2.y-NODE_BUFFER} L${coord2.x},${coord2.y-ARROW_WIDTH}`;
						} else {
							d = `M${coord1.x},${coord1.y} L${coord1.x},${coord1.y-NODE_BUFFER} L${coord2.x},${coord1.y-NODE_BUFFER} L${coord2.x},${coord2.y-NODE_BUFFER} L${coord2.x},${coord2.y-NODE_BUFFER} L${coord2.x},${coord2.y-ARROW_WIDTH}`;
						}
					}
				} else if (this._target_side == 'r') {
					if (this._src_side == 'l') {//best
						if (coord1.x >= coord2.x + ARROW_WIDTH + NODE_BUFFER) {//right enough
							d = `M${coord1.x},${coord1.y} L${midX},${coord1.y} L${midX},${coord2.y} L${coord2.x+ARROW_WIDTH},${coord2.y}`;
						} else {
							if (
								coord2.y > coord1.y + 2*NODE_HEIGHT ||
								coord2.y < coord1.y	- 2*NODE_HEIGHT
							) {
								d = `M${coord1.x},${coord1.y} L${coord1.x - NODE_BUFFER},${coord1.y} L${coord1.x - NODE_BUFFER},${midY} L${coord2.x + NODE_BUFFER},${midY} L${coord2.x + NODE_BUFFER},${coord2.y} L${coord2.x + ARROW_WIDTH},${coord2.y}`;
							} else {
								neg = (coord2.y > coord1.y - (NODE_HEIGHT - 5)) ? -1 : 1;
								d = `M${coord1.x},${coord1.y} L${coord1.x - NODE_BUFFER},${coord1.y} L${coord1.x - NODE_BUFFER},${coord1.y + neg * (NODE_HEIGHT + NODE_BUFFER)} L${coord2.x + NODE_BUFFER},${coord1.y + neg * (NODE_HEIGHT + NODE_BUFFER)} L${coord2.x + NODE_BUFFER},${coord2.y} L${coord2.x + ARROW_WIDTH},${coord2.y}`;
							}
						}
					} else if (this._src_side != 'r') {
						neg = (this._src_side == 'u') ? -1 : 1;
	
						if (coord1.x >= coord2.x + NODE_BUFFER) {//right enough
							alongTheLine = coord1.y < coord1.y + neg * NODE_BUFFER && coord1.y + neg * NODE_BUFFER < coord2.y || coord1.y > coord1.y + neg * NODE_BUFFER && coord1.y + neg * NODE_BUFFER > coord2.y;
							midStr = alongTheLine ? `L${coord1.x},${coord2.y}` : `L${coord1.x},${coord1.y + neg * NODE_BUFFER} L${midX},${coord1.y + neg * NODE_BUFFER} L${midX},${coord2.y}`;
	
							d = `M${coord1.x},${coord1.y} ${midStr} L${coord2.x+ARROW_WIDTH},${coord2.y}`;
						} else {
							d = `M${coord1.x},${coord1.y} L${coord1.x},${coord1.y + neg*NODE_BUFFER} L${coord2.x+NODE_BUFFER},${coord1.y + neg*NODE_BUFFER} L${coord2.x+NODE_BUFFER},${coord2.y} L${coord2.x + ARROW_WIDTH},${coord2.y}`;
						}
					} else {
						if (coord1.x < coord2.x + NODE_BUFFER) {//right enough
							d = `M${coord1.x},${coord1.y} L${coord2.x+NODE_BUFFER},${coord1.y} L${coord2.x+NODE_BUFFER},${coord2.y} L${coord2.x+ARROW_WIDTH},${coord2.y}`;
						} else {
							d = `M${coord1.x},${coord1.y} L${coord1.x+NODE_BUFFER},${coord1.y} L${coord1.x+NODE_BUFFER},${coord1.y} L${coord1.x+NODE_BUFFER},${coord2.y} L${coord2.x+ARROW_WIDTH},${coord2.y}`;
						}
					}
				} else if (this._target_side == 'd') {
					if (this._src_side == 'u') {
						if (coord2.y < coord1.y + ARROW_WIDTH + 1) {
							d = `M${coord1.x},${coord1.y} L${coord1.x},${midY} L${coord2.x},${midY} L${coord2.x},${coord2.y+ARROW_WIDTH}`;
						} else {
							d = `M${coord1.x},${coord1.y} L${coord1.x},${coord1.y - NODE_BUFFER} L${midX},${coord1.y - NODE_BUFFER} L${midX},${coord2.y + NODE_BUFFER} L${coord2.x},${coord2.y + NODE_BUFFER} L${coord2.x},${coord2.y + ARROW_WIDTH}`;
						}
					} else if (this._src_side != 'd') {
						if (coord2.y < coord1.y + ARROW_WIDTH + 1) {//bottom
							neg = (this._src_side == 'l') ? -1 : 1;
							alongTheLine = coord1.x < coord1.x + neg * NODE_BUFFER && coord1.x + neg * NODE_BUFFER < coord2.x || coord1.x > coord1.x + neg * NODE_BUFFER && coord1.x + neg * NODE_BUFFER > coord2.x;
							midStr = alongTheLine ? `L${coord2.x},${coord1.y}` : `L${coord1.x+neg*NODE_BUFFER},${coord1.y} L${coord1.x+neg*NODE_BUFFER},${midY} L${coord2.x},${midY}`;
	
							d = `M${coord1.x},${coord1.y} ${midStr} L${coord2.x},${coord2.y+ARROW_WIDTH}`;
						} else {
							if (
								coord2.x > coord1.x + NODE_WIDTH ||
								coord2.x < coord1.x	- NODE_WIDTH - NODE_BUFFER
							) { 
								d = `M${coord1.x},${coord1.y} L${coord1.x-NODE_BUFFER},${coord1.y} L${coord1.x-NODE_BUFFER},${coord2.y+NODE_BUFFER} L${coord2.x},${coord2.y+NODE_BUFFER} L${coord2.x},${coord2.y+ARROW_WIDTH}`;
							} else {
								d = `M${coord1.x},${coord1.y} L${coord2.x-NODE_WIDTH-NODE_BUFFER},${coord1.y} L${coord2.x-NODE_WIDTH-NODE_BUFFER},${coord2.y+NODE_BUFFER} L${coord2.x},${coord2.y+NODE_BUFFER} L${coord2.x},${coord2.y+ARROW_WIDTH}`;
							}
						}
					} else {
						neg = (coord2.x > coord1.x) ? 1 : -1;
						if (coord2.y < coord1.y) {
							if (
								coord2.x > coord1.x + NODE_WIDTH ||
								coord2.x < coord1.x	- NODE_WIDTH
							) {
								d = `M${coord1.x},${coord1.y} L${coord1.x},${coord1.y + NODE_BUFFER} L${coord2.x},${coord1.y + NODE_BUFFER} L${coord2.x},${coord2.y + ARROW_WIDTH}`;
							} else {
								d = `M${coord1.x},${coord1.y} L${coord1.x},${coord1.y + NODE_BUFFER} L${coord1.x + neg * (NODE_WIDTH + NODE_BUFFER)},${coord1.y + NODE_BUFFER} L${coord1.x + neg * (NODE_WIDTH + NODE_BUFFER)},${coord2.y + NODE_BUFFER} L${coord2.x},${coord2.y + NODE_BUFFER} L${coord2.x},${coord2.y + ARROW_WIDTH}`;
							}
						} else {
							if (
								coord2.x > coord1.x + NODE_WIDTH ||
								coord2.x < coord1.x	- NODE_WIDTH
							) {
								d = `M${coord1.x},${coord1.y} L${coord1.x},${coord2.y + NODE_BUFFER} L${coord2.x},${coord2.y + NODE_BUFFER} L${coord2.x},${coord2.y + ARROW_WIDTH}`;
							} else {
								d = `M${coord1.x},${coord1.y} L${coord1.x},${coord1.y + NODE_BUFFER} L${coord2.x + neg * (NODE_WIDTH + NODE_BUFFER)},${coord1.y + NODE_BUFFER} L${coord2.x + neg * (NODE_WIDTH + NODE_BUFFER)},${coord2.y + NODE_BUFFER} L${coord2.x},${coord2.y + NODE_BUFFER} L${coord2.x},${coord2.y + ARROW_WIDTH}`;
							}
						}
					}
				}
				break;
		}
	
		return d
	}
}

export default SelectableHOC(Link);