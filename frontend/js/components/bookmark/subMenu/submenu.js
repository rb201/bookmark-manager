import { allBookmarks } from "../util.js"

export function bookmarkSubmenuHandler(e) {
    e.currentTarget.nextElementSibling.classList.toggle('subMenuIsOpen')
}

export async function archiveBookmarkHandler(bookmarkId) {
    // remove object from current dom
    const curBookmarkToArchiveEl = document.querySelector(`#${bookmarkId}`)
    curBookmarkToArchiveEl.remove()

    // update db
    updateBookmarkDB(bookmarkId, "PATCH", {isArchived: true, isPinned: false})

    // update cache
    for (let bookmark of allBookmarks) {
        if (bookmark.id == bookmarkId) {
            bookmark.isArchived = true
            bookmark.isPinned = false
            break
        }
    }
}

export async function trashBookmarkHandler(bookmarkId) {
    // remove object from current dom
    const curBookmarkToTrashEl = document.querySelector(`#${bookmarkId}`)
    curBookmarkToTrashEl.remove()

    // update db
    updateBookmarkDB(bookmarkId, "PATCH", {isArchived: true, isPinned: false, toDelete: true})

    // update cache
    for (let bookmark of allBookmarks) {
        if (bookmark.id == bookmarkId) {
            bookmark.isArchived = false
            bookmark.isPinned = false
            bookmark.toDelete = true
            break
        }
    }
}

async function emptyTrash() {
    let toBeDeletedBookmarks = allBookmarks.filter(bookmark => bookmark.toDelete)

    for (let bookmark of toBeDeletedBookmarks){
        try {
            const res = await fetch(`http://localhost:3000/data/${bookmark.id}`, {
                method: "DELETE",
            })

            if (!res.ok) throw new Error(`HTTP error. status: ${res.status}`)
        } catch (err) {
            console.log(`There was a problem: ${err}`)
        }
    }
}

export async function updateBookmarkDB(bookmarkId, method, body) {
    try {
        const res = await fetch(`http://localhost:3000/data/${bookmarkId}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) throw new Error(`HTTP error. status: ${res.status}`)

    } catch (err) {
        console.log(`There was a problem: ${err}`)
    }
}