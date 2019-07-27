const canvasHeight = 600
const canvasWidth = 600
const sRadius = 50  // square radius
const rowCount = Math.round(canvasHeight / sRadius)
const colCount = Math.round(canvasWidth / sRadius)

let board = []
let mouseClickCount = 0
let calculationStatus = 0 // 0: Hasn't started, 1: Continues, 2: Finished

function setup() {
    createCanvas(canvasHeight, canvasWidth)
    
    // Create matrix
    for (let i = 0; i < rowCount; i++) {
        board[i] = []
        for (let j = 0; j < colCount; j++) {
            board[i][j] = 0
        }
    }

}

function draw() {
    background(255)
    drawShapes()
    drawGrid()
    
    if (calculationStatus == 2) {
        noLoop()
    }
}

function keyPressed() {
    if (key === 's') {
        console.log("S pressed")
        calculationStatus = 1
        // TODO: Implement the algorithm
        // pathFind()
    }
}

function pathFind() {
    // TODO: Implement
}

function mouseClicked() {
    if (calculationStatus == 0) {
        let coord = getCoordinates(mouseX, mouseY)
        
        if (mouseClickCount == 0) {
            board[coord[1]][coord[0]] = 1
        } else if (mouseClickCount == 1) {
            board[coord[1]][coord[0]] = 2
        } else {
            board[coord[1]][coord[0]] = 3
        }
    
        mouseClickCount++
    }
}

function getCoordinates(xpos, ypos) {
    xpos /= sRadius
    ypos /= sRadius
    return [int(ypos), int(xpos)]
}

function drawGrid() {
    fill(0)
    for (let i = 0; i <= width; i += sRadius) {
        line(i, 0, i, height)
        line(0, i, width, i)
    }
}

function drawShapes() {
    fill(255)
    rectMode(CENTER)
    ellipseMode(CENTER)

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            switch (board[i][j]) {
                case 1: // Start points
                    fill(255, 0, 0)
                    ellipse(i * sRadius + sRadius / 2, j * sRadius + sRadius / 2, sRadius / 2, sRadius / 2)
                    break
                
                case 2: // End point
                    fill(0, 0, 255)
                    ellipse(i * sRadius + sRadius / 2, j * sRadius + sRadius / 2, sRadius / 2, sRadius / 2)
                    break
                
                case 3: // Obstacle
                    fill(0)
                    rect(i * sRadius + sRadius / 2, j * sRadius + sRadius / 2, sRadius, sRadius)
                    break
                
                case 4: // Path
                    fill(0, 255, 0)
                    ellipse(i * sRadius + sRadius / 2, j * sRadius + sRadius / 2, sRadius / 2, sRadius / 2)
                    break
                default:
                    break;
            }
        }
    }
}
