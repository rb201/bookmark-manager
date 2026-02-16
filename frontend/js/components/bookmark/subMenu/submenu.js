import { allBookmarks, updateCache, updateBookmarkDB, deleteBookmarkPermanently } from "../util.js"

function bookmarkSubmenuButtonHandler(e) {
    e.currentTarget.nextElementSibling.classList.toggle('subMenuIsOpen')
}

function bookmarkSubmenuOpenHandler(e) {
    e.currentTarget.lastChild.classList.remove('subMenuIsOpen')
}

export function buildSubMenu(data, bookmarkStatus) {
    let subMenuContainer = document.createElement('div')
    subMenuContainer.classList.add('submenu-container')
    subMenuContainer.addEventListener('mouseleave', e => bookmarkSubmenuOpenHandler(e))

    let buttonSubMenu = document.createElement('button')
    buttonSubMenu.classList.add('bookmark-submenu-button')
    buttonSubMenu.type = "button"
    buttonSubMenu.innerText = "⋮"
    buttonSubMenu.addEventListener('click', e => bookmarkSubmenuButtonHandler(e))

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
    updateCache(bookmarkId, "PATCH", {
        isArchived: isArchived,
        isPinned: false
    })
}

// handles trashing and restoring bookmarks
function trashBookmarkHandler(bookmarkId, toDelete) {
    // remove object from current dom
    const curBookmarkToTrashEl = document.querySelector(`#${bookmarkId}`)
    curBookmarkToTrashEl.remove()

    // update db
    updateBookmarkDB(bookmarkId, "PATCH", {isArchived: true, isPinned: false, toDelete: toDelete})

    // update cache
    updateCache(bookmarkId, "PATCH", {
        isArchived: false,
        isPinned: false,
        toDelete: toDelete
    })
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
    updateCache(bookmarkId, "DELETE")
}
