// assets/js/nt/03-nt-render.js
MathHub.NT.renderTaxPanel = function renderTaxPanel() {
  const { qs, util } = MathHub.NT;
  const panel = qs("#ntTaxPanel");
  if (!panel) return;

  const T = MathHub.NT.taxonomy || { difficulties: [], topics: [], methods: [] };

  function chip(group, value) {
    const id = `nt-${group}-${util.slug(value)}`;
    return `
      <label class="tax-chip" for="${id}">
        <input type="checkbox" data-group="${group}" value="${value}" id="${id}">
        <span>${value}</span>
      </label>
    `;
  }

  panel.innerHTML = `
    <div class="taxgrid">
      <div class="taxcol">
        <h3>Độ khó</h3>
        <div class="taxchips">
          ${T.difficulties.map(v => chip("diff", v)).join("")}
        </div>
      </div>

      <div class="taxcol">
        <h3>Thể loại</h3>
        <div class="taxchips">
          ${T.topics.map(v => chip("topic", v)).join("")}
        </div>
      </div>

      <div class="taxcol">
        <h3>Cách làm</h3>
        <div class="taxchips">
          ${T.methods.map(v => chip("method", v)).join("")}
        </div>
      </div>
    </div>
  `;
};

MathHub.NT.readFilterState = function readFilterState() {
  const { qsa, state } = MathHub.NT;

  state.diff.clear();
  state.topic.clear();
  state.method.clear();

  qsa('#ntTaxPanel input[type="checkbox"]:checked').forEach(inp => {
    const g = inp.dataset.group;
    const v = inp.value;
    if (g === "diff") state.diff.add(v);
    if (g === "topic") state.topic.add(v);
    if (g === "method") state.method.add(v);
  });
};

MathHub.NT.matchPost = function matchPost(p) {
  const st = MathHub.NT.state;

  const okDiff  = st.diff.size  ? st.diff.has(p.difficulty) : true;
  const okTopic = st.topic.size ? st.topic.has(p.topic) : true;

  let okMethod = true;
  if (st.method.size) {
    const arr = Array.isArray(p.method) ? p.method : [];
    okMethod = arr.some(m => st.method.has(m));
  }

  return okDiff && okTopic && okMethod;
};

MathHub.NT.renderList = function renderList() {
  const { qs } = MathHub.NT;
  const list = qs("#ntList");
  if (!list) return;

  const items = (MathHub.NT.posts || []).filter(MathHub.NT.matchPost);

  if (!items.length) {
    list.innerHTML = `<div style="color:rgba(255,255,255,.75)">Không có bài nào khớp bộ lọc.</div>`;
    return;
  }

  list.innerHTML = items.map(p => `
    <a class="postrow" href="${p.href || "view.html"}">
      <div class="num">${p.num || ""}</div>
      <div class="label">
        ${p.title || "Bài"}
        <div class="tax-mini">
          ${p.difficulty ? `<span class="tax-pill"><span class="dot"></span>${p.difficulty}</span>` : ""}
          ${p.topic ? `<span class="tax-pill"><span class="dot"></span>${p.topic}</span>` : ""}
        </div>
      </div>
      <div class="go">→</div>
    </a>
  `).join("");
};
