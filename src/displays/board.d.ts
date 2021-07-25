import Node from 'displays/node';
import Link from 'displays/link';
import Base from 'displays/base';
import { Point, NodeConfig, LinkState, BoardState } from 'types/index';
declare class Board extends Base {
    private _title;
    private _width;
    private _height;
    private _zoom;
    private _editable;
    private _nodes;
    private _links;
    private _selected;
    private _showGrid;
    private _type;
    private _doc;
    private _parent;
    private _buttons;
    private _scale;
    private _transformMatrix;
    private _mode;
    private _highlight;
    private _link;
    constructor(doc: any, dom: any, width: number, height: number, zoom: number, editable: boolean);
    _pan(matrix: number[], dx: number, dy: number): number[];
    _refreshTransformMatrix(newOrigin?: Point): void;
    _zoomToScale(matrix: number[], scale: number, coord: Point): number[];
    load(state: BoardState): void;
    parseNodes(doc: any, configs: NodeConfig[], editable: boolean): Node[];
    parseLinks(doc: any, configs: LinkState[], nodes: Node[], editable: boolean): Link[];
    exportState(): BoardState;
    clearHighlight(): void;
    initialize(editable: boolean): void;
    onNodeDrag(node: any, { dx, dy }: {
        dx: number;
        dy: number;
    }): void;
    reorderItems(selected: any[]): void;
    unselectItems(): void;
    edit(): void;
    addNode(node: Node): void;
    addLink(link: Link): void;
    addToBoardItems(arr: any[], item: any): void;
    setMode(mode: number): void;
    setNodes(nodes: Node[]): void;
    setLinks(links: Link[]): void;
    subscribeToSelection(item: any): void;
    enterSelectionMode(onComplete?: (point: Point) => void): void;
    enterNodeMode(onComplete?: (point: Point) => void): void;
    exitNodeMode(): void;
    exitSelectionMode(): void;
    enterLinkMode(onComplete?: () => void): void;
    exitLinkMode(): void;
    enterZoomMode(type: number): void;
    exitZoomMode(): void;
    zoom(scale: number, point?: Point): void;
    delete(item: any): void;
    deleteNodes(): void;
    oppositeSide(side: string): string;
    get scale(): number;
}
export default Board;
