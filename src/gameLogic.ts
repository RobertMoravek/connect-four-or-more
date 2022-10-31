import { activeGames, gameObject } from "./types";


// Set a code for a new Game
export function setCodeForNewGame (activeGames:activeGames, socketId:string):void {
    let tempRandomString: string = generateRandomString();
    if (isRandomStringUnique(tempRandomString, activeGames)) {
        activeGames[tempRandomString] = newGameObject(socketId)
    } else {
        setCodeForNewGame(activeGames, socketId);
    }
}

// Generate a random 6 letter and digit uppercase string
export function generateRandomString(): string {
    const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const randomArray: string[] = Array.from(
        { length: 6 },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString: string = randomArray.join("");
    return randomString;
}

// Check wether tempRandomString is already in use
export function isRandomStringUnique (tempRandomString: string, activeGames: activeGames): boolean {
    // If the activeGames has no games, return false
    if (activeGames === null) {
        return false
    };
    // If activeGames doesn't have the created key, return false
    if (!(tempRandomString in activeGames)) {
        return false
    };
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
        error: false,
        // errorMessage: string;
    }
}
