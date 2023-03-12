import client from "./client.js";
import fs from 'fs';
import {getProducts} from "../../api/fakestoreAPI.js";
import {createProduct, getAllProducts, getProductById, updateProduct} from "./components/products.js";
import { createUser } from "./components/users.js";
import { createReviews } from "./components/reviews.js";


async function dropTables() {
    console.log("Starting to drop tables...");
    try {
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
                                 user_id      SERIAL PRIMARY KEY,
                                 username     VARCHAR(255) UNIQUE NOT NULL,
                                 password     VARCHAR(255)        NOT NULL,
                                 email        VARCHAR(255) UNIQUE NOT NULL,
                                 first_name   VARCHAR(255)        DEFAULT NULL,
                                 last_name    VARCHAR(255)        DEFAULT NULL,
                                 address      VARCHAR(255)        DEFAULT NULL,
                                 phone        VARCHAR(255)        DEFAULT NULL,
                                 is_admin     BOOLEAN   DEFAULT false,
                                 is_active    BOOLEAN   DEFAULT true,
                                 date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                             );
        `);
        await client.query(` CREATE TABLE products

                             (
                                 product_id   SERIAL PRIMARY KEY,
                                 title        VARCHAR(255) NOT NULL,
                                 description  TEXT         NOT NULL,
                                 price        DECIMAL      NOT NULL,
                                 image        VARCHAR(255) DEFAULT 'https://www.freeiconspng.com/uploads/no-image-icon-6.png',
                                 in_stock     BOOLEAN   DEFAULT true,
                                 category     VARCHAR(255) DEFAULT 'other',
                                 is_active    BOOLEAN   DEFAULT true,
                                 stripe_id    VARCHAR(255) DEFAULT NULL,
                                 date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                                 
                             );
                            CREATE UNIQUE INDEX product_id ON products (product_id, stripe_id);
        `);
        await client.query(` CREATE TABLE orders

                             (
                                 order_id     SERIAL PRIMARY KEY,
                                 user_id      INTEGER REFERENCES users (user_id) NOT NULL,
                                 status       VARCHAR(255) DEFAULT 'created',
                                 date_created TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
                             );
        `);
        await client.query(` CREATE TABLE order_products
                             (
                                 id           SERIAL PRIMARY KEY,
                                 "orderId"    INTEGER REFERENCES orders (order_id)     NOT NULL,
                                 "productId"  INTEGER REFERENCES products (product_id) NOT NULL,
                                 price        DECIMAL                                  NOT NULL,
                                 quantity     INTEGER                                  NOT NULL,
                                 stripe_id    VARCHAR(255)                             NOT NULL,
                                 date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                 FOREIGN KEY ("productId") REFERENCES products (product_id)
                             );
        `);
        await client.query(` CREATE TABLE reviews
                             (
                                 review_id    SERIAL PRIMARY KEY,
                                 username     VARCHAR(255) REFERENCES users (username) UNIQUE NOT NULL,
                                 productid   INTEGER REFERENCES products (product_id) NOT NULL,
                                 title        VARCHAR(255)                             NOT NULL,
                                 content      TEXT                                     NOT NULL,
                                 rating       INTEGER                                  NOT NULL,
                                 date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                             );
        `);
        await client.query(` CREATE TABLE payments
                             (
                                 payment_id   SERIAL PRIMARY KEY,
                                 user_id      INTEGER REFERENCES users (user_id)   NOT NULL,
                                 order_id     INTEGER REFERENCES orders (order_id) NOT NULL,
                                 payment_type VARCHAR(255)                         NOT NULL,
                                 payment_info VARCHAR(255)                         NOT NULL,
                                 date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                             );
        `);

        await client.query(` CREATE TABLE analytics
                             (
                                 analytics_id SERIAL PRIMARY KEY,
                                 user_id      INTEGER REFERENCES users (user_id)       NOT NULL,
                                 product_id   INTEGER REFERENCES products (product_id) NOT NULL,
                                 date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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


//admin users!!!

async function seedProducts() {
    const csvData = await fs.promises.readFile('./src/server/db/excelData/bbfridges.csv', 'utf8');
    const rows = csvData.trim().split('\n');
    const headers = rows.shift().split(',');
    const tableName = 'products';

    for (const row of rows) {
        const values = row.split(',');
        const query = {
            text: `INSERT INTO ${tableName} (${headers.join(', ')})
                   VALUES (${values.map((_, i) => `$${i + 1}`).join(', ')})`,
            values
        };

        await client.query(query);
    }
}

async function createInitialUsers() {
    console.log("Starting to create users...")
    try {
        const usersToCreate = [
            { username: "Corey", password: "Corey22", email: "Corey@gmail.com", is_admin: true },
            { username: "Zach", password: "Zach123", email: "Zach@gmail.com", is_admin: true },
            { username: "Abdulla", password: "Abdulla10", email: "Abdulla@gmail.com", is_admin: true },
            { username: "Santi", password: "Santi27", email: "Santi@gmail.com", is_admin: true },
            { username: "Bob", password: "Bob123", email: "BobbyBoi@gmail.com", is_admin: false }
        ]
        const users = await Promise.all(usersToCreate.map(createUser))

        console.log("Users created:")
        console.log(users)
        console.log("Finished creating users!")
    } catch (error) {
        console.error("Error creating users!")
        throw error
    }
}

//fake reviews for testing
async function createInitialReviews() {
    console.log("Starting to create reviews...")
    const product1 = await getProductById(1);
    console.log(product1);
    console.log(product1.product_id);
    try {
        const reviewsToCreate = [
            { username: "Corey", productid: product1.product_id, title: "Shitty Fridge", content: "This thing don't even run!", rating: "2" },
        ]
        const reviews = await Promise.all(reviewsToCreate.map(createReviews))

        console.log("Reviews created:")
        console.log(reviews)
        console.log("Finished creating Reviews!")
    } catch (error) {
        console.error("Error creating Reviews!")
        throw error
    }
}


async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
        await seedProducts();
        await createInitialReviews();
        // await updateProduct({product_id: 1, title: "RF", description: "test",price: 1000})
        // await createInitialProducts();

    } catch (error) {
        console.error("Error during rebuildDB");
        throw error;
    }
}

export {
    rebuildDB,
    dropTables
}