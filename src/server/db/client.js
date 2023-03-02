import pkg from 'pg';
const {Pool} = pkg;

const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/cap-stone';

const client = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

export default client;