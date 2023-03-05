import express from "express";
import {
    createOrderProduct, destroyOrderProducts, getOrderProductById,
    updateOrderProduct, getOrderProductsByOrderId, attachOrderProductsToOrder
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
        res.send(orderProducts);
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
        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})

orderProductsRouter.patch("/:productId", async (req, res, next) => {
    console.log(req);
    try {
        const {productId} = req.params;
        const {price, quantity} = req.body;
        console.log(productId, price, quantity)
        const orderProduct = await updateOrderProduct({orderProductId: productId, price, quantity});

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
        console.log(orderProduct);
        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
})


export default orderProductsRouter;

