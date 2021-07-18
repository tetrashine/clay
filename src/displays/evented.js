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

    var func = (...params) => {
      callback.call(this, ...params);
      this.off(name, func);
    };

    this._events[name].push(func);
  }

  trigger(name, ...params) {
    if (this._events[name]) {
      this._events[name].forEach(_ => {
        _.call(this, ...params);
      });
    }
  }
}

export default Evented;