let board;
const w = 960;
const h = 640;
const r = 32;
const rowCount = 20;
const colCount = 30;
let statePoints;
let path;
let gameStatus;

function setup() {
    createCanvas(960, 640);
    board = new Array(rowCount);
    for (let i = 0; i < rowCount; i++) {
        board[i] = new Array(colCount).fill(0);
    }

    statePoints = [0, 0];
    gameStatus = 0; // -1: No path 0: Continue 1: Path
    textAlign(CENTER, CENTER);
}

function draw() {
    clear();
    drawTable();
    drawBoard();

    if (gameStatus !== 0) {
        if (gameStatus === -1) {
            alert("No path");
        } else {
            clear();
            let p = findPoints();
            let s = p[0];
            let e = p[1];

            for (let p of path) {
                board[p[0]][p[1]] = 4;
            }

            board[s[0]][s[1]] = 1;
            board[e[0]][e[1]] = 3;

            drawTable();
            drawBoard()
        }
        noLoop();
    }
}

function drawTable() {
    for (let i = 0; i <= rowCount; i++) {
        line(0, r * i, width, r * i);
    }

    for (let i = 0; i <= colCount; i++) {
        line(r * i, 0, r*i, height);
    }
}

function drawBoard() {
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            let value = board[i][j];
            if (value === 1) {
                fill(0, 255, 0);
                ellipse(j*r+(r/2), i*r+(r/2), r, r);
            } else if (value === 2) {
                fill(0);
                rect(j*r, i*r, r, r);
            } else if (value === 3) {
                fill(255, 0, 0);
                ellipse(j*r+(r/2), i*r+(r/2), r, r);
            } else if (value === 4) {
                fill(0, 0, 255);
                ellipse(j*r+(r/2), i*r+(r/2), r, r);
            }
        }
    }
}

function keyPressed() {
    if (key === 's' || key === 'S') {
        if (statePoints[0] === 0 || statePoints[1] === 0) {
            alert("Please state start and end points");
        } else {
            let points = findPoints();
            path = aStar(points[0], points[1]);
            if (path === null) {
                gameStatus = -1;
            } else {
                gameStatus = 1;
            }
        }
    }
}

function isValidMove(nodePos) {
    // Is it on board?
    if (nodePos[0] > (rowCount - 1) ||
        nodePos[0] < 0 ||
        nodePos[1] > (colCount  - 1) ||
        nodePos[1] < 0)

        return false;

    // Can we move here?
    return board[nodePos[0]][nodePos[1]] !== 2;
}

function aStar(s, e) {
    let startNode = new GraphNode(null, s);
    let endNode = new GraphNode(null, e);
    let openList = [];
    let closedList = [];

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
            return path.reverse();
        }

        let children = [];
        let moves = [[0, -1], [0, 1], [-1, 0], [1, 0]];

        for (let move of moves) {
            let nodePos = [currentNode.pos[0] + move[0], currentNode.pos[1] + move[1]];
            if (!isValidMove(nodePos)) {
                continue;
            }

            let newNode = new GraphNode(currentNode, nodePos);
            children.push(newNode);
        }

        for (let child of children) {
            if (child in closedList) {
                continue;
            }

            child.updateValues(currentNode, endNode);

            for (let i = 0; i < openList.length; i++) {
                if (child.isEqual(openList[i]) && child.g > openList[i].g) {
                    continue;
                }
            }

            openList.push(child)
        }
    }
    return null;
}

function findPoints() {
    let s;
    let e;

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (board[i][j] === 1) {
                s = [i, j];
            } else if (board[i][j] === 3) {
                e = [i, j];
            }
        }
    }

    return [s, e];
}

function mousePressed() {
    // Invalid clicks
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
        return;

    // Get row and column
    let i = parseInt(mouseY / r);
    let j = parseInt(mouseX / r);

    console.log(i, j);

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
}
