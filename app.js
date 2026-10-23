const $=s=>document.querySelector(s),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const E=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const ago=t=>{const s=(Date.now()-t)/1e3;if(s<60)return"just now";if(s<3600)return~~(s/60)+"m ago";if(s<86400)return~~(s/3600)+"h ago";return~~(s/86400)+"d ago"};
async function typeTo(el,txt,ms){for(const ch of txt){el.textContent+=ch;await sleep(ms)}}
async function post(url,data){const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||"Gagal");return j}
function say(el,t,ok){el.textContent=t;el.style.color=ok?"#4ade80":"#f87171"}
(async()=>{
const c=await fetch("/api/config").then(r=>r.json()).catch(()=>null);
if(!c){$("#sp").textContent="Gagal memuat config";return}
document.title=c.title;$("meta[name=description]").content=c.description;
$("#logo").textContent=c.brand;$("#badge").textContent="✦ "+c.badge;
c.heroTitle.forEach(w=>$("#h1").append(E("span",0,w)));$("#heroText").textContent=c.heroText;
$("#aboutTitle").textContent=c.aboutTitle;$("#aboutSub").textContent="✦ "+c.aboutSubtitle+" ✦";$("#who").textContent=c.fullName.replace(" Portofolio","");
$("#aboutText").textContent=c.aboutText;$("#quote").textContent="“"+c.quote+"”";
$("#shTitle").textContent=c.showcaseTitle;$("#shText").textContent=c.showcaseText;$("#ctTitle").textContent=c.contactTitle;$("#ctText").textContent=c.contactText;$("#foot").textContent=c.footer;
const ph=$("#photo");ph.src=c.photo;ph.onerror=()=>{ph.onerror=null;ph.src="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="#1b1840"/><text x="5" y="6.8" font-size="5" text-anchor="middle" fill="#a855f7" font-family="sans-serif">'+c.brand[0]+"</text></svg>")};
c.stats.forEach(s=>{const d=E("div","stat");d.append(E("i",0,s.icon),E("b",0,String(s.value).replace("{projects}",c.projects.length)),E("small",0,s.label),E("small",0,s.desc));$("#stats").append(d)});
c.projects.forEach(p=>{const d=E("div","pj");if(p.image){const i=E("img");i.src=p.image;i.alt=p.title;i.loading="lazy";i.decoding="async";d.append(i)}
const dt=E("p",0,p.details);dt.hidden=true;const b=E("button",0,"Details →");b.onclick=()=>{dt.hidden=!dt.hidden;b.textContent=dt.hidden?"Details →":"Close ✕"};
const a=E("a",0,"Live Demo ↗");a.href=p.demo;a.target="_blank";a.rel="noopener";const r=E("div","row");r.append(a,b);d.append(E("h3",0,p.title),E("p",0,p.desc),dt,r);$("#projects").append(d)});
c.techStack.forEach(t=>$("#tech").append(E("span",0,t)));
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("on",x===b));$("#projects").hidden=b.dataset.t!=="projects";$("#tech").hidden=b.dataset.t!=="tech"});
c.socials.forEach(s=>{const a=E("a","soc");a.href=s.url;a.target="_blank";a.rel="noopener";const i=E("i",0,s.icon);i.style.background=s.color+"33";i.style.color=s.color;const d=E("div");d.append(E("b",0,s.name),E("small",0,s.desc));a.append(i,d);$("#socials").append(a)});
$("#burger").onclick=()=>$("#menu").classList.toggle("open");$("#menu").onclick=()=>$("#menu").classList.remove("open");
// welcome splash (teks ngetik)
(async()=>{const sp=$("#splash"),w=c.welcomeText;let skip=false;const done=()=>{sp.classList.add("hide");setTimeout(()=>sp.remove(),800)};
if(sessionStorage.getItem("seen")||matchMedia("(prefers-reduced-motion:reduce)").matches)return done();
sp.onclick=()=>skip=true;let i=0;for(const ch of w){if(skip)break;$("#sp").textContent+=ch;$("#pg").style.transform=`scaleX(${++i/w.length})`;await sleep(65)}
$("#sp").textContent=w;$("#pg").style.transform="scaleX(1)";if(!skip)await sleep(600);sessionStorage.setItem("seen",1);done()})();
// typing roles loop
(async()=>{const el=$("#typed");for(;;)for(const r of c.roles){await typeTo(el,r,80);await sleep(1400);while(el.textContent){el.textContent=el.textContent.slice(0,-1);await sleep(40)}await sleep(300)}})();
// comments
let photo="";
const render=list=>{const box=$("#comments");box.innerHTML="";const pin=E("div","cm pin");const top=E("div");top.style.cssText="display:flex;gap:14px;align-items:center;margin-top:10px";
const av=E("div","av",c.adminComment.name[0]);const nm=E("div","h");nm.append(E("span",0,c.adminComment.name));nm.firstChild.append(E("span","adm","Admin"));const bx=E("div");bx.append(nm,E("p",0,c.adminComment.text));top.append(av,bx);
pin.append(E("small",0,"📌 PINNED COMMENT"),top);box.append(pin);
list.forEach(m=>{const d=E("div","cm");const a=m.photo?E("img"):E("div","av","👤");if(m.photo){a.src=m.photo;a.alt=""}const b=E("div");b.style.flex="1";const h=E("div","h");h.append(E("span",0,m.name),E("small",0,ago(m.t)));b.append(h,E("p",0,m.text));d.append(a,b);box.append(d)});
$("#ccount").textContent="("+(list.length+1)+")"};
const load=()=>fetch("/api/comments").then(r=>r.json()).then(l=>render(Array.isArray(l)?l:[])).catch(()=>render([]));load();
$("#pf").onchange=e=>{const f=e.target.files[0];if(!f)return;if(f.size>5*1048576){say($("#mmsg"),"Ukuran foto maksimal 5MB");e.target.value="";return}
const im=new Image();im.onload=()=>{const cv=document.createElement("canvas");cv.width=cv.height=128;const x=cv.getContext("2d"),s=Math.min(im.width,im.height);x.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,128,128);photo=cv.toDataURL("image/jpeg",.7);$("#pfn").textContent="✔ "+f.name};im.src=URL.createObjectURL(f)};
$("#mform").onsubmit=async e=>{e.preventDefault();const f=e.target;try{await post("/api/comments",{name:f.name.value,text:f.text.value,photo,website:f.website.value});f.reset();photo="";$("#pfn").textContent="🖼 Choose Profile Photo";say($("#mmsg"),"Komentar terkirim",1);load()}catch(x){say($("#mmsg"),x.message)}};
$("#cform").onsubmit=async e=>{e.preventDefault();const f=e.target;try{await post("/api/contact",{name:f.name.value,email:f.email.value,message:f.message.value,website:f.website.value});f.reset();say($("#cmsg"),"Pesan terkirim. Terima kasih!",1)}catch(x){say($("#cmsg"),x.message)}};
// efek: progress scroll, tombol ke atas, menu aktif, reveal (ringan, tanpa library)
const bar=$("#bar"),top=$("#top");let tk=false;
addEventListener("scroll",()=>{if(tk)return;tk=true;requestAnimationFrame(()=>{const h=document.documentElement;bar.style.transform=`scaleX(${scrollY/((h.scrollHeight-innerHeight)||1)})`;top.classList.toggle("show",scrollY>600);tk=false})},{passive:true});
top.onclick=()=>scrollTo({top:0,behavior:"smooth"});
if("IntersectionObserver"in window){const links=[...document.querySelectorAll("#menu a")];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle("act",l.hash==="#"+e.target.id))}),{rootMargin:"-40% 0px -55% 0px"});document.querySelectorAll("main section").forEach(s=>so.observe(s));
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");ro.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".stat,.pj,.soc,.card,blockquote,.photo").forEach(e=>{e.classList.add("rv");ro.observe(e)})}
})();
