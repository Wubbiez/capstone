import apiRouter from "../api/index.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {updateOrder} from "./db/components/orders.js";
import stripe0 from "stripe";
import {config} from "dotenv";
import {createProxyMiddleware} from "http-proxy-middleware";

config();

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Proxy middleware for '/api' requests
const apiProxy = createProxyMiddleware({
    target: 'http://34.227.96.218:3001',
    changeOrigin: true
});

// Combine apiRouter and proxy middleware with express.Router
const router = express.Router();

router.use('/api/**', apiProxy);
router.use('/api', apiRouter);

// Mount the combined router on the app
app.use(router);

app.post('/success', async (req, res) => {
    const {session_id} = req.query;
    try {
        const stripe = stripe0(process.env.STRIPE_API_KEY);
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const order_id = session.client_reference_id;
        console.log(order_id);
        if (session.payment_status === 'paid') {
            await updateOrder({orderId: order_id, status: 'paid'});
            // res.redirect(`/orders/${order_id}`);
        } else {
            console.log('Payment not successful');
            res.redirect('/products');
        }
    } catch (error) {
        console.error('Error in stripe checkout', error);
        res.status(500).end();
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || "Internal server error.");
})

// Export
export default app;
