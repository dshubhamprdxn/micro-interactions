const hasClass = (element, className) => {
    if(element.classList.contains(className)) {
        return true;
    }
    return false;
}

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
    if(element != undefined) {
        if(messageValue != undefined) {
            element.innerText = messageValue;
        } else {
            console.log("Message value not provided!");
        }
    } else {
        console.log("Element not present!");
    }
}