gsap.registerPlugin(CSSRulePlugin);

const emailIsValid = false;
const cssClasses = ["correct", "incorrect", "flex", "correct-before", "align-left"];
const errorMessages = ["Email", "Enter Email!", "Email format invalid"];

const mainContainer = document.querySelector(".main-container");
const form = mainContainer.querySelector("form");
const emailDiv = mainContainer.querySelector(".email-div");

const emailIDInput = emailDiv.querySelector("#email-id");
const emailMessage = emailDiv.querySelector(".email-message");
const emailCorrectResponse = emailDiv.querySelector(".email-interactive-response.correct");
const emailIncorrectResponse = emailDiv.querySelector(".email-interactive-response.incorrect");

const rule = CSSRulePlugin.getRule(".email-interactive-response.correct::before");

const t1 = gsap.timeline();
const t2 = gsap.timeline();
const t3 = gsap.timeline();
const t4 = gsap.timeline();

emailIDInput.addEventListener("change", function(event) {
    validateForm();
});

form.addEventListener("submit", function(event) {
    validateForm(event);
});

emailCorrectResponse.addEventListener("click", function(event) {
    clearCorrectAnimation();
});

emailIncorrectResponse.addEventListener("click", function(event) {
    t3.restart();
});

const clearIncorrectAnimation = () => {
    emailIDInput.value = "";
    removeClass(emailIncorrectResponse, cssClasses[2]);
    removeClass(emailIDInput, cssClasses[1]);
    removeClass(emailMessage, cssClasses[1]);
}

t1.pause();
t1.set(emailMessage, {innerText: errorMessages[0]})
    .set(rule, { cssRule: {display: "none", opacity: 0} })
    .to(emailCorrectResponse, {width: "2px", duration: 0})
    .to(emailCorrectResponse, {width: "120px", duration: 0.5}, ">")
    .fromTo(rule, { cssRule: {display: ""} }, { cssRule: {opacity: 1, duration: 0.4} }, ">");

t2.pause();

t2.to(emailIncorrectResponse, {width: "2px", duration: 0})
    .to(emailIncorrectResponse, {width: "120px", duration: 0.5})
    .to(emailDiv, {x:"+=20", yoyo: true, repeat: 4, duration: 0.1}, ">")
    .to(emailDiv, {x:"-=20", yoyo: true, repeat: 4, duration: 0.1}, "<")
    .set(emailDiv, {x: ""});

t3.pause();
t3.to(emailIncorrectResponse, {width: "50%", duration: 0.4}, ">")
    .to(emailIncorrectResponse, {left: "0", duration: 0.4}, ">")
    .set(emailMessage, {innerText: errorMessages[0]})
    .to(emailIncorrectResponse, {left: "-50%", duration: 0.4}, ">")
    .set(emailIncorrectResponse, {width: "", left: "", onComplete: clearIncorrectAnimation});

const validateForm = () => {
    const emailValue = emailIDInput.value;
    if(emailValue == "" || emailValue == null) {
        playIncorrectAnimation(true);
    } else {
        if(emailIsValid) {
            if(!hasClass(emailCorrectResponse, cssClasses[2])) {
                playCorrectAnimation();
            }
        } else {
            if(!hasClass(emailIncorrectResponse, cssClasses[2])) {
                playIncorrectAnimation(false);
            }
        }
    }
    
}

const playCorrectAnimation = () => {
    removeClass(emailIDInput, cssClasses[1]);
    addClass(emailIDInput, cssClasses[0]);

    removeClass(emailMessage, cssClasses[1]);

    addClass(emailCorrectResponse, cssClasses[2]);

    t1.restart();
}

const playIncorrectAnimation = (emailIsEmpty) => {
    removeClass(emailIDInput, cssClasses[0]);
    addClass(emailIDInput, cssClasses[1]);

    addClass(emailMessage, cssClasses[1]);

    addClass(emailIncorrectResponse, cssClasses[2]);

    if(emailIsEmpty) {
        changeElementInnerText(emailMessage, errorMessages[1]);
    } else {
        changeElementInnerText(emailMessage, errorMessages[2]);
    }

    t2.restart();
}