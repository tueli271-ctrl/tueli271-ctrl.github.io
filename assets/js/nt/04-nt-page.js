// assets/js/nt/04-nt-page.js
window.MathHub = window.MathHub || {};
MathHub.NT = MathHub.NT || {};

(function () {
  const U = MathHub.NT.util;

  MathHub.NT.readFilterState = function readFilterState() {
    const st = MathHub.NT.state;
    st.filters.difficulty.clear();
    st.filters.topic.clear();
    st.filters.method.clear();

    U.qsa("#ntTaxPanel input[type='checkbox']").forEach(inp => {
      if (!inp.checked) return;
      const g = inp.getAttribute("data-group");
      const v = inp.value;
      if (g && st.filters[g]) st.filters[g].add(v);
    });
  };

  MathHub.NT.bindEvents = function bindEvents() {
    const toggleBtn = U.qs("#ntToggleTax");
    const clearBtn = U.qs("#ntClearFilters");
    const taxPanel = U.qs("#ntTaxPanel");

    // toggle panel
    if (toggleBtn && taxPanel) {
      toggleBtn.addEventListener("click", () => {
        U.tick(740, 0.05);
        MathHub.NT.state.ui.open = !MathHub.NT.state.ui.open;
        taxPanel.style.display = MathHub.NT.state.ui.open ? "" : "none";
      });
    }

    // change filters (delegation)
    if (taxPanel) {
      taxPanel.addEventListener("change", (e) => {
        if (e.target && e.target.matches("input[type='checkbox']")) {
          U.tick(820, 0.045);
          MathHub.NT.readFilterState();
          MathHub.NT.renderList();
        }
      });

      // thêm tick ngay lúc click label (mượt hơn)
      taxPanel.addEventListener("click", (e) => {
        const lab = e.target && e.target.closest && e.target.closest(".tax-chip");
        if (lab) U.tick(820, 0.03);
      });
    }

    // clear filters
    if (clearBtn && taxPanel) {
      clearBtn.addEventListener("click", () => {
        U.tick(520, 0.07);
        U.qsa("#ntTaxPanel input[type='checkbox']").forEach(i => (i.checked = false));
        MathHub.NT.readFilterState();
        MathHub.NT.renderList();
      });
    }
  };

  MathHub.NT.init = function init() {
    // 1) render taxonomy
    MathHub.NT.renderTaxonomy();

    // 2) bind events
    MathHub.NT.bindEvents();

    // 3) render list lần đầu
    MathHub.NT.readFilterState();
    MathHub.NT.renderList();
  };
})();
