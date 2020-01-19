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
