var board = document.getElementById('board');
var resetButton = document.getElementById('reset');
var currentPlayer = 'X';
var gameBoard = Array(9).fill(null);
var gameActive = true;
function createBoard() {
    gameBoard.forEach(function (cell, index) {
        var cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.innerText = cell ? cell : '';
        cellDiv.addEventListener('click', function () { return handleCellClick(index); });
        board.appendChild(cellDiv);
    });
}
function handleCellClick(index) {
    if (gameBoard[index] !== null || !gameActive)
        return;
    gameBoard[index] = currentPlayer;
    renderBoard();
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
function renderBoard() {
    var cells = document.querySelectorAll('.cell');
    gameBoard.forEach(function (cell, index) {
        cells[index].innerText = cell ? cell : '';
    });
}
function checkResult() {
    var winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    for (var _i = 0, winningConditions_1 = winningConditions; _i < winningConditions_1.length; _i++) {
        var condition = winningConditions_1[_i];
        var a = condition[0], b = condition[1], c = condition[2];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert("".concat(gameBoard[a], " wins!"));
            gameActive = false;
            return;
        }
    }
    if (!gameBoard.includes(null)) {
        alert("It's a draw!");
        gameActive = false;
    }
}
resetButton.addEventListener('click', function () {
    gameBoard.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    board.innerHTML = '';
    createBoard();
});
createBoard();
