// assets/js/nt/nt-loader.js
(function () {
  // Thư mục chứa các file con của NT
  const base = "assets/js/nt/";

  // Danh sách file con (chạy theo đúng thứ tự)
  const files = [
    "00-nt-core.js",
    "01-nt-data.js",
    "02-nt-taxonomy.js",
    "03-nt-render.js",
    "04-nt-page.js",
  ];

  // Hàm nạp 1 file script
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Load failed: " + src));
      document.head.appendChild(s);
    });
  }

  // Nạp lần lượt từng file con, rồi gọi init
  async function loadAll() {
    for (const f of files) {
      await loadScript(base + f);
    }

    // Sau khi nạp xong, chạy trang NT
    if (window.MathHub && MathHub.NT && typeof MathHub.NT.init === "function") {
      MathHub.NT.init();
    } else {
      console.warn("[NT] Missing MathHub.NT.init()");
    }
  }

  loadAll().catch(console.error);
})();
