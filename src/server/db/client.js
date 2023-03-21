import pkg from 'pg';

const {Pool} = pkg;
const client = new Pool({
    user: `${process.env.DATABASE_USER}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    host: `${process.env.HOST}`,
    database: 'postgres',
    port: 5432,
    ssl: false, // set to true if you are using SSL
});
// const connectionString = process.env.DATABASE_URL || `https://localhost:5432/capstone`;
//
// const client = new Pool({
//     connectionString,
//     ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : undefined,
// });

export default client;