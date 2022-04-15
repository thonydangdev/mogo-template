const btnWhatwedos = document.querySelectorAll('.whatwedo__content-item-title')

const toggleBtn = document.querySelector('.toggle')
toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active')
})
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
const statistic = document.querySelector('.statistic')
const statisticNums = statistic.querySelectorAll('.statistic-item-num')
window.onscroll = (e) => {
    if (statistic.getBoundingClientRect().top < 550 && statisticNums[0].innerText == 0) {
        updateCounter()

    }
}

function updateCounter() {
    statisticNums.forEach(statisticNum => {
        let target = +statisticNum.dataset.num;
        let c = +statisticNum.innerText;

        let increment = target / 10000;

        if (c < target) {
            statisticNum.innerText = `${Math.ceil(c + increment)}`;
            setTimeout(updateCounter, 50);
        } else {
            statisticNum.innerText = target
        }
    })
}