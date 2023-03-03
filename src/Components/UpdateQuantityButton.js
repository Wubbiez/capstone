import {useState} from "react";
import {Button} from "@mui/material";
import {updateOrderProduct, getOrderProductById} from "../api/apirequests.js";
import {Typography} from "@mui/material";

function UpdateQuantityButton ({orderProductId: id, price}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(0);

    async function handleDecrementClick() {
        const orderProduct = await getOrderProductById(id);
        setQuantity(orderProduct.quantity);
        if (quantity > 0 && !isUpdating) {
            setIsUpdating(true);
            try {
                const updatedQuantity = quantity - 1;
                await updateOrderProduct(id, price, updatedQuantity);
                setQuantity(updatedQuantity);
            } catch (error) {
                console.error(error);
            }
            setIsUpdating(false);
        }
    }

    async function handleIncrementClick() {
        const orderProduct = await getOrderProductById(id);
        setQuantity(orderProduct.quantity);
        if (!isUpdating) {
            setIsUpdating(true);
            try {
                const updatedQuantity = quantity + 1;
                await updateOrderProduct(id, price, updatedQuantity);
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
                disabled={quantity === 0 || isUpdating}
                onClick={handleDecrementClick}
            >
                -1
            </Button>
            <Typography variant="body1">{quantity}</Typography>
            <Button
                variant="contained"
                color="primary"
                disabled={isUpdating}
                onClick={handleIncrementClick}
            >
                +1
            </Button>
        </>
    );
}

export default UpdateQuantityButton;
