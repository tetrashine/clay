const SelectableHOC = (BaseClass) => {

  return class extends BaseClass {

    constructor(...params) {
      super(...params);
      this.clickFn = () => {
        this.trigger('click', this);
      };
    }

    selectable() {
      this.on('clickonly', this.clickFn);
    }

    destroy() {   
      this.off('clickonly', this.clickFn);
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