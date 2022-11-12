import express from "express";
const app = express();
const path = require("path");
const server = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(server);

import { ActiveGames } from "./types";
import {
    deleteSocketfromActiveGames,
    createNewGame,
    validateUserConfig,
    startGameIfReady,
    checkValidMove,
    addLastMoveToGameBoard,
    setPlayAgain,
    checkIfBothWantToPlayAgain,
    prepareRestartGame,
    setWinningState,
    checkForDraw,
    togglePlayerTurn,
    setDrawState,
    doesGameExist,
} from "./gameLogic";
import { createErrorMessage } from "./errors";
import { checkForVictory } from "./checkVictory";

const port: number = 8080;
const activeGames: ActiveGames = {};

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (
            typeof req.headers["x-forwarded-proto"] == "string" &&
            req.headers["x-forwarded-proto"].startsWith("https")
        ) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/index.html"));
});

io.on("connection", (socket) => {
    // console.log("a user connected: socket-id:", socket.id);

    // Start a new game
    socket.on("new-game", () => {
        let gameCode: string = createNewGame(activeGames, socket.id);
        socket.join(gameCode);
        io.in(gameCode).emit("game-update", activeGames[gameCode], gameCode);
    });

    // Check and set user game config
    socket.on(
        "config-ready",
        (config: [number, number, number], code: string) => {
            if (doesGameExist(activeGames, code)) {
                validateUserConfig(config, activeGames[code]);
                startGameIfReady(activeGames[code]);
                io.in(code).emit("game-update", activeGames[code]);
            } else {
                io.to(socket.id).emit("error", createErrorMessage(4));
            }
        }
    );

    // Check code and add second player to game (if game exists)
    socket.on("join-game", (code: string) => {
        if (doesGameExist(activeGames, code)) {
            activeGames[code].sockets[1] = socket.id;
            socket.join(code);
            startGameIfReady(activeGames[code]);
            io.in(code).emit("game-update", activeGames[code], code);
        } else {
            io.to(socket.id).emit("error", createErrorMessage(1));
        }
    });

    // Handle click on column to add slot - check if the game exists, check if move is valid, if yes, add it to game board
    socket.on("column-click", (column: number, player: 1 | 2, code: string) => {
        if (doesGameExist(activeGames, code)) {
            if (checkValidMove(activeGames[code], column, player)) {
                activeGames[code].lastMove = [
                    column,
                    activeGames[code].gameBoard[column].indexOf(null),
                    player,
                ];
                activeGames[code].playerTurn = null;
                io.in(code).emit("game-update", activeGames[code], code);
                setTimeout(() => {
                    addLastMoveToGameBoard(activeGames[code]);
                    if (checkForVictory(activeGames[code])) {
                        setWinningState(activeGames[code]);
                    } else {
                        if (checkForDraw(activeGames[code])) {
                            setDrawState(activeGames[code]);
                        } else {
                            togglePlayerTurn(activeGames[code]);
                        }
                    }
                    activeGames[code].lastMove = null;
                    io.in(code).emit("game-update", activeGames[code], code);
                }, 1500);
            } else {
                io.to(socket.id).emit("error", createErrorMessage(3));
            }
        } else {
            io.to(socket.id).emit("error", createErrorMessage(4));
        }
    });

    // If one player clicks "play again", mark playAgain true for them, and check if the other player also clicked play again. If yes, prepare the game for restart. Emit new gamestate either way.
    socket.on(
        "play-again",
        (code: string, config?: [number, number, number]) => {
            if (doesGameExist(activeGames, code)) {
                setPlayAgain(activeGames[code], socket.id, config);
                if (checkIfBothWantToPlayAgain(activeGames[code])) {
                    prepareRestartGame(activeGames[code]);
                }
                io.in(code).emit("game-update", activeGames[code]);
            } else {
                io.to(socket.id).emit("error", createErrorMessage(4));
            }
        }
    );

    socket.on("leave-game", () => {
        // Delete the disconnecting socket from existing games & if there is still another player in that game, give back the code of that game
        let leftOverPlayer: [boolean, string?] = deleteSocketfromActiveGames(
            socket.id,
            activeGames
        );
        // If there was a player left, send appropriate game update to the room with the game set to "closed"
        if (leftOverPlayer[0]) {
            // io.in(leftOverPlayer[1]).emit("error", createErrorMessage(2));
            io.in(leftOverPlayer[1]).emit(
                "game-update",
                activeGames[leftOverPlayer[1]]
            );
        }
    });

    socket.on("disconnect", () => {
        // Delete the disconnecting socket from existing games & if there is still another player in that game, give back the code of that game
        let leftOverPlayer: [boolean, string?] = deleteSocketfromActiveGames(
            socket.id,
            activeGames
        );
        // If there was a player left, send appropriate game update to the room with the game set to "closed"
        if (leftOverPlayer[0]) {
            // io.in(leftOverPlayer[1]).emit("error", createErrorMessage(2));
            io.in(leftOverPlayer[1]).emit(
                "game-update",
                activeGames[leftOverPlayer[1]]
            );
        }
    });
});

if (process.env.NODE_ENV !== "test") {
    server.listen(process.env.PORT || port, function () {
        console.log("I'm listening.");
    });
}
