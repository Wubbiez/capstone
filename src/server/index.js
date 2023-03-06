import apiRouter from "../api/index.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {getOrderById, updateOrder} from "./db/components/orders.js";
import stripe0 from "stripe";
import{config} from "dotenv";
config();



const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//admin authorization
export async function is_admin (req, res, next) {
   if (req.user.role === "is_admin") {
    return next();
   }else{
    res.status.json({error: "Sorry But You Can't Do That!"})
   }
};


// Routes


app.post('/success', async (req, res) => {
    const { session_id } = req.query;
    console.log(session_id);
    console.log("session_id", session_id);
    try {
        const stripe = stripe0(process.env.STRIPE_API_KEY);
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const order_id = session.client_reference_id;
        console.log(order_id);
        if (session.payment_status === 'paid') {
            await updateOrder({ orderId: order_id, status: 'paid' });
            res.redirect(`/orders/${order_id}`);

        } else {
            console.log('Payment not successful');
            res.redirect('/cancel');
        }
    } catch (error) {
        console.error('Error in stripe checkout', error);
        res.status(500).end();
    }
});

app.use("/api", apiRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || "Internal server error.");
})

// Export
export default app;
