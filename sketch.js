const canvasHeight = 600
const canvasWidth = 600
const sRadius = 50  // square radius
const rowCount = Math.round(canvasHeight / sRadius)
const colCount = Math.round(canvasWidth / sRadius)

let board = [];
let mouseClickCount = 0;

function setup() {
    createCanvas(canvasHeight, canvasWidth);
    for (let i = 0; i < rowCount; i++) {
        board[i] = [];
        for (let j = 0; j < colCount; j++) {
            board[i][j] = 0
        }
    }
}

function draw() {
    background(255);
    drawShapes();
    drawGrid();
}

function mouseClicked() {
    console.log("clicked");
    let coord = getCoordinates(mouseX, mouseY);
    if (mouseClickCount == 0) {
        board[coord[1]][coord[0]] = 1
        mouseClickCount++
    } else if (mouseClickCount == 1) {
        board[coord[1]][coord[0]] = 2
        mouseClickCount++
    } else {
        board[coord[1]][coord[0]] = 3
        mouseClickCount++
    }
    console.log(coord);
}

function getCoordinates(xpos, ypos) {
    xpos /= sRadius;
    ypos /= sRadius;
    return [int(ypos), int(xpos)];
}

function drawGrid() {
    fill(0)
    for (let i = 0; i <= width; i += sRadius) {
        line(i, 0, i, height);
        line(0, i, width, i);
    }
}

function drawShapes() {
    fill(255)
    rectMode(CENTER);
    ellipseMode(CENTER);

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == 1) {
                fill(255, 0, 0)
                ellipse(i * sRadius + sRadius / 2, j * sRadius + sRadius / 2, sRadius / 2, sRadius / 2)
            } else if (board[i][j] == 2) {
                fill(0, 0, 255)
                ellipse(i * sRadius + sRadius / 2, j * sRadius + sRadius / 2, sRadius / 2, sRadius / 2)
            } else if (board[i][j] == 3) {
                fill(0)
                rect(i * sRadius + sRadius / 2, j * sRadius + sRadius / 2, sRadius, sRadius)
            }
        }
    }
}
