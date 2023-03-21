import {useState} from "react";
import {Button} from "@mui/material";


import {RemoveShoppingCartTwoTone} from "@mui/icons-material";

function DeleteOrderProductButton({order_id, product_id, setRefresh,}) {

    const [isDeleting, setIsDeleting] = useState(false);

    async function handleClick() {
        setIsDeleting(true);
        try {
            const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/cart/${order_id}/${product_id}`, {
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

            disabled={isDeleting}
            onClick={handleClick}
            sx={{
                backgroundColor: '#E63946',
                color: '#F1FAEE',
                '&:hover': {
                    backgroundColor: '#F1FAEE',
                    color: '#E63946'
                }
            }}
        >
            <RemoveShoppingCartTwoTone/> </Button>
    );
}

export default DeleteOrderProductButton;