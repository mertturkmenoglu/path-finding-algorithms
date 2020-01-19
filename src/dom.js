let algSelect;
let mazeButton;
let startButton;
let helpButton;
let clearButton;
let resetButton;

function initDOM() {
    algSelect = document.getElementById("alg-select");

    mazeButton = document.getElementById("maze-button");
    resetButton = document.getElementById("reset-button");
    clearButton = document.getElementById("clear-button");
    startButton = document.getElementById("start-button");
    helpButton  = document.getElementById("help-button");

    mazeButton.onclick = generateMaze;
    resetButton.onclick = reset;
    clearButton.onclick = clearPath;
    startButton.onclick = function () {
        let sel = algSelect.value;
        currAlg = Algorithms[sel];

        clearPath();
        startPathFinding(currAlg);
    };

    helpButton.onclick = giveInfo;

    document.addEventListener('contextmenu', e => e.preventDefault());
}