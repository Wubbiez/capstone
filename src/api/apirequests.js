export async function getAllProducts() {
    const response = await fetch("http://localhost:3001/api/products");
    const products = await response.json();
    return products;
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