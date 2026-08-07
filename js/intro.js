(() => {
  const gate=document.querySelector('#welcome-gate');
  const form=document.querySelector('#welcome-form');
  const intro=document.querySelector('#intro');
  const audio=document.querySelector('#intro-audio');
  const skip=document.querySelector('.skip');
  const sound=document.querySelector('.sound');
  const welcome=document.querySelector('#intro-welcome');
  const qs=new URLSearchParams(location.search);
  let timer;
  const sparkleBox=document.querySelector('.sparkles');
  for(let i=0;i<42;i++){const dot=document.createElement('i');dot.style.left=(Math.random()*100)+'%';dot.style.top=(Math.random()*100)+'%';dot.style.animationDelay=(Math.random()*4.5)+'s';dot.style.animationDuration=(3.2+Math.random()*3)+'s';dot.style.transform='scale('+(0.7+Math.random()*1.4)+')';sparkleBox.appendChild(dot);}

  function finish(){
    clearTimeout(timer); intro.classList.add('done'); document.body.classList.remove('intro-lock');
    setTimeout(()=>{intro.hidden=true; intro.classList.remove('done');},900);
    try{audio.pause()}catch(e){}
  }
  function start(name){
    gate.hidden=true; intro.hidden=false; document.body.classList.add('intro-lock'); window.scrollTo(0,0);
    welcome.textContent=`Welcome, ${name}`; intro.classList.add('playing');
    timer=setTimeout(finish,16500);
  }
  skip?.addEventListener('click',finish);
  sound?.addEventListener('click',async()=>{ try{await audio.play(); sound.textContent='Sound on ✓'}catch(e){sound.textContent='Sound unavailable'} });
  form?.addEventListener('submit',e=>{
    e.preventDefault(); const first=document.querySelector('#first-name').value.trim(); const last=document.querySelector('#last-name').value.trim();
    if(!first||!last){document.querySelector('#welcome-error').textContent='Please enter both your first and last name.';return;}
    const full=`${first} ${last}`; localStorage.setItem('weddingGuestName',full); start(full);
  });
  if(qs.has('skip')){ gate.hidden=true; intro.hidden=true; }
})();
