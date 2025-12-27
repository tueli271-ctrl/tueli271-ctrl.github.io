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
    panel.addEventListener("change", () => {
      MathHub.NT.readFilterState();
      MathHub.NT.renderList();
    });
  }

  // 6) clear filters
  const clearBtn = qs("#ntClearFilters");
  if (clearBtn && panel) {
    clearBtn.addEventListener("click", () => {
      qsa('#ntTaxPanel input[type="checkbox"]').forEach(i => (i.checked = false));
      MathHub.NT.readFilterState();
      MathHub.NT.renderList();
    });
  }
};
