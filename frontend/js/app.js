import "./components/search/search.js";
import "./components/addBookmarkForm/form.js"
import "./components/sideMenu/sideMenu.js"
import "./components/main/header/sort.js"
import { buildBookmarkElement, sortPinnedBookmarks } from "./components/bookmark/bookmark.js";
import { loadBookmarks, renderBookmarks } from "./components/bookmark/util.js";


async function entrypoint() {
    let data = await loadBookmarks()

    let sortedData = sortPinnedBookmarks(data)

    let bookmarks = buildBookmarkElement(sortedData)

    renderBookmarks(bookmarks)
}

entrypoint()