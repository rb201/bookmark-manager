import { bookmarksCount } from "../bookmark/util.js"

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

    submitBookmark(bookmarkObj)

    // render
}

function generateNewId() {
    return `unique-id-${bookmarksCount}`
    // return `unique-id-12`
}

function createNewBookmark(id, title, url, desc, tags, imageUrl) {

    const today = new Date().toISOString();

    let listOfTags = tags.split(',')

    const bookmarkObj = {
        id: id,
        title: title,
        url: url,
        desc: desc,
        tags: listOfTags,
        dateAdded: today,
        lastVisited: "",
        viewCount: 0,
        isPinned: false,
        isArchived: false,
        imageUrl: imageUrl,
        toDelete: false
    }

    return bookmarkObj
}

async function submitBookmark(data) {
    try {
        const res = await fetch(`http://localhost:3001/bookmarks/${data.id}`, {
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