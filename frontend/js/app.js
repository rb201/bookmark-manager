import "./components/search/search.js";
import "./components/addBookmarkForm/form.js"
import "./components/sideMenu/sideMenu.js"
import { buildBookmarkElement } from "./components/bookmark/bookmark.js";
import { loadBookmarks, renderBookmarks, sortPinnedBookmarks } from "./components/bookmark/util.js";


async function entrypoint() {
    let data = await loadBookmarks()

    let sortedData = sortPinnedBookmarks(data)

    let bookmarks = buildBookmarkElement(sortedData)

    renderBookmarks(bookmarks)
}

entrypoint()