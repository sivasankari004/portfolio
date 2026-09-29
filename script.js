/* ===== Shared JS: nav/footer injection, theme, typing, reveal, particles ===== */
const pages=[['index','Home'],['about','About'],['skills','Skills'],['projects','Projects'],['experience','Experience'],['contact','Contact']];
const current=document.body.dataset.page;

// Inject navbar + footer (one source of truth for every page)
document.getElementById('site-header').innerHTML=`<div class="container nav">
 <a class="logo grad-text" href="index.html">&lt;Sivasankari/&gt;</a>
 <nav class="links" id="links">${pages.map(([f,n])=>`<a href="${f}.html" class="${f===current?'active':''}">${n}</a>`).join('')}</nav>
 <div class="tools"><button class="icon-btn" id="theme" aria-label="Toggle theme">☀</button>
 <button class="icon-btn menu-btn" id="menu" aria-label="Menu">☰</button></div></div>`;
document.getElementById('site-footer').innerHTML=`<div class="container"><p>© ${new Date().getFullYear()} Sivasankari S · Junior DevOps Engineer · Pondicherry, India</p></div>`;

// Mobile menu
document.getElementById('menu').onclick=()=>document.getElementById('links').classList.toggle('open');

// Theme toggle (saved in localStorage)
const root=document.documentElement,tBtn=document.getElementById('theme');
function setTheme(t){root.dataset.theme=t;tBtn.textContent=t==='dark'?'☀':'🌙';try{localStorage.setItem('theme',t)}catch(e){}}
let saved='dark';try{saved=localStorage.getItem('theme')||'dark'}catch(e){}
setTheme(saved);
tBtn.onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');

// Scroll reveal + animated skill bars
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');
 e.target.querySelectorAll('.bar span').forEach(b=>b.style.width=b.dataset.w+'%');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Typing animation
const typed=document.getElementById('typed');
if(typed){const words=['Junior DevOps Engineer','CI/CD Enthusiast','Docker & Jenkins Learner','Cloud Explorer'];let w=0,c=0,del=false;
 (function tick(){const s=words[w];typed.textContent=s.slice(0,c);
  if(!del&&c===s.length){del=true;return setTimeout(tick,1400)}
  if(del&&c===0){del=false;w=(w+1)%words.length}
  c+=del?-1:1;setTimeout(tick,del?40:90)})();}

// Particle background (hero)
const cv=document.getElementById('particles');
if(cv){const x=cv.getContext('2d');let P=[];
 const size=()=>{cv.width=cv.offsetWidth;cv.height=cv.offsetHeight};size();addEventListener('resize',size);
 for(let i=0;i<55;i++)P.push({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.6,vy:(Math.random()-.5)*.6});
 (function draw(){x.clearRect(0,0,cv.width,cv.height);
  P.forEach((p,i)=>{p.x=(p.x+p.vx+cv.width)%cv.width;p.y=(p.y+p.vy+cv.height)%cv.height;
   x.fillStyle='rgba(34,211,238,.7)';x.beginPath();x.arc(p.x,p.y,2,0,7);x.fill();
   for(let j=i+1;j<P.length;j++){const d=Math.hypot(p.x-P[j].x,p.y-P[j].y);
    if(d<110){x.strokeStyle=`rgba(109,93,252,${1-d/110})`;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(P[j].x,P[j].y);x.stroke()}}});
  requestAnimationFrame(draw)})();}

// Contact form -> opens visitor's email app (no backend needed)
const f=document.getElementById('contact-form');
if(f)f.onsubmit=e=>{e.preventDefault();const d=new FormData(f);
 location.href=`mailto:ssivasankarisivasankari2004@gmail.com?subject=${encodeURIComponent(d.get('subject'))}&body=${encodeURIComponent(d.get('message')+'\n\n— '+d.get('name')+' ('+d.get('email')+')')}`;};