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

    console.log(data)
    renderBookmarks(data)
}

function buildBookmarkTopSection(data) {
    // // Create the <div class="bookmark"> element
    // let newDivBookmarkEl = document.createElement('div')
    // newDivBookmarkEl.classList.add('bookmark')
    
    // Create <div class="bookmark-top">
    let newDivBookmarkTopEl = document.createElement('div')
    newDivBookmarkTopEl.classList.add('bookmark-top')
    
    // El nested in bookmark-top
    let newImgEl = document.createElement('img')
    newImgEl.classList.add("bookmark-icon")
    newImgEl.src = data.imgUrl
    
    let newDivInBookmarkTopEl = document.createElement('div')
    let newTitleEl = document.createElement('p')
    newTitleEl.classList.add("bookmark-title")
    newTitleEl.innerText = data.title
    
    let newURLEl = document.createElement('p')
    newURLEl.classList.add("bookmark-url")
    newURLEl.innerText = data.url
    
    newDivInBookmarkTopEl.append(newTitleEl, newURLEl)
    
    let newButtonSubMenu = document.createElement('button')
    newButtonSubMenu.classList.add('bookmark-submenu')
    newButtonSubMenu.type = "button"
    newButtonSubMenu.innerText = "|"
    
    newDivBookmarkTopEl.append(newImgEl, newDivInBookmarkTopEl, newButtonSubMenu)
    
    // newDivBookmarkEl.append(newDivBookmarkTopEl)

    // return newDivBookmarkEl
    return newDivBookmarkTopEl
}

function buildBookmarkMiddleSection() {

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

function buildBookmarkElement(data) {
    // Create the <div class="bookmark"> element
    let bookmarkEl = document.createElement('div')
    bookmarkEl.classList.add('bookmark')

    let bookmarkTopSection = buildBookmarkTopSection(data)

    let bookmarkBottomSection = buildBookmarkBottomSection(data)
    
    bookmarkEl.append(bookmarkTopSection)
    bookmarkEl.append(bookmarkBottomSection)


    return bookmarkEl
    // let newDivMiddleEl = document.createElement('div')
    // newDivMiddleEl.classList.add('bookmark-middle')
    
    // let newDivBottomEl = document.createElement('div')
    // newDivBottomEl.classList.add('bookmark-bottom')
    
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