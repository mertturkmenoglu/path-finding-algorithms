let algSelect;
let hSelect;
let mazeButton;
let startButton;
let helpButton;
let clearButton;
let resetButton;

function initDOM() {
    algSelect = document.getElementById("alg-select");
    hSelect = document.getElementById('heuristic-select');

    algSelect.onchange = function () {
        snackbarAlert(`${algSelect.value} selected`, 3000);
        currAlg = Algorithms[algSelect.value];
    };

    hSelect.onchange = function () {
        snackbarAlert(`${hSelect.value} selected`, 3000);
        currHeuristic = Heuristic[hSelect.value];
    };

    mazeButton = document.getElementById("maze-button");
    resetButton = document.getElementById("reset-button");
    clearButton = document.getElementById("clear-button");
    startButton = document.getElementById("start-button");
    helpButton  = document.getElementById("help-button");

    mazeButton.onclick = function () {
        snackbarAlert('Maze generated', 3000);
        generateMaze();
    };

    resetButton.onclick = function () {
        snackbarAlert('Everything removed', 3000);
        reset();
    };
    clearButton.onclick = function () {
        snackbarAlert('Clear path finding', 3000);
        clearPath();
    };

    startButton.onclick = function () {
        clearPath();
        startPathFinding(currAlg, currHeuristic);
    };

    helpButton.onclick = function () {
        let msg = "Left click to add an object, right click to remove an object." +
            "When you are ready, press 'Start'.";
        snackbarAlert(msg, 5000);
    };

    document.addEventListener('contextmenu', e => e.preventDefault());
}

function snackbarAlert(msg, time) {
    let snackbar = document.getElementById('snackbar');
    snackbar.className = 'show';
    snackbar.innerText = msg;
    setTimeout( () => {
        snackbar.className = snackbar.className.replace('show', '');
    }, time);
}
