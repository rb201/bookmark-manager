import { allBookmarks } from "../bookmark/util.js"
import { buildBookmarkElement, sortPinnedBookmarks } from "../bookmark/bookmark.js";
import { renderBookmarks } from "../bookmark/util.js";

const sideMenuNavEl = document.querySelectorAll('.side-menu-item-container')
const curActiveNav = []

sideMenuNavEl.forEach(el => {
    el.addEventListener('click', e => sideMenuNavHandler(e))

    if (el.classList.contains("isActive")) curActiveNav.push(el)
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

    curActiveNav.pop().classList.remove("isActive")
    e.currentTarget.classList.add("isActive")
    curActiveNav.push(e.currentTarget)
}

function homeNavHandler() {
    let sortedData = sortPinnedBookmarks(allBookmarks)

    buildAndRender(sortedData)
}

function archiveNavHandler() {
    let archivedBookmarks = allBookmarks.filter(bookmark => bookmark.isArchived)

    buildAndRender(archivedBookmarks, "Archived")
}

function trashNavHandler() {
    let trashedBookmarks = allBookmarks.filter(bookmark => bookmark.toDelete)

    buildAndRender(trashedBookmarks, "Trashed")
}

function buildAndRender(data, bookmarkStatus) {
    let bookmarks = buildBookmarkElement(data, bookmarkStatus)

    renderBookmarks(bookmarks)
}