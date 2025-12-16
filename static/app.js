const cells = Array.from(document.querySelectorAll('[data-cell]'));
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const scoreEl = document.getElementById('score');

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill(null);
let current = 'X';
let gameOver = false;
let score = { X: 0, O: 0, draws: 0 };

function setStatus(message) {
  statusEl.textContent = message;
}

function updateScoreboard() {
  scoreEl.textContent = `X: ${score.X} · O: ${score.O} · Draws: ${score.draws}`;
}

function renderBoard() {
  cells.forEach((cell, idx) => {
    cell.textContent = board[idx] || '';
    cell.disabled = !!board[idx] || gameOver;
  });
}

function checkOutcome() {
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(Boolean)) return 'draw';
  return null;
}

function finishGame(outcome) {
  gameOver = true;
  if (outcome === 'draw') {
    score.draws += 1;
    setStatus("It's a draw. Hit reset to play again.");
  } else {
    score[outcome] += 1;
    setStatus(`Player ${outcome} wins! Hit reset to play again.`);
  }
  updateScoreboard();
  renderBoard();
}

function handleTurn(idx) {
  if (gameOver || board[idx]) return;
  board[idx] = current;
  const outcome = checkOutcome();
  if (outcome) {
    finishGame(outcome);
  } else {
    current = current === 'X' ? 'O' : 'X';
    setStatus(`Player ${current}'s turn`);
    renderBoard();
  }
}

function resetGame() {
  board = Array(9).fill(null);
  current = 'X';
  gameOver = false;
  setStatus("Player X's turn");
  renderBoard();
}

function init() {
  cells.forEach((cell) => {
    cell.addEventListener('click', () => handleTurn(Number(cell.dataset.index)));
  });
  resetBtn.addEventListener('click', resetGame);
  updateScoreboard();
  renderBoard();
  setStatus("Player X's turn");
}

init();
