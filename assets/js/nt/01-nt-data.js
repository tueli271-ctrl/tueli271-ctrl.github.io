// assets/js/nt/01-nt-data.js
window.MathHub = window.MathHub || {};
MathHub.NT = MathHub.NT || {};

// Danh sách bài Số học (chỉ đề bài)
MathHub.NT.posts = [
  {
    id: 1,
    title: "PT Diophantine: (x^2+2y^2)^2 - 2(z^2+2t^2)^2 = 1",
    difficulty: "N4",
    topics: ["Phương trình", "Đồng dư"],
    methods: ["Số học modulo"],
    href: "view.html?src=nt&id=1",
    statement: `
<p><b>Bài 1.</b> Chứng minh rằng phương trình</p>
\\[
(x^2+2y^2)^2-2(z^2+2t^2)^2=1
\\]
<p>có vô hạn nghiệm trong \\(\\mathbb{N}\\).</p>
`,
    solution: ``,
  },

  {
    id: 2,
    title: "Wieferich: p^2 | (2^{p-1}-1) ⇒ (p-1)(p!+2^n) có ≥3 ước nguyên tố",
    difficulty: "N5",
    topics: ["Chia hết", "Đồng dư"],
    methods: ["Số học modulo", "Ước - bội"],
    href: "view.html?src=nt&id=2",
    statement: `
<p><b>Bài 2.</b> Cho \\(p\\in\\mathbb{Z}_{>0}\\) là số nguyên tố thỏa mãn</p>
\\[
p^{2}\\mid\\bigl(2^{p-1}-1\\bigr).
\\]
<p>Chứng minh rằng với mọi \\(n\\in\\mathbb{Z}_{>0}\\), số</p>
\\[
(p-1)\\bigl(p!+2^{n}\\bigr)
\\]
<p>có ít nhất \\(3\\) ước nguyên tố phân biệt.</p>
`,
    solution: ``,
  },

  {
    id: 3,
    title: "Dãy truy hồi mod 2023: tìm chu kỳ h nhỏ nhất",
    difficulty: "N4",
    topics: ["Đồng dư"],
    methods: ["Số học modulo"],
    href: "view.html?src=nt&id=3",
    statement: `
<p><b>Bài 3.</b> Cho dãy \\((a_n)\\) xác định bởi</p>
\\[
a_0=20,\\qquad a_1=100,\\qquad a_{n+2}=4a_{n+1}+5a_n+20\\quad \\forall n\\in\\mathbb{N}.
\\]
<p>Tìm số nguyên dương \\(h\\) nhỏ nhất sao cho \\(a_{n+h}-a_n\\) chia hết cho \\(2023\\) với mọi \\(n\\in\\mathbb{N}\\).</p>
`,
    solution: ``,
  },

  {
    id: 4,
    title: "Hàm sigma: I(n)=σ(n)/n=(p+2)/p ⇒ n lẻ và là chính phương",
    difficulty: "N4",
    topics: ["Hàm số học", "Ước số"],
    methods: ["Ước - bội"],
    href: "view.html?src=nt&id=4",
    statement: `
<p><b>Bài 4.</b> Giả sử \\(n\\in\\mathbb{Z}_{>0}\\) sao cho tồn tại số nguyên tố lẻ \\(p\\) thỏa mãn</p>
\\[
I(n)=\\frac{\\sigma(n)}{n}=\\frac{p+2}{p}.
\\]
<p>Chứng minh rằng \\(n\\) là số lẻ và \\(n\\) là số chính phương.</p>
`,
    solution: ``,
  },

  {
    id: 5,
    title: "Hàm sigma: chứng minh I(4n) ≥ 7/4 và xét dấu bằng",
    difficulty: "N3",
    topics: ["Hàm số học", "Ước số"],
    methods: ["Ước - bội"],
    href: "view.html?src=nt&id=5",
    statement: `
<p><b>Bài 5.</b> Với mỗi số nguyên dương \\(n\\in\\mathbb{Z}_{>0}\\), đặt</p>
\\[
I(n)=\\frac{\\sigma(n)}{n},
\\]
<p>trong đó \\(\\sigma(n)\\) là tổng tất cả các ước số dương của \\(n\\).</p>
<p>Chứng minh rằng</p>
\\[
I(4n)\\ge \\frac{7}{4}\\qquad \\forall\\,n\\in\\mathbb{Z}_{>0}.
\\]
<p>Hỏi khi nào xảy ra dấu bằng.</p>
`,
    solution: ``,
  },

  {
    id: 6,
    title: "Dãy truy hồi: tồn tại ước nguyên tố q | a_{2026p} sao cho q ∤ p·a_{2026}",
    difficulty: "N5",
    topics: ["Chia hết", "Đồng dư"],
    methods: ["Số học modulo", "Ước - bội"],
    href: "view.html?src=nt&id=6",
    statement: `
<p><b>Bài 6.</b> Cho \\(p\\) là một số nguyên tố, dãy số \\((a_n)_{n\\in\\mathbb{N}}\\) được cho bởi \\(a_0=2\\), \\(a_1=17\\) và</p>
\\[
a_{n+2}=17a_{n+1}-11a_n,\\qquad \\forall n\\in\\mathbb{N}.
\\]
<p>Chứng minh rằng tồn tại một ước nguyên tố \\(q\\) của \\(a_{2026p}\\) sao cho \\(q\\nmid p\\,a_{2026}\\).</p>
`,
    solution: ``,
  },
];
