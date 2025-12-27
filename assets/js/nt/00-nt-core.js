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
