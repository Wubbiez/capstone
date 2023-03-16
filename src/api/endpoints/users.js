import {
    createUser,
    getAllUsers,
    getUser,
    getUserById,
    getUserByUsername,
    updateUser
} from "../../server/db/components/users.js";
import express from "express";
import{config} from "dotenv";
import jwt from "jsonwebtoken";
import {isAdmin} from "./isAdmin.js";

config();//
const { JWT_SECRET } = process.env;//

const userRouter = express.Router();


userRouter.post("/register", async (req, res, next) => {
    try {
        const { username, password, email, first_name, last_name, address, phone } = req.body;

        const queriedUser = await getUserByUsername(username);

        if (queriedUser) {
            res.status(401);
            next({
                error: "Error",
                name: "UserExistsError",
                message: `User ${queriedUser.username} is already taken.`,
            });
        } else if (password.length < 8) {
            res.status(401);
            next({
                error: "Error",
                name: "PasswordLengthError",
                message: "Password Too Short!",
            });
        } else {
            const user = await createUser({
                username,
                password,
                email,
                first_name,
                last_name,
                address,
                phone
            });
            if (!user) {
                next({
                    name: "UserCreationError",
                    message: "There was a problem registering you. Please try again.",
                });
            } else {
                const token = jwt.sign(
                    { user_id: user.user_id, username: user.username, is_admin: user.is_admin },
                    JWT_SECRET,
                    { expiresIn: "1w" }
                );
                res.send({ user, message: "you're signed up!", token });
            }
        }
    } catch ({ error, name, message }) {
        next({ error, name, message });
    }
});

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
                { user_id: user.user_id, username: user.username, is_admin: user.is_admin },
                JWT_SECRET,
                { expiresIn: "1w" }
            );
            res.send({ user, message: "you're logged in!", token });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

userRouter.get("/me", async (req, res, next) => {
    try {
        if (req.user) {
            res.send(req.user);
        } else {
            res.status(401);
            next({
                error: "You must be logged in to perform this action",
                name: "Invalid User",
                message: "You must be logged in to perform this action",
            });
        }
    } catch (e) {
        next(e);
    }
});

userRouter.get("/logout", async (req, res, next) => {
    try {
        res.send({ message: "You're logged out!" });
    } catch (e) {
        next(e);
    }
})

userRouter.get("/:username", async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await getUserByUsername(username);
        if (user) {
            res.send(user);
        } else {
            res.status(404);
            next({
                error: "User not found",
                name: "UserNotFoundError",
                message: "User not found",
            });
        }
    } catch (e) {
        next(e);
    }
})

userRouter.patch("/:user_id", isAdmin, async (req, res, next) => {
// update user
    try{
        const {user_id} = req.params;
        const {username, email, first_name, last_name, address, phone, is_admin, is_active, password} = req.body;
        const updatedUser = await updateUser({user_id, username, email, first_name, last_name, address, phone, is_admin, is_active, password});
        if(updateUser){
            res.send(updateUser);
        }
        else{
            res.status(404);
            next({
                error: "User not found",
                name: "UserNotFoundError",
                message: "User not found",
            });
        }
    } catch (e) {
        next(e);
    }

})

userRouter.get("/", isAdmin, async (req, res, next) => {
    try {
        const users = await getAllUsers();
        console.log(users)
        res.send(users);
    } catch (e) {
        next(e);
    }
})



export default userRouter; 