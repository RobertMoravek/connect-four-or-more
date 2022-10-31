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
    console.log(randomString);
    return randomString;
};

// Check wether tempRandomString is already in use
export function isRandomStringUnique(
    tempRandomString: string,
    activeGames: activeGames
): boolean {
    // If the activeGames has no games, return true
    if (activeGames === null) {
        return true;
    }
    // If activeGames doesn't have the created key, return false
    if (!(tempRandomString in activeGames)) {
        return true;
    }
    // Otherwise return true
    return false;
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
        error: false,
        // errorMessage: string;
    };
}

// Check if user config makes sense for the game 
export function checkUserConfig (config: [number, number, number]): boolean {
    config.map((item) => {
        if (Number.isInteger(!item)) {
            return false
        }
    })
    return true;
}

// Check if requested game exists
export function checkForExistingGame (activeGames:activeGames, code: string): boolean {
    Object.keys(activeGames).map((item) => {
        if (item === code) {
            return true;
        }
    })
    return false;
}





// On disconnect delete the socket from active games
export function deleteSocketfromActiveGames(socketId, activeGames: activeGames): void {
    Object.entries(activeGames).map((item, index) => {
        console.log(socketId, item[1].sockets[0]);
        if (socketId === item[1].sockets[0]) {
            item[1].sockets[0] = null;
            console.log("after disconnect", activeGames);
            deleteGameIfNoPlayers(activeGames);
        }
        if (socketId === item[1].sockets[1]) {
            item[1].sockets[1] = null;
            console.log("after disconnect", activeGames);
            deleteGameIfNoPlayers(activeGames);
        }
    });
}

// If a game has no more open sockets, delete it from activeGames
export function deleteGameIfNoPlayers(activeGames: activeGames): void {
    Object.entries(activeGames).map((item, index) => {
        if (item[1].sockets[0] === null && item[1].sockets[1] === null) {
            delete activeGames[item[0]];
            console.log("after delete", activeGames);
        }
    });
}
