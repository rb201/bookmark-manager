import { allBookmarks } from "../bookmark/util.js"
import { buildBookmarkElement } from "../bookmark/bookmark.js";
import { renderBookmarks } from "../bookmark/util.js";

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
    buildAndRender(allBookmarks)
}

function archiveNavHandler() {
    let archivedBookmarks = []

    for (let bookmark of allBookmarks) {
        if (bookmark.isArchived === true) {
            archivedBookmarks.push(bookmark)
        }
    }

    buildAndRender(archivedBookmarks)
}

function trashNavHandler() {

}

function buildAndRender(data) {
    let bookmarks = buildBookmarkElement(data)

    renderBookmarks(bookmarks)
}