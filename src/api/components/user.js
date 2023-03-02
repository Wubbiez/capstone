import { createUser, getUser, getUserByUsername } from "../../server/db/components/users.js";
import express from "express";
import jwt from "jsonwebtoken";//
export const { JWT_SECRET } = process.env;//

const userRouter = express.Router();


userRouter.post("/register", async (req, res, next) => {
    const { username, password, email, first_name, last_name, address, phone } = req.body;
    const queriedUser = await getUserByUsername(username);
    const welcomeMessage = "Thanks for joining";
    try {
        const _user = await getUserByUsername(username);
        if (!username || !password) {
            next({
                name: "MissingRequiredInfoError",
                message: "Please fill in all fields",
            });
        }
        if (_user) {
            res.send({
                error: "Error",
                name: "UserExistsError",
                message: `The User ${queriedUser.username} is already taken.`,
            })
        }
        const user = await createUser({ username, password, email, first_name, last_name, address, phone });

        const token = jwt.sign({ id: user.id, username }, "neverTell");

        res.send({ welcomeMessage, token, user })
    } catch ({ name, message }) {
        next({ name, message })
    }
})

userRouter.post("/login", async (req, res, next) => {
    
    const { username, password } = req.body;
    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password",
        });
    }
    try {
        const user = await getUser({ username, password });
        if (!user) {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect",
            });
        } else {
            const token = jwt.sign(
                { id: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: "3w" }
            );
            res.send({ user, message: "You're in there!", token });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

// userRouter.get("/me", async (req, res, next) => {
//     try {
//         if (req.user) {
//             res.send(req.user);
//         } else {
//             res.status(401);
//             next({
//                 error: "You must be logged in to perform this action",
//                 name: "Invalid User",
//                 message: "You must be logged in to perform this action",
//             });
//         }
//     } catch (e) {
//         next(e);
//     }
// });

export default userRouter; 

