// assets/js/nt/nt-loader.js
(function () {
  const base = new URL("./", document.currentScript.src).toString();

  const files = [
    "00-nt-core.js",
    "01-nt-data.js",
    "02-nt-taxonomy.js",
    "03-nt-render.js",
    "04-nt-page.js",
  ];

  function loadScript(name) {
    const src = base + name;
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = false; // giữ thứ tự
      s.onload = () => resolve(src);
      s.onerror = () => reject(new Error("NT load failed: " + src));
      document.head.appendChild(s);
    });
  }

  function domReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  (async function () {
    try {
      for (const f of files) await loadScript(f);

      domReady(() => {
        if (window.MathHub && MathHub.NT && typeof MathHub.NT.init === "function") {
          MathHub.NT.init();
        } else {
          console.warn("[NT] MathHub.NT.init() missing");
        }
      });
    } catch (err) {
      console.error(err);

      const msg = `
        <div style="padding:12px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,0,0,.08)">
          <b>NT Loader lỗi:</b> ${String(err.message)}
          <div style="margin-top:8px;opacity:.85">Kiểm tra lại tên file / đường dẫn trong assets/js/nt/</div>
        </div>`;

      const panel = document.getElementById("ntTaxPanel");
      const list = document.getElementById("ntList");
      if (panel) panel.innerHTML = msg;
      if (list) list.innerHTML = msg;
      if (!panel && !list) document.body.insertAdjacentHTML("afterbegin", msg);
    }
  })();
})();
