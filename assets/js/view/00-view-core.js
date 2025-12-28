// assets/js/view/00-view-core.js
window.MathHub = window.MathHub || {};
MathHub.View = MathHub.View || {};

MathHub.View.qs = function qs(sel, root = document) { return root.querySelector(sel); };
MathHub.View.qsa = function qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); };

MathHub.View.escHtml = function escHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

MathHub.View.loadScript = function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(src);
    s.onerror = () => reject(new Error("Load failed: " + src));
    document.head.appendChild(s);
  });
};

MathHub.View.typeset = async function typeset(el) {
  if (window.MathJax && typeof MathJax.typesetPromise === "function") {
    try { await MathJax.typesetPromise([el]); } catch {}
  }
};

MathHub.View.setThemeFromSrc = function setThemeFromSrc(src) {
  const body = document.body;
  body.classList.remove("theme-algebra", "theme-combi", "theme-geo", "theme-nt", "theme-home");
  if (src === "algebra") body.classList.add("theme-algebra");
  else if (src === "combi") body.classList.add("theme-combi");
  else if (src === "geo") body.classList.add("theme-geo");
  else body.classList.add("theme-nt");
};
