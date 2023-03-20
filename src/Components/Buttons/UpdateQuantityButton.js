import {useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import {getOrderProductByOrderIdAndProductId, updateOrderProduct,} from "../../api/apirequests.js";

function UpdateQuantityButton({orderProductId, price, order_id, setRefresh, refresh, setRefreshCart}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        async function getQuantity() {
            try {
                const {quantity} = await getOrderProductByOrderIdAndProductId(
                    order_id,
                    orderProductId
                );
                if (quantity > 0) {
                    setQuantity(quantity);
                    setIsInCart(true);
                } else {
                    setQuantity(0);
                    setIsInCart(false);
                }
            } catch (error) {
                console.error(error);
            }

        }

        setRefresh(false);
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
        setRefresh(true);
        setRefreshCart(true);
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
        setRefresh(true);
        setRefreshCart(true);
    }

    return (
        <>
            {isInCart && (
                <>
                    <Button
                        variant="contained"
                        disabled={quantity === 1 || isUpdating}
                        onClick={handleDecrementClick}
                        sx={{
                            backgroundColor: '#457B9D',
                            color: '#F1FAEE',
                            '&:hover': {
                                backgroundColor: '#F1FAEE',
                                color: '#457B9D'
                            }
                        }}
                    >
                        -
                    </Button>
                    <Typography variant="body1" style={{margin: "0 8px"}}>
                        {quantity}
                    </Typography>
                    <Button
                        variant="contained"
                        disabled={isUpdating}
                        onClick={handleIncrementClick}
                        sx={{
                            backgroundColor: '#84a98c',
                            color: '#F1FAEE',
                            '&:hover': {
                                backgroundColor: '#F1FAEE',
                                color: '#84a98c'
                            }
                        }}
                    >
                        +
                    </Button>
                </>
            )}
        </>
    );

}

export default UpdateQuantityButton;