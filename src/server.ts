import express from "express";
import { gameObject, activeGames } from "./types";
import {
    deleteSocketfromActiveGames,
    createNewGame,
    checkUserConfigForInteger,
    checkUserConfigValues,
    checkForExistingGame,
} from "./gameLogic";
import { createErrorMessage } from "./errors";

const app = express();
const path = require("path");
const server = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port: number = 8080;

const activeGames: activeGames = {};

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

    // Start a new Game
    socket.on("new-game", () => {
        // console.log("Starting a new Game");
        let gameCode: string = createNewGame(activeGames, socket.id);
        // console.log("activeGames", activeGames);
        socket.join(gameCode);
        io.in(gameCode).emit("game-update", activeGames[gameCode], gameCode);
    });

    // Check and set user game config
    socket.on(
        "config-ready",
        (config: [number, number, number], code: string) => {
            // console.log('receiving config');
            if (
                checkUserConfigForInteger(config) &&
                checkUserConfigValues(config)
            ) {
                activeGames[code].config = config;
            } else {
                activeGames[code].config = [6, 7, 4];
            }
            activeGames[code].gameState = "ready";
            io.in(code).emit("game-update", activeGames[code]);
        }
    );

    // Check code and join second player to game (if it exists)
    socket.on("join-game", (code: string) => {
        // console.log('receiving join request');
        if (checkForExistingGame(activeGames, code)) {
            activeGames[code].sockets[1] = socket.id;
            io.in(code).emit("game-update", activeGames[code], code);
        } else {
            io.to(socket.id).emit("error", createErrorMessage(1));
        }
        // console.log(activeGames);
    });

    socket.on("disconnect", () => {
        // console.log("user disconnected: socket-id:", socket.id);
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
        // console.log('after leaving', activeGames);
    });
});

if (process.env.NODE_ENV !== "test") {
    server.listen(process.env.PORT || port, function () {
        console.log("I'm listening.");
    });
}


// Example function for testing
// export function testfunction(a: number, b: number): number {
//     return a + b;
// }
