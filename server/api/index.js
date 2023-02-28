const express = require("express");
const apiRouter = express.Router();
const {getAllProducts} = require("/server/api/fakestoreAPI.js");

apiRouter.get("/products", async (req, res, next) => {
    res.send (getAllProducts());
})

export default apiRouter;