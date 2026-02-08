const sideMenuNavEl = document.querySelectorAll('.side-menu-item-container')

sideMenuNavEl.forEach(el => {
    el.addEventListener('click', e => sideMenuNavHandler(e))

})

function sideMenuNavHandler(e) {
    console.log(e.currentTarget)
}