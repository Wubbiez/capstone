import client from "../client.js";

async function createOrderProduct({order_id, product_id, price, quantity, stripe_id}) {
    try {
        const {rows: [orderProduct]} = await client.query(`
            INSERT INTO order_products("orderId", "productId", price, quantity, stripe_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [order_id, product_id, price, quantity, stripe_id]);
        return orderProduct;
    } catch (error) {
        throw error;
    }
}



async function getOrderProductById(orderProductId) {
    try {
        const {rows: [orderProduct]} = await client.query(`
            SELECT *
            FROM order_products
            WHERE "productId" = $1;
        `, [orderProductId]);
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
console.log(orderProductId, price, quantity)
    try {
        const {rows: [orderProduct]} = await client.query(`
            UPDATE order_products
            SET price = $1, quantity = $2
            WHERE "productId" = $3
            RETURNING *;
        `, [price, quantity, orderProductId]);
        return orderProduct;
    } catch (error) {
        throw error;
    }
}

async function destroyOrderProducts(productId, orderId) {
    try {
        const {rows: [orderProduct]} = await client.query(`
            DELETE FROM order_products
            WHERE "productId" = $1 AND "orderId" = $2
            RETURNING *;
        `, [productId, orderId]);
        return orderProduct;
    } catch (error) {
        throw error;
    }
}

async function getOrderByOrderId(orderId) {
    try {
        const { rows: [order] } = await client.query(`
      SELECT *
      FROM orders
      WHERE order_id = $1;
    `, [orderId]);

        return order;
    } catch (error) {
        throw error;
    }
}

async function attachOrderProductsToOrder(order_id) {
    const orderProductQuery = `
    SELECT op."productId", op.price, op.quantity
    FROM orders o
    JOIN order_products op ON o.order_id = op."orderId"
    WHERE o.order_id = ${order_id}
  `;
    const result = await client.query(orderProductQuery);
    console.log(result.rows);
    return result.rows;
}

export {
    createOrderProduct,
    getOrderProductsByOrderId,
    updateOrderProduct,
    destroyOrderProducts,
    getOrderProductById,
    attachOrderProductsToOrder
}
