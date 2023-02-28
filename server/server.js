import http from "http";
import chalk from "chalk";
import app from "./index.js"

const PORT = process.env["PORT"] ?? 3001;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(
        chalk.blueBright("Server is listening on PORT:"),
        chalk.yellow(PORT),
        chalk.blueBright("Lets edit that database!")
    );
});