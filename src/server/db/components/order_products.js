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

async function updateOrderProduct({productId, price, quantity, orderId}) {
console.log(productId, price, quantity)
    try {
        const {rows: [orderProduct]} = await client.query(`
            UPDATE order_products
            SET price = $1, quantity = $2
            WHERE "productId" = $3 AND "orderId" = $4
            RETURNING *;
        `, [price, quantity, productId, orderId]);
        return orderProduct;
    } catch (error) {
        throw error;
    }
}

async function getOrderProductByOrderIdAndProductId(order_id, productId) {
    try {
        const {rows: [orderProduct]} = await client.query(`
            SELECT *
            FROM order_products
            WHERE "orderId" = $1 AND "productId" = $2;
        `, [order_id, productId]);
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

async function destroyAllOrderProducts(orderId) {
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
        const { rows: orderProducts } = await client.query(orderProductQuery);

        const productIds = orderProducts.map((op) => op.productId).join(',');

        const productQuery = `
    SELECT product_id, title, image
    FROM products
    WHERE product_id IN (${productIds})
  `;
        const { rows: products } = await client.query(productQuery);

        const result = orderProducts.map((op) => {
            const product = products.find((p) => p.product_id === op.productId);
            console.log(product)
            return {
                productId: op.productId,
                title: product ? product.title : null,
                price: op.price,
                quantity: op.quantity,
                image: product.image
            };
        });
console.log(result)
        return result;


}

export {
    createOrderProduct,
    getOrderProductsByOrderId,
    updateOrderProduct,
    destroyOrderProducts,
    getOrderProductById,
    attachOrderProductsToOrder,
    getOrderProductByOrderIdAndProductId,
    destroyAllOrderProducts,
}