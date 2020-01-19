function keyPressed() {
    switch (key.toLowerCase()) {
        case 's':
            startPathFinding(Algorithms["A*"], currHeuristic);
            break;
        case 'd':
            startPathFinding(Algorithms.Dijkstra, currHeuristic);
            break;
        case 'b':
            startPathFinding(Algorithms.BFS, currHeuristic);
            break;
        case 'c':
            clearPath();
            break;
        case 'r':
            reset();
            break;
        case 'g':
            generateMaze();
            break;
        default:
            break;
    }
}

function mousePressed() {
    /**
     * If game stopped, then mouse clicks are invalid.
     */
    if (gameStatus !== GameStatus.continue)
        return;

    /**
     * Mouse clicks out of canvas range are invalid
     */
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
        return;

    /**
     * All mouse clicks at this point are valid and in a cell. Get cell row and column number
     */
    // Get row and column
    let i = parseInt(mouseY / r);
    let j = parseInt(mouseX / r);

    /**
     * Action depends on mouse button. Left mouse click will try to add an object, right mouse click will try to remove
     * and object. Other type of mouse button clicks are invalid(no care).
     */
    if (mouseButton === LEFT) {
        /**
         * User can add an object to an empty cell only. If the cell is not empty(obstacle, path object, start / end point),
         * then click is not valid.
         */
        if (board[i][j] === Cell.empty) {
            /**
             * If start point does not exist, it should add the start point.
             * Else, if end point does not exist, it should add the end point.
             * Else, it should add an obstacle.
             */
            if (pointStates[0] === Cell.empty) {
                board[i][j] = Cell.start;
                pointStates[0] = 1;
            } else if (pointStates[1] === 0) {
                board[i][j] = Cell.end;
                pointStates[1] = 1;
            } else {
                board[i][j] = Cell.obstacle;
            }
        }
    } else if (mouseButton === RIGHT) {
        /**
         * User can remove an object from a non-empty cell only. If the cell is empty, click is not valid.
         * If the cell contains the start point, remove it and set it's state to empty(false).
         * If the cell contains the end point, remove it and set it's state to empty(false).
         * If the cell contains an obstacle, remove it.
         */
        if (board[i][j] === Cell.start) {
            board[i][j] = Cell.empty;
            pointStates[0] = Cell.empty;
        } else if (board[i][j] === Cell.end) {
            board[i][j] = Cell.empty;
            pointStates[1] = Cell.empty;
        } else if (board[i][j] === Cell.obstacle) {
            board[i][j] = Cell.empty;
        }
    }

    /**
     * Prevent default behavior.
     * (Like right mouse click opens context menu)
     */
    return false
}

function mouseDragged() {
    /**
     * Mouse drag will speed up the things.
     * Mouse drag and mouse click does the exact same job.
     */
    mousePressed();

    /**
     * Prevent default behavior.
     */
    return false;
}

function windowResized() {
    /**
     * On windows resize event, every value becomes invalid.
     * Everything needs to be recalculated.
     */
    setup();
    clearPath();
    boardInit();
    init();

    loop();
}
