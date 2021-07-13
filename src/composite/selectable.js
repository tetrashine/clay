const SelectableHOC = (BaseClass) => {

  return class extends BaseClass {

    constructor(...params) {
      super(...params);
      this.clickFn = (evt) => {
        this.trigger('click', this);
      };
    }

    selectable() {
      //TODO: rethink how decouple `this._sel`
      this._sel.addEventListener('click', this.clickFn);
    }

    destroy() {   
      //TODO: rethink how decouple `this._sel`
      this._sel.removeEventListener('click', this.clickFn);
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