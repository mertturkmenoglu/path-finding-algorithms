let squares = [];
let mouseClickCount = 0;

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(255);
    drawSquares();
    drawGrid();
}

function mouseClicked() {
    console.log("clicked");
    let coord = getCoordinates(mouseX, mouseY);
    squares.push(coord);
    console.log(coord);
}

function getCoordinates(xpos, ypos) {
    xpos /= 50;
    ypos /= 50;
    return [int(xpos), int(ypos)];
}

function drawGrid() {
    for (let i = 0; i <= width; i += 50) {
        line(i, 0, i, height);
        line(0, i, width, i);
    }
}

function drawSquares() {
    fill(0)
    rectMode(CENTER);
    for (let i = 0; i < squares.length; i++) {
        rect(squares[i][0] * 50 + 25, squares[i][1] * 50 + 25, 50, 50);
    }
}
