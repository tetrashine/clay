var clay;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/clay.ts":
/*!*********************!*\
  !*** ./src/clay.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! displays/base */ "./src/displays/base.ts");
const board_1 = __webpack_require__(/*! displays/board */ "./src/displays/board.ts");
const node_1 = __webpack_require__(/*! displays/node */ "./src/displays/node.ts");
const colorpalette_1 = __webpack_require__(/*! displays/colorpalette */ "./src/displays/colorpalette.ts");
const svg_1 = __webpack_require__(/*! displays/svg */ "./src/displays/svg.ts");
const config_1 = __webpack_require__(/*! constants/config */ "./src/constants/config.ts");
const { NODE_SELECTED_BORDER_COLOR, NODE_SELECTED_STROKE_WEIGHT, NODE_BORDER_COLOR, HIGHLIGHT_BORDER_COLOR, HIGHLIGHT_BG_COLOR } = config_1.default;
const keycode_1 = __webpack_require__(/*! constants/keycode */ "./src/constants/keycode.ts");
const editmode_1 = __webpack_require__(/*! constants/editmode */ "./src/constants/editmode.ts");
const zoommode_1 = __webpack_require__(/*! constants/zoommode */ "./src/constants/zoommode.ts");
const MAX_UNDO = 10;
const ICON_SIZE = 18;
const MENU_CLASS = 'class="menu-btn"';
const SIZE = `width="${ICON_SIZE}" height="${ICON_SIZE}"`;
const NODE_SVG = `<svg ${MENU_CLASS} viewBox="0 0 490 490" ${SIZE}><g><g><path d="M437.333,21.333h-384C23.936,21.333,0,45.269,0,74.667V416c0,29.397,23.936,53.333,53.333,53.333h384 c29.397,0,53.333-23.936,53.333-53.333V74.667C490.667,45.269,466.731,21.333,437.333,21.333z M469.333,416 c0,17.643-14.357,32-32,32h-384c-17.643,0-32-14.357-32-32V128h448V416z M469.333,106.667h-448v-32c0-17.643,14.357-32,32-32h384 c17.643,0,32,14.357,32,32V106.667z"/></g></g><g><g><circle cx="53.333" cy="74.667" r="10.667"/></g></g><g><g><circle cx="96" cy="74.667" r="10.667"/></g></g><g><g><circle cx="138.667" cy="74.667" r="10.667"/></g></g><g><g><path d="M394.667,320H384v-32c0-5.888-4.779-10.667-10.667-10.667H256V256h10.667c5.888,0,10.667-4.779,10.667-10.667v-42.667 c0-5.888-4.779-10.667-10.667-10.667H224c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h10.667 v21.333H117.333c-5.888,0-10.667,4.779-10.667,10.667v32H96c-5.888,0-10.667,4.779-10.667,10.667v42.667    C85.333,379.221,90.112,384,96,384h42.667c5.888,0,10.667-4.779,10.667-10.667v-42.667c0-5.888-4.779-10.667-10.667-10.667H128 v-21.333h106.667V320H224c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h42.667    c5.888,0,10.667-4.779,10.667-10.667v-42.667c0-5.888-4.779-10.667-10.667-10.667H256v-21.333h106.667V320H352 c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h42.667c5.888,0,10.667-4.779,10.667-10.667    v-42.667C405.333,324.779,400.555,320,394.667,320z M128,362.667h-21.333v-21.333H128V362.667z M256,362.667h-21.333v-21.333H256 V362.667z M234.667,234.667v-21.333H256v21.333H234.667z M384,362.667h-21.333v-21.333H384V362.667z"/></g></g></svg>`;
const EXPORT_SVG = `<svg ${MENU_CLASS} enable-background="new 0 0 551.13 551.13" viewBox="0 0 551.13 551.13" ${SIZE}><path d="m465.016 172.228h-51.668v34.446h34.446v310.011h-344.457v-310.011h34.446v-34.446h-51.669c-9.52 0-17.223 7.703-17.223 17.223v344.456c0 9.52 7.703 17.223 17.223 17.223h378.902c9.52 0 17.223-7.703 17.223-17.223v-344.456c0-9.52-7.703-17.223-17.223-17.223z"/><path d="m258.342 65.931v244.08h34.446v-244.08l73.937 73.937 24.354-24.354-115.514-115.514-115.514 115.514 24.354 24.354z"/></svg>`;
const UNSELECT_SVG = `<svg ${MENU_CLASS} viewBox="0 0 512 512" ${SIZE}><path d="m410.667969 368h-117.335938c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m116.179688 288c-11.175782 0-21.351563-7.019531-25.320313-17.449219l-89.023437-233.707031c-1.089844-2.285156-1.835938-5.867188-1.835938-9.730469 0-14.953125 12.179688-27.113281 27.136719-27.113281 3.753906 0 7.296875.726562 10.496093 2.15625l232.9375 88.703125c10.410157 3.945313 17.429688 14.121094 17.429688 25.300781 0 11.753906-7.507812 22.121094-18.6875 25.792969l-95.9375 31.421875-31.421875 95.914062c-3.628906 11.160157-13.996094 18.710938-25.773437 18.710938zm-80.617188-252.414062 80.277344 210.644531 29.652344-90.519531c1.601562-4.839844 5.378906-8.640626 10.21875-10.21875l90.519531-29.652344zm223.636719 85.183593h.214843zm-233.769531-89.046875c.085937.019532.171874.0625.277343.085938zm5.910156-7.253906.382812 1.003906c-.105468-.277344-.234375-.640625-.382812-1.003906zm0 0"/><path d="m352 512c-88.234375 0-160-71.765625-160-160s71.765625-160 160-160 160 71.765625 160 160-71.765625 160-160 160zm0-288c-70.59375 0-128 57.40625-128 128s57.40625 128 128 128 128-57.40625 128-128-57.40625-128-128-128zm0 0"/></svg>`;
class Clay extends base_1.default {
    constructor(id, config, state) {
        super();
        this._ActionFunctions = {
            'enterZoomInMode': () => {
                this._board.enterZoomMode(zoommode_1.ZoomMode.ZoomIn);
            },
            'enterZoomOutMode': () => {
                this._board.enterZoomMode(zoommode_1.ZoomMode.ZoomOut);
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
                if (this._undoStates.length >= MAX_UNDO)
                    this._undoStates.shift();
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
    addNode(title, nodeConfig, selection = true) {
        const { editable } = this._config;
        let node;
        if (selection) {
            this._board.enterSelectionMode((point) => {
                node = new node_1.default(document, {
                    title: title,
                    x: point.x,
                    y: point.y,
                    editable: editable,
                    inputs: [],
                    outputs: []
                });
                this._board.addNode(node);
            });
        }
        else {
            node = new node_1.default(document, nodeConfig);
            this._board.addNode(node);
        }
    }
    export() {
        const state = this._board.exportState();
        this.trigger('export', state);
        return state;
    }
    load(config, state) {
        return this._load(this._dom, config, state);
    }
    generate(doc, dom, config, state) {
        const { width, height, zoom, editable } = config;
        let board = new board_1.default(doc, dom, width, height, zoom, editable);
        board.load(state);
        return board;
    }
    setConfig(config) {
        this._config = this.applyDefault(config);
    }
    setState(state) {
        if (this.validate(state)) {
            this._state = state;
            return true;
        }
        return false;
    }
    validate(state) {
        const { title, nodes, links } = state;
        return (typeof (title) === 'string'
            && Array.isArray(nodes)
            && nodes.every(this.validateNode)
            && Array.isArray(links)
            && links.every(this.validateLink));
    }
    validateNode(node) {
        const { title, description, x, y, attrs } = node;
        return (typeof (title) === 'string'
            && typeof (description) === 'string'
            && typeof (x) === 'number'
            && typeof (y) === 'number'
            && Array.isArray(attrs));
    }
    validateLink(link) {
        const { dotted, editable, input_index, mode, output_index, src, target, type } = link;
        return (typeof (dotted) === 'boolean'
            && typeof (editable) === 'boolean'
            && typeof (input_index) === 'number'
            && typeof (mode) === 'string'
            && typeof (output_index) === 'number'
            && typeof (src) === 'number'
            && typeof (target) === 'number'
            && typeof (type) === 'string');
    }
    build(id, config, state) {
        this.setConfig(config);
        if (this.setState(state)) {
            return this._build(id, this._config, this._state);
        }
    }
    _build(id, config, state) {
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
        ];
        style.innerHTML = styles.join(' ');
        document.head.appendChild(style);
        this._dom = document.getElementById(id);
        return this._load(this._dom, config, state);
    }
    _load(dom, config, state) {
        const { editable } = config;
        let menu = editable && this.drawEditMenu(document, dom, config);
        let board = this.generate(document, dom, config, state);
        if (editable) {
            board.on('onselect', this.onSelection.bind(this));
            board.on('ondeselect', this.onSelection.bind(this));
            window.addEventListener('keydown', this.onKeyDown.bind(this));
            window.addEventListener('keyup', this.onKeyUp.bind(this));
            this._mode = editmode_1.EditMode.None;
        }
        return [dom, menu, board];
    }
    createZoomLevelElement(doc) {
        const zoomDiv = this.createDomElement(doc, 'div', '');
        const zoomInput = this.createDomElement(doc, 'input', '');
        const zoomPercent = this.createDomElement(doc, 'div', '%');
        zoomDiv.setAttribute('style', 'position:relative;text-align:right;display:table-cell;width:1px;font-size:10px;padding:0 10px 0 5px;vertical-align:middle;border:solid 1px #333;');
        zoomPercent.setAttribute('style', 'position: absolute;right:4px;margin-top:3px;');
        zoomInput.setAttribute('value', '100');
        zoomInput.setAttribute('style', 'color:#333;width:25px;border:none;');
        zoomInput.onchange = (evt) => {
            const scale = parseFloat(evt.target.value);
            this._board.zoom(scale / 100);
        };
        zoomDiv.appendChild(zoomPercent);
        zoomDiv.appendChild(zoomInput);
        return zoomDiv;
    }
    createHrElement(doc) {
        let hr = this.createDomElement(doc, 'span', '|', '');
        hr.setAttribute('style', 'color:#bbb;display:table-cell;width:1px;vertical-align:middle;');
        return hr;
    }
    createMenuElement(doc, icon, cancel = '') {
        let ele = this.createDomElement(doc, 'div', icon, cancel);
        ele.setAttribute('class', 'clay-mb e');
        return ele;
    }
    createMenuBtnElement({ doc, svg, tooltip, onClick, execFn, cancelFn, cancelSvg = '', enable = true, }) {
        const menuElem = this.createMenuElement(doc, svg, cancelSvg);
        const tooltipElem = this.createDomElement(doc, 'span', tooltip);
        tooltipElem.setAttribute('class', 'tooltiptext');
        menuElem.appendChild(tooltipElem);
        menuElem._svg = menuElem.innerHTML;
        Object.entries({
            'onclick': onClick,
            'execFn': execFn,
            'cancelFn': cancelFn
        }).forEach(([name, fn]) => {
            if (fn) {
                menuElem[name] = fn;
            }
        });
        !enable && this.disableMenuBtn(menuElem);
        return menuElem;
    }
    enableMenuBtn(btn) {
        btn._enable = true;
        btn.setAttribute('class', 'clay-mb e');
    }
    disableMenuBtn(btn) {
        btn._enable = false;
        btn.setAttribute('class', 'clay-mb s');
    }
    applyDefault(config) {
        return Object.assign({
            editable: true,
            zoomable: true,
            colorize: true,
            exportable: true,
            executable: true,
        }, config);
    }
    initialize() { }
    _menuCalibration(config) {
        return () => {
            [
                ['unselect', 'editable'],
                ['delete', 'editable'],
                ['fill', 'colorize'],
                ['fontfill', 'colorize']
            ].forEach(([_, doable]) => {
                if (config[doable]) {
                    (this._selected && this._selected.length > 0)
                        ? this.enableMenuBtn(this._buttons[_])
                        : this.disableMenuBtn(this._buttons[_]);
                }
            });
            this._undoStates && this._undoStates.length > 0
                ? this.enableMenuBtn(this._buttons.undo)
                : this.disableMenuBtn(this._buttons.undo);
            this._redoStates && this._redoStates.length > 0
                ? this.enableMenuBtn(this._buttons.redo)
                : this.disableMenuBtn(this._buttons.redo);
        };
    }
    onKeyDown(e) {
        if (e.keyCode === keycode_1.KeyCode.SpaceBar) {
            this._mode = editmode_1.EditMode.Pan;
            this._board.setMode(editmode_1.EditMode.Pan);
        }
        else if (this._selected) {
            switch (e.keyCode) {
                case keycode_1.KeyCode.Delete:
                    this._palettes.forEach((_) => _.hide());
                    this._selected.forEach(_ => this._board.delete(_));
                    this._selected = [];
                    this.menuCalibration();
                    break;
                default:
                    if (this._selected.length === 1) {
                        this._selected.forEach((_) => _.makeDefaultTextEditable());
                    }
                    break;
            }
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case keycode_1.KeyCode.SpaceBar:
                this._mode = editmode_1.EditMode.None;
                this._board.setMode(editmode_1.EditMode.None);
                break;
        }
    }
    onMenuBtnClick(mode, svg, cursor = 'crosshair') {
        return function () {
            if (this._mode !== mode) {
                if (this._selectedSvg) {
                    this._selectedSvg.innerHTML = this._selectedSvg._svg;
                    this._selectedSvg.cancelFn();
                }
                this._mode = mode;
                svg.innerHTML = svg._cancel;
                this._selectedSvg = svg;
                this._board.elem.style.cursor = cursor;
                svg.execFn();
            }
            else {
                this.resetMenuBtns();
                svg.cancelFn();
            }
        };
    }
    onSelection(items) {
        this._selected = items;
        this.menuCalibration();
    }
    save() {
        return this._config;
    }
    subscribe(evt, callback) {
        this.on(evt, callback);
    }
    drawEditMenu(doc, parent, config) {
        const { width, editable, zoomable, colorize, exportable, executable, } = config;
        let svg;
        let div = doc.createElement('div');
        div.setAttribute('style', `height:28px;width:${width - 1}px;background-color:white;border:#dadce0 solid 1px;padding:6px 0;;display:table;position:absolute;border-collapse:separate;border-spacing:6px 0px;z-index:1000;`);
        if (editable) {
            const nodeBtn = this.createMenuBtnElement({
                doc: doc,
                svg: NODE_SVG,
                cancelSvg: svg_1.CancelInRed,
                tooltip: 'New node',
                execFn: () => {
                    this._board.enterNodeMode(this._ActionFunctions.onExecCompleteFn);
                },
                cancelFn: () => {
                    this._board.exitNodeMode();
                }
            });
            nodeBtn.onclick = this.onMenuBtnClick(editmode_1.EditMode.Node, nodeBtn).bind(this);
            this._buttons.node = nodeBtn;
            div.appendChild(nodeBtn);
            const linkBtn = this.createMenuBtnElement({
                doc: doc,
                svg: svg_1.ArrowForward,
                cancelSvg: svg_1.CancelInRed,
                tooltip: 'New link',
                execFn: (evt) => {
                    this._board.enterLinkMode(this._ActionFunctions.onExecCompleteFn);
                },
                cancelFn: (evt) => {
                    this._board.exitLinkMode();
                }
            });
            linkBtn.onclick = this.onMenuBtnClick(editmode_1.EditMode.Link, linkBtn).bind(this);
            this._buttons.links = linkBtn;
            div.appendChild(linkBtn);
            svg = this.createHrElement(doc);
            div.appendChild(svg);
            const undoBtn = this.createMenuBtnElement({
                doc: doc,
                svg: svg_1.Undo,
                tooltip: 'Undo',
                enable: false,
                onClick: (evt) => {
                    this._redoStates.push([this._selected, this._board.exportState()]);
                    const [selected, state] = this._undoStates.pop();
                    this.menuCalibration();
                    this._selected = selected;
                    this._board.load(state);
                },
            });
            this._buttons.undo = undoBtn;
            div.appendChild(undoBtn);
            const redoBtn = this.createMenuBtnElement({
                doc: doc,
                svg: svg_1.Redo,
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
            div.appendChild(redoBtn);
            svg = this.createHrElement(doc);
            div.appendChild(svg);
            const unselectBtn = this.createMenuBtnElement({
                doc: doc,
                svg: UNSELECT_SVG,
                cancelSvg: svg_1.CancelInRed,
                tooltip: 'Unselect',
                enable: false,
                onClick: this._ActionFunctions.unselectFn
            });
            this._buttons.unselect = unselectBtn;
            div.appendChild(unselectBtn);
            const deleteBtn = this.createMenuBtnElement({
                doc: doc,
                svg: svg_1.Delete,
                cancelSvg: svg_1.CancelInRed,
                tooltip: 'Delete',
                enable: false,
                onClick: this._ActionFunctions.deleteSelectedFn
            });
            this._buttons.delete = deleteBtn;
            div.appendChild(deleteBtn);
            div.appendChild(this.createHrElement(doc));
        }
        if (zoomable) {
            const zoomInBtn = this.createMenuBtnElement({
                doc: doc,
                svg: svg_1.ZoomIn,
                cancelSvg: svg_1.CancelInRed,
                tooltip: 'Zoom In',
                execFn: () => {
                    this._board.enterZoomMode(zoommode_1.ZoomMode.ZoomIn);
                },
                cancelFn: (evt) => {
                    this._board.exitZoomMode();
                }
            });
            zoomInBtn.onclick = this.onMenuBtnClick(editmode_1.EditMode.ZoomIn, zoomInBtn).bind(this);
            this._buttons.zoomIn = zoomInBtn;
            div.appendChild(zoomInBtn);
            const zoomOutBtn = this.createMenuBtnElement({
                doc: doc,
                svg: svg_1.ZoomOut,
                cancelSvg: svg_1.CancelInRed,
                tooltip: 'Zoom In',
                execFn: () => {
                    this._board.enterZoomMode(zoommode_1.ZoomMode.ZoomOut);
                },
                cancelFn: (evt) => {
                    this._board.exitZoomMode();
                }
            });
            zoomOutBtn.onclick = this.onMenuBtnClick(editmode_1.EditMode.ZoomOut, zoomOutBtn).bind(this);
            this._buttons.zoomOut = zoomOutBtn;
            div.appendChild(zoomOutBtn);
            const zoomLvl = this.createZoomLevelElement(doc);
            div.appendChild(zoomLvl);
            div.appendChild(this.createHrElement(doc));
        }
        if (colorize) {
            const fillBtn = this.createMenuBtnElement({
                doc: doc,
                svg: svg_1.FormatColorFill,
                tooltip: 'Fill Color',
                onClick: (evt) => { },
            });
            this._buttons.fill = fillBtn;
            div.appendChild(fillBtn);
            this.disableMenuBtn(fillBtn);
            let cp1 = new colorpalette_1.default(doc);
            fillBtn.appendChildByElement(cp1);
            this._palettes.push(cp1);
            fillBtn.onclick = ((svg, cp) => () => {
                if (svg._enable) {
                    this._palettes.filter((_) => _ !== cp).forEach((_) => _.hide());
                    if (cp.toggle()) {
                        cp.once('palette-select', (color) => {
                            this._selected.forEach((_) => _.setFillColor(color));
                        });
                    }
                }
            })(fillBtn, cp1);
            const textColorBtn = this.createMenuBtnElement({
                doc: doc,
                svg: svg_1.FormatColorText,
                tooltip: 'Text Color',
                enable: false,
                onClick: (evt) => { },
            });
            this._buttons.fontfill = textColorBtn;
            let cp2 = new colorpalette_1.default(doc);
            textColorBtn.appendChildByElement(cp2);
            this._palettes.push(cp2);
            textColorBtn.onclick = ((svg, cp) => () => {
                if (svg._enable) {
                    this._palettes.filter((_) => _ !== cp).forEach((_) => _.hide());
                    if (cp.toggle()) {
                        cp.once('palette-select', (color) => {
                            this._selected.forEach((_) => _.setFontColor(color));
                        });
                    }
                }
            })(textColorBtn, cp2);
            div.appendChild(textColorBtn);
            div.appendChild(this.createHrElement(doc));
        }
        if (exportable) {
            const exportBtn = this.createMenuBtnElement({
                doc: doc,
                svg: EXPORT_SVG,
                cancelSvg: svg_1.CancelInRed,
                tooltip: 'Export',
                onClick: (evt) => {
                    this.trigger('export', this._board.exportState());
                },
            });
            this._buttons.export = exportBtn;
            div.appendChild(exportBtn);
            div.appendChild(this.createHrElement(doc));
        }
        if (executable) {
            const playBtn = this.createMenuBtnElement({
                doc: doc,
                svg: svg_1.Play,
                cancelSvg: svg_1.Pause,
                tooltip: 'Play',
                onClick: (evt) => { },
            });
            this._buttons.play = playBtn;
            div.appendChild(playBtn);
            const stopBtn = this.createMenuBtnElement({
                doc: doc,
                svg: svg_1.Stop,
                tooltip: 'Stop',
                onClick: (evt) => { },
            });
            this._buttons.stop = stopBtn;
            div.appendChild(stopBtn);
        }
        svg = this.createMenuElement(doc, '', '');
        svg.setAttribute('class', '');
        div.appendChild(svg);
        parent.appendChild(div);
    }
    resetMenuBtns() {
        this._mode = editmode_1.EditMode.None;
        let buttons = this._buttons;
        Object.keys(buttons).forEach((key) => {
            buttons[key].innerHTML = buttons[key]._svg;
        });
        this._board.elem.style.cursor = 'default';
        this._selectedSvg = undefined;
    }
}
exports.default = Clay;


/***/ }),

/***/ "./src/composite/selectable.ts":
/*!*************************************!*\
  !*** ./src/composite/selectable.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const SelectableHOC = (BaseClass) => {
    return class extends BaseClass {
        constructor(...args) {
            super(...args);
            this._clickFn = () => {
                this.trigger('click', this);
            };
        }
        selectable() {
            this.on('clickonly', this._clickFn);
        }
        destroy() {
            this.off('clickonly', this._clickFn);
        }
        unselect() {
            this._selected = false;
        }
        select() {
            this._selected = true;
        }
        get selected() {
            return this._selected;
        }
    };
};
exports.default = SelectableHOC;


/***/ }),

/***/ "./src/constants/config.ts":
/*!*********************************!*\
  !*** ./src/constants/config.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Config = {
    LINK_COLOR: '#D0D0D0',
    LINK_SELECTED_COLOR: '#1565c0',
    LINK_ARROW_WIDTH: 4,
    BORDER_WIDTH: 5,
    NODE_WIDTH: 60,
    NODE_HEIGHT: 30,
    NODE_COLOR: '#DFE7ED',
    NODE_DISABLED_COLOR: '#89959F',
    NODE_BORDER_COLOR: '#B9C4D2',
    NODE_STROKE_WEIGHT: 0,
    NODE_TEXT_COLOR: '#89959F',
    NODE_SELECTED_BORDER_COLOR: '#1565c0',
    NODE_SELECTED_STROKE_WEIGHT: 1,
    NODE_PADDING: 5,
    NODE_MAX_INPUT: 5,
    NODE_MAX_OUTPUT: 2,
    NODE_IO_SIZE: 10,
    NODE_IO_SPACING: 5,
    NODE_CONNECTOR_COLOR: '#B9C5D1',
    NODE_CONNECTOR_SELECTED_COLOR: '#75C750',
    NODE_CONNECTOR_BORDER_COLOR: '#89959F',
    NODE_CONNECTOR_HOVER_COLOR: '#F86C03',
    NODE_IO_HOVER_COLOR: '#F86C03',
    NODE_IO_CONNECTOR_COLOR: '#4caf50',
    HIGHLIGHT_BORDER_COLOR: '#2196f3',
    HIGHLIGHT_BG_COLOR: 'rgba(33,150,243,.15)',
};
exports.default = Config;


/***/ }),

/***/ "./src/constants/editmode.ts":
/*!***********************************!*\
  !*** ./src/constants/editmode.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditMode = void 0;
exports.EditMode = { None: 0, Link: 1, Linking: 2, Node: 3, ZoomIn: 4, ZoomOut: 5, Pan: 6 };


/***/ }),

/***/ "./src/constants/keycode.ts":
/*!**********************************!*\
  !*** ./src/constants/keycode.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyCode = void 0;
exports.KeyCode = {
    SpaceBar: 32,
    Delete: 46
};


/***/ }),

/***/ "./src/constants/zoommode.ts":
/*!***********************************!*\
  !*** ./src/constants/zoommode.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZoomMode = void 0;
exports.ZoomMode = { ZoomIn: 0, ZoomOut: 1 };


/***/ }),

/***/ "./src/displays/base.ts":
/*!******************************!*\
  !*** ./src/displays/base.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const evented_1 = __webpack_require__(/*! displays/evented */ "./src/displays/evented.ts");
class Base extends evented_1.default {
    appendChild(node) {
        this.appendChildByElement(node.elem);
        node._parent = this.elem;
    }
    appendChildByElement(elem) {
        this.elem.appendChild(elem);
    }
    removeChild(node) {
        this.removeChildByElement(node.elem);
        node._parent = undefined;
    }
    removeChildByElement(elem) {
        this.elem.removeChild(elem);
    }
    setAttribute(key, value) {
        this.elem.setAttribute(key, value);
    }
    createDomElement(doc, type, text, cancel = '') {
        let func = (['svg', 'g', 'text', 'rect', 'foreignobject'].indexOf(type.toLowerCase()) >= 0) ? this.createSvgElement : this.createNonSvgElement;
        let elem = func.call(this, doc, type);
        elem.innerHTML = text;
        elem._svg = text;
        elem._cancel = cancel;
        return elem;
    }
    createNonSvgElement(doc, type) {
        return doc.createElement(type);
    }
    createSvgElement(doc, type) {
        return doc.createElementNS("http://www.w3.org/2000/svg", type);
    }
    remove() {
        this.elem.remove();
    }
    get elem() {
        return this._sel;
    }
    set elem(elem) {
        this._sel = elem;
        elem.node = this;
    }
}
exports.default = Base;


/***/ }),

/***/ "./src/displays/board.ts":
/*!*******************************!*\
  !*** ./src/displays/board.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const node_1 = __webpack_require__(/*! displays/node */ "./src/displays/node.ts");
const link_1 = __webpack_require__(/*! displays/link */ "./src/displays/link.ts");
const base_1 = __webpack_require__(/*! displays/base */ "./src/displays/base.ts");
const mouse_1 = __webpack_require__(/*! displays/mouse */ "./src/displays/mouse.ts");
const editmode_1 = __webpack_require__(/*! constants/editmode */ "./src/constants/editmode.ts");
const zoommode_1 = __webpack_require__(/*! constants/zoommode */ "./src/constants/zoommode.ts");
const config_1 = __webpack_require__(/*! constants/config */ "./src/constants/config.ts");
const { LINK_COLOR, LINK_SELECTED_COLOR, NODE_CONNECTOR_COLOR, NODE_CONNECTOR_SELECTED_COLOR, NODE_CONNECTOR_BORDER_COLOR, NODE_CONNECTOR_HOVER_COLOR } = config_1.default;
const XMLNS = "http://www.w3.org/2000/svg";
const getCoordsFromEvent = (ev, svg) => {
    if (ev.changedTouches) {
        ev = ev.changedTouches[0];
    }
    else if (ev.targetTouches) {
        ev = ev.targetTouches[0];
    }
    const point = svg.createSVGPoint();
    point.x = ev.clientX;
    point.y = ev.clientY;
    const invertedSVGMatrix = svg.getScreenCTM().inverse();
    return point.matrixTransform(invertedSVGMatrix);
};
class Board extends base_1.default {
    constructor(doc, dom, width, height, zoom, editable) {
        super();
        this._width = width;
        this._height = height;
        this._zoom = zoom;
        this._editable = editable;
        this._nodes = [];
        this._links = [];
        this._selected = [];
        this._showGrid = false;
        this._type = 'svg';
        this._doc = doc;
        this._parent = dom;
        this._buttons = {};
        this._scale = 1;
        this._transformMatrix = [1, 0, 0, 1, 0, 0];
        dom.setAttribute('style', 'overflow:hidden;position:absolute;background-image:url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")');
        let sel = this.elem = doc.createElementNS(XMLNS, 'svg');
        this._refreshTransformMatrix();
        sel.setAttribute('viewBox', `0 0 ${width} ${height}`);
        sel.setAttribute('width', width);
        sel.setAttribute('height', height);
        sel.innerText = "Your browser does not support inline svg";
        let defs = doc.createElementNS(XMLNS, 'defs');
        defs.innerHTML = `
      <marker id='head' orient="auto" markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill="${LINK_COLOR}"/></marker>
      <marker id='head-selected' orient="auto" markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill="${LINK_SELECTED_COLOR}"/></marker>
    `;
        sel.appendChild(defs);
        this._highlight = doc.createElementNS(XMLNS, 'rect');
        this._highlight.setAttribute('id', 'highlight');
        this._highlight.setAttribute('width', 0);
        this._highlight.setAttribute('height', 0);
        sel.appendChild(this._highlight);
        let bg = doc.createElementNS(XMLNS, 'rect');
        bg.setAttribute('width', '100%');
        bg.setAttribute('height', '100%');
        bg.setAttribute('style', "fill:rgba(0,0,0,0);");
        sel.appendChild(bg);
        dom.appendChild(sel);
        this.initialize(editable);
    }
    _pan(matrix, dx, dy) {
        matrix[4] = dx;
        matrix[5] = dy;
        return matrix;
    }
    _refreshTransformMatrix(newOrigin) {
        this.elem.setAttribute('transform', `matrix(${this._transformMatrix.join(' ')})`);
        if (newOrigin) {
            this.elem.setAttribute('style', `${this.elem.getAttribute('style')};transform-origin:${newOrigin.x}px ${newOrigin.y}px`);
        }
    }
    _zoomToScale(matrix, scale, coord) {
        matrix[0] = scale;
        matrix[3] = scale;
        matrix[4] = (1 - scale) * coord.x;
        matrix[5] = (1 - scale) * coord.y;
        return matrix;
    }
    load(state) {
        const { title, nodes: nodeState, links: linkState } = state;
        const nodes = this.parseNodes(this._doc, nodeState, this._editable);
        const links = this.parseLinks(this._doc, linkState, nodes, this._editable);
        this._title = title;
        this.deleteNodes();
        this.setNodes(nodes);
        this.setLinks(links);
    }
    parseNodes(doc, configs, editable) {
        return configs.map((config) => new node_1.default(doc, Object.assign({ editable: editable }, config)));
    }
    parseLinks(doc, configs, nodes, editable) {
        return configs.map(config => {
            const { src, target, output_index, input_index } = config;
            return new link_1.default(doc, nodes[src], output_index, nodes[target], input_index, {
                editable: editable
            });
        });
    }
    exportState() {
        return {
            "title": this._title,
            "editable": this._editable,
            "nodes": this._nodes.map((node) => node.exportAsJson()),
            "links": this._links.map((link) => link.exportAsJson())
        };
    }
    clearHighlight() {
        this._highlight.setAttribute('width', 0);
        this._highlight.setAttribute('height', 0);
    }
    initialize(editable) {
        editable && this.edit();
        var highlighting = false;
        var origin = undefined;
        this.elem.addEventListener('mousedown', (evt) => {
            if (evt.which === 1) {
                origin = getCoordsFromEvent(evt, this.elem);
                this.elem.appendChild(this._highlight);
            }
        });
        this.elem.addEventListener('mousemove', (evt) => {
            if (evt.which == 1) {
                const point = getCoordsFromEvent(evt, this.elem);
                if (this._mode == editmode_1.EditMode.Pan) {
                    const viewBox = this.elem.viewBox.baseVal;
                    viewBox.x -= (point.x - origin.x);
                    viewBox.y -= (point.y - origin.y);
                }
                else if (origin && this._nodes.every((_) => !_.isDragging())) {
                    highlighting = true;
                    let left = origin.x < point.x ? origin.x : point.x;
                    let right = origin.x > point.x ? origin.x : point.x;
                    let top = origin.y < point.y ? origin.y : point.y;
                    let bottom = origin.y > point.y ? origin.y : point.y;
                    this._highlight.setAttribute('x', left);
                    this._highlight.setAttribute('y', top);
                    this._highlight.setAttribute('width', Math.abs(right - left));
                    this._highlight.setAttribute('height', Math.abs(bottom - top));
                }
                else {
                    this.clearHighlight();
                }
            }
        });
        this.elem.addEventListener('mouseup', () => {
            if (highlighting) {
                const svgRect = this.elem.createSVGRect();
                svgRect.x = this._highlight.attributes.x.value;
                svgRect.y = this._highlight.attributes.y.value;
                svgRect.width = this._highlight.attributes.width.value;
                svgRect.height = this._highlight.attributes.height.value;
                this.unselectItems();
                this.elem.getIntersectionList(svgRect, null).forEach((_) => {
                    const node = _.node || _.parentNode.node;
                    if (node && node instanceof node_1.default) {
                        node.select();
                        node.on('drag', this.onNodeDrag.bind(this, node));
                        this._selected.push(node);
                        this.trigger('onselect', this._selected);
                    }
                });
                this.reorderItems(this._selected);
                this.clearHighlight();
            }
            origin = undefined;
            highlighting = false;
        });
    }
    onNodeDrag(node, { dx, dy }) {
        this._selected.filter(n => n !== node).forEach((n) => {
            n.setXY(n.x + dx, n.y + dy);
            n._links.forEach((link) => link.redrawPath());
        });
    }
    reorderItems(selected) {
        selected.forEach((baseItem) => {
            this.removeChild(baseItem);
            this.appendChild(baseItem);
        });
    }
    unselectItems() {
        this._selected.forEach(_ => {
            _.unselect();
            _.off('drag', this.onNodeDrag.bind(this, _));
        });
        this._selected = [];
    }
    edit() {
        this._editable = true;
        this._mode = editmode_1.EditMode.None;
    }
    addNode(node) {
        node.selectable();
        this.addToBoardItems(this._nodes, node);
    }
    addLink(link) {
        this._links.push(link);
        this.appendChild(link);
    }
    addToBoardItems(arr, item) {
        item.setIndex(arr.length);
        this.appendChild(item);
        arr.push(item);
        this.subscribeToSelection(item);
    }
    setMode(mode) {
        this._mode = mode;
    }
    setNodes(nodes) {
        nodes.forEach((node) => this.addNode(node));
    }
    setLinks(links) {
        links.forEach((link) => this.addLink(link));
    }
    subscribeToSelection(item) {
        item.on('clickonly', () => {
            if (item.selected) {
                item.unselect();
                this._selected.splice(this._selected.indexOf(item), 1);
                this.trigger('ondeselect', this._selected);
            }
            else {
                this.unselectItems();
                item.select();
                this._selected.push(item);
                this.trigger('onselect', this._selected);
                this.reorderItems(this._selected);
                this.clearHighlight();
            }
        });
    }
    enterSelectionMode(onComplete = (point) => { }) {
        this.elem.onclick = (evt) => {
            const point = getCoordsFromEvent(evt, this.elem);
            this.exitSelectionMode();
            onComplete(point);
        };
    }
    enterNodeMode(onComplete = (point) => { }) {
        this.enterSelectionMode((point) => {
            const config = {
                x: point.x - this._transformMatrix[4],
                y: point.y - this._transformMatrix[5],
                title: 'New Title',
                editable: this._editable,
                inputs: [],
                outputs: []
            };
            let node = new node_1.default(this._doc, config);
            this.addNode(node);
            onComplete(point);
        });
    }
    exitNodeMode() {
        this.exitSelectionMode();
    }
    exitSelectionMode() {
        this.elem.onclick = undefined;
    }
    enterLinkMode(onComplete = () => { }) {
        const scope = this;
        const onLinkConstructed = (node, ioIndex) => {
            if (this._link) {
                scope._mode = editmode_1.EditMode.None;
                this._link.setTarget(node, ioIndex);
                this._link.setDotted(false);
                this._link.selectable();
                onComplete();
                this._nodes.forEach((node) => {
                    node.startListening();
                    node.removeLinkables();
                    node.resetColor();
                });
                this._link = undefined;
            }
            else {
                const link = this._link = new link_1.default(this._doc, node, ioIndex, new mouse_1.default(this.elem.getBoundingClientRect()), -1, {
                    dotted: true,
                    editable: this._editable,
                });
                this.addLink(link);
                node.addLink(link, 'output');
                this._nodes.forEach((node) => {
                    node.removeLinkables();
                    node.drawInputLinkables(onLinkConstructed);
                    node.setInputColor();
                });
            }
        };
        this._nodes.forEach((node) => {
            node.stopListening();
            node.drawOutputLinkables(onLinkConstructed);
        });
    }
    exitLinkMode() {
        this._nodes.forEach((node) => {
            node.removeLinkables();
            node.resetColor();
        });
        if (this._link) {
            this._links.splice(this._links.indexOf(this._link), 1);
            this._link.remove();
            this._link = undefined;
        }
    }
    enterZoomMode(type) {
        this.elem.onclick = (evt) => {
            const scale = this._scale + (type === zoommode_1.ZoomMode.ZoomIn ? 1 : -1) * 0.25;
            const point = getCoordsFromEvent(evt, this.elem);
            this.zoom(scale, point);
        };
    }
    exitZoomMode() {
        this.elem.onclick = undefined;
    }
    zoom(scale, point) {
        this._scale = scale;
        const bbox = this.elem.getBoundingClientRect();
        const scalePoint = point ? point : { x: bbox.width / 2, y: bbox.height / 2 };
        this._transformMatrix = this._zoomToScale(this._transformMatrix, scale, scalePoint);
        this._refreshTransformMatrix({
            x: scalePoint.x / scale,
            y: scalePoint.y / scale,
        });
    }
    delete(item) {
        if (this._nodes.indexOf(item) >= 0) {
            this._nodes.splice(this._nodes.indexOf(item), 1);
            this._nodes.forEach((node, index) => node.setIndex(index));
        }
        else if (this._links.indexOf(item) >= 0) {
            this._links.splice(this._links.indexOf(item), 1);
        }
        item.destroy();
    }
    deleteNodes() {
        this._nodes.forEach((node) => node.destroy());
        this._nodes = [];
    }
    oppositeSide(side) {
        return { 'l': 'r', 'r': 'l', 'u': 'd', 'd': 'u' }[side];
    }
    get scale() {
        return this._scale;
    }
}
exports.default = Board;


/***/ }),

/***/ "./src/displays/colorpalette.ts":
/*!**************************************!*\
  !*** ./src/displays/colorpalette.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! displays/base */ "./src/displays/base.ts");
class ColorPalette extends base_1.default {
    constructor(doc) {
        super();
        this._doc = doc;
        this._hidden = true;
        this.initialize();
    }
    initialize() {
        const { _doc, _hidden } = this;
        let sel = this.elem = _doc.createElement('div');
        sel.setAttribute('style', `position:absolute;background-color:white;box-shadow:rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;padding:5px;width:162px;
      ${_hidden ? 'visibility:hidden' : 'visibility:visible'}
    `);
        const rgb = [
            ['#4d4d4d', '#999999', '#fff', '#f44e3b', '#fe9200', '#fcdc00', '#dbdf00', '#a4dd00', '#68ccca', '#73d8ff', '#aea1ff', '#fda1ff'],
            ['#333', '#808080', '#ccc', '#d33115', '#e27300', '#fcc400', '#b0bc00', '#68bc00', '#16a5a5', '#68ccca', '#009ce0', '#7b64ff'],
            ['#000', '#666', '#b3b3b3', '#9f0500', '#c45100', '#fb9e00', '#808900', '#194d33', '#0c797d', '#0062b1', '#653294', '#ab149e']
        ];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 9; j++) {
                var color = rgb[i][j];
                var node = _doc.createElement('div');
                node.setAttribute('class', 'btn palette');
                if (color === '#fff') {
                    node.setAttribute('style', `
            width: 13px;
            height: 13px;
            border: solid 1px #ccc;
            background-color: ${color};
          `);
                }
                else {
                    node.setAttribute('style', `
            background-color: ${color};
          `);
                }
                node.onclick = ((color) => (evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    this.trigger('palette-select', color);
                    this.hide();
                })(color);
                sel.appendChild(node);
            }
        }
    }
    toggle() {
        (this._hidden) ? this.show() : this.hide();
        return !this._hidden;
    }
    hide() {
        this._hidden = true;
        this.elem.style.visibility = 'hidden';
    }
    show() {
        this._hidden = false;
        this.elem.style.visibility = 'visible';
    }
}
exports.default = ColorPalette;


/***/ }),

/***/ "./src/displays/draggable.ts":
/*!***********************************!*\
  !*** ./src/displays/draggable.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! displays/base */ "./src/displays/base.ts");
const selectable_1 = __webpack_require__(/*! composite/selectable */ "./src/composite/selectable.ts");
const getCoordsFromEvent = (ev) => {
    if (ev.changedTouches) {
        ev = ev.changedTouches[0];
    }
    return { x: ev.clientX, y: ev.clientY };
};
class Draggable extends base_1.default {
    constructor() {
        super();
        this._enabled = false;
        this._dragged = false;
    }
    draggable(el) {
        this._enabled = true;
        this.startDragFn = this.startDrag.bind(this);
        this.dragFn = this.drag.bind(this);
        this.endDragFn = this.endDrag.bind(this);
        this.init(this.enabled, el);
    }
    init(enabled, el) {
        el.addEventListener('mousedown', this.startDragFn);
        el.addEventListener('touchstart', this.startDragFn, { passive: false });
    }
    startListening() {
        this.elem.addEventListener('mousedown', this.startDragFn);
        this.elem.addEventListener('touchstart', this.startDragFn, { passive: false });
    }
    stopListening() {
        this.elem.removeEventListener('mousedown', this.startDragFn);
        this.elem.removeEventListener('touchstart', this.startDragFn, { passive: false });
    }
    destroy() {
        this.stopListening();
    }
    startDrag(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var clicked = getCoordsFromEvent(evt);
        var rect = this.elem.getBoundingClientRect();
        this._offset = {
            x: clicked.x - rect.x,
            y: clicked.y - rect.y
        };
        window.addEventListener('mousemove', this.dragFn);
        window.addEventListener('touchmove', this.dragFn, { passive: false });
        window.addEventListener('mouseup', this.endDragFn);
        window.addEventListener('touchend', this.endDragFn, { passive: false });
    }
    drag(evt) {
        this._dragged = true;
        const offset = this._offset;
        const coord = getCoordsFromEvent(evt);
        const x = coord.x - offset.x;
        const y = coord.y - offset.y;
        const dx = x - this.x;
        const dy = y - this.y;
        this.setXY({
            x: x,
            y: y
        });
        this.trigger('drag', {
            x: x,
            y: y,
            dx: dx,
            dy: dy,
        });
    }
    endDrag() {
        if (!this._dragged)
            this.trigger('clickonly');
        this._dragged = false;
        window.removeEventListener('mousemove', this.dragFn);
        window.removeEventListener('touchmove', this.dragFn);
        window.removeEventListener('mouseup', this.endDragFn);
        window.removeEventListener('touchend', this.endDragFn);
    }
    setXY(point) {
        this.x = point.x;
        this.y = point.y;
    }
    isDragging() {
        return this._dragged;
    }
    get x() {
        return this._x;
    }
    set x(v) {
        this._x = v;
    }
    get y() {
        return this._y;
    }
    set y(v) {
        this._y = v;
    }
    get enabled() {
        return this._enabled;
    }
}
exports.default = selectable_1.default(Draggable);


/***/ }),

/***/ "./src/displays/evented.ts":
/*!*********************************!*\
  !*** ./src/displays/evented.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Evented {
    constructor() {
        this._events = {};
    }
    _defaulted(name) {
        if (!this._events[name]) {
            this._events[name] = [];
        }
    }
    off(name, callback) {
        this._defaulted(name);
        var arr = this._events[name];
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === callback) {
                arr.splice(i, 1);
                break;
            }
        }
    }
    on(name, callback) {
        this._defaulted(name);
        this._events[name].push(callback);
    }
    once(name, callback) {
        this._defaulted(name);
        let func = (...args) => {
            callback.call(this, ...args);
            this.off(name, func);
        };
        this._events[name].push(func);
    }
    trigger(name, ...args) {
        if (this._events[name]) {
            this._events[name].forEach((_) => {
                _.call(this, ...args);
            });
        }
    }
}
exports.default = Evented;


/***/ }),

/***/ "./src/displays/graphics/svgtable.ts":
/*!*******************************************!*\
  !*** ./src/displays/graphics/svgtable.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! displays/base */ "./src/displays/base.ts");
class SvgTable extends base_1.default {
    generate(doc, header = [], rows = []) {
        const inner = `<table xmlns="http://www.w3.org/2000/svg" class="paper tb">
      <thead class="tb-hd"><tr class="tb-rw">${['', ...header].map(_ => `<th class="tb-cell-hd">${_}</th>`).join('')}</tr></thead>
      <tbody class="tb-bd">${rows.map((cols, rowIndex) => {
            return Array.isArray(cols)
                ? `<tr class="tb-rw"><td class="tb-cell">${rowIndex + 1}.</td>${cols.map((_) => `<td class="tb-cell">${_}</td>`).join('')}</tr>`
                : `<tr class="tb-rw"><td class="tb-cell">${rowIndex + 1}.</td><td class="tb-cell">${cols}</td></tr>`;
        }).join('')}</tbody>
    </table>`;
        const fo = this.createDomElement(doc, 'foreignObject', inner);
        fo.setAttribute('width', 420);
        fo.setAttribute('height', 70 + rows.length * 40);
        return fo;
    }
}
exports.default = new SvgTable();


/***/ }),

/***/ "./src/displays/link.ts":
/*!******************************!*\
  !*** ./src/displays/link.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! displays/base */ "./src/displays/base.ts");
const selectable_1 = __webpack_require__(/*! composite/selectable */ "./src/composite/selectable.ts");
const config_1 = __webpack_require__(/*! constants/config */ "./src/constants/config.ts");
const { NODE_HEIGHT, LINK_COLOR, LINK_SELECTED_COLOR, LINK_ARROW_WIDTH, NODE_IO_SIZE } = config_1.default;
class Link extends selectable_1.default(base_1.default) {
    constructor(doc, src, output_index, target, input_index, { type = 'regular', dotted = false, mode = 'elbow', editable = true }) {
        super();
        this._type = type;
        this._dotted = dotted;
        this._mode = mode;
        this._editable = editable;
        this.initialize(doc, src, output_index, target, input_index);
    }
    getSrc() { return this._src; }
    getTarget() { return this._target; }
    setTarget(target, input_index) {
        this._target.destroy();
        this._target = target;
        this._input_index = input_index - 1;
        target.addLink(this, 'input');
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
        path.setAttribute('stroke', this.selected ? LINK_SELECTED_COLOR : LINK_COLOR);
        path.setAttribute('marker-end', this.selected ? "url(#head-selected)" : "url(#head)");
        path.setAttribute('stroke-dasharray', this._dotted && '10,10');
        path.setAttribute('d', this.formPath(this._mode, coord1, coord2));
    }
    initialize(doc, src, output_index, target, input_index) {
        this._src = src;
        this._output_index = output_index - 1;
        this._target = target;
        this._input_index = input_index - 1;
        src.addLink(this, 'output');
        target.addLink(this, 'input');
        const xmlns = "http://www.w3.org/2000/svg";
        const sel = this.elem = this.createSvgElement(doc, 'g');
        const path = doc.createElementNS(xmlns, 'path');
        sel.appendChild(path);
        path.setAttribute('stroke-width', "2");
        path.setAttribute('fill', "none");
        this.redrawPath();
    }
    select() {
        super.select();
        this.redrawPath();
    }
    unselect() {
        super.unselect();
        this.elem.removeAttribute('id');
        this.redrawPath();
    }
    destroy() {
        this._src.deleteLink(this);
        this._target.deleteLink(this);
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
        switch (mode) {
            case 'direct':
                d = `M${coord1.x},${coord1.y} T${coord2.x - LINK_ARROW_WIDTH},${coord2.y}`;
                break;
            case 'curve':
                if (Math.abs(coord2.y - coord1.y) < 0.2 * coord2.y) {
                    return `M${coord1.x},${coord1.y} T${coord2.x - LINK_ARROW_WIDTH},${coord2.y}`;
                }
                midX = coord1.x + (coord2.x - coord1.x) / 2;
                midY = coord1.y + (coord2.y - coord1.y) / 2;
                d = `M${coord1.x},${coord1.y} Q${midX},${coord1.y} ${midX},${midY} T${coord2.x - LINK_ARROW_WIDTH},${coord2.y}`;
                break;
            case 'elbow':
            default:
                midX = coord1.x + (coord2.x - coord1.x) / 2,
                    midY = coord1.y + (coord2.y - coord1.y) / 2;
                if (coord2.x >= coord1.x + LINK_ARROW_WIDTH + 3) {
                    d = `M${coord1.x},${coord1.y} L${midX},${coord1.y} L${midX},${coord2.y} L${coord2.x - LINK_ARROW_WIDTH},${coord2.y}`;
                }
                else {
                    const neg = (coord2.y > coord1.y + 2 * (NODE_HEIGHT / 2) + NODE_IO_SIZE) || (coord2.y < coord1.y - (NODE_HEIGHT / 2)) ? 1 : -1;
                    d = `M${coord1.x},${coord1.y} L${coord1.x + NODE_IO_SIZE},${coord1.y} L${coord1.x + NODE_IO_SIZE},${coord1.y + neg * ((NODE_HEIGHT / 2) + NODE_IO_SIZE)} L${coord2.x - NODE_IO_SIZE},${coord1.y + neg * ((NODE_HEIGHT / 2) + NODE_IO_SIZE)} L${coord2.x - NODE_IO_SIZE},${coord2.y} L${coord2.x - LINK_ARROW_WIDTH},${coord2.y}`;
                }
                break;
        }
        return d;
    }
}
exports.default = Link;


/***/ }),

/***/ "./src/displays/mouse.ts":
/*!*******************************!*\
  !*** ./src/displays/mouse.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const evented_1 = __webpack_require__(/*! displays/evented */ "./src/displays/evented.ts");
class Mouse extends evented_1.default {
    constructor(offset) {
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
        window.removeEventListener('mousemove', this.move);
    }
    addLink(link) { this._link = link; }
    deleteLink(link) { this._link = undefined; }
    move(ev) {
        if (ev.changedTouches) {
            ev = ev.changedTouches[0];
        }
        const newX = ev.clientX - this._offset.left;
        const newY = ev.clientY - this._offset.top;
        const dx = newX - this._coords.x;
        const dy = newY - this._coords.y;
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
    getInputCoord() {
        return {
            x: this._coords.x,
            y: this._coords.y
        };
    }
    getOutputCoord() {
        return {
            x: this._coords.x,
            y: this._coords.y
        };
    }
    setXY(point) {
        this._coords.x = point.x;
        this._coords.y = point.y;
    }
    getFaceCoord(side) { return this._coords; }
    getFaceCoords() { return [this._coords]; }
    getIndex() { return -1; }
    setIndex(index) { }
}
exports.default = Mouse;
;


/***/ }),

/***/ "./src/displays/node.ts":
/*!******************************!*\
  !*** ./src/displays/node.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const draggable_1 = __webpack_require__(/*! displays/draggable */ "./src/displays/draggable.ts");
const svg_1 = __webpack_require__(/*! displays/svg */ "./src/displays/svg.ts");
const svgtable_1 = __webpack_require__(/*! displays/graphics/svgtable */ "./src/displays/graphics/svgtable.ts");
const config_1 = __webpack_require__(/*! constants/config */ "./src/constants/config.ts");
const { NODE_WIDTH, NODE_HEIGHT, NODE_COLOR, NODE_DISABLED_COLOR, NODE_BORDER_COLOR, NODE_TEXT_COLOR, NODE_STROKE_WEIGHT, NODE_PADDING, NODE_IO_SIZE, NODE_IO_SPACING, NODE_CONNECTOR_BORDER_COLOR, NODE_IO_HOVER_COLOR, NODE_IO_CONNECTOR_COLOR, BORDER_WIDTH, } = config_1.default;
class Node extends draggable_1.default {
    constructor(doc, config) {
        super();
        const { width = NODE_WIDTH, height = NODE_HEIGHT, editable, attrs = [], inputs = [], outputs = [] } = config;
        this._doc = doc;
        this._config = config;
        this._width = width;
        this._height = height;
        this._editable = editable;
        this._inputCount = 0;
        this._outputCount = 1;
        this._attrs = attrs;
        this._links = [];
        this._inputLinks = [];
        this._outputLinks = [];
        this._inputs = inputs;
        this._outputs = outputs;
        this._menuState = false;
        this.validateNodeTemplate(inputs, outputs);
        this._inputCount = this._inputs.length;
        this._outputCount = this._outputs.length;
        this._dragFn = this._dragFn.bind(this);
        this.initialize(doc, config);
    }
    _dragFn() {
        this._links.forEach(_ => _.redrawPath());
    }
    validateNodeTemplate(inputs, outputs) {
        if (!inputs && !outputs) {
            throw Error('Invalid Node Template: No inputs or outputs in function node.');
        }
        if (!Array.isArray(inputs) || !Array.isArray(outputs)) {
            throw Error('Invalid Node Template: invalid inputs/outputs type.');
        }
        const ioNames = ['inputs', 'outputs'];
        [inputs, outputs].forEach((io, ioIndex) => {
            io.forEach((_, index) => {
                if (!_ && typeof (_) !== 'string')
                    throw Error(`Invalid Node Template: Invalid ${ioNames[ioIndex]} type on index (${index}). Only string can be accepted.`);
                if (this.validateIoType(_))
                    throw Error(`Invalid Node Template: Invalid ${ioNames[ioIndex]} type on index (${index}). Values can only be "string", "boolean", "integer", "function"`);
            });
        });
    }
    validateIoType(type) {
        return ['string', 'boolean', 'integer', 'function'].indexOf(type) < 0;
    }
    addLink(link, type) {
        if (type === 'input') {
            this._inputLinks.push(link);
        }
        else if (type === 'output') {
            this._outputLinks.push(link);
        }
        this._links.push(link);
    }
    deleteLink(link) {
        const inputIndex = this._inputLinks.indexOf(link);
        const outputIndex = this._outputLinks.indexOf(link);
        if (inputIndex >= 0)
            this._inputLinks.splice(inputIndex, 1);
        if (outputIndex >= 0)
            this._outputLinks.splice(outputIndex, 1);
        this._links.splice(this._links.indexOf(link), 1);
    }
    setFillColor(color = NODE_COLOR) {
        this._bg.setAttribute('style', `fill:${color};stroke-width:${NODE_STROKE_WEIGHT};stroke:${NODE_BORDER_COLOR};filter:drop-shadow(0px 1px 1px rgba(0,0,0,.4));`);
    }
    setFontColor(fontColor) {
        const { fontSize = 11 } = this._config;
        this._config.fontColor = fontColor;
        this._text.setAttribute('style', `font-size:${fontSize}px;color:${fontColor};overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;`);
    }
    initialize(doc, config) {
        const { x = 0, y = 0, title = '', fontSize = 11, color = NODE_COLOR, fontColor = NODE_TEXT_COLOR } = config;
        let sel = this.elem = this.createSvgElement(doc, 'g');
        this.setXY({
            x: x,
            y: y
        });
        sel.setAttribute('transform', `translate(${x},${y})`);
        let rect;
        this._bg = rect = this.createSvgElement(doc, 'rect');
        rect.setAttribute('width', this._width);
        rect.setAttribute('height', this._height);
        rect.setAttribute('rx', NODE_PADDING);
        rect.setAttribute('ry', NODE_PADDING);
        this.setFillColor(color);
        sel.appendChild(rect);
        let foreignObject = this.createSvgElement(doc, 'foreignObject');
        foreignObject.setAttribute('class', 'no-mouse');
        foreignObject.setAttribute('x', NODE_PADDING);
        foreignObject.setAttribute('y', NODE_PADDING);
        foreignObject.setAttribute('width', this._width - 2 * NODE_PADDING);
        foreignObject.setAttribute('height', this._height - 2 * NODE_PADDING);
        let text;
        this._text = text = this.createNonSvgElement(doc, 'div');
        text.setAttribute('contenteditable', 'true');
        text.setAttribute('xmlns', "http://www.w3.org/1999/xhtml");
        text.setAttribute('style', `font-size:${fontSize}px;color:${fontColor};overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;`);
        text.innerHTML = title;
        foreignObject.appendChild(text);
        sel.appendChild(foreignObject);
        if (this._editable) {
            this.draggable(sel);
            this.on('drag', this._dragFn);
        }
    }
    destroy() {
        this._links.forEach(link => {
            link.destroy();
        });
        this.remove();
        this.off('drag', this._dragFn);
    }
    select() {
        super.select();
        let rect = this.createSvgElement(this._doc, 'rect');
        rect.setAttribute('class', 'highlight');
        rect.setAttribute('width', this._width);
        rect.setAttribute('height', this._height);
        this.elem.appendChild(rect);
        this.drawInputLinkables();
        this.drawOutputLinkables();
        this.drawMenu();
        this._links.forEach(link => link.redrawPath());
    }
    unselect() {
        super.unselect();
        this.elem.removeAttribute('id');
        ['.highlight', '#menu-btn', '#svg-table'].forEach(id => {
            const elem = this.elem.querySelector(id);
            if (elem !== null) {
                this.elem.removeChild(elem);
            }
        });
        this.removeLinkables();
        this._links.forEach(link => link.redrawPath());
    }
    drawMenu(open = false) {
        this._menuState = open;
        const gDom = this.createSvgElement(this._doc, 'g');
        gDom.setAttribute('id', `menu-btn`);
        gDom.setAttribute('style', `transform: translate(0,${this._height + 10}px);`);
        const svg = open ? svg_1.ArrowUp : svg_1.ArrowDown;
        const arrowIcon = this.createDomElement(this._doc, 'g', svg).lastChild;
        this.appendIconAttrs(arrowIcon);
        const foreignObject = this.createSvgElement(this._doc, 'foreignObject');
        foreignObject.setAttribute('width', 25);
        foreignObject.setAttribute('height', 25);
        foreignObject.setAttribute('style', 'background-color:rgb(238,238,238);border-radius:15px;box-shadow:0px 2px 1px -1px rgb(0 0 0 / 20%),0px 1px 1px 0px rgb(0 0 0 / 14%),0px 1px 3px 0px rgb(0 0 0 / 12%);');
        gDom.appendChild(foreignObject);
        gDom.appendChild(arrowIcon);
        gDom.addEventListener('mousedown', (evt) => {
            evt.stopImmediatePropagation();
            this._menuState = !this._menuState;
            this.redrawMenu(this._menuState);
        });
        this.elem.appendChild(gDom);
    }
    generateTable(perm, attrs) {
        const table = svgtable_1.default.generate(this._doc, ['Attribute', 'Value', `<button class="icon-btn add-btn">${svg_1.Add}</button`], [
            ...perm,
            ...this.appendWithDeleteBtn(this.toEditable(attrs))
        ]);
        table.setAttribute('id', "svg-table");
        table.setAttribute('style', "transform:translate(0,70px);");
        table.onmousedown = (evt) => {
            const btn = evt.target.parentNode;
            if (btn && btn.nodeName === "BUTTON" && btn.className === "icon-btn del-btn") {
                evt.stopImmediatePropagation();
                this._attrs.splice(parseInt(btn.attributes.index.value), 1);
                this.drawOrRefreshTable();
            }
            else if (btn && btn.nodeName === "BUTTON" && btn.className === "icon-btn add-btn") {
                evt.stopImmediatePropagation();
                this._attrs.push({
                    name: '',
                    value: '',
                });
                this.drawOrRefreshTable();
            }
            else if (evt.target.nodeName === "INPUT") {
                evt.stopImmediatePropagation();
                var replacement = false;
                if (this._selectedText)
                    replacement = true;
                this._selectedText = evt.target;
                this._selectedText.onblur = () => {
                    if (replacement) {
                        replacement = false;
                    }
                    else {
                        this._selectedText = undefined;
                    }
                };
            }
        };
        return table;
    }
    toEditable(attrs) {
        return attrs.map((attr, index) => {
            const ret = {
                name: '',
                value: ''
            };
            const placeholder = {
                name: 'Enter key',
                value: 'Enter value'
            };
            Object.keys(attr).filter(key => key !== 'placeholder').map(key => {
                const keyOf = key;
                ret[keyOf] = `<input value="${attr[keyOf]}" placeholder="${placeholder[keyOf]}" index="${index}" key="${key}" />`;
            });
            return ret;
        });
    }
    drawOrRefreshTable() {
        const table = this.elem.querySelector("#svg-table");
        if (table) {
            this.elem.removeChild(table);
        }
        this.elem.appendChild(this.generateTable(this.getPermAttributes(), this.getAttributes()));
    }
    redrawMenu(open) {
        const icon = this._doc.getElementById('menu-icon');
        let svg;
        if (open) {
            svg = this.createDomElement(this._doc, 'g', svg_1.ArrowUp).lastChild;
            this.drawOrRefreshTable();
        }
        else {
            svg = this.createDomElement(this._doc, 'g', svg_1.ArrowDown).lastChild;
            const elem = this.elem.querySelector("#svg-table");
            this.elem.removeChild(elem);
        }
        this.appendIconAttrs(svg);
        icon.replaceWith(svg);
    }
    getPermAttributes() {
        return [['Index', this.getIndex().toString(), ' ']];
    }
    getAttributes() {
        return this._attrs;
    }
    appendWithDeleteBtn(arr) {
        return arr.map((item, index) => {
            return [item.name, item.value, `<button class="icon-btn del-btn" index="${index}">${svg_1.Delete}</button>`];
        });
    }
    appendIconAttrs(icon) {
        icon.setAttribute('id', 'menu-icon');
        icon.setAttribute('style', 'fill:rgba(0,0,0,.54);');
        icon.setAttribute('x', 3);
        icon.setAttribute('y', 3);
    }
    calculateTextSize(doc, font, txt) {
        let canvas = doc.createElement('canvas');
        let context = canvas.getContext("2d");
        context.font = font;
        let tsize = { 'width': context.measureText(txt).width, 'height': parseInt(context.font) };
        return tsize;
    }
    setXY(point) {
        super.setXY(point);
        const svg = this._parent;
        if (svg) {
            let svgPoint = svg.createSVGPoint();
            svgPoint.x = point.x;
            svgPoint.y = point.y;
            const invertedSVGMatrix = svg.getScreenCTM().inverse();
            svgPoint = svgPoint.matrixTransform(invertedSVGMatrix);
            this._setXY(svgPoint);
        }
        else {
            this._setXY(point);
        }
    }
    _setXY({ x, y }) {
        this._config.x = x;
        this._config.y = y;
        this.elem.setAttributeNS(null, 'transform', `translate(${x},${y})`);
    }
    addXY(dx, dy) {
        const x = this.x + dx;
        const y = this.y + dy;
        this._setXY({
            x: x,
            y: y
        });
    }
    getFaceCoords() {
        return ['u', 'l', 'r', 'd'].map((side) => this.getFaceCoord(side));
    }
    getFaceCoord(side) {
        const { x = 0, y = 0 } = this._config;
        var coord;
        switch (side) {
            case 'u':
                coord = {
                    x: x + (this._width / 2),
                    y: y,
                    side: side
                };
                break;
            case 'l':
                coord = {
                    x: x,
                    y: y + (this._height / 2),
                    side: side
                };
                break;
            case 'r':
                coord = {
                    x: x + this._width,
                    y: y + (this._height / 2),
                    side: side
                };
                break;
            case 'd':
                coord = {
                    x: x + (this._width / 2),
                    y: y + this._height,
                    side: side
                };
                break;
        }
        return coord;
    }
    isTextEditable() {
        return this._text._editable;
    }
    makeDefaultTextEditable() {
        if (!this._selectedText) {
            const textbox = this._text;
            textbox._editable = true;
            textbox.setAttribute('contenteditable', 'true');
            const range = document.createRange();
            const sel = window.getSelection();
            range.setStart(textbox, 1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            this.stopListening();
            textbox.onblur = () => {
                textbox._editable = false;
                textbox.setAttribute('contenteditable', 'false');
                this.startListening();
            };
        }
        else {
            this._selectedText.onchange = (evt) => {
                const input = evt.target;
                const key = input.attributes.key.value;
                const index = input.attributes.index.value;
                this._attrs[index][key] = input.value;
            };
        }
    }
    exportAsJson() {
        const { x, y, title, color, description = '' } = this._config;
        return {
            "title": title,
            "description": description,
            "color": color,
            "x": x,
            "y": y,
            "editable": this._editable,
            "attrs": this._attrs,
            "inputs": this._inputs,
            "outputs": this._outputs
        };
    }
    getInputCoord(index) {
        const { x = 0, y = 0 } = this._config;
        return this.selected ? this.getInputCoordByIndex(index) : {
            x: x,
            y: y + (this._height / 2),
        };
    }
    getInputCoordByIndex(index) {
        const { x = 0, y = 0 } = this._config;
        const coords = this.calcInputCoords(0, NODE_IO_SIZE / 2);
        return {
            x: x + coords[index].x,
            y: y + coords[index].y
        };
    }
    getOutputCoord(index) {
        const { x = 0, y = 0 } = this._config;
        return this.selected ? this.getOutputCoordByIndex(index) : {
            x: x + this._width,
            y: y + (this._height / 2),
        };
    }
    getOutputCoordByIndex(index) {
        const { x = 0, y = 0 } = this._config;
        const coords = this.calcOutputCoords(NODE_IO_SIZE + 1, NODE_IO_SIZE / 2);
        return {
            x: x + coords[index].x,
            y: y + coords[index].y
        };
    }
    setInputColor() {
        if (this._inputs.length === 0) {
            this.setFillColor(NODE_DISABLED_COLOR);
        }
    }
    getIndex() {
        return this._index;
    }
    setIndex(index) {
        this._index = index;
    }
    resetColor() {
        this.setFillColor(NODE_COLOR);
    }
    calcInputCoords(xOffset = 0, yOffset = 0) {
        const INPUT_COUNT = this._inputCount;
        const X = -(BORDER_WIDTH + NODE_IO_SIZE + NODE_IO_SPACING);
        const height = INPUT_COUNT * NODE_IO_SIZE + (INPUT_COUNT - 1) * NODE_IO_SPACING;
        const halfAbove = height / 2;
        const startingY = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);
        const coords = [];
        for (let i = 0; i < INPUT_COUNT; i++) {
            coords.push({
                x: X + xOffset,
                y: startingY + i * (NODE_IO_SIZE + NODE_IO_SPACING) + yOffset
            });
        }
        return coords;
    }
    calcOutputCoords(xOffset = 0, yOffset = 0) {
        const OUTPUT_COUNT = this._outputCount;
        const height = OUTPUT_COUNT * NODE_IO_SIZE + (OUTPUT_COUNT - 1) * NODE_IO_SPACING;
        const halfAbove = height / 2;
        const startingY = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);
        const coords = [];
        for (let i = 0; i < OUTPUT_COUNT; i++) {
            coords.push({
                x: NODE_WIDTH + NODE_IO_SPACING + xOffset,
                y: startingY + i * NODE_IO_SPACING + yOffset
            });
        }
        return coords;
    }
    drawInputLinkables(onLinkConstruct) {
        if (this._inputs.length > 0) {
            const INPUT_COUNT = this._inputCount;
            const X = -(BORDER_WIDTH + NODE_IO_SIZE + NODE_IO_SPACING);
            const height = INPUT_COUNT * NODE_IO_SIZE + (INPUT_COUNT - 1) * NODE_IO_SPACING;
            const halfAbove = height / 2;
            const startingY = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);
            const foreignObject = this.createSvgElement(this._doc, 'foreignObject');
            foreignObject.setAttribute('id', 'inputLinkables');
            foreignObject.setAttribute('width', NODE_IO_SIZE + BORDER_WIDTH);
            foreignObject.setAttribute('height', height + BORDER_WIDTH);
            foreignObject.setAttribute('style', `transform: translate(${X}px,${startingY}px);`);
            for (let i = 0; i < INPUT_COUNT; i++) {
                foreignObject.appendChild(this.generateIoLinks(this._doc, i + 1, { x: 0, y: i * (NODE_IO_SIZE + NODE_IO_SPACING) }, onLinkConstruct));
            }
            this.elem.appendChild(foreignObject);
        }
    }
    drawOutputLinkables(onLinkConstruct) {
        const BORDER_WIDTH = 5;
        const height = this._outputCount * NODE_IO_SIZE + (this._outputCount - 1) * NODE_IO_SPACING;
        const halfAbove = height / 2;
        const startingY = (halfAbove > (NODE_HEIGHT / 2)) ? -(halfAbove - NODE_HEIGHT / 2) : ((NODE_HEIGHT / 2) - halfAbove);
        const foreignObject = this.createSvgElement(this._doc, 'foreignObject');
        foreignObject.setAttribute('id', 'outputLinkables');
        foreignObject.setAttribute('width', NODE_IO_SIZE + NODE_WIDTH + NODE_IO_SPACING + BORDER_WIDTH);
        foreignObject.setAttribute('height', height + BORDER_WIDTH);
        foreignObject.setAttribute('style', `transform: translate(0,${startingY}px);`);
        for (let i = 0; i < this._outputCount; i++) {
            foreignObject.appendChild(this.generateIoLinks(this._doc, i + 1, { x: NODE_WIDTH + NODE_IO_SPACING, y: i * NODE_IO_SPACING }, onLinkConstruct));
        }
        this.elem.appendChild(foreignObject);
    }
    removeLinkables() {
        ['#inputLinkables', '#outputLinkables'].forEach(id => {
            const elem = this.elem.querySelector(id);
            if (elem !== null) {
                this.elem.removeChild(elem);
            }
        });
    }
    generateIoLinks(doc, index, coords, onLinkConstruct) {
        const div = this.createDomElement(doc, 'div', index.toString());
        div.setAttribute('class', 'io-link');
        div.setAttribute('index', index);
        div.setAttribute('style', `left:${coords.x}px;top:${coords.y}px;width:${NODE_IO_SIZE}px;height:${NODE_IO_SIZE}px;background-color:${NODE_IO_CONNECTOR_COLOR};border: 1px solid ${NODE_CONNECTOR_BORDER_COLOR};border-radius:${NODE_IO_SIZE}px;`);
        div._node = this;
        div._selected = false;
        div.onmouseover = () => {
            if (!div._selected) {
                div.style.backgroundColor = NODE_IO_HOVER_COLOR;
            }
        };
        div.onmouseout = () => {
            if (!div._selected) {
                div.style.backgroundColor = NODE_IO_CONNECTOR_COLOR;
            }
        };
        div.onclick = () => {
            div.selected = true;
            div.style.backgroundColor = NODE_IO_CONNECTOR_COLOR;
            const index = div.getAttribute('index');
            onLinkConstruct(div._node, index);
        };
        return div;
    }
    get outputCount() {
        return this._outputCount;
    }
}
exports.default = Node;


/***/ }),

/***/ "./src/displays/svg.ts":
/*!*****************************!*\
  !*** ./src/displays/svg.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormatColorText = exports.FormatColorFill = exports.ZoomOut = exports.ZoomIn = exports.Redo = exports.Undo = exports.Stop = exports.Pause = exports.Play = exports.CancelInRed = exports.Add = exports.Delete = exports.ArrowForward = exports.ArrowUp = exports.ArrowDown = exports.MoreVert = void 0;
const PathToSvgIcon = (d, size, className = '', style = '') => {
    const MENU_CLASS = `class="${className}"`;
    const STYLE = `style="${style}"`;
    const ICON_SIZE = `width="${size}" height="${size}"`;
    return `<svg ${MENU_CLASS} ${STYLE} viewBox="0 0 24 24" ${ICON_SIZE}><g><g><path d="${d}"/></g></g></svg>`;
};
const MuiSize = 18;
const MuiPathToSvgIcon = (d, { className = '', style = '' } = {}) => PathToSvgIcon(d, MuiSize, className, style);
exports.MoreVert = MuiPathToSvgIcon("M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z");
exports.ArrowDown = MuiPathToSvgIcon("M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z");
exports.ArrowUp = MuiPathToSvgIcon("M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z");
exports.ArrowForward = MuiPathToSvgIcon("M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z");
exports.Delete = MuiPathToSvgIcon("M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z");
exports.Add = MuiPathToSvgIcon("M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z");
exports.CancelInRed = MuiPathToSvgIcon("M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z", { style: "fill:#E21B1B;" });
exports.Play = MuiPathToSvgIcon("M8 5v14l11-7z");
exports.Pause = MuiPathToSvgIcon("M6 19h4V5H6v14zm8-14v14h4V5h-4z");
exports.Stop = MuiPathToSvgIcon("M6 6h12v12H6z");
exports.Undo = MuiPathToSvgIcon("M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z");
exports.Redo = MuiPathToSvgIcon("M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z");
exports.ZoomIn = MuiPathToSvgIcon("M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z");
exports.ZoomOut = MuiPathToSvgIcon("M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z");
exports.FormatColorFill = MuiPathToSvgIcon("M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z");
exports.FormatColorText = MuiPathToSvgIcon("M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_clay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/clay */ "./src/clay.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_src_clay__WEBPACK_IMPORTED_MODULE_0__.default);
})();

clay = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=clay.js.map