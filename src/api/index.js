// import {getProducts} from "./fakestoreAPI.js";
import productsRouter from "./components/products.js";
import express from "express";
const apiRouter = express.Router();

// ROUTER: /api/products
apiRouter.use("/products", productsRouter);


apiRouter.use((error, req, res, next) => {
    res.send({
        error: error.error,
        name: error.name,
        message: error.message,
    });
});

export default apiRouter;