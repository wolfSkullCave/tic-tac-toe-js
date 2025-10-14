# Objective: Build a tic-tac-toe game

### Objects
- Store gameboard as an array inside of a Gameboard object
- Players 
- game flow

### Goals
- Have as little global code as possible.
- Use factory functions as mush as possible.
- Think carefully about where to place code logic.
- Build the game to work in console first.
- Once the console version of the game is finished add an object to handle the DOM logic.
- Write functions that allow players to add marks on specific parts of the board via DOM.
- Add the following:
    - Clean up display.
    - Allow players to enter their names.
    - Include a start/restart button.
    - Show game results at the end of the game.

### Planning
- Draw a board (console display)
    a0|a1|a2
    b0|b1|b2
    c0|c1|c2
- Players
    - player1 = 'X'
    - player2 = 'O'
- Game logic
    - Player1 places mark
    - Player2 places mark
    - repeat until win conditions are met.
- Win conditions
    - A player has marks in one or more of the following spaces:
        row set
        - a0, a1, a2
        - b0, b1, b2
        - c0, c1, c2
        column set
        - a0, b0, c0
        - a1, b1, c1
        - a2, b2, c2
        diagonal set
        - a0, b1, c2
        - c0, b1, a2
    - Display a message once a win conditions has been met: Player 1 WINS!

### Solution algorithim
Input:
- Player 1 move
- Player 2 move

Processing:
- Create a board
- Initialise players
- Prompt players for moves
- Check for win conditions
- End game if win conditions are met

Output:
- Board state
- Player 1's moves
- Player 2's moves
- Winning player

### Pseudocode
FUNCTION draw_board_state
    SET row_a [' ', ' ', ' ']
    SET row_b [' ', ' ', ' ']
    SET row_c [' ', ' ', ' ']

    draw_board(row)
        FOR EACH position in row
            DISPLAY position + ' | '
        END
    END

    draw_board(row_a)
    draw_board(row_b)
    draw_board(row_c)
END

FUNCTION check_win_conditions(sym, ...grid)
    check if the first, second and third row are all filled with sym 
    checkRows (sym, grid)

    check if first, second and third column are all filled with sym
    checkColumns (sym. grid)
    
    check if forward and backward diagonal are filled with sym
    checkDiagonals (sym, grid)
END

FUNCTION checkRows (sym, ...grid)
    check if grid rows are equal to sym and return true
    else return false
END

FUNCTION checkColumns (sym, ...grid)
    check if grid columns are equal to sym and return true
    else return false
END

FUNCTION checkDiagonals (sym, ...grid)
    check if grid diagonals are equal to sym and return true
    else return false
END

FUNCTION create_players
    Prompt the operator for symbols for player_1 and player_2
    SET symbols for player_1 and player_2    
END

FUNCTION players_move (player)
    Prompt player_1 to select a position on the board
    check if the position is empty (' ')
    IF position is empty THEN
        SET position to player.symbol
    ELSE 
        Print "Position is already taken"
END

Start_gameplay_loop
    WHILE board is not full
        draw_board_state
        create_players
        players_move(player1)
        checkWinConditions(player1.sym, row1,row2,row3)
        players_move(player2)
        checkWinConditions(player2.sym, row1,row2,row3)
    END
END