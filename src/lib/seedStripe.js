// push all products to stripe
import stripe0 from "stripe";
import {config} from "dotenv";

import client from "../server/db/client.js";

config();


const stripe = stripe0(process.env.STRIPE_API_KEY);


const seedStripe = async () => {
    const products = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/products`);
    const productsJson = await products.json();
    const productsArray = productsJson;

    for (const product of productsArray) {
        const {product_id, title, description, price, image, category} = product;
        const response = await stripe.products.create({
            id: product_id.toString(),
            name: title,
            description,
            images: [image],
            metadata: {
                category: category
            },
        });
        const priceResponse = await stripe.prices.create({
            product: response.id,
            unit_amount: Math.round(price * 100),
            currency: 'usd',
        });

        const stripeId = priceResponse.id;
        await client.query(`
            UPDATE products
            SET stripe_id = $1
            WHERE product_id = $2
        `, [stripeId, product_id]);
    }
}


seedStripe();
