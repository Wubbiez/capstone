import pkg from 'pg';

const {Pool} = pkg;
const client = new Pool({
    user: `wubbie`,
    password: `TestDB101!?!`,
    host: `gadgetgalaxy.ccl2wv2rdpbg.us-east-1.rds.amazonaws.com`,
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