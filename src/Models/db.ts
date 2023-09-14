import {Client} from 'pg';

export const client = new Client({
    user: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 3000,
    database: process.env.POSTGRES_DB
})


