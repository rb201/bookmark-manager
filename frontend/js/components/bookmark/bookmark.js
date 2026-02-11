import { allBookmarks } from "./util.js"
import { bookmarkSubmenuHandler, archiveBookmarkHandler, trashBookmarkHandler } from "./subMenu/submenu.js"
import { formateDateForPresentation } from "./util.js"

// sequence of pinned then unpinned bookmarks
let sortedBookmarks = []

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

export function sortPinnedBookmarks(data) {
    const nonArchivedData = getNonArchivedToDeleteBookmarks(data)

    // const pinnedBookmark = nonArchivedData.filter(bookmark => bookmark.isPinned)
    // const unpinnedBookmark = nonArchivedData.filter(bookmark => !bookmark.isPinned)

    const pinnedBookmark = getPinnedBookmarks(nonArchivedData)
    const unpinnedBookmark = getUnpinnedBookmarks(nonArchivedData)

    sortedBookmarks = pinnedBookmark.concat(unpinnedBookmark)

    return sortedBookmarks
}

function getNonArchivedToDeleteBookmarks(data) {
    return data.filter(bookmark => !bookmark.isArchived && !bookmark.toDelete)
}

function getPinnedBookmarks(data) {
    return data.filter(bookmark => bookmark.isPinned)
}

function getUnpinnedBookmarks(data) {
    return data.filter(bookmark => !bookmark.isPinned)
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

    // write to db
    updatePinState(bookmarkId, pinState)

    // remove from top of page and move to unpinned area
    movePinUnpinBookmark(bookmarkId, pinState)

    // update cache
    for (let bookmark of allBookmarks) {
        if (bookmark.id == bookmarkId) {
            bookmark.isPinned = pinState
            break
        }
    }
}

function movePinUnpinBookmark(bookmarkId, pinState) {
    let curBookmarkNum = parseInt(bookmarkId.split("-").at(-1))

    let data = getNonArchivedToDeleteBookmarks(allBookmarks)

    const curBookmarkEl = document.querySelector(`#${bookmarkId}`)

    if (pinState === true) {
        let pinnedBookmarks = getPinnedBookmarks(data)

        for (let idx = 0; idx < pinnedBookmarks.length; idx++) {
            let pinBookmarkNum = parseInt(pinnedBookmarks[idx].id.split("-").at(-1))

            if (pinBookmarkNum > curBookmarkNum){
                const pBookmarkEl = document.querySelector(`#${pinnedBookmarks[idx].id}`)
                pBookmarkEl.before(curBookmarkEl)
                break
            }

            if (idx === pinnedBookmarks.length - 1) {
                const pBookmarkEl = document.querySelector(`#${pinnedBookmarks[idx].id}`)
                pBookmarkEl.after(curBookmarkEl)
            }
        }
    } else {
        let unPinnedBookmarks = getUnpinnedBookmarks(data)

        for (let idx = 0; idx < unPinnedBookmarks.length; idx++) {
            let unPinnedBookmarkNum = parseInt(unPinnedBookmarks[idx].id.split("-").at(-1))

            if (unPinnedBookmarkNum > curBookmarkNum){
                const pBookmarkEl = document.querySelector(`#${unPinnedBookmarks[idx].id}`)
                pBookmarkEl.before(curBookmarkEl)
                break
            }

            if (idx === unPinnedBookmarks.length - 1) {
                const pBookmarkEl = document.querySelector(`#${unPinnedBookmarks[idx].id}`)
                pBookmarkEl.after(curBookmarkEl)
            }
        }
    }
}

async function updatePinState(bookmarkId, pinState) {
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