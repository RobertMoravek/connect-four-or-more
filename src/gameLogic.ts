import { activeGames, gameObject } from "./types";


// Set a code for a new Game
export function setCodeForNewGame (activeGames:activeGames, socketId:string):string {
    let tempRandomString: string = generateRandomString(6);
    if (isRandomStringUnique(tempRandomString, activeGames)) {
        activeGames[tempRandomString] = newGameObject(socketId)
    } else {
        setCodeForNewGame(activeGames, socketId);
    }
    return tempRandomString;
}

// Generate a random 6 letter and digit uppercase string
export const generateRandomString = (myLength:number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

// Check wether tempRandomString is already in use
export function isRandomStringUnique (tempRandomString: string, activeGames: activeGames): boolean {
    // If the activeGames has no games, return true
    if (activeGames === null) {
        return true
    };
    // If activeGames doesn't have the created key, return false
    if (!(tempRandomString in activeGames)) {
        return true
    };
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
    }
}
