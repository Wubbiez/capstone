import express from "express";
import {getProducts} from "./fakestoreAPI.js";

const apiRouter = express.Router();


apiRouter.get("/products", async (req, res, next) => {
    try {
        const products = await getProducts();

        res.send(products);
    } catch (error) {
        next(error);
    }
})

export default apiRouter;