// import {getProducts} from "./fakestoreAPI.js";
import productsRouter from "./endpoints/products.js";
import express from "express";
import ordersRouter from "./endpoints/orders.js";
import userRouter from "./endpoints/user.js"
// import reviewRouter from "./reviews.js";
import orderProductsRouter from "./endpoints/order_products.js";
import getStripe from "../lib/getStripe.js";
import {updateOrder} from "../server/db/components/orders.js";
import app from "../server/index.js";

const apiRouter = express.Router();

// ROUTER: /api/products
apiRouter.use("/products", productsRouter);

// ROUTER: /api/orders
apiRouter.use("/orders", ordersRouter);

//ROUTER: /api/reviews
// apiRouter.use("/reviews", reviewRouter);

// ROUTER: /api/user
apiRouter.use("/user", userRouter);

// ROUTER: /api/cart
apiRouter.use("/cart", orderProductsRouter);

apiRouter.post('/success', async (req, res, next) => {
    alert("hi")
    const { session_id } = req.query;
    console.log("hi")
    try {
        const stripe = await getStripe();
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const order_id = session.client_reference_id;

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


apiRouter.use((error, req, res, next) => {
    res.send({
        error: error.error,
        name: error.name,
        message: error.message,
    });
});

export default apiRouter;