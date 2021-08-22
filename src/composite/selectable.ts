const SelectableHOC = (BaseClass: any) => {

  return class extends BaseClass {
    private _clickFn: () => void;
    private _selected: boolean;

    constructor(...args: any[]) {
      super(...args);
      this._clickFn = ():void => {
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
}

export default SelectableHOC;