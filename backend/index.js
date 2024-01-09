const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { database } = require("./src/db");
const cors = require("cors");
const routes = require("./src/routes/index.routes");
require("dotenv").config();

const server = express();

server.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);
server.use(morgan("dev"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());

server.use("/", routes);

database
    .sync({ force: false })
    .then(
        server.listen(3001, () => {
            console.log("Server listening on port: 3001");
        })
    )
    .catch((err) => console.log(err));
