
import { expect } from '@jest/globals';
import Clay from '../src/clay'

describe('Clay', () => {
  
  test('load', () => {
    document.body.innerHTML = `<div id="board"></div>`;
    const state = {
      "title": '', "nodes": [], "links": []
    };

    const clay = new Clay('board', {
      width: 100, height: 100,
      editable: false, 
      zoomable: false, 
      colorize: false, 
      exportable: false,
      executable: false,
    }, state);

    expect(document.getElementById('node')).toBeNull();
    expect(document.getElementById('link')).toBeNull();
    expect(document.getElementById('undo')).toBeNull();
    expect(document.getElementById('redo')).toBeNull();
    expect(document.getElementById('unselect')).toBeNull();
    expect(document.getElementById('delete')).toBeNull();
    expect(document.getElementById('zoomIn')).toBeNull();
    expect(document.getElementById('zoomOut')).toBeNull();
    expect(document.getElementById('fill')).toBeNull();
    expect(document.getElementById('fontColor')).toBeNull();
    expect(document.getElementById('export')).toBeNull();
    expect(document.getElementById('play')).toBeNull();
    expect(document.getElementById('stop')).toBeNull();

    clay.load({
      width: 100, height: 100,
      editable: true, 
      zoomable: true, 
      colorize: true, 
      exportable: true,
      executable: true,
    }, state);

    expect(document.getElementById('node')).toBeDefined();
    expect(document.getElementById('link')).toBeDefined();
    expect(document.getElementById('undo')).toBeDefined();
    expect(document.getElementById('redo')).toBeDefined();
    expect(document.getElementById('unselect')).toBeDefined();
    expect(document.getElementById('delete')).toBeDefined();
    expect(document.getElementById('zoomIn')).toBeDefined();
    expect(document.getElementById('zoomOut')).toBeDefined();
    expect(document.getElementById('fill')).toBeDefined();
    expect(document.getElementById('fontColor')).toBeDefined();
    expect(document.getElementById('export')).toBeDefined();
    expect(document.getElementById('play')).toBeDefined();
    expect(document.getElementById('stop')).toBeDefined();
  });

  test('loadState', () => {
    document.body.innerHTML = `<div id="board"></div>`;
    const emptyState = {
      "title": '', "nodes": [], "links": []
    };
    const state = {
      "title": "Demo Board",
      "editable": true,
      "nodes": [{
        "title": "Hello World 123 123",
        "description": "", 
        "editable": true,
        "x":50,
        "y":50,
        "inputs": [],
        "outputs": ["string"],
        "attrs": []
      }, {
        "title": "Goal",
        "description":"",
        "editable": true,
        "x":150,
        "y":150,
        "inputs": [],
        "outputs": ["string"],
        "attrs": [],
      },{
        "title":"5",
        "description":"",
        "editable": true,
        "x":88,
        "y":255,
        "inputs": [],
        "outputs": ["integer"],
        "attrs": [],
      },{
        "title":"6",
        "description":"",
        "editable": true,
        "x":89,
        "y":317,
        "inputs": [],
        "outputs": ["integer"],
        "attrs": [],
      },{
        "title":"Add",
        "description":"",
        "editable": true,
        "x":236,
        "y":279,
        "inputs": ["integer", "integer"],
        "outputs": ["integer"],
        "attrs": [{
          "name": "hi",
          "value": "123",
        }],
      }],
      "links":[{
        "dotted": false,
        "editable": true,
        "input_index": 1,
        "mode": "elbow",
        "output_index": 1,
        "src": 2,
        "target": 4,
        "type": "regular",
      }, {
        "dotted": false,
        "editable": true,
        "input_index": 2,
        "mode": "elbow",
        "output_index": 1,
        "src": 3,
        "target": 4,
        "type": "regular"
      }]
    };
    const clay = new Clay('board', {
      width: 100, 
      height: 100,
    }, state);

    expect(clay.nodeCount).toEqual(5);
    expect(clay.linkCount).toEqual(2);

    clay.loadState(emptyState);

    expect(clay.nodeCount).toEqual(0);
    expect(clay.linkCount).toEqual(0);
  });

  test('validate', () => {
    const minimum = {
      "title": "",
      "nodes": [],
      "links":[]
    };

    expect(Clay.validate(minimum)).toBe(true);

    const fail1 = { "title": "", "nodes": [] };
    const fail2 = { "title": "", "links":[] };
    const fail3 = { "nodes": [] , "links": [] };
    const fail4 = { "title": 1, "nodes": 1, "links": 1 };

    expect(Clay.validate(fail1)).toBe(false);
    expect(Clay.validate(fail2)).toBe(false);
    expect(Clay.validate(fail3)).toBe(false);
    expect(Clay.validate(fail4)).toBe(false);
  });

  test('export', () => {
    document.body.innerHTML = `<div id="board"></div>`;
    const state = {
      "title": "Demo Board",
      "editable": true,
      "nodes": [{
        "title": "Hello World 123 123",
        "description": "", 
        "editable": true,
        "x":50,
        "y":50,
        "inputs": [],
        "outputs": ["string"],
        "attrs": []
      }, {
        "title": "Goal",
        "description":"",
        "editable": true,
        "x":150,
        "y":150,
        "inputs": [],
        "outputs": ["string"],
        "attrs": [],
      },{
        "title":"5",
        "description":"",
        "editable": true,
        "x":88,
        "y":255,
        "inputs": [],
        "outputs": ["integer"],
        "attrs": [],
      },{
        "title":"6",
        "description":"",
        "editable": true,
        "x":89,
        "y":317,
        "inputs": [],
        "outputs": ["integer"],
        "attrs": [],
      },{
        "title":"Add",
        "description":"",
        "editable": true,
        "x":236,
        "y":279,
        "inputs": ["integer", "integer"],
        "outputs": ["integer"],
        "attrs": [{
          "name": "hi",
          "value": "123",
        }],
      }],
      "links":[{
        "dotted": false,
        "editable": true,
        "input_index": 1,
        "mode": "elbow",
        "output_index": 1,
        "src": 2,
        "target": 4,
        "type": "regular",
      }, {
        "dotted": false,
        "editable": true,
        "input_index": 2,
        "mode": "elbow",
        "output_index": 1,
        "src": 3,
        "target": 4,
        "type": "regular"
      }]
    };
    const clay = new Clay('board', {
      width: 100, 
      height: 100,
    }, state);

    expect(state).toEqual(clay.export());
  });

  test('addLink', () => {
    document.body.innerHTML = `<div id="board"></div>`;
    const state = {
      "title": "Demo Board",
      "editable": true,
      "nodes": [{
        "title": "Hello World 123 123",
        "description": "", 
        "editable": true,
        "x":50,
        "y":50,
        "inputs": [],
        "outputs": ["string"],
        "attrs": []
      }, {
        "title": "Goal",
        "description":"",
        "editable": true,
        "x":150,
        "y":150,
        "inputs": [],
        "outputs": ["string"],
        "attrs": [],
      },{
        "title":"5",
        "description":"",
        "editable": true,
        "x":88,
        "y":255,
        "inputs": [],
        "outputs": ["integer"],
        "attrs": [],
      },{
        "title":"6",
        "description":"",
        "editable": true,
        "x":89,
        "y":317,
        "inputs": [],
        "outputs": ["integer"],
        "attrs": [],
      },{
        "title":"Add",
        "description":"",
        "editable": true,
        "x":236,
        "y":279,
        "inputs": ["integer", "integer"],
        "outputs": ["integer"],
        "attrs": [{
          "name": "hi",
          "value": "123",
        }],
      }],
      "links":[]
    };

    const clay = new Clay('board', {
      width: 100, height: 100,
      editable: false, 
      zoomable: false, 
      colorize: false, 
      exportable: false,
      executable: false,
    }, state);

    const success = clay.addLink({
      "dotted": false,
      "editable": true,
      "input_index": 1,
      "mode": "elbow",
      "output_index": 1,
      "src": 2,
      "target": 4,
      "type": "regular",
    });

    expect(success).toEqual(true);
    expect(clay.linkCount).toEqual(1);

    const fail = clay.addLink({});

    expect(fail).toEqual(false);
    expect(clay.linkCount).toEqual(1);
  });

  test('addNode', () => {
    document.body.innerHTML = `<div id="board"></div>`;
    const state = {
      "title": '', "nodes": [], "links": []
    };

    const clay = new Clay('board', {
      width: 100, height: 100,
      editable: false, 
      zoomable: false, 
      colorize: false, 
      exportable: false,
      executable: false,
    }, state);

    expect(clay.nodeCount).toEqual(0);

    const success = clay.addNode({
      "title": "Hello World 123 123",
      "description": "", 
      "editable": true,
      "x":50,
      "y":50,
      "inputs": [],
      "outputs": ["string"],
      "attrs": []
    })

    expect(success).toEqual(true);
    expect(clay.nodeCount).toEqual(1);

    const fail = clay.addNode({})

    expect(fail).toEqual(false);
    expect(clay.nodeCount).toEqual(1);
  });

});

describe('Node', () => {

});

describe('Link', () => {

});