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
    if (gameStatus !== GameStatus.continue)
        return;
    // Invalid clicks
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
        return;

    // Get row and column
    let i = parseInt(mouseY / r);
    let j = parseInt(mouseX / r);

    if (mouseButton === LEFT) { // LEFT: Add object
        if (board[i][j] === Cell.empty) {
            if (statePoints[0] === 0) {
                board[i][j] = Cell.start;
                statePoints[0] = 1;
            } else if (statePoints[1] === 0) {
                board[i][j] = Cell.end;
                statePoints[1] = 1;
            } else {
                board[i][j] = Cell.obstacle;
            }
        }
    } else if (mouseButton === RIGHT) { // RIGHT: Remove object
        if (board[i][j] === Cell.start) {
            board[i][j] = 0;
            statePoints[0] = Cell.empty;
        } else if (board[i][j] === Cell.end) {
            board[i][j] = Cell.empty;
            statePoints[1] = 0;
        } else if (board[i][j] === 2) {
            board[i][j] = Cell.empty;
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
