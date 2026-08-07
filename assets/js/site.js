const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
$('.menu-btn')?.addEventListener('click',()=>$('.nav')?.classList.toggle('open'));
$$('.nav a').forEach(a=>{if(location.pathname.endsWith(a.getAttribute('href')))a.classList.add('active')});
const guest=JSON.parse(localStorage.getItem('harrisonGuest')||'null');
$$('[data-guest-name]').forEach(el=>el.textContent=guest?.first?guest.first:'Guest');
