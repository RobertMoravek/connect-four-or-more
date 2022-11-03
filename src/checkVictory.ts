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
    let verticalSetArray: number[][] = gameBoard[colIdx]
        .slice(0, rowIdx + 1)
        .map((e, idx) => [colIdx, idx, e]);

    //horizontal set
    let horizontalSetArray: number[][] = gameBoard.map((e, idx) =>
        [idx, rowIdx, e.slice(rowIdx, rowIdx + 1)].flat()
    );

    //diagonal sets
    //1. backward diagonal - find the starting slot
    let diagBackSetArray: number[][] = [];
    while (colIdx > 0 && rowIdx < rowCount - 1) {
        colIdx -= 1;
        rowIdx += 1;
    }
    //add starting slot to backward diagonal
    diagBackSetArray.push([colIdx, rowIdx, gameBoard[colIdx][rowIdx]]);

    //add the other slots
    while (colIdx < colCount - 1 && rowIdx > 0) {
        colIdx += 1;
        rowIdx -= 1;
        diagBackSetArray.push([colIdx, rowIdx, gameBoard[colIdx][rowIdx]]);
    }

    //2. forward diagonal - find the starting slot
    let diagFwdSetArray: number[][] = [];
    while (colIdx > 0 && rowIdx > 0) {
        colIdx -= 1;
        rowIdx -= 1;
    }
    //add starting slot to backward diagonal
    diagFwdSetArray.push([colIdx, rowIdx, gameBoard[colIdx][rowIdx]]);

    //add the other slots
    while (colIdx < colCount - 1 && rowIdx < rowCount - 1) {
        colIdx += 1;
        rowIdx += 1;
        diagFwdSetArray.push([colIdx, rowIdx, gameBoard[colIdx][rowIdx]]);
    }

    //getting the slot values out of the whole set
    // let set = [].concat(...paramSet.map((e) => e[2]));

    //???avoid unnecessary checks for shorter sets
    // if (set.length < nbWin) {
    //     return false;
    // }

    let count = 0;
    let winningSlots: [number, number][] | null = [];

    for (let slot of paramSet) {
        if (slot[2] == playerTurn) {
            count++;

            //update winning slots array
            winningSlots.push([slot[0], slot[1]]);
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
