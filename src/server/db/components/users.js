import client from "../client.js";
import  bcrypt from "bcrypt";
export const SALT_COUNT = 10;

async function createUser({ username, password, email, first_name, last_name, address, phone, is_admin }) {

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const { 
            rows: [user]
        } = await client.query(`
            INSERT INTO users(username,password,email,first_name,last_name,address,phone,is_admin)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            ON CONFLICT (username) DO NOTHING
            RETURNING user_id, username, email;
        `, [username, hashedPassword, email, first_name, last_name, address, phone,is_admin]);
            if (user) {
                delete user.password;
                return user;          
                }else {
                    console.error("Username already exists!")
                }

    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function getUser({ username, password }) {
    try {
        const user = await getUserByUsername(username);
        const hashedPassword = user.password;
        const passCheck = await bcrypt.compare(password, hashedPassword);
        if (passCheck) {
            const {
                rows: [user],
            } = await client.query(`
            SELECT user_id, username,is_admin FROM users
            WHERE username = $1
            AND password = $2
            `, [ username, hashedPassword ]);

            delete user.password;
            return user;
        } else {
            return null;
        }

    }catch (e) {
        console.error(e);
        throw e;
    }
}


async function getUserByUsername(username) {
    try {
        const {rows: [user] } = await client.query (`
        
        SELECT user_id, username, password FROM users
        WHERE username = $1;
        `, [username]);
        return user;

    }catch(e) {
        console.error(e);
        throw e;
    }
}



async function getUserById(userId) {
    try {
        const {
            rows: [user],
        } = await client.query(`
            SELECT user_id, username, email, is_admin, first_name, last_name, address, phone FROM users
            WHERE user_id = $1;
        `, [userId]);
        return user;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function updateUser({user_id, username, email, first_name, last_name, address, phone, is_admin, is_active, password}) {
    try {
        const {rows: [user]} = await client.query(`
            UPDATE users
            SET username = $1, email = $2, first_name = $3, last_name = $4, address = $5, phone = $6, is_admin = $7, is_active = $8, password = $9
            WHERE user_id = $10
            RETURNING user_id, username, email, is_admin, first_name, last_name, address, phone, is_active, password;
        `, [username, email, first_name, last_name, address, phone, is_admin, is_active, password, user_id]);
        return user;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function getAllUsers() {
    try {
        const {rows: users} = await client.query(`
            SELECT user_id, username, email, is_admin, first_name, last_name, address, phone, is_active, password FROM users;
        `);
        return users;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export {
 createUser,
 getUser,
 getUserByUsername,
 bcrypt,
    getUserById,
    updateUser,
    getAllUsers
}