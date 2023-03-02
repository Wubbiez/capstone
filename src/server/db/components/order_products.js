import client from "../client.js";

async function createOrderProduct({order_id, product_id, price, quantity}) {
    console.log(order_id, product_id, price, quantity)
    try {
        const {rows: [orderProduct]} = await client.query(`
            INSERT INTO order_products("orderId", "productId", price, quantity)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [order_id, product_id, price, quantity]);
        return orderProduct;
    } catch (error) {
        throw error;
    }
}

async function getOrderProductsByOrderId(order_id) {
    try {
        const {rows: orderProducts} = await client.query(`
            SELECT *
            FROM order_products
            WHERE "orderId" = $1;
        `, [order_id]);
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

async function destroyOrderProductsByOrderId(order_id) {
    try {
        const {rows: orderProducts} = await client.query(`
            DELETE FROM order_products
            WHERE "orderId" = $1
            RETURNING *;
        `, [order_id]);
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
