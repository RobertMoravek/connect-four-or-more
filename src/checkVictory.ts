import { player } from "./types";

export function checkForVictory(
    gameBoard: player[][],
    config: [number, number, number],
    lastMove: [number, number, 1 | 2]
): boolean {
    //vertical set
    let verticalSet = gameBoard[lastMove[0]].slice(0, lastMove[1] + 1);
    //horizontal set
    let horizontalArray = gameBoard.map((e) => e.splice(lastMove[1], 1));
    let horizontalSet = horizontalArray.flat();
    //diagonal set
    let columnIndex = config[0];
    let rowIndex = config[1];
    while (
        config[1] > verticalSet.length - 1 &&
        config[0] < horizontalSet.length - 1
    ) {
        rowIndex -= 1;
        columnIndex += 1;
    }

    //avoid unnecessary checks for the diagonals
    if (set.length < config[2]) {
        return false;
    }

    var count = 0;
    var winningHoles = $();
    //loop through the set (of rows or slots)
    for (let i = 0; i < set.length; i++) {
        var hole = set.eq(i).children().children();

        if (hole.hasClass("player-" + currentPlayer)) {
            count++;
            console.log("count", count);

            //keep track of winning holes
            winningHoles = winningHoles.add(hole);
            // console.log("winning holes", winningHoles);

            //check for win:
            if (count === numberWin) {
                //styling for winning holes
                winningHoles.addClass("win");
                return true;
                // alert("Player " + currentPlayer + "won");
            }
        } else {
            count = 0;
            winningHoles = $();
        }
    }
    return false;
}
