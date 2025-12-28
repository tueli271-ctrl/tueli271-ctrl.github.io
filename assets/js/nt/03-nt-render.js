// assets/js/nt/03-nt-render.js
window.MathHub = window.MathHub || {};
MathHub.NT = MathHub.NT || {};

(function () {
  const U = MathHub.NT.util;

  function chip(group, value) {
    const id = `nt-${group}-${U.slug(value)}`;
    return `
      <label class="tax-chip">
        <input type="checkbox" id="${id}" data-group="${group}" value="${value}">
        <span><span class="dot"></span>${value}</span>
      </label>`;
  }

  MathHub.NT.renderTaxonomy = function renderTaxonomy() {
    const panel = U.qs("#ntTaxPanel");
    if (!panel) return;

    const t = MathHub.NT.taxonomy;
    if (!t) {
      panel.innerHTML = `<div style="opacity:.8">Chưa có taxonomy.</div>`;
      return;
    }

    panel.innerHTML = `
      <div class="taxgrid" id="ntTaxGrid">
        <div class="taxcol">
          <h3>Độ khó</h3>
          <div class="taxchips">
            ${t.difficulties.map(v => chip("difficulty", v)).join("")}
          </div>
        </div>

        <div class="taxcol">
          <h3>Thể loại bài</h3>
          <div class="taxchips">
            ${t.topics.map(v => chip("topic", v)).join("")}
          </div>
        </div>

        <div class="taxcol">
          <h3>Cách làm / kiến thức</h3>
          <div class="taxchips">
            ${t.methods.map(v => chip("method", v)).join("")}
          </div>
        </div>
      </div>
    `;
  };

  function matches(post, state) {
    // difficulty
    if (state.filters.difficulty.size) {
      if (!state.filters.difficulty.has(post.difficulty)) return false;
    }

    // topics
    if (state.filters.topic.size) {
      const ok = (post.topics || []).some(x => state.filters.topic.has(x));
      if (!ok) return false;
    }

    // methods
    if (state.filters.method.size) {
      const ok = (post.methods || []).some(x => state.filters.method.has(x));
      if (!ok) return false;
    }

    return true;
  }

  function miniTags(post) {
    const tags = [
      ...(post.topics || []).slice(0, 2),
      ...(post.methods || []).slice(0, 1),
    ].slice(0, 3);

    if (!tags.length) return "";
    return `
      <div class="tax-mini">
        ${tags.map(t => `<span class="tax-pill"><span class="dot"></span>${t}</span>`).join("")}
      </div>`;
  }

  MathHub.NT.renderList = function renderList() {
    const list = U.qs("#ntList");
    if (!list) return;

    const posts = MathHub.NT.posts || [];
    const st = MathHub.NT.state;

    const filtered = posts.filter(p => matches(p, st));

    const countBadge = U.qs("#ntFilterCount");
    if (countBadge) {
      const c = st.filters.difficulty.size + st.filters.topic.size + st.filters.method.size;
      countBadge.innerHTML = `<span class="dot"></span> ${c} lọc`;
    }

    if (!filtered.length) {
      list.innerHTML = `<div style="opacity:.75;padding:10px 2px">Không có bài phù hợp bộ lọc.</div>`;
      return;
    }

    list.innerHTML = filtered.map(p => `
      <a class="postrow" href="${p.href || "#"}">
        <div class="num">${p.difficulty || "NT"}</div>
        <div>
          <div class="label">${p.title || ("Bài " + p.id)}</div>
          ${miniTags(p)}
        </div>
        <div class="go">→</div>
      </a>
    `).join("");
  };
})();
