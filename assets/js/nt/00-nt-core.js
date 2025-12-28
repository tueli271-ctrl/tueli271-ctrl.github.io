// assets/js/nt/00-nt-core.js
window.MathHub = window.MathHub || {};
MathHub.NT = MathHub.NT || {};

// Helpers
MathHub.NT.qs = (sel, root) => (root || document).querySelector(sel);
MathHub.NT.qsa = (sel, root) => Array.from((root || document).querySelectorAll(sel));

MathHub.NT.state = {
  diff: new Set(),    // độ khó
  topic: new Set(),   // thể loại
  method: new Set(),  // cách làm
};

MathHub.NT.util = {
  slug(s) {
    return String(s).trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]/g, "");
  },
  uniq(arr) {
    return Array.from(new Set(arr.filter(Boolean)));
  }
};
// ===== SFX (WebAudio) =====
MathHub.SFX = MathHub.SFX || (function(){
  let ctx = null;
  let enabled = true;

  function ensure(){
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    return ctx;
  }

  async function unlock(){
    const c = ensure();
    if (!c) return;
    if (c.state === "suspended") {
      try { await c.resume(); } catch(e) {}
    }
  }

  function tone(freq, dur, vol){
    const c = ensure();
    if (!c) return;

    // cố gắng resume ngay trong gesture
    if (c.state === "suspended") { c.resume().catch(()=>{}); }

    const o = c.createOscillator();
    const g = c.createGain();

    o.type = "triangle";
    o.frequency.value = freq;

    const t0 = c.currentTime;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    o.connect(g);
    g.connect(c.destination);

    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }

  function play(kind){
    if (!enabled) return;
    if (kind === "toggle") return tone(520, 0.07, 0.06);
    if (kind === "select") return tone(760, 0.06, 0.06);
    if (kind === "unselect") return tone(420, 0.06, 0.05);
    if (kind === "clear") return tone(300, 0.08, 0.06);
    if (kind === "open") return tone(680, 0.06, 0.06);
    return tone(560, 0.06, 0.05);
  }

  // unlock ngay lần chạm đầu tiên
  window.addEventListener("pointerdown", () => unlock(), { once:true });

  return { play, unlock, setEnabled(v){ enabled = !!v; } };
})();
