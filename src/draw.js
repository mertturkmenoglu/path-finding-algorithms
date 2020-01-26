function drawGrid() {
    stroke(COLOR_BLACK);
    strokeWeight(gridLineStrokeWeight);

    for (let i = 0; i <= rowCount; i++) {
        line(0, r * i, width, r * i);
    }

    for (let i = 0; i <= colCount; i++) {
        line(r * i, 0, r * i, height);
    }

    noStroke();
}

function drawBoard() {
    noStroke();

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            let v = board[i][j];

            if (v === Cell.start) {
                fill(startCellColor.r, startCellColor.g, startCellColor.b);
                textSize(gridTextSize);
                text("S", j * r + (r / 2), i * r + (r / 2));
            } else if (v === Cell.obstacle) {
                fill(obstacleCellColor.value);
                rect(j * r + 1, i * r + 1, r - 2, r - 2);
            } else if (v === Cell.end) {
                fill(endCellColor.r, endCellColor.g, endCellColor.b);
                textSize(gridTextSize);
                text("E", j * r + (r / 2), i * r + (r / 2));
            }
        }
    }
}

function drawVisited(path, maxValue, lastVisitedIndex) {
    for (let i = 0; i < lastVisitedIndex && i < path.visited.length; i++) {
        let cell = path.visited[i];
        let c = map(cell.number, maxValue, 5, 255, 100);
        fill(pathCellColor.r, c, c);
        rect(cell.x * r + 1, cell.y * r + 1, r - 2, r - 2);
    }
}

function drawPath(path, lastPathIndex) {
    stroke(pathLineColor.r, pathLineColor.g, pathLineColor.b);
    strokeWeight(pathLineRadius);

    let p = path.path;
    if (p === null) {
        return;
    }

    for (let i = 0; i < p.length - 1 && i <= lastPathIndex; i++) {
        let currX = p[i].x * r + (r / 2);
        let currY = p[i].y * r + (r / 2);
        let nextX = p[i + 1].x * r + (r / 2);
        let nextY = p[i + 1].y * r + (r / 2);
        line(currX, currY, nextX, nextY);
    }

    noStroke();
    strokeWeight(1);
}
