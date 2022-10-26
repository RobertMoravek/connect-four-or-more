import express, { Request, Response } from "express";
const app = express();
const path = require("path");

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.resolve(__dirname, "../build")));
} else {
    app.use(express.static(path.join(__dirname, "../build")));
}

if (process.env.NODE_ENV == "production") {
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "/index.html"));
    });
} else {
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "index.html"));
    });
}


const port = 8080;

app.listen(port, (): void => {
    console.log(`App is listening at http://localhost:${port}`);
});
