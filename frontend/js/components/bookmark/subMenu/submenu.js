const bookmarkSubmenu = document.getElementsByClassName('bookmark-submenu-button')
for(let b of bookmarkSubmenu) {
    console.log('asdf')
}
Array.from(bookmarkSubmenu).forEach(menu => {
    console.log('sa')
    menu.addEventListener('click', bookmarkSubmenuHandler())
})

function bookmarkSubmenuHandler() {
    console.log('help')
}
