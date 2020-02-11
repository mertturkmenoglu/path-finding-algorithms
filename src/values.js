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

const Speed = Object.freeze({
   'Fast': 3,
   'Normal': 1,
   'Slow': 0.5
});

const NodeType = Object.freeze({
    'dijkstra': 0,
    'a*': 1,
    'other': 2
});

const gridRadius = 32;
const r = gridRadius; // Short name
const snackbarTimeoutShort = 3000;
const snackbarTimeoutLong = 5000;
const COLOR_BLACK = 0;
const gridLineStrokeWeight = 1.5;
const gridTextSize = gridRadius * 0.75;

const pathLineRadius = Math.sqrt(r);
const helpButtonText = "Welcome to Path Finding Visualization\n" +
    "You can find the shortest path between start(S) and end(E) points.\n" +
    "Left click will add an object and right click will remove.\n" +
    "You can choose your algorithm from top left corner.\n" +
    "You can generate maze, remove all objects, remove path finding from top right corner.\n" +
    "When you are ready, press 'Start' button.\n" +
    "You can access this menu by clicking 'Help' button";

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
