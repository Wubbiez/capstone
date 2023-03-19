import express from "express";
import {createReviews, deleteReview, getReviewsByProductId} from "../../server/db/components/reviews.js"
import {isAdmin} from "./isAdmin.js";
import {getAverageProductRating} from "../../server/db/components/products.js";

const reviewRouter = express.Router();

//get all reviews for product
reviewRouter.get("/:product_id", async (req, res) => {
    const product_id = req.params.product_id;
    const reviews = await getReviewsByProductId(product_id);
    res.json(reviews);

});

reviewRouter.get("/:product_id/rating", async (req, res) => {
    const product_id = req.params.product_id;
    const rating = await getAverageProductRating(product_id);
    res.json(rating);
})

//add new review to product
reviewRouter.post("/:product_id", async (req, res) => {
    const product_id = req.params.product_id;
    const {title, content, rating, user} = req.body;
    console.log(title, content, rating, user, product_id);
    const review = await createReviews({user, product_id, title, content, rating});
    res.json(review);
});

//delete review by id
reviewRouter.delete("/:review_id", isAdmin, async (req, res, next) => {
    console.log(req)

    const review_id = req.params.review_id;
    const review = await deleteReview(review_id);
    console.log(review)
    res.json(review);
});


export default reviewRouter;