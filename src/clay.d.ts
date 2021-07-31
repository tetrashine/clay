import Base from 'displays/base';
import Board from 'displays/board';
import Node from 'displays/node';
import { NodeConfig, LinkState, BoardConfig, BoardState } from 'types/index';
declare class Clay extends Base {
    private _dom;
    private _menu;
    private _board;
    private _mode;
    private _config;
    private _state;
    private _ActionFunctions;
    private _buttons;
    private _palettes;
    private _undoStates;
    private _redoStates;
    private _selected;
    private _selectedSvg;
    private menuCalibration;
    constructor(id: string, config: BoardConfig, state: BoardState);
    addNode(title: string, nodeConfig: NodeConfig, selection?: boolean): void;
    export(): BoardState;
    load(config: BoardConfig, state: BoardState): [any, any, Board];
    generate(doc: any, dom: HTMLElement, config: BoardConfig, state: BoardState): Board;
    setConfig(config: BoardConfig): void;
    setState(state: BoardState): boolean;
    validate(state: BoardState): boolean;
    validateNode(node: NodeConfig): boolean;
    validateLink(link: LinkState): boolean;
    build(id: string, config: BoardConfig, state: BoardState): [any, any, Board];
    _build(id: string, config: BoardConfig, state: BoardState): [any, any, Board];
    _load(dom: HTMLElement, config: BoardConfig, state: BoardState): [HTMLElement, HTMLElement, Board];
    createZoomLevelElement(doc: any): any;
    createHrElement(doc: any): HTMLElement;
    createMenuElement(doc: any, icon: string, cancel?: string): any;
    applyDefault(config: BoardConfig): BoardConfig;
    initialize(): void;
    _menuCalibration(config?: BoardConfig): () => void;
    onKeyDown(e: KeyboardEvent): void;
    onKeyUp(e: KeyboardEvent): void;
    onMenuBtnClick(mode: number, svg: any, cursor?: string): () => void;
    onSelection(items: Node[]): void;
    save(): BoardConfig;
    subscribe(evt: string, callback: (evt: any) => void): void;
    drawEditMenu(doc: any, parent: HTMLElement, config: BoardConfig): HTMLElement;
    resetMenuBtns(): void;
}
export default Clay;
