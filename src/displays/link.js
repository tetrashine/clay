import Base from 'displays/base';
import SelectableHOC from 'composite/selectable';

import { default as config } from 'constants/config';
const { NODE_HEIGHT, LINK_COLOR, LINK_SELECTED_COLOR, LINK_ARROW_WIDTH, NODE_IO_SIZE } = config;

class Link extends SelectableHOC(Base) {

	constructor(doc, src, output_index, target, input_index, {type='regular', dotted=false, mode='elbow', editable=true}) {
		super();

		//configuration
		this._type = type;
		this._dotted = dotted;
		this._mode = mode;
		this._editable = editable;
		
		this.initialize(doc, src, output_index, target, input_index);
	}

	_dragFn(x, y) {
		let coord1 = this._src.getOutputCoord(this._output_index);
		let coord2 = this._target.getInputCoord(this._input_index);
		this._sel.setAttribute('d', this.formPath(this._mode, coord1, coord2));
	};

	getSrc() { return this._src; }
	getTarget() { return this._target; }
	setTarget(target, input_index) { 
		this._target.off('drag', this.dragFn);
		this._target.destroy();
		this._target = target;
		this._input_index = parseInt(input_index) - 1;
		target.on('drag', this.dragFn);
		target.addLink(this);

		this.redrawPath();
	}

	setDotted(dotted) { 
		this._dotted = dotted; 
		this.redrawPath();
	}

	redrawPath() {
		let coord1 = this._src.getOutputCoord(this._output_index);
		let coord2 = this._target.getInputCoord(this._input_index);
	
		const path = this.elem.firstChild;
		path.setAttribute('stroke', this._selected ? LINK_SELECTED_COLOR : LINK_COLOR);
		path.setAttribute('marker-end', this._selected ? "url(#head-selected)" : "url(#head)");
		path.setAttribute('stroke-dasharray', this._dotted && '10,10');
		path.setAttribute('d', this.formPath(this._mode, coord1, coord2));
	}

	initialize(doc, src, output_index, target, input_index) {
		this._src = src;
		this._output_index = parseInt(output_index) - 1;
		this._target = target;
		this._input_index = parseInt(input_index) - 1;

		src.addLink(this);
		target.addLink(this);

		const xmlns = "http://www.w3.org/2000/svg";
		const sel = this.elem = this.createSvgElement(doc, 'g');
		const path = doc.createElementNS(xmlns, 'path');
		sel.appendChild(path);
	
		this.dragFn = this._dragFn.bind(this);
	
		path.setAttribute('stroke-width', "2");
		path.setAttribute('fill', "none");
		this.redrawPath();
	
		src.on('drag', this.dragFn);
		target.on('drag', this.dragFn);
	}

	select() {
		super.select();
		this.redrawPath();
	}

	unselect() {
		super.unselect();
		this.redrawPath();
	}

	destroy() {
		this._src.off('drag', this.dragFn);
		this._target.off('drag', this.dragFn);
		this.remove();
	}

	exportAsJson() {
    return {
			type: this._type,
			dotted: this._dotted,
		 	mode: this._mode,
			editable: this._editable,

			src: this._src.getIndex(),
			target: this._target.getIndex(),
			output_index: this._output_index + 1,
			input_index: this._input_index + 1,
    };
	}

	formPath(mode, coord1, coord2) {
		let d, midX, midY;
		switch(mode) {
			case 'direct':
				d = `M${coord1.x},${coord1.y} T${coord2.x-LINK_ARROW_WIDTH},${coord2.y}`;
				break;
	
			case 'curve':
				if (Math.abs(coord2.y - coord1.y) < 0.2 * coord2.y) {
					return `M${coord1.x},${coord1.y} T${coord2.x-LINK_ARROW_WIDTH},${coord2.y}`;
				}
				
				midX = coord1.x + (coord2.x - coord1.x) / 2;
				midY = coord1.y + (coord2.y - coord1.y) / 2;
			
				d = `M${coord1.x},${coord1.y} Q${midX},${coord1.y} ${midX},${midY} T${coord2.x-LINK_ARROW_WIDTH},${coord2.y}`;
				break;
	
			case 'elbow':
			default:
				let neg, alongTheLine, midStr; 
				midX = coord1.x + (coord2.x - coord1.x) / 2, 
				midY = coord1.y + (coord2.y - coord1.y) / 2;
	
				//direct access
				if (coord2.x >= coord1.x + LINK_ARROW_WIDTH + 3) {//right enough
					d = `M${coord1.x},${coord1.y} L${midX},${coord1.y} L${midX},${coord2.y} L${coord2.x-LINK_ARROW_WIDTH},${coord2.y}`;
				} else {
					neg = (coord2.y > coord1.y + 2 * (NODE_HEIGHT/2) + NODE_IO_SIZE) || (coord2.y < coord1.y - (NODE_HEIGHT/2)) ? 1 : -1;
					d = `M${coord1.x},${coord1.y} L${coord1.x + NODE_IO_SIZE},${coord1.y} L${coord1.x + NODE_IO_SIZE},${coord1.y + neg * ((NODE_HEIGHT/2) + NODE_IO_SIZE)} L${coord2.x - NODE_IO_SIZE},${coord1.y + neg * ((NODE_HEIGHT/2) + NODE_IO_SIZE)} L${coord2.x - NODE_IO_SIZE},${coord2.y} L${coord2.x-LINK_ARROW_WIDTH},${coord2.y}`;
				}

				break;
		}
	
		return d
	}
}

export default Link;