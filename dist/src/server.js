"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path = require("path");
if (process.env.NODE_ENV == "production") {
    app.use(express_1.default.static(path.resolve(__dirname, "build")));
}
else {
    app.use(express_1.default.static(path.join(__dirname, "build")));
}
if (process.env.NODE_ENV == "production") {
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve("index.html"));
    });
}
else {
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve("index.html"));
    });
}
const port = 8080;
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map