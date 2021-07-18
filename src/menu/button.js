var Base = require('displays/base');

let Button = function (doc, icon, cancel) {
  this.enable();

  let sel = this._sel = this.createDomElement(doc, 'span', icon, cancel);
  sel.setAttribute('style', 'padding: 0 5px;')
}

Button.prototype = new Base();

Button.prototype.enable = function() {
  this._enable = true;
}

Button.prototype.disable = function() {
  this._enable = false;
}