import React from 'react';
import getStripe from "../../lib/getStripe.js";

const CheckoutButton = ({price, name, description, image}) => {
    const handleClick = async (event) => {
        const stripe = await getStripe();
        const {error} = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems: [
                {
                    price: "price_1Mi44BG3grcR7R51kaMk9TWb",
                    quantity: 1


                }
            ],
            successUrl: "http://localhost:3000/success",
            cancelUrl: "http://localhost:3000/cancel"
        });
        if (error) {
            console.warn("Error:", error);
        }
    };

    return (
        <button role="link" onClick={handleClick}>
            Checkout
        </button>
    );
}

export default CheckoutButton;