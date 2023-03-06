import React from 'react';
import getStripe from "../../lib/getStripe.js";

const CheckoutButton = ({order_id}) => {

    const handleClick = async (event) => {
        event.preventDefault();
        const stripe = await getStripe();
        const response = await fetch(`http://localhost:3001/api/cart/${order_id}/items`);
        const items = await response.json();
        const lineItems = items.map((item) => ({
            price: item.stripe_id,
            quantity: item.quantity,

        }));
        const { error} = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems,
            clientReferenceId: order_id.toString(),
            successUrl: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: "http://localhost:3000/cancel",
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