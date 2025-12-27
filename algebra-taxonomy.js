// algebra-taxonomy.js
(function () {
  function qs(sel, root){ return (root || document).querySelector(sel); }
  function uniq(arr){
    return [...new Set(arr.filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),"vi"));
  }
  function esc(s){
    return String(s)
      .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
      .replaceAll('"',"&quot;").replaceAll("'","&#039;");
  }

  function buildTax(posts){
    return {
      difficulties: uniq(posts.map(p => p.difficulty)),
      topics: uniq(posts.map(p => p.topic)),
      methods: uniq(posts.flatMap(p => Array.isArray(p.methods) ? p.methods : [])),
    };
  }

  function renderChips(container, items, group){
    container.innerHTML = items.map(label => {
      const id = `${group}-${label}`.replace(/\s+/g,"_").replace(/[^\w\-]/g,"");
      return `
        <label class="tax-chip" for="${id}">
          <input id="${id}" type="checkbox" data-group="${group}" value="${esc(label)}" />
          <span>${esc(label)}</span>
        </label>
      `;
    }).join("");
  }

  function readSelected(panel){
    const sel = { difficulty: new Set(), topic: new Set(), methods: new Set() };
    panel.querySelectorAll('input[type="checkbox"]:checked').forEach(cb=>{
      const g = cb.dataset.group;
      if (g === "difficulty") sel.difficulty.add(cb.value);
      if (g === "topic") sel.topic.add(cb.value);
      if (g === "methods") sel.methods.add(cb.value);
    });
    return sel;
  }

  // Match logic:
  // - difficulty: OR
  // - topic: OR
  // - methods: OR (dễ dùng). Nếu muốn AND thì đổi some -> every.
  function match(post, sel){
    const okD = sel.difficulty.size===0 || sel.difficulty.has(post.difficulty);
    const okT = sel.topic.size===0 || sel.topic.has(post.topic);

    const ms = Array.isArray(post.methods) ? post.methods : [];
    const okM = sel.methods.size===0 || [...sel.methods].some(x => ms.includes(x));

    return okD && okT && okM;
  }

  function renderList(container, posts){
    if (!posts.length){
      container.innerHTML = `
        <div class="postrow" style="justify-content:center; opacity:.75;">
          Không có bài phù hợp bộ lọc.
        </div>
      `;
      return;
    }

    container.innerHTML = posts.map((p, idx) => {
      const num = String(idx+1).padStart(2,"0");
      const methods = Array.isArray(p.methods) ? p.methods : [];
      const methodLine = methods.length
        ? `<div class="tax-mini">${methods.slice(0,4).map(m=>`
             <span class="tax-pill"><span class="dot"></span>${esc(m)}</span>
           `).join("")}</div>`
        : "";

      return `
        <a class="postrow" href="view.html?id=${encodeURIComponent(p.id)}&src=algebra">
          <div class="num">${num}</div>
          <div style="display:flex; flex-direction:column;">
            <div class="label">${esc(p.difficulty || "")}${p.difficulty && p.topic ? " • " : ""}${esc(p.topic || "")}</div>
            ${p.title ? `<div style="color:var(--muted); font-weight:700; margin-top:4px;">${esc(p.title)}</div>` : ""}
            ${methodLine}
          </div>
          <div class="go">→</div>
        </a>
      `;
    }).join("");
  }

  function setStatus(el, filteredCount, totalCount, sel){
    const picked =
      sel.difficulty.size + sel.topic.size + sel.methods.size;

    const text = picked === 0
      ? `Đang hiển thị: tất cả (${totalCount})`
      : `Đang hiển thị: ${filteredCount}/${totalCount} (đã lọc ${picked})`;

    el.querySelector("span:last-child").textContent = text;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const posts = window.POSTS_ALGEBRA || [];

    const panel = qs("#taxPanel");
    const toggle = qs("#taxToggle");
    const clearBtn = qs("#taxClear");
    const status = qs("#taxStatus");

    const boxD = qs("#taxDifficulty");
    const boxT = qs("#taxTopic");
    const boxM = qs("#taxMethods");

    const list = qs("#algebraPostList");

    // Nếu không phải trang Đại số thì thôi
    if (!panel || !toggle || !boxD || !boxT || !boxM || !list) return;

    const tax = buildTax(posts);
    renderChips(boxD, tax.difficulties, "difficulty");
    renderChips(boxT, tax.topics, "topic");
    renderChips(boxM, tax.methods, "methods");

    function apply(){
      const sel = readSelected(panel);
      const filtered = posts.filter(p => match(p, sel));
      renderList(list, filtered);
      if (status) setStatus(status, filtered.length, posts.length, sel);
    }

    toggle.addEventListener("click", () => {
      panel.classList.toggle("tax-hidden");
      apply();
    });

    panel.addEventListener("change", (e) => {
      if (e.target && e.target.matches('input[type="checkbox"]')) apply();
    });

    if (clearBtn){
      clearBtn.addEventListener("click", () => {
        panel.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        apply();
      });
    }

    // init
    renderList(list, posts);
    if (status){
      status.querySelector("span:last-child").textContent = `Đang hiển thị: tất cả (${posts.length})`;
    }
  });
})();
