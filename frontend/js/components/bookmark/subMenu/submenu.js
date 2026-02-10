import { allBookmarks } from "../util.js"

export function bookmarkSubmenuHandler(e) {
    e.currentTarget.nextElementSibling.classList.toggle('subMenuIsOpen')
}

export async function archiveBookmarkHandler(bookmarkId) {
    // update cache
    for (let bookmark of allBookmarks) {
        if (bookmark.id == bookmarkId) {
            bookmark.isArchived = true
            break
        }
    }

    // remove object from current dom

    // update db
    try {
        const res = await fetch(`http://localhost:3000/data/${bookmarkId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    isArchived: true,
                    isPinned: false
                }
            )
        })

        if (!res.ok) throw new Error(`HTTP error. status: ${res.status}`)

    } catch (err) {
        console.log(`There was a problem: ${err}`)
    }
}

export async function trashBookmarkHandler(bookmarkId) {
    try {
        const res = await fetch(`http://localhost:3000/data/${bookmarkId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    isPinned: false,
                    isArchived: false,
                    toDelete: true
                }
            )
        })

        if (!res.ok) throw new Error(`HTTP error. status: ${res.status}`)
    } catch (err) {
        console.log(`There was a problem: ${err}`)
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