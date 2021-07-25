import Base from 'displays/base';

class ColorPalette extends Base {
  private _doc: any;
  private _hidden: boolean;

  constructor(doc: any) {
    super();

    this._doc = doc;
    this._hidden = true;
    this.initialize();
  }

  initialize(): void {
    const {_doc, _hidden} = this;
    let sel: any = this.elem = _doc.createElement('div');
    sel.setAttribute('style', `position:absolute;background-color:white;box-shadow:rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;padding:5px;width:162px;
      ${_hidden ? 'visibility:hidden' : 'visibility:visible'}
    `);

    const rgb: string[][] = [
      ['#4d4d4d', '#999999', '#fff', '#f44e3b', '#fe9200', '#fcdc00', '#dbdf00', '#a4dd00', '#68ccca', '#73d8ff', '#aea1ff', '#fda1ff'],
      ['#333', '#808080', '#ccc', '#d33115', '#e27300', '#fcc400', '#b0bc00', '#68bc00', '#16a5a5', '#68ccca', '#009ce0', '#7b64ff'],
      ['#000', '#666', '#b3b3b3', '#9f0500', '#c45100', '#fb9e00', '#808900', '#194d33', '#0c797d', '#0062b1', '#653294', '#ab149e']
    ];

    for (let i: number = 0; i < 3; i++) {
      for (let j: number = 0; j < 9; j++) {
        var color: string = rgb[i][j];
        var node: any = _doc.createElement('div');

        node.setAttribute('class', 'btn palette');
        if (color === '#fff') { 
          node.setAttribute('style', `
            width: 13px;
            height: 13px;
            border: solid 1px #ccc;
            background-color: ${color};
          `);
        } else {
          node.setAttribute('style', `
            background-color: ${color};
          `);
        }
        
        node.onclick = ((color) => (evt: any) => {
          // Prevent browser drag behavior as soon as possible
          evt.preventDefault()
        
          // Prevent propagation to a parent that might also have dragging enabled
          evt.stopPropagation()

          this.trigger('palette-select', color)
          this.hide();
        })(color);

        sel.appendChild(node);
      }
    }
  }

  toggle(): boolean {
    (this._hidden) ? this.show() : this.hide();
    return !this._hidden;
  }

  hide(): void {
    this._hidden = true;
    this.elem.style.visibility = 'hidden';
  }

  show(): void {
    this._hidden = false;
    this.elem.style.visibility = 'visible';
  }
}

export default ColorPalette;