import client from "./client.js";
import {getProducts} from "../../api/fakestoreAPI.js";
import {createProduct} from "./components/products.js";

async function dropTables() {
    console.log("Starting to drop tables...");
    try{
        await client.query(`
            DROP TABLE IF EXISTS order_products;
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS payments;
            DROP TABLE IF EXISTS analytics;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS users;
        `);
        console.log("Finished dropping tables!");
    } catch (error) {
        console.error("Error dropping tables!");
        throw error;
    }
}

export async function createTables() {
    console.log("Starting to build tables...");
    try {
        await client.query(` CREATE TABLE users
                             (
                                 user_id    SERIAL PRIMARY KEY,
                                 username   VARCHAR(255) UNIQUE NOT NULL,
                                 password   VARCHAR(255)        NOT NULL,
                                 email      VARCHAR(255) UNIQUE NOT NULL,
                                 first_name VARCHAR(255)        NOT NULL,
                                 last_name  VARCHAR(255)        NOT NULL,
                                 address    VARCHAR(255)        NOT NULL,
                                 phone      VARCHAR(255)        NOT NULL,
                                 is_admin   BOOLEAN DEFAULT false,
                                 is_active  BOOLEAN DEFAULT true,
                                date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                             );
         `);
        await client.query(` CREATE TABLE products
            
                                (
                                    product_id   SERIAL PRIMARY KEY,
                                    title         VARCHAR(255) NOT NULL,
                                    description  TEXT         NOT NULL,
                                    price        DECIMAL  NOT NULL,
                                    image    VARCHAR(255) NOT NULL,
                                    in_stock     BOOLEAN      DEFAULT true,
                                    category     VARCHAR(255) NOT NULL,
                                    is_active    BOOLEAN      DEFAULT true,
                                    date_created TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
                                );
            `);
        await client.query(` CREATE TABLE orders
            
                                (
                                    order_id     SERIAL PRIMARY KEY,
                                    user_id      INTEGER REFERENCES users(user_id) NOT NULL,
                                    status       VARCHAR(255) DEFAULT 'created',
                                    date_created TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
                                );
            `);
        await client.query(` CREATE TABLE order_products
        (
            id           SERIAL PRIMARY KEY,
            "orderId"    INTEGER REFERENCES orders(order_id) NOT NULL,
            "productId"  INTEGER REFERENCES products(product_id) NOT NULL,
            price        INTEGER NOT NULL,
            quantity     INTEGER NOT NULL,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
            `);
        await client.query(` CREATE TABLE reviews
        (
            review_id    SERIAL PRIMARY KEY,
            user_id      INTEGER REFERENCES users(user_id) NOT NULL,
            product_id   INTEGER REFERENCES products(product_id) NOT NULL,
            title        VARCHAR(255) NOT NULL,
            content      TEXT         NOT NULL,
            rating       INTEGER      NOT NULL,
            date_created TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
        );
            `);
        await client.query(` CREATE TABLE payments
        (   
            payment_id   SERIAL PRIMARY KEY,
            user_id      INTEGER REFERENCES users(user_id) NOT NULL,
            order_id     INTEGER REFERENCES orders(order_id) NOT NULL,
            payment_type VARCHAR(255) NOT NULL,
            payment_info VARCHAR(255) NOT NULL,
            date_created TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
        );
            `);

        await client.query(` CREATE TABLE analytics
        (
            analytics_id SERIAL PRIMARY KEY,
            user_id      INTEGER REFERENCES users(user_id) NOT NULL,
            product_id   INTEGER REFERENCES products(product_id) NOT NULL,
            date_created TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
        );
            `);

        console.log("Finished building tables!");

    } catch (error) {
        console.error("Error building tables!");
        throw error;
    }
}

async function createInitialProducts() {
    try {
        const products = await getProducts();
        const productPromises = products.map(product => {
            return createProduct(product);
        })
        await Promise.all(productPromises);
        console.log("Finished creating products!");
    } catch (error) {
        console.error("Error creating products!");
        throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialProducts();
    } catch (error) {
        console.error("Error during rebuildDB");
        throw error;
    }
}
export  {
    rebuildDB,
    dropTables
}