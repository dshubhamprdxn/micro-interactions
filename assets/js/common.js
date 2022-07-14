const addClass = (element, className) => {
    if(!element.classList.contains(className)) {
        element.classList.add(className);
    }
}

const removeClass = (element, className) => {
    if(element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

const changeElementInnerText = (element, messageValue) => {
    element.innerText = messageValue;
}