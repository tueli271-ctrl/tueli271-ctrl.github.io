// assets/js/view/03-view-page.js
(function () {
  window.MathHub = window.MathHub || {};
  MathHub.View = MathHub.View || {};

  // 1) Tạo khung HTML cho view nếu view.html không có gì
  MathHub.View.ensureShell = function ensureShell() {
    // Nếu đã có viewTitle thì coi như shell đã có
    if (document.getElementById("viewTitle")) return;

    // body classes: nếu chưa có theme thì mặc định nt
    if (!document.body.className) document.body.className = "theme-nt";

    // background layer nếu thiếu
    if (!document.querySelector(".bg-aurora")) {
      const aurora = document.createElement("div");
      aurora.className = "bg-aurora";
      document.body.prepend(aurora);
    }
    if (!document.getElementById("bg")) {
      const cv = document.createElement("canvas");
      cv.id = "bg";
      document.body.prepend(cv);
    }

    // Topbar tối giản (optional)
    if (!document.querySelector(".topbar")) {
      const header = document.createElement("header");
      header.className = "topbar";
      header.innerHTML = `
        <div class="inner">
          <div class="brand">
            <div class="logo"><img src="/favicon.png" alt="logo"></div>
            <div>Math Hub</div>
          </div>
          <nav class="navlinks">
            <a class="pill" href="/index.html">Trang chủ</a>
            <a class="pill" href="/algebra.html">Đại số</a>
            <a class="pill" href="/combi.html">Tổ hợp</a>
            <a class="pill" href="/geo.html">Hình học</a>
            <a class="pill" href="/nt.html">Số học</a>
          </nav>
        </div>
      `;
      document.body.prepend(header);
    }

    // Main shell
    const main = document.createElement("main");
    main.className = "wrap";
    main.innerHTML = `
      <section class="panel pagehead">
        <div class="left">
          <h1 id="viewTitle">Đang tải…</h1>
          <p id="viewSubtitle"></p>
          <div class="tax-mini" id="viewTags" style="margin-top:10px;"></div>
        </div>
        <div class="badge" id="viewBadge"><span class="dot"></span> View</div>
      </section>

      <section class="panel section">
        <h2>📌 Đề bài</h2>
        <div class="post" id="viewStatement">Đang tải đề…</div>
      </section>

      <section class="panel section" id="solutionPanel" style="display:none;">
        <h2>✅ Lời giải</h2>
        <div class="post" id="viewSolution"></div>
      </section>

      <footer>© 2025 • Math Hub</footer>
    `;
    document.body.appendChild(main);
  };

  // 2) Init page: đọc query -> load post -> render
  MathHub.View.init = async function init() {
    try {
      MathHub.View.ensureShell();

      // Lấy src/id từ URL
      const url = new URL(location.href);
      const src = (url.searchParams.get("src") || "nt").trim();
      const id = Number(url.searchParams.get("id") || "0");

      if (!id) {
        MathHub.View.render.renderError("Thiếu id. Ví dụ: view.html?src=nt&id=1");
        return;
      }

      // Lấy post từ nguồn (01-view-sources.js phải có getPost)
      const post = await MathHub.View.sources.getPost(src, id);
      if (!post) {
        MathHub.View.render.renderError(`Không tìm thấy bài id=${id} (src=${src})`);
        return;
      }

      await MathHub.View.render.renderPost({ post, src });

      // Nếu không có lời giải thì ẩn panel lời giải
      const solPanel = document.getElementById("solutionPanel");
      if (!post.solution || String(post.solution).trim() === "") {
        if (solPanel) solPanel.style.display = "none";
      } else {
        if (solPanel) solPanel.style.display = "";
      }

    } catch (e) {
      console.error(e);
      MathHub.View.render && MathHub.View.render.renderError
        ? MathHub.View.render.renderError(String(e.message || e))
        : alert(String(e.message || e));
    }
  };
})();
