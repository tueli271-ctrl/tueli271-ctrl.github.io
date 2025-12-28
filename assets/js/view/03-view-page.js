// assets/js/view/03-view-page.js
MathHub.View.init = function init() {
  const qs = MathHub.View.qs;

  const params = new URLSearchParams(location.search);
  const src = (params.get("src") || "nt").toLowerCase();
  const idRaw = params.get("id");
  const id = idRaw ? Number(idRaw) : NaN;

  // set theme
  MathHub.View.setThemeFromSrc(src);

  // set back link
  const btnBack = qs("#btnBack");
  if (btnBack) btnBack.href = MathHub.View.sources.getBackHref(src);

  // toggle solution (remember)
  const KEY = "mh_view_solution_visible";
  const btnToggle = qs("#btnToggleSolution");
  const solutionPanel = qs("#solutionPanel");
  let visible = (localStorage.getItem(KEY) !== "0");

  function applyVisibility() {
    if (solutionPanel) solutionPanel.style.display = visible ? "" : "none";
    if (btnToggle) btnToggle.textContent = visible ? "Ẩn lời giải" : "Hiện lời giải";
    localStorage.setItem(KEY, visible ? "1" : "0");
  }
  btnToggle && btnToggle.addEventListener("click", () => {
    visible = !visible;
    applyVisibility();
  });
  applyVisibility();

  // validate
  if (!Number.isFinite(id)) {
    MathHub.View.render.renderError("Thiếu hoặc sai id. Ví dụ đúng: view.html?src=nt&id=1");
    return;
  }

  // main async
  (async function () {
    try {
      await MathHub.View.sources.loadDataBySrc(src);

      const posts = MathHub.View.sources.getPostsBySrc(src);
      const post = posts.find(p => Number(p.id) === id);

      if (!post) {
        MathHub.View.render.renderError(`Không tìm thấy bài id=${id} trong src=${src}`);
        return;
      }

      await MathHub.View.render.renderPost({ post, src });

    } catch (err) {
      MathHub.View.render.renderError(String(err.message || err));
    }
  })();
};
