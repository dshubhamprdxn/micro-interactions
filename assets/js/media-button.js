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
    background: '#fff',
    width: '0',
};

const svgCommon = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50
}

t1.fromTo('.btn', { rotation: 0}, { rotation: 860, duration: 2.5})
.to(l4, { bottom: '100%', duration: 0.5}, "-=2s")
.to(l3, { bottom: '75%', duration: 0.5}, "-=1.75s")
.to(l2, { bottom: '50%', duration: 0.5}, "-=1.5s")
.to(l1, { bottom: '25%', duration: 0.5}, "-=1.25s")
.fromTo(l4Svg, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=1.25s")
.fromTo(l3Svg, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=1s")
.fromTo(l2Svg, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=0.75s")
.fromTo(l1Svg, { opacity: 0, scale: 0},{ opacity: 1, scale: 1 }, "-=.5s")
.fromTo(l4, l4Common,{ width: '280px' }, "-=.5s") //40 difference
.fromTo(l4SvgContainer, svgCommon,{ xPercent: -265 }, "-=0.5s") // same
.fromTo(l3, l4Common,{ width: '240px' }, "-=.5s")
.fromTo(l3SvgContainer, svgCommon,{ xPercent: -235 }, "-=0.5s")
.fromTo(l2, l4Common,{ width: '210px' }, "-=.5s")
.fromTo(l2SvgContainer, svgCommon,{ xPercent: -205 }, "-=0.5s")
.fromTo(l1, l4Common,{ width: '180px' }, "-=.5s")
.fromTo(l1SvgContainer, svgCommon,{ xPercent: -175 }, "-=0.5s")
.fromTo('.text', {
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