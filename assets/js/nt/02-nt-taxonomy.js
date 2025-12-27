// assets/js/nt/02-nt-taxonomy.js
MathHub.NT.buildTaxonomy = function buildTaxonomy() {
  const posts = MathHub.NT.posts || [];
  const { uniq } = MathHub.NT.util;

  const difficulties = uniq(posts.map(p => p.difficulty));
  const topics       = uniq(posts.map(p => p.topic));

  const methods = uniq(
    posts.flatMap(p => Array.isArray(p.method) ? p.method : [])
  );

  // Nếu bạn muốn ép thứ tự N1..N5 thì sắp lại:
  const order = ["N1","N2","N3","N4","N5","N6"];
  difficulties.sort((a,b) => order.indexOf(a) - order.indexOf(b));

  topics.sort();
  methods.sort();

  MathHub.NT.taxonomy = { difficulties, topics, methods };
};
