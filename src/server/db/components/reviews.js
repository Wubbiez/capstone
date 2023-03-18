import client from "../client.js";

async function createReviews({ user, product_id, title, content, rating }) {
    console.log(user, product_id, title, content, rating)
    try {
        const { rows: [reviews] } = await client.query(`
            INSERT INTO reviews(username, productid, title, content, rating)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *;
        `, [user, product_id, title, content, rating]);
        return reviews;
    } catch (error) {
        throw error;
    }
}

async function getReviewsByProductId(productid) {
    try {
        const { rows: reviews } = await client.query(`
            SELECT *
            FROM reviews
            WHERE productid = $1;
        `, [productid]);
        return reviews;
    } catch (error) {
        throw error;
    }
}

async function getReviewsByUserId(username) {
    try {
        const { rows: reviews } = await client.query(`
            SELECT *
            FROM reviews
            WHERE username = $1;
        `, [username]);
        return reviews;
    } catch (error) {
        throw error;
    }
}

async function updateReviews({ id, username, productid, title, content, rating, date_created }) {
    try {
        const { rows: [reviews] } = await client.query(`
            UPDATE reviews
            SET username = $1, productid = $2, title = $3, content = $4, rating = $5, date_created = $6
            WHERE review_id = $7
            RETURNING *;
        `, [username, productid, title, content, rating, date_created, id]);
        return reviews;
    } catch (error) {
        throw error;
    }
}

async function deleteReview(id) {
    try {
        const { rows: [reviews] } = await client.query(`
            DELETE FROM reviews
            WHERE review_id = $1
            RETURNING *;
        `, [id]);
        return reviews;
    } catch (error) {
        throw error;
    }
}

export {
    createReviews,
    getReviewsByProductId,
    getReviewsByUserId,
    updateReviews,
    deleteReview,
}