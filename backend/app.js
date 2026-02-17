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
    const toDelete = req.body.to_delete

    console.log("patching bookmark")

    const dbRes = await query(
        `UPDATE bookmarks
        SET is_pinned = $1, is_archived = $2, to_delete = $3
        WHERE bookmarkId = $4`, [isPinned, isArchived, toDelete, bookmarkId] 
    )
    console.log(dbRes)
    res.sendStatus(200)
})

app.post("/bookmarks/:bookmarkId", async (req, res) => {
    const bookmarkId = req.params.bookmarkId
    const title = req.body.title
    const url = req.body.url
    const desc = req.body.desc
    const tags = req.body.listOfTags
    const dateAdded = req.body.today
    const lastVisited = req.body.lastVisited
    const viewCount = req.body.viewCount
    const isPinned = req.body.isPinned
    const isArchived = req.body.isArchived
    const imageUrl = req.body.imageUrl
    const toDelete = req.body.toDelete

    const dbres = await query(
        `INSERT INTO bookmarks (
        id, title, url, description, tags, date_added, last_visited, view_count, is_pinned, is_archived, img_url, to_delete
        ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [bookmarkId, title, url, desc, tags, dateAdded, lastVisited, viewCount, isPinned, isArchived, imageUrl, toDelete]
    )

    console.log("putting bookarm into db")
    res.sendStatus(200).send('written to db')
})

app.listen(port, () => {
    console.log(`listeneing on ${port}`)
})