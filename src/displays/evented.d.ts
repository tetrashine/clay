declare type GenericFunction = (...args: any[]) => void;
declare class Evented {
    private _events;
    constructor();
    _defaulted(name: string): void;
    off(name: string, callback: GenericFunction): void;
    on(name: string, callback: GenericFunction): void;
    once(name: string, callback: GenericFunction): void;
    trigger(name: string, ...args: any[]): void;
}
export default Evented;
