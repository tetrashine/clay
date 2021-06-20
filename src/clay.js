//#region Imports
import Base from 'displays/base';
import Board from 'displays/board';
import Node from 'displays/node';
import Link from 'displays/link';
import ColorPalette from 'displays/colorpalette';

import {KeyCode} from 'constants/keycode';
import {EditMode} from 'constants/editmode';
import {ZoomMode} from 'constants/zoommode';
//#endregion

//#region SVG Decalations
const ICON_SIZE = 18;
const MENU_CLASS = 'class="menu-btn"';
const SIZE = `width="${ICON_SIZE}" height="${ICON_SIZE}"`;
const NODE_SVG = `<svg ${MENU_CLASS} viewBox="0 0 490 490" ${SIZE}><g><g><path d="M437.333,21.333h-384C23.936,21.333,0,45.269,0,74.667V416c0,29.397,23.936,53.333,53.333,53.333h384 c29.397,0,53.333-23.936,53.333-53.333V74.667C490.667,45.269,466.731,21.333,437.333,21.333z M469.333,416 c0,17.643-14.357,32-32,32h-384c-17.643,0-32-14.357-32-32V128h448V416z M469.333,106.667h-448v-32c0-17.643,14.357-32,32-32h384 c17.643,0,32,14.357,32,32V106.667z"/></g></g><g><g><circle cx="53.333" cy="74.667" r="10.667"/></g></g><g><g><circle cx="96" cy="74.667" r="10.667"/></g></g><g><g><circle cx="138.667" cy="74.667" r="10.667"/></g></g><g><g><path d="M394.667,320H384v-32c0-5.888-4.779-10.667-10.667-10.667H256V256h10.667c5.888,0,10.667-4.779,10.667-10.667v-42.667 c0-5.888-4.779-10.667-10.667-10.667H224c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h10.667 v21.333H117.333c-5.888,0-10.667,4.779-10.667,10.667v32H96c-5.888,0-10.667,4.779-10.667,10.667v42.667    C85.333,379.221,90.112,384,96,384h42.667c5.888,0,10.667-4.779,10.667-10.667v-42.667c0-5.888-4.779-10.667-10.667-10.667H128 v-21.333h106.667V320H224c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h42.667    c5.888,0,10.667-4.779,10.667-10.667v-42.667c0-5.888-4.779-10.667-10.667-10.667H256v-21.333h106.667V320H352 c-5.888,0-10.667,4.779-10.667,10.667v42.667c0,5.888,4.779,10.667,10.667,10.667h42.667c5.888,0,10.667-4.779,10.667-10.667    v-42.667C405.333,324.779,400.555,320,394.667,320z M128,362.667h-21.333v-21.333H128V362.667z M256,362.667h-21.333v-21.333H256 V362.667z M234.667,234.667v-21.333H256v21.333H234.667z M384,362.667h-21.333v-21.333H384V362.667z"/></g></g></svg>`;
const LINK_SVG = `<svg ${MENU_CLASS} viewBox="0 0 551.13 551.13" ${SIZE}><path d="M508.875,248.458l-160-160c-4.167-4.167-10.917-4.167-15.083,0c-4.167,4.167-4.167,10.917,0,15.083l141.792,141.792 H10.667C4.771,245.333,0,250.104,0,256s4.771,10.667,10.667,10.667h464.917L333.792,408.458c-4.167,4.167-4.167,10.917,0,15.083 c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125l160-160C513.042,259.375,513.042,252.625,508.875,248.458z"/></svg>`;
const CANCEL_SVG = `<svg ${MENU_CLASS} viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" ${SIZE}><ellipse style="fill:#E21B1B;" cx="256" cy="256" rx="256" ry="255.832"/><g><rect x="228.021" y="113.143" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0178 256.0051)" style="fill:#FFFFFF;" width="55.991" height="285.669"/><rect x="113.164" y="227.968" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0134 255.9885)" style="fill:#FFFFFF;" width="285.669" height="55.991"/></g></svg>`;
const EXPORT_SVG = `<svg ${MENU_CLASS} enable-background="new 0 0 551.13 551.13" viewBox="0 0 551.13 551.13" ${SIZE}><path d="m465.016 172.228h-51.668v34.446h34.446v310.011h-344.457v-310.011h34.446v-34.446h-51.669c-9.52 0-17.223 7.703-17.223 17.223v344.456c0 9.52 7.703 17.223 17.223 17.223h378.902c9.52 0 17.223-7.703 17.223-17.223v-344.456c0-9.52-7.703-17.223-17.223-17.223z"/><path d="m258.342 65.931v244.08h34.446v-244.08l73.937 73.937 24.354-24.354-115.514-115.514-115.514 115.514 24.354 24.354z"/></svg>`;
const DELETE_SVG = `<svg ${MENU_CLASS} viewBox="-47 0 512 512" ${SIZE}><path d="m416.875 114.441406-11.304688-33.886718c-4.304687-12.90625-16.339843-21.578126-29.941406-21.578126h-95.011718v-30.933593c0-15.460938-12.570313-28.042969-28.027344-28.042969h-87.007813c-15.453125 0-28.027343 12.582031-28.027343 28.042969v30.933593h-95.007813c-13.605469 0-25.640625 8.671876-29.945313 21.578126l-11.304687 33.886718c-2.574219 7.714844-1.2695312 16.257813 3.484375 22.855469 4.753906 6.597656 12.445312 10.539063 20.578125 10.539063h11.816406l26.007813 321.605468c1.933594 23.863282 22.183594 42.558594 46.109375 42.558594h204.863281c23.921875 0 44.175781-18.695312 46.105469-42.5625l26.007812-321.601562h6.542969c8.132812 0 15.824219-3.941407 20.578125-10.535157 4.753906-6.597656 6.058594-15.144531 3.484375-22.859375zm-249.320312-84.441406h83.0625v28.976562h-83.0625zm162.804687 437.019531c-.679687 8.402344-7.796875 14.980469-16.203125 14.980469h-204.863281c-8.40625 0-15.523438-6.578125-16.203125-14.980469l-25.816406-319.183593h288.898437zm-298.566406-349.183593 9.269531-27.789063c.210938-.640625.808594-1.070313 1.484375-1.070313h333.082031c.675782 0 1.269532.429688 1.484375 1.070313l9.269531 27.789063zm0 0"/><path d="m282.515625 465.957031c.265625.015625.527344.019531.792969.019531 7.925781 0 14.550781-6.210937 14.964844-14.21875l14.085937-270.398437c.429687-8.273437-5.929687-15.332031-14.199219-15.761719-8.292968-.441406-15.328125 5.925782-15.761718 14.199219l-14.082032 270.398437c-.429687 8.273438 5.925782 15.332032 14.199219 15.761719zm0 0"/><path d="m120.566406 451.792969c.4375 7.996093 7.054688 14.183593 14.964844 14.183593.273438 0 .554688-.007812.832031-.023437 8.269531-.449219 14.609375-7.519531 14.160157-15.792969l-14.753907-270.398437c-.449219-8.273438-7.519531-14.613281-15.792969-14.160157-8.269531.449219-14.609374 7.519532-14.160156 15.792969zm0 0"/><path d="m209.253906 465.976562c8.285156 0 15-6.714843 15-15v-270.398437c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v270.398437c0 8.285157 6.714844 15 15 15zm0 0"/></svg>`;
const UNDO_SVG = `<svg ${MENU_CLASS} viewBox="0 0 496 496.00305" ${SIZE}><path d="m406.027344 134.035156c-33.34375-26.613281-72.457032-45.042968-114.207032-53.816406-30.4375-4.339844-61.089843-6.996094-91.816406-7.953125v-64.265625c0-3.132812-1.828125-5.980469-4.679687-7.277344-2.855469-1.300781-6.203125-.816406-8.570313 1.238282l-184 160c-1.746094 1.519531-2.753906 3.722656-2.753906 6.039062 0 2.320312 1.007812 4.523438 2.753906 6.042969l184 160c2.367188 2.054687 5.714844 2.539062 8.570313 1.238281 2.851562-1.296875 4.679687-4.144531 4.679687-7.28125v-64c32.0625-.582031 63.746094 7.03125 92.039063 22.128906 39.726562 21.34375 71.855469 54.484375 91.960937 94.847656 11.730469 25.308594 17.707032 52.90625 17.496094 80.800782.054688 8.433594-.414062 16.859375-1.410156 25.234375-.410156 3.285156 1.246094 6.484375 4.171875 8.046875 2.921875 1.5625 6.5 1.160156 9.007812-1.007813 51.945313-44.195312 82.132813-108.769531 82.734375-176.96875-.664062-71.507812-33.765625-138.84375-89.976562-183.046875zm11.375 334.144532c.050781-2.082032.074218-4.214844.074218-6.402344.210938-30.246094-6.277343-60.164063-19.007812-87.597656-21.535156-43.378907-55.988281-79.015626-98.617188-102-32.148437-17.128907-68.246093-25.46875-104.648437-24.179688h-3.3125c-4.375.0625-7.886719 3.628906-7.886719 8v54.449219l-163.808594-142.449219 163.808594-142.445312v54.445312c0 4.347656 3.464844 7.898438 7.808594 8 32.332031.882812 64.597656 3.503906 96.648438 7.859375 39.304687 8.25 76.132812 25.582031 107.542968 50.613281 52.421875 41.191406 83.320313 103.945313 84 170.609375-.058594 56.664063-22.566406 110.996094-62.601562 151.097657zm0 0"/></svg>`;
const REDO_SVG = `<svg ${MENU_CLASS} viewBox="0 0 496 496.00305" ${SIZE}><path d="m493.25 161.960938-184-160c-2.367188-2.054688-5.714844-2.539063-8.566406-1.238282-2.851563 1.296875-4.683594 4.144532-4.683594 7.277344v64.265625c-30.722656.957031-61.375 3.613281-91.804688 7.953125-41.753906 8.773438-80.871093 27.203125-114.21875 53.816406-56.210937 44.203125-89.308593 111.539063-89.976562 183.046875.609375 68.203125 30.808594 132.777344 82.761719 176.96875 2.503906 2.167969 6.085937 2.570313 9.007812 1.007813s4.578125-4.761719 4.167969-8.046875c-.992188-8.375-1.464844-16.800781-1.40625-25.234375-.222656-27.894532 5.746094-55.488282 17.46875-80.800782 20.109375-40.351562 52.234375-73.480468 91.953125-94.824218 28.292969-15.105469 59.980469-22.730469 92.046875-22.152344v64c0 3.136719 1.832031 5.984375 4.683594 7.28125 2.851562 1.300781 6.199218.816406 8.566406-1.238281l184-160c1.75-1.519531 2.753906-3.722657 2.753906-6.042969 0-2.316406-1.003906-4.519531-2.753906-6.039062zm-181.25 148.488281v-54.449219c0-4.386719-3.53125-7.953125-7.917969-8-43.382812-.261719-77.679687 7.273438-107.9375 24.179688-42.621093 22.988281-77.074219 58.621093-98.605469 102-12.730468 27.433593-19.222656 57.351562-19.007812 87.597656 0 2.183594.023438 4.316406.070312 6.402344-40.03125-40.101563-62.542968-94.433594-62.601562-151.097657.679688-66.664062 31.578125-129.417969 84-170.609375 31.402344-25.027344 68.222656-42.359375 107.523438-50.613281 32.058593-4.355469 64.328124-6.976563 96.671874-7.859375 4.339844-.101562 7.808594-3.652344 7.804688-8v-54.445312l163.808594 142.445312zm0 0"/></svg>`;
const UNSELECT_SVG = `<svg ${MENU_CLASS} viewBox="0 0 512 512" ${SIZE}><path d="m410.667969 368h-117.335938c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m116.179688 288c-11.175782 0-21.351563-7.019531-25.320313-17.449219l-89.023437-233.707031c-1.089844-2.285156-1.835938-5.867188-1.835938-9.730469 0-14.953125 12.179688-27.113281 27.136719-27.113281 3.753906 0 7.296875.726562 10.496093 2.15625l232.9375 88.703125c10.410157 3.945313 17.429688 14.121094 17.429688 25.300781 0 11.753906-7.507812 22.121094-18.6875 25.792969l-95.9375 31.421875-31.421875 95.914062c-3.628906 11.160157-13.996094 18.710938-25.773437 18.710938zm-80.617188-252.414062 80.277344 210.644531 29.652344-90.519531c1.601562-4.839844 5.378906-8.640626 10.21875-10.21875l90.519531-29.652344zm223.636719 85.183593h.214843zm-233.769531-89.046875c.085937.019532.171874.0625.277343.085938zm5.910156-7.253906.382812 1.003906c-.105468-.277344-.234375-.640625-.382812-1.003906zm0 0"/><path d="m352 512c-88.234375 0-160-71.765625-160-160s71.765625-160 160-160 160 71.765625 160 160-71.765625 160-160 160zm0-288c-70.59375 0-128 57.40625-128 128s57.40625 128 128 128 128-57.40625 128-128-57.40625-128-128-128zm0 0"/></svg>`;
const FILL_SVG = `<svg ${MENU_CLASS} viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" ${SIZE}><g><g><path d="M438.978,223.391c20.995-25.919,32.08-58.23,31.396-92.173c-0.758-37.592-15.827-72.947-42.43-99.55 c-24.008-24.009-63.074-24.009-87.082,0l-46.804,46.804L267.79,52.204L159.218,160.775c-13.905-5.752-28.963-8.762-44.097-8.762 C51.643,152.012,0,203.656,0,267.133v90.094h30.031v-90.094c0-16.559,13.472-30.031,30.031-30.031 c6.299,0,12.324,1.971,17.324,5.504l-11.523,11.523l244.211,244.21L512,296.414L438.978,223.391z M362.097,52.904 c12.3-12.299,32.312-12.299,44.612,0c40.488,40.488,44.384,104.969,10.871,149.09L315.293,99.707L362.097,52.904z M60.063,207.07 c-1.82,0-3.618,0.095-5.397,0.254c15.432-15.597,36.831-25.28,60.454-25.28c6.978,0,13.79,0.817,20.39,2.438L98.783,221.21 C88.079,212.182,74.424,207.07,60.063,207.07z M108.336,254.129L267.79,94.674l128.579,128.579 c-19.178,14.714-42.424,22.824-67.023,23.125c-22.344,0.267-43.726-5.914-62.081-17.701c1.455-9.175-1.345-18.893-8.417-25.963 c-11.728-11.728-30.743-11.728-42.471,0c-11.728,11.728-11.728,30.743,0,42.472c8.594,8.594,21.099,10.882,31.784,6.88 c23.393,15.853,50.9,24.353,79.75,24.353c0.601,0,1.201-0.003,1.803-0.011c32.524-0.398,63.177-11.563,88.04-31.769l51.775,51.775 L310.075,455.867L108.336,254.129z"/></g></g></svg>`;
const FONTCOLOR_SVG = `<svg ${MENU_CLASS} viewBox="0 0 382.5 382.5" style="enable-background:new 0 0 382.5 382.5;" ${SIZE}><g><g><path d="M12.75,331.5v51h357v-51H12.75z M127.5,224.4H255l22.95,56.1h53.55L211.65,0H173.4L51,280.5h53.55L127.5,224.4z M191.25,51l48.45,127.5h-94.35L191.25,51z"/></g></g></svg>`;
const ZOOM_IN_SVG = `<svg ${MENU_CLASS} viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" ${SIZE}><g><path d="M508.875,493.792L353.089,338.005c32.358-35.927,52.245-83.296,52.245-135.339C405.333,90.917,314.417,0,202.667,0 S0,90.917,0,202.667s90.917,202.667,202.667,202.667c52.043,0,99.411-19.887,135.339-52.245l155.786,155.786 c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125C513.042,504.708,513.042,497.958,508.875,493.792z M202.667,384c-99.99,0-181.333-81.344-181.333-181.333S102.677,21.333,202.667,21.333S384,102.677,384,202.667 S302.656,384,202.667,384z"/><path d="M309.333,192h-96V96c0-5.896-4.771-10.667-10.667-10.667C196.771,85.333,192,90.104,192,96v96H96 c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h96v96c0,5.896,4.771,10.667,10.667,10.667 c5.896,0,10.667-4.771,10.667-10.667v-96h96c5.896,0,10.667-4.771,10.667-10.667C320,196.771,315.229,192,309.333,192z"/></g></svg>`;
const ZOOM_OUT_SVG = `<svg ${MENU_CLASS} viewBox="0 0 512.005 512.005" ${SIZE}><g><path d="M266.667,192.003h-128c-5.888,0-10.667,4.779-10.667,10.667s4.779,10.667,10.667,10.667h128 c5.888,0,10.667-4.779,10.667-10.667S272.555,192.003,266.667,192.003z"/><path d="M508.885,493.784L353.109,338.008c32.341-35.925,52.224-83.285,52.224-135.339c0-111.744-90.923-202.667-202.667-202.667 S0,90.925,0,202.669s90.923,202.667,202.667,202.667c52.053,0,99.413-19.883,135.339-52.245l155.776,155.776 c2.091,2.091,4.821,3.136,7.552,3.136c2.731,0,5.461-1.045,7.552-3.115C513.045,504.707,513.045,497.965,508.885,493.784z M202.667,384.003c-99.989,0-181.333-81.344-181.333-181.333S102.677,21.336,202.667,21.336S384,102.68,384,202.669 S302.656,384.003,202.667,384.003z"/></g></svg>`;
//#endregion

class Clay extends Base {
  //#region Constructor
  constructor(id, config, json) {
    super();
    this._config = this.applyDefault(config);
    this._buttons = {};
    this._palettes = [];

    this.initialize();
    [this._dom, this._menu, this._board] = this.build(id, this._config, json);

    this.menuCalibration = this.menuCalibration(this._config);
  }
  //#endregion

  build(id, config, json) {
    if (this.lint(json)) { 
      this._config = json;
      return this._build(id, config, json);
    }
  }

  _build(id, config, json) {
    const {editable} = config;
    //generate css
    var style = document.createElement('style');
    style.innerHTML = `* {font-family: Roboto;} .btn{cursor:pointer;} .clay-mb{padding:5px 5px 0 5px;display:table-cell;vertical-align:middle;width:18px;margin:0 5px;position:relative;} .clay-mb.s{fill:#aaa} .clay-mb.e:hover{background-color:#ccc;cursor:pointer;} .clay-mb.e:active{background-color:#aaa;} .tooltiptext {font-size:11px;visibility:hidden;width:60px;background-color:#ccc;text-align:center;padding:3px 8px;position:absolute;z-index:1;left:0;top:29px;color:white;} .menu-btn:hover+.tooltiptext {visibility: visible;} .palette:hover{outline:#fff solid 2px;box-shadow:rgb(60, 64, 67) 0px 2px 6px 2px;} .palette{margin-right:3px;display:inline-block;width:15px;height:15px;}`;
    document.head.appendChild(style);
  
    var dom = document.getElementById(id);
    let menu = editable && this.drawEditMenu(document, dom, config);
    let board = this.generate(document, dom, config, json);
  
    if (editable) {
      board.on('onselect', this.onSelection.bind(this));
      window.addEventListener('keydown', this.onKeyDown.bind(this));
      window.addEventListener('keyup', this.onKeyUp.bind(this));

      this._mode = EditMode.None;
    }
  
    return [dom, menu, board];
  }

  createZoomLevelElement(doc) {
    const zoomDiv = this.createDomElement(doc, 'div', '');
    const zoomInput = this.createDomElement(doc, 'input', '');
    const zoomPercent = this.createDomElement(doc, 'div', '%');
    zoomDiv.setAttribute('style', 'position:relative;text-align:right;display:table-cell;width:1px;font-size:10px;padding:0 10px 0 5px;vertical-align:middle;border:solid 1px #333;')
    zoomPercent.setAttribute('style', 'position: absolute;right:4px;margin-top:3px;')
    zoomInput.setAttribute('value', '100')
    zoomInput.setAttribute('style', 'color:#333;width:25px;border:none;')
    zoomInput.onchange = (evt) => {
      const scale = parseFloat(evt.target.value);
      this._board.zoom(scale / 100);
    }
    zoomDiv.appendChild(zoomPercent);
    zoomDiv.appendChild(zoomInput);
    return zoomDiv;
  }

  createHrElement(doc) {
    let hr = this.createDomElement(doc, 'span', '|', '');
    hr.setAttribute('style', 'color:#bbb;display:table-cell;width:1px;vertical-align:middle;')
    return hr;
  }

  createMenuElement(doc, icon, cancel='') {
    let ele = this.createDomElement(doc, 'div', icon, cancel);
    ele.setAttribute('class', 'clay-mb e');
    return ele;
  }

  createMenuBtnElement({
    doc, svg, cancelSvg='', tooltip, enable=true,
    onClick, execFn, cancelFn,
  }) {
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

  generate(doc, dom, config, json) {
    const {width, height, zoom, editable} = config;
    let board = new Board(doc, dom, width, height, zoom, editable);
    let nodes = this.parseNodes(doc, json.nodes, editable);
    let links = this.parseLinks(doc, json.links, nodes, editable);
  
    board.setNodes(nodes);
    board.setLinks(links);
  
    return board;
  }

  lint(config) { return true; }

  applyDefault(config) {
    return {
      ...{ 
        editable: true, zoomable: true, colorize: true, exportable: true 
      },
      ...config
    }
  }

  initialize() {}

  makeEditableTextIfAvailable(item) {
    item.makeTextEditable();
  }

  menuCalibration(config) {
    return () => {
      [
        ['unselect', 'editable'], 
        ['delete', 'editable'], 
        ['fill', 'colorize'], 
        ['fontfill', 'colorize']
      ].forEach((_, doable) => {
        if (config[doable]) {
          (this._selected) ? this.enableMenuBtn(this._buttons[_]) : this.disableMenuBtn(this._buttons[_])
        }
      });
    }
  }

  onKeyDown(e) {
    if (e.keyCode === KeyCode.SpaceBar) {
      this._mode = EditMode.Pan;
      this._board.setMode(EditMode.Pan);
      
    } else if (this._selected && !this._selected.isTextEditable()) {
      switch(e.keyCode) {
        case KeyCode.Delete://Delete
            this._palettes.forEach(_ => _.hide());
            this._board.delete(this._selected);
            this._selected = null;
            this.menuCalibration();
          break;
        default:
          this.makeEditableTextIfAvailable(this._selected);
          break;
      }
    }
  }

  onKeyUp(e) {
    switch(e.keyCode) {
      case KeyCode.SpaceBar://Space
        this._mode = EditMode.None;
        this._board.setMode(EditMode.None);
        break;
    }
  }

  onMenuBtnClick(mode, svg, cursor='crosshair') {
    return function() {
      if (this._mode !== mode) {
        //if there is a previous selection, cancel it
        if (this._selectedSvg) {
          this._selectedSvg.innerHTML = this._selectedSvg._svg;
          this._selectedSvg.cancelFn();
        } 
  
        //selection or switch mode
        this._mode = mode;
        svg.innerHTML = svg._cancel;
        this._selectedSvg = svg;
        this._board.getElem().style.cursor = cursor;
  
        svg.execFn();
      } else {
        //cancellation
        this.resetMenuBtns();
  
        svg.cancelFn();
      }
    }
  }

  onSelection(item) {
    if (this._selected) {
      if (this._selected == item) {
        item.unselect();
        this._selected = null;
      } else {
        this._selected.unselect();
        this._selected = item;
        item.select();
      }
    } else {
      this._selected = item;
      item.select();
    }
  
    //configure menu related to selection
    this.menuCalibration();
  }

  save() {
    return this._config;
  }

  parseNodes(doc, configs, editable) {
    return configs.map(config => new Node(doc, config, editable));
  }

  parseLinks(doc, configs, nodes, editable) {
    return configs.map(config => new Link(doc, nodes[config.src], '', nodes[config.target], '', editable));
  }
  
  subscribe(evt, callback) {
    this.on(evt, callback);
  }

  parseLinks(doc, configs, nodes) {
    return configs.map(config => new Link(doc, nodes[config.src], '', nodes[config.target], ''));
  }

  drawEditMenu(doc, parent, config) {
    const { 
      width, height, 
      editable, zoomable, colorize, exportable
    } = config;
    let svg, tooltip;
    let div = doc.createElement('div');
    div.setAttribute('style', `height:28px;width:${width-1}px;background-color:white;border:#dadce0 solid 1px;padding:6px 0;;display:table;position:absolute;border-collapse:separate;border-spacing:6px 0px;z-index:1000;`);
  
    const onExecCompleteFn = () => {
      this.resetMenuBtns();
    };
  
    //LINK BUTTON
    if (editable) {
      //NODE BUTTON
      const nodeBtn = this.createMenuBtnElement({
        doc: doc, 
        svg: NODE_SVG, 
        cancelSvg: CANCEL_SVG, 
        tooltip: 'New node', 
        execFn: () => {
          this._board.enterNodeMode(onExecCompleteFn);
        },
        cancelFn: () => {
          this._board.exitNodeMode();
        }
      });
      nodeBtn.onclick = this.onMenuBtnClick(EditMode.Node, nodeBtn).bind(this); 
      this._buttons.node = nodeBtn;
      div.appendChild(nodeBtn);

      const linkBtn = this.createMenuBtnElement({
        doc: doc, 
        svg: LINK_SVG, 
        cancelSvg: CANCEL_SVG, 
        tooltip: 'New link', 
        execFn: () => {
          this._board.enterLinkMode(onExecCompleteFn);
        },
        cancelFn: () => {
          this._board.exitLinkMode();
        }
      });
      linkBtn.onclick = this.onMenuBtnClick(EditMode.Link, linkBtn).bind(this); 
      this._buttons.links = linkBtn;
      div.appendChild(linkBtn);
    
      //Breakline
      svg = this.createHrElement(doc);
      div.appendChild(svg);
    
      //UNDO
      const undoBtn = this.createMenuBtnElement({
        doc: doc, 
        svg: UNDO_SVG,
        tooltip: 'Undo', 
        onClick: () => {},
      });
      this._buttons.undo = undoBtn;
      div.appendChild(undoBtn);
      
      //REDO
      const redoBtn = this.createMenuBtnElement({
        doc: doc, 
        svg: REDO_SVG,
        tooltip: 'Redo', 
        onClick: () => {},
      });
      this._buttons.redo = redoBtn;
      div.appendChild(redoBtn);
    
      //Breakline
      svg = this.createHrElement(doc);
      div.appendChild(svg);
    
      //UNSELECT BUTTON
      const unselectBtn = this.createMenuBtnElement({
        doc: doc, 
        svg: UNSELECT_SVG,
        cancelSvg: CANCEL_SVG,
        tooltip: 'Unselect', 
        enable: false,
        onClick: () => {
          this._selected.unselect();
          this._selected = null;
          this.menuCalibration();
        },
      });
      this._buttons.unselect = unselectBtn; 
      div.appendChild(unselectBtn);
    
      //DELETE
      const deleteBtn = this.createMenuBtnElement({
        doc: doc, 
        svg: DELETE_SVG,
        cancelSvg: CANCEL_SVG,
        tooltip: 'Delete', 
        enable: false,
        onClick: () => {
          //if (svg._enable) {
            this._board.delete(this._selected);
            this._selected = null;
            this.menuCalibration();
          //}
        },
      });
      this._buttons.delete = deleteBtn; 
      div.appendChild(deleteBtn);
  
      //Breakline
      div.appendChild(this.createHrElement(doc));
    }

    //ZOOM IN
    if (zoomable) {
      const zoomInBtn = this.createMenuBtnElement({
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
      zoomInBtn.onclick = this.onMenuBtnClick(EditMode.ZoomIn, zoomInBtn).bind(this); 
      this._buttons.zoomIn = zoomInBtn; 
      div.appendChild(zoomInBtn);
  
      //ZOOM OUT
      const zoomOutBtn = this.createMenuBtnElement({
        doc: doc, 
        svg: ZOOM_OUT_SVG,
        cancelSvg: CANCEL_SVG,
        tooltip: 'Zoom In', 
        execFn: () => {
          this._board.enterZoomMode(ZoomMode.ZoomOut);
        },
        cancelFn: () => {
          this._board.exitZoomMode();
        }
      });
      zoomOutBtn.onclick = this.onMenuBtnClick(EditMode.ZoomOut, zoomOutBtn).bind(this); 
      this._buttons.zoomOut = zoomOutBtn; 
      div.appendChild(zoomOutBtn);

      const zoomLvl = this.createZoomLevelElement(doc, this._board);
      div.appendChild(zoomLvl);

  
      //Breakline
      div.appendChild(this.createHrElement(doc)); 
    }

    if (colorize) {
      //FILL BUTTON
      const fillBtn = this.createMenuBtnElement({
        doc: doc, 
        svg: FILL_SVG,
        tooltip: 'Fill Color', 
        onClick: () => {},
      });
      this._buttons.fill = fillBtn; 
      div.appendChild(fillBtn);
      this.disableMenuBtn(fillBtn);

      //color palette
      let cp1 = new ColorPalette(doc);
      cp1.appendToDom(fillBtn);
      this._palettes.push(cp1);

      fillBtn.onclick = ((svg, cp) => () => {
        if (svg._enable) {
          this._palettes.filter(_ => _!== cp).forEach(_ => _.hide());
          if (cp.toggle()) {
            cp.once('palette-select', (color) => {
              this._selected.setFillColor(color);
            });
          }
        }
      })(fillBtn, cp1);

      //FONTCOLOR BUTTON
      const textColorBtn = this.createMenuBtnElement({
        doc: doc, 
        svg: FONTCOLOR_SVG,
        tooltip: 'Text Color', 
        enable: false,
        onClick: () => {},
      });

      this._buttons.fontfill = textColorBtn;

      //color palette
      let cp2 = new ColorPalette(doc);
      cp2.appendToDom(textColorBtn);
      this._palettes.push(cp2);

      textColorBtn.onclick = ((svg, cp) => () => {
        if (svg._enable) {
          this._palettes.filter(_ => _!== cp).forEach(_ => _.hide());
          if (cp.toggle()) {
            cp.once('palette-select', (color) => {
              this._selected.setFontColor(color);
            });
          }
        }
      })(textColorBtn, cp2);

      div.appendChild(textColorBtn);    
    
      //Breakline
      div.appendChild(this.createHrElement(doc));
    }
  
    //EXPORT BUTTON
    if (exportable) {
      const exportBtn = this.createMenuBtnElement({
        doc: doc, 
        svg: EXPORT_SVG,
        cancelSvg: CANCEL_SVG,
        tooltip: 'Export', 
        onClick: () => {
          this.trigger('export', this._board.exportAsJson());
        },
      });

      this._buttons.export = exportBtn;
      div.appendChild(exportBtn);
    }
        
    svg = this.createMenuElement(doc, '', '');
    svg.setAttribute('class', '');
    div.appendChild(svg);
    
    parent.appendChild(div);
  }

  resetMenuBtns() {
    //reset mode
    this._mode = EditMode.None;
  
    //revert all buttons back to original svg state
    let buttons = this._buttons;
    Object.keys(buttons).forEach(key => {
      buttons[key].innerHTML = buttons[key]._svg;
    });
  
    //reset cursor state
    this._board.getElem().style.cursor = 'default';
  
    //clear selected svg
    this._selectedSvg = undefined;
  }
}

export default Clay;