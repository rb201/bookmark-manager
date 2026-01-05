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
    // validate data
    // create obj
    // post data
    // render
    // const newBookmarkData = {}
    // console.log('dssdds')
    // validateFormData()


    // const url = document.getElementById("form-url").value
 
    // validate data
    const title = document.getElementById("form-title").value
    const url = document.getElementById("form-url").value
    const desc = document.getElementById("form-desc").value
    const tags = document.getElementById("form-tags").value
    const imageUrl = document.getElementById("form-image-uri").value
    // console.log(url)
    
    
    if (!isUrlValid(url)) {
        return
    }
    
    console.log('ok')
    
    
    const newId = generateNewId()
    // validate data before creating obj. below is temp

    const today = new Date().toISOString();
    // console.log(today)
    // let day = today.getDate()
    // let month = today.toLocaleString('default', {month: 'short'})
    // console.log(today.getFullYear())


    const newBookmarkData = {
        id: newId,
        title: title,
        url: url,
        desc: desc,
        tags: [tags],
        dateAdded: today,
        lastVisited: "",
        viewCount: 0,
        isPinned: true,
        isArchived: false,
        imageUrl: imageUrl,
    }

//     {
//     "id": "unique-id-1",
//     "title": "Frontend Mentor",
//     "url": "frontendmentor.io/",
//     "description": "Improve your coding skills by building real projects.",
//     "tags": ["coding", "challenge", "frontend"],
//     "dateAdded": "2025-01-01T12:00:00Z",
//     "lastVisited": "2025-12-25T14:30:00Z",
//     "viewCount": 50,
//     "isPinned": true,
//     "isArchived": false,
//     "imgUrl": "https://www.google.com/s2/favicons?domain=www.frontendmentor.io&sz=128"
//   },

    submitAddBookmarkFormHandler(newBookmarkData)
}

function generateNewId() {
    return `unique-id-${bookmarksCount}`
}

function createNewBookmark(data) {}

async function submitAddBookmarkFormHandler(formData) {
    try {
        const res = await fetch('http://localhost:3000/data', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(formData)
        })

        if (!res.ok) throw new Error("error posting " + res.status)

        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

// function validateFormData() {
//     // const url = new URL(document.getElementById("form-url").value)
//     const url = document.getElementById("form-url").value

//     if (!isUrlValid(url)) return

//     let title = document.getElementById("form-title").value;
//     // let url = document.getElementById("form-url").value;
//     let desc = document.getElementById("form-desc").value;
//     let tags= [document.getElementById("form-tags").value];
// }

function isUrlValid(urlData) {
    try {
        console.log(urlData)
        const url = new URL(urlData)

        console.log(url)
        
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