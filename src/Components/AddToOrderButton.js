import { useState } from 'react';
import {Button} from '@mui/material';

function AddToOrderButton({ userId, status, price, quantity }) {
    const [isAddingToOrder, setIsAddingToOrder] = useState(false);

    async function handleClick() {
        setIsAddingToOrder(true);
        try {
            const response = await fetch('http://localhost:3001/api/orders', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userId, status, price, quantity}),
            });
            if (response.ok) {
                const order = await response.json();
                console.log(order);
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