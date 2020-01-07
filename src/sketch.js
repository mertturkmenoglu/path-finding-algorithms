let board;
const w = 960;
const h = 640;
const r = 16;
const rowCount = 40;
const colCount = 60;
let pointCounter;

function setup() {
    createCanvas(960, 640);
    board = new Array(rowCount);
    for (let i = 0; i < rowCount; i++) {
        board[i] = new Array(colCount).fill(0);
    }

    pointCounter = 0;
    textAlign(CENTER, CENTER);
}

function draw() {
    clear();
    drawTable();
    drawBoard();
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
            }
        }
    }
}

function keyPressed() {
    if (key === 's' || key === 'S') {
        if (pointCounter !== 2) {
            alert("Please state start and end points");
        } else {
            // TODO: A* Algorithm
        }
    }
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
            if (pointCounter === 0) {
                board[i][j] = 1;
                pointCounter++;
            } else if (pointCounter === 1) {
                board[i][j] = 3;
                pointCounter++;
            } else {
                board[i][j] = 2;
            }
        }
    } else if (mouseButton === RIGHT) {
        // RIGHT: Remove object

        // Check if the cell is start
        if (board[i][j] === 1) {
            board[i][j] = 0;
            pointCounter--;
        } else if (board[i][j] === 3) {
            board[i][j] = 0;
            pointCounter--;
        } else if (board[i][j] === 2) {
            board[i][j] = 0;
        }
    }
}
