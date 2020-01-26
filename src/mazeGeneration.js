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
    stack.push( { x: sx, y: sy } );

    while (stack.length > 0) {
        let current = stack.pop();

        let validNeighbors = [];
        let straightMoves = [[0, -2], [0, 2], [-2, 0], [2, 0]];

        for (let move of straightMoves) {
            let newNodePosition = {
                x: current.x + move[0],
                y: current.y + move[1]
            };

            if (!isOnBoard(newNodePosition) || board[newNodePosition.y][newNodePosition.x] === Cell.visited) {
                continue;
            }

            validNeighbors.push(newNodePosition);
        }

        // If we have available neighbor(s), we choose a random neighbor
        // and remove the wall(obstacle cell) between these two cell.
        if (validNeighbors.length > 0) {
            stack.push(current);
            let randNeighbor = random(validNeighbors);

            if (randNeighbor.y === current.y) { // Same row
                if (randNeighbor.x > current.x) {
                    board[current.y][current.x + 1] = Cell.empty;
                } else {
                    board[current.y][current.x - 1] = Cell.empty;
                }
            } else { // Same column
                if (randNeighbor.y > current.y) {
                    board[current.y + 1][current.x] = Cell.empty;
                } else {
                    board[current.y - 1][current.x] = Cell.empty;
                }
            }

            board[randNeighbor.y][randNeighbor.x] = Cell.visited;
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
