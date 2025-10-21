9 blocks in a grid.
3 blocks in a row and column. 3x3 grid.
div -> button 

How do I draw the board?
- DOM manipulation?
- How to map the array to the DOM?

How do I initiate the game?
- start button
- Start button Initiates player one's turn
- Checks for game over
- Then player 2's turn
- check game over
- repeat until game over

gameController
- set current player to player 1
- set game over to false
- switch player method
    - switch between players
- playround method
    - check for game over
    - check for a winner
    - check for a draw
    - switch player
- start
    - reset game board
    - set game over to false
    - set current player
