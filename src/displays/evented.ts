
type GenericFunction = (...args: any[]) => void;

class Evented {
  private _events: { [key: string]: GenericFunction[] };

  constructor() {
    this._events = {};
  }

  _defaulted(name: string): void {
    if (!this._events[name]) {
      this._events[name] = [];
    }
  }

  off(name: string, callback: GenericFunction): void {
    this._defaulted(name);
  
    var arr = this._events[name];
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === callback) {
        arr.splice(i, 1);
        break;
      }
    }
  }

  on(name: string, callback: GenericFunction): void {
    this._defaulted(name);
  
    this._events[name].push(callback);
  }

  once(name: string, callback: GenericFunction): void {
    this._defaulted(name);

    let func: GenericFunction = (...args: any[]): void => {
      callback.call(this, ...args);
      this.off(name, func);
    };

    this._events[name].push(func);
  }

  trigger(name: string, ...args: any[]): void {
    if (this._events[name]) {
      this._events[name].forEach((_: GenericFunction) => {
        _.call(this, ...args);
      });
    }
  }
}

export default Evented;