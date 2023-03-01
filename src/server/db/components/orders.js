import client from "../client.js";

async function createOrder({userId, status}) {
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders(user_id, status)
            VALUES($1, $2)
            RETURNING *;
        `, [userId, status]);
        return order;
    } catch (error) {
        throw error;
    }
}

async function getAllOrders() {
    try {
        const {rows: orders} = await client.query(`
            SELECT *
            FROM orders;
        `);
        return orders;
    } catch (error) {
        throw error;
    }
}

async function getOrderById(orderId) {
    try {
        const {rows: [order]} = await client.query(`
            SELECT *
            FROM orders
            WHERE order_id = $1;
        `, [orderId]);
        if (!order) {
            return null;
        }
        return order;
    } catch (error) {
        throw error;
    }
}

async function getOrdersByUser(userId) {
    try {
        const {rows: orders} = await client.query(`
            SELECT *
            FROM orders
            WHERE user_id = $1;
        `, [userId]);
        return orders;
    } catch (error) {
        throw error;
    }
}

async function updateOrder({orderId, status}) {
    try {
        const {rows: [order]} = await client.query(`
            UPDATE orders
            SET status = $1
            WHERE order_id = $2
            RETURNING *;
        `, [status, orderId]);
        return order;
    } catch (error) {
        throw error;
    }
}

async function destroyOrder(orderId) {
    try {
        const {rows: [order]} = await client.query(`
            DELETE FROM orders
            WHERE order_id = $1
            RETURNING *;
        `, [orderId]);
        return order;
    } catch (error) {
        throw error;
    }
}

export {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUser,
    updateOrder,
    destroyOrder
}