console.log(gsap);
let loadingSwitchOn = false;
let loadingSwitchButtonIsDisabled = false;

const switchTitles = ["Turn Off", "Turn On!", "Turning On...", "Turning Off..."];
const messages = ["devices off", "please wait ...", "devices on"];

const mainContainer = document.querySelector(".main-container");
const switchInteractionMainDiv = mainContainer.querySelector(".switch-interaction-div");
const switchHTMLElement = switchInteractionMainDiv.querySelector(".switch");
const slider = switchInteractionMainDiv.querySelector(".slider");
const fill = switchInteractionMainDiv.querySelector(".fill");
const cover1 = switchInteractionMainDiv.querySelector(".cover-1");
const cover2 = switchInteractionMainDiv.querySelector(".cover-2");
const messageSpan = switchInteractionMainDiv.querySelector(".message");

const t1 = gsap.timeline();
const t2 = gsap.timeline();

const changeMessageAndTitle = (message, title) => {
    messageSpan.innerText = message;
    switchHTMLElement.title = title;
}

t1.to(switchHTMLElement, {width: "80px", duration: 0.5, onComplete: changeMessageAndTitle, onCompleteParams: [messages[1], switchTitles[2]]})
    .to(switchHTMLElement, {backgroundColor: "grey", ease: "linear", duration: 0.5}, "<")
    .to(switchInteractionMainDiv, {backgroundColor: "lightblue", ease: "linear", duration: 0.5}, "<")
    .set(fill, {border: "6px solid grey", borderRadius: "50%", delay: 0.5})
    .set(fill, {borderTopColor: "blue", rotation: -45, delay: 0.5})
    .set(cover1, {border: "6px solid transparent"})
    .set(cover1, {borderTopColor: "grey", rotation: -45})
    .to(fill, {rotation: 315, duration: 1.5, repeat: -1})
    .to(cover1, {borderTopColor: "transparent"}, "<0.3s");

t1.pause();
switchHTMLElement.addEventListener("click", function(event) {
    if(!loadingSwitchButtonIsDisabled) {
        loadingSwitchButtonIsDisabled = true;
        if(!loadingSwitchOn) {
            t1.play();
            let timer = setTimeout(function() {
                clearTimeout(timer);
                turnOnSwitch();
            }, 6000);
        } else {
            t2.reverse();
            // t1.reverse();
        }
    }
});

const turnOnSwitch = () => {
    t1.kill();

    t2.set(fill, {border: ""})
        .set(fill, {borderTopColor: "transparent"})
        .to(switchHTMLElement, {width: "150px", duration: 0.5, onComplete: changeMessageAndTitle, onCompleteParams: [messages[2], switchTitles[0]]})
        .to(switchInteractionMainDiv, {backgroundColor: "lightgreen", ease: "linear", duration: 0.5}, "<")
        .to(switchHTMLElement, {backgroundColor: "green", ease: "linear", duration: 0.5, onComplete: changeSwitchValue}, "<")
}

const changeSwitchValue = () => {
    loadingSwitchButtonIsDisabled = false;
    loadingSwitchOn = !loadingSwitchOn;
}