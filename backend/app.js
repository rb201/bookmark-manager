import express from 'express';
import cors from 'cors';
import { query } from './db/index.js';

const app = express()
app.use(express.json())
app.use(cors()) // tmp
// const allowedOrigins = ['http://localhost:3001'];
// app.use(cors({
//   origin: allowedOrigins
// }));

const port = 3001

app.get("/", (req, res) => {
    res.send("hello from backend")
})

app.delete("/bookmarks/:bookmarkId", async (req, res) => {
    const bookmarkId = req.params.bookmarkId

    await query('DELETE FROM bookmarks WHERE id = $1', [bookmarkId])

    console.log('deleted bookmark', bookmarkId)
    res.sendStatus(204)
})

app.get("/bookmarks", async (req, res) => {
    const result = await query('SELECT * from bookmarks')
    res.send(result.rows)
})

app.patch("/bookmarks/:bookmarkId", async (req, res) => {
    const bookmarkId = req.params.bookmarkId
    const isArchived = req.body.is_archived
    const isPinned = req.body.is_pinned
    const toDelete = false

    console.log("patching bookmark")

    if("to_delete" in req.body) {
        toDelete = req.body.to_delete
    }

    const dbRes = await query(
        `UPDATE bookmarks
        SET is_pinned = $1, is_archived = $2, to_delete = $3
        WHERE bookmarkId = $4`, [isPinned, isArchived, toDelete, bookmarkId] 
    )
    console.log(dbRes)
    res.sendStatus(200)
})

app.post("/bookmarks/:bookmarkId", (req, res) => {
    res.send("putting bookarm into db")
})

app.listen(port, () => {
    console.log(`listeneing on ${port}`)
})