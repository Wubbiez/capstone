import app from "./index.js";
import https from "https";
import http from "http";
import chalk from "chalk";
import fs from "fs";
import {config} from "dotenv";
import {createProxyMiddleware} from "http-proxy-middleware";
import cors from "cors";
import apiRouter from "../api/index.js";

config();

const PORT = process.env["PORT"] ?? 3001;

const SSL_CERT_PATH = "./src/server/certificate.crt";
const SSL_KEY_PATH = "./src/server/private.key";
const SSL_CA_PATH = "./src/server/ca_bundle.crt";


const https_options = {
    ca: fs.readFileSync(SSL_CA_PATH),
    cert: fs.readFileSync(SSL_CERT_PATH),
    key: fs.readFileSync(SSL_KEY_PATH),
}
// const options = {
//     cert: fs.readFileSync(SSL_CERT_PATH),
//     key: fs.readFileSync(SSL_KEY_PATH),
// }



// app.use('/api/**', createProxyMiddleware({
//     target: 'https://34.227.96.218:3001/',
//     changeOrigin: false,
//     headers: {
//         'Referrer-Policy': 'no-referrer',
//     },
// }));






// app.use('/api/**', createProxyMiddleware({
//     target: 'https://34.227.96.218:3001',
//     changeOrigin: false,
//     onProxyReq: (proxyReq, req, res) => {
//         proxyReq.setHeader('origin', 'gadgetgalaxy.link');
//         if (req.headers.origin !== 'gadgetgalaxy.link') {
//             res.status(403).send('Forbidden');
//         }
//     }
// }));








const server = https.createServer(https_options, app);

server.listen(PORT, () => {
    console.log(
        chalk.blueBright("Server is listening on PORT:"),
        chalk.yellow(PORT),
        chalk.red(https_options.ca, https_options.cert, https_options.key)
    );
});

//
// // serve the API on 81 (HTTP) port
// const httpServer = http.createServer(app);
//
// httpServer.listen(81, () => {
//     console.log('HTTP Server running on port 80');
// });