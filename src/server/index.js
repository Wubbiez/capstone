import apiRouter from "../api/index.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//admin authorization
export async function is_admin (req, res, next) {
   if (req.user.role === "is_admin") {
    return next();
   }else{
    res.status.json({error: "Sorry But You Can't Do That!"})
   }
};


// Routes
app.use("/api", apiRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || "Internal server error.");
})

// Export
export default app;
