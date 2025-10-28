const player = (function () {
  const x = "X";
  const o = "O";

  const one = {
    mark: "X",
    name: "Player One",
  };

  const two = {
    mark: "O",
    name: "Player Two",
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
  // const { grid, drawboard, render } = gameboard;

  const movePlayer = (player, move, board = gameboard.grid) => {
    if (!move) {
      const prompt = require("prompt-sync")({ siginit: true });
      move = prompt(`${player}: Where would you like to place a mark? `);
    }

    const [row, col] = move.map(Number);
    if (board[row][col] === "") {
      board[row][col] = player;
    } else {
      console.log("Invalid move");
    }
  };

  return { movePlayer };
})();

const winConditions = (function () {
  const { grid, drawboard, render } = gameboard;

  const checkRows = (player, board) =>
    board.some((row) => row.every((cell) => cell === player));

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
    if (checkCols(player, board)) {
      return true;
    } else if (checkDiags(player, board)) {
      return true;
    } else if (checkRows(player, board)) {
      return true;
    } else {
      return false;
    }
  };

  return { checkRows, checkCols, checkDiags, checkDraw, allChecks };
})();

// -------------------------
// --- Tests for objects ---
// -------------------------

function testGameBoard() {
  console.log("--- Game board tests ---");
  console.log("Grid: ", gameboard.grid);
  gameboard.drawboard();
}

function testPlayTurn() {
  console.log("--- Play turn tests ---");
  gameboard.movePlayer(player.x, "11");
  gameboard.drawboard();
}

function testWinCons() {
  console.log("--- Play turn tests ---");
  const testboard = [
    ["X", "X", "X"],
    ["X", "X", "O"],
    ["X", "O", "O"],
  ];

  const testDraw = [
    ["X", "X", "O"],
    ["O", "X", "X"],
    ["X", "O", "O"],
  ];

  console.log("check rows: ", winConditions.checkRows(player.x, testboard));
  console.log("check columns: ", winConditions.checkCols(player.x, testboard));
  console.log(
    "check diagonals: ",
    winConditions.checkDiags(player.x, testboard)
  );
  console.log("Check for draw: ", winConditions.checkDraw(testDraw));
  console.log("All checks: ", winConditions.allChecks(player.x, testDraw));
}

// testGameBoard();
// testPlayTurn();
// testWinCons();

// -------------------------
// --- GUI ---
// -------------------------

const gameController = function () {
  let currentPlayer = player.one;
  let gameover = false;

  const turnText = document.getElementById("turn-text");
  const startBtn = document.getElementById("startBtn");

  const activateBoard = () => {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("click", () => {
        if (gameover || cell.textContent !== "") return;

        const row = cell.dataset.row;
        const col = cell.dataset.col;

        playTurn.movePlayer(currentPlayer.mark, [row, col]);
        gameboard.render();

        if (winConditions.allChecks(currentPlayer.mark)) {
          turnText.textContent = `Game Over: ${currentPlayer.name} Wins!`;
          endGame();
        } else if (winConditions.checkDraw()) {
          turnText.textContent = "Game Over: Draw";
          endGame();
        }

        currentPlayer = currentPlayer === player.one ? player.two : player.one;
      });
    });
  };

  const reset = () => {
    currentPlayer = player.one;
    gameover = false;
    resetBtn.style.display = "none";
  };

  const states = () => {
    console.log(`
      current player's name: ${currentPlayer.name},
      current player's mark: ${currentPlayer.mark},
      gameover: ${gameover}
      `);
  };

  const endGame = () => {
    gameover = true;
    startBtn.textContent = "New Game";
  };

  return { reset, states, gameover, activateBoard };
};

function testBtn() {
  console.log("A button has been clicked");
}

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  getPlayerNames();
  gameController.activateBoard();
});

function getPlayerNames() {
  const player1 = document.getElementById("player1Name").value;
  const player2 = document.getElementById("player2Name").value;

  const names = [player1, player2];

  if (names.some(validateName)) {
    player.setNames(names);
  } else {
    console.log("Warning: One or more player names are invalid");
  }
}

function validateName(name) {
  return name !== "";
}
