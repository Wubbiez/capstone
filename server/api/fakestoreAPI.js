export async function getProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    return await response.json();
}

export async function getProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await response.json();
}

export async function getCategories() {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    return await response.json();
}

export async function getProductsByCategory(category) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return await response.json();
}

export async function getProductsBySearch(search) {
    const response = await fetch(`https://fakestoreapi.com/products/search?query=${search}`);
    return await response.json();
}

export async function getProductsByPrice(min, max) {
    const response = await fetch(`https://fakestoreapi.com/products/price?min=${min}&max=${max}`);
    return await response.json();
}

export async function getProductsByRating(rating) {
    const response = await fetch(`https://fakestoreapi.com/products/rating?gte=${rating}`);
    return await response.json();
}

export async function getProductsByShipping() {
    const response = await fetch(`https://fakestoreapi.com/products/shipping?free=true`);
    return await response.json();
}

export async function getProductsBySale() {
    const response = await fetch(`https://fakestoreapi.com/products/sale`);
    return await response.json();
}

export async function getProductsByPage(page) {
    const response = await fetch(`https://fakestoreapi.com/products?page=${page}`);
    return await response.json();
}

export async function getProductsByLimit(limit) {
    const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
    return await response.json();
}

export async function getProductsByPageAndLimit(page, limit) {
    const response = await fetch(`https://fakestoreapi.com/products?page=${page}&limit=${limit}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSort(page, limit, sort) {
    const response = await fetch(`https://fakestoreapi.com/products?page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSortAndCategory(page, limit, sort, category) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}?page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSortAndSearch(page, limit, sort, search) {
    const response = await fetch(`https://fakestoreapi.com/products/search?query=${search}&page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSortAndPrice(page, limit, sort, min, max) {
    const response = await fetch(`https://fakestoreapi.com/products/price?min=${min}&max=${max}&page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSortAndRating(page, limit, sort, rating) {
    const response = await fetch(`https://fakestoreapi.com/products/rating?gte=${rating}&page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSortAndShipping(page, limit, sort) {
    const response = await fetch(`https://fakestoreapi.com/products/shipping?free=true&page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSortAndSale(page, limit, sort) {
    const response = await fetch(`https://fakestoreapi.com/products/sale?page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSortAndCategoryAndSearch(page, limit, sort, category, search) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}/search?query=${search}&page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSortAndCategoryAndPrice(page, limit, sort, category, min, max) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}/price?min=${min}&max=${max}&page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSortAndCategoryAndRating(page, limit, sort, category, rating) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}/rating?gte=${rating}&page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}

export async function getProductsByPageAndLimitAndSortAndCategoryAndShipping(page, limit, sort, category) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}/shipping?free=true&page=${page}&limit=${limit}&sort=${sort}`);
    return await response.json();
}
