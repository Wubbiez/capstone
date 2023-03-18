import productsRouter from "./endpoints/products.js";
import express from "express";
import ordersRouter from "./endpoints/orders.js";
import userRouter from "./endpoints/users.js"
// import reviewRouter from "./reviews.js";
import orderProductsRouter from "./endpoints/order_products.js";
import {getUser, getUserById} from "../server/db/components/users.js";
import jwt from "jsonwebtoken";
import reviewRouter from "./endpoints/reviews.js";
const { JWT_SECRET } = process.env;


const apiRouter = express.Router();



apiRouter.use(async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const decodedToken = jwt.verify(token, JWT_SECRET);

            if (decodedToken.user_id) {
                req.user = await getUserById(decodedToken.user_id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: "AuthorizationHeaderError",
            message: `Authorization token must start with ${prefix}`,
        });
    }
});

apiRouter.use((req, res, next) => {
    if (req.user) {
        console.log("User is set:", req.user);
    }

    next();
});

// ROUTER: /api/products
apiRouter.use("/products", productsRouter);

// ROUTER: /api/orders
apiRouter.use("/orders", ordersRouter);

//ROUTER: /api/reviews
apiRouter.use("/reviews", reviewRouter);

// ROUTER: /api/users
apiRouter.use("/users", userRouter);

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