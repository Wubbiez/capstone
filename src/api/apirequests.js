export async function getAllProducts() {
    const response = await fetch("http://localhost:3001/api/products");
    const products = await response.json();
    return products;
}

export async function getSingleProduct(id) {
    const response = await fetch(`http://localhost:3001/api/products/${id}`);
    const product = await response.json();
    console.log(product)
    return product;
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
    const orderProduct = await response.json();
    return orderProduct;
}

export async function getOrderProductByOrderIdAndProductId(orderId, productId) {
    const response = await fetch(`http://localhost:3001/api/cart/${orderId}/${productId}`);
    const orderProduct = await response.json();
    return orderProduct;
}

export async function updateProduct(id, title, description, price, image, inStock, category, stripe_id) {
    const token = localStorage.getItem('user-token');

    const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, title, description, price, image, inStock, category, stripe_id }),
    });
    const product = await response.json();
    return product;
}

export async function getOrderProductsByOrderId(orderId) {
    const response = await fetch(`http://localhost:3001/api/cart/${orderId}/items`);
    const orderProducts = await response.json();
    return orderProducts;
}

export async function createaUser(username, password, email, first_name, last_name, address, phone) {
    try {
        const response = await fetch(
            "http://localhost:3001/api/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    address: address,
                    phone: phone
                }),
            }
        );
        const results = await response.json();
        if (results.message) {
            alert(results.message);
        }
        if (results.error) {
            alert(results.error);
        }
        return results;
    } catch (e) {
        throw ("err", e);
    }
}

export async function getUser(token) {
    try {
        const response = await fetch(
            `https://localhost:3001/api/me`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const results = await response.json();

        return results;
    } catch (e) {
        throw ("err", e);
    }
}

export async function loginUser(username, password) {

        const response = await fetch(
            "http://localhost:3001/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        );
        const results = await response.json();
        if (results.message) {
            alert(results.message);
        }
        if (results.token) {
            const data = {
                token: results.token,
                username: results.user.username,
                is_admin: results.user.is_admin,
            };
            localStorage.setItem("user-token", results.token);
            localStorage.setItem("user-username", results.user.username);
            localStorage.setItem("user-is_admin", results.user.is_admin);
            console.log(data);
            return data;
        }
        if (results.error) {
            alert(results.error);
        }



}

export async function getOrdersByUserId(userId) {
    const response = await fetch(`http://localhost:3001/api/orders/users/${userId}`);
    const orders = await response.json();
    return orders;
}

export async function getUserByUsername(username) {
    const response = await fetch(`http://localhost:3001/api/users/${username}`);
    const user = await response.json();
    return user;
}

export async function getAllUsers() {
    const token = localStorage.getItem('user-token');
    const response = await fetch(
        `http://localhost:3001/api/users/`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const users = await response.json();
    return users;
}

export async function updateUser(id, username, email, first_name, last_name, address, phone, is_admin, is_active, password) {
    console.log()
    const token = localStorage.getItem('user-token');

    const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, username, email, first_name, last_name, address, phone, is_admin, is_active, password }),
    });
    const user = await response.json();
    return user;
}