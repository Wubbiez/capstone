import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env;
export const isAdmin = (req, res, next) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const isAdmin = decodedToken.is_admin;


    if (!isAdmin) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    next();
};