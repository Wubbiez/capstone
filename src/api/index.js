// import {getProducts} from "./fakestoreAPI.js";
import productsRouter from "./endpoints/products.js";
import express from "express";
import ordersRouter from "./endpoints/orders.js";
import userRouter from "./endpoints/user.js"
// import reviewRouter from "./reviews.js";
import orderProductsRouter from "./endpoints/order_products.js";

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

apiRouter.use((error, req, res, next) => {
    res.send({
        error: error.error,
        name: error.name,
        message: error.message,
    });
});

export default apiRouter;