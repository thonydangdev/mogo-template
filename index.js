const btnWhatwedos = document.querySelectorAll('.whatwedo__content-item-title')
btnWhatwedos.forEach((btnWhatwedo) => {
    btnWhatwedo.addEventListener('click', (e) => {
        if (e.target.parentElement.classList.contains('active')) {
            e.target.parentElement.classList.remove('active')
        } else {
            removeActive()
            e.target.parentElement.classList.add('active')
        }

    })
})
function removeActive() {
    btnWhatwedos.forEach(btnWhatwedo => {
        btnWhatwedo.parentElement.classList.remove('active')
    })
}