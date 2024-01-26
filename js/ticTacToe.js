/*
 * A complete tic-tac-toe widget, using JQuery.  Just include this
 * script in a browser page and play.  A tic-tac-toe game will be
 * included as a child element of the element with id "tictactoe".
 * If the page has no such element, it will just be added at the end
 * of the body.
 */
$(function () {


    var squares = [],
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",
        myOutcome = document.querySelector("#myOutcome"),
        myResetButton = document.querySelector("#myResetButton"),
        myTurnStatement = document.querySelector("#myTurn"),

    /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
    wins = [7, 56, 448, 73, 146, 292, 273, 84],

    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    startNewGame = function () {
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) {square.html(EMPTY);});

        //my additions
        myOutcome.innerHTML = "";
        myTurnStatement.innerHTML = "X goes first.";
    },

    /*
     * Returns whether the given score is a winning score.
     */
    win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    set = function () {
        if ($(this).html() !== EMPTY) {
            return;
        }
        $(this).html(turn);
        console.log($(this));
        moves += 1;
        score[turn] += $(this)[0].indicator;
        console.log(score[turn]);
        if (win(score[turn])) {
            //my additions
            myOutcome.innerHTML = turn + " wins!";
            
            //-------------

            //alert(turn + " wins!");
            //startNewGame();
        } else if (moves === SIZE * SIZE) {
            //my additions
            myOutcome.innerHTML = "Cat's game!";
            
            //----------

            //alert("Cat\u2019s game!");
            //startNewGame();
        } else {
            turn = turn === "X" ? "O" : "X";
        }
    },

    /*
     * Changes the message saying who's turn it is
     * to current player's turn.
     * If end game occurs, turn message becomes empty
     */
    myTurn = function () {
        if (win(score[turn]) || moves === SIZE * SIZE) { //if any win scenario
            //non-breaking space prevents board from shifting up at end of game
            myTurnStatement.innerHTML = "&nbsp;";        
        } else {                                         //otherwise
            myTurnStatement.innerHTML = turn + "'s turn";//state current turn
        }
    },

    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    play = function () {
        var board = $("<table border=1 cellspacing=0>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height=50 width=50 align=center valign=center></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                //my addition
                cell.click(myTurn);
                //myResetButton.addEventListener("click", startNewGame);
                //-----------------
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }

        //startNewGame() is called whenever the RESET GAME button is clicked
        myResetButton.addEventListener("click", startNewGame);

        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    };

    

    play();
});


/*
myTurn = function () {
    if ($(this).html() !== EMPTY) {
        return;
    }
    var turn = document.querySelector("#myTurn").innerHTML = "TEST";

    }



    //my variables
    
    */