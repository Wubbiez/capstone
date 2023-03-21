import app from "./index.js";
import https from "http";
import chalk from "chalk";
import {config} from "dotenv";

config();

const PORT = process.env["PORT"] ?? 3001;
const server = https.createServer(app);

server.listen(PORT, () => {
    console.log(
        chalk.blueBright("Server is listening on PORT:"),
        chalk.yellow(PORT),
        chalk.blueBright("CRUD!")
    );
});