window.POSTS_ALGEBRA = [
  {
    id: "001",
    title: "Dãy logarit (giới hạn)",
    level: "N3",
    tags: ["Dãy số", "Giới hạn"],
    content: String.raw`
      <p>Cho dãy \((x_n)\) xác định bởi</p>
      <p>\[
      x_1=\ln 2026,\qquad
      x_{n+1}=\ln\!\left(\frac{e^{x_n}-1}{x_n}\right)\quad \text{với mọi }n\in\mathbb{N}_{>0}.
      \]</p>
      <p>Chứng minh \((x_n)\) có giới hạn hữu hạn và tính \(\displaystyle\lim_{n\to\infty}x_n\).</p>
      <hr>
      <p><b>Lời giải:</b> (bạn dán lời giải vào đây)</p>
    `
  },
  {
    id: "002",
    title: "Đa thức bậc chẵn (điều kiện có nghiệm thực)",
    level: "N3",
    tags: ["Đa thức", "Tồn tại nghiệm"],
    content: String.raw`
      <p>Cho đa thức hệ số thực \(P(x)\) có bậc là số nguyên dương chẵn và hệ số bậc cao nhất dương.</p>
      <p>Chứng minh rằng \(P(x)\) có ít nhất một nghiệm thực khi và chỉ khi tồn tại một dãy vô hạn các số thực \((x_n)\) thỏa mãn</p>
      <p>\[
      P(x_i)=2i,\ \forall i\in\{1,2,\dots,2025\}
      \]</p>
      <p>và</p>
      <p>\[
      \frac1n\bigl(P(x_1)+P(x_2)+\cdots+P(x_n)\bigr)\in\{1,2,\dots,2025\},\ \forall n>2025.
      \]</p>
      <hr>
      <p><b>Lời giải:</b> (bạn dán lời giải vào đây)</p>
    `
  }
];

// nếu bạn chưa tạo posts cho 3 mảng kia, để view không bị undefined:
window.POSTS_COMBI = window.POSTS_COMBI || [];
window.POSTS_GEO   = window.POSTS_GEO   || [];
window.POSTS_NT    = window.POSTS_NT    || [];
