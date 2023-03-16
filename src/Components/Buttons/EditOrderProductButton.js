import React, {useState} from "react";
import {Button} from "@mui/material";

// <EditOrderProductButton orderProductId={product.product_id} price={product.price}
//                         quantity={1} />
function EditOrderProductButton({orderProductId: id, price, quantity}) {
    const [isEditing, setIsEditing] = useState(false);

    async function handleClick() {
        setIsEditing(true);
        try {
            const response = await fetch(`http://localhost:3001/api/cart/${id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id, price, quantity}),
            });

            if (response.ok) {
                const item = await response.json();
                console.log(item);
            }
        } catch (error) {
            console.error(error);
        }
        setIsEditing(false);
    }

    return (
        <Button
            variant="contained"
            color="primary"
            disabled={isEditing}
            onClick={handleClick}
        >
            {'Edit'}
        </Button>
    );
}