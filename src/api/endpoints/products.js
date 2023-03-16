import express from "express";

import {
    checkIfProductInStock,
    destroyProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    updateStripe
} from "../../server/db/components/products.js";
import {isAdmin} from "./isAdmin.js";


const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send(products);
    } catch (error) {
        next(error);
    }
})

productsRouter.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await getProductById(id);
        res.send(product);
    } catch (error) {
        next(error);
    }
});
productsRouter.patch("/:id", isAdmin,  async (req, res, next) => {

        try {
            const {id} = req.params;
            const {product_id, title,description,price,image,inStock,category, stripe_id} = req.body
            const updateStriped = await updateStripe({product_id: id, title, description, price, image, inStock, category, stripe_id});
            const product = await updateProduct({product_id: id, title, description, price, image, inStock, category, stripe_id: updateStriped.id})

            res.send(updateStriped);
        } catch (error) {
            next(error);
        }

});

productsRouter.get("/:product_id/stock", async (req, res, next) => {
    try {
        const {product_id} = req.params;
        console.log(product_id);
        const product = await checkIfProductInStock(product_id);
        res.send(product);
    } catch (error) {
        next(error);
    }
})

productsRouter.delete("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await destroyProduct(id);
        res.send(product);
    } catch (error) {
        next(error);
    }
});
export default productsRouter;