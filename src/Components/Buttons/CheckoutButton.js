import React from 'react';
import getStripe from "../../lib/getStripe.js";
import {Button} from '@mui/material';
import {ShoppingCartCheckoutTwoTone} from '@mui/icons-material';

const CheckoutButton = () => {
    const order_id = localStorage.getItem('order_id');

    const handleClick = async (event) => {
        event.preventDefault();
        const stripe = await getStripe();
        const response = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/cart/${order_id}/items`);
        const items = await response.json();


        // Check if all items are in stock
        const itemStockPromises = items.map((item) => fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/products/${item.productId}/stock`));
        const itemStockResponses = await Promise.all(itemStockPromises);
        const itemStocks = await Promise.all(itemStockResponses.map((response) => response.json()));
        const isAllInStock = itemStocks.every((stock) => stock.in_stock);

        if (!isAllInStock) {
            // display an error message and remove items from cart
            const outOfStockItems = items.filter((item, index) => !itemStocks[index].in_stock);
            const message = `The following items are out of stock and have been removed from your cart:\n\n${outOfStockItems.map((item) => item.productId).join('\n')}`;
            alert(message);
            // create an array of promises that represent the DELETE requests
            const deleteItemPromises = outOfStockItems.map((item) => fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/cart/${order_id}/${item.productId}`, {
                method: "DELETE",
            }));

            // wait for all DELETE requests to complete before continuing with the checkout process
            Promise.all(deleteItemPromises).then(() => {
                handleClick(event); // restart the checkout process after removing out-of-stock items
            });

            return;
        }


        const lineItems = items.map((item) => ({
            price: item.stripe_id,
            quantity: item.quantity,
        }));
        const {error} = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems,
            clientReferenceId: order_id.toString(),
            successUrl: `https://www.gadgetgalaxy.link/success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: "https://www.gadgetgalaxy.link/products",
        });
        if (error) {
            console.warn("Error:", error);
        }
    };

    return (
        <>
            {order_id ? <Button variant="contained" onClick={handleClick}
                                sx={{
                                    backgroundColor: '#84a98c',
                                    color: '#f8edeb',
                                    '&:hover': {
                                        backgroundColor: '#ccd5ae',
                                        color: '#343a40'
                                    }
                                }}
            >
                <ShoppingCartCheckoutTwoTone/> Checkout
            </Button> : <Button variant="contained" disabled
                                sx={{
                                    backgroundColor: '#84a98c',
                                    color: '#f8edeb',
                                    '&:hover': {
                                        backgroundColor: '#ccd5ae',
                                        color: '#343a40'
                                    }
                                }}
            >
                <ShoppingCartCheckoutTwoTone/> Checkout
            </Button>}
        </>
    );
}

export default CheckoutButton;