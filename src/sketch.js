let board;
let rowCount;
let colCount;
let pointStates;
let visitedDrawingCompleted;
let lastVisitedNo;
let lastPathNo;
let cnv;
let currAlg;
let currHeuristic;
let currSpeed;
let path;
let gameStatus;
let maxValue;

function setup() {
    let navBar = document.getElementById('nav-bar');
    let navBarMarginBottom = parseInt(getComputedStyle(navBar).getPropertyValue('margin-bottom'));

    let h = windowHeight - navBar.offsetHeight - navBarMarginBottom;  // Subtract navigation bar height
    h = h - (h % r);    // Prevent overflow

    let w = windowWidth - navBarMarginBottom;
    w = w - (w % r);    // Prevent overflow

    cnv = createCanvas(w, h);
    cnv.style('display', 'block');
    cnv.parent('container');
    textAlign(CENTER, CENTER);

    rowCount = parseInt(h / r);
    colCount = parseInt(w / r);
    currAlg = Algorithms["A*"];
    currHeuristic = Heuristic['manhattan'];
    currSpeed = Speed['Fast'];

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
        let [s, e] = findTerminalNodes();

        board[s.y][s.x] = Cell.start;
        board[e.y][e.x] = Cell.end;

        drawGrid();
        drawBoard();
        drawVisited(path, maxValue, lastVisitedNo);
        lastVisitedNo += currSpeed;

        visitedDrawingCompleted = lastVisitedNo >= maxValue;

        if (visitedDrawingCompleted) {
            if (path.path !== null && lastPathNo >= path.path.length) {
                noLoop();
            }

            drawPath(path, lastPathNo);
            lastPathNo += currSpeed;
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
