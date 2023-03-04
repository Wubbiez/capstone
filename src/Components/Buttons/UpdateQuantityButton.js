import {useState} from "react";
import {Button} from "@mui/material";
import {updateOrderProduct, getOrderProductById} from "../../api/apirequests.js";
import {Typography} from "@mui/material";

function UpdateQuantityButton ({product_id, price}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(1);

    async function handleDecrementClick() {
        const orderProduct = await getOrderProductById(product_id);
        setQuantity(orderProduct.quantity);
        if (quantity > 0 && !isUpdating) {
            setIsUpdating(true);
            try {
                const updatedQuantity = quantity - 1;
                await updateOrderProduct(product_id, price, updatedQuantity);
                setQuantity(updatedQuantity);
            } catch (error) {
                console.error(error);
            }
            setIsUpdating(false);
        }
    }

    async function handleIncrementClick() {
        const orderProduct = await getOrderProductById(product_id);

        setQuantity(orderProduct.quantity);
        if (!isUpdating) {
            setIsUpdating(true);
            try {
                const updatedQuantity = quantity + 1;
                await updateOrderProduct(product_id, price, updatedQuantity);
                setQuantity(updatedQuantity);
            } catch (error) {
                console.error(error);
            }
            setIsUpdating(false);
        }
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                disabled={quantity === 1 || isUpdating}
                onClick={handleDecrementClick}
            >
                -
            </Button>
            <Typography variant="body1" style={{ margin: '0 8px' }}>{quantity}</Typography>
            <Button
                variant="contained"
                color="primary"
                disabled={isUpdating}
                onClick={handleIncrementClick}
            >
                +
            </Button>
        </>
    );
}

export default UpdateQuantityButton;
