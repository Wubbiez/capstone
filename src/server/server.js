import app from "./index.js";
import https from "https";
import chalk from "chalk";
import fs from "fs";
import {config} from "dotenv";
import {createProxyMiddleware} from "http-proxy-middleware";

config();

const PORT = process.env["PORT"] ?? 3001;

const SSL_CERT_PATH = "./cert.pem";
const SSL_KEY_PATH = "./key.pem";

const options = {
    cert: fs.readFileSync(SSL_CERT_PATH),
    key: fs.readFileSync(SSL_KEY_PATH),
}

app.use('/api/**', createProxyMiddleware({ target: 'http://34.227.96.218:3001', changeOrigin: true }));

const server = https.createServer(options, app);

server.listen(PORT, () => {
    console.log(
        chalk.blueBright("Server is listening on PORT:"),
        chalk.yellow(PORT),
        chalk.blueBright("CRUD!")
    );
});