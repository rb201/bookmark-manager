import { bookmarkSubmenuHandler, archiveBookmarkHandler, trashBookmarkHandler } from "./subMenu/submenu.js"
import { formateDateForPresentation, pinBookmarkHandler } from "./util.js"

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

    let subMenuContainer = document.createElement('div')
    subMenuContainer.classList.add('submenu-container')

    let buttonSubMenu = document.createElement('button')
    buttonSubMenu.classList.add('bookmark-submenu-button')
    buttonSubMenu.type = "button"
    buttonSubMenu.innerText = "⋮"
    buttonSubMenu.addEventListener('click', e => bookmarkSubmenuHandler(e))

    let subMenu = document.createElement('ul')
    subMenu.classList.add('bookmark-submenu')

    let bookmarkEdit = document.createElement('li')
    bookmarkEdit.innerText = 'Edit'
    let bookmarkArchive = document.createElement('li')
    bookmarkArchive.innerText = "Archive"
    bookmarkArchive.addEventListener('click', () => archiveBookmarkHandler(data.id))
    let bookmarkDelete = document.createElement('li')
    bookmarkDelete.innerText = 'Delete'
    bookmarkDelete.addEventListener('click', () => trashBookmarkHandler(data.id))

    subMenu.append(bookmarkEdit, bookmarkArchive, bookmarkDelete)

    subMenuContainer.append(buttonSubMenu, subMenu)

    bookmarkTopEl.append(bookmarkInfoEl, subMenuContainer)
    
    return bookmarkTopEl
}

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

    let secParentDiv = document.createElement('div')
    secParentDiv.classList.add('bookmark-sec-par')

    let viewDiv = document.createElement('div')
    viewDiv.classList.add('bookmark-view-info')

    let viewImgEl = document.createElement('img')
    viewImgEl.classList.add('bookmark-view-image')
    viewImgEl.src = "js/images/eye.svg"

    let viewEl = document.createElement('p')
    viewEl.classList.add('bookmark-view-count')
    viewEl.innerText = data.viewCount

    viewDiv.append(viewImgEl, viewEl)

    let lastVisitDiv = document.createElement('div')
    lastVisitDiv.classList.add('bookmark-last-visit-info')

    let timeImage = document.createElement('img')
    timeImage.classList.add('bookmark-last-visit-image')
    timeImage.src = "js/images/clock.svg"

    let lastVisitEl = document.createElement('p')
    lastVisitEl.classList.add('bookmark-last-visit')
    lastVisitEl.innerText = formateDateForPresentation(data.lastVisited)

    lastVisitDiv.append(timeImage, lastVisitEl)

    secParentDiv.append(viewDiv, lastVisitDiv)

    let pinButtonEl = document.createElement('img')
    pinButtonEl.classList.add('bookmark-pin-button')
    pinButtonEl.src = data.isPinned
        ? "js/images/thumbtack-active.svg"
        : "js/images/thumbtack-inactive.svg"
    pinButtonEl.addEventListener('click', () => pinBookmarkHandler(data.id))

    bookmarkEndEl.append(secParentDiv, pinButtonEl)

    return bookmarkEndEl
}

export function buildBookmarkElement(data) {
    const bookmarks = []

    data.forEach(bookmarkData => {
        let bookmarkEl = document.createElement('div')
        bookmarkEl.classList.add('bookmark')
        bookmarkEl.id = bookmarkData.id

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
