import { allBookmarks } from "../bookmark/util.js"
import { buildBookmarkElement, sortPinnedBookmarks } from "../bookmark/bookmark.js";
import { renderBookmarks } from "../bookmark/util.js";

const sideMenuNavEl = document.querySelectorAll('.side-menu-item-container')

sideMenuNavEl.forEach(el => {
    el.addEventListener('click', e => sideMenuNavHandler(e))
})

function sideMenuNavHandler(e) {
    const nav = e.currentTarget.innerText

    switch (nav){
        case "Home":
            homeNavHandler()
            break

        case "Archive":
            archiveNavHandler()
            break

        case "Trash":
            trashNavHandler()
            break
    }
}

function homeNavHandler() {
    let sortedData = sortPinnedBookmarks(allBookmarks)

    buildAndRender(sortedData)
}

function archiveNavHandler() {
    let archivedBookmarks = allBookmarks.filter(bookmark => bookmark.isArchived)

    buildAndRender(archivedBookmarks)
}

function trashNavHandler() {
    let trashedBookmarks = allBookmarks.filter(bookmark => bookmark.toDelete)

    buildAndRender(trashedBookmarks)
}

function buildAndRender(data) {
    let bookmarks = buildBookmarkElement(data)

    renderBookmarks(bookmarks)
}