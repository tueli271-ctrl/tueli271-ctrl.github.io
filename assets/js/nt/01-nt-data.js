// assets/js/nt/01-nt-data.js
window.MathHub = window.MathHub || {};
MathHub.NT = MathHub.NT || {};

MathHub.NT.posts = [
  {
    id: 1,
    title: "Chia hết cơ bản",
    difficulty: "N1",
    topics: ["Chia hết", "Ước số"],
    methods: ["Ước - bội"],
    href: "view.html?src=nt&id=1",
  },
  {
    id: 2,
    title: "Đồng dư – bài mở đầu",
    difficulty: "N2",
    topics: ["Đồng dư"],
    methods: ["Số học modulo"],
    href: "view.html?src=nt&id=2",
  },
  {
    id: 3,
    title: "LTE nhập môn",
    difficulty: "N3",
    topics: ["Đồng dư", "Hàm số học"],
    methods: ["LTE"],
    href: "view.html?src=nt&id=3",
  },
  {
  id: 10,
  title: "Ước của số Fermat: 2^m+1 | F_n",
  difficulty: "N4",
  topics: ["Đồng dư", "Chia hết"],
  methods: ["Số học modulo"],
  href: "view.html?src=nt&id=10",
  statement: `
Cho các số Fermat \\(F_n=2^{2^{n}}+1\\).
(a) Có bao nhiêu cặp \\((m,n)\\) với \\(1\\le m\\le 2025\\) sao cho \\(2^{m}+1\\mid F_n\\)?
(b) Tìm mọi \\(n\\in\\mathbb N\\) sao cho tồn tại ước nguyên tố \\(p\\mid F_n\\) thỏa \\(p-1\\mid 2025^{n+2}-1\\).
`,
  solution: `
**(a)** Có vô hạn cặp.  
Vì \\(2^m+1 \\mid 2^{2^n}+1\\) khi và chỉ khi \\(m=2^k\\le 2^n\\) (tức \\(k\\le n\\)).  
Trong \\([1,2025]\\) có các \\(m\\) là lũy thừa của 2: \\(1,2,4,\\dots,1024\\).  
Với mỗi \\(m=2^k\\) thì mọi \\(n\\ge k\\) đều thỏa, nên có vô hạn cặp.
`
}
];
