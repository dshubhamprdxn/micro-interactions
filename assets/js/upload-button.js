gsap.registerPlugin(CSSRulePlugin);

const t1 = gsap.timeline({ default: {ease: Power2.easeOut}})
const loadingTime = 5;
const upload = document.querySelector('.upload');
const trigger = document.querySelector('.trigger');
const drawn = "drawn";
t1.pause();

t1.to('.upload', {  marginRight: 0, width: '120px' ,height: '100%', duration: 0.5})
.to('.text', {  opacity: 0})
.to('.bg', {  width: '100%', duration: 1.5}, 0.5)
.to('.uploading', { visibility: 'visible', height: '50%'}, "-=0.3")
.to('.loader', {width: '100%', display: 'block',duration: loadingTime}, "-=0.3")
.to('.loader', {height: '100%', inset : 0 , borderRadius: '10px'})
.to('.completed', {visibility: 'visible', borderRadius: '10px',duration: 2 ,onStart: addClass, onStartParams : [trigger,drawn]	 
  },"-=0.1")
.set(['.upload','.text','.bg','.uploading','.loader','.completed'], {clearProps: 'all'});

upload.addEventListener('click', () => {
    t1.restart();
});