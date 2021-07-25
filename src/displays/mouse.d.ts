import Evented from 'displays/evented';
import Link from 'displays/link';
import { Point, NodePoint, Offset } from 'types/index';
import INode from 'interfaces/inode';
export default class Mouse extends Evented implements INode {
    private _coords;
    private _offset;
    private _link;
    constructor(offset: Offset);
    drag(): void;
    destroy(): void;
    addLink(link: Link): void;
    deleteLink(link: Link): void;
    move(ev: any): void;
    getInputCoord(): Point;
    getOutputCoord(): Point;
    setXY(point: Point): void;
    getFaceCoord(side: string): NodePoint;
    getFaceCoords(): NodePoint[];
    getIndex(): number;
    setIndex(index: number): void;
}
