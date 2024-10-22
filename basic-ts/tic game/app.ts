const board = document.getElementById('board') as HTMLDivElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;
let currentPlayer: 'X' | 'O' = 'X';
let gameBoard: (string | null)[] = Array(9).fill(null);
let gameActive = true;

function createBoard(): void {
    gameBoard.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.innerText = cell ? cell : '';
        cellDiv.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellDiv);
    });
}

function handleCellClick(index: number): void {
    if (gameBoard[index] !== null || !gameActive) return;

    gameBoard[index] = currentPlayer;
    renderBoard();
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function renderBoard(): void {
    const cells = document.querySelectorAll('.cell');
    gameBoard.forEach((cell, index) => {
        cells[index].innerText = cell ? cell : '';
    });
}

function checkResult(): void {
    const winningConditions: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert(`${gameBoard[a]} wins!`);
            gameActive = false;
            return;
        }
    }

    if (!gameBoard.includes(null)) {
        alert("It's a draw!");
        gameActive = false;
    }
}

resetButton.addEventListener('click', () => {
    gameBoard.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    board.innerHTML = '';
    createBoard();
});

createBoard();
