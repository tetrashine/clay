var clay =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_clay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/clay.js */ "./src/clay.js");

/* harmony default export */ __webpack_exports__["default"] = (_src_clay_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/clay.js":
/*!*********************!*\
  !*** ./src/clay.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var displays_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! displays/base */ "./src/displays/base.js");
/* harmony import */ var displays_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! displays/board */ "./src/displays/board.js");
/* harmony import */ var displays_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! displays/node */ "./src/displays/node.js");
/* harmony import */ var displays_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! displays/link */ "./src/displays/link.js");
/* harmony import */ var displays_colorpalette__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! displays/colorpalette */ "./src/displays/colorpalette.js");
/* harmony import */ var displays_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! displays/svg */ "./src/displays/svg.js");
/* harmony import */ var constants_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! constants/config */ "./src/constants/config.js");
/* harmony import */ var constants_keycode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! constants/keycode */ "./src/constants/keycode.js");
/* harmony import */ var constants_editmode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! constants/editmode */ "./src/constants/editmode.js");
/* harmony import */ var constants_zoommode__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! constants/zoommode */ "./src/constants/zoommode.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//#region Imports







var NODE_SELECTED_BORDER_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].NODE_SELECTED_BORDER_COLOR,
    NODE_SELECTED_STROKE_WEIGHT = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].NODE_SELECTED_STROKE_WEIGHT,
    NODE_BORDER_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].NODE_BORDER_COLOR,
    HIGHLIGHT_BORDER_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].HIGHLIGHT_BORDER_COLOR,
    HIGHLIGHT_BG_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].HIGHLIGHT_BG_COLOR;


 //#endregion
//#region SVG Decalations

var ICON_SIZE = 18;
var MENU_CLASS = 'class="menu-btn"';
var SIZE = "width=\"".concat(ICON_SIZE, "\" height=\"").concat(ICON_SIZE, "\"");
var NODE_SVG = "<svg ".concat(MENU_CLASS, " viewBox=\"0 0 490 490\" ").concat(SIZE, "><g><g><path d=\"M437.333,21.333h-384C23.936,21.333,0,45.269,0,74.667V416c0,29.397,23.936,53.333,53.333,53.333h384 c29.397,0,53.333-23.936,53.333-53.333V74.667C490.667,45.269,466.731,21.333,437.333,21.333z M469.333,416 c0,17.643-14.357,32-32,32h-384c-17.643,0-32-14.357-32-32V128h448V416z M469.333,106.667h-448v-32c0-17.643,14.357-32,32-32h384 c17.643,0,32,14.357,32,32V106.667z\"/></g></g><g><g><circle cx=\"53.333\" cy=\"74.667\" r=\"10.667\"/></g></g><g><g><circle cx=\"96\" cy=\"74.667\" r=\"10.667\"/></g></g><g><g><circle cx=\"138.667\" cy=\"74.667\" r=\"10.667\"/></g></g><g><g><path d=\"M394.667,320H384v-32c0-5.888-4.779-10.667-10.667-10.667H256V256h10.667c5.888,0,10.667-4.779,10.667-10.667v-42.667 c0-5.888-4.779-10.667-10.667-10.667H224c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h10.667 v21.333H117.333c-5.888,0-10.667,4.779-10.667,10.667v32H96c-5.888,0-10.667,4.779-10.667,10.667v42.667    C85.333,379.221,90.112,384,96,384h42.667c5.888,0,10.667-4.779,10.667-10.667v-42.667c0-5.888-4.779-10.667-10.667-10.667H128 v-21.333h106.667V320H224c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h42.667    c5.888,0,10.667-4.779,10.667-10.667v-42.667c0-5.888-4.779-10.667-10.667-10.667H256v-21.333h106.667V320H352 c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h42.667c5.888,0,10.667-4.779,10.667-10.667    v-42.667C405.333,324.779,400.555,320,394.667,320z M128,362.667h-21.333v-21.333H128V362.667z M256,362.667h-21.333v-21.333H256 V362.667z M234.667,234.667v-21.333H256v21.333H234.667z M384,362.667h-21.333v-21.333H384V362.667z\"/></g></g></svg>");
var EXPORT_SVG = "<svg ".concat(MENU_CLASS, " enable-background=\"new 0 0 551.13 551.13\" viewBox=\"0 0 551.13 551.13\" ").concat(SIZE, "><path d=\"m465.016 172.228h-51.668v34.446h34.446v310.011h-344.457v-310.011h34.446v-34.446h-51.669c-9.52 0-17.223 7.703-17.223 17.223v344.456c0 9.52 7.703 17.223 17.223 17.223h378.902c9.52 0 17.223-7.703 17.223-17.223v-344.456c0-9.52-7.703-17.223-17.223-17.223z\"/><path d=\"m258.342 65.931v244.08h34.446v-244.08l73.937 73.937 24.354-24.354-115.514-115.514-115.514 115.514 24.354 24.354z\"/></svg>");
var UNSELECT_SVG = "<svg ".concat(MENU_CLASS, " viewBox=\"0 0 512 512\" ").concat(SIZE, "><path d=\"m410.667969 368h-117.335938c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0\"/><path d=\"m116.179688 288c-11.175782 0-21.351563-7.019531-25.320313-17.449219l-89.023437-233.707031c-1.089844-2.285156-1.835938-5.867188-1.835938-9.730469 0-14.953125 12.179688-27.113281 27.136719-27.113281 3.753906 0 7.296875.726562 10.496093 2.15625l232.9375 88.703125c10.410157 3.945313 17.429688 14.121094 17.429688 25.300781 0 11.753906-7.507812 22.121094-18.6875 25.792969l-95.9375 31.421875-31.421875 95.914062c-3.628906 11.160157-13.996094 18.710938-25.773437 18.710938zm-80.617188-252.414062 80.277344 210.644531 29.652344-90.519531c1.601562-4.839844 5.378906-8.640626 10.21875-10.21875l90.519531-29.652344zm223.636719 85.183593h.214843zm-233.769531-89.046875c.085937.019532.171874.0625.277343.085938zm5.910156-7.253906.382812 1.003906c-.105468-.277344-.234375-.640625-.382812-1.003906zm0 0\"/><path d=\"m352 512c-88.234375 0-160-71.765625-160-160s71.765625-160 160-160 160 71.765625 160 160-71.765625 160-160 160zm0-288c-70.59375 0-128 57.40625-128 128s57.40625 128 128 128 128-57.40625 128-128-57.40625-128-128-128zm0 0\"/></svg>"); //#endregion

var Clay = /*#__PURE__*/function (_Base) {
  _inherits(Clay, _Base);

  var _super = _createSuper(Clay);

  //#region Constructor
  function Clay(id, config, state) {
    var _this;

    _classCallCheck(this, Clay);

    _this = _super.call(this);
    _this._buttons = {};
    _this._palettes = [];

    _this.initialize();

    var _this$build = _this.build(id, config, state);

    var _this$build2 = _slicedToArray(_this$build, 3);

    _this._dom = _this$build2[0];
    _this._menu = _this$build2[1];
    _this._board = _this$build2[2];
    _this.menuCalibration = _this.menuCalibration(_this._config);
    return _this;
  } //#endregion
  //#region Public Functions


  _createClass(Clay, [{
    key: "addNode",
    value: function addNode(title, nodeConfig) {
      var _this2 = this;

      var selection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var editable = this._config.editable;
      var node;

      if (selection) {
        this._board.enterSelectionMode(function (point) {
          node = new displays_node__WEBPACK_IMPORTED_MODULE_2__["default"](document, nodeConfig, {
            title: title,
            x: point.x,
            y: point.y,
            editable: editable
          });

          _this2._board.addNode(node);
        });
      } else {
        node = new displays_node__WEBPACK_IMPORTED_MODULE_2__["default"](document, nodeConfig, {
          title: title,
          x: 0,
          y: 0,
          editable: editable
        });

        this._board.addNode(node);
      }
    }
  }, {
    key: "export",
    value: function _export() {
      var state = this._board.exportState();

      this.trigger('export', state);
      return state;
    }
  }, {
    key: "load",
    value: function load(config, state) {
      return this._load(this._dom, config, state);
    }
  }, {
    key: "generate",
    value: function generate(doc, dom, config, state) {
      var width = config.width,
          height = config.height,
          zoom = config.zoom,
          editable = config.editable;
      var board = new displays_board__WEBPACK_IMPORTED_MODULE_1__["default"](doc, dom, width, height, zoom, editable);
      var nodes = this.parseNodes(doc, state.nodes, editable);
      var links = this.parseLinks(doc, state.links, nodes, editable);
      board.setNodes(nodes);
      board.setLinks(links);
      return board;
    }
  }, {
    key: "setConfig",
    value: function setConfig(config) {
      this._config = this.applyDefault(config);
    }
  }, {
    key: "setState",
    value: function setState(state) {
      if (this.validate(state)) {
        this._state = state;
        return true;
      }

      return false;
    }
  }, {
    key: "validate",
    value: function validate(state) {
      return true;
    } //#endregion

  }, {
    key: "build",
    value: function build(id, config, state) {
      this.setConfig(config);

      if (this.setState(state)) {
        return this._build(id, this._config, this._state);
      }
    }
  }, {
    key: "_build",
    value: function _build(id, config, state) {
      //generate css
      var style = document.createElement('style');
      var styles = ["* {font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;} .btn{cursor:pointer;} .clay-mb{padding:5px 5px 0 5px;display:table-cell;vertical-align:middle;width:18px;margin:0 5px;position:relative;} .clay-mb.s{fill:#aaa} .clay-mb.e:hover{background-color:#ccc;cursor:pointer;} .clay-mb.e:active{background-color:#aaa;} .tooltiptext {font-size:11px;visibility:hidden;width:60px;background-color:#ccc;text-align:center;padding:3px 8px;position:absolute;z-index:1;left:0;top:29px;color:white;} .menu-btn:hover+.tooltiptext {visibility: visible;} .palette:hover{outline:#fff solid 2px;box-shadow:rgb(60, 64, 67) 0px 2px 6px 2px;} .palette{margin-right:3px;display:inline-block;width:15px;height:15px;}", "#highlight{stroke:".concat(HIGHLIGHT_BORDER_COLOR, ";fill:").concat(HIGHLIGHT_BG_COLOR, ";}"), ".paper{color:rgba(0, 0, 0, 0.87);transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;background-color:#fff;box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);}", ".tb{display:table;border-spacing:0;border-collapse:collapse;background-color:#fff;font-size:0.8rem;text-align:left;}", ".tb-hd{display:table-header-group;border-bottom:solid 1px ".concat(NODE_BORDER_COLOR, ";}"), ".tb-bd{display:table-row-group;}", ".tb-rw{display: table-row;outline: 0;vertical-align: middle;}", ".tb-cell-hd{padding: 5px 24px 5px 16px;color: rgba(0, 0, 0, 0.87);font-weight: 500;line-height: 1.5rem;}", ".tb-cell{padding: 5px 24px 5px 16px;color: rgba(0, 0, 0, 0.87);display: table-cell;font-weight: 400;line-height: 1.43;border-bottom: 1px solid rgba(224, 224, 224, 1);letter-spacing: 0.01071em;}", ".tb-cell > input{width:100px;}", ".icon-btn{flex:0 0 auto;background:none;padding:6px;text-align:center;border-radius:50%;border:0;cursor:pointer;margin:0;display:inline-flex;position:relative;align-items:center;user-select: none;vertical-align: middle;}", ".icon-btn:hover{background-color:#eee;}", ".io-link{position:absolute;font-size:8px;text-align:center;color:white;font-weight:bold;}", ".no-mouse{pointer-events:none;}", ".highlight{fill:rgba(0,0,0,0);stroke-width:".concat(NODE_SELECTED_STROKE_WEIGHT, ";stroke:").concat(NODE_SELECTED_BORDER_COLOR, ";}")];
      style.innerHTML = styles.join(' ');
      document.head.appendChild(style);
      this._dom = document.getElementById(id);
      return this._load(this._dom, config, state);
    }
  }, {
    key: "_load",
    value: function _load(dom, config, state) {
      var editable = config.editable;
      var menu = editable && this.drawEditMenu(document, dom, config);
      var board = this.generate(document, dom, config, state);

      if (editable) {
        board.on('onselect', this.onSelection.bind(this));
        board.on('ondeselect', this.onSelection.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
        this._mode = constants_editmode__WEBPACK_IMPORTED_MODULE_8__["EditMode"].None;
      }

      return [dom, menu, board];
    }
  }, {
    key: "createZoomLevelElement",
    value: function createZoomLevelElement(doc) {
      var _this3 = this;

      var zoomDiv = this.createDomElement(doc, 'div', '');
      var zoomInput = this.createDomElement(doc, 'input', '');
      var zoomPercent = this.createDomElement(doc, 'div', '%');
      zoomDiv.setAttribute('style', 'position:relative;text-align:right;display:table-cell;width:1px;font-size:10px;padding:0 10px 0 5px;vertical-align:middle;border:solid 1px #333;');
      zoomPercent.setAttribute('style', 'position: absolute;right:4px;margin-top:3px;');
      zoomInput.setAttribute('value', '100');
      zoomInput.setAttribute('style', 'color:#333;width:25px;border:none;');

      zoomInput.onchange = function (evt) {
        var scale = parseFloat(evt.target.value);

        _this3._board.zoom(scale / 100);
      };

      zoomDiv.appendChild(zoomPercent);
      zoomDiv.appendChild(zoomInput);
      return zoomDiv;
    }
  }, {
    key: "createHrElement",
    value: function createHrElement(doc) {
      var hr = this.createDomElement(doc, 'span', '|', '');
      hr.setAttribute('style', 'color:#bbb;display:table-cell;width:1px;vertical-align:middle;');
      return hr;
    }
  }, {
    key: "createMenuElement",
    value: function createMenuElement(doc, icon) {
      var cancel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var ele = this.createDomElement(doc, 'div', icon, cancel);
      ele.setAttribute('class', 'clay-mb e');
      return ele;
    }
  }, {
    key: "createMenuBtnElement",
    value: function createMenuBtnElement(_ref) {
      var doc = _ref.doc,
          svg = _ref.svg,
          _ref$cancelSvg = _ref.cancelSvg,
          cancelSvg = _ref$cancelSvg === void 0 ? '' : _ref$cancelSvg,
          tooltip = _ref.tooltip,
          _ref$enable = _ref.enable,
          enable = _ref$enable === void 0 ? true : _ref$enable,
          onClick = _ref.onClick,
          execFn = _ref.execFn,
          cancelFn = _ref.cancelFn;
      var menuElem = this.createMenuElement(doc, svg, cancelSvg);
      var tooltipElem = this.createDomElement(doc, 'span', tooltip);
      tooltipElem.setAttribute('class', 'tooltiptext');
      menuElem.appendChild(tooltipElem);
      menuElem._svg = menuElem.innerHTML;
      Object.entries({
        'onclick': onClick,
        'execFn': execFn,
        'cancelFn': cancelFn
      }).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            name = _ref3[0],
            fn = _ref3[1];

        if (fn) {
          menuElem[name] = fn;
        }
      });
      !enable && this.disableMenuBtn(menuElem);
      return menuElem;
    }
  }, {
    key: "enableMenuBtn",
    value: function enableMenuBtn(btn) {
      btn._enable = true;
      btn.setAttribute('class', 'clay-mb e');
    }
  }, {
    key: "disableMenuBtn",
    value: function disableMenuBtn(btn) {
      btn._enable = false;
      btn.setAttribute('class', 'clay-mb s');
    }
  }, {
    key: "applyDefault",
    value: function applyDefault(config) {
      return _objectSpread({}, {
        editable: true,
        zoomable: true,
        colorize: true,
        exportable: true,
        executable: true
      }, {}, config);
    }
  }, {
    key: "initialize",
    value: function initialize() {}
  }, {
    key: "menuCalibration",
    value: function menuCalibration(config) {
      var _this4 = this;

      return function () {
        [['unselect', 'editable'], ['delete', 'editable'], ['fill', 'colorize'], ['fontfill', 'colorize']].forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              _ = _ref5[0],
              doable = _ref5[1];

          if (config[doable]) {
            _this4._selected && _this4._selected.length > 0 ? _this4.enableMenuBtn(_this4._buttons[_]) : _this4.disableMenuBtn(_this4._buttons[_]);
          }
        });
      };
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var _this5 = this;

      if (e.keyCode === constants_keycode__WEBPACK_IMPORTED_MODULE_7__["KeyCode"].SpaceBar) {
        this._mode = constants_editmode__WEBPACK_IMPORTED_MODULE_8__["EditMode"].Pan;

        this._board.setMode(constants_editmode__WEBPACK_IMPORTED_MODULE_8__["EditMode"].Pan);
      } else if (this._selected) {
        switch (e.keyCode) {
          case constants_keycode__WEBPACK_IMPORTED_MODULE_7__["KeyCode"].Delete:
            //Delete
            this._palettes.forEach(function (_) {
              return _.hide();
            });

            this._selected.forEach(function (_) {
              return _this5._board["delete"](_);
            });

            this._selected = [];
            this.menuCalibration();
            break;

          default:
            if (this._selected.length === 1) {
              this._selected.makeDefaultTextEditable();
            }

            break;
        }
      }
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(e) {
      switch (e.keyCode) {
        case constants_keycode__WEBPACK_IMPORTED_MODULE_7__["KeyCode"].SpaceBar:
          //Space
          this._mode = constants_editmode__WEBPACK_IMPORTED_MODULE_8__["EditMode"].None;

          this._board.setMode(constants_editmode__WEBPACK_IMPORTED_MODULE_8__["EditMode"].None);

          break;
      }
    }
  }, {
    key: "onMenuBtnClick",
    value: function onMenuBtnClick(mode, svg) {
      var cursor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'crosshair';
      return function () {
        if (this._mode !== mode) {
          //if there is a previous selection, cancel it
          if (this._selectedSvg) {
            this._selectedSvg.innerHTML = this._selectedSvg._svg;

            this._selectedSvg.cancelFn();
          } //selection or switch mode


          this._mode = mode;
          svg.innerHTML = svg._cancel;
          this._selectedSvg = svg;
          this._board.elem.style.cursor = cursor;
          svg.execFn();
        } else {
          //cancellation
          this.resetMenuBtns();
          svg.cancelFn();
        }
      };
    }
  }, {
    key: "onSelection",
    value: function onSelection(items) {
      this._selected = items; //configure menu related to selection

      this.menuCalibration();
    }
  }, {
    key: "save",
    value: function save() {
      return this._config;
    }
  }, {
    key: "parseNodes",
    value: function parseNodes(doc, configs, editable) {
      return configs.map(function (config) {
        return new displays_node__WEBPACK_IMPORTED_MODULE_2__["default"](doc, config.node, _objectSpread({
          editable: editable
        }, config));
      });
    }
  }, {
    key: "parseLinks",
    value: function parseLinks(doc, configs, nodes, editable) {
      return configs.map(function (config) {
        var src = config.src,
            target = config.target,
            output_index = config.output_index,
            input_index = config.input_index;
        return new displays_link__WEBPACK_IMPORTED_MODULE_3__["default"](doc, nodes[src], output_index, nodes[target], input_index, {
          editable: editable
        });
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(evt, callback) {
      this.on(evt, callback);
    }
  }, {
    key: "drawEditMenu",
    value: function drawEditMenu(doc, parent, config) {
      var _this6 = this;

      var width = config.width,
          height = config.height,
          editable = config.editable,
          zoomable = config.zoomable,
          colorize = config.colorize,
          exportable = config.exportable,
          executable = config.executable;
      var svg, tooltip;
      var div = doc.createElement('div');
      div.setAttribute('style', "height:28px;width:".concat(width - 1, "px;background-color:white;border:#dadce0 solid 1px;padding:6px 0;;display:table;position:absolute;border-collapse:separate;border-spacing:6px 0px;z-index:1000;"));

      var onExecCompleteFn = function onExecCompleteFn() {
        _this6.resetMenuBtns();
      }; //LINK BUTTON


      if (editable) {
        //NODE BUTTON
        var nodeBtn = this.createMenuBtnElement({
          doc: doc,
          svg: NODE_SVG,
          cancelSvg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["CancelInRed"],
          tooltip: 'New node',
          execFn: function execFn() {
            _this6._board.enterNodeMode(onExecCompleteFn);
          },
          cancelFn: function cancelFn() {
            _this6._board.exitNodeMode();
          }
        });
        nodeBtn.onclick = this.onMenuBtnClick(constants_editmode__WEBPACK_IMPORTED_MODULE_8__["EditMode"].Node, nodeBtn).bind(this);
        this._buttons.node = nodeBtn;
        div.appendChild(nodeBtn);
        var linkBtn = this.createMenuBtnElement({
          doc: doc,
          svg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["ArrowForward"],
          cancelSvg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["CancelInRed"],
          tooltip: 'New link',
          execFn: function execFn() {
            _this6._board.enterLinkMode(onExecCompleteFn);
          },
          cancelFn: function cancelFn() {
            _this6._board.exitLinkMode();
          }
        });
        linkBtn.onclick = this.onMenuBtnClick(constants_editmode__WEBPACK_IMPORTED_MODULE_8__["EditMode"].Link, linkBtn).bind(this);
        this._buttons.links = linkBtn;
        div.appendChild(linkBtn); //Breakline

        svg = this.createHrElement(doc);
        div.appendChild(svg); //UNDO

        var undoBtn = this.createMenuBtnElement({
          doc: doc,
          svg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["Undo"],
          tooltip: 'Undo',
          onClick: function onClick() {},
          enable: false
        });
        this._buttons.undo = undoBtn;
        div.appendChild(undoBtn); //REDO

        var redoBtn = this.createMenuBtnElement({
          doc: doc,
          svg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["Redo"],
          tooltip: 'Redo',
          onClick: function onClick() {},
          enable: false
        });
        this._buttons.redo = redoBtn;
        div.appendChild(redoBtn); //Breakline

        svg = this.createHrElement(doc);
        div.appendChild(svg); //UNSELECT BUTTON

        var unselectBtn = this.createMenuBtnElement({
          doc: doc,
          svg: UNSELECT_SVG,
          cancelSvg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["CancelInRed"],
          tooltip: 'Unselect',
          enable: false,
          onClick: function onClick() {
            _this6._selected.forEach(function (_) {
              return _.unselect();
            });

            _this6._selected = [];

            _this6.menuCalibration();
          }
        });
        this._buttons.unselect = unselectBtn;
        div.appendChild(unselectBtn); //DELETE

        var deleteBtn = this.createMenuBtnElement({
          doc: doc,
          svg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["Delete"],
          cancelSvg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["CancelInRed"],
          tooltip: 'Delete',
          enable: false,
          onClick: function onClick() {
            //if (svg._enable) {
            _this6._selected.forEach(function (_) {
              return _this6._board["delete"](_);
            });

            _this6._selected = [];

            _this6.menuCalibration(); //}

          }
        });
        this._buttons["delete"] = deleteBtn;
        div.appendChild(deleteBtn); //Breakline

        div.appendChild(this.createHrElement(doc));
      } //ZOOM IN


      if (zoomable) {
        var zoomInBtn = this.createMenuBtnElement({
          doc: doc,
          svg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["ZoomIn"],
          cancelSvg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["CancelInRed"],
          tooltip: 'Zoom In',
          execFn: function execFn() {
            _this6._board.enterZoomMode(constants_zoommode__WEBPACK_IMPORTED_MODULE_9__["ZoomMode"].ZoomIn);
          },
          cancelFn: function cancelFn() {
            _this6._board.exitZoomMode();
          }
        });
        zoomInBtn.onclick = this.onMenuBtnClick(constants_editmode__WEBPACK_IMPORTED_MODULE_8__["EditMode"].ZoomIn, zoomInBtn).bind(this);
        this._buttons.zoomIn = zoomInBtn;
        div.appendChild(zoomInBtn); //ZOOM OUT

        var zoomOutBtn = this.createMenuBtnElement({
          doc: doc,
          svg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["ZoomOut"],
          cancelSvg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["CancelInRed"],
          tooltip: 'Zoom In',
          execFn: function execFn() {
            _this6._board.enterZoomMode(constants_zoommode__WEBPACK_IMPORTED_MODULE_9__["ZoomMode"].ZoomOut);
          },
          cancelFn: function cancelFn() {
            _this6._board.exitZoomMode();
          }
        });
        zoomOutBtn.onclick = this.onMenuBtnClick(constants_editmode__WEBPACK_IMPORTED_MODULE_8__["EditMode"].ZoomOut, zoomOutBtn).bind(this);
        this._buttons.zoomOut = zoomOutBtn;
        div.appendChild(zoomOutBtn);
        var zoomLvl = this.createZoomLevelElement(doc, this._board);
        div.appendChild(zoomLvl); //Breakline

        div.appendChild(this.createHrElement(doc));
      }

      if (colorize) {
        //FILL BUTTON
        var fillBtn = this.createMenuBtnElement({
          doc: doc,
          svg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["FormatColorFill"],
          tooltip: 'Fill Color',
          onClick: function onClick() {}
        });
        this._buttons.fill = fillBtn;
        div.appendChild(fillBtn);
        this.disableMenuBtn(fillBtn); //color palette

        var cp1 = new displays_colorpalette__WEBPACK_IMPORTED_MODULE_4__["default"](doc);
        cp1.appendToDom(fillBtn);

        this._palettes.push(cp1);

        fillBtn.onclick = function (svg, cp) {
          return function () {
            if (svg._enable) {
              _this6._palettes.filter(function (_) {
                return _ !== cp;
              }).forEach(function (_) {
                return _.hide();
              });

              if (cp.toggle()) {
                cp.once('palette-select', function (color) {//this._selected.setFillColor(color);
                });
              }
            }
          };
        }(fillBtn, cp1); //FONTCOLOR BUTTON


        var textColorBtn = this.createMenuBtnElement({
          doc: doc,
          svg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["FormatColorText"],
          tooltip: 'Text Color',
          enable: false,
          onClick: function onClick() {}
        });
        this._buttons.fontfill = textColorBtn; //color palette

        var cp2 = new displays_colorpalette__WEBPACK_IMPORTED_MODULE_4__["default"](doc);
        cp2.appendToDom(textColorBtn);

        this._palettes.push(cp2);

        textColorBtn.onclick = function (svg, cp) {
          return function () {
            if (svg._enable) {
              _this6._palettes.filter(function (_) {
                return _ !== cp;
              }).forEach(function (_) {
                return _.hide();
              });

              if (cp.toggle()) {
                cp.once('palette-select', function (color) {//this._selected.setFontColor(color);
                });
              }
            }
          };
        }(textColorBtn, cp2);

        div.appendChild(textColorBtn); //Breakline

        div.appendChild(this.createHrElement(doc));
      } //EXPORT BUTTON


      if (exportable) {
        var exportBtn = this.createMenuBtnElement({
          doc: doc,
          svg: EXPORT_SVG,
          cancelSvg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["CancelInRed"],
          tooltip: 'Export',
          onClick: function onClick() {
            _this6.trigger('export', _this6._board.exportState());
          }
        });
        this._buttons["export"] = exportBtn;
        div.appendChild(exportBtn); //Breakline

        div.appendChild(this.createHrElement(doc));
      } //EXPORT BUTTON


      if (executable) {
        var playBtn = this.createMenuBtnElement({
          doc: doc,
          svg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["Play"],
          cancelSvg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["Pause"],
          tooltip: 'Play',
          onClick: function onClick() {}
        });
        this._buttons.play = playBtn;
        div.appendChild(playBtn);
        var stopBtn = this.createMenuBtnElement({
          doc: doc,
          svg: displays_svg__WEBPACK_IMPORTED_MODULE_5__["Stop"],
          tooltip: 'Stop',
          onClick: function onClick() {}
        });
        this._buttons.stop = stopBtn;
        div.appendChild(stopBtn);
      }

      svg = this.createMenuElement(doc, '', '');
      svg.setAttribute('class', '');
      div.appendChild(svg);
      parent.appendChild(div);
    }
  }, {
    key: "resetMenuBtns",
    value: function resetMenuBtns() {
      //reset mode
      this._mode = constants_editmode__WEBPACK_IMPORTED_MODULE_8__["EditMode"].None; //revert all buttons back to original svg state

      var buttons = this._buttons;
      Object.keys(buttons).forEach(function (key) {
        buttons[key].innerHTML = buttons[key]._svg;
      }); //reset cursor state

      this._board.elem.style.cursor = 'default'; //clear selected svg

      this._selectedSvg = undefined;
    }
  }]);

  return Clay;
}(displays_base__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Clay);

/***/ }),

/***/ "./src/composite/selectable.js":
/*!*************************************!*\
  !*** ./src/composite/selectable.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SelectableHOC = function SelectableHOC(BaseClass) {
  return /*#__PURE__*/function (_BaseClass) {
    _inherits(_class, _BaseClass);

    var _super = _createSuper(_class);

    function _class() {
      var _this;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(params));

      _this.clickFn = function (evt) {
        _this.trigger('click', _assertThisInitialized(_this));
      };

      return _this;
    }

    _createClass(_class, [{
      key: "selectable",
      value: function selectable() {
        //TODO: rethink how decouple `this._sel`
        this._sel.addEventListener('click', this.clickFn);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        //TODO: rethink how decouple `this._sel`
        this._sel.removeEventListener('click', this.clickFn);
      }
    }, {
      key: "unselect",
      value: function unselect() {
        this._selected = false;
      }
    }, {
      key: "select",
      value: function select() {
        this._selected = true;
      }
    }, {
      key: "selected",
      get: function get() {
        return this._selected;
      }
    }]);

    return _class;
  }(BaseClass);
};

/* harmony default export */ __webpack_exports__["default"] = (SelectableHOC);

/***/ }),

/***/ "./src/constants/config.js":
/*!*********************************!*\
  !*** ./src/constants/config.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
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
  HIGHLIGHT_BG_COLOR: 'rgba(33,150,243,.15)'
});

/***/ }),

/***/ "./src/constants/editmode.js":
/*!***********************************!*\
  !*** ./src/constants/editmode.js ***!
  \***********************************/
/*! exports provided: EditMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMode", function() { return EditMode; });
var EditMode = {
  None: 0,
  Link: 1,
  Linking: 2,
  Node: 3,
  ZoomIn: 4,
  ZoomOut: 5,
  Pan: 6
};

/***/ }),

/***/ "./src/constants/keycode.js":
/*!**********************************!*\
  !*** ./src/constants/keycode.js ***!
  \**********************************/
/*! exports provided: KeyCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCode", function() { return KeyCode; });
var KeyCode = {
  SpaceBar: 32,
  Delete: 46
};

/***/ }),

/***/ "./src/constants/zoommode.js":
/*!***********************************!*\
  !*** ./src/constants/zoommode.js ***!
  \***********************************/
/*! exports provided: ZoomMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomMode", function() { return ZoomMode; });
var ZoomMode = {
  ZoomIn: 0,
  ZoomOut: 1
};

/***/ }),

/***/ "./src/displays/base.js":
/*!******************************!*\
  !*** ./src/displays/base.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var displays_evented__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! displays/evented */ "./src/displays/evented.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Base = /*#__PURE__*/function (_Evented) {
  _inherits(Base, _Evented);

  var _super = _createSuper(Base);

  function Base() {
    _classCallCheck(this, Base);

    return _super.apply(this, arguments);
  }

  _createClass(Base, [{
    key: "appendChild",
    value: function appendChild(node) {
      this.elem.appendChild(node.elem);
      node._parent = this.elem;
    }
  }, {
    key: "appendToDom",
    value: function appendToDom(elem) {
      elem.appendChild(this.elem);
    }
  }, {
    key: "createDomElement",
    value: function createDomElement(doc, type, text) {
      var cancel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var func = ['svg', 'g', 'text', 'rect', 'foreignobject'].indexOf(type.toLowerCase()) >= 0 ? this.createSvgElement : this.createNonSvgElement;
      var elem = func.call(this, doc, type);
      elem.innerHTML = text;
      elem._svg = text;
      elem._cancel = cancel;
      return elem;
    }
  }, {
    key: "createNonSvgElement",
    value: function createNonSvgElement(doc, type) {
      return doc.createElement(type);
    }
  }, {
    key: "createSvgElement",
    value: function createSvgElement(doc, type) {
      return doc.createElementNS("http://www.w3.org/2000/svg", type);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.elem.remove();
    }
  }, {
    key: "elem",
    get: function get() {
      return this._sel;
    },
    set: function set(elem) {
      this._sel = elem;
      elem.node = this;
    }
  }]);

  return Base;
}(displays_evented__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Base);

/***/ }),

/***/ "./src/displays/board.js":
/*!*******************************!*\
  !*** ./src/displays/board.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var displays_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! displays/node */ "./src/displays/node.js");
/* harmony import */ var displays_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! displays/link */ "./src/displays/link.js");
/* harmony import */ var displays_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! displays/base */ "./src/displays/base.js");
/* harmony import */ var displays_mouse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! displays/mouse */ "./src/displays/mouse.js");
/* harmony import */ var constants_editmode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! constants/editmode */ "./src/constants/editmode.js");
/* harmony import */ var constants_zoommode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! constants/zoommode */ "./src/constants/zoommode.js");
/* harmony import */ var constants_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! constants/config */ "./src/constants/config.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var LINK_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].LINK_COLOR,
    LINK_SELECTED_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].LINK_SELECTED_COLOR,
    NODE_CONNECTOR_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].NODE_CONNECTOR_COLOR,
    NODE_CONNECTOR_SELECTED_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].NODE_CONNECTOR_SELECTED_COLOR,
    NODE_CONNECTOR_BORDER_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].NODE_CONNECTOR_BORDER_COLOR,
    NODE_CONNECTOR_HOVER_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_6__["default"].NODE_CONNECTOR_HOVER_COLOR;
var XMLNS = "http://www.w3.org/2000/svg";

var getCoordsFromEvent = function getCoordsFromEvent(ev, svg) {
  if (ev.changedTouches) {
    ev = ev.changedTouches[0];
  } else if (ev.targetTouches) {
    ev = ev.targetTouches[0];
  }

  var point = svg.createSVGPoint();
  point.x = ev.clientX;
  point.y = ev.clientY;
  var invertedSVGMatrix = svg.getScreenCTM().inverse();
  return point.matrixTransform(invertedSVGMatrix);
};

var Board = /*#__PURE__*/function (_Base) {
  _inherits(Board, _Base);

  var _super = _createSuper(Board);

  function Board(doc, dom, width, height, zoom, editable) {
    var _this;

    _classCallCheck(this, Board);

    _this = _super.call(this);
    _this._width = width;
    _this._height = height;
    _this._zoom = zoom;
    _this._editable = editable;
    _this._nodes = [];
    _this._links = [];
    _this._selected = [];
    _this._showGrid = false;
    _this._type = 'svg';
    _this._doc = doc;
    _this._parent = dom;
    _this._buttons = {};
    _this._scale = 1;
    _this._transformMatrix = [1, 0, 0, 1, 0, 0]; //background

    dom.setAttribute('style', 'overflow:hidden;position:absolute;background-image:url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")');
    var sel = _this._sel = doc.createElementNS(XMLNS, 'svg');

    _this._refreshTransformMatrix();

    sel.setAttribute('viewBox', "0 0 ".concat(width, " ").concat(height));
    sel.setAttribute('width', width);
    sel.setAttribute('height', height);
    sel.innerText = "Your browser does not support inline svg";
    var defs = doc.createElementNS(XMLNS, 'defs');
    defs.innerHTML = "\n      <marker id='head' orient=\"auto\" markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill=\"".concat(LINK_COLOR, "\"/></marker><marker id='head-selected' orient=\"auto\" markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill=\"").concat(LINK_COLOR, "\"/></marker>\n      <marker id='head-selected' orient=\"auto\" markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill=\"").concat(LINK_SELECTED_COLOR, "\"/></marker><marker id='head-selected' orient=\"auto\" markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill=\"").concat(LINK_COLOR, "\"/></marker>\n    ");
    sel.appendChild(defs); //draw highlights

    _this._highlight = doc.createElementNS(XMLNS, 'rect');

    _this._highlight.setAttribute('id', 'highlight');

    _this._highlight.setAttribute('width', 0);

    _this._highlight.setAttribute('height', 0);

    sel.appendChild(_this._highlight); //background color

    var bg = doc.createElementNS(XMLNS, 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('style', "fill:rgba(0,0,0,0);");
    sel.appendChild(bg);
    dom.appendChild(sel);

    _this.initialize(editable);

    return _this;
  }

  _createClass(Board, [{
    key: "_pan",
    value: function _pan(matrix, dx, dy) {
      matrix[4] = dx;
      matrix[5] = dy;
      return matrix;
    } //#region Private Functions

  }, {
    key: "_refreshTransformMatrix",
    value: function _refreshTransformMatrix(newOrigin) {
      this._sel.setAttribute('transform', "matrix(".concat(this._transformMatrix.join(' '), ")"));

      if (newOrigin) {
        this._sel.setAttribute('style', "".concat(this._sel.getAttribute('style'), ";transform-origin:").concat(newOrigin.x, "px ").concat(newOrigin.y, "px"));
      }
    }
  }, {
    key: "_zoomToScale",
    value: function _zoomToScale(matrix, scale, coord) {
      matrix[0] = scale;
      matrix[3] = scale;
      matrix[4] = (1 - scale) * coord.x;
      matrix[5] = (1 - scale) * coord.y;
      return matrix;
    } //#endregion

  }, {
    key: "exportState",
    value: function exportState() {
      return {
        "editable": this._editable,
        "nodes": this._nodes.map(function (node) {
          return node.exportAsJson();
        }),
        "links": this._links.map(function (link) {
          return link.exportAsJson();
        })
      };
    }
  }, {
    key: "clearHighlight",
    value: function clearHighlight() {
      //clear highlight
      this._highlight.setAttribute('width', 0);

      this._highlight.setAttribute('height', 0);
    }
  }, {
    key: "initialize",
    value: function initialize(editable) {
      var _this2 = this;

      editable && this.edit();
      var highlighting = false; //board drag

      this.elem.addEventListener('mousedown', function (evt) {
        if (event.which === 1) {
          //left click
          _this2._origin = getCoordsFromEvent(evt, _this2.elem);

          _this2.elem.appendChild(_this2._highlight);
        }
      });
      this.elem.addEventListener('mousemove', function (evt) {
        if (event.which == 1) {
          var point = getCoordsFromEvent(evt, _this2.elem);

          if (_this2._mode == constants_editmode__WEBPACK_IMPORTED_MODULE_4__["EditMode"].Pan) {
            var viewBox = _this2.elem.viewBox.baseVal;
            viewBox.x -= point.x - _this2._origin.x;
            viewBox.y -= point.y - _this2._origin.y;
          } else if (_this2._origin && _this2._nodes.every(function (_) {
            return !_.isDragging();
          })) {
            highlighting = true;
            var left = _this2._origin.x < point.x ? _this2._origin.x : point.x;
            var right = _this2._origin.x > point.x ? _this2._origin.x : point.x;
            var top = _this2._origin.y < point.y ? _this2._origin.y : point.y;
            var bottom = _this2._origin.y > point.y ? _this2._origin.y : point.y;

            _this2._highlight.setAttribute('x', left);

            _this2._highlight.setAttribute('y', top);

            _this2._highlight.setAttribute('width', Math.abs(right - left));

            _this2._highlight.setAttribute('height', Math.abs(bottom - top));
          } else {
            _this2.clearHighlight();
          }
        }
      });
      this.elem.addEventListener('mouseup', function (evt) {
        if (highlighting) {
          //use highlight to select items
          var svgRect = _this2.elem.createSVGRect();

          svgRect.x = _this2._highlight.attributes.x.value;
          svgRect.y = _this2._highlight.attributes.y.value;
          svgRect.width = _this2._highlight.attributes.width.value;
          svgRect.height = _this2._highlight.attributes.height.value;

          _this2.unselectItems();

          _this2.elem.getIntersectionList(svgRect, null).forEach(function (_) {
            var node = _.node || _.parentNode.node;

            if (node) {
              node.select();

              _this2._selected.push(node);

              _this2.trigger('onselect', _this2._selected);
            }
          });

          _this2.clearHighlight();
        }

        highlighting = false;
      });
    }
  }, {
    key: "unselectItems",
    value: function unselectItems() {
      this._selected.forEach(function (_) {
        return _.unselect();
      });

      this._selected = [];
    }
  }, {
    key: "edit",
    value: function edit() {
      this._editable = true;
      this._mode = constants_editmode__WEBPACK_IMPORTED_MODULE_4__["EditMode"].None;
    }
  }, {
    key: "addNode",
    value: function addNode(node) {
      node.selectable();
      this.addToBoardItems(this._nodes, node);
    }
  }, {
    key: "addLink",
    value: function addLink(link) {
      this._links.push(link);

      this.appendChild(link);
    }
  }, {
    key: "addToBoardItems",
    value: function addToBoardItems(arr, item) {
      item.setIndex(arr.length);
      this.appendChild(item);
      arr.push(item);
      this.subscribeToSelection(item);
    }
  }, {
    key: "setMode",
    value: function setMode(mode) {
      this._mode = mode;
    }
  }, {
    key: "setNodes",
    value: function setNodes(nodes) {
      var _this3 = this;

      nodes.forEach(function (node) {
        return _this3.addNode(node);
      });
    }
  }, {
    key: "setLinks",
    value: function setLinks(links) {
      var _this4 = this;

      this._links = links;
      links.forEach(function (link) {
        return _this4.addLink(link);
      });
    }
  }, {
    key: "subscribeToSelection",
    value: function subscribeToSelection(item) {
      var _this5 = this;

      item.on('clickonly', function (e) {
        //this.unselectItems();
        if (item.selected) {
          item.unselect();

          _this5._selected.splice(_this5._selected.indexOf(item), 1);

          _this5.trigger('ondeselect', _this5._selected);
        } else {
          item.select();

          _this5._selected.push(item);

          _this5.trigger('onselect', _this5._selected);
        }
      });
    }
  }, {
    key: "enterSelectionMode",
    value: function enterSelectionMode() {
      var _this6 = this;

      var onComplete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      this._sel.onclick = function (evt) {
        var point = getCoordsFromEvent(evt, _this6._sel); //exit

        _this6.exitSelectionMode();

        onComplete(point);
      };
    }
  }, {
    key: "enterNodeMode",
    value: function enterNodeMode() {
      var _this7 = this;

      var onComplete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.enterSelectionMode(function (point) {
        var config = {
          x: point.x - _this7._transformMatrix[4],
          y: point.y - _this7._transformMatrix[5],
          title: 'New Title',
          editable: _this7._editable
        };
        var node = new displays_node__WEBPACK_IMPORTED_MODULE_0__["default"](_this7._doc, null, config);

        _this7.addNode(node);

        onComplete();
      });
    }
  }, {
    key: "exitSelectionMode",
    value: function exitSelectionMode() {
      var onComplete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      //stop onclick events
      this._sel.onclick = undefined;
    }
  }, {
    key: "enterLinkMode",
    value: function enterLinkMode() {
      var _this8 = this;

      var onComplete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var scope = this;

      var onLinkConstructed = function onLinkConstructed(node, ioIndex) {
        if (_this8._link) {
          scope._mode = constants_editmode__WEBPACK_IMPORTED_MODULE_4__["EditMode"].None; //complete linking target

          _this8._link.setTarget(node, ioIndex);

          _this8._link.setDotted(false);

          _this8._link.selectable(); //clean up


          onComplete();

          _this8._nodes.forEach(function (node) {
            node.startListening();
            node.removeLinkables();
            node.resetColor();
          });

          _this8._link = undefined;
        } else {
          var link = _this8._link = new displays_link__WEBPACK_IMPORTED_MODULE_1__["default"](_this8._doc, node, ioIndex, new displays_mouse__WEBPACK_IMPORTED_MODULE_3__["default"](_this8.elem.getBoundingClientRect()), -1, {
            dotted: true,
            editable: _this8._editable
          });

          _this8.addLink(link);

          node.addLink(link);

          _this8._nodes.forEach(function (node) {
            node.removeLinkables();
            node.drawInputLinkables(onLinkConstructed);
            node.setInputColor();
          });
        }
      };

      this._nodes.forEach(function (node) {
        node.stopListening();
        node.drawOutputLinkables(onLinkConstructed);
      });
    }
  }, {
    key: "exitLinkMode",
    value: function exitLinkMode() {
      this._nodes.forEach(function (node) {
        node.removeLinkables();
        node.resetColor();
      });

      this._links.splice(this._links.indexOf(this._link), 1);

      this._link.remove();

      this._link = undefined;
    }
  }, {
    key: "enterZoomMode",
    value: function enterZoomMode(type) {
      var _this9 = this;

      this._sel.onclick = function (evt) {
        var scale = _this9._scale + (type === constants_zoommode__WEBPACK_IMPORTED_MODULE_5__["ZoomMode"].ZoomIn ? 1 : -1) * 0.25;
        var point = getCoordsFromEvent(evt, _this9._sel);

        _this9.zoom(scale, point);
      };
    }
  }, {
    key: "exitZoomMode",
    value: function exitZoomMode() {
      this._sel.onclick = undefined;
    }
  }, {
    key: "zoom",
    value: function zoom(scale, point) {
      this._scale = scale;

      var bbox = this._sel.getBoundingClientRect();

      var scalePoint = point ? point : {
        x: bbox.width / 2,
        y: bbox.height / 2
      };
      this._transformMatrix = this._zoomToScale(this._transformMatrix, scale, scalePoint);

      this._refreshTransformMatrix({
        x: scalePoint.x / scale,
        y: scalePoint.y / scale
      });
    }
  }, {
    key: "buildLinkablesByNodes",
    value: function buildLinkablesByNodes(doc, nodes, onComplete) {
      var _this10 = this;

      var linkables = nodes.map(function (node) {
        var coordsList = node.getFaceCoords();
        var linkables = coordsList.map(function (coords) {
          return _this10.generateLinkable(doc, coords, node, onComplete);
        });
        node._linkables = linkables;
        node.on('drag', function (x, y) {
          //when node is dragged, move all linkables together with it
          linkables.forEach(function (linkable) {
            var WIDTH = 10;
            var side = linkable.getAttribute('side');
            var coords = node.getFaceCoord(side);
            linkable.style.left = "".concat(coords.x - WIDTH / 2, "px");
            linkable.style.top = "".concat(coords.y - WIDTH / 2, "px");
          });
        });
        return linkables;
      });
      return [].concat.apply([], linkables);
    }
  }, {
    key: "generateLinkable",
    value: function generateLinkable(doc, coords, node, onComplete) {
      var _this11 = this;

      var WIDTH = 10;
      var div = this.createDomElement(doc, 'div', '');
      div.selected = false;
      div.setAttribute('side', coords.side);
      div.setAttribute('style', "position:absolute;left:".concat(coords.x - WIDTH / 2, "px;top:").concat(coords.y - WIDTH / 2, "px;width:").concat(WIDTH, "px;height:").concat(WIDTH, "px;background-color: ").concat(NODE_CONNECTOR_COLOR, ";border: 1px solid ").concat(NODE_CONNECTOR_BORDER_COLOR, ";border-radius:10px;"));
      div._node = node;

      div.onmouseover = function () {
        if (!div.selected) {
          div.style.backgroundColor = NODE_CONNECTOR_HOVER_COLOR;
        }
      };

      div.onmouseout = function () {
        if (!div.selected) {
          div.style.backgroundColor = NODE_CONNECTOR_COLOR;
        }
      };

      div.onclick = function () {
        var node = div._node;

        if (_this11._linked) {
          _this11._mode = constants_editmode__WEBPACK_IMPORTED_MODULE_4__["EditMode"].None; //complete linking target

          _this11._linked._link.setTarget(node, div.getAttribute('index'));

          _this11._linked._link.setDotted(false);

          _this11._linked._link.selectable();

          _this11._linked._link = undefined;
          _this11._linked.selected = false;
          _this11._linked.style.backgroundColor = NODE_CONNECTOR_COLOR;
          _this11._linked = undefined; //exit

          _this11.exitLinkMode();

          onComplete();
        } else {
          //linking src
          _this11._linked = div;
          div.selected = true;
          div.style.backgroundColor = NODE_CONNECTOR_SELECTED_COLOR; //hide linkables from same nodes

          node._linkables.forEach(function (linkable) {
            if (linkable != div) linkable.style.display = "none";
          }); //draw link from clicked to mouse


          var index = div.getAttribute('index');
          var link = new displays_link__WEBPACK_IMPORTED_MODULE_1__["default"](_this11._doc, node, index, new displays_mouse__WEBPACK_IMPORTED_MODULE_3__["default"](_this11.elem.offsetLeft, _this11.elem.offsetTop), -1, {
            dotted: true,
            editable: _this11._editable
          });
          div._link = link; //add to links

          _this11.addLink(link);
        }
      };

      return div;
    }
  }, {
    key: "delete",
    value: function _delete(item) {
      //if node, delete links related to it
      this._nodes.splice(this._nodes.indexOf(item), 1); // if link


      this._links.splice(this._links.indexOf(item), 1);

      item.destroy();
    }
  }, {
    key: "oppositeSide",
    value: function oppositeSide(side) {
      return {
        'l': 'r',
        'r': 'l',
        'u': 'd',
        'd': 'u'
      }[side];
    } //#region Getter / Setter

  }, {
    key: "scale",
    get: function get() {
      return this._scale;
    } //#endregion

  }]);

  return Board;
}(displays_base__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Board);

/***/ }),

/***/ "./src/displays/colorpalette.js":
/*!**************************************!*\
  !*** ./src/displays/colorpalette.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var displays_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! displays/base */ "./src/displays/base.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var ColorPalette = /*#__PURE__*/function (_Base) {
  _inherits(ColorPalette, _Base);

  var _super = _createSuper(ColorPalette);

  function ColorPalette(doc) {
    var _this;

    _classCallCheck(this, ColorPalette);

    _this = _super.call(this);
    _this._doc = doc;
    _this._hidden = true;

    _this.initialize();

    return _this;
  }

  _createClass(ColorPalette, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      var _doc = this._doc,
          _hidden = this._hidden;

      var sel = this._sel = _doc.createElement('div');

      sel.setAttribute('style', "position:absolute;background-color:white;box-shadow:rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;padding:5px;width:162px;\n      ".concat(_hidden ? 'visibility:hidden' : 'visibility:visible', "\n    "));
      var rgb = [['#4d4d4d', '#999999', '#fff', '#f44e3b', '#fe9200', '#fcdc00', '#dbdf00', '#a4dd00', '#68ccca', '#73d8ff', '#aea1ff', '#fda1ff'], ['#333', '#808080', '#ccc', '#d33115', '#e27300', '#fcc400', '#b0bc00', '#68bc00', '#16a5a5', '#68ccca', '#009ce0', '#7b64ff'], ['#000', '#666', '#b3b3b3', '#9f0500', '#c45100', '#fb9e00', '#808900', '#194d33', '#0c797d', '#0062b1', '#653294', '#ab149e']];

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 9; j++) {
          var border = '';
          var color = rgb[i][j];
          var size = '15px';
          var hex = parseInt(11 * j, 16);

          var node = _doc.createElement('div');

          node.setAttribute('class', 'btn palette');

          if (color === '#fff') {
            node.setAttribute('style', "\n            width: 13px;\n            height: 13px;\n            border: solid 1px #ccc;\n            background-color: ".concat(color, ";\n          "));
          } else {
            node.setAttribute('style', "\n            background-color: ".concat(color, ";\n          "));
          }

          node.onclick = function (color) {
            return function (evt) {
              // Prevent browser drag behavior as soon as possible
              evt.preventDefault(); // Prevent propagation to a parent that might also have dragging enabled

              evt.stopPropagation();

              _this2.trigger('palette-select', color);

              _this2.hide();
            };
          }(color);

          sel.appendChild(node);
        }
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this._hidden ? this.show() : this.hide();
      return !this._hidden;
    }
  }, {
    key: "hide",
    value: function hide() {
      this._hidden = true;
      this._sel.style.visibility = 'hidden';
    }
  }, {
    key: "show",
    value: function show() {
      this._hidden = false;
      this._sel.style.visibility = 'visible';
    }
  }]);

  return ColorPalette;
}(displays_base__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ColorPalette);

/***/ }),

/***/ "./src/displays/draggable.js":
/*!***********************************!*\
  !*** ./src/displays/draggable.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var displays_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! displays/base */ "./src/displays/base.js");
/* harmony import */ var composite_selectable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! composite/selectable */ "./src/composite/selectable.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var getCoordsFromEvent = function getCoordsFromEvent(ev) {
  if (ev.changedTouches) {
    ev = ev.changedTouches[0];
  }

  return {
    x: ev.clientX,
    y: ev.clientY
  };
};

var Draggable = /*#__PURE__*/function (_Base) {
  _inherits(Draggable, _Base);

  var _super = _createSuper(Draggable);

  function Draggable() {
    var _this;

    _classCallCheck(this, Draggable);

    _this = _super.call(this);
    _this._enabled = false;
    _this._dragged = false;
    return _this;
  }

  _createClass(Draggable, [{
    key: "draggable",
    value: function draggable(el) {
      this._enabled = true;
      this.startDragFn = this.startDrag.bind(this);
      this.dragFn = this.drag.bind(this);
      this.endDragFn = this.endDrag.bind(this);
      this.init(this.enabled, el);
    }
  }, {
    key: "init",
    value: function init(enabled, el) {
      el.addEventListener('mousedown', this.startDragFn);
      el.addEventListener('touchstart', this.startDragFn, {
        passive: false
      });
    }
  }, {
    key: "startListening",
    value: function startListening() {
      this._sel.addEventListener('mousedown', this.startDragFn);

      this._sel.addEventListener('touchstart', this.startDragFn, {
        passive: false
      });
    }
  }, {
    key: "stopListening",
    value: function stopListening() {
      //remove click event listener
      //remove drag event listener
      this._sel.removeEventListener('mousedown', this.startDragFn);

      this._sel.removeEventListener('touchstart', this.startDragFn, {
        passive: false
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stopListening();
    }
  }, {
    key: "startDrag",
    value: function startDrag(evt) {
      // Prevent browser drag behavior as soon as possible
      evt.preventDefault(); // Prevent propagation to a parent that might also have dragging enabled

      evt.stopPropagation(); //setup last click

      var clicked = getCoordsFromEvent(evt);

      var rect = this._sel.getBoundingClientRect();

      this.offset = {
        x: clicked.x - rect.x,
        y: clicked.y - rect.y
      }; //register mousemove

      window.addEventListener('mousemove', this.dragFn);
      window.addEventListener('touchmove', this.dragFn, {
        passive: false
      }); //register end drag

      window.addEventListener('mouseup', this.endDragFn);
      window.addEventListener('touchend', this.endDragFn, {
        passive: false
      });
    }
  }, {
    key: "drag",
    value: function drag(evt) {
      this._dragged = true;
      var offset = this.offset;
      var coord = getCoordsFromEvent(evt);
      var x = coord.x - offset.x;
      var y = coord.y - offset.y;
      this.setXY(x, y);
      this.trigger('drag', x, y);
    }
  }, {
    key: "endDrag",
    value: function endDrag(evt) {
      if (!this._dragged) this.trigger('clickonly');
      this._dragged = false;
      window.removeEventListener('mousemove', this.dragFn);
      window.removeEventListener('touchmove', this.dragFn);
      window.removeEventListener('mouseup', this.endDragFn);
      window.removeEventListener('touchend', this.endDragFn);
    }
  }, {
    key: "setXY",
    value: function setXY(x, y) {
      this._x = x;
      this._y = y;
    }
  }, {
    key: "isDragging",
    value: function isDragging() {
      return this._dragged;
    }
  }]);

  return Draggable;
}(displays_base__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(composite_selectable__WEBPACK_IMPORTED_MODULE_1__["default"])(Draggable));

/***/ }),

/***/ "./src/displays/evented.js":
/*!*********************************!*\
  !*** ./src/displays/evented.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Evented = /*#__PURE__*/function () {
  function Evented() {
    _classCallCheck(this, Evented);

    this._events = {};
  }

  _createClass(Evented, [{
    key: "_defaulted",
    value: function _defaulted(name) {
      if (!this._events[name]) {
        this._events[name] = [];
      }
    }
  }, {
    key: "off",
    value: function off(name, callback) {
      this._defaulted(name);

      var arr = this._events[name];

      for (var i = arr.length - 1; i >= 0; i++) {
        if (arr[i] === callback) {
          arr.splice(i, 1);
          break;
        }
      }
    }
  }, {
    key: "on",
    value: function on(name, callback) {
      this._defaulted(name);

      this._events[name].push(callback);
    }
  }, {
    key: "once",
    value: function once(name, callback) {
      var _this = this;

      this._defaulted(name);

      var func = function func() {
        for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        callback.call.apply(callback, [_this].concat(params));

        _this.off(name, func);
      };

      this._events[name].push(func);
    }
  }, {
    key: "trigger",
    value: function trigger(name) {
      var _this2 = this;

      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      if (this._events[name]) {
        this._events[name].forEach(function (_) {
          _.call.apply(_, [_this2].concat(params));
        });
      }
    }
  }]);

  return Evented;
}();

/* harmony default export */ __webpack_exports__["default"] = (Evented);

/***/ }),

/***/ "./src/displays/graphics/svgtable.js":
/*!*******************************************!*\
  !*** ./src/displays/graphics/svgtable.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var displays_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! displays/base */ "./src/displays/base.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var INDEX_WIDTH = 30;
var DELETE_WIDTH = 30;
var TABLE_COL_WIDTH = 60;

var SvgTable = /*#__PURE__*/function (_Base) {
  _inherits(SvgTable, _Base);

  var _super = _createSuper(SvgTable);

  function SvgTable() {
    _classCallCheck(this, SvgTable);

    return _super.apply(this, arguments);
  }

  _createClass(SvgTable, [{
    key: "generate",
    value: function generate(doc) {
      var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var rows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var inner = "<table xmlns=\"http://www.w3.org/2000/svg\" class=\"paper tb\">\n      <thead class=\"tb-hd\"><tr class=\"tb-rw\">".concat([''].concat(_toConsumableArray(header)).map(function (_) {
        return "<th class=\"tb-cell-hd\">".concat(_, "</th>");
      }).join(''), "</tr></thead>\n      <tbody class=\"tb-bd\">").concat(rows.map(function (cols, rowIndex) {
        return Array.isArray(cols) ? "<tr class=\"tb-rw\"><td class=\"tb-cell\">".concat(rowIndex + 1, ".</td>").concat(cols.map(function (_, colIndex) {
          return "<td class=\"tb-cell\">".concat(_, "</td>");
        }).join(''), "</tr>") : "<tr class=\"tb-rw\"><td class=\"tb-cell\">".concat(rowIndex + 1, ".</td><td class=\"tb-cell\">").concat(cols, "</td></tr>");
      }).join(''), "</tbody>\n    </table>");
      var fo = this.createDomElement(doc, 'foreignObject', inner);
      fo.setAttribute('width', 420);
      fo.setAttribute('height', 70 + rows.length * 40);
      return fo;
    }
  }]);

  return SvgTable;
}(displays_base__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (new SvgTable());

/***/ }),

/***/ "./src/displays/link.js":
/*!******************************!*\
  !*** ./src/displays/link.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var displays_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! displays/base */ "./src/displays/base.js");
/* harmony import */ var composite_selectable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! composite/selectable */ "./src/composite/selectable.js");
/* harmony import */ var constants_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! constants/config */ "./src/constants/config.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var NODE_HEIGHT = constants_config__WEBPACK_IMPORTED_MODULE_2__["default"].NODE_HEIGHT,
    LINK_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_2__["default"].LINK_COLOR,
    LINK_SELECTED_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_2__["default"].LINK_SELECTED_COLOR,
    LINK_ARROW_WIDTH = constants_config__WEBPACK_IMPORTED_MODULE_2__["default"].LINK_ARROW_WIDTH,
    NODE_IO_SIZE = constants_config__WEBPACK_IMPORTED_MODULE_2__["default"].NODE_IO_SIZE;

var Link = /*#__PURE__*/function (_SelectableHOC) {
  _inherits(Link, _SelectableHOC);

  var _super = _createSuper(Link);

  function Link(doc, src, output_index, target, input_index, _ref) {
    var _this;

    var _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'regular' : _ref$type,
        _ref$dotted = _ref.dotted,
        dotted = _ref$dotted === void 0 ? false : _ref$dotted,
        _ref$mode = _ref.mode,
        mode = _ref$mode === void 0 ? 'elbow' : _ref$mode,
        _ref$editable = _ref.editable,
        editable = _ref$editable === void 0 ? true : _ref$editable;

    _classCallCheck(this, Link);

    _this = _super.call(this); //configuration

    _this._type = type;
    _this._dotted = dotted;
    _this._mode = mode;
    _this._editable = editable;

    _this.initialize(doc, src, output_index, target, input_index);

    return _this;
  }

  _createClass(Link, [{
    key: "_dragFn",
    value: function _dragFn(x, y) {
      var coord1 = this._src.getOutputCoord(this._output_index);

      var coord2 = this._target.getInputCoord(this._input_index);

      this._sel.setAttribute('d', this.formPath(this._mode, coord1, coord2));
    }
  }, {
    key: "getSrc",
    value: function getSrc() {
      return this._src;
    }
  }, {
    key: "getTarget",
    value: function getTarget() {
      return this._target;
    }
  }, {
    key: "setTarget",
    value: function setTarget(target, input_index) {
      this._target.off('drag', this.dragFn);

      this._target.destroy();

      this._target = target;
      this._input_index = parseInt(input_index) - 1;
      target.on('drag', this.dragFn);
      target.addLink(this);
      this.redrawPath();
    }
  }, {
    key: "setDotted",
    value: function setDotted(dotted) {
      this._dotted = dotted;
      this.redrawPath();
    }
  }, {
    key: "redrawPath",
    value: function redrawPath() {
      var coord1 = this._src.getOutputCoord(this._output_index);

      var coord2 = this._target.getInputCoord(this._input_index);

      var path = this.elem.firstChild;
      path.setAttribute('stroke', this._selected ? LINK_SELECTED_COLOR : LINK_COLOR);
      path.setAttribute('marker-end', this._selected ? "url(#head-selected)" : "url(#head)");
      path.setAttribute('stroke-dasharray', this._dotted && '10,10');
      path.setAttribute('d', this.formPath(this._mode, coord1, coord2));
    }
  }, {
    key: "initialize",
    value: function initialize(doc, src, output_index, target, input_index) {
      this._src = src;
      this._output_index = parseInt(output_index) - 1;
      this._target = target;
      this._input_index = parseInt(input_index) - 1;
      src.addLink(this);
      target.addLink(this);
      var xmlns = "http://www.w3.org/2000/svg";
      var sel = this.elem = this.createSvgElement(doc, 'g');
      var path = doc.createElementNS(xmlns, 'path');
      sel.appendChild(path);
      this.dragFn = this._dragFn.bind(this);
      path.setAttribute('stroke-width', "2");
      path.setAttribute('fill', "none");
      this.redrawPath();
      src.on('drag', this.dragFn);
      target.on('drag', this.dragFn);
    }
  }, {
    key: "select",
    value: function select() {
      _get(_getPrototypeOf(Link.prototype), "select", this).call(this);

      this.redrawPath();
    }
  }, {
    key: "unselect",
    value: function unselect() {
      _get(_getPrototypeOf(Link.prototype), "unselect", this).call(this);

      this.redrawPath();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._src.off('drag', this.dragFn);

      this._target.off('drag', this.dragFn);

      this.remove();
    }
  }, {
    key: "exportAsJson",
    value: function exportAsJson() {
      return {
        type: this._type,
        dotted: this._dotted,
        mode: this._mode,
        editable: this._editable,
        src: this._src.getIndex(),
        target: this._target.getIndex(),
        output_index: this._output_index + 1,
        input_index: this._input_index + 1
      };
    }
  }, {
    key: "formPath",
    value: function formPath(mode, coord1, coord2) {
      var d, midX, midY;

      switch (mode) {
        case 'direct':
          d = "M".concat(coord1.x, ",").concat(coord1.y, " T").concat(coord2.x - LINK_ARROW_WIDTH, ",").concat(coord2.y);
          break;

        case 'curve':
          if (Math.abs(coord2.y - coord1.y) < 0.2 * coord2.y) {
            return "M".concat(coord1.x, ",").concat(coord1.y, " T").concat(coord2.x - LINK_ARROW_WIDTH, ",").concat(coord2.y);
          }

          midX = coord1.x + (coord2.x - coord1.x) / 2;
          midY = coord1.y + (coord2.y - coord1.y) / 2;
          d = "M".concat(coord1.x, ",").concat(coord1.y, " Q").concat(midX, ",").concat(coord1.y, " ").concat(midX, ",").concat(midY, " T").concat(coord2.x - LINK_ARROW_WIDTH, ",").concat(coord2.y);
          break;

        case 'elbow':
        default:
          var neg, alongTheLine, midStr;
          midX = coord1.x + (coord2.x - coord1.x) / 2, midY = coord1.y + (coord2.y - coord1.y) / 2; //direct access

          if (coord2.x >= coord1.x + LINK_ARROW_WIDTH + 3) {
            //right enough
            d = "M".concat(coord1.x, ",").concat(coord1.y, " L").concat(midX, ",").concat(coord1.y, " L").concat(midX, ",").concat(coord2.y, " L").concat(coord2.x - LINK_ARROW_WIDTH, ",").concat(coord2.y);
          } else {
            neg = coord2.y > coord1.y + 2 * (NODE_HEIGHT / 2) + NODE_IO_SIZE || coord2.y < coord1.y - NODE_HEIGHT / 2 ? 1 : -1;
            d = "M".concat(coord1.x, ",").concat(coord1.y, " L").concat(coord1.x + NODE_IO_SIZE, ",").concat(coord1.y, " L").concat(coord1.x + NODE_IO_SIZE, ",").concat(coord1.y + neg * (NODE_HEIGHT / 2 + NODE_IO_SIZE), " L").concat(coord2.x - NODE_IO_SIZE, ",").concat(coord1.y + neg * (NODE_HEIGHT / 2 + NODE_IO_SIZE), " L").concat(coord2.x - NODE_IO_SIZE, ",").concat(coord2.y, " L").concat(coord2.x - LINK_ARROW_WIDTH, ",").concat(coord2.y);
          }

          break;
      }

      return d;
    }
  }]);

  return Link;
}(Object(composite_selectable__WEBPACK_IMPORTED_MODULE_1__["default"])(displays_base__WEBPACK_IMPORTED_MODULE_0__["default"]));

/* harmony default export */ __webpack_exports__["default"] = (Link);

/***/ }),

/***/ "./src/displays/mouse.js":
/*!*******************************!*\
  !*** ./src/displays/mouse.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var displays_draggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! displays/draggable */ "./src/displays/draggable.js");


var Mouse = function Mouse(offset) {
  displays_draggable__WEBPACK_IMPORTED_MODULE_0__["default"].call(this);
  this._events = {};
  this._coords = {
    x: 0,
    y: 0
  };
  this._offset = offset;
  this.moveFn = this._move.bind(this);
  window.addEventListener('mousemove', this.moveFn);
};

Mouse.prototype = Object.create(displays_draggable__WEBPACK_IMPORTED_MODULE_0__["default"].prototype);

Mouse.prototype.destroy = function () {
  window.removeEventListener('mousemove', this.moveFn);
};

Mouse.prototype.addLink = function () {};

Mouse.prototype._move = function (ev) {
  if (ev.changedTouches) {
    ev = ev.changedTouches[0];
  }

  this._coords = {
    x: ev.clientX - this._offset.left,
    y: ev.clientY - this._offset.top,
    side: 'mouse'
  };
  this.trigger('drag', this._coords.x, this._coords.y);
};

Mouse.prototype.getInputCoord = Mouse.prototype.getFaceCoord = function () {
  return this._coords;
};

/* harmony default export */ __webpack_exports__["default"] = (Mouse);

/***/ }),

/***/ "./src/displays/node.js":
/*!******************************!*\
  !*** ./src/displays/node.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var displays_draggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! displays/draggable */ "./src/displays/draggable.js");
/* harmony import */ var displays_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! displays/svg */ "./src/displays/svg.js");
/* harmony import */ var displays_graphics_svgtable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! displays/graphics/svgtable */ "./src/displays/graphics/svgtable.js");
/* harmony import */ var constants_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! constants/config */ "./src/constants/config.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var NODE_WIDTH = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_WIDTH,
    NODE_HEIGHT = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_HEIGHT,
    NODE_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_COLOR,
    NODE_DISABLED_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_DISABLED_COLOR,
    NODE_BORDER_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_BORDER_COLOR,
    NODE_TEXT_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_TEXT_COLOR,
    NODE_SELECTED_BORDER_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_SELECTED_BORDER_COLOR,
    NODE_STROKE_WEIGHT = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_STROKE_WEIGHT,
    NODE_PADDING = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_PADDING,
    NODE_MAX_INPUT = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_MAX_INPUT,
    NODE_MAX_OUTPUT = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_MAX_OUTPUT,
    NODE_IO_SIZE = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_IO_SIZE,
    NODE_IO_SPACING = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_IO_SPACING,
    NODE_CONNECTOR_BORDER_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_CONNECTOR_BORDER_COLOR,
    NODE_IO_HOVER_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_IO_HOVER_COLOR,
    NODE_IO_CONNECTOR_COLOR = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].NODE_IO_CONNECTOR_COLOR,
    BORDER_WIDTH = constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].BORDER_WIDTH;

var Node = /*#__PURE__*/function (_Draggable) {
  _inherits(Node, _Draggable);

  var _super = _createSuper(Node);

  function Node(doc, nodeConfig) {
    var _this;

    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Node);

    _this = _super.call(this);
    var _config$width = config.width,
        width = _config$width === void 0 ? NODE_WIDTH : _config$width,
        _config$height = config.height,
        height = _config$height === void 0 ? NODE_HEIGHT : _config$height,
        editable = config.editable,
        _config$attrs = config.attrs,
        attrs = _config$attrs === void 0 ? [] : _config$attrs;
    _this._doc = doc;
    _this._config = config;
    _this._width = width;
    _this._height = height;
    _this._selected = false;
    _this._editable = editable;
    _this._inputCount = 0;
    _this._outputCount = 1;
    _this._attrs = attrs;
    _this._links = [];
    _this._inputLinks = [];
    _this._outputLinks = [];
    _this._node = nodeConfig;

    _this.validateNodeConfig(nodeConfig);

    _this.parseNodeConfig(nodeConfig);

    _this.initialize(doc, config);

    return _this;
  }

  _createClass(Node, [{
    key: "validateNodeConfig",
    value: function validateNodeConfig(node) {
      var _this2 = this;

      if (!node || _typeof(node) !== 'object') throw Error('Invalid NodeConfig: Invalid NodeConfig type.');
      var type = node.type,
          inputs = node.inputs,
          outputs = node.outputs;
      if (!type && typeof type !== 'string') throw Error('Invalid NodeConfig: Invalid type attribute.');
      if (this.validateIoType(type)) throw Error('Invalid NodeConfig: Invalid NodeConfig type. Can only accept "string", "boolean", "integer", "function"');

      if (type === 'function') {
        if (!inputs || !outputs) {
          throw Error('Invalid NodeConfig: No inputs or outputs in function node.');
        }

        if (!Array.isArray(inputs) || !Array.isArray(outputs)) {
          throw Error('Invalid NodeConfig: invalid inputs/outputs type.');
        }

        var ioNames = ['inputs', 'outputs'];
        [inputs, outputs].forEach(function (io, ioIndex) {
          io.forEach(function (_, index) {
            if (!_ && typeof _ !== 'string') throw Error("Invalid NodeConfig: Invalid ".concat(ioNames[ioIndex], " type on index (").concat(index, "). Only string can be accepted."));
            if (_this2.validateIoType(_)) throw Error("Invalid NodeConfig: Invalid ".concat(ioNames[ioIndex], " type on index (").concat(index, "). Values can only be \"string\", \"boolean\", \"integer\", \"function\""));
          });
        });
      }
    }
  }, {
    key: "validateIoType",
    value: function validateIoType(type) {
      return ['string', 'boolean', 'integer', 'function'].indexOf(type) < 0;
    }
  }, {
    key: "parseNodeConfig",
    value: function parseNodeConfig(node) {
      if (node.type === 'function') {
        this._inputCount = node.inputs.length;
        this._outputCount = node.outputs.length;
        ;
      }
    }
  }, {
    key: "addLink",
    value: function addLink(link) {
      this._links.push(link);
    }
  }, {
    key: "delLink",
    value: function delLink(link) {
      this._links.splice(this._inputLinks.indexOf(link), 1);
    }
  }, {
    key: "setFillColor",
    value: function setFillColor() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NODE_COLOR;

      this._bg.setAttribute('style', "fill:".concat(color, ";stroke-width:").concat(NODE_STROKE_WEIGHT, ";stroke:").concat(NODE_BORDER_COLOR, ";filter:drop-shadow(0px 1px 1px rgba(0,0,0,.4));"));
    }
  }, {
    key: "setFontColor",
    value: function setFontColor(fontColor) {
      var _this$_config$fontSiz = this._config.fontSize,
          fontSize = _this$_config$fontSiz === void 0 ? 11 : _this$_config$fontSiz;
      this._config.fontColor = fontColor;

      this._text.setAttribute('style', "font-size:".concat(fontSize, "px;color:").concat(fontColor, ";overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;"));
    }
  }, {
    key: "initialize",
    value: function initialize(doc, config) {
      var _config$x = config.x,
          x = _config$x === void 0 ? 0 : _config$x,
          _config$y = config.y,
          y = _config$y === void 0 ? 0 : _config$y,
          _config$title = config.title,
          title = _config$title === void 0 ? '' : _config$title,
          _config$fontSize = config.fontSize,
          fontSize = _config$fontSize === void 0 ? 11 : _config$fontSize,
          _config$color = config.color,
          color = _config$color === void 0 ? NODE_COLOR : _config$color,
          _config$fontColor = config.fontColor,
          fontColor = _config$fontColor === void 0 ? NODE_TEXT_COLOR : _config$fontColor,
          _config$description = config.description,
          description = _config$description === void 0 ? '' : _config$description;
      var sel = this.elem = this.createSvgElement(doc, 'g');
      sel.setAttribute('transform', "translate(".concat(x, ",").concat(y, ")"));
      var rect;
      this._bg = rect = this.createSvgElement(doc, 'rect');
      rect.setAttribute('width', this._width);
      rect.setAttribute('height', this._height);
      rect.setAttribute('rx', NODE_PADDING);
      rect.setAttribute('ry', NODE_PADDING);
      this.setFillColor(color);
      sel.appendChild(rect);
      var foreignObject = this.createSvgElement(doc, 'foreignObject');
      foreignObject.setAttribute('class', 'no-mouse');
      foreignObject.setAttribute('x', NODE_PADDING);
      foreignObject.setAttribute('y', NODE_PADDING);
      foreignObject.setAttribute('width', this._width - 2 * NODE_PADDING);
      foreignObject.setAttribute('height', this._height - 2 * NODE_PADDING);
      var text;
      this._text = text = this.createNonSvgElement(doc, 'div');
      text.setAttribute('contenteditable', 'true');
      text.setAttribute('xmlns', "http://www.w3.org/1999/xhtml");
      text.setAttribute('style', "font-size:".concat(fontSize, "px;color:").concat(fontColor, ";overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;"));
      text.innerHTML = title;
      foreignObject.appendChild(text);
      sel.appendChild(foreignObject);
      if (this._editable) this.draggable(sel);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      //remove related links
      this.remove();
    }
  }, {
    key: "select",
    value: function select() {
      _get(_getPrototypeOf(Node.prototype), "select", this).call(this); //draw selected highlight


      var rect;
      this._selected = rect = this.createSvgElement(this._doc, 'rect');
      rect.setAttribute('class', 'highlight');
      rect.setAttribute('width', this._width);
      rect.setAttribute('height', this._height);
      this.elem.appendChild(rect);
      this.drawInputLinkables();
      this.drawOutputLinkables();
      this.drawMenu();

      this._links.forEach(function (link) {
        return link.redrawPath();
      });
    }
  }, {
    key: "unselect",
    value: function unselect() {
      var _this3 = this;

      _get(_getPrototypeOf(Node.prototype), "unselect", this).call(this);

      ['.highlight', '#menu-btn', '#svg-table'].forEach(function (id) {
        var elem = _this3.elem.querySelector(id);

        if (elem !== null) {
          _this3.elem.removeChild(elem);
        }
      });
      this.removeLinkables();

      this._links.forEach(function (link) {
        return link.redrawPath();
      });
    }
  }, {
    key: "drawMenu",
    value: function drawMenu() {
      var _this4 = this;

      var open = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this._menuState = open;
      var gDom = this.createSvgElement(this._doc, 'g');
      gDom.setAttribute('id', "menu-btn");
      gDom.setAttribute('style', "transform: translate(0,".concat(this._height + 10, "px);"));
      var svg = open ? displays_svg__WEBPACK_IMPORTED_MODULE_1__["ArrowUp"] : displays_svg__WEBPACK_IMPORTED_MODULE_1__["ArrowDown"];
      var arrowIcon = this.createDomElement(this._doc, 'g', svg).lastChild;
      this.appendIconAttrs(arrowIcon);
      var foreignObject = this.createSvgElement(this._doc, 'foreignObject');
      foreignObject.setAttribute('width', 25);
      foreignObject.setAttribute('height', 25);
      foreignObject.setAttribute('style', 'background-color:rgb(238,238,238);border-radius:15px;box-shadow:0px 2px 1px -1px rgb(0 0 0 / 20%),0px 1px 1px 0px rgb(0 0 0 / 14%),0px 1px 3px 0px rgb(0 0 0 / 12%);');
      gDom.appendChild(foreignObject);
      gDom.appendChild(arrowIcon);
      gDom.addEventListener('mousedown', function (evt) {
        evt.stopImmediatePropagation();
        _this4._menuState = !_this4._menuState;

        _this4.redrawMenu(_this4._menuState);
      });
      this.elem.appendChild(gDom);
    }
  }, {
    key: "generateTable",
    value: function generateTable(perm, attrs) {
      var _this5 = this;

      var table = displays_graphics_svgtable__WEBPACK_IMPORTED_MODULE_2__["default"].generate(this._doc, ['Input', 'Value', "<button class=\"icon-btn add-btn\">".concat(displays_svg__WEBPACK_IMPORTED_MODULE_1__["Add"], "</button")], [].concat(_toConsumableArray(perm), _toConsumableArray(this.appendWithDeleteBtn(this.toEditable(attrs)))));
      table.setAttribute('id', "svg-table");
      table.setAttribute('style', "transform:translate(0,70px);");

      table.onmousedown = function (evt) {
        var btn = evt.target.parentNode;

        if (btn && btn.nodeName === "BUTTON" && btn.className === "icon-btn del-btn") {
          //delete btns
          evt.stopImmediatePropagation();

          _this5._attrs.splice(parseInt(btn.attributes.index.value), 1);

          _this5.drawOrRefreshTable();
        } else if (btn && btn.nodeName === "BUTTON" && btn.className === "icon-btn add-btn") {
          //add btns
          evt.stopImmediatePropagation();

          _this5._attrs.push({
            name: '',
            value: ''
          });

          _this5.drawOrRefreshTable();
        } else if (evt.target.nodeName === "INPUT") {
          evt.stopImmediatePropagation();
          if (_this5._selectedText) _this5._replacement = true;
          _this5._selectedText = evt.target;

          _this5._selectedText.onblur = function () {
            if (_this5._replacement) {
              _this5._replacement = false;
            } else {
              _this5._selectedText = undefined;
            }
          };
        }
      };

      return table;
    }
  }, {
    key: "toEditable",
    value: function toEditable(attrs) {
      return attrs.map(function (attr, index) {
        var ret = {};
        var placeholder = {
          name: 'Enter key',
          value: 'Enter value'
        };
        Object.keys(attr).filter(function (key) {
          return key !== 'placeholder';
        }).map(function (key) {
          ret[key] = "<input value=\"".concat(attr[key], "\" placeholder=\"").concat(placeholder[key], "\" index=\"").concat(index, "\" key=\"").concat(key, "\" />");
        });
        return ret;
      });
    }
  }, {
    key: "drawOrRefreshTable",
    value: function drawOrRefreshTable() {
      var table = this.elem.querySelector("#svg-table");

      if (table) {
        this.elem.removeChild(table);
      }

      this.elem.appendChild(this.generateTable(this.getPermAttributes(), this.getAttributes()));
    }
  }, {
    key: "redrawMenu",
    value: function redrawMenu(open) {
      var icon = this._doc.getElementById('menu-icon');

      var svg;

      if (open) {
        svg = this.createDomElement(this._doc, 'g', displays_svg__WEBPACK_IMPORTED_MODULE_1__["ArrowUp"]).lastChild;
        this.drawOrRefreshTable();
      } else {
        svg = this.createDomElement(this._doc, 'g', displays_svg__WEBPACK_IMPORTED_MODULE_1__["ArrowDown"]).lastChild;
        var elem = this.elem.querySelector("#svg-table");
        this.elem.removeChild(elem);
      }

      this.appendIconAttrs(svg);
      icon.replaceWith(svg);
    }
  }, {
    key: "getPermAttributes",
    value: function getPermAttributes() {
      return [['Index', this.getIndex(), ' ']];
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      return this._attrs;
    }
  }, {
    key: "appendWithDeleteBtn",
    value: function appendWithDeleteBtn(arr) {
      return arr.map(function (item, index) {
        return [item.name, item.value, "<button class=\"icon-btn del-btn\" index=\"".concat(index, "\">").concat(displays_svg__WEBPACK_IMPORTED_MODULE_1__["Delete"], "</button>")];
      });
    }
  }, {
    key: "appendIconAttrs",
    value: function appendIconAttrs(icon) {
      icon.setAttribute('id', 'menu-icon');
      icon.setAttribute('style', 'fill:rgba(0,0,0,.54);');
      icon.setAttribute('x', 3);
      icon.setAttribute('y', 3);
    }
  }, {
    key: "calculateTextSize",
    value: function calculateTextSize(doc, font, txt) {
      var canvas = doc.createElement('canvas');
      var context = canvas.getContext("2d");
      context.font = font;
      var tsize = {
        'width': context.measureText(txt).width,
        'height': parseInt(context.font)
      };
      return tsize;
    }
  }, {
    key: "setXY",
    value: function setXY(x, y) {
      var svg = this._parent;
      var point = svg.createSVGPoint();
      var invertedSVGMatrix = svg.getScreenCTM().inverse();
      point.x = x;
      point.y = y;
      point = point.matrixTransform(invertedSVGMatrix);
      this._config.x = point.x;
      this._config.y = point.y;

      this._sel.setAttributeNS(null, 'transform', "translate(".concat(point.x, ",").concat(point.y, ")"));
    }
  }, {
    key: "getFaceCoords",
    value: function getFaceCoords() {
      var _this6 = this;

      return ['u', 'l', 'r', 'd'].map(function (side) {
        return _this6.getFaceCoord(side);
      });
    }
  }, {
    key: "getFaceCoord",
    value: function getFaceCoord(side) {
      var _this$_config = this._config,
          _this$_config$x = _this$_config.x,
          x = _this$_config$x === void 0 ? 0 : _this$_config$x,
          _this$_config$y = _this$_config.y,
          y = _this$_config$y === void 0 ? 0 : _this$_config$y;
      var coord;

      switch (side) {
        case 'u':
          coord = {
            x: x + this._width / 2,
            y: y,
            side: side
          };
          break;

        case 'l':
          coord = {
            x: x,
            y: y + this._height / 2,
            side: side
          };
          break;

        case 'r':
          coord = {
            x: x + this._width,
            y: y + this._height / 2,
            side: side
          };
          break;

        case 'd':
          coord = {
            x: x + this._width / 2,
            y: y + this._height,
            side: side
          };
          break;
      }

      return coord;
    }
  }, {
    key: "isTextEditable",
    value: function isTextEditable() {
      return this._text._editable;
    }
  }, {
    key: "makeDefaultTextEditable",
    value: function makeDefaultTextEditable(keyCode) {
      var _this7 = this;

      if (!this._selectedText) {
        var textbox = this._text;
        textbox._editable = true;
        textbox.setAttribute('contenteditable', 'true');
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(textbox, 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        this.stopListening();

        textbox.onblur = function () {
          textbox._editable = false;
          textbox.setAttribute('contenteditable', 'false');

          _this7.startListening();
        };
      } else {
        this._selectedText.onchange = function (evt) {
          var input = evt.target;
          var key = input.attributes.key.value;
          var index = input.attributes.index.value;
          _this7._attrs[index][key] = input.value;
        };
      }
    }
  }, {
    key: "exportAsJson",
    value: function exportAsJson() {
      var _this$_config2 = this._config,
          x = _this$_config2.x,
          y = _this$_config2.y,
          title = _this$_config2.title,
          fontSize = _this$_config2.fontSize,
          color = _this$_config2.color,
          _this$_config2$descri = _this$_config2.description,
          description = _this$_config2$descri === void 0 ? '' : _this$_config2$descri;
      return {
        "title": title,
        "description": description,
        "color": color,
        "x": x,
        "y": y,
        "node": this._node,
        "attrs": this._attrs
      };
    }
  }, {
    key: "getInputCoord",
    value: function getInputCoord(index) {
      var _this$_config3 = this._config,
          _this$_config3$x = _this$_config3.x,
          x = _this$_config3$x === void 0 ? 0 : _this$_config3$x,
          _this$_config3$y = _this$_config3.y,
          y = _this$_config3$y === void 0 ? 0 : _this$_config3$y;
      return this.selected ? this.getInputCoordByIndex(index) : {
        x: x,
        y: y + this._height / 2
      };
    }
  }, {
    key: "getInputCoordByIndex",
    value: function getInputCoordByIndex(index) {
      var _this$_config4 = this._config,
          _this$_config4$x = _this$_config4.x,
          x = _this$_config4$x === void 0 ? 0 : _this$_config4$x,
          _this$_config4$y = _this$_config4.y,
          y = _this$_config4$y === void 0 ? 0 : _this$_config4$y;
      var coords = this.calcInputCoords(0, NODE_IO_SIZE / 2);
      return {
        x: x + coords[index].x,
        y: y + coords[index].y
      };
    }
  }, {
    key: "getOutputCoord",
    value: function getOutputCoord(index) {
      var _this$_config5 = this._config,
          _this$_config5$x = _this$_config5.x,
          x = _this$_config5$x === void 0 ? 0 : _this$_config5$x,
          _this$_config5$y = _this$_config5.y,
          y = _this$_config5$y === void 0 ? 0 : _this$_config5$y;
      return this.selected ? this.getOutputCoordByIndex(index) : {
        x: x + this._width,
        y: y + this._height / 2
      };
    }
  }, {
    key: "getOutputCoordByIndex",
    value: function getOutputCoordByIndex(index) {
      var _this$_config6 = this._config,
          _this$_config6$x = _this$_config6.x,
          x = _this$_config6$x === void 0 ? 0 : _this$_config6$x,
          _this$_config6$y = _this$_config6.y,
          y = _this$_config6$y === void 0 ? 0 : _this$_config6$y;
      var coords = this.calcOutputCoords(NODE_IO_SIZE + 1, NODE_IO_SIZE / 2);
      return {
        x: x + coords[index].x,
        y: y + coords[index].y
      };
    }
  }, {
    key: "setInputColor",
    value: function setInputColor() {
      if (this._node.type !== 'function') {
        this.setFillColor(NODE_DISABLED_COLOR);
      }
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this._index;
    }
  }, {
    key: "setIndex",
    value: function setIndex(index) {
      this._index = index;
    }
  }, {
    key: "resetColor",
    value: function resetColor() {
      //reset to default color
      this.setFillColor(NODE_COLOR);
    }
  }, {
    key: "calcInputCoords",
    value: function calcInputCoords() {
      var xOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var yOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var INPUT_COUNT = this._inputCount;
      var X = -(BORDER_WIDTH + NODE_IO_SIZE + NODE_IO_SPACING);
      var height = INPUT_COUNT * NODE_IO_SIZE + (INPUT_COUNT - 1) * NODE_IO_SPACING;
      var halfAbove = height / 2;
      var startingY = halfAbove > NODE_HEIGHT / 2 ? -(halfAbove - NODE_HEIGHT / 2) : NODE_HEIGHT / 2 - halfAbove;
      var coords = [];

      for (var i = 0; i < INPUT_COUNT; i++) {
        coords.push({
          x: X + xOffset,
          y: startingY + i * (NODE_IO_SIZE + NODE_IO_SPACING) + yOffset
        });
      }

      return coords;
    }
  }, {
    key: "calcOutputCoords",
    value: function calcOutputCoords() {
      var xOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var yOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var OUTPUT_COUNT = this._outputCount;
      var X = -(BORDER_WIDTH + NODE_IO_SIZE + NODE_IO_SPACING);
      var height = OUTPUT_COUNT * NODE_IO_SIZE + (OUTPUT_COUNT - 1) * NODE_IO_SPACING;
      var halfAbove = height / 2;
      var startingY = halfAbove > NODE_HEIGHT / 2 ? -(halfAbove - NODE_HEIGHT / 2) : NODE_HEIGHT / 2 - halfAbove;
      var coords = [];

      for (var i = 0; i < OUTPUT_COUNT; i++) {
        coords.push({
          x: NODE_WIDTH + NODE_IO_SPACING + xOffset,
          y: startingY + i * NODE_IO_SPACING + yOffset
        });
      }

      return coords;
    }
  }, {
    key: "drawInputLinkables",
    value: function drawInputLinkables(onComplete) {
      if (this._node.type === 'function') {
        var INPUT_COUNT = this._inputCount;
        var X = -(BORDER_WIDTH + NODE_IO_SIZE + NODE_IO_SPACING);
        var height = INPUT_COUNT * NODE_IO_SIZE + (INPUT_COUNT - 1) * NODE_IO_SPACING;
        var halfAbove = height / 2;
        var startingY = halfAbove > NODE_HEIGHT / 2 ? -(halfAbove - NODE_HEIGHT / 2) : NODE_HEIGHT / 2 - halfAbove; //draw the main body

        var foreignObject = this.createSvgElement(this._doc, 'foreignObject');
        foreignObject.setAttribute('id', 'inputLinkables');
        foreignObject.setAttribute('width', NODE_IO_SIZE + BORDER_WIDTH);
        foreignObject.setAttribute('height', height + BORDER_WIDTH);
        foreignObject.setAttribute('style', "transform: translate(".concat(X, "px,").concat(startingY, "px);")); //draw linkable for each output

        for (var i = 0; i < INPUT_COUNT; i++) {
          foreignObject.appendChild(this.generateIoLinks(this._doc, i + 1, {
            x: 0,
            y: i * (NODE_IO_SIZE + NODE_IO_SPACING)
          }, onComplete));
        }

        this.elem.appendChild(foreignObject);
      }
    }
  }, {
    key: "drawOutputLinkables",
    value: function drawOutputLinkables(onLinkConstruct) {
      var BORDER_WIDTH = 5;
      var height = this._outputCount * NODE_IO_SIZE + (this._outputCount - 1) * NODE_IO_SPACING;
      var halfAbove = height / 2;
      var startingY = halfAbove > NODE_HEIGHT / 2 ? -(halfAbove - NODE_HEIGHT / 2) : NODE_HEIGHT / 2 - halfAbove; //draw the main body

      var foreignObject = this.createSvgElement(this._doc, 'foreignObject');
      foreignObject.setAttribute('id', 'outputLinkables');
      foreignObject.setAttribute('width', NODE_IO_SIZE + NODE_WIDTH + NODE_IO_SPACING + BORDER_WIDTH);
      foreignObject.setAttribute('height', height + BORDER_WIDTH);
      foreignObject.setAttribute('style', "transform: translate(0,".concat(startingY, "px);")); //draw linkable for each output

      for (var i = 0; i < this._outputCount; i++) {
        foreignObject.appendChild(this.generateIoLinks(this._doc, i + 1, {
          x: NODE_WIDTH + NODE_IO_SPACING,
          y: i * NODE_IO_SPACING
        }, onLinkConstruct));
      }

      this.elem.appendChild(foreignObject);
    }
  }, {
    key: "removeLinkables",
    value: function removeLinkables() {
      var _this8 = this;

      ['#inputLinkables', '#outputLinkables'].forEach(function (id) {
        var elem = _this8.elem.querySelector(id);

        if (elem !== null) {
          _this8.elem.removeChild(elem);
        }
      });
    }
  }, {
    key: "generateIoLinks",
    value: function generateIoLinks(doc, index, coords, onLinkConstruct) {
      var div = this.createDomElement(doc, 'div', index);
      div.setAttribute('class', 'io-link');
      div.setAttribute('index', index);
      div.setAttribute('style', "left:".concat(coords.x, "px;top:").concat(coords.y, "px;width:").concat(NODE_IO_SIZE, "px;height:").concat(NODE_IO_SIZE, "px;background-color:").concat(NODE_IO_CONNECTOR_COLOR, ";border: 1px solid ").concat(NODE_CONNECTOR_BORDER_COLOR, ";border-radius:").concat(NODE_IO_SIZE, "px;"));
      div._node = this;
      div._selected = false;

      div.onmouseover = function () {
        if (!div._selected) {
          div.style.backgroundColor = NODE_IO_HOVER_COLOR;
        }
      };

      div.onmouseout = function () {
        if (!div._selected) {
          div.style.backgroundColor = NODE_IO_CONNECTOR_COLOR;
        }
      };

      div.onclick = function () {
        div.selected = true;
        div.style.backgroundColor = NODE_IO_CONNECTOR_COLOR;
        var index = div.getAttribute('index');
        onLinkConstruct(div._node, index);
      };

      return div;
    } //#region

  }, {
    key: "selected",
    get: function get() {
      return this._selected;
    }
  }, {
    key: "outputCount",
    get: function get() {
      return this._outputCount;
    } //#endregion

  }]);

  return Node;
}(displays_draggable__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Node);

/***/ }),

/***/ "./src/displays/svg.js":
/*!*****************************!*\
  !*** ./src/displays/svg.js ***!
  \*****************************/
/*! exports provided: MoreVert, ArrowDown, ArrowUp, ArrowForward, Delete, Add, CancelInRed, Play, Pause, Stop, Undo, Redo, ZoomIn, ZoomOut, FormatColorFill, FormatColorText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoreVert", function() { return MoreVert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrowDown", function() { return ArrowDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrowUp", function() { return ArrowUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrowForward", function() { return ArrowForward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Delete", function() { return Delete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Add", function() { return Add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancelInRed", function() { return CancelInRed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Play", function() { return Play; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pause", function() { return Pause; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stop", function() { return Stop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Undo", function() { return Undo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Redo", function() { return Redo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomIn", function() { return ZoomIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomOut", function() { return ZoomOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatColorFill", function() { return FormatColorFill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatColorText", function() { return FormatColorText; });
var PathToSvgIcon = function PathToSvgIcon(d, size) {
  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var MENU_CLASS = "class=\"".concat(className, "\"");
  var STYLE = "style=\"".concat(style, "\"");
  var ICON_SIZE = "width=\"".concat(size, "\" height=\"").concat(size, "\"");
  return "<svg ".concat(MENU_CLASS, " ").concat(STYLE, " viewBox=\"0 0 24 24\" ").concat(ICON_SIZE, "><g><g><path d=\"").concat(d, "\"/></g></g></svg>");
};

var MuiSize = 18;

var MuiPathToSvgIcon = function MuiPathToSvgIcon(d) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    className: '',
    style: ''
  },
      className = _ref.className,
      style = _ref.style;

  return PathToSvgIcon(d, MuiSize, className, style);
};

var MoreVert = MuiPathToSvgIcon("M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z");
var ArrowDown = MuiPathToSvgIcon("M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z");
var ArrowUp = MuiPathToSvgIcon("M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z");
var ArrowForward = MuiPathToSvgIcon("M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z");
var Delete = MuiPathToSvgIcon("M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z");
var Add = MuiPathToSvgIcon("M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z");
var CancelInRed = MuiPathToSvgIcon("M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z", {
  style: "fill:#E21B1B;"
});
var Play = MuiPathToSvgIcon("M8 5v14l11-7z");
var Pause = MuiPathToSvgIcon("M6 19h4V5H6v14zm8-14v14h4V5h-4z");
var Stop = MuiPathToSvgIcon("M6 6h12v12H6z");
var Undo = MuiPathToSvgIcon("M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z");
var Redo = MuiPathToSvgIcon("M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z");
var ZoomIn = MuiPathToSvgIcon("M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z");
var ZoomOut = MuiPathToSvgIcon("M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z");
var FormatColorFill = MuiPathToSvgIcon("M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z");
var FormatColorText = MuiPathToSvgIcon("M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z");

/***/ })

/******/ });
//# sourceMappingURL=clay.js.map