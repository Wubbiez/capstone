export async function getAllProducts() {
    const response = await fetch("http://localhost:3001/api/products");
    const products = await response.json();
    return products;
}

export async function updateOrderProduct(id, price, quantity) {
    const response = await fetch(`http://localhost:3001/api/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, price, quantity }),
    });
    const item = await response.json();
    return item;
}

export async function getOrderProductById(orderProductId) {
    const response = await fetch(`http://localhost:3001/api/cart/${orderProductId}`);
    const orderProduct = await response.json();
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