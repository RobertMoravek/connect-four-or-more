import { describe, expect, test } from "@jest/globals";
import {
    addLastMoveToGameBoard,
    checkForDraw,
    checkForExistingGame,
    checkIfBothWantToPlayAgain,
    checkIfCorrectPlayer,
    checkIfEmptySlotLeftInColoumn,
    checkUserConfigForInteger,
    checkUserConfigValues,
    createNewGame,
    deleteSocketfromActiveGames,
    isRandomStringUnique,
    newGameObject,
    prepareRestartGame,
    setPlayAgain,
    setWinningState,
    startGameIfReady,
    togglePlayerTurn,
} from "../src/gameLogic";
import { checkForVictory } from "../src/checkVictory";
import { ActiveGames, GameObject } from "../src/types";

// createNewGame
describe("createNewGame", () => {
    test("creates a random 6 letter uppercase string and tests wether it's unique", () => {
        expect(createNewGame({}, "abcde")).toMatch(/[A-Z]+/);
        expect(createNewGame({}, "abcde")).toHaveLength(6);
    });
});

// isRandomStringUnique
describe("isRandomStringUnique", () => {
    test("checks wether a given string is unique in the activeGames Object", () => {
        expect(
            isRandomStringUnique("ABCDEF", {
                ABCDEF: {
                    gameBoard: null,
                    // playerName?: [string, string],
                    playerTurn: null,
                    score: [0, 0],
                    gameState: "config",
                    winner: null,
                    config: [7, 6, 4],
                    sockets: [null, null],
                    lastMove: null,
                    winningSlots: null,
                    playAgain: [false, false],
                    playerStartedLast: null,
                },
                XYZABE: {
                    gameBoard: null,
                    // playerName?: [string, string],
                    playerTurn: null,
                    score: [0, 0],
                    gameState: "config",
                    winner: null,
                    config: [7, 6, 4],
                    sockets: [null, null],
                    lastMove: null,
                    winningSlots: null,
                    playAgain: [false, false],
                    playerStartedLast: null,
                },
            })
        ).toBe(false);
    });
});

describe("newGameObject", () => {
    test("creates a new gameOBject in the actiGames with the passed in socketId as sockets[0] ", () => {
        expect(newGameObject("abcde")).toStrictEqual({
            gameBoard: null,
            // playerName?: [string, string],
            playerTurn: null,
            score: [0, 0],
            gameState: "config",
            winner: null,
            config: [7, 6, 4],
            sockets: ["abcde", null],
            lastMove: null,
            winningSlots: null,
            playerStartedLast: null,
            playAgain: [false, false],
        });
    });
});

describe("checkUserConfigForInteger", () => {
    test("checks wether the user config contains only integers and returns true if yes, false if no", () => {
        expect(checkUserConfigForInteger([1, 2, 4])).toBeTruthy();
        expect(checkUserConfigForInteger([1, 2, 1.5])).toBeFalsy();
    });
});

describe("checkUserConfigValue", () => {
    test("returns true, if config[0] is between 7 and 11, config[1] is between 6 and 11 and config[2] is between 4 and 6", () => {
        expect(checkUserConfigValues([1, 6, 4])).toBeFalsy();
        expect(checkUserConfigValues([7, 5, 4])).toBeFalsy();
        expect(checkUserConfigValues([7, 6, 3])).toBeFalsy();
        expect(checkUserConfigValues([12, 11, 6])).toBeFalsy();
        expect(checkUserConfigValues([11, 12, 6])).toBeFalsy();
        expect(checkUserConfigValues([11, 11, 7])).toBeFalsy();
        expect(checkUserConfigValues([7, 6, 4])).toBeTruthy();
    });
});

describe("checkForExistingGame", () => {
    test("if requested game exists, returns true", () => {
        expect(
            checkForExistingGame(
                {
                    ABCDEF: {
                        gameBoard: null,
                        // playerName?: [string, string],
                        playerTurn: null,
                        score: [0, 0],
                        gameState: "config",
                        winner: null,
                        config: [7, 6, 4],
                        sockets: [null, null],
                        lastMove: null,
                        winningSlots: null,
                        playAgain: [false, false],
                        playerStartedLast: null,
                    },
                    XYZABE: {
                        gameBoard: null,
                        // playerName?: [string, string],
                        playerTurn: null,
                        score: [0, 0],
                        gameState: "config",
                        winner: null,
                        config: [7, 6, 4],
                        sockets: [null, null],
                        lastMove: null,
                        winningSlots: null,
                        playAgain: [false, false],
                        playerStartedLast: null,
                    },
                },
                "ABCDEF"
            )
        ).toBeTruthy();
        expect(
            checkForExistingGame(
                {
                    ABCDEF: {
                        gameBoard: null,
                        // playerName?: [string, string],
                        playerTurn: null,
                        score: [0, 0],
                        gameState: "config",
                        winner: null,
                        config: [7, 6, 4],
                        sockets: [null, null],
                        lastMove: null,
                        winningSlots: null,
                        playAgain: [false, false],
                        playerStartedLast: null,
                    },
                    XYZABE: {
                        gameBoard: null,
                        // playerName?: [string, string],
                        playerTurn: null,
                        score: [0, 0],
                        gameState: "config",
                        winner: null,
                        config: [7, 6, 4],
                        sockets: [null, null],
                        lastMove: null,
                        winningSlots: null,
                        playAgain: [false, false],
                        playerStartedLast: null,
                    },
                },
                "ABASEF"
            )
        ).toBeFalsy();
    });
});

describe("deleteSocketfromActiveGames", () => {
    test("", () => {
        let activeGames: ActiveGames = {
            ABCDEF: {
                gameBoard: null,
                // playerName?: [string, string],
                playerTurn: null,
                score: [0, 0],
                gameState: "config",
                winner: null,
                config: [7, 6, 4],
                sockets: ["abcde", null],
                lastMove: null,
                winningSlots: null,
                playAgain: [false, false],
                playerStartedLast: null,
            },
            XYZABE: {
                gameBoard: null,
                // playerName?: [string, string],
                playerTurn: null,
                score: [0, 0],
                gameState: "config",
                winner: null,
                config: [7, 6, 4],
                sockets: ["hallo", "uvwxyz"],
                lastMove: null,
                winningSlots: null,
                playAgain: [false, false],
                playerStartedLast: null,
            },
        };
        expect(deleteSocketfromActiveGames("abcde", activeGames)).toEqual([
            false,
        ]);
        expect(activeGames).toEqual({
            XYZABE: {
                gameBoard: null,
                // playerName?: [string, string],
                playerTurn: null,
                score: [0, 0],
                gameState: "config",
                winner: null,
                config: [7, 6, 4],
                sockets: ["hallo", "uvwxyz"],
                lastMove: null,
                winningSlots: null,
                playAgain: [false, false],
                playerStartedLast: null,
            },
        });
        expect(deleteSocketfromActiveGames("uvwxyz", activeGames)).toEqual([
            true,
            "XYZABE",
        ]);
        expect(activeGames).toEqual({
            XYZABE: {
                gameBoard: null,
                // playerName?: [string, string],
                playerTurn: null,
                score: [0, 0],
                gameState: "closed",
                winner: null,
                config: [7, 6, 4],
                sockets: ["hallo", null],
                lastMove: null,
                winningSlots: null,
                playAgain: [false, false],
                playerStartedLast: null,
            },
        });
        expect(deleteSocketfromActiveGames("hallo", activeGames)).toEqual([
            false,
        ]);
        expect(activeGames).toEqual({});
    });
});

describe("startGameIfReady", () => {
    test("checks wether the the condition for a game to start have been met and if so changes gameState to running", () => {
        let gameObject: GameObject = {
            gameBoard: null,
            // playerName?: [string, string],
            playerTurn: null,
            score: [0, 0],
            gameState: "ready",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: null,
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };

        startGameIfReady(gameObject);
        expect(gameObject.gameState).toBe("running");
        expect([1, 2]).toContain(gameObject.playerTurn);
        expect(gameObject.gameBoard).toEqual([
            [null, null, null],
            [null, null, null],
        ]);
    });
});

describe("checkIfCorrectPlayer", () => {
    test("checks wether the player whose turn it is made the move and returns true/false", () => {
        let gameObject: GameObject = {
            gameBoard: null,
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "ready",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: null,
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        expect(checkIfCorrectPlayer(gameObject, 2)).toBeTruthy();
        expect(checkIfCorrectPlayer(gameObject, 1)).toBeFalsy();
        expect(checkIfCorrectPlayer(gameObject, null)).toBeFalsy();
    });
});

describe("checkIfEmptySlotLeftInColoumn", () => {
    test("checks wether there is at least one empty slot left in the chosen coloumn and returns true/false", () => {
        let gameObject: GameObject = {
            gameBoard: [
                [null, null, null],
                [2, 1, null],
                [1, 2, 2],
            ],
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "ready",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: null,
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        expect(checkIfEmptySlotLeftInColoumn(gameObject, 0)).toBeTruthy();
        expect(checkIfEmptySlotLeftInColoumn(gameObject, 1)).toBeTruthy();
        expect(checkIfEmptySlotLeftInColoumn(gameObject, 2)).toBeFalsy();
    });
});

describe("addLastMoveToGameBoard", () => {
    test("adds the lastMove to the gameBoard, doesn't return anything", () => {
        let gameObject: GameObject = {
            gameBoard: [
                [null, null, null],
                [2, 1, null],
                [1, 2, 2],
            ],
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "ready",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 2, 2],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        addLastMoveToGameBoard(gameObject);
        expect(gameObject.gameBoard[1][2]).toBe(2);
        gameObject = {
            gameBoard: [
                [null, null, null],
                [2, 1, 1],
                [1, 2, 2],
            ],
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "ready",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [0, 0, 2],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        addLastMoveToGameBoard(gameObject);
        expect(gameObject.gameBoard[0][0]).toBe(2);
    });
});

describe("checkIfCorrectPlayer", () => {
    test("checks wether the player whose turn it is made the move and returns true/false", () => {
        let gameObject: GameObject = {
            gameBoard: null,
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 1, 2],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        setWinningState(gameObject);
        expect(gameObject.gameState).toBe("end");
        expect(gameObject.winner).toBe(2);
        expect(gameObject.score[1]).toBe(1);
    });
});

describe("togglePlayerTurn", () => {
    test("changes the playerTurn from 1 to 2 and the other way around, no return", () => {
        let gameObject: GameObject = {
            gameBoard: null,
            // playerName?: [string, string],
            playerTurn: null,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 1, 2],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        togglePlayerTurn(gameObject);
        expect(gameObject.playerTurn).toBe(1);
        gameObject = {
            gameBoard: null,
            // playerName?: [string, string],
            playerTurn: null,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 1, 1],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        togglePlayerTurn(gameObject);
        expect(gameObject.playerTurn).toBe(2);
    });
});

describe("checkForDraw", () => {
    test("returns true, if draw, false if not", () => {
        let gameObject: GameObject = {
            gameBoard: [
                [1, 2, 2],
                [1, 2, 2],
                [1, 2, 2],
            ],
            // playerName?: [string, string],
            playerTurn: null,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 1, 1],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        expect(checkForDraw(gameObject)).toBeTruthy();
        gameObject = {
            gameBoard: [
                [1, 2, null],
                [1, 2, 2],
                [1, 2, 2],
            ],
            // playerName?: [string, string],
            playerTurn: null,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 1, 1],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        expect(checkForDraw(gameObject)).toBeFalsy();
    });
});

describe("setPlayAgain", () => {
    test("sets the playAgain flag of the player who emitted the event to true", () => {
        let gameObject: GameObject = {
            gameBoard: null,
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 1, 2],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        setPlayAgain(gameObject, "hallo");
        expect(gameObject.playAgain[0]).toBeTruthy();
        expect(gameObject.playAgain[1]).toBeFalsy();
        setPlayAgain(gameObject, "sdfsdf");
        expect(gameObject.playAgain[0]).toBeTruthy();
        expect(gameObject.playAgain[1]).toBeTruthy();
        setPlayAgain(gameObject, "hallo", [7, 8, 4]);
        expect(gameObject.config[0]).toBe(7);
    });
});

describe("checkIfBothWantToPlayAgain", () => {
    test("if both playAgain flags are true, return true", () => {
        let gameObject: GameObject = {
            gameBoard: null,
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 1, 2],
            winningSlots: null,
            playAgain: [true, true],
            playerStartedLast: null,
        };
        expect(checkIfBothWantToPlayAgain(gameObject)).toBeTruthy();
        gameObject = {
            gameBoard: null,
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 1, 2],
            winningSlots: null,
            playAgain: [true, false],
            playerStartedLast: null,
        };
        expect(checkIfBothWantToPlayAgain(gameObject)).toBeFalsy();
    });
});

describe("prepareRestartGameWithSameConfig", () => {
    test("resets the relevant variables and flags in the gameObject for another round with the same config", () => {
        let gameObject: GameObject = {
            gameBoard: [
                [1, 2, null],
                [1, 2, null],
            ],
            // playerName?: [string, string],
            playerTurn: null,
            score: [3, 1],
            gameState: "end",
            winner: 1,
            config: [2, 3, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 1, 2],
            winningSlots: [[1, 2]],
            playAgain: [true, true],
            playerStartedLast: 1,
        };
        prepareRestartGame(gameObject);
        expect(gameObject.playerTurn).toBe(2);
        expect(gameObject.winner).toBeNull();
        expect(gameObject.lastMove).toBeNull();
        expect(gameObject.winningSlots).toBeNull();
        expect(gameObject.playAgain[0]).toBeFalsy();
        expect(gameObject.playAgain[1]).toBeFalsy();
        expect(gameObject.gameState).toBe("running");
        expect(gameObject.gameBoard).toEqual([
            [null, null, null],
            [null, null, null],
        ]);
    });
});

describe("checkForVictory", () => {
    test("checkForVictory returns a boolean", () => {
        let gameObject: GameObject = {
            gameBoard: [
                [null, null, null, null, null, null],
                [2, 1, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
            ],
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [7, 6, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [1, 1, 2],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        let victory = checkForVictory(gameObject);
        expect(typeof victory === "boolean").toBeTruthy;
        expect(victory).toBeFalsy;
    });
});

describe("checkForVictory", () => {
    test("find diagonal forward victory which has more slots than the necessary condition", () => {
        let gameObject: GameObject = {
            gameBoard: [
                [1, 2, 1, null, null, null],
                [2, null, null, null, null, null],
                [2, 1, null, null, null, null],
                [1, 2, 1, 2, null, null],
                [1, 2, 2, 1, null, null],
                [1, 2, 2, 2, null, null],
                [2, 1, 1, 2, 2, null],
            ],
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [7, 6, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [6, 4, 2],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        expect(checkForVictory(gameObject)).toBeTruthy;
        expect(gameObject.winningSlots).toEqual([
            [2, 0],
            [3, 1],
            [4, 2],
            [5, 3],
            [6, 4],
        ]);
    });
});

describe("checkForVictory", () => {
    test("find diagonal forward victory & horizontal victory", () => {
        let gameObject: GameObject = {
            gameBoard: [
                [1, 2, 1, null, null, null],
                [2, null, null, null, null, null],
                [2, 1, null, null, null, null],
                [1, 2, 1, 2, null, null],
                [1, 2, 2, 2, null, null],
                [1, 2, 2, 2, null, null],
                [2, 1, 1, 2, 2, null],
            ],
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [7, 6, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [5, 3, 2],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        expect(checkForVictory(gameObject)).toBeTruthy;
        expect(gameObject.winningSlots).toEqual([
            [3, 3],
            [4, 3],
            [5, 3],
            [6, 3],
            [2, 0],
            [3, 1],
            [4, 2],
            [5, 3],
            [6, 4],
        ]);
    });
});

describe("checkForVictory", () => {
    test("find diagonal back victory & vertical victory on a board with winning slots condition 5", () => {
        let gameObject: GameObject = {
            gameBoard: [
                [1, 2, 1, 2, 1, 2, null, null],
                [2, 2, 2, 1, 2, null, null, null],
                [1, 2, 1, 2, null, null, null, null],
                [1, 2, 2, null, null, null, null, null],
                [1, 2, null, null, null, null, null, null],
                [2, 1, 2, null, null, null, null, null],
                [1, 2, 2, 1, null, null, null, null],
                [2, 1, null, null, null, null, null, null],
                [2, 1, 2, null, null, null, null, null],
            ],
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [9, 8, 5],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [4, 1, 2],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        expect(checkForVictory(gameObject)).toBeTruthy;
        expect(gameObject.winningSlots).toEqual([
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
            [0, 5],
            [1, 4],
            [2, 3],
            [3, 2],
            [4, 1],
            [5, 0],
        ]);
    });
});

describe("checkForVictory", () => {
    test("find no victory", () => {
        let gameObject: GameObject = {
            gameBoard: [
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [1, null, null, null, null, null],
                [2, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
            ],
            // playerName?: [string, string],
            playerTurn: 2,
            score: [0, 0],
            gameState: "running",
            winner: null,
            config: [7, 6, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: [4, 0, 2],
            winningSlots: null,
            playAgain: [false, false],
            playerStartedLast: null,
        };
        expect(checkForVictory(gameObject)).toBeFalsy;
    });
});
