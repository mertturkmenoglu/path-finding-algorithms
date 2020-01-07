let board;
const rowCount = 16;
const colCount = 32;

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

}

