const t1 = gsap.timeline({ default: {ease: Power2.easeOut}})

const btn = document.querySelector('.btn');
let listCount = document.querySelector(".media-button ul").children.length;
let list = {};
let svg = {};
let svgContainer = {};

for (let i = 1; i <= listCount; i++) {
    list["l"+i] = document.querySelector(`.media-button ul li:nth-child(${i})`);
    svgContainer["svgContainerL"+i] = document.querySelector(`.media-button ul li:nth-child(${i}) .svg-container`);
    svg["svgL"+i] = document.querySelector(`.media-button ul li:nth-child(${i}) svg`);
}

const listStyle = {
    borderRadius: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'rgba(243	244	252,0.1)',
    width: '62px',
};

const svgStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50
}

t1.fromTo('.btn', { rotation: 0}, { rotation: 315, duration: 1.5, ease: "power4.inOut"}, "1s")
.to(list.l4, { bottom: '100%', duration: 0.5, ease: "power4.Out"}, "-=1s")
.to(list.l3, { bottom: '75%', duration: 0.5, ease: "power4.Out"}, "-=0.75s")
.to(list.l2, { bottom: '50%', duration: 0.5, ease: "power4.Out"}, "-=0.5s")
.to(list.l1, { bottom: '25%', duration: 0.5, ease: "power4.Out"}, "-=0.25s")

.fromTo(svg.svgL4, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=0.5s")
.fromTo(svg.svgL3, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=0.4s")
.fromTo(svg.svgL2, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=0.3s")
.fromTo(svg.svgL1, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=0.2s")

.fromTo(svgContainer.svgContainerL1, svgStyle,{ xPercent: -160, duration: 0.20 }, "-=0.15s")
.fromTo(svgContainer.svgContainerL2, svgStyle,{ xPercent: -195, duration: 0.30 }, "-=0.20s")
.fromTo(svgContainer.svgContainerL3, svgStyle,{ xPercent: -225, duration: 0.35 }, "-=0.25s")
.fromTo(svgContainer.svgContainerL4, svgStyle,{ xPercent: -255, duration: 0.40 }, "-=0.30s") // same

.fromTo(list.l1, listStyle,{ width: '180px',height: '64px',background: 'rgba(255,255,255, 1)',
duration: 0.20}, "-=0.45s")
.fromTo(list.l2, listStyle,{ width: '215px',height: '64px',background: 'rgba(255,255,255, 1)',
duration: 0.25}, "-=0.40s")
.fromTo(list.l3, listStyle,{ width: '245px',height: '64px',background: 'rgba(255,255,255, 1)',
duration: 0.30}, "-=0.35s")
.fromTo(list.l4, listStyle,{ width: '275px',height: '64px',background: 'rgba(255,255,255, 1)',
duration: 0.40}, "-=0.30s")

.fromTo(`.text`, {
    opacity: 0, width: '100%'
},{ opacity: 1,width: '100%', xPercent: 10 }, "-=0.5s")

t1.pause();

btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
        t1.reverse();
        btn.classList.remove('active');
    } else {
        btn.classList.add('active');
        t1.play();
    }
});