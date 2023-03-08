// push all products to stripe
import stripe0 from "stripe";
import{config} from "dotenv";
import client from "../server/db/client.js";
config();
const stripe = stripe0(process.env.STRIPE_API_KEY);

const STRIPE_SECRET_KEY = process.env.STRIPE_API_KEY;




const seedStripe = async () => {
    console.log(STRIPE_SECRET_KEY);
    const products = await fetch('http://localhost:3001/api/products');
    const productsJson = await products.json();
    const productsArray = productsJson;

    for (const product of productsArray) {
        const {product_id, title, description, price, image} = product;
        const response = await stripe.products.create({
                id: product_id.toString(),
                name: title,
                description,
                images: [image],
        });

        console.log(response);
        const priceResponse = await stripe.prices.create({
                product: response.id,
                unit_amount: Math.round(price * 100),
                currency: 'usd',
        });
        console.log(priceResponse);

        const stripeId = priceResponse.id;
        await client.query(`
            UPDATE products
            SET stripe_id = $1
            WHERE product_id = $2
        `, [stripeId, product_id]);
    }
}


seedStripe();