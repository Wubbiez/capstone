// import {getProducts} from "./fakestoreAPI.js";
import productsRouter from "./components/products.js";
import express from "express";
import ordersRouter from "./components/orders.js";
import userRouter from "./components/user.js"
// import reviewRouter from "./reviews.js";
const apiRouter = express.Router();

// ROUTER: /api/products
apiRouter.use("/products", productsRouter);

// ROUTER: /api/orders
apiRouter.use("/orders", ordersRouter);

//ROUTER: /api/user
apiRouter.use("/user", userRouter);

//ROUTER: /api/reviews
// apiRouter.use("/reviews", reviewRouter);


apiRouter.use((error, req, res, next) => {
    res.send({
        error: error.error,
        name: error.name,
        message: error.message,
    });
});

export default apiRouter;