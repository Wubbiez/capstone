import express from "express";

import {getAllProducts} from "../../server/db/components/products.js";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send(products);
    } catch (error) {
        next(error);
    }
})

export default productsRouter;
