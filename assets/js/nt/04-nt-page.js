// assets/js/nt/04-nt-page.js
MathHub.NT.init = function initNT() {
  const { qs, qsa } = MathHub.NT;

  // 1) build taxonomy từ posts
  if (typeof MathHub.NT.buildTaxonomy === "function") {
    MathHub.NT.buildTaxonomy();
  }

  // 2) render taxonomy panel
  MathHub.NT.renderTaxPanel();

  // 3) render list lần đầu
  MathHub.NT.readFilterState();
  MathHub.NT.renderList();

  // 4) toggle panel
  const toggleBtn = qs("#ntTaxToggle");
  const panel = qs("#ntTaxPanel");
  if (toggleBtn && panel) {
    toggleBtn.addEventListener("click", () => {
      panel.classList.toggle("tax-hidden");
    });
  }

  // 5) filter change
  if (panel) {
  panel.addEventListener("change", (e) => {
    // SFX (nếu có)
    if (window.MathHub && MathHub.SFX && typeof MathHub.SFX.play === "function") {
      const t = e.target;
      if (t && t.matches && t.matches('input[type="checkbox"]')) {
        MathHub.SFX.play(t.checked ? "select" : "unselect");
      } else {
        MathHub.SFX.play("click");
      }
    }

    MathHub.NT.readFilterState();
    MathHub.NT.renderList();
  });
}


  // 6) clear filters
  const clearBtn = qs("#ntClearFilters");
  if (clearBtn && panel) {
    clearBtn.addEventListener("click", () => {
  qsa('#ntTaxPanel input[type="checkbox"]').forEach(i => (i.checked = false));

  // SFX
  if (window.MathHub && MathHub.SFX && typeof MathHub.SFX.play === "function") {
    MathHub.SFX.play("clear");
  }

  MathHub.NT.readFilterState();
  MathHub.NT.renderList();
});
