import { describe, expect, test } from "@jest/globals";
import {
    checkForExistingGame,
    checkUserConfigForInteger,
    checkUserConfigValues,
    createNewGame,
    deleteSocketfromActiveGames,
    isRandomStringUnique,
    newGameObject,
    startGameIfReady,
    validateUserConfig,
} from "../src/gameLogic";
import { activeGames } from "../src/types";


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
                    },
                },
                "ABASEF"
            )
        ).toBeFalsy();
    });
});

describe("deleteSocketfromActiveGames", () => {
    test("", () => {
        let activeGames: activeGames = {
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
        let activeGames: activeGames = {XYZABE: {
            gameBoard: null,
            // playerName?: [string, string],
            playerTurn: null,
            score: [0, 0],
            gameState: "ready",
            winner: null,
            config: [7, 6, 4],
            sockets: ["hallo", "sdfsdf"],
            lastMove: null,
            winningSlots: null,
        },};
        startGameIfReady(activeGames, "XYZABE");
        expect(activeGames.XYZABE.gameState).toBe("running");
    });
});