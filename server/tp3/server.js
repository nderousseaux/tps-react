const express = require("express");
const body_parser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const path = require("path");

const secret = "fze5EVvs:,;hsegFZEQGhtrh,;$:^fz";

const app = express();

// app.use(express.static("../build"));
app.use(body_parser.json());

app.all("*", (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Credentials", true);
    res.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE, PUT");
    res.set(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    } else {
        next();
    }
});

const users = [
    {
        id: 1,
        username: "pierre",
        password: "kraemer"
    },
    {
        id: 2,
        username: "toto",
        password: "tutu"
    }
];
let nextid = 3;

app.post("/signin", (req, res, next) => {
    const user = users.find(u => u.username === req.body.username);
    if (user?.password === req.body.password) {
        const token = jsonwebtoken.sign({ id: user.id }, secret, {
            algorithm: 'HS256',
            expiresIn: 60 * 60 * 12
        });
        const { password, ...user_without_pw } = user;
        return res.json({
            user: user_without_pw,
            token
        });
    }
    next({ status: 401, message: "Bad username or password" });
});

app.get("/whoami", expressjwt({ secret, algorithms: ['HS256'] }), (req, res, next) => {
    const user = users.find(u => u.id === req.user.id);
    if (user) {
        const { password, ...user_without_pw } = user;
        return res.json(user_without_pw);
    }
    next({ status: 404, message: "User not found" });
});

app.post("/signup", (req, res, next) => {
    const available = !users.some(u => u.username === req.body.username);
    if (available) {
        users.push({
            id: nextid++,
            username: req.body.username,
            password: req.body.password
        });
        return res.status(200).end();
    }
    next(new Error("Username not available"));
});

// app.all("/*", (req, res) => {
//     res.sendFile(path.resolve("../build/index.html"));
// });

app.use((err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).send(err.message);
    } else {
        return res.status(500).send(err.message);
    }
});

const server = app.listen(4200, "localhost", () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
