const errorMessages: { [key: number]: string } = {
    1: "Game with the entered code does not exist (anymore). Please enter a valid code.",
    2: "The other player has left the game or has lost their connection. Please start or join a new game.",
    3: "Invalid move. You either chose a column, that is already full or it's not your turn.",
    4: "Something went wrong. Please start or join a new game.",
};

export function createErrorMessage(code: number): {
    errorCode: number;
    errorMessage: string;
} {
    return {
        errorCode: code,
        errorMessage: errorMessages[code],
    };
}
