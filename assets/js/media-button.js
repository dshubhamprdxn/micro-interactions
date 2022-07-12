gsap.registerPlugin(CSSRulePlugin);

const t1 = gsap.timeline({ default: {ease: Power2.easeOut}})
const rule = CSSRulePlugin.getRule('button::before');

const btn = document.querySelector('.btn');
const l1 = document.querySelector('.media-button ul li:nth-child(1)');
const l2 = document.querySelector('.media-button ul li:nth-child(2)');
const l3 = document.querySelector('.media-button ul li:nth-child(3)');
const l4 = document.querySelector('.media-button ul li:nth-child(4)');

const l1Svg = document.querySelector('.media-button ul li:nth-child(1) svg');
const l2Svg = document.querySelector('.media-button ul li:nth-child(2) svg');
const l3Svg = document.querySelector('.media-button ul li:nth-child(3) svg');
const l4Svg = document.querySelector('.media-button ul li:nth-child(4) svg');

const l4SvgContainer = document.querySelector('.media-button ul li:nth-child(4) .svg-container');
const l3SvgContainer = document.querySelector('.media-button ul li:nth-child(3) .svg-container');
const l2SvgContainer = document.querySelector('.media-button ul li:nth-child(2) .svg-container');
const l1SvgContainer = document.querySelector('.media-button ul li:nth-child(1) .svg-container');
const l4Common = {
    borderRadius: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0)',
    width: '62px',
};

const svgCommon = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50
}

t1.fromTo('.btn', { rotation: 0}, { rotation: 315, duration: 1.5, ease: "power4.inOut"}, "1s")
.to(l4, { bottom: '100%', duration: 0.5, ease: "power4.Out"}, "-=1s")
.to(l3, { bottom: '75%', duration: 0.5, ease: "power4.Out"}, "-=0.75s")
.to(l2, { bottom: '50%', duration: 0.5, ease: "power4.Out"}, "-=0.5s")
.to(l1, { bottom: '25%', duration: 0.5, ease: "power4.Out"}, "-=0.25s")
.fromTo(l4Svg, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=0.5s")
.fromTo(l3Svg, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=0.4s")
.fromTo(l2Svg, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=0.3s")
.fromTo(l1Svg, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=0.2s")
// .fromTo(l1SvgContainer, { width: '0',height: '64px' },{ width: '180px',height: '64px' })
.fromTo(l1SvgContainer, svgCommon,{ xPercent: -160, duration: 0.20 }, "-=0.15s")
.fromTo(l2SvgContainer, svgCommon,{ xPercent: -195, duration: 0.30 }, "-=0.25s")
.fromTo(l3SvgContainer, svgCommon,{ xPercent: -225, duration: 0.35 }, "-=0.35s")
.fromTo(l4SvgContainer, svgCommon,{ xPercent: -255, duration: 0.40 }, "-=0.45s") // same

.fromTo(l1, l4Common,{ width: '180px',height: '64px',background: 'rgba(255,255,255, 1)',
duration: 0.10}, "-=0.25s")
.fromTo(l2, l4Common,{ width: '215px',height: '64px',background: 'rgba(255,255,255, 1)',
duration: 0.15}, "-=0.45s")
.fromTo(l3, l4Common,{ width: '245px',height: '64px',background: 'rgba(255,255,255, 1)',
duration: 0.20}, "-=0.35s")
.fromTo(l4, l4Common,{ width: '275px',height: '64px',background: 'rgba(255,255,255, 1)',
duration: 0.35}, "-=0.25s")
// .fromTo(l2, l4Common,{ width: '210px' }, "-=.5s")


// .fromTo(l3, l4Common,{ width: '240px' }, "-=.5s")

// .fromTo(l4, l4Common,{ width: '270px' }, "-=.5s") //40 difference



// .fromTo('.text', {
//     opacity: 0, width: '100%'
// },{ opacity: 1,width: '100%', xPercent: 10 }, "-=0.5s")

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