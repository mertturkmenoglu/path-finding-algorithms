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

function drawVisited() {
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            let value = board[i][j];
            if (value < 5) {
                continue;
            }

            if (value <= lastVisitedNo) {
                let a = map(value, maxValue, 5, 255, 100);
                fill(30, a, a);
                rect(j * r+1, i * r+1, r - 2, r - 2);
            }
        }
    }

    lastVisitedNo++;

    return lastVisitedNo >= maxValue;
}

function drawPath() {
    if (path === null) {
        alert("No path");
        return;
    }

    stroke(228, 186, 34);
    strokeWeight(Math.sqrt(r));
    for (let i = 0; i < path.length-1 && i <= lastPathNo; i++) {
        let currx = path[i][1] * r + (r / 2);
        let curry = path[i][0] * r + (r / 2);
        let nextx = path[i + 1][1] * r + (r / 2);
        let nexty = path[i + 1][0] * r + (r / 2);
        line(currx, curry, nextx, nexty);
    }

    lastPathNo++;

    noStroke();
    strokeWeight(1);
}
