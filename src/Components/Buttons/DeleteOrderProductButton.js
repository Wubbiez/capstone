import {useState} from "react";
import {Button} from "@mui/material";

function DeleteOrderProductButton ({order_id, product_id, setRefresh}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleClick() {
        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:3001/api/cart/${order_id}/${product_id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            });

            if (response.ok) {
                const item = await response.json();
                console.log(item);
            }
        } catch (error) {
            console.error(error);
        }
        setIsDeleting(false);
        setRefresh(true);
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