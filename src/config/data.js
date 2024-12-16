import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT} = process.env


export const db = knex({
    client: 'pg',
    connection: {
        host: PGHOST,
        port: PGPORT ? parseInt(PGPORT, 10) : undefined,
        user: PGUSER,
        database: PGDATABASE,
        password: PGPASSWORD,
        ssl: { rejectUnauthorized: false },
    }
})


// CREATE TABLE ynetheadlines (
//     id SERIAL PRIMARY KEY,
//         headline TEXT NOT NULL,
//             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
//             )