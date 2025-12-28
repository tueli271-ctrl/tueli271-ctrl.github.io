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
/* NT selected chips: nổi bật màu xanh */
body.theme-nt .tax-chip input:checked + span{
  border-color: var(--accent);
  background: rgba(59,130,246,.22);
  color: rgba(255,255,255,.95);
  box-shadow: 0 0 0 1px rgba(59,130,246,.35),
              0 0 26px rgba(59,130,246,.20);
}
body.theme-nt .tax-chip input:checked + span::before{
  content:"✓";
  font-weight: 950;
  opacity: .9;
}
