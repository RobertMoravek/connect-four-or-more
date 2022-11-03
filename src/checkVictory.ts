import { Player, GameObject } from "./types";

function getVerticalSet(gameObject: GameObject): number[][] {
    let colIdx: number = gameObject.lastMove[0];
    let rowIdx: number = gameObject.lastMove[1];
    return gameObject.gameBoard[colIdx]
        .slice(0, rowIdx + 1)
        .map((e: number, idx: number) => [colIdx, idx, e]);
}

function getHorizontalSet(gameObject: GameObject): number[][] {
    let rowIdx: number = gameObject.lastMove[1];
    return gameObject.gameBoard.map((e: number[], idx: number) =>
        [idx, rowIdx, e.slice(rowIdx, rowIdx + 1)].flat()
    );
}

function getBackDiagonal(gameObject: GameObject): number[][] {
    let colIdx: number = gameObject.lastMove[0];
    let rowIdx: number = gameObject.lastMove[1];
    let colCount: number = gameObject.config[0];
    let rowCount: number = gameObject.config[1];
    let diagBack: number[][] = [];

    //find starting slot and add to diagonal array
    while (colIdx > 0 && rowIdx < rowCount - 1) {
        colIdx -= 1;
        rowIdx += 1;
    }
    diagBack.push([colIdx, rowIdx, gameObject.gameBoard[colIdx][rowIdx]]);

    //add the other slots
    while (colIdx < colCount - 1 && rowIdx > 0) {
        colIdx += 1;
        rowIdx -= 1;
        diagBack.push([colIdx, rowIdx, gameObject.gameBoard[colIdx][rowIdx]]);
    }

    return diagBack;
}

function getFwdDiagonal(gameObject: GameObject): number[][] {
    let colIdx: number = gameObject.lastMove[0];
    let rowIdx: number = gameObject.lastMove[1];
    let colCount: number = gameObject.config[0];
    let rowCount: number = gameObject.config[1];

    let diagFwd: number[][] = [];
    //find starting slot and add to diagonal array
    while (colIdx > 0 && rowIdx > 0) {
        colIdx -= 1;
        rowIdx -= 1;
    }
    diagFwd.push([colIdx, rowIdx, gameObject.gameBoard[colIdx][rowIdx]]);

    //add the other slots
    while (colIdx < colCount - 1 && rowIdx < rowCount - 1) {
        colIdx += 1;
        rowIdx += 1;
        diagFwd.push([colIdx, rowIdx, gameObject.gameBoard[colIdx][rowIdx]]);
    }

    return diagFwd;
}

function checkNbWinningSlots(set: number[][], gameObject: GameObject): boolean {
    let winningNumber: number = gameObject.config[2];
    let playerTurn: Player = gameObject.playerTurn;

    //avoid unnecessary checks for shorter sets
    if (set.length < winningNumber) {
        return false;
    }

    let count: number = 0;
    let winningSlots: [number, number][] | null = [];

    for (let slot of set) {
        if (slot[2] == playerTurn) {
            count++;
            winningSlots.push([slot[0], slot[1]]);
        } else {
            //check for win - also accounts for cases where there are more slots than the required winning slots
            if (count >= winningNumber) {
                gameObject.winningSlots = winningSlots;
                return true;
            } else {
                count = 0;
                winningSlots = [];
            }
        }
    }
    return false;
}

export function checkForVictory(gameObject: GameObject): boolean {
    let victory: boolean = false;

    if (
        checkNbWinningSlots(getVerticalSet(gameObject), gameObject) ||
        checkNbWinningSlots(getHorizontalSet(gameObject), gameObject) ||
        checkNbWinningSlots(getBackDiagonal(gameObject), gameObject) ||
        checkNbWinningSlots(getFwdDiagonal(gameObject), gameObject)
    ) {
        victory = true;
    }

    return victory;
}
