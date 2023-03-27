import app from "./index.js";
import https from "http";
import chalk from "chalk";
import {config} from "dotenv";


config();

const PORT = process.env["PORT"] ?? 1337;

// const SSL_CERT_PATH = "./src/server/certificate.crt";
// const SSL_KEY_PATH = "./src/server/private.key";
// const SSL_CA_PATH = "./src/server/ca_bundle.crt";
//
//
// const https_options = {
//     ca: fs.readFileSync(SSL_CA_PATH),
//     cert: fs.readFileSync(SSL_CERT_PATH),
//     key: fs.readFileSync(SSL_KEY_PATH),
// }

const server = https.createServer(app);

server.listen(PORT, () => {
    console.log(
        chalk.blueBright("Server is listening on PORT:"),
        chalk.yellow(PORT),
    );
});

