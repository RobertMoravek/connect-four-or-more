import { activeGames, gameObject } from "./types";

// Set a code for a new Game
export function createNewGame(
    activeGames: activeGames,
    socketId: string
): string {
    let tempRandomString: string = generateRandomString(6);
    if (isRandomStringUnique(tempRandomString, activeGames)) {
        activeGames[tempRandomString] = newGameObject(socketId);
    } else {
        createNewGame(activeGames, socketId);
    }
    return tempRandomString;
}

// Generate a random 6 letter uppercase string
export const generateRandomString = (myLength: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
    const randomString = randomArray.join("");
    return randomString;
};

// Check wether tempRandomString is already in use
export function isRandomStringUnique(
    tempRandomString: string,
    activeGames: activeGames
): boolean {
    // If activeGames has the created key, return false
    if (tempRandomString in activeGames) {
        return false;
    }
    // Otherwise return true
    return true;
}

// Create new gameObject
export function newGameObject(socketId: string): gameObject {
    return {
        gameBoard: null,
        // playerName?: [string, string],
        playerTurn: null,
        score: [0, 0],
        gameState: "config",
        winner: null,
        config: [7, 6, 4],
        sockets: [socketId, null],
        lastMove: null,
        winningSlots: null,
    };
}

// Validate user Config and change if neccessary, set gameState to ready
export function validateUserConfig (config: [number, number, number ], activeGames: activeGames, code: string): void {
    if (
        checkUserConfigForInteger(config) &&
        checkUserConfigValues(config)
    ) {
        activeGames[code].config = config;
    } else {
        activeGames[code].config = [6, 7, 4];
    }
    activeGames[code].gameState = "ready";
}


// Check if user config contains integers
export function checkUserConfigForInteger(
    config: [number, number, number]
): boolean {
    return config.every((item) => {
        return Number.isInteger(item);
    });
}

// Check user config values against what we allow
export function checkUserConfigValues(
    config: [number, number, number]
): boolean {
    if (config[0] > 6 && config[0] < 12 ) {
        if (config[1] > 5 && config[1] < 12) {
            if (config[2] > 3 && config[2] < 7) {
                return true;
            }
        }
    }
    return false;
}

// Check if requested game exists
export function checkForExistingGame(
    activeGames: activeGames,
    code: string
): boolean {
    let temp: boolean = false;
    Object.keys(activeGames).some((item) => {
        if (item === code) {
            temp = true;
        }
    });
    return temp;
}

// Check if all criteria are met for the game to start and then do it by changing gameState to running
export function startGameIfReady (activeGames: activeGames ,gameCode: string): void {
    if (activeGames[gameCode].gameState === "ready" && typeof activeGames[gameCode].sockets[0] === "string" && typeof activeGames[gameCode].sockets[1] === "string") {
        activeGames[gameCode].gameBoard = [];
        for (let i: number = 0; i < activeGames[gameCode].config[0]; i++) {
            activeGames[gameCode].gameBoard[i] = new Array(activeGames[gameCode].config[1]).fill(null);
        }
        activeGames[gameCode].playerTurn = randomPlayerTurn();
        activeGames[gameCode].gameState = "running";
    }
}

// Generate a 1 or a 2 to use as initial playerTurn
export function randomPlayerTurn (): 1 | 2 {
    let tempNum: number = Math.floor(Math.random()*2)+1;
    if (tempNum === 1 || tempNum === 2) {
        return tempNum
    }
}


// Check validity of player move
export function checkValidMove(activeGames: activeGames, coloumn: number, player: 1 | 2, gameCode: string): boolean {
    if (checkIfCorrectPlayer(activeGames, player, gameCode) && checkIfEmptySlotLeftInColoumn(activeGames, coloumn, gameCode)) {
        return true;
    }
    return false;
}

// Check if the correct player made the move
export function checkIfCorrectPlayer(activeGames: activeGames, player: 1 | 2, gameCode: string) : boolean {
    if (activeGames[gameCode].playerTurn === player) {
        return true;
    }
    return false;
}

// Check if there is at least one slot in the coloumn left
export function checkIfEmptySlotLeftInColoumn(activeGames: activeGames, coloumn: number, gameCode: string) : boolean {
    if (activeGames[gameCode].gameBoard[coloumn].includes(null)) {
        return true;
    }
    return false;
}

// Add lastMove to gameBoard
export function addLastMoveToGameBoard(activeGames: activeGames, coloumn:number, player: 1 | 2, gameCode:string):void {
    let freeSlot: number = activeGames[gameCode].gameBoard[coloumn].find(item => item === null);
    activeGames[gameCode].gameBoard[coloumn][freeSlot] = player;
}


// Set gameObject to reflect win-state
export function setWinningState(activeGames: activeGames, player: 1 | 2, gameCode:string) {
    activeGames[gameCode].gameState = "end";
    activeGames[gameCode].winner = player;
    activeGames[gameCode].score[player-1]++;
}

// Toggle playerTurn to next player
export function togglePlayerTurn(activeGames:activeGames, gameCode) {
    if (activeGames[gameCode].lastMove[1] === 1) {
        activeGames[gameCode].playerTurn = 2
    } else {
        activeGames[gameCode].playerTurn = 1
    }
}

// Check wether the gameBoard is full, returns true or false
export function checkForDraw(activeGames: activeGames, gameCode: string): boolean {
    let draw: boolean = false;
    for (let i = 0; i < activeGames[gameCode].config[0]; i++) {
        if (!activeGames[gameCode].gameBoard[i].some(null)) {
            draw = true;
        };
    return draw;

    }
}


// On disconnect delete the socket from active games
export function deleteSocketfromActiveGames(
    socketId,
    activeGames: activeGames
): [boolean, string?] {
    // set up a variable to receive the Code of the game with a leftover player (if there is one)
    let isSecondPlayerLeft: boolean | string = false;
    // Go through all games and look for the socket.id that disconnected
    Object.entries(activeGames).map((item) => {
        if (socketId === item[1].sockets[0]) {
            item[1].sockets[0] = null;
            // Check if there is still another player in that game
            isSecondPlayerLeft = checkIfSecondPlayerStillThere(activeGames, item[0], 1)
        }
        if (socketId === item[1].sockets[1]) {
            item[1].sockets[1] = null;
            // Check if there is still another player in that game
            isSecondPlayerLeft = checkIfSecondPlayerStillThere(activeGames, item[0], 0)
        }
    });
    // If a player was left, return the Code of their game
    if (isSecondPlayerLeft) {
        return [true, isSecondPlayerLeft]
    } else {
        return [false]
    }
}

// Check if there is a player left in the room, when one socket disconnects
export function checkIfSecondPlayerStillThere(activeGames: activeGames, gameCode: string, socketSlot: 0 | 1): boolean | string {
    // If not, then delete that game from the activeGames and return false
    if (activeGames[gameCode].sockets[socketSlot] === null) {
        delete activeGames[gameCode];
        return false
    //  If yes, then set gameState to "closed", turn "off" playerTurn and return the Code of that game
    } else {
        activeGames[gameCode].gameState = "closed";
        activeGames[gameCode].playerTurn = null; 
        return gameCode
    }
}
