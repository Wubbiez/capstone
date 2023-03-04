import {useState} from "react";
import {Button} from "@mui/material";

function DeleteOrderProductButton ({order_id, product_id}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleClick() {
        setIsDeleting(true);
        try {
            // delete product from all existing orders
            const deleteOrderProduct = await fetch(`http://localhost:3001/api/cart/${product_id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({order_id}),
            });

            console.log(deleteOrderProduct);
            if (deleteOrderProduct.ok) {
                const product = await deleteOrderProduct.json();
                console.log(product);
            }
        } catch (error) {
            console.error(error);
        }
        setIsDeleting(false);
    }

    return (
        <Button
            variant="contained"
            color="error"
            disabled={isDeleting}
            onClick={handleClick}
        >
            {'Delete Order Item'}
        </Button>
    );
}

export default DeleteOrderProductButton;