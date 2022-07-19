const hamburgerMainContainer = document.querySelector(".hamburger-main-container");

const playHamburgerAnimation = (event) => {
    hamburgerMainContainer.classList.toggle('active');
}

hamburgerMainContainer.addEventListener("click", playHamburgerAnimation, true);