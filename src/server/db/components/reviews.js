import client from "../client.js";

async function createReviews({ username, product_id, title, content, rating, date_created }) {
    try {
        const { rows: [reviews] } = await client.query(`
            INSERT INTO reviews(username, product_id, title, content, rating, date_created)
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *;
        `, [username, product_id, title, content, rating, date_created]);
        return reviews;
    } catch (error) {
        throw error;
    }
}





export {
    createReviews,

}