let algSelect;
let hSelect;
let hSelectLabel;
let speedSelect;
let mazeButton;
let startButton;
let helpButton;
let clearButton;
let resetButton;
let modal;
let modalCloseButton;
let modalContentText;

function initDOM() {
    algSelect = document.getElementById("alg-select");
    hSelect = document.getElementById('heuristic-select');
    hSelectLabel = document.getElementById('heuristic-select-label');
    speedSelect = document.getElementById('speed-select');

    algSelect.onchange = function () {
        snackbarAlert(`${algSelect.value} selected`, snackbarTimeoutShort);
        currAlg = Algorithms[algSelect.value];

        if (currAlg !== Algorithms["A*"]) {
            hSelect.style.display = 'none';
            hSelectLabel.style.display = 'none';
        } else {
            hSelect.style.display = 'block';
            hSelectLabel.style.display = 'flex';
        }
    };

    hSelect.onchange = function () {
        snackbarAlert(`${hSelect.value} selected`, snackbarTimeoutShort);
        currHeuristic = Heuristic[hSelect.value];
    };

    speedSelect.onchange = () => {
        snackbarAlert(`${speedSelect.value} selected`, snackbarTimeoutShort);
        currSpeed = Speed[speedSelect.value];
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
        modal = document.getElementById('modal-box-help');
        modal.style.display = 'block';
    };

    modal = document.getElementById('modal-box-help');
    modal.style.display = 'none';
    modalCloseButton = document.getElementById('modal-close');
    modalCloseButton.onclick = () => {
        modal.style.display = 'none';
    };

    modalContentText = document.getElementById('modal-content-text');
    modalContentText.innerText = helpButtonText;

    window.onclick = event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
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
