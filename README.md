# 🎮 Tic-Tac-Toe (JavaScript)

A simple **Tic-Tac-Toe** game built in JavaScript using **factory functions** and **modular design principles**.
The project begins as a console-based game, later expanding to a fully interactive DOM version.

---

## 🧩 Objective

Build a functional and cleanly structured Tic-Tac-Toe game that:

* Uses as little global code as possible.
* Emphasizes modularity through **factory functions**.
* Separates **game logic** and **DOM manipulation**.
* Supports **two-player gameplay** and tracks the game state.

---

## 🏗️ Structure & Objects

### Core Modules

* **Gameboard Object** – Stores the board state as a 2D array.
* **Player Factory** – Creates player objects with unique symbols and names.
* **Game Flow Controller** – Manages turns, win conditions, and overall logic.

---

## 🎯 Development Goals

* ✅ Build the game to function in the **console** first.
* ✅ Once logic is complete, add a **DOM handler** for display.
* ✅ Allow players to:

  * Enter their names
  * Choose marks (`X` or `O`)
  * Start and restart the game
* ✅ Display game results (win/draw).
* ✅ Keep code **clean**, **modular**, and **readable**.

---

## 🧠 Planning

### Board Layout (Console)

```
a0 | a1 | a2
b0 | b1 | b2
c0 | c1 | c2
```

### Players

* `Player 1 = 'X'`
* `Player 2 = 'O'`

### Game Logic

1. Player 1 makes a move.
2. Player 2 makes a move.
3. Repeat until win or draw.

### Win Conditions

A player wins if they occupy any of the following sets:

**Rows**

* a0, a1, a2
* b0, b1, b2
* c0, c1, c2

**Columns**

* a0, b0, c0
* a1, b1, c1
* a2, b2, c2

**Diagonals**

* a0, b1, c2
* c0, b1, a2

Once a win is detected → display `"Player X WINS!"`.

---

## ⚙️ Algorithm Overview

### Input

* Player 1 move
* Player 2 move

### Processing

* Create the board
* Initialize players
* Prompt moves
* Check for win conditions
* End game if win/draw

### Output

* Current board state
* Player moves
* Winning player message

---

## 🧾 Pseudocode Summary

```text
FUNCTION draw_board_state
    SET row_a, row_b, row_c as [' ', ' ', ' ']
    DRAW each row with separators
END

FUNCTION check_win_conditions(symbol, grid)
    CALL checkRows(symbol, grid)
    CALL checkColumns(symbol, grid)
    CALL checkDiagonals(symbol, grid)
END

FUNCTION create_players
    PROMPT for player symbols
    ASSIGN player_1 and player_2
END

FUNCTION players_move(player)
    PROMPT for position
    IF position empty THEN
        SET position to player.symbol
    ELSE
        PRINT "Position is already taken"
END

FUNCTION start_gameplay_loop
    WHILE board not full
        draw_board_state
        players_move(player1)
        checkWinConditions(player1)
        players_move(player2)
        checkWinConditions(player2)
    END
END
```

---

## 🚀 Next Steps

* [ ] Implement the console version.
* [ ] Add DOM rendering for board state.
* [ ] Add player name input and restart button.
* [ ] Display game results dynamically.
* [ ] Polish UI for a clean final version.

---

## 💡 Notes

This project follows **The Odin Project’s** JavaScript curriculum principles for modular code design, emphasizing readability and reusability.

---

Would you like me to add sections for **installation**, **usage**, or **contributing** (to make it look like a complete open-source README)?
