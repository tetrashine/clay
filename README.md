# Clay
A whiteboard developed for workflow linkage.

## Importing the library
Using pure javascript

``<script src="<path to stored javascript>/clay.js"></script>``

## Usage

### Clay
extends \<Evented\>

#### Methods
| Methods       | Returns       | Description   |
| ------------- | ------------- | ------------- |
| addNode(\<String\> title, \<NodeConfig\> node, \<Boolean\> selection)      | String          |  Goes into adding of node state. Returns id of node to be used for other functions. Title to display on screen, node representation during execution, selection to determine the location of node uses user selection. |
| export()      | State         |  Returns the current state of the board to be reimported back left off state.  |
| load(\<Configuration\> config, \<State\> state)      | Clay          | Generates the board based on the configuration and state |
| generate(\<String\> id, \<Configuration\> config, \<State\> state)      | Clay          | Generates the board on element (with the provided id) based on the configuration and state |
| setConfig(\<Configuration\> config)      | null          |  Set the current configuration of the board.  |
| setState(\<State\> state)                | Boolean       |  Set the current state of the board. Returns whether the state is correct.  |
| validate(\<State\> state)                | Boolean       |  Verify if the state is proper. |


#### Events
| Event       | Data       | Description   |
| ----------- | ---------- | ------------- |
| export      | State      | Fired when the export button is clicked. |

### NodeConfig
| Name       | Type          | Description           |
| ---------- | ------------- | --------------------- |
| type       | IoType        | Type of the node.     |
| inputs     | Array<IoType> | Array of input types. |
| outputs    | Array<IoType> | Array of output types |
  
#### IoType
Must be a string of value "string", "boolean", "integer", "function".

### Configuration
| Name       | Type       | Description   |
| ---------- | ---------- | ------------- |
| width      | Integer    | Width of the board. This should match the HTML DOM element's size. |
| height     | Integer    | Height of the board. This should match the HTML DOM element's size. |
| zoom       | Integer    | Set the default zoom level of the board. |
| editable   | Boolean    | Set whether the board allows editing, else it is view-only mode. Default value is true |
| zoomable   | Boolean    | Set whether the board allows zooming. Default value is true |
| colorize   | Boolean    | Set whether the board allows color customization. Default value is true |
| exportable | Boolean    | Set whether the board allows exporting. Default value is true |
| executable | Boolean    | Set whether the board allows user to run flow. Default value is true |
  
### State
| Name       | Type       | Description   |
| ---------- | ---------- | ------------- |
| ...        | ...        | ...           |
  
## To generate production files
`npm run prd`
