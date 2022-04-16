const btnWhatwedos = document.querySelectorAll('.whatwedo__content-item-title')
const bannerSection = document.querySelector('.banner')
const toggleBtn = document.querySelector('.toggle')
const statistic = document.querySelector('.statistic')
const statisticNums = statistic.querySelectorAll('.statistic-item-num')
const anchorHeader = document.querySelectorAll('.header__navbar-list-item-links')
const scrollTopBtn = document.querySelector('.scrollTopBtn')

const heightNav = 100;
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}
const stepIndex = ['introStep', 'workStep', 'aboutStep', 'contactStep']
const SelectorOfStep = {
    introStep: ['.storyaboutus', '.statistic'],
    workStep: ['.weworkwith', '.uniquedesigns', '.whatwedo'],
    aboutStep: ['.meetourteam', '.someofwork', '.happyclients', '.lastestblog'],
    contactStep: ['.openmap', '.footer']
}
anchorHeader.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        // document.querySelector(this.getAttribute('href')).scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'nearest'
        // })
    })
})
class Step {
    constructor(childOfStep, stepIndex) {
        this.childOfStep = childOfStep
        this.ElementStep = Object.keys(childOfStep)
        this.stepIndex = stepIndex
    }
    getPropertyValue() {
        let Steps = {};
        let endPoint = 0;
        let startPoint = 0;
        for (var i = 0; i < this.stepIndex.length; i++) {
            let key = this.stepIndex[i]
            let scrollHeight = 0;
            this.childOfStep[key].forEach(child => {
                return scrollHeight += +document.querySelector(child).scrollHeight
            })
            endPoint += scrollHeight
            Steps[key] = {
                scrollHeight: scrollHeight,
                element: document.querySelector(`.${key}`),
                startPoint: startPoint,
                endPoint: endPoint
            }
            startPoint = endPoint;
        }
        return Steps
    }

}

function getWidthProgress(element, point, scrollHeight) {
    if (point === document.body.scrollHeight) {
        element.style.width = '94%'
    } else {
        element.style.width = 0;
        element.style.width = `${scale(point, 0, scrollHeight, 0, 94)}%`
    }
}



const newStep = new Step(SelectorOfStep, stepIndex)

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active')
})
//Get parents function
function getParentElements(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement
        }
        element = element.parentElement
    }
}
//Open Collapse
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
const changeNum = (num) => Math.ceil(Math.abs(num))
//Event when scroll
window.onscroll = (e) => {

    //start Statistic

    if (statistic.getBoundingClientRect().top < 550 && statisticNums[0].innerText == 0) {
        updateCounter()
    }
    //start Sticky banner
    const pointOfBody = changeNum(document.body.getBoundingClientRect().top)
    bannerSection.classList.toggle('sticky', pointOfBody > 0)
    const point = Math.floor(window.scrollY);
    if (point > 300) {
        scrollTopBtn.style.opacity = 1
    } else {
        scrollTopBtn.style.opacity = 0
    }

    if (bannerSection.classList.contains('sticky')) {
        const propertiesSteps = newStep.getPropertyValue()
        const maxHasScrollHeight = propertiesSteps[stepIndex[stepIndex.length - 1]].endPoint
        for (var value of stepIndex) {
            if (point >= propertiesSteps[value].startPoint && point <= propertiesSteps[value].endPoint) {
                getWidthProgress(propertiesSteps[value].element, point - propertiesSteps[value].startPoint, propertiesSteps[value].scrollHeight)
            }
        }
        if (point >= maxHasScrollHeight - window.innerHeight) {
            for (var i = 0; i < stepIndex.length; i++) {
                propertiesSteps[stepIndex[i]].element.style.width = '94%'

            }
        }

    }



}
//Counter statistic
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
