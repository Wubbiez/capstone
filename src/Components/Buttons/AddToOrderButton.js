import {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {getOrderProductsByOrderId} from "../../api/apirequests.js";
import { AddShoppingCartTwoTone } from '@mui/icons-material';


function AddToOrderButton({userId, product_id, status, price, quantity, stripe_id, setOrder, setRefresh}) {
    const [isAddingToOrder, setIsAddingToOrder] = useState(false);

    async function handleClick() {
        setIsAddingToOrder(true);

        try {
            const response = await fetch(`http://localhost:3001/api/orders?userId=${userId}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });

            if (response.ok) {
                const orders = await response.json();
                const incompleteOrder = orders.find(order => order.status !== 'paid');

                if (incompleteOrder) {
                    const order_id = incompleteOrder['order_id'];
                    setOrder(order_id);
                    localStorage.setItem('order_id', order_id);
                    const orderProducts = await getOrderProductsByOrderId(order_id);

                    if (orderProducts.length > 0 && orderProducts.find(order_product => order_product.productId === product_id)) {
                        quantity = orderProducts.find(order_product => order_product.productId === product_id).quantity + 1;

                        const response3 = await fetch(`http://localhost:3001/api/cart/${order_id}/${product_id}`, {
                            method: 'PATCH',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({order_id, product_id, price, quantity, stripe_id}),

                        })

                        if (response3.ok) {
                            const item = await response3.json();
                            console.log(item);
                        }
                    } else {
                        const quantity = 1;
                        const response = await fetch(`http://localhost:3001/api/cart/${order_id}/items`, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({order_id, product_id, price, quantity, stripe_id}),
                        });
                        if (response.ok) {
                            const item = await response.json();
                            console.log(item);
                        }
                    }
                } else {
                    const response2 = await fetch('http://localhost:3001/api/orders', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({userId, status}),
                    });
                    if (response2.ok) {
                        const order = await response2.json();
                        const order_id = order['order_id'];
                        setOrder(order_id);
                        localStorage.setItem('order_id', order_id);
                        const response = await fetch(`http://localhost:3001/api/cart/${order_id}/items`, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({order_id, product_id, price, quantity, stripe_id}),
                        });
                        if (response.ok) {
                            const item = await response.json();
                            console.log(item);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
        setIsAddingToOrder(false);
        setRefresh(true);
    }

    return (
        <Button
            variant="contained"
            disabled={isAddingToOrder}
            onClick={handleClick}
            sx={{
                backgroundColor: '#457B9D',
                transition: 'background-color 0.3s ease',
  
                '&:hover': {
                backgroundColor: '#457B9D',
                boxShadow: '1px 2px 1px 1px #1D3557;',}
             }}>
            {isAddingToOrder ? 'Adding to cart...' : <AddShoppingCartTwoTone />}
        </Button>
    );
}

export default AddToOrderButton;