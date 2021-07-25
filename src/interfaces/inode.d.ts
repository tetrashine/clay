declare type Link = any;
import { NodePoint, Point } from 'types/index';
export default interface INode {
    destroy(): void;
    addLink(link: Link, type: string): void;
    deleteLink(link: Link): void;
    setXY(point: Point): void;
    getInputCoord(index: number): Point;
    getOutputCoord(index: number): Point;
    getFaceCoord(side: string): NodePoint;
    getFaceCoords(): NodePoint[];
    getIndex(): number;
    setIndex(index: number): void;
}
export {};
