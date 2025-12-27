// Math Hub background particles (Canvas)
// Chạy tốt trên GitHub Pages (static)

(function () {
  function hexToRgb(hex){
    const h = hex.replace('#','').trim();
    if(h.length !== 6) return {r:255,g:255,b:255};
    return {
      r: parseInt(h.slice(0,2),16),
      g: parseInt(h.slice(2,4),16),
      b: parseInt(h.slice(4,6),16),
    };
  }

  function getAccentColor(){
    const cs = getComputedStyle(document.body);
    // ưu tiên accent1; nếu trang home có 4 màu thì lấy accent1 cũng ổn
    const c = cs.getPropertyValue('--accent1').trim() || '#ffffff';
    return c;
  }

  function initParticles(){
    const canvas = document.getElementById('bg');
    if(!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const accent = getAccentColor();
    const rgb = hexToRgb(accent);

    const N = Math.max(45, Math.floor((w*h) / 35000));
    const pts = [];
    const rand = (a,b)=> a + Math.random()*(b-a);

    for(let i=0;i<N;i++){
      pts.push({
        x: rand(0,w),
        y: rand(0,h),
        vx: rand(-0.35,0.35),
        vy: rand(-0.35,0.35),
        r: rand(1.2, 2.8)
      });
    }

    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);

    function draw(){
      ctx.clearRect(0,0,w,h);

      // dots
      for(const p of pts){
        p.x += p.vx; p.y += p.vy;
        if(p.x < -30) p.x = w+30;
        if(p.x > w+30) p.x = -30;
        if(p.y < -30) p.y = h+30;
        if(p.y > h+30) p.y = -30;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.20)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      }

      // lines
      for(let i=0;i<pts.length;i++){
        for(let j=i+1;j<pts.length;j++){
          const a = pts[i], b = pts[j];
          const dx = a.x-b.x, dy = a.y-b.y;
          const d2 = dx*dx + dy*dy;
          if(d2 < 160*160){
            const alpha = (1 - Math.sqrt(d2)/160) * 0.12;
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
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

    draw();
  }

  // expose
  window.MathHub = { initParticles };
})();
