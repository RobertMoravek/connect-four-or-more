import express from "express";
import { gameObject, activeGames } from "./types";
import {
    deleteSocketfromActiveGames,
    generateRandomString,
    isRandomStringUnique,
    createNewGame,
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



    socket.on("disconnect", () => {
        console.log("user disconnected: socket-id:", socket.id);
        deleteSocketfromActiveGames(socket.id, activeGames);

    });
});

server.listen(process.env.PORT || port, function () {
    console.log("I'm listening.");
});
