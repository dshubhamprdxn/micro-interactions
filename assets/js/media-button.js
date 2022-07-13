let listCount = document.querySelector(".media-button ul").children.length;
let list = {};
let svg = {};
let svgContainer = {};

const btn = document.querySelector('.btn');

const t1 = gsap.timeline({ default: {ease: Power2.easeOut}});
const collectionList = document.querySelectorAll('.collectionList li');
const countPercentage = 100/listCount;
const svgContainerMinTranslateX = 135;
const listMinWidth = 155;

const listStyle = {
    borderRadius: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'rgba(243, 244, 252, 0.5)',
    width: '43px',
    height: '43px',
};

const svgStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50,
}

for (let i = 1; i <= listCount; i++) {
    list["l"+i] = document.querySelector(`.media-button ul li:nth-child(${i})`);
    svgContainer["svgContainerL"+i] = document.querySelector(`.media-button ul li:nth-child(${i}) .svg-container`);
    svg["svgL"+i] = document.querySelector(`.media-button ul li:nth-child(${i}) svg`);
}

t1.fromTo('.btn', { rotation: 0}, { rotation: 315, duration: 1.5, ease: "power4.inOut"}, "1s")
.to(collectionList, { bottom: '12%', duration: 0.5, ease: "power4.Out"}, "-=1.5s")
.to(list.l4, { bottom: `${countPercentage*4}%`, duration: 0.5, ease: "power4.Out"}, `-=${0.25 * 4}s`)
.to(list.l3, { bottom: `${countPercentage*3}%`, duration: 0.5, ease: "power4.Out"}, `-=${0.25 * 3}s`)
.to(list.l2, { bottom: `${countPercentage*2}%`, duration: 0.5, ease: "power4.Out"}, `-=${0.25 * 2}s`)
.to(list.l1, { bottom: `${countPercentage*1}%`, duration: 0.5, ease: "power4.Out"}, `-=${0.25 * 1}s`)

.fromTo(svg.svgL4, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, `-=${0.1 + 0.1 * 4}s`)
.fromTo(svg.svgL3, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, `-=${0.1 + 0.1 * 3}s`)
.fromTo(svg.svgL2, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, `-=${0.1 + 0.1 * 2}s`)
.fromTo(svg.svgL1, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, `-=${0.1 + 0.1 * 1}s`)
.to('.media-button', { filter: 'none', duration: 0.5}, "-=0.5s")

.fromTo(svgContainer.svgContainerL1, svgStyle,{ xPercent: `-${svgContainerMinTranslateX + 30 * 1}`, duration: `${0.1 + 0.1 * 1}` }, `-=${0.1 + 0.05 * 1}s`)
.fromTo(svgContainer.svgContainerL2, svgStyle,{ xPercent: `-${svgContainerMinTranslateX + 30 * 2}`, duration: `${0.1 + 0.1 * 2}` }, `-=${0.1 + 0.05 * 2}s`)
.fromTo(svgContainer.svgContainerL3, svgStyle,{ xPercent: `-${svgContainerMinTranslateX + 30 * 3}`, duration: `${0.1 + 0.1 * 3}` }, `-=${0.1 + 0.05 * 3}s`)
.fromTo(svgContainer.svgContainerL4, svgStyle,{ xPercent: `-${svgContainerMinTranslateX + 30 * 4}`, duration: `${0.1 + 0.1 * 4}` }, `-=${0.1 + 0.05 * 4}s`)

.fromTo(list.l1, listStyle,{ width: `${listMinWidth + 30 * 1}px`,height: '64px',background: 'rgba(255,255,255, 1)', paddingTop: 0,
duration: 0.20}, "-=0.45s")
.fromTo(list.l2, listStyle,{ width: `${listMinWidth + 30 * 2}px`,height: '64px',background: 'rgba(255,255,255, 1)', paddingTop: 0,
duration: 0.25}, "-=0.40s")
.fromTo(list.l3, listStyle,{ width: `${listMinWidth + 30 * 3}px`,height: '64px',background: 'rgba(255,255,255, 1)', paddingTop: 0,
duration: 0.30}, "-=0.35s")
.fromTo(list.l4, listStyle,{ width: `${listMinWidth + 30 * 4}px`,height: '64px',background: 'rgba(255,255,255, 1)', paddingTop: 0,
duration: 0.40}, "-=0.30s")

.fromTo(`.text`, {
    opacity: 0, width: '100%'
},{ opacity: 1,width: '100%', xPercent: 10 }, "-=0.5s");

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