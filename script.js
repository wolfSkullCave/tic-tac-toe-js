// set up board
function setUpBoard() {
  let grid = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  return grid;
}

function drawBoard(grid) {
  console.log(`${grid[0]} | ${grid[1]} | ${grid[2]}`);
  console.log(`${grid[3]} | ${grid[4]} | ${grid[5]}`);
  console.log(`${grid[6]} | ${grid[7]} | ${grid[8]}`);
}

function playerTurn(player, grid) {
  const prompt = require("prompt-sync")({ siginit: true });
  let move = prompt(`${player}: Where would you like to place a mark? `);
  move = Number(move);
  grid[move] = player;
}

function checkRows(grid, player) {
  let counter = 0;

  for (let i = 0; i < 3; i++) {
    if (counter >= 3) {
      return true;
    }
    if (grid[i] === player) {
      counter++;
    }
  }
}

const player1 = "X";
const player2 = "O";
console.log(player1, player2);

let grid = setUpBoard();
let winner = false;

while (!winner) {
  drawBoard(grid);
  playerTurn(player1, grid);
  drawBoard(grid);

  row1 = grid
  checkRows()
}
