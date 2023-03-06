import express from "express";
import {
    createOrderProduct, destroyOrderProducts, getOrderProductById,
    updateOrderProduct, getOrderProductsByOrderId
} from "../../server/db/components/order_products.js";

const orderProductsRouter = express.Router();

// orderProductsRouter.get("/", async (req, res, next) => {
//     try {
//         const orderProducts = await getAllOrderProducts();
//
//         res.send(orderProducts);
//     } catch (error) {
//         next(error);
//     }
// })
//


orderProductsRouter.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const orderProduct = await getOrderProductsByOrderId(id);

        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.post("/:order_id/items", async (req, res, next) => {
    try {
        const {order_id} = req.params;
        const {product_id, price, quantity} = req.body;
        console.log(product_id);
        const orderProduct = await createOrderProduct({order_id: order_id, product_id: product_id, price, quantity});
        console.log(orderProduct);
        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.patch("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const {price, quantity} = req.body;
        const orderProduct = await updateOrderProduct({orderProductId: id, price, quantity});

        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.delete("/:productId", async (req, res, next) => {
    try {
        const {productId} = req.params;
        const {order_id} = req.body;

        const orderProduct = await destroyOrderProducts(productId, order_id);

        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})

export default orderProductsRouter;

