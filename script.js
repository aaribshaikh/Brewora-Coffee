/* BREWORA — shared behaviour for all pages */
(()=>{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
document.documentElement.classList.add('js');
// Image fallback: keeps layout intact (parent .ph shows a coffee gradient)
$$('img').forEach(i=>{const f=()=>i.style.visibility='hidden';i.addEventListener('error',f);if(i.complete&&!i.naturalWidth)f()});
// Mobile nav
const b=$('.burger'),l=$('.links');
b.addEventListener('click',()=>{const o=l.classList.toggle('open');b.setAttribute('aria-expanded',o)});
$$('.links a').forEach(a=>a.addEventListener('click',()=>{l.classList.remove('open');b.setAttribute('aria-expanded',false)}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){l.classList.remove('open');b.setAttribute('aria-expanded',false)}});
// Sticky header + back to top
const h=$('header'),t=$('#top');
const sc=()=>{h.classList.toggle('solid',scrollY>40);t.classList.toggle('show',scrollY>600)};addEventListener('scroll',sc,{passive:true});sc();
t.addEventListener('click',()=>scrollTo({top:0}));
// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(e=>io.observe(e));
// Menu filter
$$('.filters button').forEach(btn=>btn.addEventListener('click',()=>{
$$('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===btn));
$$('[data-cat]').forEach(c=>c.hidden=btn.dataset.f!=='all'&&c.dataset.cat!==btn.dataset.f)}));
// FAQ accordion
$$('.faq button').forEach(q=>q.addEventListener('click',()=>{const a=document.getElementById(q.getAttribute('aria-controls')),o=q.getAttribute('aria-expanded')!=='true';
q.setAttribute('aria-expanded',o);a.classList.toggle('open',o)}));
// Form validation (shared)
const re=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function check(f){let ok=true,first;$$('[required]',f).forEach(i=>{const e=$('.err',i.parentElement);let m='';
if(!i.value.trim())m='This field is required.';else if(i.type==='email'&&!re.test(i.value.trim()))m='Please enter a valid email address.';
else if(i.name==='message'&&i.value.trim().length<10)m='Please write at least 10 characters.';
e.textContent=m;i.setAttribute('aria-invalid',!!m);if(m){ok=false;first=first||i}});first&&first.focus();return ok}
$$('form[data-demo]').forEach(f=>{f.addEventListener('submit',e=>{e.preventDefault();const s=$('.ok',f.parentElement);s.classList.remove('show');
if(!check(f))return;
/* PRODUCTION NOTE: no backend exists. Nothing is stored or sent. Connect a form service
   (e.g. Formspree, Netlify Forms) or your own server endpoint with fetch() here before launch. */
f.reset();s.classList.add('show')})});
const y=$('#yr');if(y)y.textContent=new Date().getFullYear()})();
