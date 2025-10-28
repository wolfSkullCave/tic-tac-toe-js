// --- GUI: activateBoard, resetGame and start button wiring ---

function activateBoard() {
  let currentPlayer = player.one;
  let gameover = false;

  function updateHeading(text) {
    const turn = document.getElementById("turn-text");
    if (turn) turn.textContent = text;
  }

  updateHeading(`${currentPlayer.name}'s turn`);

  // Remove any existing cell listeners by replacing nodes with clones
  document.querySelectorAll(".cell").forEach((cell) => {
    const clone = cell.cloneNode(true);
    cell.parentNode.replaceChild(clone, cell);
  });

  const board = document.querySelectorAll(".cell");
  board.forEach((cell) => {
    cell.addEventListener("click", () => {
      // 1) Always check gameover first so clicks are blocked after win/draw
      if (gameover) return;

      // 2) Prevent clicking already-occupied cells
      if (cell.textContent !== "") return;

      // parse index numbers safely
      const row = Number(cell.dataset.row);
      const col = Number(cell.dataset.col);

      playTurn.movePlayer(currentPlayer.mark, [row, col]);
      gameboard.render();

      // Evaluate win/draw
      gameover =
        winConditions.allChecks(currentPlayer.mark) ||
        winConditions.checkDraw();

      if (gameover) {
        // show a message, keep gameover === true so cells stay inert
        if (winConditions.checkDraw()) {
          updateHeading(`Draw!`);
        } else {
          updateHeading(`${currentPlayer.name} wins!`);
        }

        // Option A: let player press Reset (do nothing else)
        // Option B: auto-reset after a short delay but keep clicks disabled until reset completes
        // Uncomment an option below depending on desired behavior.

        // --- Option B: auto-reset after 1.25s ---
        setTimeout(() => {
          gameboard.reset();
          // reset local state so the board is playable again
          currentPlayer = player.one;
          gameover = false;
          updateHeading(`${currentPlayer.name}'s turn`);
        }, 1250);

        // If you prefer Option A (manual reset only), remove the setTimeout block above.

        return;
      }

      // Switch player and update heading
      currentPlayer = currentPlayer === player.one ? player.two : player.one;
      updateHeading(`${currentPlayer.name}'s turn`);
    });
  });

  // Note: Do not attach the Start/Reset button here (avoid stacking).
  // The start button wiring is done once outside (see below).
}

function resetGame() {
  // Make sure we don't stack listeners: replace button with clone and then add a single handler
  const origBtn = document.getElementById("startBtn");
  if (!origBtn) return;
  const btn = origBtn.cloneNode(true);
  origBtn.parentNode.replaceChild(btn, origBtn);

  // single handler: reset board and start a fresh round
  btn.addEventListener("click", () => {
    gameboard.reset();
    // ensure UI heading shows current player's turn (player.one default)
    const turn = document.getElementById("turn-text");
    if (turn) turn.textContent = `${player.one.name}'s turn`;
    // re-activate the board (this will add fresh listeners)
    activateBoard();
  });

  // Update text once
  btn.textContent = "Reset game";
}

// Initial start button setup - run once at app initialization
const startBtn = document.getElementById("startBtn");
if (startBtn) {
  // avoid stacking on hot reloads by replacing with clone first
  const freshStartBtn = startBtn.cloneNode(true);
  startBtn.parentNode.replaceChild(freshStartBtn, startBtn);

  freshStartBtn.addEventListener("click", () => {
    getPlayerNames();
    player.getNames();
    gameboard.reset(); // ensure board cleared
    activateBoard(); // attach cell listeners (fresh)
    resetGame(); // set up single Reset button handler (fresh)
  });
}
