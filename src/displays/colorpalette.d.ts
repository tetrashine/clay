import Base from 'displays/base';
declare class ColorPalette extends Base {
    private _doc;
    private _hidden;
    constructor(doc: any);
    initialize(): void;
    toggle(): boolean;
    hide(): void;
    show(): void;
}
export default ColorPalette;
