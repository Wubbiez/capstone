import client from "../client.js";

async function createOrderProduct({orderId, productId, price, quantity}) {
    try {
        const {rows: [orderProduct]} = await client.query(`
            INSERT INTO order_products("orderId", "productId", price, quantity)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [orderId, productId, price, quantity]);
        return orderProduct;
    } catch (error) {
        throw error;
    }
}

async function getOrderProductsByOrderId(orderId) {
    try {
        const {rows: orderProducts} = await client.query(`
            SELECT *
            FROM order_products
            WHERE "orderId" = $1;
        `, [orderId]);
        return orderProducts;
    } catch (error) {
        throw error;
    }
}

async function updateOrderProduct({orderProductId, price, quantity}) {
    try {
        const {rows: [orderProduct]} = await client.query(`
            UPDATE order_products
            SET price = $1, quantity = $2
            WHERE id = $3
            RETURNING *;
        `, [price, quantity, orderProductId]);
        return orderProduct;
    } catch (error) {
        throw error;
    }
}

async function destroyOrderProduct(orderProductId) {
    try {
        const {rows: [orderProduct]} = await client.query(`
            DELETE FROM order_products
            WHERE id = $1
            RETURNING *;
        `, [orderProductId]);
        return orderProduct;
    } catch (error) {
        throw error;
    }
}

async function destroyOrderProductsByOrderId(orderId) {
    try {
        const {rows: orderProducts} = await client.query(`
            DELETE FROM order_products
            WHERE "orderId" = $1
            RETURNING *;
        `, [orderId]);
        return orderProducts;
    } catch (error) {
        throw error;
    }
}

export {
    createOrderProduct,
    getOrderProductsByOrderId,
    updateOrderProduct,
    destroyOrderProduct,
    destroyOrderProductsByOrderId
}
