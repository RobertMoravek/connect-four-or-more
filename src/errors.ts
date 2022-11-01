const errorMessages: {[key: number]: string} = {
    1: "Game with the entered Code does not exist (anymore). Please enter a valid Code.",
    2: "The other player has left the game or has lost their connection. Please start or join a new game.",
}

export function createErrorMessage(code: number): {errorCode: number, errorMessage: string} {
    return {
        errorCode: code,
        errorMessage: errorMessages[code]
        }
}