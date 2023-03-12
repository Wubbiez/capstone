import stripe0 from "stripe";



const stripe = stripe0("sk_test_51Mi3nwG3grcR7R51zWXFcqthl0Q9yq815ZWUAgaUcSiSkXHVBqhkMtE9zVgr7Cb1dsyDhwadGkH3Ls79e9y0U53f0035ZshBIB");





const editStripe = async (productId, title, description, price, image, inStock, category, stripe_id) => {
console.log(process.env.STRIPE_API_KEY)
    const productObject = {
        name: title,
        description,
        images: [image],
        active: inStock,
        metadata: {
            category: category
        },
    }

    try {
        const response = await stripe.products.update(productId.toString(), productObject);
        console.log(response);
        console.log(price)
        //
// update the stripe price object with the new price
        const priceResponse = await stripe.prices.create(
            {
                product: response.id,
                unit_amount: Math.round(price * 100),
                currency: "usd",
            }
            );
        console.log(priceResponse);
        return priceResponse;
        //



    } catch (error) {
        console.log(error);
    }

}

export default editStripe;

