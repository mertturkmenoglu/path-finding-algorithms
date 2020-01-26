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
                path.push(tmp.position);
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
            let newNodePosition = {
                x: currentNode.position.x + move[0],
                y: currentNode.position.y + move[1]
            };

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
            let newNodePosition = {
                x: currentNode.position.x + move[0],
                y: currentNode.position.y + move[1]
            };

            // First check borders, then check straight neighbors
            if (!isValidMove(newNodePosition) || !isValidDiagonal(currentNode.position, move)) {
                continue;
            }

            let newNode = new GraphNode(algorithm, heuristic, currentNode, newNodePosition);
            newNode.updateValues(currentNode, endNode);
            validNeighbors.push(newNode);
        }

        for (let neighbor of validNeighbors) {
            if (!neighbor.isEqual(startNode) && !neighbor.isEqual(endNode)) {
                let x = neighbor.position.x;
                let y = neighbor.position.y;
                if (board[y][x] === Cell.empty && !visitedCells.some(e => e.x === x && e.y === y)) {
                    visitedCells.push({
                        x: neighbor.position.x,
                        y: neighbor.position.y,
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
    return {
        path: null,
        visited: visitedCells,
        totalVisitedNumber: visitedNo
    };
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
                path.push(tmp.position);
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
            let newNodePosition = {
                x: currentNode.position.x + move[0],
                y: currentNode.position.y + move[1]
            };

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
            let newNodePosition = {
                x: currentNode.position.x + move[0],
                y: currentNode.position.y + move[1]
            };

            // First check borders, then check straight neighbors
            if (!isValidMove(newNodePosition) || !isValidDiagonal(currentNode.position, move)) {
                continue;
            }

            let newNode = new GraphNode(Algorithms.BFS, null, currentNode, newNodePosition);
            validNeighbors.push(newNode);
        }

        for (let neighbor of validNeighbors) {
            if (!neighbor.isEqual(startNode) && !neighbor.isEqual(endNode)) {
                let x = neighbor.position.x;
                let y = neighbor.position.y;
                if (board[y][x] === Cell.empty && !visitedCells.some(e => e.x === x && e.y === y)) {
                    visitedCells.push({
                        x: neighbor.position.x,
                        y: neighbor.position.y,
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
    return {
        path: null,
        visited: visitedCells,
        totalVisitedNumber: visitedNo
    };
}
