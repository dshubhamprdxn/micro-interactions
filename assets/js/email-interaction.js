gsap.registerPlugin(CSSRulePlugin);

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

const rule = CSSRulePlugin.getRule(".email-div .email-interactive-response.correct::before");

const t1 = gsap.timeline(); // Timeline for Playing/Clearing(Reverse) Correct animation
const t2 = gsap.timeline(); // Timeline for Playing Incorrect animation
const t3 = gsap.timeline(); // Timeline for Clearing Incorrect animation

emailIDInput.addEventListener("change", (event) => {
    validateForm();
});

form.addEventListener("submit", (event) => {
    validateForm(event);
});

emailCorrectResponse.addEventListener("click", (event) => {
    t1.reverse();
});

emailIncorrectResponse.addEventListener("click", (event) => {
    t3.restart();
});

// Removes "display: flex" from the "emailIncorrectResponse" element ie. Hides it
const hideIncorrectSpan = () => {
    removeClass(emailIncorrectResponse, cssClasses[2]);
}

// Removes "display: flex" from the "emailCorrectResponse" element ie. Hides it
const hideCorrectSpan = () => {
    removeClass(emailCorrectResponse, cssClasses[2]);
}

// Removes Incorrect CSS classes from emailIDInput, emailMessage and clears emailIDInput
const clearIncorrectAnimation = (clearInput) => {
    if(clearInput) {
        emailIDInput.value = "";
    }
    removeClass(emailIDInput, cssClasses[1]);
    removeClass(emailMessage, cssClasses[1]);
}

// Removes Correct CSS classes from emailIDInput and clears emailIDInput
const clearCorrectAnimation = (clearInput) => {
    if(clearInput) {
        emailIDInput.value = "";
    }
    removeClass(emailIDInput, cssClasses[0]);
}

t1.pause();
t1.set(rule, { cssRule: {opacity: ""}, onReverseComplete: hideCorrectSpan })
    .set(emailCorrectResponse, {width: ""})
    .set(emailMessage, {innerText: errorMessages[0]})
    .to(emailCorrectResponse, {width: "2px", duration: 0})
    .to(emailCorrectResponse, {width: "120px", duration: 0.5}, ">")
    .fromTo(rule, { cssRule: {opacity: 0} }, { cssRule: {opacity: 1, duration: 0.4}, onReverseComplete: clearCorrectAnimation, onReverseCompleteParams: [true] }, ">")
    .set(rule, {cssRule: {opacity: ""}});

t2.pause();
t2.to(emailIncorrectResponse, {width: "2px", duration: 0})
    .to(emailIncorrectResponse, {width: "120px", duration: 0.5})
    .to(emailDiv, {x:"+=20", yoyo: true, repeat: 4, duration: 0.1}, ">")
    .to(emailDiv, {x:"-=20", yoyo: true, repeat: 4, duration: 0.1}, ">")
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
    .to(emailMessage, {innerText: errorMessages[0], duration: 0, onComplete: clearIncorrectAnimation, onCompleteParams: [true]}, "<0.2s")
    .to(emailIncorrectResponse, {right: "150%", duration: 0.4}, ">")

    // reset the above set properties of GSAP
    .set(circleDiv, {display: ""})
    .set(circle1, {width: "", height: "", borderWidth: ""})
    .set(circle2, {width: "", height: "", borderWidth: ""})
    .set(emailIncorrectResponse, {width: "", right: "", onComplete: hideIncorrectSpan});

/**
 * Add your email validation function here and return below variable.
 * @property {boolean} emailIsValid - Set "emailIsValid" to true for the "Correct animation" and to false for "Incorrect animation". 
 * @property {boolean} emailIsEmpty - Set "emailIsValid" to false & "emailIsEmpty" to true to play "Incorrect animation" for empty input. 
/* 

const emailValidation = () => {
    // Replace this with your own emailValidation logic
    const emailIsValid = false;
    const emailIsEmpty = false;

    return {emailIsValid, emailIsEmpty};
}

// Play respective animation depending on "emailIsValid" & "emailIsEmpty" values
const validateForm = (event) => {
    if(event != undefined) {
        event.preventDefault();
    }
    if(emailValidation().emailIsValid) {
        if(!hasClass(emailCorrectResponse, cssClasses[2])) {
            playCorrectAnimation();
        } 
    } else {
        if(!hasClass(emailIncorrectResponse, cssClasses[2])) {
            playIncorrectAnimation(emailValidation().emailIsEmpty);
        }
    }
}

// Removes Incorrect animation if present and plays Correct animation if already not present
const playCorrectAnimation = () => {
    if(hasClass(emailIncorrectResponse, cssClasses[2])) {
        clearIncorrectAnimation(false);
        hideIncorrectSpan();
    }

    removeClass(emailIDInput, cssClasses[1]);
    addClass(emailIDInput, cssClasses[0]);
    removeClass(emailMessage, cssClasses[1]);
    addClass(emailCorrectResponse, cssClasses[2]);

    t1.restart();
}

// Removes Correct animation if present and plays Incorrect animation if already not present
const playIncorrectAnimation = (emailIsEmpty) => {
    if(hasClass(emailCorrectResponse, cssClasses[2])) {
        clearCorrectAnimation(false);
        hideCorrectSpan();
    }

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
