// assets/js/view/01-view-sources.js
MathHub.View.sources = {
  backMap: {
    nt: "/nt.html",
    algebra: "/algebra.html",
    combi: "/combi.html",
    geo: "/geo.html",
  },
  badgeMap: {
    nt: "NT",
    algebra: "ĐS",
    combi: "TH",
    geo: "HH",
  },

  // Nơi bạn cấu hình "data file" cho từng mảng
  dataFiles: {
    nt: ["/assets/js/nt/00-nt-core.js?v=1", "/assets/js/nt/01-nt-data.js?v=1"],
    // nếu sau này bạn tách algebra/combi/geo thì thêm vào đây:
    // algebra: ["/assets/js/algebra/00-algebra-core.js?v=1", "/assets/js/algebra/01-algebra-data.js?v=1"],
    // combi:  ["/assets/js/combi/00-combi-core.js?v=1", "/assets/js/combi/01-combi-data.js?v=1"],
    // geo:    ["/assets/js/geo/00-geo-core.js?v=1", "/assets/js/geo/01-geo-data.js?v=1"],
  },

  async loadDataBySrc(src) {
    const files = this.dataFiles[src];
    if (!files) throw new Error("Chưa cấu hình dataFiles cho src=" + src);
    for (const f of files) await MathHub.View.loadScript(f);
  },

  getPostsBySrc(src) {
    if (src === "nt") return (window.MathHub?.NT?.posts) || [];
    if (src === "algebra") return (window.MathHub?.Algebra?.posts) || [];
    if (src === "combi") return (window.MathHub?.Combi?.posts) || [];
    if (src === "geo") return (window.MathHub?.Geo?.posts) || [];
    return [];
  },

  getBackHref(src) {
    return this.backMap[src] || "/nt.html";
  },

  getBadgeText(src) {
    return this.badgeMap[src] || "NT";
  },
};
// assets/js/view/01-view-sources.js
window.MathHub = window.MathHub || {};
MathHub.View = MathHub.View || {};

MathHub.View.sources = MathHub.View.sources || {};

// Map badge text theo src
MathHub.View.sources.getBadgeText = function (src) {
  const s = String(src || "").toLowerCase();
  if (s === "nt") return "NT";
  if (s === "algebra") return "Đại số";
  if (s === "combi") return "Tổ hợp";
  if (s === "geo") return "Hình học";
  return s.toUpperCase();
};

// ✅ QUAN TRỌNG: lấy bài theo src + id
MathHub.View.sources.getPost = async function (src, id) {
  const s = String(src || "").toLowerCase();
  const n = Number(id);

  // NT: data nằm ở MathHub.NT.posts (theo cấu trúc bạn đang dùng)
  if (s === "nt") {
    if (!window.MathHub || !MathHub.NT || !Array.isArray(MathHub.NT.posts)) return null;
    return MathHub.NT.posts.find(p => Number(p.id) === n) || null;
  }

  // Algebra: nếu sau này bạn có MathHub.Algebra.posts thì bật thêm
  if (s === "algebra") {
    if (!MathHub.Algebra || !Array.isArray(MathHub.Algebra.posts)) return null;
    return MathHub.Algebra.posts.find(p => Number(p.id) === n) || null;
  }

  // Combi
  if (s === "combi") {
    if (!MathHub.Combi || !Array.isArray(MathHub.Combi.posts)) return null;
    return MathHub.Combi.posts.find(p => Number(p.id) === n) || null;
  }

  // Geo
  if (s === "geo") {
    if (!MathHub.Geo || !Array.isArray(MathHub.Geo.posts)) return null;
    return MathHub.Geo.posts.find(p => Number(p.id) === n) || null;
  }

  return null;
};

