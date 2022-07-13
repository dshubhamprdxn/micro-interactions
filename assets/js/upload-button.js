gsap.registerPlugin(CSSRulePlugin);

const t1 = gsap.timeline({ default: {ease: Power2.easeOut}})

const upload = document.querySelector('.upload');
const loader = document.querySelector('.loader');
const completed = document.querySelector('.completed');

t1.to('.upload', {  marginRight: 0, width: '120px' ,height: '100%', duration: 0.5})
.to('.text', {  opacity: 0})
.to('.bg', {  width: '100%', duration: 1.5}, 0.5)
.to('.uploading', { visibility: 'visible', height: '50%'}, "-=0.3")
.to('.loader', {width: '100%', display: 'block',duration: 1}, "-=0.3")
.to('.loader', {height: '100%', inset : 0 , borderRadius: '10px'})
.to('.completed', {visibility: 'visible', borderRadius: '10px',duration: 0.5},"-=0.2")

t1.pause();
upload.addEventListener('click', () => {
    t1.play();
});