type Point = { x: number, y: number };
type NodePoint = Point & { side: string };
type Offset = { left: number, top: number };

type NodeAttribute = {
  "name": string,
  "value": string,
}

type NodeConfig = {
  editable: boolean,
  x: number, 
  y: number, 
  title: string,

  inputs: string[],
  outputs: string[]
  
  description?: string,
  attrs?: NodeAttribute[],
  color?: string,
  width?: number,
  height?: number
  fontSize?: number,
  fontColor?: string
};

type BoardConfig = {
  width: number, 
  height: number,
  zoom: number,
  editable: boolean,
  zoomable: boolean,
  colorize: boolean,
  exportable: boolean,
  executable: boolean
};

type BoardState = {
  title: string,
  docks: DockState[],
  nodes: NodeConfig[],
  links: LinkState[],

  editable?: boolean
};

type LinkState = {
  type: string,
  dotted: boolean,
  mode: string,
  editable: boolean,

  src: number,
  target: number,
  output_index: number,
  input_index: number
};

type DockState = {
  width?: number, 
  height?: number,
  editable: boolean,
  x: number, 
  y: number, 
  title: string,
  nodes: number[],
  color?: string,
};

export {
  Point,
  NodePoint,
  Offset,
  NodeConfig,
  NodeAttribute,
  BoardConfig,
  BoardState,
  LinkState,
  DockState
};