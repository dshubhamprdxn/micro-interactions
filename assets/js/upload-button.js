gsap.registerPlugin(CSSRulePlugin);

const t1 = gsap.timeline({ default: {ease: Power2.easeOut}})

const upload = document.querySelector('.upload');
const loader = document.querySelector('.loader');
const completed = document.querySelector('.completed');


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

t1.to('.upload', {  marginRight: 0, width: '120px' ,height: '100%', duration: 0.5})
.to('.text', {  opacity: 0})
.to('.bg', {  width: '100%', duration: 2.5}, 0.5)
.to('.uploading', { y: 0, xPercent: 150 }, "-=1.5")
.to('.loader', {width: '100%', display: 'block',duration: 2.5}, 3)
.to('.completed', {height: '100%', visibility: 'visible', borderRadius: '10px'},5)
.to('.loader', {height: '100%', inset : 0 , borderRadius: '10px'})

t1.pause();
upload.addEventListener('click', () => {
    t1.play();
});