import stripe0 from "stripe";
import{config} from "dotenv";
import client from "../server/db/client.js";
import {updateProduct} from "../server/db/components/products.js";

config();
const stripe = stripe0(process.env.STRIPE_API_KEY);

const STRIPE_SECRET_KEY = process.env.STRIPE_API_KEY;

const fetchStripe = async () => {
    let products = [];
    let hasMore = true;
    let startingAfter;
    while (hasMore) {
        const response = await stripe.prices.list({
            limit: 100,
            starting_after: startingAfter,
        });
        products = products.concat(response.data);
        hasMore = response.has_more;
        startingAfter = response.data[response.data.length - 1].id;
    }
    for (const product of products) {
        const {id, product: productId, unit_amount, currency} = product;
        const price = unit_amount / 100;
        const response = await stripe.products.retrieve(productId);
        const {name, description, images} = response;
        const image = images[0];
        const productObject = {
            product_id: productId,
            title: name,
            description,
            price,
            image,
            inStock: true,
            category: "test",
            stripe_id: id,
        }
        // console.log(productObject);
   // get all product promises from stripe and update
        const updatedProduct = await updateProduct(productObject);

        console.log(updatedProduct);
    }

        // const stripeId = priceResponse.id;
        //
        // await client.query(`
        //     UPDATE products
        //     SET stripe_id = $1
        //     WHERE product_id = $2
        // `, [stripeId, id]);

}

fetchStripe();