const sectionBookmarksEl = document.querySelector('.section-bookmarks')

export let allBookmarks = [];
export let bookmarksCount = 0

export async function loadBookmarks() {
    const res = await fetch('http://localhost:3001/bookmarks')

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

export function updateCache(bookmarkId, updateType, bookmarkData) {
    switch (updateType) {
        case "PATCH": {
            let cachedBookmark = allBookmarks.find(bookmark => bookmark.id == bookmarkId)

            if (cachedBookmark){
                Object.assign(cachedBookmark, {...bookmarkData})
                break
            }
        }
        case "DELETE": {
            let updatedCache = allBookmarks.filter(bookmark => bookmark.id !== bookmarkId)
            allBookmarks = updatedCache
            break
        }
    }
}

export async function deleteBookmarkPermanently(bookmarkId) {
    try {
        const res = await fetch(`http://localhost:3001/bookmarks/${bookmarkId}`, {
            method: "DELETE",
        })
        console.log('deleting')

        if (!res.ok) throw new Error(`HTTP error. status: ${res.status}`)
    } catch (err) {
        console.log(`There was a problem: ${err}`)
    }
}

export async function updateBookmarkDB(bookmarkId, method, body) {
    try {
        const res = await fetch(`http://localhost:3001/bookmarks/${bookmarkId}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) throw new Error(`HTTP error. status: ${res.status}`)

    } catch (err) {
        console.log(`There was a problem: ${err}`)
    }
}