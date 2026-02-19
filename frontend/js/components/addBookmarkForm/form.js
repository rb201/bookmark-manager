import { bookmarksCount, networkName, renderOneBookmark } from "../bookmark/util.js"
import { buildBookmarkElement } from "../bookmark/bookmark.js"

const openBookmarkFormButton = document.querySelector('.button-add-bookmark')
openBookmarkFormButton.addEventListener('click', openBookmarkFormHandler)

const closeBookmarkFormButton = document.querySelector('.button-close-form')
closeBookmarkFormButton.addEventListener('click', closeBookmarkButtonHandler)

const addBookmarkForm = document.querySelector('.form-add-bookmark')
addBookmarkForm.addEventListener('submit', e => submitBookmarkFormHandler(e))

// const submitAddBookmarkForm = document.querySelector('.form-submit-button')
// submitAddBookmarkForm.addEventListener('click', validateAddBookmarkFormHandler)

function openBookmarkFormHandler() {
    if (addBookmarkForm.classList.contains('form-open')) return

    addBookmarkForm.classList.add('form-open')
}

function closeBookmarkButtonHandler() {
    if (!addBookmarkForm.classList.contains('form-open')) return

    addBookmarkForm.classList.remove('form-open')
}

function submitBookmarkFormHandler(e) {
    e.preventDefault()

    const title = document.getElementById("form-title").value
    const url = document.getElementById("form-url").value
    const desc = document.getElementById("form-desc").value
    const tags = document.getElementById("form-tags").value
    const imageUrl = document.getElementById("form-image-uri").value
    
    // WIP - validation
    if (!isUrlValid(url)) {
        return
    }

    const newId = generateNewId()
    
    const bookmarkObj = createNewBookmark(newId, title, url, desc, tags, imageUrl)

    const bookmarkEl = buildBookmarkElement([bookmarkObj])

    const bookmark = bookmarkEl.pop()

    submitBookmark(bookmarkObj)

    renderOneBookmark(bookmark)
}

function generateNewId() {
    // return `unique-id-${bookmarksCount}`
    return `unique-id-12`
}

function createNewBookmark(id, title, url, desc, tags, imageUrl) {

    const today = new Date().toISOString();

    let listOfTags = tags.split(',')

    const bookmarkObj = {
        id: id,
        title: title,
        url: url,
        description: desc,
        tags: listOfTags,
        date_added: today,
        last_visited: null,
        view_count: 0,
        is_pinned: false,
        is_archived: false,
        image_url: imageUrl,
        to_delete: false
    }

    return bookmarkObj
}

async function submitBookmark(data) {
    try {
        const res = await fetch(`http://${networkName}:3001/bookmarks/${data.id}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) throw new Error("error posting " + res.status)

        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

function isUrlValid(urlData) {
    try {
        console.log(urlData)
        const url = new URL(urlData)

        if (!url.hostname.includes(".")) {
            alert("Make sure hostname is a FQDN")
            return false
        }

        return true
    } catch (err) {
        if(err instanceof TypeError) {
            console.log(`invalid url: ${urlData}`, err)
            alert(`invalid url: ${urlData}. Make sure URL form is https://hostname.com`,)
        }
        return false
    }
}