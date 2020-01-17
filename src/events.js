function keyPressed() {
    if (key === 's' || key === 'S') {
        startPathFinding("astar");
    }

    if (key === 'd' || key === 'D') {
        startPathFinding("dijkstra");
    }

    if (key === 'b' || key === 'B') {
        startPathFinding('bfs');
    }

    if (key === 'c' || key === 'C') {
        clearPath();
    }

    if (key === 'r' || key === 'R') {
        boardInit();
        init();
        loop();
    }

    if (key === 'g' || key === 'G') {
        generateMaze();
    }
}

function mousePressed() {
    if (gameStatus !== 0)
        return;
    // Invalid clicks
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
        return;

    // Get row and column
    let i = parseInt(mouseY / r);
    let j = parseInt(mouseX / r);

    // Empty: 0
    // Start: 1
    // Obstacle: 2
    // End: 3

    // LEFT: Add object
    if (mouseButton === LEFT) {
        // Check if the cell is empty
        if (board[i][j] === 0) {
            if (statePoints[0] === 0) {
                board[i][j] = 1;
                statePoints[0] = 1;
            } else if (statePoints[1] === 0) {
                board[i][j] = 3;
                statePoints[1] = 1;
            } else {
                board[i][j] = 2;
            }
        }
    } else if (mouseButton === RIGHT) {
        // RIGHT: Remove object

        // Check if the cell is start
        if (board[i][j] === 1) {
            board[i][j] = 0;
            statePoints[0] = 0;
        } else if (board[i][j] === 3) {
            board[i][j] = 0;
            statePoints[1] = 0;
        } else if (board[i][j] === 2) {
            board[i][j] = 0;
        }
    }

    return false
}

function mouseDragged() {
    mousePressed();
    return false;
}

function windowResized() {
    setup();
    clearPath();
    boardInit();
    init();
    loop();
}
