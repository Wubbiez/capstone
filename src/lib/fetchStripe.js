import stripe0 from "stripe";
import {config} from "dotenv";
import {updateProduct} from "../server/db/components/products.js";

config();

const stripe = stripe0(process.env.STRIPE_API_KEY);
export const STRIPE_KEY = process.env.STRIPE_API_KEY;

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
        const {id, product: productId} = product;
        const prices = await stripe.prices.list({
            product: productId,
            limit: 1,
            active: true,
            expand: ['data.product'],
        });
        const {unit_amount, id: stripe_price_id} = prices.data[0];
        const price = unit_amount / 100;
        const response2 = await stripe.products.retrieve(productId);
        console.log(response2);
        const {
            name, description, images, metadata: {
                category: category
            }
        } = response2;
        const image = images[0];
        const productObject = {
            product_id: productId,
            title: name,
            description,
            price,
            image,
            inStock: true,
            category,
            stripe_id: prices.data[0].id,
        }
        // console.log(productObject);
        // get all product promises from stripe and update
        const updatedProduct = await updateProduct(productObject);


        console.log(updatedProduct);
    }

}

fetchStripe();