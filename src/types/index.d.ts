declare type Point = {
    x: number;
    y: number;
};
declare type NodePoint = Point & {
    side: string;
};
declare type Offset = {
    left: number;
    top: number;
};
declare type NodeAttribute = {
    "name": string;
    "value": string;
};
declare type NodeConfig = {
    editable: boolean;
    x: number;
    y: number;
    title: string;
    inputs: string[];
    outputs: string[];
    description?: string;
    attrs?: NodeAttribute[];
    color?: string;
    width?: number;
    height?: number;
    fontSize?: number;
    fontColor?: string;
};
declare type BoardConfig = {
    width: number;
    height: number;
    zoom: number;
    editable: boolean;
    zoomable: boolean;
    colorize: boolean;
    exportable: boolean;
    executable: boolean;
};
declare type BoardState = {
    title: string;
    nodes: NodeConfig[];
    links: LinkState[];
    editable?: boolean;
};
declare type LinkState = {
    type: string;
    dotted: boolean;
    mode: string;
    editable: boolean;
    src: number;
    target: number;
    output_index: number;
    input_index: number;
};
export { Point, NodePoint, Offset, NodeConfig, NodeAttribute, BoardConfig, BoardState, LinkState };
