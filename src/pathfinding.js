let path;
let gameStatus;
let maxValue;

function startPathFinding(algorithm, heuristic) {
    if (pointStates[0] === 0 || pointStates[1] === 0) {
        alert("Please state start and end points");
    } else {
        let points = findPoints();
        if (algorithm === Algorithms["A*"])
            path = aStar(points[0], points[1], algorithm, heuristic);
        else if (algorithm === 'dijkstra')
            path = dijkstra(points[0], points[1]);
        else if (algorithm === 'bfs')
            path = bfs(points[0], points[1]);

        if (path === null) {
            gameStatus = -1;
        } else {
            gameStatus = 1;
        }
    }
}

function isOnBoard(nodePos) {
    return !(nodePos[0] > (rowCount - 1) ||
        nodePos[0] < 0 ||
        nodePos[1] > (colCount  - 1) ||
        nodePos[1] < 0);
}

function isWalkable(nodePos) {
    return board[nodePos[0]][nodePos[1]] !== Cell.obstacle;
}

function isValidMove(nodePos) {
    return (isOnBoard(nodePos) && isWalkable(nodePos));
}

function findPoints() {
    let s;
    let e;

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (board[i][j] === Cell.start) {
                s = [i, j];
            } else if (board[i][j] === Cell.end) {
                e = [i, j];
            }
        }
    }

    return [s, e];
}

function aStar(s, e, algorithm, h) {
    let startNode = new GraphNode(algorithm, h, null, s);
    let endNode = new GraphNode(algorithm, h, null, e);
    let openList = [];
    let closedList = [];
    let visitedNo = 5;

    openList.push(startNode);
    let loopCount = 0;
    const maxLoopCount = Math.pow(rowCount / 2 , 10);

    while (openList.length > 0 && loopCount < maxLoopCount) {
        loopCount++;
        let currentNode = openList[0];
        let currentIndex = 0;

        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < currentNode.f) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }

        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        // Find a path
        if (currentNode.isEqual(endNode)) {
            let path = [];
            let curr = currentNode;

            while (curr != null) {
                path.push(curr.pos);
                curr = curr.parent;
            }

            maxValue = visitedNo;
            return path.reverse();
        }

        let neighbors = [];
        let moves = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [-1, 1], [1, 1]];

        for (let m of moves) {
            let nodePos = [currentNode.pos[0] + m[0], currentNode.pos[1] + m[1]];

            if (!isValidMove(nodePos)) {
                continue;
            }

            let newNode = new GraphNode(algorithm, h, currentNode, nodePos);
            newNode.updateValues(currentNode, endNode);
            neighbors.push(newNode);
        }

        for (let n of neighbors) {
            if (!n.isEqual(startNode) && !n.isEqual(endNode)) {
                let cp = n.pos;
                if (board[cp[0]][cp[1]] === Cell.empty) {
                    board[cp[0]][cp[1]] = visitedNo;
                    visitedNo++;
                }
            }

            if (closedList.some(e => e.isEqual(n))) {
                continue;
            }

            let isInOpenList = openList.some(e => e.isEqual(n));

            if (!isInOpenList) {
                openList.push(n)
            } else {
                let index = openList.findIndex(e => e.isEqual(n));

                if (openList[index].f > n.f) {
                    openList[index] = n;
                }
            }
        }
    }

    return null;
}

function dijkstra(s, e) {
    return aStar(s, e, "dijkstra");
}

function bfs(s, e) {
    let startNode = new GraphNode(Algorithms.BFS, null,null, s);
    let endNode = new GraphNode(Algorithms.BFS, null,null, e);
    let openList = [];
    let closedList = [];
    openList.push(startNode);
    let visitedNo = 5;

    while (openList.length > 0) {
        let currentNode = openList.shift();
        closedList.push(currentNode);

        // Find a path
        if (currentNode.isEqual(endNode)) {
            let path = [];
            let curr = currentNode;

            while (curr != null) {
                path.push(curr.pos);
                curr = curr.parent;
            }

            maxValue = visitedNo;
            return path.reverse();
        }

        let neighbors = [];
        let moves = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [-1, 1], [1, 1]];

        for (let m of moves) {
            let nodePos = [currentNode.pos[0] + m[0], currentNode.pos[1] + m[1]];

            if (!isValidMove(nodePos)) {
                continue;
            }

            let newNode = new GraphNode(Algorithms.BFS, null, currentNode, nodePos);
            neighbors.push(newNode);
        }

        for (let n of neighbors) {
            if (!n.isEqual(startNode) && !n.isEqual(endNode)) {
                let cp = n.pos;
                if (board[cp[0]][cp[1]] === Cell.empty) {
                    board[cp[0]][cp[1]] = visitedNo;
                    visitedNo++;
                }
            }


            if (closedList.some(e => e.isEqual(n)) || openList.some(e => e.isEqual(n))) {
                continue;
            }

            n.parent = currentNode;
            openList.push(n);
        }
    }

    return null;
}

function generateMaze() {
    dfs();
}

function dfs() {
    boardInit();
    init();

    // Make walls
    for (let i = 0 ; i < rowCount; i += 2) {
        for (let j = 0; j < colCount; j++) {
            board[i][j] = Cell.obstacle;
        }
    }

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j += 2) {
            board[i][j] = Cell.obstacle;
        }
    }

    // Choose point
    let sy = 1;
    let sx = 1;

    board[sy][sx] = Cell.visited;

    let stack = [];
    stack.push([sy, sx]);

    while (stack.length > 0) {
        let e = stack.pop();

        let neighbors = [];
        let moves = [[0, -2], [0, 2], [-2, 0], [2, 0]];

        for (let m of moves) {
            let nodePos = [e[0] + m[0], e[1] + m[1]];

            if (!isOnBoard(nodePos) || board[nodePos[0]][nodePos[1]] === Cell.visited) {
                continue;
            }

            neighbors.push(nodePos);
        }

        if (neighbors.length > 0) {
            stack.push(e);
            let randNeighbor = random(neighbors);

            if (randNeighbor[0] === e[0]) { // Same row
                if (randNeighbor[1] > e[1]) {
                    board[e[0]][e[1] + 1] = Cell.empty;
                } else {
                    board[e[0]][e[1] - 1] = Cell.empty;
                }
            } else { // Same column
                if (randNeighbor[0] > e[0]) {
                    board[e[0] + 1][e[1]] = Cell.empty;
                } else {
                    board[e[0] - 1][e[1]] = Cell.empty;
                }
            }

            board[randNeighbor[0]][randNeighbor[1]] = Cell.visited;
            stack.push(randNeighbor);
        }
    }

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (board[i][j] === -1) {
                board[i][j] = Cell.empty;
            }
        }
    }
}

function clearPath() {
    let points = findPoints();
    let s = points[0];
    let e = points[1];

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (!(i === s[0] && j === s[1])) {
                if (!(i === e[0] && j === e[1])) {
                    if (board[i][j] === Cell.path || board[i][j] >= 5) {
                        board[i][j] = Cell.empty;
                    }
                }
            }
        }
    }

    init();
    loop();
}
