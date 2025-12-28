// assets/js/view/view-loader.js
(function () {
  const base = new URL("./", document.currentScript.src).toString();

  const qs = new URLSearchParams(location.search);
  const src = (qs.get("src") || "nt").toLowerCase();

  // Chỉ cần NT trước (sau này thêm algebra/combi/geo thì thêm tiếp)
  const dataset = {
    nt: [
      "/assets/js/nt/00-nt-core.js",
      "/assets/js/nt/01-nt-data.js",
    ],
  };

  const viewFiles = [
    "00-view-core.js",
    "01-view-sources.js",
    "02-view-render.js",
    "03-view-page.js",
  ];

  function loadScript(srcUrl) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = srcUrl;
      s.async = false; // QUAN TRỌNG: giữ đúng thứ tự load
      s.onload = () => resolve(srcUrl);
      s.onerror = () => reject(new Error("Load failed: " + srcUrl));
      document.head.appendChild(s);
    });
  }

  (async function () {
    try {
      // 1) Load data theo src (NT)
      const ds = dataset[src] || dataset.nt;
      for (const f of ds) await loadScript(f);

      // 2) Load view modules
      for (const f of viewFiles) await loadScript(base + f);

      // 3) Init
      if (window.MathHub && MathHub.View && typeof MathHub.View.init === "function") {
        MathHub.View.init();
      } else {
        console.warn("[View] MathHub.View.init() missing");
      }
    } catch (err) {
      console.error(err);
      document.body.innerHTML =
        `<pre style="white-space:pre-wrap;padding:16px">VIEW LOADER ERROR:\n${String(err.message || err)}</pre>`;
    }
  })();
})();
