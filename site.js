// site.js - logic chung cho 4 trang con + view
window.Site = window.Site || {};

function $(id){ return document.getElementById(id); }
function pad3(n){ return String(n).padStart(3, "0"); }

Site.CAT = {
  algebra: { name:"Đại số", page:"algebra.html", theme:"theme-algebra", get: () => window.POSTS_ALGEBRA || [] },
  combi:   { name:"Tổ hợp", page:"combi.html",   theme:"theme-combi",   get: () => window.POSTS_COMBI   || [] },
  geo:     { name:"Hình học",page:"geo.html",    theme:"theme-geo",     get: () => window.POSTS_GEO     || [] },
  nt:      { name:"Số học",  page:"nt.html",     theme:"theme-nt",      get: () => window.POSTS_NT      || [] },
};

Site.setTheme = function(theme){
  document.body.classList.remove("theme-home","theme-algebra","theme-combi","theme-geo","theme-nt");
  document.body.classList.add(theme);
};

Site.getQuery = function(){
  const p = new URLSearchParams(location.search);
  return Object.fromEntries(p.entries());
};

Site.typesetMath = function(scope){
  if (window.MathJax?.typesetPromise){
    return scope ? MathJax.typesetPromise([scope]) : MathJax.typesetPromise();
  }
  return Promise.resolve();
};

// Render list: gọn + đánh số, KHÔNG hiện title
Site.renderList = function(catKey, containerId){
  const cfg = Site.CAT[catKey] || Site.CAT.algebra;
  Site.setTheme(cfg.theme);

  const box = $(containerId);
  const posts = cfg.get().slice();

  // sort ổn định theo id (001,002...)
  posts.sort((a,b) => String(a.id).localeCompare(String(b.id), "vi"));

  if (!posts.length){
    box.innerHTML = `<div style="opacity:.7">Chưa có bài nào. Thêm bài vào file <code>posts-${catKey}.js</code>.</div>`;
    return;
  }

  box.innerHTML = posts.map((p,i) => {
    const num = pad3(i+1);
    return `
      <a class="postrow" href="view.html?cat=${catKey}&id=${encodeURIComponent(p.id)}">
        <span class="num">${num}</span>
        <span class="label">Bài ${num}</span>
        <span class="go">→</span>
      </a>
    `;
  }).join("");
};

// Render view: đọc cat + id và hiển thị bài
Site.renderView = function(opts){
  const q = Site.getQuery();
  const catKey = (q.cat || "algebra").toLowerCase();
  const id = (q.id || "").trim();

  const cfg = Site.CAT[catKey] || Site.CAT.algebra;
  Site.setTheme(cfg.theme);

  if ($(opts.catNameId)) $(opts.catNameId).textContent = cfg.name;
  if ($(opts.backId)){
    $(opts.backId).href = cfg.page;
    $(opts.backId).textContent = "← Quay lại " + cfg.name;
  }

  const titleEl = $(opts.titleId);
  const metaEl  = $(opts.metaId);
  const contEl  = $(opts.contentId);

  const data = cfg.get();
  const post = data.find(p => String(p.id) === String(id));

  if(!id){
    titleEl.textContent = "Thiếu id 😅";
    metaEl.textContent  = "Ví dụ: view.html?cat=algebra&id=001";
    contEl.innerHTML    = "<p>Mở từ trang danh sách bài để link tự đúng.</p>";
    return;
  }

  if(!post){
    titleEl.textContent = "Không tìm thấy bài 😅";
    metaEl.textContent  = "Kiểm tra lại cat hoặc id.";
    contEl.innerHTML    = `<p>Ví dụ đúng: <code>view.html?cat=${catKey}&id=001</code></p>`;
    return;
  }

  titleEl.textContent = post.title || ("Bài " + id);
  metaEl.textContent  = [cfg.name, post.level, ...(post.tags||[])].filter(Boolean).join(" • ");
  contEl.innerHTML    = post.content || "<p>(Chưa có nội dung)</p>";

  // MathJax sau khi inject
  window.addEventListener("load", () => {
    Site.typesetMath(document.body);
  });
};
