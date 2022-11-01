"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameLogic_1 = require("./gameLogic");
const app = (0, express_1.default)();
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) => {
        callback(null, req.headers.referer.startsWith("http://localhost:8080"));
    },
});
const port = 8080;
const activeGames = {};
if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (typeof req.headers["x-forwarded-proto"] == "string" &&
            req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}
app.use(express_1.default.static(path.resolve(__dirname, "../build")));
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/index.html"));
});
io.on("connection", (socket) => {
    console.log("a user connected: socket-id:", socket.id);
    // console.log('socket', socket);
    // Start a new Game
    socket.on("new-game", () => {
        console.log("Starting a new Game");
        let gameCode = (0, gameLogic_1.createNewGame)(activeGames, socket.id);
        console.log("activeGames", activeGames);
        socket.join(gameCode);
        io.to(gameCode).emit("game-update", activeGames[gameCode], gameCode);
    });
    // Check and set user game config
    socket.on("config-ready", (config, code) => {
        console.log('receiving config');
        if ((0, gameLogic_1.checkUserConfigForInteger)(config) && (0, gameLogic_1.checkUserConfigValues)(config)) {
            activeGames[code].config = config;
        }
        else {
            activeGames[code].config = [6, 7, 4];
        }
        activeGames[code].gameState = "ready";
        io.to(code).emit("game-update", activeGames[code]);
    });
    // Check code and join second player to game (if it exists)
    socket.on("join-game", (code) => {
        console.log('receiving join request');
        if ((0, gameLogic_1.checkForExistingGame)(activeGames, code)) {
            activeGames[code].sockets[1] = socket.id;
        }
        else {
            // send an ERROR back
        }
        console.log(activeGames);
        io.to(code).emit("game-update", activeGames[code], code);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected: socket-id:", socket.id);
        // Delete the disconnecting socket from existing games (also then checks wether a game can be deleted)
        (0, gameLogic_1.deleteSocketfromActiveGames)(socket.id, activeGames);
    });
});
server.listen(process.env.PORT || port, function () {
    console.log("I'm listening.");
});
//# sourceMappingURL=server.js.map