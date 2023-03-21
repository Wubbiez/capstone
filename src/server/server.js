import app from "./index.js";
import http from "http";
import chalk from "chalk";
import fs from "fs";
import {config} from "dotenv";

config();

const PORT = process.env["PORT"] ?? 3001;

const SSL_CERT_PATH = "./cert.pem";
const SSL_KEY_PATH = "./key.pem";
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(
        chalk.blueBright("Server is listening on PORT:"),
        chalk.yellow(PORT),
        chalk.blueBright("CRUD!")
    );
});