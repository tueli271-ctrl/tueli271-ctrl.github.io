// assets/js/nt/00-nt-core.js
window.MathHub = window.MathHub || {};
MathHub.NT = MathHub.NT || {};

MathHub.NT.util = {
  qs(sel, root = document) { return root.querySelector(sel); },
  qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); },
  slug(s) {
    return String(s).toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  },
  // âm tick không cần file mp3 (chỉ phát khi có user gesture)
  tick(freq = 780, dur = 0.045) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      MathHub._ac = MathHub._ac || new AC();
      const ac = MathHub._ac;

      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.value = freq;

      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(ac.destination);

      const t = ac.currentTime;
      o.start(t);
      g.gain.exponentialRampToValueAtTime(0.10, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.stop(t + dur + 0.01);
    } catch (_) {}
  },
};

MathHub.NT.state = {
  filters: {
    difficulty: new Set(),
    topic: new Set(),
    method: new Set(),
  },
  ui: { open: true },
};
