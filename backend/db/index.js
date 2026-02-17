import { Pool } from 'pg'

const host = process.env.POSTGRES_HOST
const user = process.env.POSTGRES_USER
const userPassword = process.env.POSTGRES_PASSWORD
const port = 5432
const database = process.env.POSTGRES_DB

const pool = new Pool({
    host: host,
    user: user,
    password: userPassword,
    port: port,
    database: database
})

export const query = (text, param) => {
    return pool.query(text, param)
}