import express from "express";
import {
    createOrderProduct, destroyOrderProducts, getOrderProductById,
    updateOrderProduct, getOrderProductsByOrderId, attachOrderProductsToOrder, getOrderProductByOrderIdAndProductId
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
        const orderProduct = await getOrderProductById(id);
        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.get("/:order_id/items", async (req, res, next) => {
    try {
        const {order_id} = req.params;
        const orderProducts = await getOrderProductsByOrderId(order_id);
        console.log(orderProducts);
        const attach = await attachOrderProductsToOrder(order_id);
        res.send(orderProducts);
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.get("/:order_id/:productId", async (req, res, next) => {
    try {
        const {order_id, productId} = req.params;
        const orderProduct = await getOrderProductByOrderIdAndProductId(order_id, productId);
        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.post("/:order_id/items", async (req, res, next) => {
    try {
        const {order_id} = req.params;
        const {product_id, price, quantity, stripe_id} = req.body;
        const orderProduct = await createOrderProduct({order_id: order_id, product_id: product_id, price, quantity, stripe_id});
        const attach = await attachOrderProductsToOrder(order_id);
        console.log(attach);
        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.patch("/:order_id/:productId", async (req, res, next) => {

    try {
        const {order_id,productId} = req.params;
        const {price, quantity} = req.body;
        const orderProduct = await updateOrderProduct({productId, price, quantity, orderId: order_id});
        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.delete("/:order_id/:productId", async (req, res, next) => {
    try {
        const {order_id,productId} = req.params;

console.log(productId, order_id)
        const orderProduct = await destroyOrderProducts(productId, order_id);
        console.log(orderProduct);
        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})


export default orderProductsRouter;

