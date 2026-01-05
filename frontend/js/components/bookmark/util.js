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

export function renderBookmarks(data) {
    sectionBookmarksEl.innerHTML = ''

    const fragement = document.createDocumentFragment()
    
    data.forEach(bookmark => {
        fragement.append(bookmark)
    })

    sectionBookmarksEl.append(fragement)
}