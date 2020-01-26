function startPathFinding(algorithm, heuristic) {
    if (pointStates[0] === 0 || pointStates[1] === 0) {
        return;
    }

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

    gameStatus = (path.path === null) ? -1 : 1;
    maxValue = (path.path === null) ? rowCount * colCount : path.totalVisitedNumber;
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
                s = { x: j, y: i };
                totalPointCount++;
            } else if (board[i][j] === Cell.end) {
                e = { x: j, y: i };
                totalPointCount++;
            }

            j++;
        }

        i++;
    }

    return [s, e]
}

function isOnBoard(nodePosition) {
    return !(nodePosition.y > (rowCount - 1) ||
        nodePosition.y < 0 ||
        nodePosition.x > (colCount  - 1) ||
        nodePosition.x < 0);
}

function isWalkable(nodePosition) {
    return board[nodePosition.y][nodePosition.x] !== Cell.obstacle;
}

function isValidMove(nodePosition) {
    return (isOnBoard(nodePosition) && isWalkable(nodePosition));
}

function isValidDiagonal(position, move) {
    let y = position.y;
    let x = position.x;
    let dy = move[1];
    let dx = move[0];

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

function clearPath() {
    let [s, e] = findTerminalNodes();

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (board[i][j] === Cell.path || board[i][j] >= 5) {
                board[i][j] = Cell.empty;
            }
        }
    }

    if (s !== undefined && e !== undefined) {
        board[s.y][s.x] = Cell.start;
        board[e.y][e.x] = Cell.end;
    }

    init();
    loop();
}

