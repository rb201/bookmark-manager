const sectionBookmarksEl = document.querySelector('.section-bookmarks')

export let allBookmarks = [];
export let bookmarksCount = 0

export async function loadBookmarks() {
    const res = await fetch('http://localhost:3000/data')

    if(!res.ok) throw new Error(`Error: ${res.status}`)

    const data = await res.json()
    
    // in-memory cache
    allBookmarks = data
    bookmarksCount = data.length

    return data
}

export function renderOneBookmark(data){
    const fragement = document.createDocumentFragment()

    fragement.append(bookmark)

    sectionBookmarksEl.append(fragement)
}

export function renderBookmarks(data) {
    sectionBookmarksEl.innerHTML = ''

    const fragement = document.createDocumentFragment()
    
    data.forEach(bookmark => {
        fragement.append(bookmark)
    })

    sectionBookmarksEl.append(fragement)
}

export function formateDateForPresentation(date) {
    let specDate = new Date(date)

    let day = specDate.getDate()
    let monthShortText = specDate.toLocaleString('default', {month: 'short'})
    let year = String(specDate.getFullYear()).slice(-2)

    let strDate = `${day} ${monthShortText} ${year}`
    return strDate
}

export function sortPinnedBookmarks(data) {
    const nonArchivedData = data.filter(bookmark => !bookmark.isArchived && !bookmark.toDelete)

    const pinnedBookmark = nonArchivedData.filter(bookmark => bookmark.isPinned && !bookmark.isArchived && !bookmark.toDelete)
    const unpinnedBookmark = nonArchivedData.filter(bookmark => !bookmark.isPinned && !bookmark.isArchived && !bookmark.toDelete)

    let sortedBookmarks = pinnedBookmark.concat(unpinnedBookmark)

    return sortedBookmarks
}

export function pinBookmarkHandler(bookmarkId) {
    const bookmarkEl = document.querySelector(`#${bookmarkId}`)
    const pinImgEl = bookmarkEl.querySelector(".bookmark-pin-button")

    let pinState

    // toggle pin state
    if (pinImgEl.src.includes("inactive")) {
        pinImgEl.src = "js/images/thumbtack-active.svg"
        pinState = true
    } else {
        pinImgEl.src = "js/images/thumbtack-inactive.svg"
        pinState = false
    }

    // update cache
    for (let bookmark of allBookmarks) {
        if (bookmark.id == bookmarkId) {
            bookmark.isPinned = pinState
            break
        }
    }

    // write to db
    updatePinState(bookmarkId, pinState)
}

async function updatePinState(bookmarkId, pinState) {
    console.trace("update happened")
    try {
        const res = await fetch(`http://localhost:3000/data/${bookmarkId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isPinned: pinState})
        })

        if (!res.ok) throw new Error(`HTTP error. status: ${res.status}`)
    } catch (err) {
        console.log(err)
    }
}