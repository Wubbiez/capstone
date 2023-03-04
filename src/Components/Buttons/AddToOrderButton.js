import { useState } from 'react';
import {Button} from '@mui/material';
import {getOrderProductsByOrderId} from "../../api/apirequests.js";


function AddToOrderButton({ userId, product_id, status, price, quantity, setOrder }) {
    const [isAddingToOrder, setIsAddingToOrder] = useState(false);

    async function handleClick() {
        setIsAddingToOrder(true);
        try {
            const response = await fetch(`http://localhost:3001/api/orders?userId=${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const orders = await response.json();
                const incompleteOrder = orders.find(order => order.status !== 'completed');

                if (incompleteOrder) {
                    const order_id = incompleteOrder['order_id'];
                    setOrder(order_id);

                    const response = await fetch(`http://localhost:3001/api/cart/${order_id}/items`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({order_id, product_id, price, quantity}),
                    });
                    if (response.ok) {
                        const item = await response.json();
                        console.log(item);
                    }
                    console.log('An incomplete order already exists');
                } else {
                    const response2 = await fetch('http://localhost:3001/api/orders', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId, status}),
                    });
                    if (response2.ok) {
                        const order = await response2.json();
                        const order_id = order['order_id'];
                        setOrder(order_id);
                        const response = await fetch(`http://localhost:3001/api/cart/${order_id}/items`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({order_id, product_id, price, quantity}),
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
    }

    return (
        <Button
            variant="contained"
            color="primary"
            disabled={isAddingToOrder}
            onClick={handleClick}
        >
            {isAddingToOrder ? 'Adding to order...' : 'Add to order'}
        </Button>
    );
}

export default AddToOrderButton;