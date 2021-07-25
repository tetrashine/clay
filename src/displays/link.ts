import Base from 'displays/base';
import SelectableHOC from 'composite/selectable';

import { default as config } from 'constants/config';
const { NODE_HEIGHT, LINK_COLOR, LINK_SELECTED_COLOR, LINK_ARROW_WIDTH, NODE_IO_SIZE } = config;
import { Point, LinkState } from 'types/index';
import INode from 'interfaces/inode';

class Link extends SelectableHOC(Base) {
	private _type: string;
	private _dotted: boolean;
	private _mode: string;
	private _editable: boolean;

	private _src: INode;
	private _target: INode;
	private _input_index: number;
	private _output_index: number;

	constructor(doc: any, src: INode, output_index: number, target: INode, input_index: number, {type= 'regular', dotted=false, mode='elbow', editable=true}) {
		super();

		//configuration
		this._type = type;
		this._dotted = dotted;
		this._mode = mode;
		this._editable = editable;

		this.initialize(doc, src, output_index, target, input_index);
	}

	getSrc(): INode { return this._src; }
	getTarget(): INode { return this._target; }
	setTarget(target: INode, input_index: number): void { 
		this._target.destroy();
		this._target = target;
		this._input_index = input_index - 1;
		target.addLink(this, 'input');

		this.redrawPath();
	}

	setDotted(dotted: boolean): void { 
		this._dotted = dotted; 
		this.redrawPath();
	}

	redrawPath(): void {
		let coord1: Point = this._src.getOutputCoord(this._output_index);
		let coord2: Point = this._target.getInputCoord(this._input_index);
	
		const path: any = this.elem.firstChild;
		path.setAttribute('stroke', this.selected ? LINK_SELECTED_COLOR : LINK_COLOR);
		path.setAttribute('marker-end', this.selected ? "url(#head-selected)" : "url(#head)");
		path.setAttribute('stroke-dasharray', this._dotted && '10,10');
		path.setAttribute('d', this.formPath(this._mode, coord1, coord2));
	}

	initialize(doc: any, src: INode, output_index: number, target: INode, input_index: number) {
		this._src = src;
		this._output_index = output_index - 1;
		this._target = target;
		this._input_index = input_index - 1;

		src.addLink(this, 'output');
		target.addLink(this, 'input');

		const xmlns = "http://www.w3.org/2000/svg";
		const sel: any = this.elem = this.createSvgElement(doc, 'g');
		const path: any = doc.createElementNS(xmlns, 'path');
		sel.appendChild(path);
	
		path.setAttribute('stroke-width', "2");
		path.setAttribute('fill', "none");
		this.redrawPath();
	}

	select(): void {
		super.select();
		this.redrawPath();
	}

	unselect(): void {
		super.unselect();
		this.elem.removeAttribute('id');
		this.redrawPath();
	}

	destroy(): void {
		this._src.deleteLink(this);
		this._target.deleteLink(this);
		this.remove();
	}

	exportAsJson(): LinkState {
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

	formPath(mode: string, coord1: Point, coord2: Point): string {
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
				midX = coord1.x + (coord2.x - coord1.x) / 2, 
				midY = coord1.y + (coord2.y - coord1.y) / 2;
	
				//direct access
				if (coord2.x >= coord1.x + LINK_ARROW_WIDTH + 3) {//right enough
					d = `M${coord1.x},${coord1.y} L${midX},${coord1.y} L${midX},${coord2.y} L${coord2.x-LINK_ARROW_WIDTH},${coord2.y}`;
				} else {
					const neg = (coord2.y > coord1.y + 2 * (NODE_HEIGHT/2) + NODE_IO_SIZE) || (coord2.y < coord1.y - (NODE_HEIGHT/2)) ? 1 : -1;
					d = `M${coord1.x},${coord1.y} L${coord1.x + NODE_IO_SIZE},${coord1.y} L${coord1.x + NODE_IO_SIZE},${coord1.y + neg * ((NODE_HEIGHT/2) + NODE_IO_SIZE)} L${coord2.x - NODE_IO_SIZE},${coord1.y + neg * ((NODE_HEIGHT/2) + NODE_IO_SIZE)} L${coord2.x - NODE_IO_SIZE},${coord2.y} L${coord2.x-LINK_ARROW_WIDTH},${coord2.y}`;
				}

				break;
		}
	
		return d;
	}
}

export default Link;