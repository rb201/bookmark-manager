const express = require('express')
const app = express()
const port = 3001

app.get("/", (req, res) => {
    res.send("hello from backend")
})

app.delete("/bookmarks/:bookmarkId", (req, res) => {
    res.send("deleted bookmark")
})

app.get("/bookmarks/:bookmarkId", (req, res) => {
    res.send('bookmarks')
})

app.patch("/bookmarks/:bookmarkId", (req, res) => {
    res.send("patching bookmark")
})

app.post("/bookmarks/:bookmarkId", (req, res) => {
    res.send("putting bookarm into db")
})

app.listen(port, () => {
    console.log(`listeneing on ${port}`)
})