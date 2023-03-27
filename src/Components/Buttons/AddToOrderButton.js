import {useState} from 'react';
import {Button, Tooltip} from '@mui/material';
import {getOrderProductsByOrderId, getOrdersByUser} from "../../api/apirequests.js";
import {AddShoppingCartTwoTone} from '@mui/icons-material';
import {toast} from "react-toastify";


function AddToOrderButton({
                              product_id,
                              status,
                              price,
                              quantity,
                              stripe_id,
                              setOrder,
                              setRefresh,
                              setRefreshCart
                          }) {
    const [isAddingToOrder, setIsAddingToOrder] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem('user-id'));

    async function handleClick() {
        setIsAddingToOrder(true);


        try {
            const orders = await getOrdersByUser(userId);
            const incompleteOrder = orders
                .filter(order => order.status !== 'paid')
                .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
                [0];

            if (incompleteOrder && incompleteOrder['user_id'] == userId && orders.length > 0) {
                const order_id = incompleteOrder['order_id'];
                setOrder(order_id);
                localStorage.setItem('order_id', order_id);
                const orderProducts = await getOrderProductsByOrderId(order_id);

                if (orderProducts.length > 0 && orderProducts.find(order_product => order_product.productId === product_id)) {
                    quantity = orderProducts.find(order_product => order_product.productId === product_id).quantity + 1;

                    const response3 = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/cart/${order_id}/${product_id}`, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({order_id, product_id, price, quantity, stripe_id}),

                    })

                    if (response3.ok) {
                        const item = await response3.json();
                        toast.success('Item added to cart!');
                    }
                } else {
                    const quantity = 1;
                    const response = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/cart/${order_id}/items`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({order_id, product_id, price, quantity, stripe_id}),
                    });
                    if (response.ok) {
                        const item = await response.json();
                        toast.success('Item added to cart!');
                    }
                }
            } else {
                const response2 = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/orders`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({userId, status}),
                });
                if (response2.ok) {
                    const order = await response2.json();

                    const order_id = order['order_id'];
                    setOrder(order_id);
                    localStorage.setItem('order_id', order_id);
                    const response = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/cart/${order_id}/items`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({order_id, product_id, price, quantity, stripe_id}),
                    });
                    if (response.ok) {
                        const item = await response.json();
                        toast.success('Item added to cart!');
                    }
                }
            }

        } catch (error) {
            console.error(error);
        }
        setIsAddingToOrder(false);
        setRefresh(true);
        setRefreshCart(true);
    }

    return (
        <Tooltip title="Add Item to Cart" arrow>
            <Button
                variant="contained"
                disabled={isAddingToOrder}
                onClick={handleClick}
                sx={{
                    backgroundColor: '#457B9D',
                    height: '100%',
                    width: '80px',
                    fontSize: 'calc(1rem + 0.2vw)',
                    padding: 'calc(0.5rem + 0.1vw)',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#A8DADC',
                        color: '#333333',
                        boxShadow: '1px 2px 1px 1px #1D3557;',
                    },
                    '@media (min-width:600px)': {
                        width: '120px',
                    },
                    '@media (min-width:960px)': {
                        width: '160px',
                    },
                    // '@media (min-width:600px)': {
                    //     padding: 'calc(1.2rem + 0.6vw)',
                    //     fontSize: 'calc(1.3rem + 0.8vw)',
                    // },
                    // '@media (min-width:960px)': {
                    //     padding: 'calc(1.6rem + 1.2vw)',
                    //     fontSize: 'calc(2.2rem + 1.2vw)',
                    // },
                }}>

                <AddShoppingCartTwoTone/>
            </Button>
        </Tooltip>
    );
}

export default AddToOrderButton;