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
        snackbarAlert(`${algSelect.value} selected`, snackbarTimeoutShort);
        currAlg = Algorithms[algSelect.value];

        if (currAlg !== Algorithms["A*"]) {
            hSelect.style.display = 'none';
        } else {
            hSelect.style.display = 'block';
        }
    };

    hSelect.onchange = function () {
        snackbarAlert(`${hSelect.value} selected`, snackbarTimeoutShort);
        currHeuristic = Heuristic[hSelect.value];
    };

    mazeButton = document.getElementById("maze-button");
    resetButton = document.getElementById("reset-button");
    clearButton = document.getElementById("clear-button");
    startButton = document.getElementById("start-button");
    helpButton  = document.getElementById("help-button");

    mazeButton.onclick = function () {
        snackbarAlert('Maze generated', snackbarTimeoutShort);
        generateMaze();
    };

    resetButton.onclick = function () {
        snackbarAlert('Everything removed', snackbarTimeoutShort);
        reset();
    };
    clearButton.onclick = function () {
        snackbarAlert('Clear path finding', snackbarTimeoutShort);
        clearPath();
    };

    startButton.onclick = function () {
        clearPath();
        startPathFinding(currAlg, currHeuristic);
    };

    helpButton.onclick = function () {
        snackbarAlert(helpButtonText, snackbarTimeoutLong);
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
