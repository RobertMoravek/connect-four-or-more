import express from "express";
const app = express();
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) => {
        callback(null, req.headers.referer.startsWith("http://localhost:3000"));
    },
});

const port: number = 8080;

// Create a function for reusable perpose
const generateRandomString = (myLength) => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

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


app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/index.html"));
});

server.listen(process.env.PORT || port, function () {
    console.log("I'm listening.");
});
