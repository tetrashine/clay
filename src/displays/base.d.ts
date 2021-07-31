import Evented from 'displays/evented';
declare class Base extends Evented {
    private _sel;
    appendChild(node: any): void;
    appendChildByElement(elem: any): void;
    removeChild(node: any): void;
    removeChildByElement(elem: any): void;
    setAttribute(key: string, value: any): void;
    createDomElement(doc: any, type: string, text: string, cancel?: string): HTMLElement;
    createNonSvgElement(doc: any, type: string): HTMLElement;
    createSvgElement(doc: any, type: string): HTMLElement;
    remove(): void;
    get elem(): any;
    set elem(elem: any);
}
export default Base;
