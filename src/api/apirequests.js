import { toast } from "react-toastify";


export async function getAllProducts() {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/products`);
    const products = await response.json();
    return products;
}

export async function getSingleProduct(id) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/products/${id}`);
    const product = await response.json();
    console.log(product)
    return product;
}

export async function updateOrderProduct(productId, price, quantity, orderId) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/cart/${orderId}/${productId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({productId, price, quantity, orderId}),
    });
    const item = await response.json();
    return item;
}

export async function getOrderProductById(id) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/cart/${id}`);
    const orderProduct = await response.json();
    return orderProduct;
}

export async function getOrderProductByOrderIdAndProductId(orderId, productId) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/cart/${orderId}/${productId}`);
    const orderProduct = await response.json();
    return orderProduct;
}

export async function updateProduct(id, title, description, price, image, inStock, category, stripe_id) {
    const token = localStorage.getItem('user-token');

    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({id, title, description, price, image, inStock, category, stripe_id}),
    });
    const product = await response.json();
    return product;
}

export async function getOrderProductsByOrderId(orderId) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/cart/${orderId}/items`);
    const orderProducts = await response.json();
    return orderProducts;
}

export async function createaUser(username, password, email, first_name, last_name, address, phone) {
    try {
        const response = await fetch(
            `${process.env.EC2_PUBLIC_IP}/api/users/register`,
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
                    phone: phone,
                    is_admin: false
                }),
            }
        );
        const results = await response.json();
        if (results.message === 'Signup Successful!') {
            toast.success(results.message);
        } else
        if (results.error) {
            toast.error(results.message);
        } else
        if (results.message) {
            toast.warn(results.message);
        } 
        
        if (results.token) {
            const data = {
                token: results.token,
                username: results.user.username,
                is_admin: results.user.is_admin,
                user_id: results.user.user_id
            };
            localStorage.setItem("user-token", results.token);
            localStorage.setItem("user-username", results.user.username);
            localStorage.setItem("user-is_admin", results.user.is_admin);
            localStorage.setItem("user-id", results.user.user_id);
            console.log(data);
            return data;
        }
        return results;
    } catch (e) {
        throw ("err", e);
    }
}

export async function getUser(token) {
    try {
        const response = await fetch(
            `${process.env.EC2_PUBLIC_IP}/api/me`,
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
        `${process.env.EC2_PUBLIC_IP}/api/users/login`,
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
    if (results.message === 'Login Successful!') {
        toast.success(results.message);
    } else
    if (results.error) {
        toast.error(results.message);
    } else
    if (results.message) {
        toast.warn(results.message);
    } 
    if (results.token) {
        const data = {
            token: results.token,
            username: results.user.username,
            is_admin: results.user.is_admin,
            user_id: results.user.user_id
        };
        localStorage.setItem("user-token", results.token);
        localStorage.setItem("user-username", results.user.username);
        localStorage.setItem("user-is_admin", results.user.is_admin);
        localStorage.setItem("user-id", results.user.user_id);
        console.log(data);
        return data;
    }

}

export async function getLatestOrderId(user_id) {
    console.log(user_id);
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/orders/users/${user_id}/latest`);
    if (!response || !response.ok) {
        const newOrder = await fetch(`${process.env.EC2_PUBLIC_IP}/api/orders`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user_id, status: 'created'}),
        });
        return newOrder.json();
    } else {
        const order = await response.json();
        console.log(order);
        return order;
    }
}


export async function getOrdersByUserId(userId) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/orders/users/${userId}`);
    const orders = await response.json();
    return orders;
}

export async function getUserByUsername(username) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/users/${username}`);
    const user = await response.json();
    return user;
}

export async function getAllUsers() {
    const token = localStorage.getItem('user-token');
    const response = await fetch(
        `${process.env.EC2_PUBLIC_IP}/api/users/`,
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

export async function getUserById(user_id, token) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/users/me/${user_id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            }
        );

    const user = await response.json();
    return user;
}

export async function updateUser(id, username, email, first_name, last_name, address, phone, is_admin, is_active, password) {
    console.log()
    const token = localStorage.getItem('user-token');
    const isAdmin = localStorage.getItem('user-is_admin');

    if(isAdmin === 'true') {
        const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id,
                username,
                email,
                first_name,
                last_name,
                address,
                phone,
                is_admin,
                is_active,
                password
            }),
        });
        const user = await response.json();
        return user;
    } else {
        is_admin = false;
        const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/users/me/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id,
                username,
                email,
                first_name,
                last_name,
                address,
                phone,
                is_admin,
                is_active,
                password
            }),
        });
        const user = await response.json();
        return user;
    }
}

export async function getOrderById(id) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/orders/${id}`);
    const order = await response.json();
    return order;
}

export async function getReviewsByProductId(id) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/reviews/${id}`);
    const reviews = await response.json();
    return reviews;
}

export async function createOrder(user_id) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/orders`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user_id, status: 'created'}),
    });
    const order = await response.json();
    return order;
}

export async function getOrdersByUser(userId) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/orders/users/${userId}`);
    const orders = await response.json();
    return orders;
}

export async function getAverageProductRating(productId) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/reviews/${productId}/rating`);
    const average = await response.json();
    return average;
}

export async function getAllProductsBySearchTerm(searchTerm) {
    const response = await fetch(`${process.env.EC2_PUBLIC_IP}/api/products/search/${searchTerm}`);
    const products = await response.json();
    console.log(products);
    return products;
}