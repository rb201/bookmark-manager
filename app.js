const sectionBookmarksEl = document.querySelector('.section-bookmarks')

let allBookmarks;

const addBookmarkButton = document.querySelector('.button-bookmark')
addBookmarkButton.addEventListener('click', addBookmarkButtonHandler)

const searchInput = document.querySelector('.search')
searchInput.addEventListener('click', (e) => e.currentTarget.value = '')
searchInput.addEventListener('input', e => searchBookmarkHandler(e))

function addBookmarkButtonHandler() {}

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

function bookmarkSubmenuHandler() {}

async function entrypoint() {
    let data = await loadBookmarks()

    let bookmarks = buildBookmarkElement(data)

    renderBookmarks(bookmarks)
}

async function loadBookmarks() {
    const res = await fetch('http://localhost:3000/data')

    if(!res.ok) throw new Error(`Error: ${res.status}`)

    const data = await res.json()
    
    // in-memory cache
    allBookmarks = data

    return data
}

// Create <div class="bookmark-top">
function buildBookmarkTopSection(data) {
    let bookmarkTopEl = document.createElement('div')
    bookmarkTopEl.classList.add('bookmark-top')

    // Nested in bookmark-top
    let bookmarkInfoEl = document.createElement('div')
    bookmarkInfoEl.classList.add('bookmark-info')
    
    // Nested in bookmark-info
    let imgEl = document.createElement('img')
    imgEl.classList.add("bookmark-icon")
    imgEl.src = data.imgUrl
    
    // Nested in bookmark-info
    let newDivInBookmarkTopEl = document.createElement('div')
    let titleEl = document.createElement('p')
    titleEl.classList.add("bookmark-title")
    titleEl.innerText = data.title
    
    let urlEl = document.createElement('p')
    urlEl.classList.add("bookmark-url")
    urlEl.innerText = data.url
    
    newDivInBookmarkTopEl.append(titleEl, urlEl)
    bookmarkInfoEl.append(imgEl, newDivInBookmarkTopEl)

    let newButtonSubMenu = document.createElement('button')
    newButtonSubMenu.classList.add('bookmark-submenu')
    newButtonSubMenu.type = "button"
    newButtonSubMenu.innerText = "⋮"
    
    bookmarkTopEl.append(bookmarkInfoEl, newButtonSubMenu)
    
    return bookmarkTopEl
}

// Create the <div class="bookmark-middle"> element
function buildBookmarkMiddleSection(data) {
    let bookmarkMiddleSectionEl = document.createElement('div')
    bookmarkMiddleSectionEl.classList.add('bookmark-middle')

    let bookmarkDescEl = document.createElement('p')
    bookmarkDescEl.classList.add('bookmark-description')
    bookmarkDescEl.innerText = data.description

    let bookmarkTagsEl = document.createElement('div')
    bookmarkTagsEl.classList.add('bookmark-tags')

    for (let tag of data.tags) {
        let bookmarkTagEl = document.createElement('p')
        bookmarkTagEl.classList.add('bookmark-tag')
        bookmarkTagEl.innerText = tag

        bookmarkTagsEl.append(bookmarkTagEl)
    }

    bookmarkMiddleSectionEl.append(bookmarkDescEl, bookmarkTagsEl)

    return bookmarkMiddleSectionEl
}

function buildBookmarkBottomSection(data) {
    let bookmarkEndEl = document.createElement('div')
    bookmarkEndEl.classList.add('bookmark-end')

    let viewEl = document.createElement('p')
    viewEl.classList.add('bookmark-view-count')
    viewEl.innerText = data.viewCount

    let lastVisitEl = document.createElement('p')
    lastVisitEl.classList.add('bookmark-last-visit')
    lastVisitEl.innerText = data.lastVisited.split('T')[0]

    let bookmarkDateAddEl = document.createElement('p')
    bookmarkDateAddEl.classList.add('bookmark-date-added')
    // bookmarkDateAddEl.innerText = data.dateAdded.split('T')[0]

    let pinButtonEl = document.createElement('p')
    pinButtonEl.classList.add('bookmark-pin-button')
    pinButtonEl.innerText = data.isPinned

    bookmarkEndEl.append(viewEl, lastVisitEl, bookmarkDateAddEl, pinButtonEl)

    return bookmarkEndEl
}

// Create the <div class="bookmark"> element
function buildBookmarkElement(data) {
    const bookmarks = []

    data.forEach(bookmarkData => {
        let bookmarkEl = document.createElement('div')
        bookmarkEl.classList.add('bookmark')

        let bookmarkTopSection = buildBookmarkTopSection(bookmarkData)
        let bookmarkMiddleSection = buildBookmarkMiddleSection(bookmarkData)
        let bookmarkBottomSection = buildBookmarkBottomSection(bookmarkData)

        let hrTEl = document.createElement('hr')
        hrTEl.classList.add('horizon')
        
        let hrMEl = document.createElement('hr')
        hrMEl.classList.add('horizon')

        bookmarkEl.append(bookmarkTopSection)
        bookmarkEl.append(hrTEl)
        bookmarkEl.append(bookmarkMiddleSection)
        bookmarkEl.append(hrMEl)
        bookmarkEl.append(bookmarkBottomSection)
        
        bookmarks.push(bookmarkEl)
    })

    return bookmarks
}

function renderBookmarks(data) {
    sectionBookmarksEl.innerHTML = ''

    const fragement = document.createDocumentFragment()
    
    data.forEach(bookmark => {
        fragement.append(bookmark)
    })

    sectionBookmarksEl.append(fragement)
}

entrypoint()