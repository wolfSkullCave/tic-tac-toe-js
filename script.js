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

  const drawPositons = () => drawboard(positions);

  const drawboard = (board = grid) => {
    board.forEach((row) => {
      console.log(row);
    });
  };

  return { grid, drawPositons, drawboard };
})();

const playTurn = (function () {
  const { grid, drawboard, drawPositons } = gameboard;

  const movePlayer = (player, move, board = grid) => {
    if (!move) {
      const prompt = require("prompt-sync")({ siginit: true });
      move = prompt(`${player}: Where would you like to place a mark? `);
    }

    let row = Number(move.slice(0, 1));
    let cell = Number(move.slice(1, 2));

    if (board[row][cell] === "") {
      board[row][cell] = player;
    } else {
      console.log("Invalid move");
    }
  };

  return { drawPositons, drawboard, movePlayer };
})();

const player = (function () {
  const x = "X";
  const o = "O";

  return { x, o };
})();

const winConditions = (function () {
  const { grid, drawboard, drawPositons } = gameboard;

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

// --- Tests for objects ---

function testGameBoard() {
  console.log("--- Game board tests ---");
  console.log("Grid: ", gameboard.grid);
  gameboard.drawboard();
}

function testPlayTurn() {
  console.log("--- Play turn tests ---");
  playTurn.movePlayer(player.x, "11");
  playTurn.drawboard();
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

// run script
function autoPlay() {
  const xMoves = ["11", "20", "01"];
  const oMoves = ["00", "02", "21"];
  let winner = false;

  console.log("--- Board positions ---");
  playTurn.drawPositons();

  console.log("--- Board state ---");
  playTurn.drawboard();
  let turnNo = 0;
  let turnPlayer = [player.x, player.o];

  while (!winner) {
    console.log(`--- Turn ${turnNo}`);
  }
}

function runGame() {
  console.log("--- Board positions ---");
  playTurn.drawPositons();

  console.log("--- Board state ---");
  playTurn.drawboard();

  console.log("--- Player X goes first ---");
  playTurn.movePlayer(player.x, "11");
  playTurn.drawboard();
  winConditions.allChecks(player.x);

  console.log("--- Turn 2: Player O goes next ---");
  playTurn.movePlayer(player.o, "00");
  playTurn.drawboard();

  console.log("--- Turn 3: Player X goes next ---");
  playTurn.movePlayer(player.x, "20");
  playTurn.drawboard();

  console.log("--- Turn 4: Player O goes next ---");
  playTurn.movePlayer(player.o, "02");
  playTurn.drawboard();

  console.log("--- Turn 5: Player X goes next ---");
  playTurn.movePlayer(player.x, "01");
  playTurn.drawboard();

  console.log("--- Turn 6: Player O goes next ---");
  playTurn.movePlayer(player.o, "21");
  playTurn.drawboard();
}

runGame();