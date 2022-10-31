"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) => {
        callback(null, req.headers.referer.startsWith("http://localhost:3000"));
    },
});
const port = 8080;
// Create a function for reusable perpose
const generateRandomString = (myLength) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const randomArray = Array.from({ length: myLength }, (v, k) => chars[Math.floor(Math.random() * chars.length)]);
    const randomString = randomArray.join("");
    return randomString;
};
if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (typeof req.headers["x-forwarded-proto"] == "string" && req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}
app.use(express_1.default.static(path.resolve(__dirname, "../build")));
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/index.html"));
});
server.listen(process.env.PORT || port, function () {
    console.log("I'm listening.");
});
//# sourceMappingURL=server.js.map