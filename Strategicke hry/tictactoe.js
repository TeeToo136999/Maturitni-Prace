let currentPlayer = "X";
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

const cells = document.querySelectorAll('.cell');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => cellClick(index));
});

function cellClick(index) {
    if (!gameActive) return;
    if (board[index] === '') {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        if (checkWin()) {
            alert(currentPlayer + " vyhrál!");
            gameActive = false;
        } else if (checkDraw()) {
            alert("Remíza!");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (document.getElementById('vsComputer').checked && currentPlayer === "O") {
                computerTurn();
            }
        }
    }
}

function computerTurn() {
    let availableCells = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    cellClick(randomIndex);
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    return winConditions.some(condition => {
        if (board[condition[0]] !== '' &&
            board[condition[0]] === board[condition[1]] &&
            board[condition[1]] === board[condition[2]]) {
            return true;
        }
        return false;
    });
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function startGame() {
    gameActive = true;
    currentPlayer = "X";
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
}
function computerTurn() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    cellClick(move);
}

function minimax(board, depth, isMaximizing) {
    if (checkWin() && isMaximizing) {
        return -1;
    } else if (checkWin() && !isMaximizing) {
        return 1;
    } else if (checkDraw()) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

//popis
function toggleContent() {
  var content = document.getElementById("content");
  
  if (content.style.visibility === "hidden") {
    content.style.visibility = "visible";
  } else {
    content.style.visibility = "hidden";
  }
}