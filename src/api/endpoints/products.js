import express from "express";

import {getAllProducts, getProductById, updateProduct} from "../../server/db/components/products.js";

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
productsRouter.patch("/:id", async (req, res, next) => {

        try {
            const {id} = req.params;
            // console.log(req.body)
            const {product_id, title,description,price,image,inStock,category} = req.body
// console.log(title,description,price,image,inStock,category)
            const product = await updateProduct({product_id: id, title, description, price, image, inStock, category})
            console.log(product);
            res.send(product);
        } catch (error) {
            next(error);
        }

})
export default productsRouter;
