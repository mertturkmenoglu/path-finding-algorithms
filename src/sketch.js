let board;
const r = 32;
let rowCount;
let colCount;
let statePoints;
let path;
let gameStatus;
let maxValue;
let visitedDrawingCompleted;
let lastVisitedNo;

function setup() {
    createCanvas(windowWidth, windowHeight - 16);

    rowCount = Math.floor((windowHeight - 16) / r);
    colCount = parseInt(windowWidth / r);

    textAlign(CENTER, CENTER);

    document.addEventListener('contextmenu', e => e.preventDefault());
    alert("Left click to add an object, right click to remove an object." +
        "\nPress 'S' to start path finding." +
        "\nPress 'R' to reset everything." +
        "\nPress 'D' to use Dijkstra algorithm." +
        "\nPress 'B' to use BFS algorithm." +
        "\nPress 'G' to generate maze." +
        "\nPress 'C' to clear path.");

    boardInit();
    init();
}

function boardInit() {
    board = new Array(rowCount);
    for (let i = 0; i < rowCount; i++) {
        board[i] = new Array(colCount).fill(0);
    }
    statePoints = [0, 0];
}

function init() {
    gameStatus = 0; // -1: No path 0: Continue 1: Path
    visitedDrawingCompleted = false;
    lastVisitedNo = 5;
    maxValue = rowCount * colCount;
    noStroke();
}

function draw() {
    clear();
    drawGrid();
    drawBoard();

    if (gameStatus !== 0) {
        clear();
        let p = findPoints();
        let s = p[0];
        let e = p[1];

        board[s[0]][s[1]] = 1;
        board[e[0]][e[1]] = 3;

        drawGrid();

        visitedDrawingCompleted = drawVisited();

        if (visitedDrawingCompleted) {
            drawPath();
            noLoop();
        }

        drawBoard();
    }
}

function drawVisited() {
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            let value = board[i][j];
            if (value < 5) {
                continue;
            }

            if (value <= lastVisitedNo) {
                let a = map(value, maxValue, 5, 255, 100);
                fill(30, a, a);
                rect(j * r, i * r, r - 1, r - 1);
            }
        }
    }

    lastVisitedNo++;

    return lastVisitedNo >= maxValue;
}

function drawPath() {
    if (path === null) {
        alert("No path");
        return;
    }
    stroke(228, 186, 34);
    strokeWeight(Math.sqrt(r));
    for (let i = 0; i < path.length-1; i++) {
        let currx = path[i][1] * r + (r / 2);
        let curry = path[i][0] * r + (r / 2);
        let nextx = path[i + 1][1] * r + (r / 2);
        let nexty = path[i + 1][0] * r + (r / 2);
        line(currx, curry, nextx, nexty);
    }
    noStroke();
    strokeWeight(1);
}

function drawGrid() {
    stroke(150);
    for (let i = 0; i <= rowCount; i++) {
        line(0, r * i, width, r * i);
    }

    for (let i = 0; i <= colCount; i++) {
        line(r * i, 0, r*i, height);
    }
    noStroke();
}

function drawBoard() {
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            let value = board[i][j];
            if (value === 1) { // Start
                fill(188, 16, 222);
                ellipse(j*r+(r/2), i*r+(r/2), r * 0.9, r * 0.9);
                fill(255);
                text("S", j*r+(r/2), i*r+(r/2))
            } else if (value === 2) { // Obstacle
                fill(100);
                rect(j*r, i*r, r-1, r-1);
            } else if (value === 3) { // End
                fill(222, 16, 50);
                ellipse(j*r+(r/2), i*r+(r/2), r * 0.9, r * 0.9);
                fill(255);
                text("E", j*r+(r/2), i*r+(r/2))
            }
        }
    }
}

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

function isOnBoard(nodePos) {
    return !(nodePos[0] > (rowCount - 1) ||
            nodePos[0] < 0 ||
            nodePos[1] > (colCount  - 1) ||
            nodePos[1] < 0);
}

function isWalkable(nodePos) {
    return board[nodePos[0]][nodePos[1]] !== 2;
}

function isValidMove(nodePos) {
    return (isOnBoard(nodePos) && isWalkable(nodePos));
}

function aStar(s, e, type) {
    let startNode = new GraphNode(type, null, s);
    let endNode = new GraphNode(type, null, e);
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

            let newNode = new GraphNode(type, currentNode, nodePos);
            newNode.updateValues(currentNode, endNode);
            neighbors.push(newNode);
        }

        for (let n of neighbors) {
            if (!n.isEqual(startNode) && !n.isEqual(endNode)) {
                let cp = n.pos;
                if (board[cp[0]][cp[1]] === 0) {
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
    let startNode = new GraphNode("", null, s);
    let endNode = new GraphNode("", null, e);
    let openList = [];
    let closedList = [];
    openList.push(startNode);
    let visitedNo = 5;

    while (openList.length > 0) {
        let currentNode = openList.shift();
        closedList.push(currentNode);

        // Find a path
        if (currentNode.isEqual(endNode)) {
            console.log("aaaaa");
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

            let newNode = new GraphNode("", currentNode, nodePos);
            neighbors.push(newNode);
        }

        for (let n of neighbors) {
            if (!n.isEqual(startNode) && !n.isEqual(endNode)) {
                let cp = n.pos;
                if (board[cp[0]][cp[1]] === 0) {
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
    resizeCanvas(window.innerWidth, window.innerHeight - 16);
    clearPath();
    boardInit();
    init();
    loop();
}

function startPathFinding(type) {
    if (statePoints[0] === 0 || statePoints[1] === 0) {
        alert("Please state start and end points");
    } else {
        let points = findPoints();
        if (type === "astar")
            path = aStar(points[0], points[1], "astar");
        else if (type === 'dijkstra')
            path = dijkstra(points[0], points[1]);
        else if (type === 'bfs')
            path = bfs(points[0], points[1]);

        if (path === null) {
            gameStatus = -1;
        } else {
            gameStatus = 1;
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
                    if (board[i][j] === 4 || board[i][j] >= 5) {
                        board[i][j] = 0;
                    }
                }
            }
        }
    }

    init();
    loop();
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
            board[i][j] = 2;
        }
    }

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j += 2) {
            board[i][j] = 2;
        }
    }

    // Choose point
    let sy = 1; //Math.floor(random(0, rowCount/2 - 1)) * 2 + 1;
    let sx = 1; //Math.floor(random(0, colCount/2 - 1)) * 2 + 1;

    board[sy][sx] = -1; // -1: Visited

    let stack = [];
    stack.push([sy, sx]);

    while (stack.length > 0) {
        let e = stack.pop();

        let neighbors = [];
        let moves = [[0, -2], [0, 2], [-2, 0], [2, 0]];

        for (let m of moves) {
            let nodePos = [e[0] + m[0], e[1] + m[1]];

            if (!isOnBoard(nodePos) || board[nodePos[0]][nodePos[1]] === -1) {
                continue;
            }

            neighbors.push(nodePos);
        }

        if (neighbors.length > 0) {
            stack.push(e);
            let randNeighbor = random(neighbors);

            if (randNeighbor[0] === e[0]) { // Same row
                if (randNeighbor[1] > e[1]) {
                    board[e[0]][e[1] + 1] = 0;
                } else {
                    board[e[0]][e[1] - 1] = 0;
                }
            } else { // Same column
                if (randNeighbor[0] > e[0]) {
                    board[e[0] + 1][e[1]] = 0;
                } else {
                    board[e[0] - 1][e[1]] = 0;
                }
            }

            board[randNeighbor[0]][randNeighbor[1]] = -1;
            stack.push(randNeighbor);
        }
    }

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (board[i][j] === -1) {
                board[i][j] = 0;
            }
        }
    }
}
