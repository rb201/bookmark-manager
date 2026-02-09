import { allBookmarks } from "../bookmark/util.js"
import { buildBookmarkElement } from "../bookmark/bookmark.js";
import { renderBookmarks, sortPinnedBookmarks } from "../bookmark/util.js";

const sideMenuNavEl = document.querySelectorAll('.side-menu-item-container')

sideMenuNavEl.forEach(el => {
    el.addEventListener('click', e => sideMenuNavHandler(e))
})

function sideMenuNavHandler(e) {
    const nav = e.currentTarget.innerText

    if (nav == "Home") {
        homeNavHandler()
    } else if (nav == "Archive") {
        archiveNavHandler()
    } else if (nav == "Trash") {
        trashNavHandler()
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