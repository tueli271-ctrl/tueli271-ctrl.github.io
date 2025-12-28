// assets/js/view/02-view-render.js
MathHub.View.render = {
  makePill(text, dot = true) {
    const div = document.createElement("div");
    div.className = "tax-pill";
    div.innerHTML = `${dot ? `<span class="dot"></span>` : ""}${MathHub.View.escHtml(text)}`;
    return div;
  },

  setBadge(elBadge, text) {
    if (!elBadge) return;
    elBadge.innerHTML = `<span class="dot"></span> ${MathHub.View.escHtml(text)}`;
  },

  setTags(elTags, post) {
    if (!elTags) return;
    elTags.innerHTML = "";
    if (post.difficulty) elTags.appendChild(this.makePill(post.difficulty, false));
    (post.topics || []).forEach(t => elTags.appendChild(this.makePill(t, true)));
    (post.methods || []).forEach(m => elTags.appendChild(this.makePill(m, true)));
  },

  async renderPost({ post, src }) {
    const qs = MathHub.View.qs;

    const elTitle = qs("#viewTitle");
    const elSubtitle = qs("#viewSubtitle");
    const elTags = qs("#viewTags");
    const elBadge = qs("#viewBadge");
    const elStatement = qs("#viewStatement");
    const elSolution = qs("#viewSolution");

    // title/subtitle
    elTitle.textContent = post.title || `Bài #${post.id}`;
    document.title = `Math Hub • ${post.title || ("Bài " + post.id)}`;
    elSubtitle.textContent = post.difficulty ? `Độ khó: ${post.difficulty}` : `src=${src}`;

    // badge + tags
    this.setBadge(elBadge, MathHub.View.sources.getBadgeText(src));
    this.setTags(elTags, post);

    // content
    elStatement.innerHTML = post.statement ? post.statement : "<i>Chưa có đề.</i>";
    elSolution.innerHTML = post.solution ? post.solution : "<i>Chưa có lời giải.</i>";

    // MathJax
    await MathHub.View.typeset(elStatement);
    await MathHub.View.typeset(elSolution);
  },

  renderError(msg) {
    const elTitle = MathHub.View.qs("#viewTitle");
    const elSubtitle = MathHub.View.qs("#viewSubtitle");
    const elStatement = MathHub.View.qs("#viewStatement");
    const solutionPanel = MathHub.View.qs("#solutionPanel");

    elTitle && (elTitle.textContent = "Có lỗi");
    elSubtitle && (elSubtitle.textContent = msg);
    if (elStatement) {
      elStatement.innerHTML = `<div style="padding:12px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,0,0,.08)">
        <b>Lỗi:</b> ${MathHub.View.escHtml(msg)}
      </div>`;
    }
    if (solutionPanel) solutionPanel.style.display = "none";
  }
};
