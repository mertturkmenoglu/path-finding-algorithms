let board;
const r = 32;
let rowCount;
let colCount;
let statePoints;
let visitedDrawingCompleted;
let lastVisitedNo;
let cnv;
let currAlg = 'astar';

function setup() {
    cnv = createCanvas(windowWidth, windowHeight - 64);
    cnv.style('display', 'block');
    textAlign(CENTER, CENTER);

    rowCount = parseInt(height / r);
    colCount = parseInt(width / r)+1;

    initDOM();
    boardInit();
    init();
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
        drawBoard();
        visitedDrawingCompleted = drawVisited();

        if (visitedDrawingCompleted) {
            drawPath();
            noLoop();
        }
    }
}

function boardInit() {
    board = new Array(rowCount);
    for (let i = 0; i < rowCount; i++) {
        board[i] = new Array(colCount+1).fill(0);
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

function giveInfo() {
    alert("Left click to add an object, right click to remove an object." +
        "\nPress 'S' to start path finding." +
        "\nPress 'R' to reset everything." +
        "\nPress 'D' to use Dijkstra algorithm." +
        "\nPress 'B' to use BFS algorithm." +
        "\nPress 'G' to generate maze." +
        "\nPress 'C' to clear path.");
}

function reset() {
    boardInit();
    init();
    loop();
}
