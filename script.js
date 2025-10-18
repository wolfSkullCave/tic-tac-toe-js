const gameboard = (function () {
  let grid = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
  ];

  const drawboard = () => {
    grid.forEach((row) => {
      console.log(row);
    });
  };

  const setBoard = (board) => {
    grid = board;
  };

  return { grid, drawboard, setBoard };
})();

const playTurn = (function () {
  const { grid, drawboard } = gameboard;

  const movePlayer = (player) => {
    const prompt = require("prompt-sync")({ siginit: true });
    let move = prompt(`${player}: Where would you like to place a mark? `);
    let row = Number(move.slice(0, 1));
    let cell = Number(move.slice(1, 2));
    grid[row][cell] = player;
  };

  return { drawboard, movePlayer };
})();

const player = (function () {
  const x = "X";
  const o = "O";

  return { x, o };
})();

const winConditions = (function () {
  const checkRows = (player, board) =>
    board.some((row) => row.every((cell) => cell === player));

  const checkCols = (player, board) => {
    // create a new array consisting of the columns of the board array
    let column = [];
    for (let i = 0; i < 3; i++) {
      column.push(board.map((row) => row[i]));
    }

    return checkRows(player, column);
  };

  const checkDiags = (player, board) => {
    // create an array from the diagonals of board
    let diagonals = [
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    return checkRows(player, diagonals);
  };

  const checkDraw = (board) =>
    board.every((row) => row.every((cell) => cell !== ""));

  return { checkRows, checkCols, checkDiags, checkDraw };
})();

// --- Tests for objects ---

function testGameBoard() {
  console.log("--- Game board tests ---");
  console.log("Grid: ", gameboard.grid);
  gameboard.drawboard();
}

function testPlayTurn() {
  console.log("--- Play turn tests ---");
  playTurn.movePlayer(player.x);
  playTurn.drawboard();
}

function testWinCons() {
  console.log("--- Play turn tests ---");
  const testboard = [
    ["X", "X", "X"],
    ["X", "X", "O"],
    ["X", "O", ""],
  ];

  console.log("check rows: ", winConditions.checkRows(player.x, testboard));
  console.log("check columns: ", winConditions.checkCols(player.x, testboard));
  console.log(
    "check diagonals: ",
    winConditions.checkDiags(player.x, testboard)
  );
  console.log("Check for draw: ", winConditions.checkDraw(testboard));
}

// testGameBoard();
// testPlayTurn();
testWinCons();
