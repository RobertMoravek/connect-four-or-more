// const path = require("path");
// const express = require("express");
// const app = express();

// app.use(express.static(path.join(__dirname, "connect-4-vue")));

// app.get("*", (req, res) => {

//     if (process.env.NODE_ENV == "production") {
//         res.sendFile(path.resolve(__dirname, "index.html"));

//     } else {
//         res.sendFile(path.join(__dirname, "index.html"));

//     }

// });

// app.listen(process.env.PORT || 8080, () => console.log(`I'm listening on 8080.`));

var express = require("express");
var path = require("path");
app = express();
var port = process.env.PORT || 8080;
var hostname = "127.0.0.1";

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

app.use(express.static(path.resolve(__dirname, "./dist")));
if (process.env.NODE_ENV == "production") {
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve("dist", "index.html"));
    });
} else {
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve("dist", "index.html"));
    });
}

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
