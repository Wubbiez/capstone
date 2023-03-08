import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {
    updateOrderProduct,
    getOrderProductById,
    getOrderProductByOrderIdAndProductId,
} from "../../api/apirequests.js";
import { Typography } from "@mui/material";

function UpdateQuantityButton({ orderProductId, price, order_id , setRefresh , refresh}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        async function getQuantity() {
            try {
                const { quantity } = await getOrderProductByOrderIdAndProductId(
                    order_id,
                    orderProductId
                );
                if (quantity) {
                    setQuantity(quantity);
                    setIsInCart(true);
                } else {
                    setQuantity(1);
                    setIsInCart(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getQuantity();
    }, [orderProductId, order_id, refresh]);

    async function handleDecrementClick() {
        if (quantity > 1 && !isUpdating) {
            setIsUpdating(true);
            try {
                const updatedQuantity = quantity - 1;
                await updateOrderProduct(orderProductId, price, updatedQuantity, order_id);
                setQuantity(updatedQuantity);
            } catch (error) {
                console.error(error);
            }
            setIsUpdating(false);
        }
    }

    async function handleIncrementClick() {
        if (!isUpdating) {
            setIsUpdating(true);
            try {
                const updatedQuantity = quantity + 1;
                await updateOrderProduct(orderProductId, price, updatedQuantity, order_id);
                setQuantity(updatedQuantity);
            } catch (error) {
                console.error(error);
            }
            setIsUpdating(false);
        }
    }

    return (
        <>
            {isInCart && (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={quantity === 1 || isUpdating}
                        onClick={handleDecrementClick}
                    >
                        -
                    </Button>
                    <Typography variant="body1" style={{ margin: "0 8px" }}>
                        {quantity}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isUpdating}
                        onClick={handleIncrementClick}
                    >
                        +
                    </Button>
                </>
            )}
        </>
    );
}

export default UpdateQuantityButton;
