import client from "../client.js";

async function createReviews({ username, productid, title, content, rating, date_created }) {
    try {
        const { rows: [reviews] } = await client.query(`
            INSERT INTO reviews(username, productid, title, content, rating, date_created)
            VALUES($1,$2,$3,$4,$5,$6)
             RETURNING *, (SELECT product_id FROM products WHERE product_id = $2);
        `, [username, productid, title, content, rating, date_created]);
        return reviews;
    } catch (error) {
        throw error;
    }
}

async function getAllReviews() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM reviews;
        `);
        return rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

//get reviews by the product_id
async function getReviewsByProductId(client, productId) {
    const query = `
    SELECT *
    FROM reviews
    WHERE productid = $1
  `;
    const values = [productId];
    const result = await client.query(query, values);
    return result.rows;
}

// Update an existing review
async function updateReview(client, { reviewId, title, content, rating }) {
    const query = `
    UPDATE reviews
    SET title = $2, content = $3, rating = $4
    WHERE review_id = $1
    RETURNING *
  `;
    const values = [reviewId, title, content, rating];
    const result = await client.query(query, values);
    return result.rows[0];
}

// Delete an existing review
async function deleteReview(client, reviewId) {
    const query = `
    DELETE FROM reviews
    WHERE review_id = $1
  `;
    const values = [reviewId];
    await client.query(query, values);
}

export {
    createReviews,
    getAllReviews,
    getReviewsByProductId,
    updateReview,
    deleteReview,
}