"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorMessage = void 0;
const errorMessages = {
    1: "Game with the entered code does not exist (anymore). Please enter a valid code.",
    2: "The other player has left the game or has lost their connection. Please start or join a new game.",
    3: "Invalid move. You either chose a column, that is already full or it's not your turn.",
    4: "Something went wrong. Please start or join a new game.",
};
function createErrorMessage(code) {
    return {
        errorCode: code,
        errorMessage: errorMessages[code],
    };
}
exports.createErrorMessage = createErrorMessage;
//# sourceMappingURL=errors.js.map