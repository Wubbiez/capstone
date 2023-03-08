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

async function getProductById(productId) {
    try {
        const {rows: [product]} = await client.query(`
            SELECT *
            FROM products
            WHERE product_id = $1;
        `, [productId]);
        if (!product) {
            return null;
        }
        return product;
    } catch (error) {
        throw error;
    }
}

async function updateProduct({product_id: id, title, description, price, image, inStock, category}) {
    console.log(id, title, description, price, image, inStock, category)
    try {
        const {rows: [product]} = await client.query(`
            UPDATE products
            SET title = $1, description = $2, price = $3, "image" = $4, "in_stock" = $5, category = $6
            WHERE product_id = $7
            RETURNING *;
        `, [title, description, price, image, inStock, category, id]);
        return product;
    } catch (error) {
        throw error;
    }
}

async function destroyProduct(productId) {
    try {
        const {rows: [product]} = await client.query(`
            DELETE FROM products
            WHERE product_id = $1
            RETURNING *;
        `, [productId]);
        return product;
    } catch (error) {
        throw error;
    }
}

async function getProductsByCategory(category) {
    try {
        const {rows: products} = await client.query(`
            SELECT *
            FROM products
            WHERE category = $1;
        `, [category]);
        return products;
    } catch (error) {
        throw error;
    }
}

async function checkIfProductInStock(productId) {
    try {
        const {rows: [product]} = await client.query(`
            SELECT "in_stock"
            FROM products
            WHERE product_id = $1;
        `, [productId]);
        return product;
    } catch (error) {
        throw error;
    }
}


export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    destroyProduct,
    getProductsByCategory,
    checkIfProductInStock
}