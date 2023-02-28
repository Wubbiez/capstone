import client from "../client.js";

async function createProduct({title, description, price, image, inStock, category}) {
    try {
        const {rows: [product]} = await client.query(`
            INSERT INTO products(title, description, price, "image", "in_stock", category)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [title, description, price, image, inStock, category]);
        return product;
    } catch (error) {
        throw error;
    }
}
async function getAllProducts() {
    try {
        const {rows: products} = await client.query(`
            SELECT *
            FROM products;
        `);
        return products;
    } catch (error) {
        throw error;
    }
}

export {
    createProduct,
    getAllProducts,
}