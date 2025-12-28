// assets/js/view/view-loader.js
(function () {
  const base = new URL("./", document.currentScript.src).toString();

  const files = [
    "00-view-core.js",
    "01-view-sources.js",
    "02-view-render.js",
    "03-view-page.js",
  ];

  function loadScript(name) {
    const src = base + name;
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => resolve(src);
      s.onerror = () => reject(new Error("View load failed: " + src));
      document.head.appendChild(s);
    });
  }

  (async function () {
    try {
      for (const f of files) await loadScript(f);

      if (window.MathHub && MathHub.View && typeof MathHub.View.init === "function") {
        MathHub.View.init();
      } else {
        console.warn("[View] MathHub.View.init() missing");
      }
    } catch (err) {
      console.error(err);
      const el = document.getElementById("viewStatement");
      if (el) {
        el.innerHTML = `<div style="padding:12px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,0,0,.08)">
          <b>View Loader lỗi:</b> ${String(err.message)}
          <div style="margin-top:8px;opacity:.85">Kiểm tra lại tên file / đường dẫn trong assets/js/view/</div>
        </div>`;
      }
    }
  })();
})();
