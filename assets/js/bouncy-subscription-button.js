gsap.registerPlugin(CSSRulePlugin);

const resetToStartState = false;

const buttonClasses = ["promo-button", "email-submit-button"];
const buttonValues = ["get a promo code", "thank you!"];

const mainContainer = document.querySelector(".main-container");
const form = mainContainer.querySelector("form");
const bouncyContainer = mainContainer.querySelector(".bouncy-container");
const emailInput = bouncyContainer.querySelector(".bouncy-email-input");
const button = bouncyContainer.querySelector("button");

const emailValidation = () => {
    const emailIsValid = true; // true if email is valid, false otherwise
    return emailIsValid;
}

// Event Listener for Promo button
const playTimeline1 = () => {
    t1.restart();
}

// Event Listener for Email Submit button
const playTimeline2 = (event) => {
    event.preventDefault();
    if(emailValidation()) {
        t2.restart();
    } else {
        // Else code
    }
}

// Resets to Start state
const resetToStart = () => {
    changeElementInnerText(button, buttonValues[0]);
    addClass(button, buttonClasses[0]);
    button.addEventListener("click", playTimeline1, true);
}

resetToStart();

const rule = CSSRulePlugin.getRule(".bouncy-container button::before");

const t1 = gsap.timeline(); // 'Bouncy Subscription button' to 'Email Input Field' animation
const t2 = gsap.timeline(); // After Email submit to 'Thank You button' animation
t1.pause();
t2.pause();

/* 
    After Timeline 1 completes change 'Promo button' to 'Email submit button'
    (ie. Change classes & event listeners)
*/
const changeToSubmitState = () => {
    removeClass(button, buttonClasses[0]);
    button.removeEventListener("click", playTimeline1, true);
    addClass(button, buttonClasses[1]);
    button.setAttribute("type", "submit");
    form.addEventListener("submit", playTimeline2, true);
}

// Remove 'Email Submit' click listener & class after Timeline 2 completes
const removeSubmitListener = () => {
    removeClass(button, buttonClasses[1]);
    button.setAttribute("type", "button");
    form.removeEventListener("submit", playTimeline2, true);

    // Initialize to Start state
    if(resetToStartState) {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            resetToStart();
        }, 5000);
    }
}

t1.set(button, {fontSize: 0})
    .set(emailInput, {display: "block"})
    .to(button, {width: "45px", padding: 0, borderRadius: "50%", right: 0, x: "", duration: 0.4})
    .to(emailInput, {width: "550px", padding: "0 40px", borderRadius: "38px", duration: 0.4}, "<")
    
    .to(button, {width: "76px", duration: 0.15}, ">")
    .to(emailInput, {width: "450px", duration: 0.15}, "<")

    .to(rule, {cssRule: {display: "inline-block"}, duration: 0}, ">")

    .to(emailInput, {width: "470px", duration: 0.15}, ">")
    .to(button, {x: "+=10", duration: 0.15}, "<")
    .to(emailInput, {width: "450px", duration: 0.15}, ">")
    .to(button, {x: "-=10", duration: 0.15}, "<")
    .to(emailInput, {width: "460px", duration: 0.15}, ">")
    .to(button, {x: "+=5", duration: 0.15}, "<")
    .to(emailInput, {width: "450px", duration: 0.15}, ">")
    .to(button, {x: "-=5", duration: 0.15}, "<")

    .set(button, {x: ""})
    .set(emailInput, {x: "", onComplete: changeToSubmitState});

t2.to(button, {x: "110px", duration: 0.5})
    .set(rule, {cssRule: {display: "none"}})
    .to(button, {width: "", padding: "0 50px", borderRadius: "38px", right: "50%", x: "50%", innerHTML: buttonValues[1], fontSize: "", duration: 0.5}, ">")
    .to(emailInput, {width: "76px", right: "50%", x: "50%", duration: 0.5}, "<")
    .to(button, {clearProps: true}, ">")
    .to(emailInput, {clearProps: true, onComplete: removeSubmitListener}, ">");