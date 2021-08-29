//#region Imports
import Base from 'displays/abstract/base';
import Board from 'displays/board';
import Node from 'displays/node';
import Dock from 'displays/dock';
import Button from 'menu/button';
import ColorPalette from 'menu/colorpalette';
import {
  CancelInRed as CANCEL_SVG,
  ArrowForward as LINK_SVG,
  Dock as DOCK_SVG,
  Undo as UNDO_SVG, Redo as REDO_SVG,
  Delete as DELETE_SVG,
  ZoomIn as ZOOM_IN_SVG, ZoomOut as ZOOM_OUT_SVG,
  FormatColorFill as FILL_SVG, FormatColorText as FONTCOLOR_SVG,
  Play as PLAY_SVG, Pause as PAUSE_SVG, Stop as STOP_SVG
} from 'constants/svg';

import { default as config } from 'constants/config';
const {
  NODE_SELECTED_BORDER_COLOR, NODE_SELECTED_STROKE_WEIGHT, NODE_BORDER_COLOR,
  HIGHLIGHT_BORDER_COLOR, HIGHLIGHT_BG_COLOR, NODE_PADDING
} = config;

import {KeyCode} from 'constants/keycode';
import {EditMode} from 'constants/editmode';
import {ZoomMode} from 'constants/zoommode';

import { DockState, NodeConfig, LinkState, BoardConfig, BoardState } from 'types/index';
//#endregion

//#region SVG Decalations
const MAX_UNDO = 10;

const ICON_SIZE = 18;
const MENU_CLASS = 'class="menu-btn"';
const SIZE = `width="${ICON_SIZE}" height="${ICON_SIZE}"`;
const NODE_SVG = `<svg ${MENU_CLASS} viewBox="0 0 490 490" ${SIZE}><g><g><path d="M437.333,21.333h-384C23.936,21.333,0,45.269,0,74.667V416c0,29.397,23.936,53.333,53.333,53.333h384 c29.397,0,53.333-23.936,53.333-53.333V74.667C490.667,45.269,466.731,21.333,437.333,21.333z M469.333,416 c0,17.643-14.357,32-32,32h-384c-17.643,0-32-14.357-32-32V128h448V416z M469.333,106.667h-448v-32c0-17.643,14.357-32,32-32h384 c17.643,0,32,14.357,32,32V106.667z"/></g></g><g><g><circle cx="53.333" cy="74.667" r="10.667"/></g></g><g><g><circle cx="96" cy="74.667" r="10.667"/></g></g><g><g><circle cx="138.667" cy="74.667" r="10.667"/></g></g><g><g><path d="M394.667,320H384v-32c0-5.888-4.779-10.667-10.667-10.667H256V256h10.667c5.888,0,10.667-4.779,10.667-10.667v-42.667 c0-5.888-4.779-10.667-10.667-10.667H224c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h10.667 v21.333H117.333c-5.888,0-10.667,4.779-10.667,10.667v32H96c-5.888,0-10.667,4.779-10.667,10.667v42.667    C85.333,379.221,90.112,384,96,384h42.667c5.888,0,10.667-4.779,10.667-10.667v-42.667c0-5.888-4.779-10.667-10.667-10.667H128 v-21.333h106.667V320H224c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h42.667    c5.888,0,10.667-4.779,10.667-10.667v-42.667c0-5.888-4.779-10.667-10.667-10.667H256v-21.333h106.667V320H352 c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h42.667c5.888,0,10.667-4.779,10.667-10.667    v-42.667C405.333,324.779,400.555,320,394.667,320z M128,362.667h-21.333v-21.333H128V362.667z M256,362.667h-21.333v-21.333H256 V362.667z M234.667,234.667v-21.333H256v21.333H234.667z M384,362.667h-21.333v-21.333H384V362.667z"/></g></g></svg>`;
const EXPORT_SVG = `<svg ${MENU_CLASS} enable-background="new 0 0 551.13 551.13" viewBox="0 0 551.13 551.13" ${SIZE}><path d="m465.016 172.228h-51.668v34.446h34.446v310.011h-344.457v-310.011h34.446v-34.446h-51.669c-9.52 0-17.223 7.703-17.223 17.223v344.456c0 9.52 7.703 17.223 17.223 17.223h378.902c9.52 0 17.223-7.703 17.223-17.223v-344.456c0-9.52-7.703-17.223-17.223-17.223z"/><path d="m258.342 65.931v244.08h34.446v-244.08l73.937 73.937 24.354-24.354-115.514-115.514-115.514 115.514 24.354 24.354z"/></svg>`;
const UNSELECT_SVG = `<svg ${MENU_CLASS} viewBox="0 0 512 512" ${SIZE}><path d="m410.667969 368h-117.335938c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m116.179688 288c-11.175782 0-21.351563-7.019531-25.320313-17.449219l-89.023437-233.707031c-1.089844-2.285156-1.835938-5.867188-1.835938-9.730469 0-14.953125 12.179688-27.113281 27.136719-27.113281 3.753906 0 7.296875.726562 10.496093 2.15625l232.9375 88.703125c10.410157 3.945313 17.429688 14.121094 17.429688 25.300781 0 11.753906-7.507812 22.121094-18.6875 25.792969l-95.9375 31.421875-31.421875 95.914062c-3.628906 11.160157-13.996094 18.710938-25.773437 18.710938zm-80.617188-252.414062 80.277344 210.644531 29.652344-90.519531c1.601562-4.839844 5.378906-8.640626 10.21875-10.21875l90.519531-29.652344zm223.636719 85.183593h.214843zm-233.769531-89.046875c.085937.019532.171874.0625.277343.085938zm5.910156-7.253906.382812 1.003906c-.105468-.277344-.234375-.640625-.382812-1.003906zm0 0"/><path d="m352 512c-88.234375 0-160-71.765625-160-160s71.765625-160 160-160 160 71.765625 160 160-71.765625 160-160 160zm0-288c-70.59375 0-128 57.40625-128 128s57.40625 128 128 128 128-57.40625 128-128-57.40625-128-128-128zm0 0"/></svg>`;
//#endregion


type M = { [key:string]: any; };

class Clay extends Base {

  private _dom: HTMLElement;
  private _menu: HTMLElement;
  private _board: Board;
  private _mode: number;
  private _config: BoardConfig;
  private _state: BoardState;

  private _ActionFunctions: { [key:string]: () => void; }
  private _buttons: M;
  private _palettes: ColorPalette[];
  private _undoStates: any[];
  private _redoStates: any[];
  private _selected: Node[];
  private _selectedBtn: Button;

  private menuCalibration: ()=>void;

  //#region Constructor
  constructor(id: string, config: BoardConfig, state: BoardState) {
    super();

    this._ActionFunctions = {
      'enterZoomInMode': () => {
        this._board.enterZoomMode(ZoomMode.ZoomIn);
      },
      'enterZoomOutMode': () => {
        this._board.enterZoomMode(ZoomMode.ZoomOut);
      },
      'deleteSelectedFn': () => {
        this._selected.forEach(_ => this._board.delete(_));
        this._selected = [];
      
        this.menuCalibration();
      },
      'unselectFn': () => {
        this._selected.forEach(_ => _.unselect());
        this._selected = [];
        this.menuCalibration();
      },
      'onExecCompleteFn': () => {
        this.resetMenuBtns();
      },
    };

    Object.keys(this._ActionFunctions).forEach(key => {
      const tempFn = this._ActionFunctions[key];
      this._ActionFunctions[key] = ((...attrs) => {
        this._undoStates.push([this._selected, this._board.exportState()]);
        if (this._undoStates.length >= MAX_UNDO) this._undoStates.shift();
        tempFn(...attrs);
      });
    });
    
    this._buttons = {};
    this._palettes = [];
    this._undoStates = [];
    this._redoStates = [];

    this.initialize();
    [this._dom, this._menu, this._board] = this.build(id, config, state);

    this.menuCalibration = this._menuCalibration(this._config);
  }
  //#endregion

  //#region Public Functions
  addLink(linkState: LinkState): boolean {
    if (Clay.validateLink(linkState)) {
      this._board.addLinkState(linkState);

      return true;
    }

    return false;
  }

  addNode(nodeConfig: NodeConfig): boolean {
    if (Clay.validateNode(nodeConfig)) {
      let node: Node = new Node(document, nodeConfig);
      this._board.addNode(node);

      return true;
    }

    return false;
  }

  deleteNode(index: number): boolean {
    if (index >= 0 && index < this.nodeCount) {
      this._board.deleteNode(index);

      return true;
    }

    return false;
  }

  addDock(dockState: DockState): boolean {
    if (Clay.validateDock(dockState)) {
      const dock: Dock = new Dock(document, dockState);
      this._board.addDock(dock);

      return true;
    }

    return false;
  }

  deleteDock(index: number): boolean {
    if (index >= 0 && index < this.dockCount) {
      this._board.deleteDock(index);

      return true;
    }

    return false;
  }

  export(): BoardState {
    const state = this._board.exportState();
    this.trigger('export', state);
    return state;
  }

  load(config: BoardConfig, state: BoardState): [any, any, Board] {  
    this.setConfig(config);
    if (this.setState(state)) { 
      [this._dom, this._menu, this._board] = this._load(this._dom, config, state);
      return [this._dom, this._menu, this._board];
    }
  }

  loadState(state: BoardState): [any, any, Board] {
    if (this.setState(state)) { 
      [this._dom, this._menu, this._board] = this._load(this._dom, this._config, state);
      return [this._dom, this._menu, this._board];
    }
  }

  generate(doc: any, dom: HTMLElement, config: BoardConfig, state: BoardState): Board {
    const {width, height, zoom, editable} = config;
    let board = new Board(doc, dom, width, height, zoom, editable);
    board.load(state);
  
    return board;
  }

  setConfig(config: BoardConfig): void {
    this._config = this.applyDefault(config);
  }

  setState(state: BoardState): boolean {
    if (Clay.validate(state)) {
      this._state = state;
      return true;
    }

    return false;
  }

  static validate(state: BoardState): boolean { 
    const { title, docks, nodes, links } = state;
    
    return (
      typeof(title) === 'string'
      && Array.isArray(docks)
      && docks.every(Clay.validateDock)
      && Array.isArray(nodes)
      && nodes.every(Clay.validateNode)
      && Array.isArray(links)
      && links.every(Clay.validateLink)
    );
  }

  static validateDock(state: DockState): boolean {
    const { x, y, title, nodes=[] } = state;
    return (
      typeof(title) === 'string'
      && typeof(x) === 'number'
      && typeof(y) === 'number'
      && Array.isArray(nodes)
    );
  }

  static validateNode(node: NodeConfig): boolean { 
    const { title, description, x, y, attrs } = node;
    return (
      typeof(title) === 'string'
      && typeof(description) === 'string'
      && typeof(x) === 'number'
      && typeof(y) === 'number'
      && Array.isArray(attrs)
    );
  }

  static validateLink(link: LinkState): boolean { 
    const { dotted, editable, input_index, mode, output_index, src, target, type } = link;
    return (
      typeof(dotted) === 'boolean'
      && typeof(editable) === 'boolean'
      && typeof(input_index) === 'number'
      && typeof(mode) === 'string'
      && typeof(output_index) === 'number'
      && typeof(src) === 'number'
      && typeof(target) === 'number'
      && typeof(type) === 'string'
    ); 
  }
  //#endregion

  build(id: string, config: BoardConfig, state: BoardState): [any, any, Board] {
    this.setConfig(config);
    if (this.setState(state)) { 
      return this._build(id, this._config, this._state);
    }
  }

  _build(id: string, config: BoardConfig, state: BoardState): [any, any, Board] {
    //generate css
    var style = document.createElement('style');
    const styles = [
      `* {font-family: "Roboto", "Helvetica", "Arial", sans-serif;} .btn{cursor:pointer;} .clay-mb{padding:5px 5px 0 5px;display:table-cell;vertical-align:middle;width:18px;margin:0 5px;position:relative;} .clay-mb.s{fill:#aaa} .clay-mb.e:hover{background-color:#ccc;cursor:pointer;} .clay-mb.e:active{background-color:#aaa;} .tooltiptext {font-size:11px;visibility:hidden;width:60px;background-color:#ccc;text-align:center;padding:3px 8px;position:absolute;z-index:1;left:0;top:29px;color:white;} .menu-btn:hover+.tooltiptext {visibility: visible;} .palette:hover{outline:#fff solid 2px;box-shadow:rgb(60, 64, 67) 0px 2px 6px 2px;} .palette{margin-right:3px;display:inline-block;width:15px;height:15px;}`,
      `#highlight{stroke:${HIGHLIGHT_BORDER_COLOR};fill:${HIGHLIGHT_BG_COLOR};}`,
      `.paper{color:rgba(0, 0, 0, 0.87);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;background-color:#fff;box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);}`,
      `.tb{display:table;border-spacing:0;border-collapse:collapse;background-color:#fff;font-size:0.8rem;text-align:left;}`,
      `.tb-hd{display:table-header-group;border-bottom:solid 1px ${NODE_BORDER_COLOR};}`,
      `.tb-bd{display:table-row-group;}`,
      `.tb-rw{display: table-row;outline: 0;vertical-align: middle;}`,
      `.tb-cell-hd{padding: 5px 24px 5px 16px;color: rgba(0, 0, 0, 0.87);font-weight: 500;line-height: 1.5rem;}`,
      `.tb-cell{padding: 5px 24px 5px 16px;color: rgba(0, 0, 0, 0.87);display: table-cell;font-weight: 400;line-height: 1.43;border-bottom: 1px solid rgba(224, 224, 224, 1);letter-spacing: 0.01071em;}`,
      `.tb-cell > input{width:100px;}`,
      `.icon-btn{flex:0 0 auto;background:none;padding:6px;text-align:center;border-radius:50%;border:0;cursor:pointer;margin:0;display:inline-flex;position:relative;align-items:center;user-select: none;vertical-align: middle;}`,
      `.icon-btn:hover{background-color:#eee;}`,
      `.io-link{position:absolute;font-size:8px;text-align:center;color:white;font-weight:bold;}`,
      `.no-mouse{pointer-events:none;}`,
      `.highlight{fill:rgba(0,0,0,0);stroke-width:${NODE_SELECTED_STROKE_WEIGHT};stroke:${NODE_SELECTED_BORDER_COLOR};}`,
      `.dock-node + .dock-node{margin-top:${NODE_PADDING}px;}`
    ];
    style.innerHTML = styles.join(' ');
    document.head.appendChild(style);

    this._dom = document.getElementById(id);
    return this._load(this._dom, config, state);
  }

  _load(dom: HTMLElement, config: BoardConfig, state: BoardState): [HTMLElement, HTMLElement, Board] {
    const {editable} = config;

    let menu: HTMLElement = editable && this.drawEditMenu(document, dom, config);
    let board: Board = this.generate(document, dom, config, state);
  
    if (editable) {
      board.on('onselect', this.onSelection.bind(this));
      board.on('ondeselect', this.onSelection.bind(this));
      window.addEventListener('keydown', this.onKeyDown.bind(this));
      window.addEventListener('keyup', this.onKeyUp.bind(this));

      this._mode = EditMode.None;
    }
  
    return [dom, menu, board];
  }

  createZoomLevelElement(doc: any): any {
    const zoomDiv = this.createDomElement(doc, 'div', '');
    const zoomInput = this.createDomElement(doc, 'input', '');
    const zoomPercent = this.createDomElement(doc, 'div', '%');
    zoomDiv.setAttribute('style', 'position:relative;text-align:right;display:table-cell;width:1px;font-size:10px;padding:0 10px 0 5px;vertical-align:middle;border:solid 1px #333;')
    zoomPercent.setAttribute('style', 'position: absolute;right:4px;margin-top:3px;')
    zoomInput.setAttribute('value', '100')
    zoomInput.setAttribute('style', 'color:#333;width:25px;border:none;')
    zoomInput.onchange = (evt: Event) => {
      const scale = parseFloat((evt.target as HTMLInputElement).value);
      this._board.zoom(scale / 100);
    }
    zoomDiv.appendChild(zoomPercent);
    zoomDiv.appendChild(zoomInput);
    return zoomDiv;
  }

  createHrElement(doc: any): HTMLElement {
    let hr = this.createDomElement(doc, 'span', '|', '');
    hr.setAttribute('style', 'color:#bbb;display:table-cell;width:1px;vertical-align:middle;')
    return hr;
  }

  createMenuElement(doc: any, icon: string, cancel=''): any {
    let ele = this.createDomElement(doc, 'div', icon, cancel);
    ele.setAttribute('class', 'clay-mb e');
    return ele;
  }

  applyDefault(config: BoardConfig): BoardConfig {
    return {
      ...{ 
        editable: true, 
        zoomable: true, 
        colorize: true, 
        exportable: true, 
        executable: false,
      },
      ...config
    }
  }

  initialize(): void {}

  _menuCalibration(config?: BoardConfig): ()=>void {
    return (): void => {
      [
        ['unselect', 'editable'], 
        ['delete', 'editable'], 
        ['fill', 'colorize'], 
        ['fontfill', 'colorize']
      ].forEach(([_, doable]: (keyof BoardConfig)[]) => {
        if (config[doable]) {
          (this._selected && this._selected.length > 0) 
            ? this._buttons[_].enable()
            : this._buttons[_].disable();
        }
      });

      this._undoStates && this._undoStates.length > 0
        ? this._buttons.undo.enable()
        : this._buttons.undo.disable();

      this._redoStates && this._redoStates.length > 0
        ? this._buttons.redo.enable()
        : this._buttons.redo.disable();
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === KeyCode.SpaceBar) {
      this._mode = EditMode.Pan;
      this._board.setMode(EditMode.Pan);
      
    } else if (this._selected) {
      switch(e.keyCode) {
        case KeyCode.Delete://Delete
            this._palettes.forEach((_: ColorPalette) => _.hide());
            this._board.deleteSelected();
            this._selected = [];
            this.menuCalibration();
          break;
        default:
          if (this._selected.length === 1) {
            this._selected.forEach((_: Node) => _.makeDefaultTextEditable());
          }
          break;
      }
    }
  }

  onKeyUp(e: KeyboardEvent): void {
    switch(e.keyCode) {
      case KeyCode.SpaceBar://Space
        this._mode = EditMode.None;
        this._board.setMode(EditMode.None);
        break;
    }
  }

  onMenuBtnClick(mode: number, btn: Button, cursor: string = 'crosshair') {
    return function(): void {
      if (this._mode !== mode) {
        //if there is a previous selection, cancel it
        if (this._selectedBtn) {
          this._selectedBtn.toDefaultView();
          this._selectedBtn.cancelFn();
        } 
  
        //selection or switch mode
        this._mode = mode;
        btn.toCancelView();
        
        this._selectedBtn = btn;
        this._board.elem.style.cursor = cursor;
  
        btn.execFn();
      } else {
        //cancellation
        this.resetMenuBtns();
  
        btn.cancelFn();
      }
    }
  }

  onSelection(items: Node[]): void {
    this._selected = items;
  
    //configure menu related to selection
    this.menuCalibration();
  }

  save(): BoardConfig {
    return this._config;
  }
  
  subscribe(evt: string, callback: (evt: any) => void): void {
    this.on(evt, callback);
  }

  drawEditMenu(doc: any, parent: HTMLElement, config: BoardConfig): HTMLElement {
    const { 
      width,  
      editable, zoomable, colorize, exportable, executable,
    } = config;
    let svg: HTMLElement;
    let div: HTMLElement = doc.createElement('div');
    div.setAttribute('style', `height:28px;width:${width-1}px;background-color:white;border:#dadce0 solid 1px;padding:6px 0;;display:table;position:absolute;border-collapse:separate;border-spacing:6px 0px;z-index:1000;`);
  
    //LINK BUTTON
    if (editable) {
      //NODE BUTTON
      const nodeBtn: Button = new Button({
        id: 'node',
        doc: doc, 
        svg: NODE_SVG, 
        cancelSvg: CANCEL_SVG, 
        tooltip: 'New node', 
        execFn: () => {
          this._board.enterNodeMode(this._ActionFunctions.onExecCompleteFn);
        },
        cancelFn: () => {
          this._board.exitNodeMode();
        }
      });
      nodeBtn.registerEvt('onclick', this.onMenuBtnClick(EditMode.ZoomIn, nodeBtn).bind(this));
      this._buttons.node = nodeBtn;
      div.appendChild(nodeBtn.elem);

      const linkBtn: Button = new Button({
        id: 'link',
        doc: doc, 
        svg: LINK_SVG, 
        cancelSvg: CANCEL_SVG, 
        tooltip: 'New link', 
        execFn: () => {
          this._board.enterLinkMode(this._ActionFunctions.onExecCompleteFn);
        },
        cancelFn: () => {
          this._board.exitLinkMode();
        }
      });
      linkBtn.registerEvt('onclick', this.onMenuBtnClick(EditMode.ZoomIn, linkBtn).bind(this));
      this._buttons.links = linkBtn;
      div.appendChild(linkBtn.elem);

      const dockBtn: Button = new Button({
        id: 'dock',
        doc: doc, 
        svg: DOCK_SVG, 
        cancelSvg: CANCEL_SVG, 
        tooltip: 'New dock', 
        execFn: () => {
          this._board.enterDockMode(this._ActionFunctions.onExecCompleteFn);
        },
        cancelFn: () => {
          this._board.exitSelectionMode();
        }
      });
      dockBtn.registerEvt('onclick', this.onMenuBtnClick(EditMode.ZoomIn, dockBtn).bind(this));
      this._buttons.dock = dockBtn;
      div.appendChild(dockBtn.elem);
    
      //Breakline
      svg = this.createHrElement(doc);
      div.appendChild(svg);
    
      //UNDO
      const undoBtn: Button = new Button({
        id: 'undo',
        doc: doc, 
        svg: UNDO_SVG,
        tooltip: 'Undo', 
        enable: false,
        onClick: (evt: MouseEvent) => {
          this._redoStates.push([this._selected, this._board.exportState()]);
          const [selected, state] = this._undoStates.pop();
          this.menuCalibration();

          this._selected = selected;
          this._board.load(state);
        },
      });
      this._buttons.undo = undoBtn;
      div.appendChild(undoBtn.elem);
      
      //REDO
      const redoBtn: Button = new Button({
        id: 'redo',
        doc: doc, 
        svg: REDO_SVG,
        tooltip: 'Redo', 
        onClick: () => {
          this._undoStates.push([this._selected, this._board.exportState()]);
          const [selected, state] = this._redoStates.pop();
          this.menuCalibration();

          this._selected = selected;
          this._board.load(state);
        },
        enable: false
      });
      this._buttons.redo = redoBtn;
      div.appendChild(redoBtn.elem);
    
      //Breakline
      svg = this.createHrElement(doc);
      div.appendChild(svg);
    
      //UNSELECT BUTTON
      const unselectBtn: Button = new Button({
        id: 'unselect',
        doc: doc, 
        svg: UNSELECT_SVG,
        cancelSvg: CANCEL_SVG,
        tooltip: 'Unselect', 
        enable: false,
        onClick: this._ActionFunctions.unselectFn
      });
      this._buttons.unselect = unselectBtn; 
      div.appendChild(unselectBtn.elem);
    
      //DELETE
      const deleteBtn: Button = new Button({
        id: 'delete',
        doc: doc, 
        svg: DELETE_SVG,
        cancelSvg: CANCEL_SVG,
        tooltip: 'Delete', 
        enable: false,
        onClick: this._ActionFunctions.deleteSelectedFn
      });
      this._buttons.delete = deleteBtn; 
      div.appendChild(deleteBtn.elem);
  
      //Breakline
      div.appendChild(this.createHrElement(doc));
    }

    //ZOOM IN
    if (zoomable) {
      const zoomInBtn: Button = new Button({
        id: 'zoomIn',
        doc: doc, 
        svg: ZOOM_IN_SVG,
        cancelSvg: CANCEL_SVG,
        tooltip: 'Zoom In', 
        execFn: () => {
          this._board.enterZoomMode(ZoomMode.ZoomIn);
        },
        cancelFn: () => {
          this._board.exitZoomMode();
        }
      });
      zoomInBtn.registerEvt('onclick', this.onMenuBtnClick(EditMode.ZoomIn, zoomInBtn).bind(this));
      this._buttons.zoomIn = zoomInBtn; 
      div.appendChild(zoomInBtn.elem);
  
      //ZOOM OUT
      const zoomOutBtn: Button = new Button({
        id: 'zoomOut',
        doc: doc, 
        svg: ZOOM_OUT_SVG,
        cancelSvg: CANCEL_SVG,
        tooltip: 'Zoom Out', 
        execFn: () => {
          this._board.enterZoomMode(ZoomMode.ZoomOut);
        },
        cancelFn: () => {
          this._board.exitZoomMode();
        }
      });
      zoomOutBtn.registerEvt('onclick', this.onMenuBtnClick(EditMode.ZoomOut, zoomOutBtn).bind(this));
      this._buttons.zoomOut = zoomOutBtn; 
      div.appendChild(zoomOutBtn.elem);

      const zoomLvl = this.createZoomLevelElement(doc);
      div.appendChild(zoomLvl);
  
      //Breakline
      div.appendChild(this.createHrElement(doc)); 
    }

    if (colorize) {
      //FILL BUTTON
      const fillBtn: Button = new Button({
        id: 'fill',
        doc: doc, 
        svg: FILL_SVG,
        tooltip: 'Fill Color', 
        onClick: (evt: MouseEvent) => {},
        enable: false,
      });
      this._buttons.fill = fillBtn; 
      div.appendChild(fillBtn.elem);

      //color palette
      let cp1 = new ColorPalette(doc);
      fillBtn.appendChild(cp1);
      this._palettes.push(cp1);

      fillBtn.registerEvt('onclick', ((svg, cp) => () => {
        if (svg.isEnable()) {
          this._palettes.filter((_: ColorPalette) => _!== cp).forEach((_: ColorPalette) => _.hide());
          if (cp.toggle()) {
            cp.once('palette-select', (color) => {
              this._selected.forEach((_: Node) => _.setFillColor(color));
            });
          }
        }
      })(fillBtn, cp1));

      //FONTCOLOR BUTTON
      const textColorBtn: Button = new Button({
        id: 'fontColor',
        doc: doc, 
        svg: FONTCOLOR_SVG,
        tooltip: 'Text Color', 
        enable: false,
        onClick: (evt: MouseEvent) => {},
      });
      this._buttons.fontfill = textColorBtn;

      //color palette
      let cp2 = new ColorPalette(doc);
      textColorBtn.appendChild(cp2);
      this._palettes.push(cp2);

      textColorBtn.registerEvt('onclick', ((svg, cp) => () => {
        if (svg.isEnable()) {
          this._palettes.filter((_: ColorPalette) => _!== cp).forEach((_: ColorPalette) => _.hide());
          if (cp.toggle()) {
            cp.once('palette-select', (color) => {
              this._selected.forEach((_: Node) => _.setFontColor(color));
            });
          }
        }
      })(textColorBtn, cp2));
      div.appendChild(textColorBtn.elem);
    
      //Breakline
      div.appendChild(this.createHrElement(doc));
    }
  
    //EXPORT BUTTON
    if (exportable) {
      const exportBtn: Button = new Button({
        id: 'export',
        doc: doc, 
        svg: EXPORT_SVG,
        cancelSvg: CANCEL_SVG,
        tooltip: 'Export', 
        onClick: (evt: MouseEvent) => {
          this.trigger('export', this._board.exportState());
        },
      });

      this._buttons.export = exportBtn;
      div.appendChild(exportBtn.elem);

      //Breakline
      div.appendChild(this.createHrElement(doc));
    }

    //EXPORT BUTTON
    if (executable) {
      const playBtn: Button = new Button({
        id: 'play',
        doc: doc, 
        svg: PLAY_SVG,
        cancelSvg: PAUSE_SVG,
        tooltip: 'Play', 
        onClick: (evt: MouseEvent) => {},
      });

      this._buttons.play = playBtn;
      div.appendChild(playBtn.elem);

      const stopBtn: Button = new Button({
        id: 'stop',
        doc: doc, 
        svg: STOP_SVG,
        tooltip: 'Stop', 
        onClick: (evt: MouseEvent) => {},
      });

      this._buttons.stop = stopBtn;
      div.appendChild(stopBtn.elem);
    }
        
    svg = this.createDomElement(doc, 'div', '');
    svg.setAttribute('class', '');
    div.appendChild(svg);
    
    parent.appendChild(div);

    return div;
  }

  resetMenuBtns(): void {
    //reset mode
    this._mode = EditMode.None;
  
    //revert all buttons back to original svg state
    let buttons: M = this._buttons;
    Object.keys(buttons).forEach((key: keyof M) => {
      if (buttons[key].toDefaultView) {
        buttons[key].toDefaultView();
      } else {
        buttons[key].innerHTML = buttons[key]._svg;
      }
      
    });
  
    //reset cursor state
    this._board.elem.style.cursor = 'default';
  
    //clear selected svg
    this._selectedBtn = undefined;
  }

  get dockCount(): number {
    return this._board.dockCount;
  }

  get nodeCount(): number {
    return this._board.nodeCount;
  }

  get linkCount(): number {
    return this._board.linkCount;
  }
}

export default Clay;