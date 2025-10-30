const player = (function () {
  const x = "X";
  const o = "O";

  const one = {
    mark: "X",
    name: "Player One",
    wins: 0,
  };

  const two = {
    mark: "O",
    name: "Player Two",
    wins: 0,
  };

  const setNames = (names) => {
    player.one.name = names[0];
    player.two.name = names[1];
  };

  // testing methods
  const getNames = () =>
    console.log(`Player 1: ${player.one.name}, Player 2: ${player.two.name}`);

  return { one, two, getNames, setNames };
})();

const gameboard = (function () {
  const positions = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
  ];

  let grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const drawboard = (board = grid) => {
    board.forEach((row) => {
      console.log(row);
    });
  };

  const render = () => {
    document.querySelectorAll(".cell").forEach((cell) => {
      const row = cell.dataset.row;
      const col = cell.dataset.col;
      cell.textContent = grid[row][col];
    });
  };

  const reset = () => {
    for (let row = 0; row < 3; row++) {
      for (let cell = 0; cell < 3; cell++) {
        grid[row][cell] = "";
      }
    }

    render();
  };

  return { grid, drawboard, render, reset };
})();

const playTurn = (function () {
  const movePlayer = (player, move, board = gameboard.grid) => {
    if (!move) {
      const prompt = require("prompt-sync")({ siginit: true });
      move = prompt(`${player}: Where would you like to place a mark? `);
    }

    const [row, col] = move.map(Number);
    if (board[row][col] === "") {
      board[row][col] = player;
    } else {
      console.log(`Warning: Invalid move on position [${row}][${col}]`);
      console.log(board);
    }
  };

  return { movePlayer };
})();

const winConditions = (function () {
  const { grid, drawboard, render } = gameboard;

  function addWinner(player) {
    winners.push(player);
    return winners;
  }

  const checkRows = (player, board = grid) => {
    const win = board.some((row) => row.every((cell) => cell === player.mark));
    if (win) {
      player.wins++;
    }
    return win;
  };

  const checkCols = (player, board = grid) => {
    // create a new array consisting of the columns of the board array
    let column = [];
    for (let i = 0; i < 3; i++) {
      column.push(board.map((row) => row[i]));
    }

    return checkRows(player, column);
  };

  const checkDiags = (player, board = grid) => {
    // create an array from the diagonals of board
    let diagonals = [
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    return checkRows(player, diagonals);
  };

  const checkDraw = (board = grid) =>
    board.every((row) => row.every((cell) => cell !== ""));

  const allChecks = (player, board = grid) => {
    return (
      checkCols(player, board) ||
      checkDiags(player, board) ||
      checkRows(player, board) ||
      false
    );
  };

  return { checkRows, checkCols, checkDiags, checkDraw, allChecks };
})();

// -------------------------
// --- GUI components ---
// -------------------------

function getPlayerNames() {
  // gets player names from input fields, stores them in an arrary
  // and sets them using the player.setNames() method
  const player1 = document.getElementById("player1Name").value;
  const player2 = document.getElementById("player2Name").value;

  const names = [player1, player2];

  if (names.some(validateName)) {
    player.setNames(names);
  } else {
    console.log("Warning: One or more player names are invalid");
  }

  function validateName(name) {
    return name !== "";
  }
}

function activateBoard() {
  let currentPlayer = player.one;
  let gameover = false;

  function updateHeading(text) {
    let turn = document.getElementById("turn-text");
    if (turn) turn.textContent = text;
  }

  updateHeading(`${currentPlayer.name}'s turn`);

  // clear event listeners from cells
  document.querySelectorAll(".cell").forEach((cell) => {
    const clone = cell.cloneNode(true);
    cell.parentNode.replaceChild(clone, cell);
  });

  const board = document.querySelectorAll(".cell");
  board.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (gameover || cell.textContent !== "") return;
      // if (cell.textContent !== "") return;

      const row = cell.dataset.row;
      const col = cell.dataset.col;

      playTurn.movePlayer(currentPlayer.mark, [row, col]);
      gameboard.render();

      gameover =
        winConditions.allChecks(currentPlayer) || winConditions.checkDraw();

      if (gameover) {
        if (winConditions.checkDraw()) updateHeading("Draw!");
        else updateHeading(`${currentPlayer.name} wins!`);
        updateScore();
        return;
      }

      currentPlayer = currentPlayer === player.one ? player.two : player.one;
      updateHeading(`${currentPlayer.name}'s turn`);
    });
  });
}

function resetGame() {
  // Make sure we don't stack listeners: replace button with clone and then add a single handler
  const originalBtn = document.getElementById("startBtn");
  if (!originalBtn) return;
  const btn = originalBtn.cloneNode(true);
  originalBtn.parentNode.replaceChild(btn, originalBtn);

  btn.addEventListener("click", () => {
    gameboard.reset();
    document.getElementById(
      "turn-text"
    ).textContent = `${player.one.name}'s turn`;
    activateBoard();
  });

  document.getElementById("startBtn").textContent = "Reset Game";
}

function updateScore() {
  // const scoreTxt = document.getElementById("scoreBoard");
  // scoreTxt.innerHTML = `
  // <h3>Score Board</h3>
  // <p>${player.one.name}: ${player.one.wins}</p>
  // <p>${player.two.name}: ${player.two.wins}</p>`;
  const p1Score = document.getElementById("p1Score");
  const tieScore = document.getElementById("tieScore");
  const p2Score = document.getElementById("p2Score");

  p1Score.textContent = player.one.wins;
  p2Score.textContent = player.two.wins;
}

// GUI tests
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  getPlayerNames();
  updateScore();
  player.getNames();
  activateBoard();
  resetGame();
});

function print(txt) {
  console.log(txt);
}
