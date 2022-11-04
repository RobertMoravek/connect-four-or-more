import express from "express";
import { GameObject, ActiveGames, Player } from "./types";
import {
    deleteSocketfromActiveGames,
    createNewGame,
    checkForExistingGame,
    validateUserConfig,
    startGameIfReady,
    checkValidMove,
    addLastMoveToGameBoard,
    setPlayAgain,
    checkIfBothWantToPlayAgain,
    prepareRestartGame,
} from "./gameLogic";
import { createErrorMessage } from "./errors";

const app = express();
const path = require("path");
const server = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(server);

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
    console.log("a user connected: socket-id:", socket.id);

    // Start a new Game
    socket.on("new-game", () => {
        console.log("Starting a new Game");
        let gameCode: string = createNewGame(activeGames, socket.id);
        socket.join(gameCode);
        io.in(gameCode).emit("game-update", activeGames[gameCode], gameCode);
    });

    // Check and set user game config
    socket.on(
        "config-ready",
        (config: [number, number, number], code: string) => {
            console.log("receiving config");
            validateUserConfig(config, activeGames[code]);
            startGameIfReady(activeGames[code]);
            io.in(code).emit("game-update", activeGames[code]);
        }
    );

    // Check code and join second player to game (if it exists)
    socket.on("join-game", (code: string) => {
        console.log("receiving join request");
        if (checkForExistingGame(activeGames, code)) {
            activeGames[code].sockets[1] = socket.id;
            startGameIfReady(activeGames[code]);
            io.in(code).emit("game-update", activeGames[code], code);
        } else {
            io.to(socket.id).emit("error", createErrorMessage(1));
        }
        // console.log(activeGames);
    });

    // Check code and join second player to game (if it exists)
    socket.on(
        "coloumn-cklick",
        (coloumn: number, player: 1 | 2, code: string) => {
            if (checkValidMove(activeGames[code], coloumn, player)) {
                activeGames[code].lastMove = [
                    coloumn,
                    activeGames[code].gameBoard[coloumn].indexOf(null),
                    player,
                ];
                activeGames[code].playerTurn = null;
                io.in(code).emit("game-update", activeGames[code], code);
                setTimeout(() => {
                    addLastMoveToGameBoard(activeGames[code]);
                    // ******* CHECKVICTORY FUNCTION and it's following functions
                }, 1000);
            } else {
                io.to(socket.id).emit("error", createErrorMessage(3));
            }
        }
    );

    // If one player clicks "play again", mark them as playAgain true and check if the other player is also true. If yes, prepare the game for restart. Emit new gamestate either way.
    socket.on("play-again", (code: string, config?: [number, number, number]) => {
        setPlayAgain(activeGames[code], socket.id, config);
        if (checkIfBothWantToPlayAgain(activeGames[code])) {
            prepareRestartGame(activeGames[code])
        }
        io.in(code).emit("game-update", activeGames[code]);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected: socket-id:", socket.id);
        // Delete the disconnecting socket from existing games & if there is still another player in that game, give back the Code of that game
        let leftOverPlayer: [boolean, string?] = deleteSocketfromActiveGames(
            socket.id,
            activeGames
        );
        // If there was a player left, send appropriate error message to the room and update the game to be "closed"
        if (leftOverPlayer[0]) {
            io.in(leftOverPlayer[1]).emit("error", createErrorMessage(2));
            io.in(leftOverPlayer[1]).emit(
                "game-update",
                activeGames[leftOverPlayer[1]]
            );
        }
        console.log("after leaving", activeGames);
    });
});

if (process.env.NODE_ENV !== "test") {
    server.listen(process.env.PORT || port, function () {
        console.log("I'm listening.");
    });
}
