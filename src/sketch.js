let board;
const w = 960;
const h = 640;
const r = 16;
const rowCount = 40;
const colCount = 60;

function setup() {
    createCanvas(960, 640);
    board = new Array(rowCount).fill([]);

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            board[i].push(0);
        }
    }

    textAlign(CENTER, CENTER);
}

function draw() {
    clear();
    drawTable();
}

function drawTable() {
    for (let i = 0; i <= rowCount; i++) {
        line(0, r * i, width, r * i);
    }

    for (let i = 0; i <= colCount; i++) {
        line(r * i, 0, r*i, height)
    }
}

