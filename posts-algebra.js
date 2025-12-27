// Dữ liệu bài Đại số (bạn thêm bài mới bằng cách thêm object vào mảng này)
window.POSTS_ALGEBRA = [
  {
    id: "001",
    title: "Dãy logarit: \\(x_{n+1}=\\ln\\left(\\frac{e^{x_n}-1}{x_n}\\right)\\)",
    level: "N3",
    tags: ["Dãy số", "Giới hạn"],
    content: String.raw`
      <p>Cho dãy <span>\((x_n)\)</span> xác định bởi</p>
      <p>\[
      x_1=\ln 2026,\qquad
      x_{n+1}=\ln\!\left(\frac{e^{x_n}-1}{x_n}\right)\quad \text{với mọi }n\in\mathbb{N}_{>0}.
      \]</p>
      <p>Chứng minh \((x_n)\) có giới hạn hữu hạn và tính \(\displaystyle\lim_{n\to\infty}x_n\).</p>
      <hr>
      <p><b>Lời giải:</b> (bạn dán lời giải ở đây sau)</p>
    `
  },
  {
    id: "002",
    title: "Đa thức bậc chẵn: điều kiện tồn tại nghiệm thực (dãy x_n)",
    level: "N3",
    tags: ["Đa thức", "Tồn tại nghiệm"],
    content: String.raw`
      <p>Cho đa thức hệ số thực \(P(x)\) có bậc chẵn dương và hệ số bậc cao nhất dương.</p>
      <p>Chứng minh rằng \(P(x)\) có ít nhất một nghiệm thực khi và chỉ khi tồn tại dãy vô hạn \((x_n)\) sao cho</p>
      <p>\[
      P(x_i)=2i,\ \forall i\in\{1,2,\dots,2025\}
      \]</p>
      <p>và</p>
      <p>\[
      \frac1n\bigl(P(x_1)+P(x_2)+\cdots+P(x_n)\bigr)\in\{1,2,\dots,2025\},\ \forall n>2025.
      \]</p>
      <hr>
      <p><b>Lời giải:</b> (bạn dán lời giải ở đây sau)</p>
    `
  }
];
