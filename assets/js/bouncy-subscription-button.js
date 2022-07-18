gsap.registerPlugin(CSSRulePlugin);

const emailIsValid = true; // true if email is valid, false otherwise
const buttonClasses = ["promo-button", "email-submit-button"];

const mainContainer = document.querySelector(".main-container");
const bouncyContainer = mainContainer.querySelector(".bouncy-container");
const emailInput = bouncyContainer.querySelector("input");
const button = bouncyContainer.querySelector("button");

// Event Listener for Promo button
const playTimeline1 = () => {
    console.log("Playing Timeline 1");
    t1.play();
}

// Event Listener for Email Submit button
const playTimeline2 = () => {
    if(emailIsValid) {
        console.log("Playing Timeline 2");
        t2.play();
    }
}

button.addEventListener("click", playTimeline1, true);

const rule = CSSRulePlugin.getRule(".bouncy-container button::before");

const t1 = gsap.timeline(); // Bouncy Subscription button to Email Field animation
const t2 = gsap.timeline(); // After Email submit to 'Thank You' button animation 
t1.pause();
t2.pause();

// After Timeline 1 completes change 'Promo button' to 'Email submit button'(Change classes & event listeners)
const changeToSubmitState = () => {
    removeClass(button, buttonClasses[0]);
    button.removeEventListener("click", playTimeline1, true);
    addClass(button, buttonClasses[1]);
    button.addEventListener("click", playTimeline2, true);
}

// Remove Submit click listener & class after Timeline 2 completes
const removeSubmitListener = () => {
    removeClass(button, buttonClasses[1]);
    button.removeEventListener("click", playTimeline2, true);
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
    .to(button, {width: "", padding: "0 50px", borderRadius: "38px", right: "50%", x: "50%", innerHTML: "thank you!", fontSize: "", duration: 0.5}, ">")
    .to(emailInput, {width: "76px", right: "50%", x: "50%", duration: 0.5}, "<")
    .set(button, {clearProps: true})
    .set(emailInput, {clearProps: true, onComplete: removeSubmitListener});