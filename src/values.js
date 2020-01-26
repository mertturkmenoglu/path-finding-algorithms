const Algorithms = Object.freeze({
    'A*': 'astar',
    'Dijkstra': 'dijkstra',
    'BFS': 'bfs'
});

const GameStatus = Object.freeze({
    'noPath': -1,
    'continue': 0,
    'path': 1
});

const Cell = Object.freeze({
    'visited': -1,
   'empty': 0,
   'start': 1,
   'obstacle': 2,
   'end': 3,
    'path': 4,
});

const Heuristic = Object.freeze({
    'Manhattan': 0,
    'Euclidean': 1
});

const NodeType = Object.freeze({
    'dijkstra': 0,
    'a*': 1,
    'other': 2
});

const gridRadius = 32;
const r = gridRadius; // Short name
const drawSpeed = 3;
const snackbarTimeoutShort = 3000;
const snackbarTimeoutLong = 5000;
const COLOR_BLACK = 0;
const gridLineStrokeWeight = 1.5;
const gridTextSize = gridRadius * 0.75;

const pathLineRadius = Math.sqrt(r);
const helpButtonText = "Left click to add an object, right click to remove an object." +
    "When you are ready, press 'Start'.";

const startCellColor = Object.freeze({
    r:  188,
    g: 16,
    b: 222
});

const obstacleCellColor = Object.freeze({
   value: 100
});

const endCellColor = Object.freeze({
   r: 222,
   g: 16,
   b:50
});

const pathCellColor = Object.freeze({
    r: 30,
    g: undefined,
    b: undefined
});

const pathLineColor = Object.freeze({
   r: 228,
   g: 186,
   b: 34
});
