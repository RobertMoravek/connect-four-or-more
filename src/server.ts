import express from "express";
import { gameObject, activeGames } from "./types";
import {
    deleteSocketfromActiveGames,
    generateRandomString,
    isRandomStringUnique,
    createNewGame,
    checkUserConfig,
    checkForExistingGame,
} from "./gameLogic";

const app = express();
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) => {
        callback(null, req.headers.referer.startsWith("http://localhost:8080"));
    },
});

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
    console.log("a user connected: socket-id:", socket.id);
    // console.log('socket', socket);

    // Start a new Game
    socket.on("new-game", () => {
        console.log("Starting a new Game");
        let gameCode: string = createNewGame(activeGames, socket.id);
        console.log("activeGames", activeGames);
        socket.join(gameCode);
        io.to(gameCode).emit("gameUpdate", activeGames[gameCode], gameCode);
    });

    // Check and set user game config
    socket.on("config-ready", (config: [number, number, number], code: string) => {
        console.log('receiving config');
        if (checkUserConfig(config)) {
            activeGames[code].config = config;
        } else {
            activeGames[code].config = [6, 7, 4];
        }
        activeGames[code].gameState = "ready";
        io.to(code).emit("gameUpdate", activeGames[code]);
    });

    // Check code and join second player to game (if it exists)
    socket.on("join-game", (code: string) => {
        console.log('receiving join request');
        if (checkForExistingGame(activeGames, code)) {
            activeGames[code].sockets[1] = socket.id;
        } else {
            // send an ERROR back
        }
        console.log(activeGames);
        io.to(code).emit("gameUpdate", activeGames[code], code);
    });




    socket.on("disconnect", () => {
        console.log("user disconnected: socket-id:", socket.id);
        deleteSocketfromActiveGames(socket.id, activeGames);

    });
});

server.listen(process.env.PORT || port, function () {
    console.log("I'm listening.");
});
