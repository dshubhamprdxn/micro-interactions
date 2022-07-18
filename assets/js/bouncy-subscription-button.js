gsap.registerPlugin(CSSRulePlugin);

const emailIsValid = true;

const mainContainer = document.querySelector(".main-container");
const bouncyContainer = mainContainer.querySelector(".bouncy-container");
const emailInput = bouncyContainer.querySelector("input");
const button = bouncyContainer.querySelector("button");

const rule = CSSRulePlugin.getRule(".bouncy-container button::before");

const t1 = gsap.timeline();
const t2 = gsap.timeline();
t1.pause();
t2.pause();

const changeToSubmitState = () => {
    removeClass(button, "promo-button");
    button.removeEventListener("click");
    addClass(button, "email-submit-button");
    button.addEventListener("click", (event) => {
        if(emailIsValid) {
            t2.play();
        }
    });
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

button.addEventListener("click", (event) => {
    t1.play();
});