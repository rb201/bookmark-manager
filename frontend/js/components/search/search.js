import { buildBookmarkElement } from "../bookmark/bookmark.js"
import { allBookmarks, renderBookmarks } from "../bookmark/util.js"

const searchInput = document.querySelector('.search')
searchInput.addEventListener('input', e => searchBookmarkHandler(e))

function searchBookmarkHandler(e) {
    let searchText = e.currentTarget.value.toLowerCase()
    let filteredBookmark = []

    for (let bookmark of allBookmarks) {
        let bookmarkTitle = bookmark
            .title
            .toLowerCase()

        if (bookmarkTitle.includes(searchText)) {
            filteredBookmark.push(bookmark)
        }
    }

    let bookmarkEls = buildBookmarkElement(filteredBookmark)

    renderBookmarks(bookmarkEls)
}
