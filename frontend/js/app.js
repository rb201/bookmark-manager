import "./components/search/search.js";
import "./components/addBookmarkForm/form.js"
import { buildBookmarkElement } from "./components/bookmark/bookmark.js";
import { loadBookmarks, renderBookmarks } from "./components/bookmark/util.js";

function bookmarkSubmenuHandler() {}

async function entrypoint() {
    let data = await loadBookmarks()

    let bookmarks = buildBookmarkElement(data)

    renderBookmarks(bookmarks)
}

entrypoint()