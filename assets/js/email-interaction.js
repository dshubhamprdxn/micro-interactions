gsap.registerPlugin(CSSRulePlugin);

const emailIsValid = false;
const cssClasses = ["correct", "incorrect", "flex"];
const errorMessages = ["Email", "Enter Email!", "Email format invalid"];

const mainContainer = document.querySelector(".main-container");
const form = mainContainer.querySelector("form");
const emailDiv = mainContainer.querySelector(".email-div");

const emailIDInput = emailDiv.querySelector("#email-id");
const emailMessage = emailDiv.querySelector(".email-message");
const emailCorrectResponse = emailDiv.querySelector(".email-interactive-response.correct");
const emailIncorrectResponse = emailDiv.querySelector(".email-interactive-response.incorrect");

const circleDiv = emailDiv.querySelector(".circle-div");
const circle1 = circleDiv.querySelector(".circle-1");
const circle2 = circleDiv.querySelector(".circle-2");

const rule = CSSRulePlugin.getRule(".email-interactive-response.correct::before");

const t1 = gsap.timeline();
const t2 = gsap.timeline();
const t3 = gsap.timeline();

emailIDInput.addEventListener("change", function(event) {
    validateForm();
});

form.addEventListener("submit", function(event) {
    validateForm(event);
});

emailCorrectResponse.addEventListener("click", function(event) {
    t1.reverse();
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

const clearCorrectAnimation = () => {
    emailIDInput.value = "";
    removeClass(emailIDInput, cssClasses[0]);
    removeClass(emailCorrectResponse, cssClasses[2]);
}

t1.pause();
t1.set(emailCorrectResponse, {width: "", onReverseComplete: clearCorrectAnimation})
    .set(emailMessage, {innerText: errorMessages[0]})
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
t3.set(circleDiv, {display: "block"})
    .to(circle1, {width: "30px", height: "30px", borderWidth: "10px", duration: 0.2}, ">")
    .to(circle2, {width: "15px", height: "15px", borderWidth: "10px", duration: 0.2}, "<")
    .to(circle1, {width: "95px", height: "95px", borderWidth: "1px", duration: 0.35}, ">")
    .to(circle2, {width: "60px", height: "60px", borderWidth: "4px", duration: 0.35}, "<")
    .to(circle1, {borderWidth: "0", duration: 0.1}, ">")
    .to(circle2, {borderWidth: "0", duration: 0.1}, "<")
    .to(emailIncorrectResponse, {width: "50%", duration: 0.4}, ">")
    .to(emailIncorrectResponse, {right: "100%", duration: 0.4}, ">")
    .set(emailMessage, {innerText: errorMessages[0]})
    .to(emailIncorrectResponse, {right: "150%", duration: 0.4}, ">")

    // reset the above set properties of GSAP
    .set(circleDiv, {display: ""})
    .set(circle1, {width: "", height: "", borderWidth: ""})
    .set(circle2, {width: "", height: "", borderWidth: ""})
    .set(emailIncorrectResponse, {width: "", right: "", onComplete: clearIncorrectAnimation});

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