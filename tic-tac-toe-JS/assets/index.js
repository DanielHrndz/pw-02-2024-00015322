let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');

    if (board[cellIndex] !== '' || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `El jugador ${currentPlayer} ha ganado!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = 'Es un empate!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

resetButton.addEventListener('click', resetGame);
