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
    const nonArchivedData = data.filter(bookmark => !bookmark.isArchived)

    const pinnedBookmark = nonArchivedData.filter(bookmark => bookmark.isPinned && !bookmark.isArchived)
    const unpinnedBookmark = nonArchivedData.filter(bookmark => !bookmark.isPinned && !bookmark.isArchived)

    let sortedBookmarks = pinnedBookmark.concat(unpinnedBookmark)

    return sortedBookmarks
}
