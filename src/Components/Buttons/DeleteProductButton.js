import {useState} from "react";
import {Button} from "@mui/material";

function DeleteProductButton({product_id}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleClick() {
        setIsDeleting(true);
        try {
            // delete product from all existing orders
            const deleteOrderProduct = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/cart/${product_id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            });

            const deleteProduct = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/products/${product_id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            });

            if (deleteProduct.ok) {
                const product = await deleteProduct.json();
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
            {'Delete Item'}
        </Button>
    );
}

export default DeleteProductButton;