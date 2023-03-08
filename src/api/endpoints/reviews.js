// import { createReviews } from "../server/db/endpoints/reviews";
// import { getProductById } from "../server/db/endpoints/products";
// import express from "express";

// const reviewRouter = express.Router();

// //get all reviews for product
// reviewRouter.post ("/products/:product_id/reviews", async (req,res) => {
//     const product_id = req.params.product_id;
//     const reviews = await reviewRouter.find({ product_id: product_id });
//     res.json(reviews);
// });

// //add new review to product
// reviewRouter.post("/products/:product_id/reviews", async (req,res) => {
//     const product_id = req.params.product_id;
//     const { title, content, rating, username, date_created } = req.body;
    
//     const review = new review ({
//         product_id,
//         title,
//         content,
//         rating,
//         username,
//         date_created,
//     });
//     await review.save();
//     res.json(review);
// });

// //delete review by id
// reviewRouter.delete("/reviews/:id", async (res,req) => {
//     const review_id = req.params.review_id;
//     await review.findByIdAndDelete(review_id);
//     res.sendStatus(204);
// });


// export default reviewRouter;