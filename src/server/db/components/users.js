import client from "../client.js";
export const bcrypt = require("bcrypt");
export const SALT_COUNT = 10;

async function createUser({ username, password, email }) {

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const { 
            rows: [user]
        } = await client.query(`
            INSERT INTO users(username,password,email)
            VALUES($1,$2,$3)
            ON CONFLICT (username, email) DO NOTHING
            RETURNING id, username, email;
        `, [username, hashedPassword]);
            if (user) {
                delete user.password;
                return user;          
                }else {
                    console.error("username already exists!!")
                }

    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function getUser ({ username, password }) {
    try {
        const user = await getUserByUsername(username);
        const hashedPassword = user.password;
        const passCheck = await bcrypt.compare(password, hashedPassword);
        if (passCheck) {
            const {
                rows: [user],
            } = await client.query(`

            SELECT id, username FROM users
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
        
        SELECT id, username, password FROM users
        WHERE username = $1;
        `, [username]);
        return user;

    }catch(e) {
        console.error(e);
        throw e;
    }
}

// async function getUserById(userId) {
//     try {
//         const { rows: [user] } = await client.query(`
//         SELECT id,username FROM users
//         WHERE id=$1
//             `, [userId])
//         return user;

//     } catch (e) {
//         console.error(e);
//         throw e;
//     }
// }

export {
 createUser,
 getUser,
 getUserByUsername,
}