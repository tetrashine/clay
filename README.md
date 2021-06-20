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
| generate(\<String\> id, \<Configuration\> config, \<JSON\> state)      | Clay          | Generates the board based on the configuration. |
| export()      | JSON          |  Returns the current state of the board to be reimported back left off state.  |

#### Events
| Event       | Data       | Description   |
| ----------- | ---------- | ------------- |
| export      | JSON       | Fired when the export button is clicked. |

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
  
## To generate production files
`npm run prd`
