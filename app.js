document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');let f=b.dataset.filter;document.querySelectorAll('.card').forEach(c=>c.style.display=(f==='all'||c.classList.contains(f))?'block':'none')});
document.querySelectorAll('[data-go]').forEach(a=>a.onclick=()=>setTimeout(()=>document.querySelector(`.filters [data-filter="${a.dataset.go}"]`)?.click(),150));
const scene=document.querySelector('#scene-image');if(scene){document.querySelectorAll('[data-scene]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-scene]').forEach(x=>x.classList.remove('active'));b.classList.add('active');scene.style.opacity=.2;setTimeout(()=>{scene.src=b.dataset.scene==='day'?'assets/images/bedtime-1.webp':'assets/images/bedtime-5.webp';scene.style.opacity=1},180)})}
document.querySelectorAll('video[muted]').forEach(v=>{const play=()=>v.play().catch(()=>{});v.addEventListener('mouseenter',play);v.addEventListener('touchstart',play,{passive:true})});
lb.querySelector(".lightbox-close")?.addEventListener("click",close);
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&lb.classList.contains("open")) close(); });
});

function closePortfolioLightbox(lb){
  if(!lb) return;
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden","true");
  const image=lb.querySelector("img");
  if(image) image.src="";
  document.body.style.overflow="";
}

document.querySelectorAll(".zoomable").forEach(img=>{
  img.addEventListener("click",e=>{
    const lb=document.querySelector("#lightbox");
    if(!lb) return;
    const target=lb.querySelector("img");
    if(!target) return;
    target.src=img.currentSrc||img.src;
    target.alt=img.alt||"Expanded portfolio image";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    e.preventDefault();
    e.stopPropagation();
  });
});

document.querySelectorAll(".lightbox").forEach(lb=>{
  lb.querySelector(".lightbox-close")?.addEventListener("click",e=>{
    e.preventDefault();
    e.stopPropagation();
    closePortfolioLightbox(lb);
  });
  lb.addEventListener("click",e=>{
    if(e.target===lb) closePortfolioLightbox(lb);
  });
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    const lb=document.querySelector(".lightbox.open");
    if(lb) closePortfolioLightbox(lb);
  }
});

const v3Scene=document.querySelector("#v3-scene-image");
if(v3Scene){
  const title=document.querySelector("#v3-scene-title");
  const subtitle=document.querySelector("#v3-scene-subtitle");
  document.querySelectorAll("[data-v3-scene]").forEach(button=>{
    button.addEventListener("click",()=>{
      document.querySelectorAll("[data-v3-scene]").forEach(x=>x.classList.remove("active"));
      button.classList.add("active");
      const isDay=button.dataset.v3Scene==="day";
      v3Scene.style.opacity=".25";
      setTimeout(()=>{
        v3Scene.src=isDay ? "assets/images/v3/day-wide.webp" : "assets/images/v3/night-wide.webp";
        v3Scene.alt=isDay ? "Bedroom during the day" : "Bedroom at night";
        if(title) title.textContent=isDay ? "COMFORT" : "UNEASE";
        if(subtitle) subtitle.textContent=isDay ? "The room in daylight" : "The same space after dark";
        v3Scene.style.opacity="1";
      },160);
    });
  });
}
