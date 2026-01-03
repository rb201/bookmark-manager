const sectionBookmarksEl = document.querySelector('.section-bookmarks')

const addBookmarkButton = document.querySelector('.button-bookmark')
addBookmarkButton.addEventListener('click', addBookmarkButtonHandler)

function addBookmarkButtonHandler() {}

function searchBookmarkHandler() {}

function bookmarkSubmenuHandler() {}

async function loadBookmarks() {
    const res = await fetch('http://localhost:3000/data')

    console.log(res)
    if(!res.ok) throw new Error(`Error: ${res.status}`)

    const data = await res.json()

    // console.log(data)
    renderBookmarks(data)
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
    newButtonSubMenu.innerText = "|"
    
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
    let bookmarkEl = document.createElement('div')
    bookmarkEl.classList.add('bookmark')

    let bookmarkTopSection = buildBookmarkTopSection(data)
    let bookmarkMiddleSection = buildBookmarkMiddleSection(data)
    let bookmarkBottomSection = buildBookmarkBottomSection(data)

    let hrTEl = document.createElement('hr')
    hrTEl.classList.add('horizon')
    
    let hrMEl = document.createElement('hr')
    hrMEl.classList.add('horizon')

    bookmarkEl.append(bookmarkTopSection)
    bookmarkEl.append(hrTEl)
    bookmarkEl.append(bookmarkMiddleSection)
    bookmarkEl.append(hrMEl)
    bookmarkEl.append(bookmarkBottomSection)

    return bookmarkEl
}

function renderBookmarks(data) {
    const fragement = document.createDocumentFragment()
    
    data.forEach(bookmarkData => {
        let bookmarkEl = buildBookmarkElement(bookmarkData)
        fragement.append(bookmarkEl)
    })

    sectionBookmarksEl.append(fragement)
}

loadBookmarks()