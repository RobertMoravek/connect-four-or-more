import { player } from "./types";

export function checkForVictory(
    gameBoard: player[][],
    config: [number, number, number],
    lastMove: [number, number, 1 | 2],
    playerTurn: player
): boolean {
    let colIdx: number = lastMove[0];
    let rowIdx: number = lastMove[1];
    let colCount: number = config[0];
    let rowCount: number = config[1];
    let nbWin: number = config[2];
    //vertical set
    let verticalSet: player[] = gameBoard[colIdx].slice(0, rowIdx + 1);
    //horizontal set
    let horizontalArray: player[] = [].concat(
        ...gameBoard.map((e) => e.slice(rowIdx, rowIdx + 1))
    );

    //diagonal sets
    //1. backward diagonal - find the starting slot
    let diagBack: player[];
    while (colIdx > 0 && rowIdx < rowCount - 1) {
        colIdx -= 1;
        rowIdx += 1;
    }
    //add starting slot to backward diagonal
    diagBack.push(gameBoard[colIdx][rowIdx]);

    //add the other slots
    while (colIdx < colCount - 1 && rowIdx > 0) {
        colIdx += 1;
        rowIdx -= 1;
        diagBack.push(gameBoard[colIdx][rowIdx]);
    }

    //2. forward diagonal - find the starting slot
    let diagFwd: player[];
    while (colIdx > 0 && rowIdx > 0) {
        colIdx -= 1;
        rowIdx -= 1;
    }
    //add starting slot to backward diagonal
    diagFwd.push(gameBoard[colIdx][rowIdx]);

    //add the other slots
    while (colIdx < colCount - 1 && rowIdx < rowCount - 1) {
        colIdx += 1;
        rowIdx += 1;
        diagFwd.push(gameBoard[colIdx][rowIdx]);
    }

    //avoid unnecessary checks for shorter sets
    if (set.length < nbWin) {
        return false;
    }

    let count = 0;
    let winningSlots: [number, number][] | null;

    for (let slot of set) {
        if (slot == playerTurn) {
            count++;

            //update winning slots array

            //check for win
            if (count === nbWin) {
                return true;
            }
        } else {
            count = 0;
            winningSlots = null;
        }
    }
    return false;
}
