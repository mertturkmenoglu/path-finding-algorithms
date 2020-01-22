let board;
const r = 32;
let rowCount;
let colCount;
let pointStates;
let visitedDrawingCompleted;
let lastVisitedNo;
let lastPathNo;
let cnv;
let currAlg;
let currHeuristic;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight - 64);
    cnv.style('display', 'block');
    textAlign(CENTER, CENTER);

    rowCount = parseInt(height / r);
    colCount = parseInt(width / r)+1;
    currAlg = Algorithms["A*"];
    currHeuristic = Heuristic['manhattan'];

    initDOM();
    boardInit();
    init();
}

function draw() {
    clear();
    drawGrid();
    drawBoard();

    if (gameStatus !== GameStatus.continue) {
        clear();
        let p = findPoints();
        let s = p[0];
        let e = p[1];

        board[s[0]][s[1]] = Cell.start;
        board[e[0]][e[1]] = Cell.end;

        drawGrid();
        drawBoard();
        visitedDrawingCompleted = drawVisited();

        if (visitedDrawingCompleted) {
            drawPath();
            if (lastPathNo >= path.length) {
                noLoop();
            }
        }
    }
}

function boardInit() {
    board = new Array(rowCount);
    for (let i = 0; i < rowCount; i++) {
        board[i] = new Array(colCount+1).fill(Cell.empty);
    }
    pointStates = [Cell.empty, Cell.empty];
}

function init() {
    gameStatus = GameStatus.continue;
    visitedDrawingCompleted = false;
    lastVisitedNo = 5;
    lastPathNo = 0;
    maxValue = rowCount * colCount;
    noStroke();
}

function reset() {
    boardInit();
    init();
    loop();
}
