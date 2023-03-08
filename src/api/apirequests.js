export async function getAllProducts() {
    const response = await fetch("http://localhost:3001/api/products");
    const products = await response.json();
    return products;
}

export async function updateOrderProduct(productId, price, quantity, orderId) {
    const response = await fetch(`http://localhost:3001/api/cart/${orderId}/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, price, quantity, orderId }),
    });
    const item = await response.json();
    return item;
}

export async function getOrderProductById(id) {
    const response = await fetch(`http://localhost:3001/api/cart/${id}`);
    console.log(response);
    const orderProduct = await response.json();
    return orderProduct;
}

export async function getOrderProductByOrderIdAndProductId(orderId, productId) {
    const response = await fetch(`http://localhost:3001/api/cart/${orderId}/${productId}`);
    const orderProduct = await response.json();
    console.log(orderProduct);
    return orderProduct;
}

export async function updateProduct(id, title, description, price, image, inStock, category) {
    const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, description, price, image, inStock, category }),
    });
    const product = await response.json();
    return product;
}

export async function getOrderProductsByOrderId(orderId) {
    const response = await fetch(`http://localhost:3001/api/cart/${orderId}/items`);
    const orderProducts = await response.json();
    return orderProducts;
}

// export async function attachOrderProductToOrder(orderId, orderProductId) {
//     const response = await fetch(`http://localhost:3001/api/cart/${orderId}/items`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderProductId }),
//     });
//     const orderProduct = await response.json();
//     return orderProduct;
// }

// export async function addProductToCart(productId) {
//     const response = await fetch(`http://localhost:3001/api/cart/${productId}`, {
//         method: "POST",
//     });
//     const cart = await response.json();
//     return cart;
// }


// export async function addToOrder(userId, status, price, quantity) {
//     const response = await fetch(`http://localhost:3001/api/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, status, price, quantity }),
//     });
//     const order = await response.json();
//     return order;
// }


// if(order.find(order_product => order_product.product_id === product_id)) {
//     quantity = incompleteOrder['order_products'].find(order_product => order_product.product_id === product_id).quantity + 1;
//     const response3 = await fetch(`http://localhost:3001/api/cart/${product_id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({order_id, product_id, price, quantity}),
//     });
//     if (response3.ok) {
//         const item = await response3.json();
//         console.log(item);
//     }
//     console.log('This item already exists in the order');
//     return;
//
// }