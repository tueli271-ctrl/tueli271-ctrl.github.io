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
