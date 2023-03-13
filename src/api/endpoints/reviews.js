import { createReviews,
    getAllReviews,
    getReviewsByProductId,
    updateReview,
    deleteReview,  } from "../../server/db/components/reviews";

import express from "express";
const { pool } = require('./db');
const reviewRouter = express.Router();


// Create a new review
reviewRouter.post('/', async (req, res) => {
    const { username, productId, title, content, rating } = req.body;
    try {
        const result = await createReviews(pool, { username, productId, title, content, rating });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating review');
    }
});

// Retrieve all reviews
reviewRouter.get('/', async (req, res) => {
    try {
        const result = await getAllReviews(pool);
        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error retrieving reviews');
    }
});

// Retrieve reviews for a given product ID
reviewRouter.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const result = await getReviewsByProductId(pool, productId);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving reviews');
    }
});

// Update an existing review
reviewRouter.put('/:reviewId', async (req, res) => {
    const reviewId = req.params.reviewId;
    const { title, content, rating } = req.body;
    try {
        const result = await updateReview(pool, { reviewId, title, content, rating });
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating review');
    }
});

// Delete an existing review
reviewRouter.delete('/:reviewId', async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        await deleteReview(pool, reviewId);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting review');
    }
});


export default reviewRouter;