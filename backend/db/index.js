import { Pool } from 'pg'

const host = $POSTGRES_HOST
const user = $POSTGRES_USER
const userPassword = $POSTGRES_PASSWORD
const port = 5432
const database = $POSTGRES_DB

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