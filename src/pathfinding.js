let path;
let gameStatus;
let maxValue;

function startPathFinding(algorithm, heuristic) {
    if (pointStates[0] === 0 || pointStates[1] === 0) {
        alert("Please state start and end points");
    } else {
        let [startNode, endNode] = findTerminalNodes();

        switch (algorithm) {
            case Algorithms['A*']:
                path = aStar(startNode, endNode, algorithm, heuristic);
                break;
            case Algorithms['Dijkstra']:
                path = dijkstra(startNode, endNode);
                break;
            case Algorithms['BFS']:
                path = bfs(startNode, endNode);
                break;
        }

        gameStatus = (path === null) ? -1 : 1;
        maxValue = (path === null) ? rowCount * colCount : path.totalVisitedNumber;
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

function isValidDiagonal(pos, m) {
    let y = pos[0];
    let x = pos[1];
    let dy = m[0];
    let dx = m[1];

    if (dx === -1) { // On LHS
        if (dy === -1) { // TOP LEFT
            return !(board[y][x-1] === Cell.obstacle && board[y-1][x] === Cell.obstacle);
        } else { // BOTTOM LEFT
            return !(board[y][x-1] === Cell.obstacle && board[y+1][x] === Cell.obstacle);
        }
    } else { // On RHS
        if (dy === -1) { // TOP RIGHT
            return !(board[y-1][x] === Cell.obstacle && board[y][x+1] === Cell.obstacle);
        } else { // BOTTOM RIGHT
            return !(board[y+1][x] === Cell.obstacle && board[y][x+1] === Cell.obstacle);
        }
    }
}

function findTerminalNodes() {
    let s;
    let e;
    let totalPointCount = 0;
    let i = 0;
    let j = 0;

    while ( i < rowCount && totalPointCount < 2 ) {
        j = 0;
        while ( j < colCount && totalPointCount < 2 ) {
            if (board[i][j] === Cell.start) {
                s = [i, j];
                totalPointCount++;
            } else if (board[i][j] === Cell.end) {
                e = [i, j];
                totalPointCount++;
            }

            j++;
        }

        i++;
    }

    return [s, e]
}

function aStar(start, end, algorithm, heuristic) {
    let startNode = new GraphNode(algorithm, heuristic, null, start);
    let endNode = new GraphNode(algorithm, heuristic, null, end);

    let visitedNo = 5;
    let loopCount = 0;
    const maxLoopCount = Math.pow(rowCount / 2 , 10);

    let openList = [];
    let closedList = [];
    let visitedCells = [];
    openList.push(startNode);

    while (openList.length > 0 && loopCount < maxLoopCount) {
        loopCount++;

        // Find minimum cost node
        let currentNode = openList[0];
        let currentIndex = 0;

        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < currentNode.f) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }

        // Remove it from open list and add it to closed list
        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        // If current node and end node is equal, then there is a path
        // Backtrace the path and return a position array
        if (currentNode.isEqual(endNode)) {
            let path = [];
            let tmp = currentNode;

            while (tmp != null) {
                path.push(tmp.pos);
                tmp = tmp.parent;
            }

            return {
                path: path.reverse(),
                visited: visitedCells,
                totalVisitedNumber: visitedNo
            };
        }

        let validNeighbors = [];
        let straightMoves = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        let diagonalMoves = [[-1, -1], [1, -1], [-1, 1], [1, 1]];

        // Check every straight move. If it is a valid move, then create a node
        // and add the node to valid neighbors list.
        for (let move of straightMoves) {
            let newNodePosition = [currentNode.pos[0] + move[0], currentNode.pos[1] + move[1]];

            if (!isValidMove(newNodePosition)) {
                continue;
            }

            let newNode = new GraphNode(algorithm, heuristic, currentNode, newNodePosition);
            newNode.updateValues(currentNode, endNode);
            validNeighbors.push(newNode);
        }

        // Check every diagonal move. If it is a valid move, then create a node
        // and add the node to valid neighbors list.
        // Note: If diagonal allowed / not allowed option will be added to program,
        // this loop must be inside of a if block.
        for (let move of diagonalMoves) {
            let newNodePosition = [currentNode.pos[0] + move[0], currentNode.pos[1] + move[1]];

            // First check borders, then check straight neighbors
            if (!isValidMove(newNodePosition) || !isValidDiagonal(currentNode.pos, move)) {
                continue;
            }

            let newNode = new GraphNode(algorithm, heuristic, currentNode, newNodePosition);
            newNode.updateValues(currentNode, endNode);
            validNeighbors.push(newNode);
        }

        for (let neighbor of validNeighbors) {
            if (!neighbor.isEqual(startNode) && !neighbor.isEqual(endNode)) {
                let x = neighbor.pos[1];
                let y = neighbor.pos[0];
                if (board[y][x] === Cell.empty && !visitedCells.some(e => e.x === x && e.y === y)) {
                    visitedCells.push({
                        x: neighbor.pos[1],
                        y: neighbor.pos[0],
                        number: visitedNo
                    });
                    visitedNo++;
                }
            }

            // If it is already visited, continue
            if (closedList.some(e => e.isEqual(neighbor))) {
                continue;
            }

            let isInOpenList = openList.some(e => e.isEqual(neighbor));

            // If it is not in the open list, add it
            // If it is in the open list, then update the cost and path
            if (!isInOpenList) {
                openList.push(neighbor)
            } else {
                let index = openList.findIndex(e => e.isEqual(neighbor));

                if (openList[index].f > neighbor.f) {
                    openList[index] = neighbor;
                }
            }
        }
    }

    // No path found
    return null;
}

function dijkstra(start, end) {
    return aStar(start, end, Algorithms.Dijkstra, null);
}

function bfs(start, end) {
    let startNode = new GraphNode(Algorithms.BFS, null,null, start);
    let endNode = new GraphNode(Algorithms.BFS, null,null, end);

    let visitedNo = 5;

    let openList = [];
    let closedList = [];
    let visitedCells = [];
    openList.push(startNode);

    while (openList.length > 0) {
        // Take the first item from the open list and add it to the closed list
        let currentNode = openList.shift();
        closedList.push(currentNode);

        // If current node and end node is equal, then there is a path
        // Backtrace the path and return a position array
        if (currentNode.isEqual(endNode)) {
            let path = [];
            let tmp = currentNode;

            while (tmp != null) {
                path.push(tmp.pos);
                tmp = tmp.parent;
            }

            return {
                path: path.reverse(),
                visited: visitedCells,
                totalVisitedNumber: visitedNo
            };
        }

        let validNeighbors = [];
        let straightMoves = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        let diagonalMoves = [[-1, -1], [1, -1], [-1, 1], [1, 1]];

        // Check every straight move. If it is a valid move, then create a node
        // and add the node to valid neighbors list.
        for (let move of straightMoves) {
            let newNodePosition = [currentNode.pos[0] + move[0], currentNode.pos[1] + move[1]];

            if (!isValidMove(newNodePosition)) {
                continue;
            }

            let newNode = new GraphNode(Algorithms.BFS, null, currentNode, newNodePosition);
            validNeighbors.push(newNode);
        }

        // Check every diagonal move. If it is a valid move, then create a node
        // and add the node to valid neighbors list.
        // Note: If diagonal allowed / not allowed option will be added to program,
        // this loop must be inside of a if block.
        for (let move of diagonalMoves) {
            let newNodePosition = [currentNode.pos[0] + move[0], currentNode.pos[1] + move[1]];

            // First check borders, then check straight neighbors
            if (!isValidMove(newNodePosition) || !isValidDiagonal(currentNode.pos, move)) {
                continue;
            }

            let newNode = new GraphNode(Algorithms.BFS, null, currentNode, newNodePosition);
            validNeighbors.push(newNode);
        }

        for (let neighbor of validNeighbors) {
            if (!neighbor.isEqual(startNode) && !neighbor.isEqual(endNode)) {
                let x = neighbor.pos[1];
                let y = neighbor.pos[0];
                if (board[y][x] === Cell.empty && !visitedCells.some(e => e.x === x && e.y === y)) {
                    visitedCells.push({
                        x: neighbor.pos[1],
                        y: neighbor.pos[0],
                        number: visitedNo
                    });
                    visitedNo++;
                }
            }

            // If it is already in closed list or open list, continue
            if (closedList.some(e => e.isEqual(neighbor)) || openList.some(e => e.isEqual(neighbor))) {
                continue;
            }

            neighbor.parent = currentNode;
            openList.push(neighbor);
        }
    }

    // No path
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

    // Choose start point
    let sy = 1;
    let sx = 1;

    board[sy][sx] = Cell.visited;

    let stack = [];
    stack.push([sy, sx]);

    while (stack.length > 0) {
        let current = stack.pop();

        let validNeighbors = [];
        let straightMoves = [[0, -2], [0, 2], [-2, 0], [2, 0]];

        for (let move of straightMoves) {
            let newNodePosition = [current[0] + move[0], current[1] + move[1]];

            if (!isOnBoard(newNodePosition) || board[newNodePosition[0]][newNodePosition[1]] === Cell.visited) {
                continue;
            }

            validNeighbors.push(newNodePosition);
        }

        // If we have available neighbor(s), we choose a random neighbor
        // and remove the wall(obstacle cell) between these two cell.
        if (validNeighbors.length > 0) {
            stack.push(current);
            let randNeighbor = random(validNeighbors);

            if (randNeighbor[0] === current[0]) { // Same row
                if (randNeighbor[1] > current[1]) {
                    board[current[0]][current[1] + 1] = Cell.empty;
                } else {
                    board[current[0]][current[1] - 1] = Cell.empty;
                }
            } else { // Same column
                if (randNeighbor[0] > current[0]) {
                    board[current[0] + 1][current[1]] = Cell.empty;
                } else {
                    board[current[0] - 1][current[1]] = Cell.empty;
                }
            }

            board[randNeighbor[0]][randNeighbor[1]] = Cell.visited;
            stack.push(randNeighbor);
        }
    }

    // Cells were marked as visited. Mark them as empty again.
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (board[i][j] === -1) {
                board[i][j] = Cell.empty;
            }
        }
    }
}

function clearPath() {
    let points = findTerminalNodes();
    let s = points[0];
    let e = points[1];

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (board[i][j] === Cell.path || board[i][j] >= 5) {
                board[i][j] = Cell.empty;
            }
        }
    }

    if (s !== undefined && e !== undefined) {
        board[s[0]][s[1]] = Cell.start;
        board[e[0]][e[1]] = Cell.end;
    }

    init();
    loop();
}
