const player = (function () {
  const x = "X";
  const o = "O";

  const name = () => 'Player';

  return { x, o };
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

  return { grid, drawboard, render };
})();

const playTurn = (function () {
  const { grid, drawboard, render } = gameboard;
  const { x, o } = player;

  const movePlayer = (player, move, board = grid) => {
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

const gameController = (function () {
  let currentPlayer = player.x;
  let gameover = false;

  const turnText = document.getElementById("turn-text");
  // const resetBtn = document.getElementById("resetBtn");

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      if (gameover || cell.textContent !== "") return;

      const row = cell.dataset.row;
      const col = cell.dataset.col;

      playTurn.movePlayer(currentPlayer, [row, col]);
      gameboard.render();

      if (winConditions.allChecks(currentPlayer)) {
        turnText.textContent = `${currentPlayer} Wins!`;
        resetBtn.style.display = "block";
        gameover = true;
      } else if (winConditions.checkDraw()) {
        turnText.textContent = "Draw";
        resetBtn.style.display = "block";
        gameover = true;
      }

      currentPlayer = currentPlayer === player.x ? player.o : player.x;
    });
  });
})();
