const btnWhatwedos = document.querySelectorAll('.whatwedo__content-item-title')
function getParentElements(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement
        }
        element = element.parentElement
    }
}
btnWhatwedos.forEach((btnWhatwedo) => {
    btnWhatwedo.addEventListener('click', (e) => {
        let parentOfThis = getParentElements(e.target, '.whatwedo__content-item')
        if (parentOfThis.classList.contains('active')) {
            parentOfThis.classList.remove('active')
        } else {
            removeActive()
            parentOfThis.classList.add('active')
        }

    })
})
function removeActive() {
    btnWhatwedos.forEach(btnWhatwedo => {
        btnWhatwedo.parentElement.classList.remove('active')
    })
}