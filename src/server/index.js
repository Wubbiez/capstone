import apiRouter from "../api/index.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { updateOrder } from "./db/components/orders.js";
import stripe0 from "stripe";
import { config } from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// Set the origin and credentials in the CORS options object
const corsOptions = {
    origin: "https://www.gadgetgalaxy.link",
    credentials: true,
};

// Enable CORS for all routes
app.use(cors(corsOptions));

app.post("/success", async (req, res) => {
    const { session_id } = req.query;
    try {
        const stripe = stripe0(process.env.STRIPE_API_KEY);
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const order_id = session.client_reference_id;
        console.log(order_id);
        if (session.payment_status === "paid") {
            await updateOrder({ orderId: order_id, status: "paid" });
            // res.redirect(`/orders/${order_id}`);
        } else {
            console.log("Payment not successful");
            res.redirect("/products");
        }
    } catch (error) {
        console.error("Error in stripe checkout", error);
        res.status(500).end();
    }
});

app.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
    next();
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Set the Access-Control-Allow-Origin header to allow requests from your domain name
// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "https://gadgetgalaxy.link");
//     next();
// });

// Reverse proxy setup
app.use(
    "/api/**",
    createProxyMiddleware({
        target: "https://api.gadgetgalaxy.link",
        changeOrigin: true,
            headers: {
        'Referrer-Policy': 'no-referrer',
    },
    })
);

// Export
export default app;