// app.js - MathHub core (dispatcher) + particles
window.MathHub = window.MathHub || {};

// ===============
// 1) Particles
// ===============
MathHub.initParticles = function initParticles(){
  const canvas = document.getElementById("bg");
  if(!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W=0, H=0, DPR=1;
  function resize(){
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  resize();
  window.addEventListener("resize", resize);

  if (reduced){
    ctx.clearRect(0,0,W,H);
    return;
  }

  const N = Math.min(90, Math.floor((W*H)/14000));
  const pts = [];
  for(let i=0;i<N;i++){
    pts.push({
      x: Math.random()*W,
      y: Math.random()*H,
      vx:(Math.random()-.5)*0.45,
      vy:(Math.random()-.5)*0.45,
      r: 1 + Math.random()*1.6
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);

    ctx.globalAlpha = 0.9;
    for(const p of pts){
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fill();
    }

    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const a = pts[i], b = pts[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const d2 = dx*dx+dy*dy;
        if(d2 < 140*140){
          const t = 1 - Math.sqrt(d2)/140;
          ctx.strokeStyle = `rgba(255,255,255,${0.12*t})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
};

// =======================
// 2) Nav highlight (optional)
// =======================
MathHub.initNavActive = function initNavActive(){
  const links = document.querySelectorAll(".navlinks a");
  if(!links.length) return;

  const path = location.pathname.split("/").pop() || "index.html";
  links.forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if(href === path) a.classList.add("is-active");
  });
};

// =======================
// 3) Page registry (future-proof)
// =======================
MathHub.pages = MathHub.pages || {};
MathHub.registerPage = function(name, fn){
  MathHub.pages[name] = fn;
};

// =======================
// 4) Boot: tự chạy khi load trang
// =======================
MathHub.boot = function boot(){
  // tác vụ chung
  MathHub.initParticles();
  MathHub.initNavActive();

  // tác vụ theo trang (nếu có)
  const page = document.body && document.body.dataset ? document.body.dataset.page : "";
  const fn = page ? MathHub.pages[page] : null;
  if(typeof fn === "function") fn();
};

document.addEventListener("DOMContentLoaded", () => MathHub.boot());
