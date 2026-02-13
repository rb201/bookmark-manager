const sortButton = document.querySelector('.main-sort-container')
sortButton.addEventListener('mouseenter', e => sortButtonHandler(e) )
sortButton.addEventListener('mouseleave', e => sortSubmenuHandler(e))

const sortSubMenu = document.querySelector('.main-sort-submenu')

function sortButtonHandler(e) {
    sortSubMenu.classList.toggle("sortSubmenuIsOpen")
}

function sortSubmenuHandler(e) {
    sortSubMenu.classList.remove("sortSubmenuIsOpen")
}