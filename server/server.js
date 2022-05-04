import express from "express";
import * as path from "path";
import {NyheterApi} from "./nyheterApi.js";

const app = express();

app.use("/api/nyheter", NyheterApi());

app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Started on http://localhost:${server.address().port}`);
});



