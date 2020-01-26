function drawGrid() {
    stroke(0);
    strokeWeight(1.5);
    for (let i = 0; i <= rowCount; i++) {
        line(0, r * i, width, r * i);
    }

    for (let i = 0; i <= colCount; i++) {
        line(r * i, 0, r*i, height);
    }
    noStroke();
}

function drawBoard() {
    noStroke();
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            let v = board[i][j];

            if (v === Cell.start) {
                fill(188, 16, 222);
                textSize(r * 0.75);
                text("S", j*r+(r/2), i*r+(r/2));
            } else if (v === Cell.obstacle) {
                fill(100);
                rect(j*r+1, i*r+1, r-2, r-2);
            } else if (v === Cell.end) {
                fill(222, 16, 50);
                textSize(r * 0.75);
                text("E", j*r+(r/2), i*r+(r/2));
            }
        }
    }
}

function drawVisited(path, maxValue, lastVisitedIndex) {
    for (let i = 0 ; i < lastVisitedIndex && i < path.visited.length; i++) {
        let cell = path.visited[i];
        let c = map(cell.number, maxValue, 5, 255, 100);
        fill(30, c, c);
        rect(cell.x * r + 1, cell.y * r + 1, r - 2, r - 2);
    }
}

function drawPath(path, lastPathIndex) {
    stroke(228, 186, 34);
    strokeWeight(Math.sqrt(r));

    let p = path.path;

    for (let i = 0; i < p.length-1 && i <= lastPathIndex; i++) {
        let currx = p[i][1] * r + (r / 2);
        let curry = p[i][0] * r + (r / 2);
        let nextx = p[i + 1][1] * r + (r / 2);
        let nexty = p[i + 1][0] * r + (r / 2);
        line(currx, curry, nextx, nexty);
    }

    noStroke();
    strokeWeight(1);
}
