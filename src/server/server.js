import app from "./index.js";
import https from "https";
import chalk from "chalk";
import fs from "fs";
import {config} from "dotenv";
import {createProxyMiddleware} from "http-proxy-middleware";
import cors from "cors";
import apiRouter from "../api/index.js";

config();

const PORT = process.env["PORT"] ?? 3001;

const SSL_CERT_PATH = "./cert.pem";
const SSL_KEY_PATH = "./key.pem";

const options = {
    cert: fs.readFileSync(SSL_CERT_PATH),
    key: fs.readFileSync(SSL_KEY_PATH),
}

app.use("/api", apiRouter);

app.use('/api/**', createProxyMiddleware({
    target: 'https://34.227.96.218:3001/',
    changeOrigin: false,
    headers: {
        'Referrer-Policy': 'no-referrer',
    },
}));



//
// app.use('/api/**', createProxyMiddleware({
//     target: 'https://34.227.96.218:3001',
//     changeOrigin: false,
//     onProxyReq: (proxyReq, req, res) => {
//         proxyReq.setHeader('origin', 'https://zach-db.d2iq6rr0fedpw1.amplifyapp.com');
//         if (req.headers.origin !== 'https://zach-db.d2iq6rr0fedpw1.amplifyapp.com') {
//             res.status(403).send('Forbidden');
//         }
//     }
// }));






const server = https.createServer(app);

server.listen(PORT, () => {
    console.log(
        chalk.blueBright("Server is listening on PORT:"),
        chalk.yellow(PORT),
    );
});