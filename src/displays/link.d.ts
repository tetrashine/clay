import { Point, LinkConfig } from 'types/index';
import INode from 'interfaces/inode';
declare const Link_base: any;
declare class Link extends Link_base {
    private _type;
    private _dotted;
    private _mode;
    private _editable;
    private _src;
    private _target;
    private _input_index;
    private _output_index;
    constructor(doc: any, src: INode, output_index: number, target: INode, input_index: number, { type, dotted, mode, editable }: {
        type?: string;
        dotted?: boolean;
        mode?: string;
        editable?: boolean;
    });
    _dragFn(): void;
    getSrc(): INode;
    getTarget(): INode;
    setTarget(target: INode, input_index: number): void;
    setDotted(dotted: boolean): void;
    redrawPath(): void;
    initialize(doc: any, src: INode, output_index: number, target: INode, input_index: number): void;
    select(): void;
    unselect(): void;
    destroy(): void;
    exportAsJson(): LinkConfig;
    formPath(mode: string, coord1: Point, coord2: Point): string;
}
export default Link;
