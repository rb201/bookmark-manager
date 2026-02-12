import { allBookmarks } from "../util.js"

function bookmarkSubmenuHandler(e) {
    e.currentTarget.nextElementSibling.classList.toggle('subMenuIsOpen')
}

export function buildSubMenu(data, bookmarkStatus) {
    let subMenuContainer = document.createElement('div')
    subMenuContainer.classList.add('submenu-container')

    let buttonSubMenu = document.createElement('button')
    buttonSubMenu.classList.add('bookmark-submenu-button')
    buttonSubMenu.type = "button"
    buttonSubMenu.innerText = "⋮"
    buttonSubMenu.addEventListener('click', e => bookmarkSubmenuHandler(e))

    let subMenu = document.createElement('ul')
    subMenu.classList.add('bookmark-submenu')

    let bookmarkEdit = document.createElement('li')
    bookmarkEdit.classList.add("submenu-edit")
    bookmarkEdit.innerText = 'Edit'

    switch (bookmarkStatus) {
        case "Archived": {
            let bookmarkArchive = document.createElement('li')
            bookmarkArchive.classList.add("submenu-unarchive")
            bookmarkArchive.innerText = "Unarchive"
            bookmarkArchive.addEventListener('click', () => archiveBookmarkHandler(data.id, false))

            let bookmarkTrash = document.createElement('li')
            bookmarkTrash.classList.add("submenu-trash")
            bookmarkTrash.innerText = 'Trash'
            bookmarkTrash.addEventListener('click', () => trashBookmarkHandler(data.id, true))

            subMenu.append(bookmarkEdit, bookmarkArchive, bookmarkTrash)
            break
        }

        case "Trashed": {
            let bookmarkArchive = document.createElement('li')
            bookmarkArchive.classList.add("submenu-archive")
            bookmarkArchive.innerText = "Archive"
            bookmarkArchive.addEventListener('click', () => archiveBookmarkHandler(data.id, true))

            let bookmarkRestore = document.createElement('li')
            bookmarkRestore.classList.add("submenu-restore")
            bookmarkRestore.innerText = 'Restore'
            bookmarkRestore.addEventListener('click', () => trashBookmarkHandler(data.id, false))

            let bookmarkDelete = document.createElement('li')
            bookmarkDelete.classList.add("submenu-delete")
            bookmarkDelete.innerText = 'Delete'
            bookmarkDelete.addEventListener('click', () => deleteBookmarkHandler(data.id))

            subMenu.append(bookmarkEdit, bookmarkArchive, bookmarkRestore, bookmarkDelete)
            break
        }

        default: {
            let bookmarkArchive = document.createElement('li')
            bookmarkArchive.classList.add("submenu-archive")
            bookmarkArchive.innerText = "Archive"
            bookmarkArchive.addEventListener('click', () => archiveBookmarkHandler(data.id, true))

            let bookmarkTrash = document.createElement('li')
            bookmarkTrash.classList.add("submenu-trash")
            bookmarkTrash.innerText = 'Trash'
            bookmarkTrash.addEventListener('click', () => trashBookmarkHandler(data.id, true))

            subMenu.append(bookmarkEdit, bookmarkArchive, bookmarkTrash)
            break
        }
    }

    subMenuContainer.append(buttonSubMenu, subMenu)

    return subMenuContainer
}

// handles archiving and unarchiving
function archiveBookmarkHandler(bookmarkId, isArchived) {
    // remove object from current dom
    const curBookmarkToArchiveEl = document.querySelector(`#${bookmarkId}`)
    curBookmarkToArchiveEl.remove()

    // update db
    updateBookmarkDB(bookmarkId, "PATCH", {isArchived: isArchived, isPinned: false})

    // update cache
    for (let bookmark of allBookmarks) {
        if (bookmark.id == bookmarkId) {
            bookmark.isArchived = isArchived
            bookmark.isPinned = false
            break
        }
    }
}

// handles trashing and restoring bookmarks
function trashBookmarkHandler(bookmarkId, toDelete) {
    // remove object from current dom
    const curBookmarkToTrashEl = document.querySelector(`#${bookmarkId}`)
    curBookmarkToTrashEl.remove()

    // update db
    updateBookmarkDB(bookmarkId, "PATCH", {isArchived: true, isPinned: false, toDelete: toDelete})

    // update cache
    for (let bookmark of allBookmarks) {
        if (bookmark.id == bookmarkId) {
            bookmark.isArchived = false
            bookmark.isPinned = false
            bookmark.toDelete = toDelete
            break
        }
    }
}

function emptyTrash() {
    let toBeDeletedBookmarks = allBookmarks.filter(bookmark => bookmark.toDelete)

    for (let bookmark of toBeDeletedBookmarks){
        deleteBookmarkHandler(bookmark.id)
    }
}

function deleteBookmarkHandler(bookmarkId) {
     // remove object from current dom
    const curBookmarkToDeleteEl = document.querySelector(`#${bookmarkId}`)
    curBookmarkToDeleteEl.remove()

    // update db
    deleteBookmarkPermanently(bookmarkId)

    // update cache
    // for (let bookmark of allBookmarks) {
    //     if (bookmark.id == bookmarkId) {
    //         bookmark.isArchived = false
    //         bookmark.isPinned = false
    //         break
    //     }
    // }
}

async function deleteBookmarkPermanently(bookmarkId) {
    try {
        const res = await fetch(`http://localhost:3000/data/${bookmarkId}`, {
            method: "DELETE",
        })

        if (!res.ok) throw new Error(`HTTP error. status: ${res.status}`)
    } catch (err) {
        console.log(`There was a problem: ${err}`)
    }

}

async function updateBookmarkDB(bookmarkId, method, body) {
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